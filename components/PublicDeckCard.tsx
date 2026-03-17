'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface PublicDeckCardProps {
  deck: {
    id: string;
    name: string;
    card_count: number;
    note_type: string;
    source_lang: string | null;
    like_count: number;
    clone_count: number;
    published_at: string | null;
    profiles?: { display_name: string } | null;
  };
}

export function PublicDeckCard({ deck }: PublicDeckCardProps) {
  const { t } = useLanguage();
  const author = deck.profiles?.display_name || t.anonymous;

  return (
    <Link
      href={`/explore/${deck.id}`}
      className="block p-5 rounded-2xl no-underline card-hover"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-bold text-base truncate mb-2" style={{ color: 'var(--text)' }}>
        {deck.name}
      </h3>

      <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--muted)' }}>
        <span>{deck.card_count} {t.cards}</span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span>{deck.note_type === 'Cloze' ? (t.clozeCards ?? 'Fill in Blank') : (t.vocabularyCards ?? 'Vocabulary')}</span>
        {deck.source_lang && (
          <>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span>{deck.source_lang.toUpperCase()}</span>
          </>
        )}
      </div>

      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
        <span>{author}</span>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            {deck.like_count}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {deck.clone_count}
          </span>
        </div>
      </div>
    </Link>
  );
}
