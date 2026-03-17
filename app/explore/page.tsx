'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { PublicDeckCard } from '@/components/PublicDeckCard';
import { createBrowserClient } from '@/lib/supabase/client';
import { EXPLORE_PAGE_SIZE } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

type SortOption = 'recent' | 'popular' | 'most_cloned';

interface PublicDeck {
  id: string;
  name: string;
  card_count: number;
  note_type: string;
  source_lang: string | null;
  like_count: number;
  clone_count: number;
  published_at: string | null;
  profiles: { display_name: string } | null;
}

export default function ExplorePage() {
  const { t } = useLanguage();
  const [decks, setDecks] = useState<PublicDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('');
  const [sort, setSort] = useState<SortOption>('recent');

  useEffect(() => {
    trackEvent('explore_viewed');
  }, []);

  useEffect(() => {
    const supabase = createBrowserClient();
    setLoading(true);

    let query = supabase
      .from('decks')
      .select('id, name, card_count, note_type, source_lang, like_count, clone_count, published_at, profiles(display_name)')
      .eq('is_public', true)
      .limit(EXPLORE_PAGE_SIZE);

    if (search.trim()) {
      query = query.ilike('name', `%${search.trim()}%`);
    }
    if (lang) {
      query = query.eq('source_lang', lang);
    }
    if (sort === 'popular') {
      query = query.order('like_count', { ascending: false });
    } else if (sort === 'most_cloned') {
      query = query.order('clone_count', { ascending: false });
    } else {
      query = query.order('published_at', { ascending: false });
    }

    query.then(({ data }: { data: PublicDeck[] | null }) => {
      setDecks(data ?? []);
      setLoading(false);
    });
  }, [search, lang, sort]);

  const LANG_OPTIONS = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'it', 'pt'];

  return (
    <>
      <TopToolbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>{t.exploreTitle}</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{t.exploreSubtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchDecks}
            className="px-3 py-2 rounded-xl text-sm flex-1 min-w-0 sm:min-w-48"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              outline: 'none',
            }}
          />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
          >
            <option value="">{t.allLanguages}</option>
            {LANG_OPTIONS.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-1">
            {([
              { value: 'recent', label: t.sortRecent },
              { value: 'popular', label: t.sortPopular },
              { value: 'most_cloned', label: t.sortMostCloned },
            ] as { value: SortOption; label: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className="px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-colors"
                style={{
                  background: sort === opt.value ? 'var(--accent)' : 'var(--surface)',
                  border: `1px solid ${sort === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                  color: sort === opt.value ? '#fff' : 'var(--text)',
                  cursor: 'pointer',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deck Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
          </div>
        ) : decks.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-4xl mb-4">🌐</p>
            <p style={{ color: 'var(--muted)' }}>{t.noPublicDecks}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map((deck) => (
              <PublicDeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
