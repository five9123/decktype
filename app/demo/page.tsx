'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { DEMO_DECKS } from '@/lib/demo-decks';
import type { DemoLang } from '@/lib/demo-decks';
import type { PracticeMode } from '@/types';
import { trackEvent } from '@/lib/analytics';

const ALL_TABS: { value: DemoLang; label: string; flag: string }[] = [
  { value: 'ko', label: '한국어', flag: '🇰🇷' },
  { value: 'ja', label: '日本語', flag: '🇯🇵' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'zh', label: '中文', flag: '🇨🇳' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

function getDemoTabs(uiLang: string) {
  // Hide the user's own language; for other UI langs show all
  if (uiLang === 'ko') return ALL_TABS.filter(t => t.value !== 'ko');
  if (uiLang === 'ja') return ALL_TABS.filter(t => t.value !== 'ja');
  return ALL_TABS;
}

function getDefaultDemoLang(uiLang: string): DemoLang {
  if (uiLang === 'ko') return 'ja';
  if (uiLang === 'ja') return 'ko';
  return 'ko';
}

function DemoContent() {
  const { t, lang: uiLang } = useLanguage();
  const searchParams = useSearchParams();
  const tabs = getDemoTabs(uiLang);

  // Deep link support: ?lang=ko&mode=acid_rain&deck=kpop-vocab&ref=tiktok
  const paramLang = searchParams.get('lang') as DemoLang | null;
  const paramMode = searchParams.get('mode') as PracticeMode | null;
  const paramRef = searchParams.get('ref');

  const [mode, setMode] = useState<PracticeMode>(paramMode ?? 'back_to_front');
  const [lang, setLang] = useState<DemoLang>(() => {
    if (paramLang && ALL_TABS.some(t => t.value === paramLang)) return paramLang;
    return getDefaultDemoLang(uiLang);
  });

  // Track referral source from social media
  useEffect(() => {
    if (paramRef) {
      trackEvent('page_view', { source: paramRef, page: 'demo' });
    }
  }, [paramRef]);

  // Reset selected tab when UI language changes (only if no deep link)
  useEffect(() => {
    if (!paramLang) setLang(getDefaultDemoLang(uiLang));
  }, [uiLang, paramLang]);

  const filteredDecks = DEMO_DECKS.filter((d) => d.lang === lang);

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
          >
            <span style={{ fontSize: '0.5rem' }}>●</span> DEMO
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {t.tryDemo}
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {t.demoSubtitle}
          </p>
        </div>

        {/* Language tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setLang(tab.value)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: lang === tab.value ? 'var(--accent)' : 'var(--surface)',
                color: lang === tab.value ? '#fff' : 'var(--text)',
                border: lang === tab.value ? 'none' : '1px solid var(--border)',
                cursor: 'pointer',
              }}
            >
              {tab.flag} {tab.label}
            </button>
          ))}
        </div>

        {/* Mode selector */}
        <div
          className="p-4 rounded-2xl mb-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs font-bold mb-3" style={{ color: 'var(--muted)' }}>MODE</p>
          <div className="flex gap-2 flex-wrap">
            {([
              { value: 'back_to_front' as PracticeMode, label: t.backToFront, desc: t.backToFrontDesc },
              { value: 'fill_blank' as PracticeMode, label: t.fillBlank, desc: t.fillBlankDesc },
              { value: 'acid_rain' as PracticeMode, label: t.acidRain, desc: t.acidRainDesc },
              { value: 'word_train' as PracticeMode, label: t.wordTrain, desc: t.wordTrainDesc },
            ] as const).map((opt) => (
              <div key={opt.value} className="relative group/tip">
                <button
                  onClick={() => setMode(opt.value)}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    background: mode === opt.value ? 'var(--accent)' : 'var(--surface2)',
                    color: mode === opt.value ? '#fff' : 'var(--text)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
                <div
                  className="absolute bottom-full left-0 mb-2 px-3 py-2 rounded-lg text-xs w-56 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-opacity z-20"
                  style={{
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  }}
                >
                  {opt.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deck cards */}
        <div className="space-y-4">
          {filteredDecks.map((deck) => (
            <div
              key={deck.id}
              className="p-5 rounded-2xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: deck.accentColor + '22', border: `1px solid ${deck.accentColor}44` }}
                >
                  {deck.emoji}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="font-bold text-base" style={{ color: 'var(--text)' }}>{deck.name}</h2>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{deck.nameLocal}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{deck.description}</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: deck.accentColor }}>
                    {deck.cards.length} {t.cards}
                  </p>
                </div>
              </div>
              <Link
                href={`/demo/${deck.id}?mode=${mode}`}
                className="block w-full py-2.5 rounded-xl text-sm font-bold no-underline text-center transition-opacity hover:opacity-90"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {t.startPractice} →
              </Link>
            </div>
          ))}
        </div>

        {/* Sign up prompt */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="font-bold mb-1" style={{ color: 'var(--text)' }}>{t.demoSignupTitle}</p>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{t.demoSignupDesc}</p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {t.demoSignupCta} →
          </Link>
        </div>
      </main>
    </>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><p style={{ color: 'var(--muted)' }}>Loading...</p></div>}>
      <DemoContent />
    </Suspense>
  );
}
