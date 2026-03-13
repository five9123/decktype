'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTyping } from '@/hooks/useTyping';
import { useSound } from '@/hooks/useSound';
import { useTTS } from '@/hooks/useTTS';
import { ConfettiEffect } from '@/components/ConfettiEffect';
import { createBrowserClient } from '@/lib/supabase/client';
import { AUTO_ADVANCE_DELAY } from '@/lib/constants';
import type { Card } from '@/types';

interface Props {
  cards: Card[];
  deckId: string;
  onExit: () => void;
}

/** Shuffle helper */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FillBlankGame({ cards: rawCards, deckId, onExit }: Props) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const { play: playSound } = useSound();
  const { speak } = useTTS();
  const inputRef = useRef<HTMLInputElement>(null);

  const [cards] = useState(() => shuffle(rawCards));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [wrongSubmit, setWrongSubmit] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; cardId: string }[]>([]);
  const [autoAdvanceProgress, setAutoAdvanceProgress] = useState(0);

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoAdvanceRaf = useRef<number | null>(null);
  const autoAdvanceStart = useRef<number>(0);
  const resultSavedRef = useRef(false);
  const isAdvancingRef = useRef(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentCard = cards[currentIdx];

  // For Cloze cards: front = sentence_with_blank, back = answer, extra = full_sentence, pronunciation = hint
  // For Basic cards: front = word, back = meaning — fill blank is "type the word given the meaning"
  const isCloze = currentCard?.note_type === 'Cloze';
  const answer = currentCard?.back ?? '';
  const sentence = isCloze ? currentCard.front : '';
  const fullSentence = isCloze ? (currentCard.extra || '') : '';
  const hintText = isCloze ? (currentCard.pronunciation || '') : (currentCard?.back || '');

  const {
    input, charStates, isComplete, wpm, accuracy,
    handleInput: rawHandleInput, reset,
  } = useTyping(answer);

  const handleInput = useCallback((val: string) => {
    if (val.length > input.length) playSound();
    rawHandleInput(val);
  }, [rawHandleInput, playSound, input.length]);

  // Reset per card
  useEffect(() => {
    resultSavedRef.current = false;
    setWrongSubmit(false);
    setShowHint(false);
    setHintRevealed(false);
    setAutoAdvanceProgress(0);
    // Auto-show first letter hint after 5 seconds
    hintTimer.current = setTimeout(() => setHintRevealed(true), 5000);
    return () => { if (hintTimer.current) clearTimeout(hintTimer.current); };
  }, [currentIdx]);

  // Focus input on card change
  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(id);
  }, [currentIdx]);

  const advanceToNext = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
    setAutoAdvanceProgress(0);

    if (currentIdx + 1 >= cards.length) {
      setShowConfetti(true);
      setSessionComplete(true);
    } else {
      isAdvancingRef.current = true;
      if (inputRef.current) inputRef.current.value = '';
      reset();
      setCurrentIdx((i) => i + 1);
      requestAnimationFrame(() => { isAdvancingRef.current = false; });
    }
  }, [currentIdx, cards.length, reset]);

  // On correct answer
  useEffect(() => {
    if (!isComplete || isComposing || sessionComplete || resultSavedRef.current) return;
    resultSavedRef.current = true;
    speak(answer);
    setResults((prev) => [...prev, { correct: true, cardId: currentCard?.id ?? '' }]);

    autoAdvanceStart.current = performance.now();
    const animate = () => {
      const elapsed = performance.now() - autoAdvanceStart.current;
      const progress = Math.min(elapsed / AUTO_ADVANCE_DELAY, 1);
      setAutoAdvanceProgress(progress);
      if (progress < 1) autoAdvanceRaf.current = requestAnimationFrame(animate);
    };
    autoAdvanceRaf.current = requestAnimationFrame(animate);
    autoAdvanceTimer.current = setTimeout(() => advanceToNext(), AUTO_ADVANCE_DELAY);

    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, isComposing, sessionComplete]);

  // On wrong submit — auto-advance after delay
  useEffect(() => {
    if (!wrongSubmit) return;
    autoAdvanceStart.current = performance.now();
    const animate = () => {
      const elapsed = performance.now() - autoAdvanceStart.current;
      const progress = Math.min(elapsed / AUTO_ADVANCE_DELAY, 1);
      setAutoAdvanceProgress(progress);
      if (progress < 1) autoAdvanceRaf.current = requestAnimationFrame(animate);
    };
    autoAdvanceRaf.current = requestAnimationFrame(animate);
    autoAdvanceTimer.current = setTimeout(() => advanceToNext(), AUTO_ADVANCE_DELAY);

    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
      setAutoAdvanceProgress(0);
    };
  }, [wrongSubmit, advanceToNext]);

  // Enter to advance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === 'Enter' && (isComplete || wrongSubmit)) {
        e.preventDefault();
        advanceToNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isComplete, wrongSubmit, advanceToNext]);

  // Save session on complete
  useEffect(() => {
    if (!sessionComplete || !user) return;
    const correct = results.filter((r) => r.correct).length;
    const supabase = createBrowserClient();
    supabase.from('typing_sessions').insert({
      user_id: user.id,
      deck_id: deckId,
      wpm: 0,
      accuracy: Math.round((correct / results.length) * 100),
      composite_score: 0,
      card_count: results.length,
      duration_ms: 0,
      mode: 'fill_blank',
    }).then(() => {});
  }, [sessionComplete, user, deckId, results]);

  // First letter hint text
  const firstLetterHint = answer.length > 0
    ? answer[0] + '_'.repeat(Math.max(0, answer.length - 1))
    : '';

  // Results screen
  if (sessionComplete) {
    const correct = results.filter((r) => r.correct).length;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: 'var(--bg)' }}>
        <ConfettiEffect active={showConfetti} />
        <div className="w-full max-w-sm text-center">
          <p className="text-5xl mb-4">🎉</p>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {t.resultsTitle}
          </h1>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{t.correctLabel}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--correct)' }}>{correct}/{results.length}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{t.accuracyLabel}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                {results.length > 0 ? Math.round((correct / results.length) * 100) : 0}%
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setCurrentIdx(0); setResults([]); setSessionComplete(false); setShowConfetti(false); reset(); }}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer' }}
            >
              {t.practiceAgain}
            </button>
            <button
              onClick={onExit}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer' }}
            >
              {t.backToDeck}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <ConfettiEffect active={false} />

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto w-full">
          <button
            onClick={onExit}
            className="text-sm"
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            &larr; Exit
          </button>
          <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
            {currentIdx + 1} / {cards.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2 max-w-2xl mx-auto w-full">
        <div className="rounded-full overflow-hidden" style={{ height: 4, background: 'var(--surface)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / cards.length) * 100}%`, background: 'var(--accent)' }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6 max-w-2xl mx-auto w-full">
        {/* Sentence with blank */}
        {isCloze ? (
          <div className="text-center">
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text)' }}>
              {sentence.split('_____').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span
                      className="inline-block min-w-[80px] border-b-2 mx-1 text-center font-bold"
                      style={{
                        borderColor: isComplete ? 'var(--correct)' : wrongSubmit ? 'var(--incorrect)' : 'var(--accent)',
                        color: isComplete ? 'var(--correct)' : wrongSubmit ? 'var(--incorrect)' : 'var(--accent)',
                      }}
                    >
                      {isComplete ? answer : wrongSubmit ? answer : (hintRevealed ? firstLetterHint : '_____')}
                    </span>
                  )}
                </span>
              ))}
            </p>
            {hintText && showHint && (
              <p className="text-sm mt-3" style={{ color: 'var(--muted)' }}>
                💡 {hintText}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
              {t.fillBlank ?? 'Type the word'}
            </p>
            <p className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              {currentCard?.back}
            </p>
            {currentCard?.pronunciation && (
              <p className="text-sm" style={{ color: 'var(--accent)', opacity: 0.85 }}>
                {currentCard.pronunciation}
              </p>
            )}
          </div>
        )}

        {/* Per-character feedback */}
        {input.length > 0 && (
          <div className="flex flex-wrap justify-center gap-0.5 text-2xl font-bold">
            {charStates.map((cs, i) => (
              <span key={i} className={`char-${cs.status}`}
                style={cs.char === ' ' ? { width: '0.3em' } : undefined}>
                {cs.char === ' ' ? '\u00A0' : cs.char}
              </span>
            ))}
          </div>
        )}

        {/* Full sentence reveal on complete */}
        {(isComplete || wrongSubmit) && fullSentence && (
          <p className="text-sm text-center" style={{ color: 'var(--muted)' }}>
            {fullSentence}
          </p>
        )}
      </div>

      {/* Input area */}
      <div className="px-4 pb-6 max-w-2xl mx-auto w-full">
        {!showHint && !isComplete && !wrongSubmit && isCloze && (
          <button
            onClick={() => setShowHint(true)}
            className="text-xs mb-2 block mx-auto"
            style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            💡 {t.showHint ?? 'Show hint'}
          </button>
        )}

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            if (isAdvancingRef.current || isComplete || wrongSubmit) return;
            handleInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (isComplete || wrongSubmit) return;
            if (e.key === 'Enter' && !e.nativeEvent.isComposing && input.length > 0) {
              if (!resultSavedRef.current) {
                resultSavedRef.current = true;
                setResults((prev) => [...prev, { correct: false, cardId: currentCard?.id ?? '' }]);
              }
              setWrongSubmit(true);
            }
          }}
          onCompositionStart={() => { if (!isAdvancingRef.current) setIsComposing(true); }}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={t.typeHere}
          autoFocus
          className={`w-full px-4 py-3 rounded-xl text-base text-center${wrongSubmit ? ' wrong-shake' : ''}`}
          style={{
            background: 'var(--surface)',
            border: wrongSubmit ? '1.5px solid var(--incorrect)' : '1.5px solid var(--border)',
            color: 'var(--text)',
            outline: 'none',
            opacity: isComplete ? 0.5 : 1,
          }}
        />

        {isComplete && (
          <button
            onClick={advanceToNext}
            className="relative w-full py-3 rounded-xl text-base font-bold overflow-hidden mt-2"
            style={{ background: 'var(--correct)', color: '#fff', cursor: 'pointer', border: 'none' }}
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
            onClick={advanceToNext}
            className="relative w-full py-3 rounded-xl text-base font-bold overflow-hidden mt-2"
            style={{ background: 'var(--incorrect)', color: '#fff', cursor: 'pointer', border: 'none' }}
          >
            ✗ {answer} — {currentIdx + 1 >= cards.length ? t.seeResults : t.nextCard} →
            <div
              className="absolute bottom-0 left-0 h-1"
              style={{ width: `${(1 - autoAdvanceProgress) * 100}%`, background: 'rgba(255,255,255,0.45)' }}
            />
          </button>
        )}
      </div>
    </div>
  );
}
