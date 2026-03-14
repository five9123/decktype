'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { DeckCard } from '@/components/DeckCard';
import { StreakCounter } from '@/components/StreakCounter';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import { useProgress } from '@/hooks/useProgress';
import { useProfile } from '@/hooks/useProfile';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import type { Deck } from '@/types';
import { FREE_DECK_LIMIT } from '@/lib/constants';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dueCounts, setDueCounts] = useState<Record<string, number>>({});
  const { streak, loading: progressLoading } = useProgress();

  useEffect(() => {
    if (!user) return;
    const supabase = createBrowserClient();
    supabase
      .from('decks')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }: { data: Deck[] | null; error: { message: string } | null }) => {
        if (err) setError(err.message);
        else setDecks(data ?? []);
        setLoading(false);
      });
  }, [user]);

  // Load due card counts per deck
  useEffect(() => {
    if (!user || decks.length === 0) return;
    const supabase = createBrowserClient();
    const deckIds = decks.map((d) => d.id);

    supabase
      .from('card_mastery')
      .select('card_id, cards!inner(deck_id)')
      .lte('next_review_at', new Date().toISOString())
      .then(({ data }: { data: { card_id: string; cards: { deck_id: string } }[] | null }) => {
        const counts: Record<string, number> = {};
        (data ?? []).forEach((row) => {
          const did = row.cards?.deck_id;
          if (did && deckIds.includes(did)) {
            counts[did] = (counts[did] ?? 0) + 1;
          }
        });
        setDueCounts(counts);
      })
      .catch(() => {
        // Due counts are non-critical; silently ignore on failure
      });
  }, [user, decks]);

  const atLimit = !isPro && decks.length >= FREE_DECK_LIMIT;

  return (
    <>
      <TopToolbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Streak Counter */}
        {!progressLoading && (
          <div className="mb-6">
            <StreakCounter streak={streak} />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{t.myDecks}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              {isPro
                ? `${decks.length} ${t.myDecks.toLowerCase()}`
                : `${decks.length} / ${FREE_DECK_LIMIT} ${t.myDecks.toLowerCase()}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={atLimit ? '#' : '/create'}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold no-underline transition-opacity ${atLimit ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
              style={{
                background: 'var(--accent)',
                color: '#FFFFFF',
                pointerEvents: atLimit ? 'none' : 'auto',
              }}
            >
              + {t.createDeck}
            </Link>
          </div>
        </div>

        {atLimit && <UpgradeBanner type="deck" />}

        {/* Deck Grid */}
        {error && (
          <div className="px-4 py-3 rounded-xl text-sm mb-6" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}>
            Failed to load decks: {error}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
          </div>
        ) : decks.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-4xl mb-4">📦</p>
            <p style={{ color: 'var(--muted)' }}>{t.noDeckYet}</p>
            <Link
              href="/create"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              + {t.createDeck}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} dueCount={dueCounts[deck.id]} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
