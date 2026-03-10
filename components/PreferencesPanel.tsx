'use client';
import { useRef, useState } from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ThemePicker } from './ThemePicker';
import type { FontSize } from '@/lib/themes';

const FONT_SIZES: { key: FontSize; label: string }[] = [
  { key: 'small', label: 'S' },
  { key: 'medium', label: 'M' },
  { key: 'large', label: 'L' },
  { key: 'xlarge', label: 'XL' },
];

const SOUND_TYPES = ['mechanical', 'soft', 'typewriter'] as const;

/* ── Tooltip ? button ─────────────────────────────────────────────────── */
function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 150);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={() => setShow((v) => !v)}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
          borderRadius: '50%',
          fontSize: 10,
          fontWeight: 600,
          lineHeight: 1,
          color: 'var(--muted)',
          border: '1px solid var(--border)',
          cursor: 'help',
          marginLeft: 4,
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        ?
      </span>
      {show && (
        <span
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--text)',
            color: 'var(--surface)',
            fontSize: 11,
            lineHeight: 1.4,
            padding: '6px 10px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            zIndex: 100,
            pointerEvents: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
        >
          {text}
          <span
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid var(--text)',
            }}
          />
        </span>
      )}
    </span>
  );
}

interface PreferencesPanelProps {
  onClose: () => void;
}

export function PreferencesPanel({ onClose }: PreferencesPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const {
    fontSize, setFontSize,
    soundEnabled, setSoundEnabled,
    soundType, setSoundType,
    focusMode, setFocusMode,
    feedbackEffects, setFeedbackEffects,
    ttsEnabled, setTtsEnabled,
    confettiEnabled, setConfettiEnabled,
  } = usePreferences();

  useClickOutside(ref, onClose);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 rounded-xl shadow-lg z-50 p-4"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>
        {t.preferencesTitle}
      </h3>

      {/* Theme Picker */}
      <div className="mb-4">
        <ThemePicker />
      </div>

      {/* Font Size */}
      <div className="mb-4">
        <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{t.fontSizeLabel}</p>
        <div className="flex gap-2">
          {FONT_SIZES.map((fs) => (
            <button
              key={fs.key}
              onClick={() => setFontSize(fs.key)}
              className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: fontSize === fs.key ? 'var(--accent)' : 'var(--surface2)',
                color: fontSize === fs.key ? '#fff' : 'var(--text)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {fs.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sound Effects */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs flex items-center" style={{ color: 'var(--muted)' }}>{t.soundEffects}<InfoTooltip text={t.soundEffectsDesc} /></p>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="relative transition-colors"
            style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              background: soundEnabled ? 'var(--accent)' : 'var(--surface2)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: soundEnabled ? 18 : 2,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.2s ease',
              }}
            />
          </button>
        </div>
        {soundEnabled && (
          <div className="flex gap-2">
            {SOUND_TYPES.map((st) => (
              <button
                key={st}
                onClick={() => setSoundType(st)}
                className="flex-1 py-1.5 rounded-lg text-xs transition-colors"
                style={{
                  background: soundType === st ? 'var(--accent)' : 'var(--surface2)',
                  color: soundType === st ? '#fff' : 'var(--text)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {(t as Record<string, string>)[`sound_${st}`] ?? st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Focus Mode */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs flex items-center" style={{ color: 'var(--muted)' }}>{t.focusModeLabel}<InfoTooltip text={t.focusModeDesc} /></p>
        <button
          onClick={() => setFocusMode(!focusMode)}
          className="relative transition-colors"
          style={{
            width: 36,
            height: 20,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            background: focusMode ? 'var(--accent)' : 'var(--surface2)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 2,
              left: focusMode ? 18 : 2,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
      </div>

      {/* Feedback Effects */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs flex items-center" style={{ color: 'var(--muted)' }}>{t.feedbackEffectsLabel}<InfoTooltip text={t.feedbackEffectsDesc} /></p>
        <button
          onClick={() => setFeedbackEffects(!feedbackEffects)}
          className="relative transition-colors"
          style={{
            width: 36,
            height: 20,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            background: feedbackEffects ? 'var(--accent)' : 'var(--surface2)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 2,
              left: feedbackEffects ? 18 : 2,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
      </div>

      {/* Word Pronunciation (TTS) */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs flex items-center" style={{ color: 'var(--muted)' }}>{t.ttsLabel}<InfoTooltip text={t.ttsDesc} /></p>
        <button
          onClick={() => setTtsEnabled(!ttsEnabled)}
          className="relative transition-colors"
          style={{
            width: 36,
            height: 20,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            background: ttsEnabled ? 'var(--accent)' : 'var(--surface2)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 2,
              left: ttsEnabled ? 18 : 2,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
      </div>

      {/* Confetti Effects */}
      <div className="flex items-center justify-between">
        <p className="text-xs flex items-center" style={{ color: 'var(--muted)' }}>{t.confettiLabel}<InfoTooltip text={t.confettiDesc} /></p>
        <button
          onClick={() => setConfettiEnabled(!confettiEnabled)}
          className="relative transition-colors"
          style={{
            width: 36,
            height: 20,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            background: confettiEnabled ? 'var(--accent)' : 'var(--surface2)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 2,
              left: confettiEnabled ? 18 : 2,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
      </div>
    </div>
  );
}
