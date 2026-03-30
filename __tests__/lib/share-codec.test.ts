import { describe, it, expect } from 'vitest';
import { encodeDeckForShare, decodeDeckFromShare } from '@/lib/share-codec';

describe('share-codec', () => {
  const mockCards = [
    { id: '1', front: 'Hello', back: '안녕하세요', pronunciation: 'annyeonghaseyo', note_type: 'Basic' as const, deck_id: 'd1', sort_order: 0 },
    { id: '2', front: 'Thank you', back: '감사합니다', pronunciation: 'gamsahamnida', note_type: 'Basic' as const, deck_id: 'd1', sort_order: 1 },
  ];

  it('encodes and decodes a deck round-trip', async () => {
    const encoded = await encodeDeckForShare('Test Deck', mockCards);
    expect(encoded.length).toBeGreaterThan(0);

    const decoded = await decodeDeckFromShare(encoded);
    expect(decoded.deckName).toBe('Test Deck');
    expect(decoded.cards).toHaveLength(2);
    expect(decoded.cards[0].front).toBe('Hello');
    expect(decoded.cards[0].back).toBe('안녕하세요');
    expect(decoded.cards[0].pronunciation).toBe('annyeonghaseyo');
  });

  it('filters out Cloze cards', async () => {
    const cardsWithCloze = [
      ...mockCards,
      { id: '3', front: '{{c1::test}}', back: 'test', pronunciation: '', note_type: 'Cloze' as const, deck_id: 'd1', sort_order: 2 },
    ];
    const encoded = await encodeDeckForShare('Test', cardsWithCloze);
    const decoded = await decodeDeckFromShare(encoded);
    expect(decoded.cards).toHaveLength(2);
  });

  it('throws for empty deck', async () => {
    await expect(encodeDeckForShare('Empty', [])).rejects.toThrow('No typeable cards');
  });

  it('throws for too many cards', async () => {
    const tooMany = Array.from({ length: 201 }, (_, i) => ({
      id: String(i),
      front: `front-${i}`,
      back: `back-${i}`,
      pronunciation: '',
      note_type: 'Basic' as const,
      deck_id: 'd1',
      sort_order: i,
    }));
    await expect(encodeDeckForShare('Big', tooMany)).rejects.toThrow('Too many cards');
  });

  it('throws for invalid hash', async () => {
    await expect(decodeDeckFromShare('x')).rejects.toThrow();
  });

  it('handles unicode content', async () => {
    const unicodeCards = [
      { id: '1', front: '日本語', back: 'Japanese', pronunciation: 'にほんご', note_type: 'Basic' as const, deck_id: 'd1', sort_order: 0 },
      { id: '2', front: '中文', back: 'Chinese', pronunciation: 'zhōngwén', note_type: 'Basic' as const, deck_id: 'd1', sort_order: 1 },
    ];
    const encoded = await encodeDeckForShare('Unicode Test', unicodeCards);
    const decoded = await decodeDeckFromShare(encoded);
    expect(decoded.cards[0].front).toBe('日本語');
    expect(decoded.cards[1].front).toBe('中文');
  });
});
