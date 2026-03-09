'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTyping } from '@/hooks/useTyping';
import { useViewport } from '@/hooks/useViewport';
import { useSound } from '@/hooks/useSound';
import { ConfettiEffect } from '@/components/ConfettiEffect';
import { VirtualKeyboard } from '@/components/VirtualKeyboard';
import { PreferencesPanel } from '@/components/PreferencesPanel';
import { DEMO_DECKS } from '@/lib/demo-decks';
import { AUTO_ADVANCE_DELAY } from '@/lib/constants';
import type { PracticeMode } from '@/types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


export default function DemoPracticePage() {
  const { deckId } = useParams<{ deckId: string }>();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') ?? 'back_to_front') as PracticeMode;

  const { t } = useLanguage();
  const { focusMode, feedbackEffects } = usePreferences();
  const router = useRouter();
  const { viewportH, compact, mainRef } = useViewport();
  const inputRef = useRef<HTMLInputElement>(null);
  const { play: playSound } = useSound();

  const deck = DEMO_DECKS.find((d) => d.id === deckId);
  const [cards] = useState(() => deck ? [...deck.cards] : []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCardConfetti, setShowCardConfetti] = useState(false);
  const [wrongSubmit, setWrongSubmit] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ wpm: number; accuracy: number }[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [autoAdvanceProgress, setAutoAdvanceProgress] = useState(0);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoAdvanceRaf = useRef<number | null>(null);
  const autoAdvanceStart = useRef<number>(0);
  // Separate refs for wrongSubmit countdown to avoid race with isComplete countdown
  const wrongSubmitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongSubmitRaf = useRef<number | null>(null);
  const wrongSubmitStart = useRef<number>(0);

  const currentCard = cards[currentIdx];
  const prompt = currentCard ? currentCard.front : '';
  const meaningHint = currentCard && mode === 'back_to_front' ? currentCard.back : null;
  const target = currentCard
    ? mode === 'front_to_back' ? currentCard.back : currentCard.front
    : '';

  const {
    input, charStates, isComplete, wpm, accuracy, elapsedSeconds,
    handleInput: rawHandleInput, reset,
  } = useTyping(target);

  const handleInput = useCallback((val: string) => {
    if (val.length > input.length) playSound();
    rawHandleInput(val);
  }, [rawHandleInput, playSound, input.length]);

  // Re-focus input whenever card changes
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, [currentIdx]);

  // Guard: prevent duplicate result-saving when effect re-runs while isComplete=true
  const handleSkipRef = useRef<() => void>(() => {});
  const resultSavedRef = useRef(false);
  useEffect(() => { resultSavedRef.current = false; setWrongSubmit(false); }, [currentIdx]);

  // Advance to next card (or finish session)
  const advanceToNext = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
    if (wrongSubmitTimer.current) clearTimeout(wrongSubmitTimer.current);
    if (wrongSubmitRaf.current) cancelAnimationFrame(wrongSubmitRaf.current);
    setAutoAdvanceProgress(0);

    if (currentIdx + 1 >= cards.length) {
      setShowConfetti(true);
      setSessionComplete(true);
    } else {
      setCurrentIdx((i) => i + 1);
      reset();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [currentIdx, cards.length, reset]);

  // Save result once when card completes
  useEffect(() => {
    if (!isComplete || sessionComplete || resultSavedRef.current) return;
    resultSavedRef.current = true;
    if (feedbackEffects) {
      setShowCardConfetti(true);
      setTimeout(() => setShowCardConfetti(false), 2500);
    }
    setSessionResults((prev) => [...prev, { wpm: wpm ?? 0, accuracy: accuracy ?? 100 }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, sessionComplete]);

  // RAF countdown animation — separate effect so wpm/accuracy re-renders don't restart it
  useEffect(() => {
    if (!isComplete || sessionComplete) return;

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
  }, [isComplete, sessionComplete, advanceToNext]);

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
      if (e.isComposing || e.repeat) return;
      if (e.key === 'Enter' && isComplete) {
        e.preventDefault();
        advanceToNext();
      } else if (e.key === 'Enter' && wrongSubmit) {
        // Grace period: prevent accidental double-Enter (e.g. mobile keyboard double-tap)
        if (performance.now() - wrongSubmitStart.current < 300) return;
        e.preventDefault();
        handleSkipRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isComplete, advanceToNext, wrongSubmit]);

  const handleSkip = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (autoAdvanceRaf.current) cancelAnimationFrame(autoAdvanceRaf.current);
    if (wrongSubmitTimer.current) clearTimeout(wrongSubmitTimer.current);
    if (wrongSubmitRaf.current) cancelAnimationFrame(wrongSubmitRaf.current);
    setAutoAdvanceProgress(0);
    if (!resultSavedRef.current) {
      resultSavedRef.current = true;
      setSessionResults((prev) => [...prev, { wpm: 0, accuracy: 0 }]);
    }
    if (currentIdx + 1 >= cards.length) {
      setSessionComplete(true);
    } else {
      setCurrentIdx((i) => i + 1);
      reset();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [currentIdx, cards.length, reset]);
  useEffect(() => { handleSkipRef.current = handleSkip; });

  const handleRestart = useCallback(() => {
    setCurrentIdx(0);
    setSessionResults([]);
    setSessionComplete(false);
    setShowConfetti(false);
    reset();
  }, [reset]);

  if (!deck) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>Deck not found</p>
      </div>
    );
  }

  // ── Results screen ──
  if (sessionComplete) {
    const completed = sessionResults.filter((r) => r.wpm > 0);
    const avgWpm = completed.length
      ? Math.round(completed.reduce((s, r) => s + r.wpm, 0) / completed.length)
      : 0;
    const avgAcc = sessionResults.length
      ? Math.round(sessionResults.reduce((s, r) => s + r.accuracy, 0) / sessionResults.length)
      : 0;

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
        style={{ background: 'var(--bg)' }}
      >
        <ConfettiEffect active={showConfetti} />

        <div className="w-full max-w-sm">
          {/* Score */}
          <div className="text-center mb-8">
            <p className="text-5xl mb-3">🎉</p>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              {t.resultsTitle}
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {deck.name} &middot; {sessionResults.length} {t.cards}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div
              className="p-4 rounded-xl text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{t.speedLabel}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                {avgWpm} <span className="text-sm font-normal">WPM</span>
              </p>
            </div>
            <div
              className="p-4 rounded-xl text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{t.accuracyLabel}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--correct)' }}>
                {avgAcc}<span className="text-sm font-normal">%</span>
              </p>
            </div>
          </div>

          {/* Sign-up CTA */}
          <div
            className="p-5 rounded-2xl mb-4"
            style={{ background: 'var(--surface)', border: `1px solid var(--accent)` }}
          >
            <p className="font-bold mb-1" style={{ color: 'var(--text)' }}>
              {t.demoSignupTitle}
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              {t.demoSignupDesc}
            </p>
            <Link
              href="/auth/login"
              className="block w-full py-2.5 rounded-xl text-sm font-bold text-center no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t.demoSignupCta} →
            </Link>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="text-sm px-4 py-2 rounded-lg"
              style={{ color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer' }}
            >
              {t.practiceAgain}
            </button>
            <Link
              href="/demo"
              className="text-sm px-4 py-2 rounded-lg no-underline"
              style={{ color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              ← {t.tryDemo}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Practice screen ──
  return (
    <>
      <ConfettiEffect active={showConfetti} />
      <ConfettiEffect active={showCardConfetti} />
      <main
        ref={mainRef as React.RefObject<HTMLDivElement>}
        className={`fixed inset-x-0 flex flex-col ${focusMode ? 'focus-mode' : ''}`}
        style={{ height: viewportH || '100vh', background: 'var(--bg)', zIndex: 10 }}
      >
        {/* Top bar */}
        <div style={{ borderBottom: '1px solid var(--border)' }}>
          <div
            className="top-toolbar flex items-center justify-between px-4 py-3 w-full mx-auto"
            style={{ maxWidth: '700px' }}
          >
            <button
              onClick={() => router.push('/demo')}
              className="text-sm"
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              &larr; Exit
            </button>
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
              >
                DEMO
              </span>
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

          <div
            className="flex flex-wrap justify-center gap-0.5 font-mono"
            style={{ fontSize: 'var(--typing-font-size, 1.25rem)' }}
          >
            {charStates.map((cs, i) => (
              <span key={i} data-char className={`char-${cs.status}`}>
                {cs.char === ' ' ? '\u00A0' : cs.char}
              </span>
            ))}
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
          {isComplete ? (
            <button
              onClick={() => advanceToNext()}
              className="relative w-full py-3 rounded-xl text-base font-bold overflow-hidden"
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
          ) : wrongSubmit ? (
            <button
              onClick={() => handleSkip()}
              className="relative w-full py-3 rounded-xl text-base font-bold overflow-hidden"
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
          ) : (
            <>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                    if (input.length > 0 && !isComplete) {
                      setWrongSubmit(true);
                      if (!resultSavedRef.current) {
                        resultSavedRef.current = true;
                        setSessionResults((prev) => [...prev, { wpm: wpm ?? 0, accuracy: accuracy ?? 0 }]);
                      }
                    } else {
                      handleSkip();
                    }
                  }
                }}
                onCompositionEnd={(e) => {
                  handleInput((e.target as HTMLInputElement).value);
                }}
                placeholder={t.typeHere}
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-base"
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text)',
                  outline: 'none',
                  transition: 'border-color 200ms',
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
                <button
                  onClick={() => {
                    if (input.length > 0 && !isComplete) {
                      setWrongSubmit(true);
                      if (!resultSavedRef.current) {
                        resultSavedRef.current = true;
                        setSessionResults((prev) => [...prev, { wpm: wpm ?? 0, accuracy: accuracy ?? 0 }]);
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
            </>
          )}
          <VirtualKeyboard target={target} input={input} />
        </div>
      </main>
    </>
  );
}
