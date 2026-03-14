'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Lang, Translations, TRANSLATIONS } from '@/lib/translations';
import { STORAGE_KEY_LANG } from '@/lib/storage-keys';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: TRANSLATIONS.en,
});

/** Detect best matching Lang from browser navigator.languages */
function detectBrowserLang(): Lang {
  const supported = Object.keys(TRANSLATIONS) as Lang[];
  const browserLangs = typeof navigator !== 'undefined'
    ? [...(navigator.languages ?? []), navigator.language].filter(Boolean)
    : [];

  for (const bl of browserLangs) {
    const prefix = bl.toLowerCase().split('-')[0];
    // exact prefix match (e.g. 'ko', 'ja', 'fr', 'es')
    const match = supported.find((s) => s === prefix);
    if (match) return match;
    // 'zh-hans', 'zh-tw', 'zh-hk' → 'zh'
    if (prefix === 'zh') return 'zh';
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG) as Lang | null;
    if (saved && saved in TRANSLATIONS) {
      setLangState(saved);
    } else {
      // No saved preference — auto-detect from browser
      setLangState(detectBrowserLang());
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY_LANG, l);
  }, []);

  const t = new Proxy(TRANSLATIONS[lang], {
    get(target, prop: string) {
      const value = target[prop as keyof Translations];
      if (value !== undefined && value !== '') return value;
      const enValue = TRANSLATIONS.en[prop as keyof Translations];
      if (enValue !== undefined) return enValue;
      return prop;
    },
  });

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
