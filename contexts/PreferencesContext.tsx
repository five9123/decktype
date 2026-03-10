'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { type ThemeId, type FontSize, applyTheme, FONT_SIZE_MAP } from '@/lib/themes';

const STORAGE_KEY = 'atype-prefs';
const OLD_THEME_KEY = 'atype-theme';

interface Preferences {
  theme: ThemeId;
  fontSize: FontSize;
  soundEnabled: boolean;
  soundType: 'mechanical' | 'soft' | 'typewriter';
  ttsEnabled: boolean;
  confettiEnabled: boolean;
}

const DEFAULTS: Preferences = {
  theme: 'light',
  fontSize: 'medium',
  soundEnabled: false,
  soundType: 'mechanical',
  ttsEnabled: false,
  confettiEnabled: true,
};

interface PreferencesContextValue extends Preferences {
  setTheme: (t: ThemeId) => void;
  setFontSize: (s: FontSize) => void;
  setSoundEnabled: (b: boolean) => void;
  setSoundType: (s: 'mechanical' | 'soft' | 'typewriter') => void;
  setTtsEnabled: (b: boolean) => void;
  setConfettiEnabled: (b: boolean) => void;
}

const PreferencesContext = createContext<PreferencesContextValue>({
  ...DEFAULTS,
  setTheme: () => {},
  setFontSize: () => {},
  setSoundEnabled: () => {},
  setSoundType: () => {},
  setTtsEnabled: () => {},
  setConfettiEnabled: () => {},
});

function loadPrefs(): Preferences {
  if (typeof window === 'undefined') return DEFAULTS;

  try {
    // Migrate from old atype-theme key
    const oldTheme = localStorage.getItem(OLD_THEME_KEY);
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULTS, ...parsed };
    }

    if (oldTheme && (oldTheme === 'dark' || oldTheme === 'light')) {
      const migrated = { ...DEFAULTS, theme: oldTheme as ThemeId };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      localStorage.removeItem(OLD_THEME_KEY);
      return migrated;
    }
  } catch { /* ignore */ }

  return DEFAULTS;
}

function savePrefs(prefs: Preferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch { /* ignore */ }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [prefs, setPrefs] = useState<Preferences>(() => {
    // Read from DOM attribute set by inline script to avoid FOUC
    if (typeof document !== 'undefined') {
      const initial = loadPrefs();
      return initial;
    }
    return DEFAULTS;
  });

  // Apply theme on mount and when theme/pathname changes.
  // Home page (/) always shows light regardless of saved theme.
  useEffect(() => {
    applyTheme(pathname === '/' ? 'light' : prefs.theme);
  }, [prefs.theme, pathname]);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.setProperty('--typing-font-size', FONT_SIZE_MAP[prefs.fontSize]);
  }, [prefs.fontSize]);

  // Follow system preference when no saved preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY) && !localStorage.getItem(OLD_THEME_KEY)) {
        const next: ThemeId = e.matches ? 'dark' : 'light';
        setPrefs((p) => {
          const updated = { ...p, theme: next };
          savePrefs(updated);
          return updated;
        });
      }
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const update = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefs((p) => {
      const updated = { ...p, [key]: value };
      savePrefs(updated);
      return updated;
    });
  }, []);

  const value: PreferencesContextValue = {
    ...prefs,
    setTheme: useCallback((t: ThemeId) => update('theme', t), [update]),
    setFontSize: useCallback((s: FontSize) => update('fontSize', s), [update]),
    setSoundEnabled: useCallback((b: boolean) => update('soundEnabled', b), [update]),
    setSoundType: useCallback((s: 'mechanical' | 'soft' | 'typewriter') => update('soundType', s), [update]),
    setTtsEnabled: useCallback((b: boolean) => update('ttsEnabled', b), [update]),
    setConfettiEnabled: useCallback((b: boolean) => update('confettiEnabled', b), [update]),
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);

// Backward compatibility alias
export const useTheme = () => {
  const { theme, setTheme } = usePreferences();
  return { theme, setTheme };
};
