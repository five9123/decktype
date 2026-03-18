'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ── Constants ───────────────────────────────────────────────────────
const SLIDE_COUNT = 4;
const SLIDE_DURATION = 5000;
const TRANSITION_MS = 400;

const SLIDES = [
  { id: 'classic', url: 'typee.app/practice', label: 'Classic Typing' },
  { id: 'fill-blank', url: 'typee.app/practice', label: 'Fill in Blank' },
  { id: 'word-rain', url: 'typee.app/play', label: 'Word Rain' },
  { id: 'word-train', url: 'typee.app/play', label: 'Word Train' },
] as const;

// ── Phase delays per slide (ms between each phase step) ─────────────
const CLASSIC_DELAYS = [600, 600, 400, 800];
const FILL_DELAYS = [700, 500, 500, 600];
const RAIN_DELAYS = [800, 600, 600, 500];
const TRAIN_DELAYS = [700, 500, 600, 800];
const PHASE_DELAYS = [CLASSIC_DELAYS, FILL_DELAYS, RAIN_DELAYS, TRAIN_DELAYS];

// ── Slide 1: Classic Typing ─────────────────────────────────────────
function ClassicSlide({ phase }: { phase: number }) {
  const chars = ['사', '랑'];
  const typedCount = Math.min(phase, 2);
  const showStats = phase >= 3;

  return (
    <div className="px-6 py-8 sm:px-8 text-center">
      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
        사랑
      </p>
      <p className="text-sm mb-1" style={{ color: 'var(--accent)', opacity: 0.8 }}>
        sarang
      </p>
      <p className="text-base mb-6" style={{ color: 'var(--muted)' }}>
        love
      </p>

      {/* Character feedback */}
      <div className="flex justify-center gap-0.5 font-mono text-xl mb-6">
        {chars.map((ch, i) => (
          <span
            key={i}
            style={{
              color: i < typedCount ? 'var(--correct)' : 'var(--muted)',
              opacity: i < typedCount ? 1 : 0.4,
              transition: 'color 0.2s, opacity 0.2s',
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Input field */}
      <div
        className="mx-auto max-w-xs px-4 py-3 rounded-xl text-sm text-left"
        style={{
          background: 'var(--bg)',
          border: `1px solid ${showStats ? 'var(--correct)' : 'var(--accent)'}`,
          color: 'var(--text)',
          transition: 'border-color 0.3s',
        }}
      >
        {chars.slice(0, typedCount).join('')}
        {!showStats && (
          <span className="caret" style={{ borderRight: '2px solid var(--accent)' }}>
            &nbsp;
          </span>
        )}
      </div>

      {/* Stats */}
      <div
        className="flex justify-center gap-6 mt-5 text-sm"
        style={{ color: 'var(--muted)' }}
      >
        <span>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
            {showStats ? '82' : '—'}
          </span>{' '}
          WPM
        </span>
        <span>
          <span style={{ color: 'var(--correct)', fontWeight: 700 }}>
            {showStats ? '100%' : '—'}
          </span>{' '}
          Accuracy
        </span>
        <span>
          <span style={{ color: 'var(--text)', fontWeight: 700 }}>
            {showStats ? '1' : '0'}
          </span>{' '}
          / 20 cards
        </span>
      </div>
    </div>
  );
}

// ── Slide 2: Fill in Blank ──────────────────────────────────────────
function FillBlankSlide({ phase }: { phase: number }) {
  const answer = 'コーヒー';
  const typedChars = answer.slice(0, Math.min(phase, 4));
  const isComplete = phase >= 3;

  return (
    <div className="px-6 py-8 sm:px-8 text-center">
      <p
        className="text-xs font-bold tracking-widest mb-4"
        style={{ color: 'var(--accent)' }}
      >
        FILL IN THE BLANK
      </p>

      {/* Sentence with blank */}
      <p
        className="text-base sm:text-lg leading-relaxed mb-6"
        style={{ color: 'var(--text)' }}
      >
        彼女は毎日{' '}
        <span
          className="inline-block px-2 border-b-2 mx-1 text-center font-bold"
          style={{
            minWidth: 80,
            borderColor: isComplete ? 'var(--correct)' : 'var(--accent)',
            color: isComplete ? 'var(--correct)' : 'var(--accent)',
            transition: 'border-color 0.3s, color 0.3s',
          }}
        >
          {typedChars || '\u00A0\u00A0\u00A0\u00A0'}
        </span>{' '}
        を飲みます
      </p>

      {/* Hint on complete */}
      <div
        className="text-sm mb-4"
        style={{
          color: 'var(--muted)',
          opacity: isComplete ? 0.8 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        kōhī — coffee ☕
      </div>

      {/* Input field */}
      <div
        className="mx-auto max-w-xs px-4 py-3 rounded-xl text-sm text-left"
        style={{
          background: 'var(--bg)',
          border: `1px solid ${isComplete ? 'var(--correct)' : 'var(--accent)'}`,
          color: 'var(--text)',
          transition: 'border-color 0.3s',
        }}
      >
        {typedChars}
        {!isComplete && (
          <span className="caret" style={{ borderRight: '2px solid var(--accent)' }}>
            &nbsp;
          </span>
        )}
      </div>

      {/* Stats */}
      <div
        className="flex justify-center gap-6 mt-5 text-sm"
        style={{ color: 'var(--muted)' }}
      >
        <span>
          <span style={{ color: 'var(--correct)', fontWeight: 700 }}>
            {isComplete ? '5' : '4'}
          </span>{' '}
          / 10 correct
        </span>
        <span>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Streak:</span>{' '}
          {isComplete ? '3 🔥' : '2'}
        </span>
      </div>
    </div>
  );
}

// ── Slide 3: Word Rain ──────────────────────────────────────────────
const RAIN_WORDS = [
  { text: '감사합니다', hint: 'thanks', x: 8, y: 10 },
  { text: 'ありがとう', hint: 'arigatou', x: 48, y: 28, isTarget: true },
  { text: 'merci', hint: 'thank you', x: 72, y: 52 },
  { text: '谢谢', hint: 'xièxie', x: 18, y: 68 },
  { text: 'obrigado', hint: 'thanks', x: 55, y: 82 },
];

function WordRainSlide({ phase }: { phase: number }) {
  const targetDestroyed = phase >= 3;
  const inputText =
    phase === 0 ? '' : phase === 1 ? 'あり' : phase === 2 ? 'ありがと' : 'ありがとう';
  const score = phase >= 3 ? 120 : 0;
  const showCombo = phase >= 4;
  const showNewWord = phase >= 4;

  return (
    <div className="px-4 py-5 sm:px-6">
      {/* HUD */}
      <div
        className="flex items-center justify-between mb-3 text-sm px-2"
        style={{ color: 'var(--muted)' }}
      >
        <span>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{score}</span>
          <span className="text-xs ml-1">pts</span>
          {showCombo && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full ml-2"
              style={{
                background: 'var(--accent)',
                color: '#fff',
              }}
            >
              x3
            </span>
          )}
        </span>
        <span className="text-xs font-medium">Lv.2</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="text-xs" style={{ opacity: i <= 4 ? 1 : 0.2 }}>
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Game area */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          height: 140,
          background: 'var(--bg)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Falling words */}
        {RAIN_WORDS.map((w, i) => {
          const isHighlighted = w.isTarget && phase >= 1 && phase < 3;
          const isDestroyed = w.isTarget && targetDestroyed;

          return (
            <div
              key={i}
              className="absolute text-xs font-bold px-2 py-1 rounded-md"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                background: isHighlighted
                  ? 'var(--accent)'
                  : 'var(--surface)',
                color: isHighlighted ? '#fff' : 'var(--text)',
                border: `1px solid ${isHighlighted ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'all 0.3s ease',
                transform: isDestroyed ? 'scale(1.5)' : 'scale(1)',
                opacity: isDestroyed ? 0 : 1,
              }}
            >
              {w.text}
              <span
                className="block font-normal"
                style={{
                  fontSize: 10,
                  color: isHighlighted ? 'rgba(255,255,255,0.7)' : 'var(--muted)',
                }}
              >
                {w.hint}
              </span>
            </div>
          );
        })}

        {/* New word appearing */}
        {showNewWord && (
          <div
            className="absolute text-xs font-bold px-2 py-1 rounded-md"
            style={{
              left: '38%',
              top: '5%',
              background: 'var(--surface)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              animation: 'fadeSlideIn 0.4s ease',
            }}
          >
            danke
            <span
              className="block font-normal"
              style={{ fontSize: 10, color: 'var(--muted)' }}
            >
              thanks
            </span>
          </div>
        )}

        {/* Bottom danger line */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 3, background: 'var(--incorrect)', opacity: 0.4 }}
        />
      </div>

      {/* Input */}
      <div
        className="mt-3 mx-auto max-w-xs px-4 py-2.5 rounded-xl text-sm text-center"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
      >
        {inputText || '\u00A0'}
        {phase < 3 && (
          <span className="caret" style={{ borderRight: '2px solid var(--accent)' }}>
            &nbsp;
          </span>
        )}
      </div>
    </div>
  );
}

// ── Slide 4: Word Train ─────────────────────────────────────────────
const TRAIN_CARDS = [
  { front: '친구', hint: 'chingu', back: '友達' },
  { front: '가족', hint: 'gajok', back: '家族' },
];

// Combo milestone thresholds (% positions along bar)
const MILESTONES = [
  { label: '+1s', pct: 20 },
  { label: '+1s', pct: 40 },
  { label: '+2s', pct: 67 },
  { label: '+3s', pct: 100 },
];

function WordTrainSlide({ phase }: { phase: number }) {
  const cardIdx = phase >= 3 ? 1 : 0;
  const card = TRAIN_CARDS[cardIdx];
  const inputText = phase === 0 ? '' : phase === 1 ? '친' : phase === 2 ? '친구' : '';
  const isCorrect = phase === 2;
  const showBonus = phase === 3;
  const timerSec = [45, 44, 43, 44][phase] ?? 44;
  const score = phase >= 3 ? 10 : 0;
  // Car position: left % of track
  const carPct = [18, 42, 64, 12][phase] ?? 12;
  // Combo bar fill %
  const comboFill = phase >= 3 ? 38 : 18;

  return (
    <div className="px-5 py-5 sm:px-7">
      {/* HUD */}
      <div
        className="flex items-center justify-between mb-3 text-sm"
        style={{ color: 'var(--muted)' }}
      >
        <span style={{ fontWeight: 700 }}>
          <span style={{ color: 'var(--accent)' }}>⏱</span>
          {' '}
          <span
            style={{
              color: 'var(--text)',
              transition: 'color 0.3s',
            }}
          >
            {timerSec}s
          </span>
          {showBonus && (
            <span
              className="text-xs font-bold ml-1"
              style={{ color: 'var(--correct)', transition: 'opacity 0.3s' }}
            >
              +1s
            </span>
          )}
        </span>
        <span className="text-xs">
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{score}</span>
          <span className="ml-1">pts</span>
        </span>
      </div>

      {/* Combo milestones bar */}
      <div className="relative mb-4">
        {/* Labels */}
        <div className="relative h-4 mb-0.5">
          {MILESTONES.map((m) => (
            <span
              key={m.label + m.pct}
              className="absolute text-xs"
              style={{
                left: `${m.pct}%`,
                transform: 'translateX(-50%)',
                color: 'var(--muted)',
                fontSize: 9,
              }}
            >
              {m.label}
            </span>
          ))}
        </div>
        {/* Track */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{ height: 6, background: 'var(--border)' }}
        >
          <div
            style={{
              height: '100%',
              width: `${comboFill}%`,
              background: 'var(--accent)',
              borderRadius: '9999px',
              transition: 'width 0.5s ease',
            }}
          />
          {/* Milestone tick marks */}
          {MILESTONES.map((m) => (
            <div
              key={m.pct}
              className="absolute top-0 bottom-0"
              style={{
                left: `${m.pct}%`,
                width: 2,
                background: 'var(--bg)',
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Word display */}
      <div className="text-center mb-4">
        <p
          className="text-3xl font-bold mb-1"
          style={{ color: 'var(--text)', transition: 'opacity 0.2s' }}
        >
          {card.back}
        </p>
        <p className="text-xs" style={{ color: 'var(--accent)', opacity: 0.85 }}>
          [{card.hint}]
        </p>
      </div>

      {/* Train track */}
      <div className="relative mb-3">
        {/* Upper rail */}
        <div style={{ height: 2, background: 'var(--border)', borderRadius: 1 }} />
        {/* Track area */}
        <div
          className="relative overflow-hidden"
          style={{ height: 44, background: 'var(--surface)' }}
        >
          {/* Train car */}
          <div
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold"
            style={{
              top: '50%',
              left: `${carPct}%`,
              transform: 'translateY(-50%)',
              background: isCorrect
                ? 'var(--correct)'
                : 'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, var(--correct)))',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              transition: 'left 0.5s ease, background 0.3s',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 18 }}>🚃</span>
            <span>{card.front}</span>
          </div>
        </div>
        {/* Lower rail */}
        <div style={{ height: 2, background: 'var(--border)', borderRadius: 1 }} />
      </div>

      {/* Input field */}
      <div
        className="px-4 py-2.5 rounded-xl text-sm text-center"
        style={{
          background: 'var(--bg)',
          border: `1px solid ${isCorrect ? 'var(--correct)' : 'var(--accent)'}`,
          color: isCorrect ? 'var(--correct)' : 'var(--text)',
          transition: 'border-color 0.3s, color 0.3s',
          fontFamily: 'monospace',
        }}
      >
        {inputText || '\u00A0'}
        {!isCorrect && phase < 2 && (
          <span style={{ borderRight: '2px solid var(--accent)' }}>&nbsp;</span>
        )}
      </div>
    </div>
  );
}

// ── Mode label pills ────────────────────────────────────────────────
const MODE_LABELS = ['✏️ Typing', '📝 Fill in Blank', '🌧️ Word Rain', '🚂 Word Train'];

// ── Main Carousel ───────────────────────────────────────────────────
export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animPhase, setAnimPhase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transRef2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Phase advancement ──
  useEffect(() => {
    const delays = PHASE_DELAYS[activeSlide];
    if (!delays || animPhase >= delays.length) return;

    phaseTimerRef.current = setTimeout(() => {
      setAnimPhase((p) => p + 1);
    }, delays[animPhase]);

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [activeSlide, animPhase]);

  // ── Transition helper ──
  const transitionToSlide = useCallback(
    (nextIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      transRef.current = setTimeout(() => {
        setActiveSlide(nextIndex);
        setAnimPhase(0);
        transRef2.current = setTimeout(
          () => setIsTransitioning(false),
          TRANSITION_MS / 2,
        );
      }, TRANSITION_MS / 2);
    },
    [isTransitioning],
  );

  // ── Auto-rotation ──
  useEffect(() => {
    slideTimerRef.current = setTimeout(() => {
      transitionToSlide((activeSlide + 1) % SLIDE_COUNT);
    }, SLIDE_DURATION);
    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, [activeSlide, transitionToSlide]);

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      if (transRef.current) clearTimeout(transRef.current);
      if (transRef2.current) clearTimeout(transRef2.current);
    };
  }, []);

  // ── Manual navigation ──
  const goToSlide = (index: number) => {
    if (index === activeSlide || isTransitioning) return;
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    transitionToSlide(index);
  };

  return (
    <>
      {/* Inline keyframe for Word Rain new-word entrance */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Browser chrome frame */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          maxWidth: 780,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface2)',
          }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#4ADE80' }} />
          <div
            className="flex-1 mx-4 px-3 py-1 rounded-md text-xs text-center"
            style={{ background: 'var(--bg)', color: 'var(--muted)' }}
          >
            {SLIDES[activeSlide].url}
          </div>
        </div>

        {/* Content area with fade transition */}
        <div
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
            transition: `opacity ${TRANSITION_MS / 2}ms ease, transform ${TRANSITION_MS / 2}ms ease`,
            minHeight: 300,
          }}
        >
          {activeSlide === 0 && <ClassicSlide phase={animPhase} />}
          {activeSlide === 1 && <FillBlankSlide phase={animPhase} />}
          {activeSlide === 2 && <WordRainSlide phase={animPhase} />}
          {activeSlide === 3 && <WordTrainSlide phase={animPhase} />}
        </div>
      </div>

      {/* Dot indicators + mode label */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlide(i)}
              className="rounded-full"
              style={{
                width: i === activeSlide ? 24 : 8,
                height: 8,
                background: i === activeSlide ? 'var(--accent)' : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
              aria-label={`Go to ${s.label}`}
            />
          ))}
        </div>
        <span
          className="text-xs font-medium"
          style={{
            color: 'var(--muted)',
            transition: 'opacity 0.2s',
          }}
        >
          {MODE_LABELS[activeSlide]}
        </span>
      </div>
    </>
  );
}
