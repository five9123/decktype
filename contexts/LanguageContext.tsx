'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Lang, Translations, TRANSLATIONS } from '@/lib/translations';

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('atype-lang') as Lang | null;
    if (saved && saved in TRANSLATIONS) setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('atype-lang', l);
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
