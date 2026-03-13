'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { MasteryProgress } from '@/components/MasteryProgress';
import { MasteryBadge } from '@/components/MasteryBadge';
import { useMastery } from '@/hooks/useMastery';
import { createBrowserClient } from '@/lib/supabase/client';
import type { Deck, Card, PracticeMode, CardOrder } from '@/types';

export default function DeckDetailPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [mode, setMode] = useState<PracticeMode>('back_to_front');
  const [order, setOrder] = useState<CardOrder>('sequential');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ front: string; back: string; pronunciation: string }>({ front: '', back: '', pronunciation: '' });
  const [savingCard, setSavingCard] = useState(false);

  const { masteryMap, getDeckProgress } = useMastery(deckId);
  const progress = getDeckProgress();

  useEffect(() => {
    if (!user || !deckId) return;
    const supabase = createBrowserClient();

    Promise.all([
      supabase.from('decks').select('*').eq('id', deckId).single(),
      supabase.from('cards').select('*').eq('deck_id', deckId).order('sort_order'),
    ]).then(([deckRes, cardsRes]: [{ data: Deck | null; error: { message: string } | null }, { data: Card[] | null; error: { message: string } | null }]) => {
      if (deckRes.error) { setFetchError(deckRes.error.message); setLoading(false); return; }
      setDeck(deckRes.data);
      setCards(cardsRes.data ?? []);
      setLoading(false);
    }).catch((e: Error) => {
      setFetchError(e.message);
      setLoading(false);
    });
  }, [user, deckId]);

  const startEdit = (card: Card) => {
    setEditingCardId(card.id);
    setEditValues({ front: card.front, back: card.back, pronunciation: card.pronunciation ?? '' });
  };

  const cancelEdit = () => {
    setEditingCardId(null);
  };

  const saveEdit = async (cardId: string) => {
    setSavingCard(true);
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from('cards')
      .update({ front: editValues.front, back: editValues.back, pronunciation: editValues.pronunciation })
      .eq('id', cardId);
    if (!error) {
      setCards((prev) => prev.map((c) => c.id === cardId ? { ...c, ...editValues } : c));
      setEditingCardId(null);
    }
    setSavingCard(false);
  };

  const handleDelete = async () => {
    const supabase = createBrowserClient();
    await supabase.from('decks').delete().eq('id', deckId);
    router.push('/dashboard');
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

  if (fetchError || !deck) {
    return (
      <>
        <TopToolbar />
        <div className="flex items-center justify-center py-20">
          <p style={{ color: 'var(--muted)' }}>{fetchError || 'Deck not found'}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Deck Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <Link
              href="/dashboard"
              className="text-sm no-underline mb-2 inline-block transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent)' }}
            >
              &larr; {t.myDecks}
            </Link>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{deck.name}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              {deck.card_count} {t.cards} &middot; {deck.note_type}
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1.5 rounded-lg text-sm transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.3)',
              color: 'var(--incorrect)',
              cursor: 'pointer',
            }}
          >
            {t.delete}
          </button>
        </div>

        {/* Mastery Progress */}
        {progress.total > 0 && (
          <div className="mb-8">
            <MasteryProgress
              learning={progress.learning}
              familiar={progress.familiar}
              mastered={progress.mastered}
              total={cards.length}
            />
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div
            className="px-4 py-3 rounded-xl mb-6 flex items-center justify-between"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)' }}
          >
            <p className="text-sm" style={{ color: 'var(--incorrect)' }}>
              Delete &quot;{deck.name}&quot; and all its cards?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1 rounded-lg text-sm"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
              >
                {t.cancel}
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 rounded-lg text-sm"
                style={{ background: 'var(--incorrect)', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                {t.confirm}
              </button>
            </div>
          </div>
        )}

        {/* Practice Options */}
        <div
          className="p-6 rounded-2xl mb-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="font-bold mb-4" style={{ color: 'var(--text)' }}>{t.startPractice}</h2>

          {/* Mode */}
          <div className="mb-4">
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>MODE</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'back_to_front' as PracticeMode, label: t.backToFront },
                { value: 'fill_blank' as PracticeMode, label: t.fillBlank },
                { value: 'acid_rain' as PracticeMode, label: t.acidRain },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMode(opt.value)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
          </div>

          {/* Order */}
          <div className="mb-6">
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>ORDER</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'sequential' as CardOrder, label: t.sequential },
                { value: 'random' as CardOrder, label: t.random },
                { value: 'difficult_first' as CardOrder, label: t.difficultFirst },
                { value: 'smart_review' as CardOrder, label: t.smartReview },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setOrder(opt.value)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: order === opt.value ? 'var(--accent)' : 'var(--surface2)',
                    color: order === opt.value ? '#fff' : 'var(--text)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {(() => {
            const practiceCards = mode === 'fill_blank'
              ? cards.filter((c) => c.note_type === 'Cloze')
              : cards.filter((c) => c.note_type !== 'Cloze');
            return (
              <Link
                href={`/deck/${deckId}/practice?mode=${mode}&order=${order}`}
                className="inline-block px-8 py-3 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
                style={{ background: practiceCards.length > 0 ? 'var(--accent)' : 'var(--muted)', color: '#fff', pointerEvents: practiceCards.length > 0 ? 'auto' : 'none' }}
              >
                {t.startPractice} &middot; {practiceCards.length} {t.cards} &rarr;
              </Link>
            );
          })()}
        </div>

        {/* Card List */}
        <h2 className="font-bold mb-4" style={{ color: 'var(--text)' }}>{t.cardPreview}</h2>
        <div className="space-y-2">
          {cards.map((card, i) => {
            const mastery = masteryMap.get(card.id);
            const isEditing = editingCardId === card.id;
            return (
              <div
                key={card.id}
                className="px-4 py-3 rounded-xl text-sm"
                style={{ background: 'var(--surface)', border: `1px solid ${isEditing ? 'var(--accent)' : 'var(--border)'}` }}
              >
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{t.columnFront}</p>
                        <textarea
                          value={editValues.front}
                          onChange={(e) => setEditValues((v) => ({ ...v, front: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                          style={{
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{t.columnBack}</p>
                        <textarea
                          value={editValues.back}
                          onChange={(e) => setEditValues((v) => ({ ...v, back: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                          style={{
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{t.columnPronunciation}</p>
                        <textarea
                          value={editValues.pronunciation}
                          onChange={(e) => setEditValues((v) => ({ ...v, pronunciation: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                          style={{
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 rounded-lg text-xs"
                        style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
                      >
                        {t.cancel}
                      </button>
                      <button
                        onClick={() => saveEdit(card.id)}
                        disabled={savingCard}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', opacity: savingCard ? 0.6 : 1 }}
                      >
                        {savingCard ? t.loading : t.confirm}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span style={{ color: 'var(--muted)', minWidth: 24 }}>{i + 1}</span>
                    <span className="flex-1" style={{ color: 'var(--text)' }}>{card.front}</span>
                    <span className="flex-1" style={{ color: 'var(--muted)' }}>{card.back}</span>
                    {card.pronunciation && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface2)', color: 'var(--muted)' }}>{card.pronunciation}</span>
                    )}
                    {mastery && (
                      <MasteryBadge level={mastery.mastery_level} confidence={mastery.confidence} compact />
                    )}
                    <button
                      onClick={() => startEdit(card)}
                      className="p-1.5 rounded-lg transition-opacity hover:opacity-80"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                      aria-label="Edit card"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
