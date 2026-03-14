'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Deck } from '@/types';

export function DeckCard({ deck, dueCount }: { deck: Deck; dueCount?: number }) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/deck/${deck.id}`}
      className="block p-5 rounded-2xl no-underline card-hover"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-base truncate" style={{ color: 'var(--text)' }}>
          {deck.name}
        </h3>
        {dueCount != null && dueCount > 0 && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {dueCount} {t.dueToday ?? 'due'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
        <span>{deck.card_count} {t.cards}</span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span>{deck.note_type === 'Cloze' ? (t.clozeCards ?? 'Fill in Blank') : (t.vocabularyCards ?? 'Vocabulary')}</span>
      </div>

      {deck.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {deck.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ background: 'var(--surface2)', color: 'var(--muted)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
