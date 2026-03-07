'use client';
import { THEMES, type ThemeId } from '@/lib/themes';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function ThemePicker() {
  const { theme, setTheme } = usePreferences();
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-5 gap-2">
      {THEMES.map((td) => {
        const isActive = theme === td.id;
        const label = (t as Record<string, string>)[td.nameKey] ?? td.id;
        return (
          <button
            key={td.id}
            onClick={() => setTheme(td.id as ThemeId)}
            title={label}
            className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all"
            style={{
              background: isActive ? 'var(--surface2)' : 'transparent',
              border: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            {/* Color swatch preview */}
            <div
              className="w-full rounded-md overflow-hidden flex"
              style={{ height: 24, border: '1px solid rgba(128,128,128,0.2)' }}
            >
              <div style={{ flex: 1, background: td.colors.bg }} />
              <div style={{ flex: 1, background: td.colors.accent }} />
              <div style={{ flex: 1, background: td.colors.text }} />
              <div style={{ flex: 1, background: td.colors.correct }} />
            </div>
            <span
              className="text-xs truncate w-full text-center"
              style={{ color: isActive ? 'var(--accent)' : 'var(--muted)', fontWeight: isActive ? 600 : 400 }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
