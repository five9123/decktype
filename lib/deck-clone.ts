import type { SupabaseClient } from '@supabase/supabase-js';
import { FREE_DECK_LIMIT, FREE_CARDS_PER_DECK } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

interface CloneDeckInput {
  supabase: SupabaseClient;
  userId: string;
  sourceDeckId: string;
  isPro: boolean;
  currentDeckCount: number;
}

interface CloneDeckResult {
  deckId?: string;
  error?: string;
}

const BATCH_SIZE = 100;

/**
 * Clone a public deck into the user's collection.
 * Copies deck metadata + all cards, sets original_deck_id, increments clone_count.
 */
export async function cloneDeck({
  supabase,
  userId,
  sourceDeckId,
  isPro,
  currentDeckCount,
}: CloneDeckInput): Promise<CloneDeckResult> {
  // Check free deck limit
  if (!isPro && currentDeckCount >= FREE_DECK_LIMIT) {
    return { error: 'deck_limit' };
  }

  // Fetch source deck
  const { data: sourceDeck, error: deckErr } = await supabase
    .from('decks')
    .select('*')
    .eq('id', sourceDeckId)
    .single();
  if (deckErr || !sourceDeck) return { error: 'Deck not found' };

  // Fetch source cards
  const { data: sourceCards, error: cardsErr } = await supabase
    .from('cards')
    .select('*')
    .eq('deck_id', sourceDeckId)
    .order('sort_order');
  if (cardsErr) return { error: 'Failed to load cards' };

  const cards = sourceCards ?? [];
  const cardsToClone = isPro ? cards : cards.slice(0, FREE_CARDS_PER_DECK);

  // Create new deck
  const { data: newDeck, error: insertErr } = await supabase
    .from('decks')
    .insert({
      user_id: userId,
      name: sourceDeck.name,
      description: sourceDeck.description ?? '',
      card_count: cardsToClone.length,
      note_type: sourceDeck.note_type,
      tags: sourceDeck.tags ?? [],
      source_lang: sourceDeck.source_lang,
      original_deck_id: sourceDeckId,
    })
    .select()
    .single();
  if (insertErr || !newDeck) return { error: insertErr?.message ?? 'Failed to create deck' };

  // Batch-insert cards
  let failed = false;
  for (let i = 0; i < cardsToClone.length; i += BATCH_SIZE) {
    const batch = cardsToClone.slice(i, i + BATCH_SIZE).map((c, idx) => ({
      deck_id: newDeck.id,
      front: c.front,
      back: c.back,
      pronunciation: c.pronunciation ?? '',
      extra: c.extra ?? '',
      note_type: c.note_type,
      sort_order: i + idx,
    }));
    const { error } = await supabase.from('cards').insert(batch);
    if (error) { failed = true; break; }
  }

  if (failed) {
    await supabase.from('cards').delete().eq('deck_id', newDeck.id);
    await supabase.from('decks').delete().eq('id', newDeck.id);
    return { error: 'Failed to clone cards' };
  }

  // Increment clone_count on source
  await supabase
    .from('decks')
    .update({ clone_count: (sourceDeck.clone_count ?? 0) + 1 })
    .eq('id', sourceDeckId);

  trackEvent('deck_cloned', { source_deck_id: sourceDeckId, new_deck_id: newDeck.id });

  return { deckId: newDeck.id };
}
