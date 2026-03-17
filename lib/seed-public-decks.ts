/**
 * Converts DEMO_DECKS into PublicDeck-compatible format for the Explore page.
 * These "seed" decks fill the explore page before real users publish decks.
 */
import { DEMO_DECKS } from './demo-decks';

export interface SeedPublicDeck {
  id: string;
  name: string;
  card_count: number;
  note_type: string;
  source_lang: string;
  like_count: number;
  clone_count: number;
  published_at: string;
  profiles: { display_name: string } | null;
  _isSeed: true;
}

const AUTHORS: Record<string, string[]> = {
  ko: ['민수', '지은', '하늘'],
  en: ['Alex', 'Sarah', 'Mike'],
  ja: ['Yuki', 'Hana', 'Takeshi'],
  fr: ['Marie', 'Pierre', 'Léa'],
  es: ['Carlos', 'María', 'Diego'],
  zh: ['小明', '美玲', '大伟'],
  de: ['Hans', 'Lena', 'Max'],
};

// Deterministic pseudo-random based on string hash
function simpleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

let _cache: SeedPublicDeck[] | null = null;

export function getSeedPublicDecks(): SeedPublicDeck[] {
  if (_cache) return _cache;

  const baseDate = new Date('2026-03-01T00:00:00Z');

  _cache = DEMO_DECKS.map((deck, i) => {
    const hash = simpleHash(deck.id);
    const authors = AUTHORS[deck.lang] ?? AUTHORS.en;
    const author = authors[hash % authors.length];
    const likeCount = 8 + (hash % 113);           // 8 ~ 120
    const cloneCount = 2 + (hash % 44);            // 2 ~ 45
    // Spread published_at over last 30 days
    const daysAgo = i * 1.2;
    const publishedAt = new Date(baseDate.getTime() - daysAgo * 86400000);

    return {
      id: deck.id,
      name: deck.name,
      card_count: deck.cards.length,
      note_type: 'Basic',
      source_lang: deck.lang,
      like_count: likeCount,
      clone_count: cloneCount,
      published_at: publishedAt.toISOString(),
      profiles: { display_name: author },
      _isSeed: true as const,
    };
  });

  return _cache;
}
