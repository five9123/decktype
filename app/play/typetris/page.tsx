'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { decodeDeckFromShare } from '@/lib/share-codec';
import { rawCardsToCards } from '@/lib/card-utils';
import type { Card } from '@/types';

const AcidRainGame = dynamic(
  () =>
    import('@/components/AcidRainGame').then((m) => ({
      default: m.AcidRainGame,
    })),
  { ssr: false },
);

type PageState = 'loading' | 'error' | 'landing' | 'playing';

export default function SharedTypetrisPage() {
  const { t } = useLanguage();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [deckName, setDeckName] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      setPageState('error');
      setErrorMsg('No deck data found in this link.');
      return;
    }
    decodeDeckFromShare(hash)
      .then(({ deckName: name, cards: rawCards }) => {
        if (rawCards.length === 0) {
          setPageState('error');
          setErrorMsg('This deck has no cards.');
          return;
        }
        setDeckName(name);
        setCards(rawCardsToCards(rawCards, 'shared', 'shared'));
        setPageState('landing');
      })
      .catch(() => {
        setPageState('error');
        setErrorMsg('This link is invalid or corrupted.');
      });
  }, []);

  if (pageState === 'loading') {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg)' }}
      >
        <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
      </div>
    );
  }

  if (pageState === 'error') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-3 px-4"
        style={{ background: 'var(--bg)' }}
      >
        <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>
          {errorMsg}
        </p>
        <Link
          href="/"
          className="text-sm no-underline"
          style={{ color: 'var(--accent)' }}
        >
          &larr; {t.appName}
        </Link>
      </div>
    );
  }

  if (pageState === 'playing') {
    return (
      <AcidRainGame
        cards={cards}
        deckId="shared"
        onExit={() => setPageState('landing')}
      />
    );
  }

  // Landing
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-sm">
        {/* Badge + Icon */}
        <div className="text-center mb-8">
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-bold"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--accent)',
            }}
          >
            SHARED
          </span>
          <p className="text-5xl mt-4 mb-2">🌧️</p>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--text)' }}
          >
            {deckName}
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {cards.length} {t.cards} &middot; {t.acidRain}
          </p>
        </div>

        {/* Card preview */}
        <div className="space-y-1.5 mb-6">
          {cards.slice(0, 5).map((card, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <span style={{ color: 'var(--text)' }}>{card.front}</span>
              <span style={{ color: 'var(--muted)' }}>{card.back}</span>
              {card.pronunciation && (
                <span
                  className="text-xs ml-auto"
                  style={{ color: 'var(--accent)' }}
                >
                  {card.pronunciation}
                </span>
              )}
            </div>
          ))}
          {cards.length > 5 && (
            <p
              className="text-xs text-center"
              style={{ color: 'var(--muted)' }}
            >
              +{cards.length - 5} more
            </p>
          )}
        </div>

        {/* Play button */}
        <button
          onClick={() => setPageState('playing')}
          className="w-full py-3 rounded-xl text-base font-bold transition-opacity hover:opacity-90"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t.startPractice} &rarr;
        </button>

        <p
          className="text-xs text-center mt-3"
          style={{ color: 'var(--muted)' }}
        >
          {t.acidRainDesc}
        </p>

        {/* Signup CTA */}
        <div
          className="p-5 rounded-2xl mt-8"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <p
            className="font-bold mb-1"
            style={{ color: 'var(--text)' }}
          >
            {t.demoSignupTitle}
          </p>
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--muted)' }}
          >
            {t.demoSignupDesc}
          </p>
          <Link
            href="/auth/login"
            className="block w-full py-2.5 rounded-xl text-sm font-bold text-center no-underline transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {t.demoSignupCta} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
