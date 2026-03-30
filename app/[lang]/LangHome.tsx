'use client';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Lang } from '@/lib/translations';
import HomePage from '../page';

/**
 * Wrapper that sets the UI language from the URL param,
 * then renders the same homepage component.
 */
export default function LangHome({ lang }: { lang: Lang }) {
  const { setLang } = useLanguage();

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return <HomePage />;
}
