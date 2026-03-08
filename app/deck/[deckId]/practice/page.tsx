'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTyping } from '@/hooks/useTyping';
import { useViewport } from '@/hooks/useViewport';
import { useSound } from '@/hooks/useSound';
import { ConfettiEffect } from '@/components/ConfettiEffect';
import { SmoothCaret } from '@/components/SmoothCaret';
import { VirtualKeyboard } from '@/components/VirtualKeyboard';
import { createBrowserClient } from '@/lib/supabase/client';
import { computeCompositeScore } from '@/lib/highscore';
import { smartOrder } from '@/lib/smart-order';
import { useMastery } from '@/hooks/useMastery';
import { usePersonalBest } from '@/hooks/usePersonalBest';
import { AUTO_ADVANCE_DELAY } from '@/lib/constants';
import type { Card, PracticeMode, CardOrder, CardResult, TypingSession, MasteryLevel } from '@/types';

/** Unbiased Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Format elapsed seconds as "45s" or "1:23" */
function formatElapsed(s: number): string {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function PracticePage() {
  const { deckId } = useParams<{ deckId: string }>();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') ?? 'back_to_front') as PracticeMode;
  const order = (searchParams.get('order') ?? 'sequential') as CardOrder;

  const { user } = useAuth();
  const { t } = useLanguage();
  const { focusMode } = usePreferences();
  const router = useRouter();
  const { viewportH, compact, mainRef } = useViewport();
  const inputRef = useRef<HTMLInputElement>(null);
  const charContainerRef = useRef<HTMLDivElement>(null);
  const { play: playSound } = useSound();
  const { masteryMap, loading: masteryLoading, updateMastery } = useMastery(deckId);
  const { checkAndUpdate: checkPB } = usePersonalBest();

  // Keep a ref to the latest updateMastery to avoid adding it to effect deps
  // (updateMastery re-creates on every masteryMap update, causing infinite loops)
  const updateMasteryRef = useRef(updateMastery);
  useEffect(() => { updateMasteryRef.current = updateMastery; });

  const [cards, setCards] = useState<Card[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [sessionResults, setSessionResults] = useState<CardResult[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [levelUps, setLevelUps] = useState<{ cardId: string; level: MasteryLevel }[]>([]);

  // Keep a ref to the latest levelUps to avoid adding it to session-save effect deps
  // (levelUps can update after sessionComplete=true due to async updateMastery, causing double DB inserts)
  const levelUpsRef = useRef(levelUps);
  useEffect(() => { levelUpsRef.current = levelUps; });

  // Load, sort, and optionally shuffle cards
  useEffect(() => {
    if (!user || !deckId) return;
    if (order === 'smart_review' && masteryLoading) return; // Wait for mastery data
    const supabase = createBrowserClient();

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

        setCards(cardList);
        setLoading(false);
      });
  }, [user, deckId, order, masteryLoading, masteryMap]);

  const currentCard = cards[currentIdx];
  // Both modes show the word (front) as the main prompt
  const prompt = currentCard ? currentCard.front : '';
  // back_to_front (단어 타이핑): show meaning as a hint reference below the word
  const meaningHint = currentCard && mode === 'back_to_front' ? currentCard.back : null;
  // front_to_back: type the meaning; back_to_front: type the word
  const target = currentCard
    ? mode === 'front_to_back' ? currentCard.back : currentCard.front
    : '';

  const {
    input, charStates, isComplete, wpm, accuracy, elapsedSeconds,
    handleInput: rawHandleInput, reset,
  } = useTyping(target, isComposing);

  // Wrap handleInput to play sound on each keystroke
  const handleInput = useCallback((val: string) => {
    if (val.length > input.length) {
      playSound();
    }
    rawHandleInput(val);
  }, [rawHandleInput, playSound, input.length]);

  // Compute caret position (number of typed graphemes, excluding spaces in target)
  const caretPosition = charStates.filter((cs) => cs.status !== 'idle').length;

  // Auto-advance after completion
  useEffect(() => {
    if (!isComplete || sessionComplete) return;

    // Save completed card result
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
      },
    ]);

    // Update mastery data
    if (currentCard?.id) {
      updateMasteryRef.current(currentCard.id, cardAccuracy, cardWpm).then((newLevel) => {
        if (newLevel) {
          setLevelUps((prev) => [...prev, { cardId: currentCard.id, level: newLevel }]);
        }
      });
    }

    const timer = setTimeout(() => {
      if (currentIdx + 1 >= cards.length) {
        setShowConfetti(true);
        setSessionComplete(true);
      } else {
        setCurrentIdx((i) => i + 1);
        reset();
        inputRef.current?.focus();
      }
    }, AUTO_ADVANCE_DELAY);

    return () => clearTimeout(timer);
  }, [isComplete, currentIdx, cards.length, sessionComplete, wpm, accuracy, elapsedSeconds, currentCard?.id, reset]);

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
        // Check for personal bests
        const pbRecords = await checkPB(deckId, mode, avgWpm, avgAcc, compositeScore);

        sessionStorage.setItem('atype__session', JSON.stringify({
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
    if (currentCard) {
      setSessionResults((prev) => [
        ...prev,
        {
          id: '',
          session_id: '',
          card_id: currentCard.id,
          wpm: 0,
          accuracy: 0,
          time_ms: elapsedSeconds * 1000,
        },
      ]);
    }
    if (currentIdx + 1 >= cards.length) {
      setSessionComplete(true);
    } else {
      setCurrentIdx((i) => i + 1);
      reset();
      inputRef.current?.focus();
    }
  }, [currentIdx, cards.length, reset, currentCard, elapsedSeconds]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
      </div>
    );
  }

  return (
    <>
      <ConfettiEffect active={showConfetti} />
      <main
        ref={mainRef as React.RefObject<HTMLDivElement>}
        className={`fixed inset-x-0 flex flex-col ${focusMode ? 'focus-mode' : ''}`}
        style={{
          height: viewportH || '100vh',
          background: 'var(--bg)',
        }}
      >
        {/* Top bar */}
        <div
          className="top-toolbar flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <button
            onClick={() => router.push(`/deck/${deckId}`)}
            className="text-sm"
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            &larr; Exit
          </button>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
            <span>{currentIdx + 1} / {cards.length}</span>
            <span>{wpm !== null ? `${wpm} WPM` : '-- WPM'}</span>
            <span>{accuracy !== null ? `${accuracy}%` : '--%'}</span>
          </div>
        </div>

        {/* Card area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6 w-full mx-auto" style={{ maxWidth: '700px' }}>
          {/* Prompt */}
          <div className="text-center">
            <p
              className={`text-2xl ${compact ? 'sm:text-3xl' : 'sm:text-4xl'} font-bold`}
              style={{ color: 'var(--text)' }}
            >
              {prompt}
            </p>
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

          {/* Character states with smooth caret */}
          <div
            ref={charContainerRef}
            className="relative flex flex-wrap justify-center gap-0.5 font-mono"
            style={{ fontSize: 'var(--typing-font-size, 1.25rem)' }}
          >
            {charStates.map((cs, i) => (
              <span key={i} data-char className={`char-${cs.status}`}>
                {cs.char === ' ' ? '\u00A0' : cs.char}
              </span>
            ))}
            <SmoothCaret
              containerRef={charContainerRef}
              position={caretPosition}
              hidden={isComplete}
            />
          </div>

          {/* Correct message */}
          {isComplete && (
            <p className="text-lg font-bold" style={{ color: 'var(--correct)' }}>
              {t.correctMsg}
            </p>
          )}
        </div>

        {/* Input area */}
        <div className="px-4 pb-4 w-full mx-auto" style={{ maxWidth: '700px' }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={(e) => {
              setIsComposing(false);
              handleInput((e.target as HTMLInputElement).value);
            }}
            placeholder={t.typeHere}
            autoFocus
            disabled={isComplete}
            className="w-full px-4 py-3 rounded-xl text-base"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              outline: 'none',
            }}
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleSkip}
              className="text-sm"
              style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t.skip} &rarr;
            </button>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
          <VirtualKeyboard target={target} />
        </div>
      </main>
    </>
  );
}
