import type { SupabaseClient } from '@supabase/supabase-js';
import { FREE_CARDS_PER_DECK } from '@/lib/constants';

export interface CardToSave {
  front: string;
  back: string;
  pronunciation: string;
  extra: string;
  noteType: string;
}

interface SaveDeckInput {
  supabase: SupabaseClient;
  userId: string;
  deckName: string;
  cards: CardToSave[];
  sourceLang?: string | null;
  isPro: boolean;
}

interface SaveDeckResult {
  deckId?: string;
  error?: string;
}

const BATCH_SIZE = 100;

/**
 * Create a deck and batch-insert its cards into Supabase.
 * Handles free-plan card limits, batch insertion, and rollback on failure.
 */
export async function saveDeckWithCards({
  supabase,
  userId,
  deckName,
  cards,
  sourceLang,
  isPro,
}: SaveDeckInput): Promise<SaveDeckResult> {
  const cardsToSave = isPro ? cards : cards.slice(0, FREE_CARDS_PER_DECK);

  // 1. Create deck
  const { data: deck, error: deckError } = await supabase
    .from('decks')
    .insert({
      user_id: userId,
      name: deckName.trim(),
      card_count: cardsToSave.length,
      note_type: cardsToSave.some((c) => c.noteType === 'Cloze') ? 'Cloze' : 'Basic',
      tags: [],
      source_lang: sourceLang ?? null,
    })
    .select()
    .single();

  if (deckError || !deck) {
    return { error: deckError?.message ?? 'Failed to create deck' };
  }

  // 2. Batch-insert cards (100 at a time)
  let cardInsertFailed = false;
  for (let i = 0; i < cardsToSave.length; i += BATCH_SIZE) {
    const batch = cardsToSave.slice(i, i + BATCH_SIZE).map((card, idx) => ({
      deck_id: deck.id,
      front: card.front,
      back: card.back,
      pronunciation: card.pronunciation ?? '',
      extra: card.extra ?? '',
      note_type: card.noteType,
      sort_order: i + idx,
    }));

    const { error: cardsError } = await supabase.from('cards').insert(batch);
    if (cardsError) {
      cardInsertFailed = true;
      break;
    }
  }

  // 3. Rollback on card insertion failure
  if (cardInsertFailed) {
    await supabase.from('cards').delete().eq('deck_id', deck.id);
    await supabase.from('decks').delete().eq('id', deck.id);
    return { error: 'Failed to save cards. Please try again.' };
  }

  return { deckId: deck.id };
}
