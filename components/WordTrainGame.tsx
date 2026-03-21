'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { useViewport } from '@/hooks/useViewport';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { createBrowserClient } from '@/lib/supabase/client';
import { shuffle } from '@/lib/utils';
import { VirtualKeyboard } from '@/components/VirtualKeyboard';
import type { Card } from '@/types';
import type { ScriptLang } from '@/lib/lang-detect';

// ── Types ──────────────────────────────────────────────────────────────

type GameStatus = 'ready' | 'playing' | 'gameover';

interface WordResult {
  cardId: string;
  correct: boolean;
}

interface Props {
  cards: Card[];
  deckId: string;
  deckLang?: ScriptLang;
  onExit: () => void;
}

// ── Constants ──────────────────────────────────────────────────────────

const INITIAL_TIME = 60;
const TIME_PENALTY = 3;
const SCROLL_DURATION = 7; // seconds for train car to cross screen
const COMBO_MILESTONES = [
  { threshold: 3, bonus: 1 },
  { threshold: 6, bonus: 1 },
  { threshold: 10, bonus: 2 },
  { threshold: 15, bonus: 3 },
];
const MAX_COMBO = COMBO_MILESTONES[COMBO_MILESTONES.length - 1].threshold;
const MAX_VISIBLE_CARS = 10;

// ── Component ──────────────────────────────────────────────────────────

