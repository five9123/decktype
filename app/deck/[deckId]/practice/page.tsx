'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTyping } from '@/hooks/useTyping';
import { useViewport } from '@/hooks/useViewport';
import { useSound } from '@/hooks/useSound';
import { useTTS } from '@/hooks/useTTS';
import { ConfettiEffect } from '@/components/ConfettiEffect';
import { VirtualKeyboard } from '@/components/VirtualKeyboard';
import { PreferencesPanel } from '@/components/PreferencesPanel';
import { createBrowserClient } from '@/lib/supabase/client';
import { computeCompositeScore } from '@/lib/highscore';
import { smartOrder } from '@/lib/smart-order';
import { useMastery } from '@/hooks/useMastery';
import { usePersonalBest } from '@/hooks/usePersonalBest';
import { AUTO_ADVANCE_DELAY } from '@/lib/constants';
import { shuffle } from '@/lib/utils';
import { STORAGE_KEY_SESSION } from '@/lib/storage-keys';
import dynamic from 'next/dynamic';
const AcidRainGame = dynamic(() => import('@/components/AcidRainGame').then((m) => ({ default: m.AcidRainGame })), { ssr: false });
const FillBlankGame = dynamic(() => import('@/components/FillBlankGame').then((m) => ({ default: m.FillBlankGame })), { ssr: false });
import type { Card, PracticeMode, CardOrder, CardResult, TypingSession, MasteryLevel } from '@/types';
import type { ScriptLang } from '@/lib/lang-detect';


