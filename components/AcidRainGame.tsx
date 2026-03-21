'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { useViewport } from '@/hooks/useViewport';
import { createBrowserClient } from '@/lib/supabase/client';
import { shuffle } from '@/lib/utils';
import { VirtualKeyboard } from '@/components/VirtualKeyboard';
import type { Card } from '@/types';
import type { ScriptLang } from '@/lib/lang-detect';

// ── Types ──────────────────────────────────────────────────────────────

interface FallingWord {
  id: string;
  cardId: string;
  word: string;
  hint: string;
  x: number;      // 0-100 percentage
  y: number;       // px from top
  speed: number;   // px per frame
  destroyed: boolean;
  fadeOut: boolean;
}

type GameStatus = 'ready' | 'playing' | 'paused' | 'gameover';

interface Props {
  cards: Card[];
  deckId: string;
  deckLang?: ScriptLang;
  onExit: () => void;
}

// ── Constants ──────────────────────────────────────────────────────────

const INITIAL_SPAWN_INTERVAL = 3000; // ms between word spawns
const SPEED_BASE = 0.4;              // px per frame at level 1
const SPEED_INCREMENT = 0.08;        // speed increase per level
const SPAWN_INTERVAL_DECREASE = 200; // ms faster per level
const MIN_SPAWN_INTERVAL = 800;
const WORDS_PER_LEVEL = 10;
const MAX_LIVES = 5;
const DEFAULT_CONTAINER_HEIGHT = 500; // px — fallback game area height
const DESTROY_ANIMATION_MS = 400;
// Word element approx height (text-sm + hint line + py-1.5 padding) — used to
// trigger floor hit when the word's *bottom* edge crosses the 4px danger line
const WORD_HIT_HEIGHT = 56;
const FLOOR_LINE_HEIGHT = 8;

// ── Component ──────────────────────────────────────────────────────────

