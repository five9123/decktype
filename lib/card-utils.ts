import type { Card } from '@/types';

export interface RawCard {
  id?: string;
  front: string;
  back: string;
  pronunciation?: string;
  extra?: string;
  noteType?: string;
}

/**
 * Converts a raw card array (GuestCard, DemoCard, etc.) to the
 * canonical Card[] shape used by game and practice components.
 */
export function rawCardsToCards(
  cards: RawCard[],
  deckId: string,
  idPrefix: string,
): Card[] {
  return cards.map((c, i) => ({
    id: c.id ?? `${idPrefix}-${i}`,
    deck_id: deckId,
    front: c.front,
    back: c.back,
    pronunciation: c.pronunciation ?? '',
    extra: c.extra ?? '',
    note_type: (c.noteType as Card['note_type']) ?? 'Basic',
    sort_order: i,
  }));
}