export default function PracticePage() {
  const { deckId } = useParams<{ deckId: string }>();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') ?? 'back_to_front') as PracticeMode;
  const order = (searchParams.get('order') ?? 'sequential') as CardOrder;

  const { user } = useAuth();
  const { t } = useLanguage();
  const { confettiEnabled } = usePreferences();
  const { speak } = useTTS();
  const router = useRouter();
  const { viewportH, compact, mainRef } = useViewport();
  const inputRef = useRef<HTMLInputElement>(null);
  const { play: playSound } = useSound();
  const { masteryMap, loading: masteryLoading, updateMastery } = useMastery(deckId);
  const { checkAndUpdate: checkPB } = usePersonalBest();

  // Keep a ref to the latest updateMastery to avoid adding it to effect deps
  // (updateMastery re-creates on every masteryMap update, causing infinite loops)
  const updateMasteryRef = useRef(updateMastery);
  useEffect(() => { updateMasteryRef.current = updateMastery; });

  const [cards, setCards] = useState<Card[]>([]);
  const [deckSourceLang, setDeckSourceLang] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCardConfetti, setShowCardConfetti] = useState(false);
  const [wrongSubmit, setWrongSubmit] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const isAdvancingRef = useRef(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [sessionResults, setSessionResults] = useState<CardResult[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [levelUps, setLevelUps] = useState<{ cardId: string; level: MasteryLevel }[]>([]);
  const [autoAdvanceProgress, setAutoAdvanceProgress] = useState(0);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoAdvanceRaf = useRef<number | null>(null);
  const autoAdvanceStart = useRef<number>(0);
  const wrongSubmitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongSubmitRaf = useRef<number | null>(null);
  const wrongSubmitStart = useRef<number>(0);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep a ref to the latest levelUps to avoid adding it to session-save effect deps
  // (levelUps can update after sessionComplete=true due to async updateMastery, causing double DB inserts)
  const levelUpsRef = useRef(levelUps);
  useEffect(() => { levelUpsRef.current = levelUps; });

  // Stable ref for handleSkip — lets Enter key effect reference it without ordering issues
  const handleSkipRef = useRef<() => void>(() => {});

  // Guard: prevent duplicate result-saving when effect re-runs while isComplete=true
  const resultSavedRef = useRef(false);
  useEffect(() => { resultSavedRef.current = false; setWrongSubmit(false); }, [currentIdx]);

  // Load, sort, and optionally shuffle cards
  useEffect(() => {
    if (!user || !deckId) return;
    if (order === 'smart_review' && masteryLoading) return; // Wait for mastery data
    const supabase = createBrowserClient();

    // Load deck metadata for source_lang (TTS language hint)
    supabase.from('decks').select('source_lang').eq('id', deckId).single().then(({ data: deckRow }: { data: { source_lang: string | null } | null }) => {
      if (deckRow?.source_lang) setDeckSourceLang(deckRow.source_lang);
    });

    supabase
      .from('cards')
      .select('*')
      .eq('deck_id', deckId)
      .order('sort_order')
      .then(async ({ data }: { data: Card[] | null }) => {
        let cardList = data ?? [];

        if (order === 'random') {
          cardList = shuffle(cardList);
        } else if (order === 'smart_review') {
          cardList = smartOrder(cardList, masteryMap);
        } else if (order === 'difficult_first') {
          // Sort by lowest historical accuracy (cards with no history default to 50%)
          const cardIds = cardList.map((c) => c.id);
          const { data: results } = await supabase
            .from('card_results')
            .select('card_id, accuracy')
            .in('card_id', cardIds);

          if (results && results.length > 0) {
            const accMap: Record<string, number[]> = {};
            results.forEach((r: { card_id: string; accuracy: number }) => {
              if (!accMap[r.card_id]) accMap[r.card_id] = [];
              accMap[r.card_id].push(r.accuracy);
            });
            const avgAcc = (id: string) => {
              const arr = accMap[id];
              if (!arr || arr.length === 0) return 50;
              return arr.reduce((a: number, b: number) => a + b, 0) / arr.length;
            };
            cardList = [...cardList].sort((a, b) => avgAcc(a.id) - avgAcc(b.id));
          }
        }

        // Filter cards by mode: fill_blank needs Cloze cards; others need non-Cloze cards
        if (mode === 'fill_blank') {
          cardList = cardList.filter((c) => c.note_type === 'Cloze');
        } else {
          cardList = cardList.filter((c) => c.note_type !== 'Cloze');
        }

        setCards(cardList);
        setLoading(false);
      });
  }, [user, deckId, order, masteryLoading, masteryMap]);

  const currentCard = cards[currentIdx];
  // back_to_front (단어 타이핑): show meaning as a hint reference below the word
  const meaningHint = currentCard && mode === 'back_to_front' ? currentCard.back : null;
  // front_to_back: type the meaning; back_to_front: type the word
  const target = currentCard
    ? mode === 'front_to_back' ? currentCard.back : currentCard.front
    : '';

  const {
    input, charStates, isComplete, wpm, accuracy, elapsedSeconds,
    handleInput: rawHandleInput, reset,
  } = useTyping(target, inputRef);

  // Wrap handleInput to play sound on each keystroke
  const handleInput = useCallback((val: string) => {
    if (val.length > input.length) {
      playSound();
    }
    rawHandleInput(val);
  }, [rawHandleInput, playSound, input.length]);

  // Fallback: force-clear isComposing when word is complete in case compositionEnd doesn't fire
  // (Korean IME sometimes doesn't emit compositionEnd on the final syllable)
  useEffect(() => {
    if (!isComplete || !isComposing) return;
    const id = setTimeout(() => setIsComposing(false), 150);
    return () => clearTimeout(id);
  }, [isComplete, isComposing]);

  // Re-focus input on card change (safety net — without key prop the element persists)
  useEffect(() => {
    const id = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 60);
    return () => clearTimeout(id);
  }, [currentIdx]);

  // Advance to next card (or finish session)
  const advanceToNext = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
    if (wrongSubmitTimer.current) clearTimeout(wrongSubmitTimer.current);
    if (wrongSubmitRaf.current) cancelAnimationFrame(wrongSubmitRaf.current);
    if (confettiTimer.current) clearTimeout(confettiTimer.current);
    setAutoAdvanceProgress(0);
    setShowCardConfetti(false);

    if (currentIdx + 1 >= cards.length) {
      setShowConfetti(true);
      setSessionComplete(true);
    } else {
      // Guard: ignore any IME events fired during advance transition
      isAdvancingRef.current = true;
      reset();
      setCurrentIdx((i) => i + 1);
      requestAnimationFrame(() => { isAdvancingRef.current = false; });
    }
  }, [currentIdx, cards.length, reset]);

  // Auto-advance after completion with RAF progress bar
  // Save result once when card completes.
  // Wait for IME composition to finish (!isComposing) — React skips DOM value
  // updates during composition, so advancing while composing leaves stale text.
  useEffect(() => {
    if (!isComplete || isComposing || sessionComplete || resultSavedRef.current) return;
    resultSavedRef.current = true;
    if (confettiEnabled) {
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      setShowCardConfetti(true);
      confettiTimer.current = setTimeout(() => setShowCardConfetti(false), 2500);
    }
    speak(target, currentCard?.pronunciation ?? undefined, (deckSourceLang as ScriptLang) ?? undefined);
    const cardWpm = wpm ?? 0;
    const cardAccuracy = accuracy ?? 100;
    setSessionResults((prev) => [
      ...prev,
      {
        id: '',
        session_id: '',
        card_id: currentCard?.id ?? '',
        wpm: cardWpm,
        accuracy: cardAccuracy,
        time_ms: elapsedSeconds * 1000,
        typed_text: input,
        target_text: target,
      },
    ]);
    if (currentCard?.id) {
      updateMasteryRef.current(currentCard.id, cardAccuracy, cardWpm).then((newLevel) => {
        if (newLevel) {
          setLevelUps((prev) => [...prev, { cardId: currentCard.id, level: newLevel }]);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, isComposing, sessionComplete]);

  // RAF countdown animation — separate effect so wpm/accuracy re-renders don't restart it
  useEffect(() => {
    if (!isComplete || isComposing || sessionComplete) return;

    autoAdvanceStart.current = performance.now();
    const animate = () => {
      const elapsed = performance.now() - autoAdvanceStart.current;
      const progress = Math.min(elapsed / AUTO_ADVANCE_DELAY, 1);
      setAutoAdvanceProgress(progress);
      if (progress < 1) {
        autoAdvanceRaf.current = requestAnimationFrame(animate);
      }
    };
    autoAdvanceRaf.current = requestAnimationFrame(animate);
    autoAdvanceTimer.current = setTimeout(() => advanceToNext(), AUTO_ADVANCE_DELAY);

    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
    };
  }, [isComplete, isComposing, sessionComplete, advanceToNext]);

  // RAF countdown animation for wrong-submit state (uses separate refs to avoid race with isComplete)
  useEffect(() => {
    if (!wrongSubmit) return;

    wrongSubmitStart.current = performance.now();
    const animate = () => {
      const elapsed = performance.now() - wrongSubmitStart.current;
      const progress = Math.min(elapsed / AUTO_ADVANCE_DELAY, 1);
      setAutoAdvanceProgress(progress);
      if (progress < 1) {
        wrongSubmitRaf.current = requestAnimationFrame(animate);
      }
    };
    wrongSubmitRaf.current = requestAnimationFrame(animate);
    wrongSubmitTimer.current = setTimeout(() => handleSkipRef.current(), AUTO_ADVANCE_DELAY);

    return () => {
      if (wrongSubmitTimer.current) clearTimeout(wrongSubmitTimer.current);
      if (wrongSubmitRaf.current) cancelAnimationFrame(wrongSubmitRaf.current);
      setAutoAdvanceProgress(0);
    };
  }, [wrongSubmit]);

  // Enter key to advance immediately when complete or wrong-submitted
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === 'Enter' && isComplete) {
        e.preventDefault();
        advanceToNext();
      } else if (e.key === 'Enter' && wrongSubmit) {
        if (performance.now() - wrongSubmitStart.current < 300) return;
        e.preventDefault();
        handleSkipRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isComplete, advanceToNext, wrongSubmit]);

  // Save session when complete
  useEffect(() => {
    if (!sessionComplete || !user || sessionResults.length === 0) return;

    const avgWpm = Math.round(sessionResults.reduce((s, r) => s + r.wpm, 0) / sessionResults.length);
    const avgAcc = Math.round(sessionResults.reduce((s, r) => s + r.accuracy, 0) / sessionResults.length);
    const totalMs = sessionResults.reduce((s, r) => s + r.time_ms, 0);

    const compositeScore = computeCompositeScore(avgAcc, avgWpm);
    const supabase = createBrowserClient();
    supabase.from('typing_sessions').insert({
      user_id: user.id,
      deck_id: deckId,
      wpm: avgWpm,
      accuracy: avgAcc,
      composite_score: compositeScore,
      card_count: sessionResults.length,
      duration_ms: totalMs,
      mode,
    }).select().single().then(async ({ data: session }: { data: TypingSession | null }) => {
      if (session) {
        // Insert card_results to DB
        const cardResultRows = sessionResults.map((r) => ({
          session_id: session.id,
          card_id: r.card_id,
          wpm: r.wpm,
          accuracy: r.accuracy,
          time_ms: r.time_ms,
          typed_text: r.typed_text,
          target_text: r.target_text,
        }));
        await supabase.from('card_results').insert(cardResultRows);

        // Check for personal bests
        const pbRecords = await checkPB(deckId, mode, avgWpm, avgAcc, compositeScore);

        sessionStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({
          ...session,
          cardResults: sessionResults,
          levelUps: levelUpsRef.current,
          cards: cards.map((c) => ({ id: c.id, front: c.front, back: c.back })),
          pbRecords,
        }));
        router.push(`/results?deck=${deckId}`);
      }
    });
  }, [sessionComplete, user, sessionResults, deckId, mode, router, checkPB, cards]);

  // Skip current card — saves result with 0 wpm/accuracy
  const handleSkip = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
    if (wrongSubmitTimer.current) clearTimeout(wrongSubmitTimer.current);
    if (wrongSubmitRaf.current) cancelAnimationFrame(wrongSubmitRaf.current);
    setAutoAdvanceProgress(0);
    if (!resultSavedRef.current && currentCard) {
      resultSavedRef.current = true;
      setSessionResults((prev) => [
        ...prev,
        {
          id: '',
          session_id: '',
          card_id: currentCard.id,
          wpm: 0,
          accuracy: 0,
          time_ms: elapsedSeconds * 1000,
          typed_text: input,
          target_text: target,
        },
      ]);
    }
    if (currentIdx + 1 >= cards.length) {
      setSessionComplete(true);
    } else {
      isAdvancingRef.current = true;
      reset();
      setCurrentIdx((i) => i + 1);
      requestAnimationFrame(() => { isAdvancingRef.current = false; });
    }
  }, [currentIdx, cards.length, reset, currentCard, elapsedSeconds]);
  useEffect(() => { handleSkipRef.current = handleSkip; });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
      </div>
    );
  }

  // Route to game-specific components
  if (mode === 'acid_rain') {
    return <AcidRainGame cards={cards} deckId={deckId} onExit={() => router.push(`/deck/${deckId}`)} />;
  }
  if (mode === 'fill_blank') {
    return <FillBlankGame cards={cards} deckId={deckId} deckLang={(deckSourceLang as ScriptLang) ?? undefined} onExit={() => router.push(`/deck/${deckId}`)} />;
  }

  return (
    <>
      <ConfettiEffect active={showConfetti} />
      <ConfettiEffect active={showCardConfetti} />
      <main
        ref={mainRef as React.RefObject<HTMLDivElement>}
        className="fixed inset-x-0 flex flex-col"
        style={{
          height: viewportH || '100vh',
          background: 'var(--bg)',
          zIndex: 10,
        }}
      >
        {/* Top bar */}
        <div style={{ borderBottom: '1px solid var(--border)' }}>
          <div
            className="top-toolbar flex items-center justify-between px-4 py-3 w-full mx-auto"
            style={{ maxWidth: '700px' }}
          >
            <button
              onClick={() => router.push(`/deck/${deckId}`)}
              className="text-sm"
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              &larr; Exit
            </button>
            <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
              <div className="relative">
                <button
                  onClick={() => setShowPrefs((v) => !v)}
                  className="p-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
                {showPrefs && <PreferencesPanel onClose={() => setShowPrefs(false)} />}
              </div>
            </div>
          </div>
        </div>

        {/* Session progress bar */}
        <div
          className="flex items-center gap-3 px-4 py-2 w-full mx-auto"
          style={{ maxWidth: '700px' }}
          role="progressbar"
          aria-valuenow={currentIdx + 1}
          aria-valuemin={1}
          aria-valuemax={cards.length}
        >
          <span className="text-xs font-medium tabular-nums" style={{ color: 'var(--muted)', minWidth: 48 }}>
            {currentIdx + 1} / {cards.length}
          </span>
          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 5, background: 'var(--surface)' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / cards.length) * 100}%`, background: 'var(--accent)' }}
            />
          </div>
        </div>

        {/* Card area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6 w-full mx-auto" style={{ maxWidth: '700px' }}>
          {/* Target word with per-character coloring */}
          <div className="text-center">
            <div className={`flex flex-wrap justify-center gap-0.5 text-2xl ${compact ? 'sm:text-3xl' : 'sm:text-4xl'} font-bold`}>
              {charStates.map((cs, i) => (
                <span key={i} data-char className={`char-${cs.status}`}
                  style={cs.char === ' ' ? { width: '0.3em' } : undefined}>
                  {cs.char === ' ' ? '\u00A0' : cs.char}
                </span>
              ))}
            </div>
            {currentCard?.pronunciation && (
              <p className="text-base mt-1.5" style={{ color: 'var(--accent)', opacity: 0.85 }}>
                {currentCard.pronunciation}
              </p>
            )}
            {meaningHint && (
              <p className="text-xl font-bold mt-1" style={{ color: 'var(--muted)' }}>
                {meaningHint}
              </p>
            )}
          </div>

          {/* Live stats — visible while typing */}
          {input.length > 0 && !isComplete && !wrongSubmit && (
            <div className="flex items-center justify-center gap-3 flex-wrap" style={{ fontSize: 13 }}>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>
                ⚡ {wpm ?? 0} <span className="font-medium" style={{ color: 'var(--muted)' }}>WPM</span>
              </span>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span className="font-bold" style={{ color: (accuracy ?? 100) < 80 ? 'var(--incorrect)' : 'var(--correct)' }}>
                🎯 {accuracy ?? 100}%
              </span>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>
                ⏱ {elapsedSeconds}s
              </span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="px-4 pb-4 w-full mx-auto" style={{ maxWidth: '700px' }}>
          <input
            key={currentIdx}
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              if (isAdvancingRef.current || isComplete || wrongSubmit) return;
              handleInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (isComplete || wrongSubmit) return;
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                if (input.length > 0) {
                  setWrongSubmit(true);
                  if (!resultSavedRef.current && currentCard) {
                    resultSavedRef.current = true;
                    setSessionResults((prev) => [
                      ...prev,
                      {
                        id: '',
                        session_id: '',
                        card_id: currentCard.id,
                        wpm: wpm ?? 0,
                        accuracy: accuracy ?? 0,
                        time_ms: elapsedSeconds * 1000,
                        typed_text: input,
                        target_text: target,
                      },
                    ]);
                  }
                } else {
                  handleSkip();
                }
              }
            }}
            onCompositionStart={() => { if (!isAdvancingRef.current) setIsComposing(true); }}
            onCompositionEnd={() => { setIsComposing(false); }}
            placeholder={t.typeHere}
            autoFocus
            className={`w-full px-4 py-3 rounded-xl text-base text-center${wrongSubmit ? ' wrong-shake' : ''}`}
            style={{
              background: 'var(--surface)',
              border: wrongSubmit ? '1.5px solid var(--incorrect)' : '1.5px solid var(--border)',
              color: 'var(--text)',
              outline: 'none',
              transition: 'border-color 200ms',
              opacity: isComplete ? 0.5 : 1,
            }}
          />
          {!isComplete && !wrongSubmit && (
            <div className="flex justify-between mt-2">
              <button
                onClick={handleSkip}
                className="text-sm"
                style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {t.skip} &rarr;
              </button>
              <button
                onClick={() => {
                  if (input.length > 0 && !isComplete) {
                    setWrongSubmit(true);
                    if (!resultSavedRef.current && currentCard) {
                      resultSavedRef.current = true;
                      setSessionResults((prev) => [
                        ...prev,
                        {
                          id: '',
                          session_id: '',
                          card_id: currentCard.id,
                          wpm: wpm ?? 0,
                          accuracy: accuracy ?? 0,
                          time_ms: elapsedSeconds * 1000,
                          typed_text: input,
                          target_text: target,
                        },
                      ]);
                    }
                  } else {
                    handleSkip();
                  }
                }}
                className="text-sm"
                style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Enter &crarr;
              </button>
            </div>
          )}
          {isComplete && (
            <button
              onClick={() => advanceToNext()}
              className="relative w-full py-3 rounded-xl text-base font-bold overflow-hidden mt-2"
              style={{ background: 'var(--correct)', color: '#fff', cursor: 'pointer', border: 'none' }}
              role="status"
              aria-live="assertive"
            >
              ✓ {currentIdx + 1 >= cards.length ? t.seeResults : t.nextCard} →
              <div
                className="absolute bottom-0 left-0 h-1"
                style={{ width: `${(1 - autoAdvanceProgress) * 100}%`, background: 'rgba(255,255,255,0.45)' }}
              />
            </button>
          )}
          {wrongSubmit && (
            <button
              onClick={() => handleSkip()}
              className="relative w-full py-3 rounded-xl text-base font-bold overflow-hidden mt-2"
              style={{ background: 'var(--incorrect)', color: '#fff', cursor: 'pointer', border: 'none' }}
              role="status"
              aria-live="assertive"
            >
              ✗ {currentIdx + 1 >= cards.length ? t.seeResults : t.nextCard} →
              <div
                className="absolute bottom-0 left-0 h-1"
                style={{ width: `${(1 - autoAdvanceProgress) * 100}%`, background: 'rgba(255,255,255,0.45)' }}
              />
            </button>
          )}
          <VirtualKeyboard target={target} input={input} pronunciation={currentCard?.pronunciation} deckLang={deckSourceLang ?? undefined} />
        </div>
      </main>
    </>
  );
}
