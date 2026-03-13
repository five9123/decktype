'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { DEMO_DECKS } from '@/lib/demo-decks';
import type { DemoLang } from '@/lib/demo-decks';
import type { PracticeMode } from '@/types';

const LANG_TABS: { value: DemoLang; label: string; flag: string }[] = [
  { value: 'ja', label: '日本語', flag: '🇯🇵' },
  { value: 'ko', label: '한국어', flag: '🇰🇷' },
];

export default function DemoPage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<PracticeMode>('back_to_front');
  const [lang, setLang] = useState<DemoLang>('ja');

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
        <div className="flex gap-2 mb-6 justify-center">
          {LANG_TABS.map((tab) => (
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
              { value: 'back_to_front' as PracticeMode, label: t.backToFront },
              { value: 'fill_blank' as PracticeMode, label: t.fillBlank },
              { value: 'acid_rain' as PracticeMode, label: t.acidRain },
            ] as const).map((opt) => (
              <button
                key={opt.value}
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
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
            {t.demoModeHintWord}
          </p>
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
