'use client';
import { useRef } from 'react';
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
          <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.soundEffects}</p>
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
        <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.focusModeLabel}</p>
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
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.feedbackEffectsLabel}</p>
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
    </div>
  );
}
