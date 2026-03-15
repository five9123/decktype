'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { createBrowserClient } from '@/lib/supabase/client';
import { shuffle } from '@/lib/utils';
import type { Card } from '@/types';

// ── Types ──────────────────────────────────────────────────────────────

type GameStatus = 'ready' | 'playing' | 'gameover';

interface WordResult {
  cardId: string;
  correct: boolean;
}

interface Props {
  cards: Card[];
  deckId: string;
  onExit: () => void;
}

// ── Constants ──────────────────────────────────────────────────────────

const INITIAL_TIME = 60;       // seconds
const TIME_PENALTY = 3;        // seconds lost on wrong submit
const COMBO_MILESTONES = [
  { threshold: 3, bonus: 1 },
  { threshold: 6, bonus: 1 },
  { threshold: 10, bonus: 2 },
  { threshold: 15, bonus: 3 },
];
const MAX_COMBO = COMBO_MILESTONES[COMBO_MILESTONES.length - 1].threshold;
const MAX_VISIBLE_CARS = 10;

// ── Component ──────────────────────────────────────────────────────────

export function WordTrainGame({ cards, deckId, onExit }: Props) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { play: playSound } = useSound();
  const inputRef = useRef<HTMLInputElement>(null);

  // Game state
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highestCombo, setHighestCombo] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [results, setResults] = useState<WordResult[]>([]);
  const [cardKey, setCardKey] = useState(0);
  const [bonusText, setBonusText] = useState<string | null>(null);
  const [flashCorrect, setFlashCorrect] = useState(false);

  // Refs
  const cardPoolRef = useRef<Card[]>([]);
  const cardIndexRef = useRef(0);
  const sessionSavedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeLeftRef = useRef(INITIAL_TIME);

  // ── Card pool ──

  const getNextCard = useCallback((): Card => {
    const pool = cardPoolRef.current;
    if (cardIndexRef.current >= pool.length) {
      cardPoolRef.current = shuffle(cards);
      cardIndexRef.current = 0;
    }
    return pool[cardIndexRef.current++];
  }, [cards]);

  // ── Timer ──

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        setGameStatus('gameover');
      }
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  // ── Start game ──

  const startGame = useCallback(() => {
    sessionSavedRef.current = false;
    cardPoolRef.current = shuffle(cards);
    cardIndexRef.current = 0;
    const firstCard = cardPoolRef.current[cardIndexRef.current++];

    setGameStatus('playing');
    setCurrentCard(firstCard);
    setInput('');
    setTimeLeft(INITIAL_TIME);
    timeLeftRef.current = INITIAL_TIME;
    setScore(0);
    setCombo(0);
    setHighestCombo(0);
    setCompleted(0);
    setCorrect(0);
    setResults([]);
    setCardKey(0);
    setBonusText(null);
    setFlashCorrect(false);

    setTimeout(() => inputRef.current?.focus(), 50);
  }, [cards]);

  // ── Advance to next card ──

  const advanceCard = useCallback(() => {
    setInput('');
    setCurrentCard(getNextCard());
    setCardKey((k) => k + 1);
    setTimeout(() => inputRef.current?.focus(), 30);
  }, [getNextCard]);

  // ── Submit answer ──

  const handleSubmit = useCallback(() => {
    if (!currentCard || gameStatus !== 'playing') return;
    const trimmed = input.trim().normalize('NFC');
    const target = currentCard.front.normalize('NFC');

    if (trimmed.toLowerCase() === target.toLowerCase()) {
      // ✅ Correct
      playSound();
      const newCombo = combo + 1;
      const points = 10 + newCombo * 2;
      setScore((s) => s + points);
      setCombo(newCombo);
      setHighestCombo((h) => Math.max(h, newCombo));
      setCorrect((c) => c + 1);
      setCompleted((c) => c + 1);
      setResults((r) => [...r, { cardId: currentCard.id, correct: true }]);

      // Correct flash animation
      setFlashCorrect(true);
      setTimeout(() => setFlashCorrect(false), 400);

      // Check combo milestones for time bonus
      const milestone = COMBO_MILESTONES.find((m) => m.threshold === newCombo);
      if (milestone) {
        timeLeftRef.current = Math.min(timeLeftRef.current + milestone.bonus, 99);
        setTimeLeft(timeLeftRef.current);
        setBonusText(`+${milestone.bonus}s`);
        setTimeout(() => setBonusText(null), 800);
      }

      advanceCard();
    } else if (trimmed.length > 0) {
      // ✗ Wrong answer
      setCombo(0);
      setCompleted((c) => c + 1);
      setResults((r) => [...r, { cardId: currentCard.id, correct: false }]);

      // Time penalty
      timeLeftRef.current = Math.max(0, timeLeftRef.current - TIME_PENALTY);
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        setGameStatus('gameover');
        return;
      }

      advanceCard();
    }
  }, [input, currentCard, combo, gameStatus, playSound, advanceCard]);

  // ── Skip ──

  const handleSkip = useCallback(() => {
    if (!currentCard || gameStatus !== 'playing') return;
    setCombo(0);
    setCompleted((c) => c + 1);
    setResults((r) => [...r, { cardId: currentCard.id, correct: false }]);
    advanceCard();
  }, [currentCard, gameStatus, advanceCard]);

  // ── Input handlers ──

  const handleInputChange = (value: string) => {
    if (value.length > input.length) playSound();
    setInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ── Save session on game over ──

  useEffect(() => {
    if (gameStatus !== 'gameover' || !user || sessionSavedRef.current) return;
    sessionSavedRef.current = true;
    const total = completed;
    const elapsedMs = (INITIAL_TIME - Math.max(timeLeft, 0)) * 1000;
    const supabase = createBrowserClient();
    supabase.from('typing_sessions').insert({
      user_id: user.id,
      deck_id: deckId,
      wpm: 0,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      composite_score: score,
      card_count: total,
      duration_ms: elapsedMs,
      mode: 'word_train',
    }).then(() => {});
  }, [gameStatus, user, deckId, completed, correct, score, timeLeft]);

  // ── Combo meter progress ──
  const meterProgress = Math.min(combo / MAX_COMBO, 1);

  // ── Ready screen ──
  if (gameStatus === 'ready') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="text-center max-w-sm">
          <p className="text-5xl mb-4">🚂</p>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {t.wordTrain ?? 'Word Train'}
          </h1>
          <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>
            {t.wordTrainDesc ?? 'Type each word before time runs out!'}
          </p>
          <p className="text-xs mb-6" style={{ color: 'var(--muted)', opacity: 0.7 }}>
            {t.wordTrainTimerDesc ?? 'Build combos for bonus time!'}
          </p>
          <button
            onClick={startGame}
            className="px-8 py-3 rounded-xl text-base font-bold transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            {t.startPractice} →
          </button>
          <button
            onClick={onExit}
            className="block mx-auto mt-4 text-sm"
            style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← {t.backToDeck}
          </button>
        </div>
      </div>
    );
  }

  // ── Game Over screen ──
  if (gameStatus === 'gameover') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="text-center max-w-sm w-full">
          <p className="text-5xl mb-4">🚃</p>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
            {t.timeUp ?? "Time's Up!"}
          </h1>
          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.score ?? 'Score'}</p>
              <p className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{score}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.wordsCompleted ?? 'Words'}</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{completed}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.correctLabel}</p>
              <p className="text-xl font-bold" style={{ color: 'var(--correct)' }}>{correct}</p>
            </div>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Best Combo: <strong style={{ color: 'var(--accent)' }}>x{highestCombo}</strong>
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              {t.playAgain ?? 'Play Again'}
            </button>
            <button
              onClick={onExit}
              className="px-4 py-2.5 rounded-xl text-sm"
              style={{ color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer' }}
            >
              {t.backToDeck}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing screen ──
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* HUD */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🚂</span>
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>
            {t.wordTrain}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`text-lg font-bold tabular-nums ${timeLeft <= 10 ? 'timer-critical' : ''}`}
            style={{ color: timeLeft <= 10 ? 'var(--incorrect)' : 'var(--accent)' }}
          >
            ⏱ {timeLeft}s
          </span>
          <span className="text-sm" style={{ color: 'var(--accent)' }}>
            <strong>{score}</strong> <span className="text-xs" style={{ color: 'var(--muted)' }}>pts</span>
          </span>
        </div>
        <button
          onClick={onExit}
          className="text-xs"
          style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Exit
        </button>
      </div>

      {/* Combo Meter */}
      <div className="px-4 py-3 max-w-lg mx-auto w-full">
        <div className="relative">
          {/* Background bar */}
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
            {/* Fill */}
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${meterProgress * 100}%`,
                background: 'linear-gradient(90deg, var(--accent), var(--correct))',
              }}
            />
          </div>
          {/* Milestone tick marks */}
          {COMBO_MILESTONES.map((m, i) => (
            <div
              key={i}
              className="absolute top-0 flex flex-col items-center"
              style={{
                left: `${(m.threshold / MAX_COMBO) * 100}%`,
                transform: 'translateX(-50%)',
                height: 12,
              }}
            >
              <div
                className="w-0.5"
                style={{
                  height: 12,
                  background: combo >= m.threshold ? 'var(--correct)' : 'var(--border)',
                }}
              />
              <span
                className="text-[10px] mt-0.5 whitespace-nowrap"
                style={{ color: combo >= m.threshold ? 'var(--correct)' : 'var(--muted)' }}
              >
                +{m.bonus}s
              </span>
            </div>
          ))}
          {/* Bonus popup */}
          {bonusText && (
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold bonus-pop"
              style={{ color: 'var(--correct)' }}
            >
              {bonusText}
            </div>
          )}
        </div>
        {/* Combo counter */}
        {combo > 0 && (
          <p className="text-xs text-center mt-1.5 font-bold" style={{ color: 'var(--accent)' }}>
            x{combo} combo
          </p>
        )}
      </div>

      {/* Word Card */}
      <div className="flex-1 flex items-center justify-center px-4">
        {currentCard && (
          <div
            key={cardKey}
            className={`card-enter p-8 rounded-2xl text-center max-w-sm w-full ${flashCorrect ? 'correct-flash' : ''}`}
            style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
            }}
          >
            <p className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              {currentCard.back}
            </p>
            {currentCard.pronunciation && (
              <p className="text-sm" style={{ color: 'var(--accent)', opacity: 0.85 }}>
                [{currentCard.pronunciation}]
              </p>
            )}
          </div>
        )}
      </div>

      {/* Train Track & Cars */}
      <div className="px-4 max-w-lg mx-auto w-full">
        {/* Track line */}
        <div
          className="h-0.5 mb-1"
          style={{
            background: 'var(--border)',
            backgroundImage: 'repeating-linear-gradient(90deg, var(--border) 0, var(--border) 10px, transparent 10px, transparent 15px)',
          }}
        />
        {/* Train cars */}
        <div className="flex items-center gap-0.5 overflow-hidden h-6 mb-2">
          {results.slice(-MAX_VISIBLE_CARS).map((r, i, arr) => (
            <span
              key={results.length - arr.length + i}
              className={i === arr.length - 1 ? 'train-slide' : ''}
              style={{ fontSize: 16, opacity: r.correct ? 1 : 0.4 }}
            >
              {r.correct ? '🚃' : '💨'}
            </span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4 max-w-lg mx-auto w-full">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setInput(e.currentTarget.value);
            setIsComposing(false);
          }}
          placeholder={t.typeHere}
          autoFocus
          className="w-full px-4 py-3 rounded-xl text-base text-center"
          style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            color: 'var(--text)',
            outline: 'none',
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {completed} {t.wordsCompleted ?? 'words'}
          </span>
          <button
            onClick={handleSkip}
            className="text-xs"
            style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {t.skip} →
          </button>
        </div>
      </div>
    </div>
  );
}
