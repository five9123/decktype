'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CardResultWithText {
  card_id: string;
  wpm: number;
  accuracy: number;
  typed_text: string;
  target_text: string;
}

interface CardInfo {
  id: string;
  front: string;
  back: string;
}

interface Props {
  cardResults: CardResultWithText[];
  cards: CardInfo[];
}

/**
 * Segment a string into grapheme clusters.
 */
function segmentGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return [...segmenter.segment(text)].map((s) => s.segment);
  }
  return [...text];
}

/**
 * Build a character-level diff between typed and target text.
 */
function buildDiff(typed: string, target: string) {
  const typedChars = segmentGraphemes(typed.normalize('NFC'));
  const targetChars = segmentGraphemes(target.normalize('NFC'));
  const maxLen = Math.max(typedChars.length, targetChars.length);

  const result: { char: string; status: 'correct' | 'incorrect' | 'missing' | 'extra' }[] = [];

  for (let i = 0; i < maxLen; i++) {
    const t = targetChars[i];
    const u = typedChars[i];

    if (t && u) {
      result.push({ char: t, status: t === u ? 'correct' : 'incorrect' });
    } else if (t && !u) {
      result.push({ char: t, status: 'missing' });
    } else if (!t && u) {
      result.push({ char: u, status: 'extra' });
    }
  }

  return result;
}

export function WrongCardsReview({ cardResults, cards }: Props) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const wrongCards = cardResults.filter(
    (cr) => cr.accuracy < 100 && cr.typed_text && cr.target_text,
  );

  if (wrongCards.length === 0) return null;

  const toggle = (cardId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  };

  return (
    <div
      className="p-4 rounded-xl mb-6 text-left"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
        {t.cardsToReview ?? 'Cards to Review'} ({wrongCards.length})
      </h3>
      <div className="flex flex-col gap-2">
        {wrongCards.map((cr) => {
          const card = cards.find((c) => c.id === cr.card_id);
          const isExpanded = expanded.has(cr.card_id);
          const diff = isExpanded ? buildDiff(cr.typed_text, cr.target_text) : [];

          return (
            <div key={cr.card_id}>
              <button
                onClick={() => toggle(cr.card_id)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >
                <span className="truncate" style={{ maxWidth: '70%' }}>
                  {card?.front ?? cr.card_id.slice(0, 8)}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background: cr.accuracy >= 80 ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)',
                    color: cr.accuracy >= 80 ? 'var(--correct)' : 'var(--incorrect)',
                  }}
                >
                  {cr.accuracy}%
                </span>
              </button>
              {isExpanded && (
                <div className="px-3 py-2 mt-1 rounded-lg" style={{ background: 'var(--bg)' }}>
                  <p className="text-xs mb-1.5" style={{ color: 'var(--muted)' }}>
                    {t.showDetails ?? 'Your input'}:
                  </p>
                  <div className="flex flex-wrap gap-0.5 font-mono text-sm">
                    {diff.map((d, i) => (
                      <span
                        key={i}
                        className={
                          d.status === 'correct' ? 'char-correct'
                          : d.status === 'extra' ? 'char-extra'
                          : 'char-incorrect'
                        }
                      >
                        {d.char === ' ' ? '\u00A0' : d.char}
                      </span>
                    ))}
                  </div>
                  {cr.wpm > 0 && (
                    <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>
                      {cr.wpm} WPM
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
