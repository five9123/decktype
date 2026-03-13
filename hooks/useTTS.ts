'use client';
import { useCallback } from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { detectLang, langToTTSCode } from '@/lib/lang-detect';

export function useTTS() {
  const { ttsEnabled } = usePreferences();

  const speak = useCallback((text: string, hint?: string) => {
    if (!ttsEnabled) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const lang = detectLang(text, hint);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langToTTSCode(lang);
    utterance.rate = 0.9;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  return { speak };
}