export function AcidRainGame({ cards, deckId, deckLang, onExit }: Props) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { play: playSound } = useSound();
  const { viewportH, mainRef } = useViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [words, setWords] = useState<FallingWord[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [level, setLevel] = useState(1);
  const [input, setInput] = useState('');
  const [destroyed, setDestroyed] = useState(0);
  const [missed, setMissed] = useState(0);
  const [isComposing, setIsComposing] = useState(false);
  const [containerHeight, setContainerHeight] = useState(DEFAULT_CONTAINER_HEIGHT);
  const [shaking, setShaking] = useState(false);
  const [borderFlash, setBorderFlash] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Dynamically track game container height
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      if (h > 0) setContainerHeight(h);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Refs for game loop
  const wordsRef = useRef(words);
  wordsRef.current = words;
  const livesRef = useRef(lives);
  livesRef.current = lives;
  const levelRef = useRef(level);
  levelRef.current = level;
  const destroyedRef = useRef(destroyed);
  destroyedRef.current = destroyed;
  const containerHeightRef = useRef(containerHeight);
  containerHeightRef.current = containerHeight;
  const gameStatusRef = useRef(gameStatus);
  gameStatusRef.current = gameStatus;
  const cardPoolRef = useRef<Card[]>([]);
  const cardIndexRef = useRef(0);
  const wordIdCounter = useRef(0);
  const rafRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionSavedRef = useRef(false);

  // Shuffle cards into pool
  useEffect(() => {
    cardPoolRef.current = shuffle(cards);
    cardIndexRef.current = 0;
  }, [cards]);

  const getNextCard = useCallback((): Card => {
    const pool = cardPoolRef.current;
    if (cardIndexRef.current >= pool.length) cardIndexRef.current = 0;
    return pool[cardIndexRef.current++];
  }, []);

  // Spawn a new falling word
  const spawnWord = useCallback(() => {
    if (gameStatusRef.current !== 'playing') return;
    const card = getNextCard();
    const word: FallingWord = {
      id: `w-${++wordIdCounter.current}`,
      cardId: card.id,
      word: card.front,
      hint: card.back,
      x: 5 + Math.random() * 85, // 5-90%
      y: -30,
      speed: SPEED_BASE + (levelRef.current - 1) * SPEED_INCREMENT,
      destroyed: false,
      fadeOut: false,
    };
    setWords((prev) => [...prev, word]);

    // Schedule next spawn
    const interval = Math.max(
      MIN_SPAWN_INTERVAL,
      INITIAL_SPAWN_INTERVAL - (levelRef.current - 1) * SPAWN_INTERVAL_DECREASE,
    );
    spawnTimerRef.current = setTimeout(spawnWord, interval);
  }, [getNextCard]);

  // Game loop — move words down, check for bottom hits
  const gameLoop = useCallback(() => {
    if (gameStatusRef.current !== 'playing') return;

    setWords((prev) => {
      const updated: FallingWord[] = [];
      let livesLost = 0;

      for (const w of prev) {
        if (w.destroyed) {
          if (w.fadeOut) continue; // Already faded — remove
          updated.push(w);
          continue;
        }
        const newY = w.y + w.speed;
        // Trigger when word's bottom edge reaches the top of the danger line
        if (newY + WORD_HIT_HEIGHT >= containerHeightRef.current - FLOOR_LINE_HEIGHT) {
          livesLost++;
          continue; // Remove the word
        }
        updated.push({ ...w, y: newY });
      }

      if (livesLost > 0) {
        setLives((l) => {
          const newLives = Math.max(0, l - livesLost);
          if (newLives <= 0) setGameStatus('gameover');
          return newLives;
        });
        setMissed((m) => m + livesLost);
        setCombo(0);
        setShaking(true);
        setBorderFlash(true);
        setTimeout(() => setShaking(false), 400);
        setTimeout(() => setBorderFlash(false), 500);
      }

      return updated;
    });

    rafRef.current = requestAnimationFrame(gameLoop);
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setGameStatus('playing');
    setWords([]);
    setScore(0);
    setCombo(0);
    setLives(MAX_LIVES);
    setLevel(1);
    setInput('');
    setDestroyed(0);
    setMissed(0);
    setShaking(false);
    setBorderFlash(false);
    setWrongFlash(false);
    sessionSavedRef.current = false;
    inputRef.current?.focus();
  }, []);

  // Start/stop game loop and spawning
  useEffect(() => {
    if (gameStatus === 'playing') {
      rafRef.current = requestAnimationFrame(gameLoop);
      spawnTimerRef.current = setTimeout(spawnWord, 500);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, [gameStatus, gameLoop, spawnWord]);

  // Level up
  useEffect(() => {
    if (destroyed > 0 && destroyed % WORDS_PER_LEVEL === 0) {
      setLevel((l) => l + 1);
    }
  }, [destroyed]);

  // Check input match
  const checkMatch = useCallback((value: string) => {
    const trimmed = value.trim().normalize('NFC');
    if (!trimmed) return;

    const currentWords = wordsRef.current;
    const matchIdx = currentWords.findIndex(
      (w) => !w.destroyed && w.word.normalize('NFC').toLowerCase() === trimmed.toLowerCase()
    );

    if (matchIdx >= 0) {
      const matched = currentWords[matchIdx];
      playSound();
      const newCombo = combo + 1;
      const points = 10 + newCombo * 2 + levelRef.current * 5;
      setScore((s) => s + points);
      setCombo(newCombo);
      setDestroyed((d) => d + 1);
      setInput('');

      // Mark as destroyed with fadeOut
      setWords((prev) =>
        prev.map((w) =>
          w.id === matched.id ? { ...w, destroyed: true, fadeOut: false } : w
        )
      );
      // Remove after animation
      setTimeout(() => {
        setWords((prev) =>
          prev.map((w) =>
            w.id === matched.id ? { ...w, fadeOut: true } : w
          )
        );
      }, DESTROY_ANIMATION_MS);
    }
  }, [combo, playSound]);

  // Handle input change
  const handleInputChange = (value: string) => {
    setInput(value);
    if (!isComposing) checkMatch(value);
  };

  // Handle Enter key — wrong answer feedback
  const handleEnterKey = useCallback(() => {
    const trimmed = input.trim().normalize('NFC');
    if (!trimmed) return;
    const isMatch = wordsRef.current.some(
      (w) => !w.destroyed && w.word.normalize('NFC').toLowerCase() === trimmed.toLowerCase()
    );
    if (!isMatch) {
      setWrongFlash(true);
      setInput('');
      setTimeout(() => setWrongFlash(false), 500);
    }
  }, [input]);

  // Handle composition end (IME)
  const handleCompositionEnd = () => {
    setIsComposing(false);
    checkMatch(input);
  };

  // Save session on game over
  useEffect(() => {
    if (gameStatus !== 'gameover' || !user || sessionSavedRef.current) return;
    sessionSavedRef.current = true;
    const total = destroyed + missed;
    const supabase = createBrowserClient();
    supabase.from('typing_sessions').insert({
      user_id: user.id,
      deck_id: deckId,
      wpm: 0,
      accuracy: total > 0 ? Math.round((destroyed / total) * 100) : 0,
      composite_score: score,
      card_count: total,
      duration_ms: 0,
      mode: 'acid_rain',
    }).then(() => {});
  }, [gameStatus, user, deckId, destroyed, missed, score]);

  // Partial match highlight
  const normalizedInput = input.trim().normalize('NFC').toLowerCase();

  // Best target word for keyboard hints
  const hintTarget = useMemo(() => {
    const active = words.filter((w) => !w.destroyed);
    if (active.length === 0) return '';
    if (normalizedInput.length > 0) {
      const matches = active
        .filter((w) => w.word.normalize('NFC').toLowerCase().startsWith(normalizedInput))
        .sort((a, b) => b.y - a.y);
      if (matches.length > 0) return matches[0].word;
    }
    return active.reduce((best, w) => (w.y > best.y ? w : best)).word;
  }, [words, normalizedInput]);

  // ── Ready screen ──
  if (gameStatus === 'ready') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="text-center max-w-sm">
          <p className="text-5xl mb-4">🌧️</p>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {t.acidRain ?? 'Word Rain'}
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            {t.acidRainDesc ?? 'Words fall from above — type them to destroy!'}
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
          <p className="text-5xl mb-4">💥</p>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
            {t.gameOver ?? 'Game Over'}
          </h1>
          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.score ?? 'Score'}</p>
              <p className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{score}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.level ?? 'Level'}</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{level}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.correctLabel}</p>
              <p className="text-xl font-bold" style={{ color: 'var(--correct)' }}>{destroyed}</p>
            </div>
          </div>
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
        <div className="flex items-center gap-4 text-sm">
          <span style={{ color: 'var(--accent)' }}>
            <strong>{score}</strong> <span className="text-xs" style={{ color: 'var(--muted)' }}>pts</span>
          </span>
          {combo > 1 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--accent)', color: '#fff' }}>
              x{combo}
            </span>
          )}
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            Lv.{level}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className="text-sm" style={{ opacity: i < lives ? 1 : 0.2 }}>
              ❤️
            </span>
          ))}
        </div>
        <button
          onClick={onExit}
          className="text-xs"
          style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Exit
        </button>
      </div>

      {/* Game Container */}
      <div
        ref={containerRef}
        className={`acid-rain-container relative flex-1 overflow-hidden mx-4 my-2 rounded-xl${shaking ? ' wrong-shake' : ''}`}
        style={{
          minHeight: 0,
          background: 'linear-gradient(180deg, #1a1d2e 0%, #0d1117 60%, #151922 100%)',
          border: borderFlash
            ? '2px solid var(--incorrect)'
            : lives <= 2
              ? '1px solid rgba(248,113,113,0.35)'
              : '1px solid var(--border)',
          boxShadow: borderFlash
            ? '0 0 16px rgba(248,113,113,0.4), inset 0 0 16px rgba(248,113,113,0.08)'
            : 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {words.filter((w) => !w.fadeOut).map((w) => {
          const isPartialMatch = normalizedInput.length > 0
            && w.word.normalize('NFC').toLowerCase().startsWith(normalizedInput)
            && !w.destroyed;

          return (
            <div
              key={w.id}
              className={`absolute text-sm font-bold px-3 py-1.5 select-none text-center${w.destroyed ? ' rain-splash' : ''}`}
              style={{
                left: `${w.x}%`,
                top: w.y,
                background: isPartialMatch
                  ? 'var(--accent)'
                  : w.destroyed
                    ? 'rgba(100,180,255,0.5)'
                    : 'rgba(120,170,255,0.28)',
                color: '#fff',
                border: isPartialMatch
                  ? '1px solid var(--accent)'
                  : '1px solid rgba(140,180,255,0.35)',
                borderRadius: '12px 12px 12px 4px',
                boxShadow: isPartialMatch
                  ? '0 0 12px rgba(189,147,249,0.4)'
                  : '0 2px 10px rgba(80,140,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
                backdropFilter: 'blur(6px)',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                whiteSpace: 'nowrap',
                zIndex: isPartialMatch ? 10 : 1,
              }}
            >
              {w.word}
              <span
                className="block text-xs font-normal"
                style={{ color: isPartialMatch ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.6)', marginTop: 1 }}
              >
                {w.hint}
              </span>
            </div>
          );
        })}

        {/* Bottom puddle zone */}
        <div className="absolute bottom-0 left-0 right-0 puddle-zone" />

      </div>

      {/* Input */}
      <div className="px-4 pb-4 max-w-2xl mx-auto w-full">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleEnterKey(); }}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setInput(e.currentTarget.value);
            handleCompositionEnd();
          }}
          placeholder={t.typeHere}
          autoFocus
          className="w-full px-4 py-3 rounded-xl text-base text-center transition-colors"
          style={{
            background: 'var(--surface)',
            border: wrongFlash ? '1.5px solid var(--incorrect)' : '1.5px solid var(--border)',
            color: wrongFlash ? 'var(--incorrect)' : 'var(--text)',
            outline: 'none',
          }}
        />

        <VirtualKeyboard
          target={hintTarget}
          input={input}
          deckLang={deckLang}
        />
      </div>
    </div>
  );
}
