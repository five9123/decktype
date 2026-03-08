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
import { SmoothCaret } from '@/components/SmoothCaret';
import { VirtualKeyboard } from '@/components/VirtualKeyboard';
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

function formatElapsed(s: number): string {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function DemoPracticePage() {
  const { deckId } = useParams<{ deckId: string }>();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') ?? 'back_to_front') as PracticeMode;

  const { t } = useLanguage();
  const { focusMode } = usePreferences();
  const router = useRouter();
  const { viewportH, compact, mainRef } = useViewport();
  const inputRef = useRef<HTMLInputElement>(null);
  const charContainerRef = useRef<HTMLDivElement>(null);
  const { play: playSound } = useSound();

  const deck = DEMO_DECKS.find((d) => d.id === deckId);
  const [cards] = useState(() => deck ? [...deck.cards] : []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ wpm: number; accuracy: number }[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentCard = cards[currentIdx];
  const prompt = currentCard ? currentCard.front : '';
  const meaningHint = currentCard && mode === 'back_to_front' ? currentCard.back : null;
  const target = currentCard
    ? mode === 'front_to_back' ? currentCard.back : currentCard.front
    : '';

  const {
    input, charStates, isComplete, wpm, accuracy, elapsedSeconds,
    handleInput: rawHandleInput, reset,
  } = useTyping(target, isComposing);

  const handleInput = useCallback((val: string) => {
    if (val.length > input.length) playSound();
    rawHandleInput(val);
  }, [rawHandleInput, playSound, input.length]);

  const caretPosition = charStates.filter((cs) => cs.status !== 'idle').length;

  // Auto-advance after completion
  useEffect(() => {
    if (!isComplete || sessionComplete) return;

    setSessionResults((prev) => [...prev, { wpm: wpm ?? 0, accuracy: accuracy ?? 100 }]);

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
  }, [isComplete, currentIdx, cards.length, sessionComplete, wpm, accuracy, reset]);

  const handleSkip = useCallback(() => {
    setSessionResults((prev) => [...prev, { wpm: 0, accuracy: 0 }]);
    if (currentIdx + 1 >= cards.length) {
      setSessionComplete(true);
    } else {
      setCurrentIdx((i) => i + 1);
      reset();
      inputRef.current?.focus();
    }
  }, [currentIdx, cards.length, reset]);

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
      <main
        ref={mainRef as React.RefObject<HTMLDivElement>}
        className={`fixed inset-x-0 flex flex-col ${focusMode ? 'focus-mode' : ''}`}
        style={{ height: viewportH || '100vh', background: 'var(--bg)' }}
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
              <span>{currentIdx + 1} / {cards.length}</span>
              <span>{wpm !== null ? `${wpm} WPM` : '-- WPM'}</span>
              <span>{accuracy !== null ? `${accuracy}%` : '--%'}</span>
            </div>
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
