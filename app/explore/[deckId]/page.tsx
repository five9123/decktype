'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';
import { TopToolbar } from '@/components/TopToolbar';
import { LikeButton } from '@/components/LikeButton';
import { createBrowserClient } from '@/lib/supabase/client';
import { cloneDeck } from '@/lib/deck-clone';
import { FREE_DECK_LIMIT } from '@/lib/constants';
import type { Deck, Card } from '@/types';

interface DeckWithProfile extends Deck {
  profiles: { display_name: string } | null;
}

export default function PublicDeckDetailPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const router = useRouter();

  const [deck, setDeck] = useState<DeckWithProfile | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [userDeckCount, setUserDeckCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cloning, setCloning] = useState(false);
  const [cloneError, setCloneError] = useState('');
  const [cloneSuccess, setCloneSuccess] = useState('');

  useEffect(() => {
    if (!deckId) return;
    const supabase = createBrowserClient();

    Promise.all([
      supabase
        .from('decks')
        .select('*, profiles(display_name)')
        .eq('id', deckId)
        .eq('is_public', true)
        .single(),
      supabase
        .from('cards')
        .select('*')
        .eq('deck_id', deckId)
        .order('sort_order')
        .limit(10),
    ]).then(([deckRes, cardsRes]) => {
      setDeck((deckRes.data as DeckWithProfile) ?? null);
      setCards((cardsRes.data as Card[]) ?? []);
      setLoading(false);
    });
  }, [deckId]);

  // Check if user has liked and count their decks
  useEffect(() => {
    if (!user || !deckId) return;
    const supabase = createBrowserClient();

    Promise.all([
      supabase.from('deck_likes').select('id').eq('user_id', user.id).eq('deck_id', deckId).single(),
      supabase.from('decks').select('id', { count: 'exact' }).eq('user_id', user.id),
    ]).then(([likeRes, countRes]) => {
      setLiked(!!likeRes.data);
      setUserDeckCount(countRes.count ?? 0);
    });
  }, [user, deckId]);

  const handleClone = async () => {
    if (!user) { router.push('/auth/login'); return; }
    setCloning(true);
    setCloneError('');
    const supabase = createBrowserClient();
    const result = await cloneDeck({ supabase, userId: user.id, sourceDeckId: deckId, isPro, currentDeckCount: userDeckCount });
    if (result.error === 'deck_limit') {
      setCloneError(t.cloneDeckLimit);
    } else if (result.error) {
      setCloneError(t.cloneError);
    } else {
      setCloneSuccess(t.cloneSuccess);
      setTimeout(() => router.push('/dashboard'), 1500);
    }
    setCloning(false);
  };

  if (loading) {
    return (
      <>
        <TopToolbar />
        <div className="flex items-center justify-center py-20">
          <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
        </div>
      </>
    );
  }

  if (!deck) {
    return (
      <>
        <TopToolbar />
        <div className="flex items-center justify-center py-20">
          <p style={{ color: 'var(--muted)' }}>Deck not found</p>
        </div>
      </>
    );
  }

  const author = deck.profiles?.display_name || t.anonymous;

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <Link
          href="/explore"
          className="text-sm no-underline mb-4 inline-block transition-opacity hover:opacity-80"
          style={{ color: 'var(--accent)' }}
        >
          &larr; {t.exploreTitle}
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>{deck.name}</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {deck.card_count} {t.cards} &middot; {author}
              {!isPro && userDeckCount >= FREE_DECK_LIMIT && (
                <span className="ml-2 text-xs" style={{ color: 'var(--incorrect)' }}>
                  ({t.cloneDeckLimit})
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LikeButton deckId={deckId} initialLiked={liked} initialCount={deck.like_count} />
            <button
              onClick={handleClone}
              disabled={cloning || !!cloneSuccess || (!isPro && userDeckCount >= FREE_DECK_LIMIT)}
              className="px-4 py-1.5 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: cloneSuccess ? 'var(--correct)' : 'var(--accent)',
                color: '#fff',
                border: 'none',
                cursor: (!isPro && userDeckCount >= FREE_DECK_LIMIT) ? 'not-allowed' : 'pointer',
                opacity: (!isPro && userDeckCount >= FREE_DECK_LIMIT) ? 0.5 : 1,
              }}
            >
              {cloning ? t.loading : cloneSuccess ? `✓ ${t.cloneSuccess}` : t.cloneDeck}
            </button>
          </div>
        </div>

        {cloneError && (
          <div className="px-4 py-3 rounded-xl mb-6 text-sm" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}>
            {cloneError}
            {cloneError === t.cloneDeckLimit && (
              <Link href="/pricing" className="ml-2 underline" style={{ color: 'var(--accent)' }}>{t.upgradeToPro}</Link>
            )}
          </div>
        )}

        {/* Card preview */}
        <div
          className="p-5 rounded-2xl mb-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="font-bold mb-4 text-sm" style={{ color: 'var(--muted)' }}>
            {t.cardPreviewCount.replace('{n}', String(Math.min(cards.length, 10)))} / {deck.card_count}
          </h2>
          <div className="space-y-2">
            {cards.map((card, i) => (
              <div
                key={card.id}
                className="flex items-center gap-4 px-3 py-2 rounded-xl text-sm"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <span style={{ color: 'var(--muted)', minWidth: 20 }}>{i + 1}</span>
                <span className="flex-1 truncate" style={{ color: 'var(--text)' }}>{card.front}</span>
                <span className="flex-1 truncate" style={{ color: 'var(--muted)' }}>{card.back}</span>
              </div>
            ))}
          </div>
        </div>

        {!user && (
          <div className="text-center py-6">
            <Link
              href="/auth/login"
              className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold no-underline"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t.signIn}
            </Link>
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>{t.signInToClone}</p>
          </div>
        )}
      </main>
    </>
  );
}