export function WordTrainGame({ cards, deckId, deckLang, onExit }: Props) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { play: playSound } = useSound();
  const { viewportH, mainRef } = useViewport();
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
  const [captureAnim, setCaptureAnim] = useState(false);
  const [inputCorrect, setInputCorrect] = useState(false);
  const [inputWrong, setInputWrong] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(true);
  const [showTargetWord, setShowTargetWord] = useState(true);

  // Refs
  const cardPoolRef = useRef<Card[]>([]);
  const cardIndexRef = useRef(0);
  const sessionSavedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeLeftRef = useRef(INITIAL_TIME);
  const submittingRef = useRef(false); // guard against double-submit
  const gameStatusRef = useRef<GameStatus>('ready');
  const prefsRef = useRef<HTMLDivElement>(null);
  useClickOutside(prefsRef, () => setShowPrefs(false));

  // Keep gameStatus ref in sync
  useEffect(() => { gameStatusRef.current = gameStatus; }, [gameStatus]);

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
    submittingRef.current = false;
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
    setCaptureAnim(false);

    setTimeout(() => inputRef.current?.focus(), 50);
  }, [cards]);

  // ── Advance to next card ──

  const advanceCard = useCallback(() => {
    setInput('');
    setCaptureAnim(false);
    setCurrentCard(getNextCard());
    setCardKey((k) => k + 1);
    setTimeout(() => inputRef.current?.focus(), 30);
  }, [getNextCard]);

  // ── Handle correct answer ──

  const handleCorrect = useCallback(() => {
    if (!currentCard || gameStatus !== 'playing' || submittingRef.current) return;
    submittingRef.current = true;
    playSound();
    const newCombo = combo + 1;
    const points = 10 + newCombo * 2;
    setScore((s) => s + points);
    setCombo(newCombo);
    setHighestCombo((h) => Math.max(h, newCombo));
    setCorrect((c) => c + 1);
    setCompleted((c) => c + 1);
    setResults((r) => [...r, { cardId: currentCard.id, correct: true }]);

    // Clear input immediately + green flash + capture animation
    setInput('');
    setInputCorrect(true);
    setCaptureAnim(true);

    // Check combo milestones for time bonus
    const milestone = COMBO_MILESTONES.find((m) => m.threshold === newCombo);
    if (milestone) {
      timeLeftRef.current = Math.min(timeLeftRef.current + milestone.bonus, 99);
      setTimeLeft(timeLeftRef.current);
      setBonusText(`+${milestone.bonus}s`);
      setTimeout(() => setBonusText(null), 800);
    }

    // Advance after capture animation
    setTimeout(() => {
      setInputCorrect(false);
      submittingRef.current = false;
      advanceCard();
    }, 300);
  }, [currentCard, combo, gameStatus, playSound, advanceCard]);

  // ── Check if input matches target ──

  const checkMatch = useCallback((value: string) => {
    if (!currentCard || gameStatus !== 'playing') return false;
    const trimmed = value.trim().normalize('NFC');
    const target = currentCard.front.normalize('NFC');
    return trimmed.length > 0 && trimmed.toLowerCase() === target.toLowerCase();
  }, [currentCard, gameStatus]);

  // ── Submit answer (Enter key — only for wrong answers now) ──

  const handleSubmit = useCallback(() => {
    if (!currentCard || gameStatus !== 'playing') return;
    const trimmed = input.trim().normalize('NFC');
    const target = currentCard.front.normalize('NFC');

    if (trimmed.toLowerCase() === target.toLowerCase()) {
      handleCorrect();
    } else if (trimmed.length > 0) {
      // Wrong answer — red shake
      setCombo(0);
      setCompleted((c) => c + 1);
      setResults((r) => [...r, { cardId: currentCard.id, correct: false }]);
      setInputWrong(true);
      setTimeout(() => setInputWrong(false), 500);

      // Time penalty
      timeLeftRef.current = Math.max(0, timeLeftRef.current - TIME_PENALTY);
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        setGameStatus('gameover');
        return;
      }

      advanceCard();
    }
  }, [input, currentCard, combo, gameStatus, playSound, advanceCard, handleCorrect]);

  // ── Miss (train car scrolled off screen) ──

  const handleMiss = useCallback(() => {
    if (!currentCard || gameStatusRef.current !== 'playing') return;
    setCombo(0);
    setCompleted((c) => c + 1);
    setResults((r) => [...r, { cardId: currentCard.id, correct: false }]);
    setInputWrong(true);
    setTimeout(() => setInputWrong(false), 500);
    advanceCard();
  }, [currentCard, advanceCard]);

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
    if (submittingRef.current) return; // ignore during submission
    if (value.length > input.length) playSound();
    setInput(value);
    // Auto-submit on match (works for both IME and non-IME)
    if (checkMatch(value)) {
      handleCorrect();
    }
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
    <div
      ref={mainRef as React.RefObject<HTMLDivElement>}
      className="fixed inset-x-0 flex flex-col"
      style={{ height: viewportH || '100vh', background: 'var(--bg)', zIndex: 10 }}
    >
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
        <div className="flex items-center gap-2">
          <div className="relative" ref={prefsRef}>
            <button
              onClick={() => setShowPrefs((v) => !v)}
              className="p-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
            {showPrefs && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-lg z-50 p-3"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{t.pronunciation}</span>
                  <ToggleSwitch checked={showPronunciation} onChange={setShowPronunciation} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{t.targetWord}</span>
                  <ToggleSwitch checked={showTargetWord} onChange={setShowTargetWord} />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onExit}
            className="text-xs"
            style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Combo Meter */}
      <div className="px-4 py-3 max-w-lg mx-auto w-full">
        <div className="relative">
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${meterProgress * 100}%`,
                background: 'linear-gradient(90deg, var(--accent), var(--correct))',
              }}
            />
          </div>
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
          {bonusText && (
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold bonus-pop"
              style={{ color: 'var(--correct)' }}
            >
              {bonusText}
            </div>
          )}
        </div>
        {combo > 0 && (
          <p className="text-xs text-center mt-1.5 font-bold" style={{ color: 'var(--accent)' }}>
            x{combo} combo
          </p>
        )}
      </div>

      {/* Word display (above track, large text) */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 min-h-0">
        {currentCard && (
          <div className="text-center mb-6">
            <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              {currentCard.back}
            </p>
            {showPronunciation && currentCard.pronunciation && (
              <p className="text-sm" style={{ color: 'var(--accent)', opacity: 0.85 }}>
                [{currentCard.pronunciation}]
              </p>
            )}
          </div>
        )}

        {/* Railway Track Area */}
        <div className="w-full max-w-lg mx-auto track-vibrating">
          {/* Upper rail */}
          <div className="rail-track w-full" />

          {/* Track area with scrolling train car */}
          <div
            className="relative overflow-hidden"
            style={{
              height: 72,
              background: 'linear-gradient(180deg, #3a3428 0%, #2d2a22 100%)',
              borderLeft: '3px solid #5a4530',
              borderRight: '3px solid #5a4530',
            }}
          >
            {currentCard && (
              <div
                key={cardKey}
                className={captureAnim ? 'car-capture' : 'car-scrolling'}
                style={{
                  animationDuration: captureAnim ? '0.3s' : `${SCROLL_DURATION}s`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  whiteSpace: 'nowrap',
                }}
                onAnimationEnd={captureAnim ? undefined : handleMiss}
              >
                <div className="train-smoke" style={{ position: 'relative' }}>
                  {/* Car body */}
                  <div
                    className="flex items-center gap-2 px-4 py-2"
                    style={{
                      background: 'linear-gradient(180deg, #7a8db8 0%, #5a6f98 40%, #4a5f82 100%)',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderBottom: '2.5px solid #3a3a3a',
                      borderRadius: '6px 6px 2px 2px',
                      minHeight: 34,
                    }}
                  >
                    {/* Window stripe */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 5,
                        left: 10,
                        right: 10,
                        height: 7,
                        background: 'repeating-linear-gradient(90deg, rgba(150,200,255,0.25) 0px, rgba(150,200,255,0.25) 10px, rgba(40,60,90,0.5) 10px, rgba(40,60,90,0.5) 14px)',
                        borderRadius: 2,
                      }}
                    />
                    {showTargetWord && (
                      <span className="text-sm font-bold" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 }}>
                        {currentCard.front}
                      </span>
                    )}
                  </div>
                  {/* Wheels */}
                  <div className="flex justify-between" style={{ width: '70%', margin: '-1px auto 0', padding: '0 4px' }}>
                    <div className="train-wheel" />
                    <div className="train-wheel" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lower rail */}
          <div className="rail-track w-full" />

          {/* Ground below track */}
          <div
            style={{
              height: 10,
              background: 'linear-gradient(180deg, #5a4530 0%, #4a3a28 40%, #3d3020 100%)',
              borderRadius: '0 0 4px 4px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>

      {/* Completed train cars */}
      <div className="px-4 max-w-lg mx-auto w-full mt-2">
        <div className="flex items-center gap-0.5 overflow-hidden h-6 mb-2">
          {results.slice(-MAX_VISIBLE_CARS).map((r, i, arr) => (
            <span
              key={results.length - arr.length + i}
              className={i === arr.length - 1 ? 'train-slide' : ''}
              style={{ fontSize: 16, opacity: r.correct ? 1 : 0.4 }}
            >
              {r.correct ? '🚃' : '💥'}
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
            if (submittingRef.current) return;
            const val = e.currentTarget.value;
            setInput(val);
            setIsComposing(false);
            // Auto-submit on match after IME composition
            if (checkMatch(val)) {
              handleCorrect();
            }
          }}
          placeholder={t.typeHere}
          autoFocus
          className={`w-full px-4 py-3 rounded-xl text-base text-center transition-all duration-200 ${inputWrong ? 'wrong-shake' : ''}`}
          style={{
            background: inputCorrect
              ? 'color-mix(in srgb, var(--correct) 15%, var(--surface))'
              : inputWrong
                ? 'color-mix(in srgb, var(--incorrect) 10%, var(--surface))'
                : 'var(--surface)',
            border: inputCorrect
              ? '2px solid var(--correct)'
              : inputWrong
                ? '2px solid var(--incorrect)'
                : '1.5px solid var(--border)',
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

        <VirtualKeyboard
          target={currentCard?.front ?? ''}
          input={input}
          pronunciation={currentCard?.pronunciation ?? undefined}
          deckLang={deckLang}
        />
      </div>
    </div>
  );
}
