'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MasteryBadge } from './MasteryBadge';
import type { CardStats } from '@/types';

interface CardStatsTableProps {
  stats: CardStats[];
}

type SortKey = 'confidence' | 'avgWpm' | 'avgAccuracy' | 'attemptCount';

export function CardStatsTable({ stats }: CardStatsTableProps) {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<SortKey>('confidence');
  const [asc, setAsc] = useState(true);

  const sorted = [...stats].sort((a, b) => {
    const diff = a[sortBy] - b[sortBy];
    return asc ? diff : -diff;
  });

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setAsc(!asc);
    else { setSortBy(key); setAsc(true); }
  };

  const sortIcon = (key: SortKey) => {
    if (sortBy !== key) return '';
    return asc ? ' ↑' : ' ↓';
  };

  if (stats.length === 0) return null;

  return (
    <div
      className="rounded-xl overflow-x-auto"
      style={{ border: '1px solid var(--border)' }}
    >
      <table className="w-full text-xs" style={{ minWidth: 400 }}>
        <thead>
          <tr style={{ background: 'var(--surface2)' }}>
            <th className="text-left px-3 py-2 font-medium" style={{ color: 'var(--muted)' }}>
              Card
            </th>
            <th
              className="text-left px-3 py-2 font-medium cursor-pointer select-none"
              style={{ color: 'var(--muted)' }}
              onClick={() => handleSort('avgWpm')}
            >
              WPM{sortIcon('avgWpm')}
            </th>
            <th
              className="text-left px-3 py-2 font-medium cursor-pointer select-none"
              style={{ color: 'var(--muted)' }}
              onClick={() => handleSort('avgAccuracy')}
            >
              {t.accuracyLabel}{sortIcon('avgAccuracy')}
            </th>
            <th
              className="text-left px-3 py-2 font-medium cursor-pointer select-none"
              style={{ color: 'var(--muted)' }}
              onClick={() => handleSort('attemptCount')}
            >
              {t.attempts}{sortIcon('attemptCount')}
            </th>
            <th
              className="text-left px-3 py-2 font-medium cursor-pointer select-none"
              style={{ color: 'var(--muted)' }}
              onClick={() => handleSort('confidence')}
            >
              Level{sortIcon('confidence')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.slice(0, 20).map((card) => (
            <tr key={card.card_id} style={{ borderTop: '1px solid var(--border)' }}>
              <td className="px-3 py-2 truncate" style={{ color: 'var(--text)', maxWidth: 180 }}>
                {card.front}
              </td>
              <td className="px-3 py-2" style={{ color: 'var(--text)' }}>
                {Math.round(card.avgWpm)}
              </td>
              <td className="px-3 py-2" style={{ color: 'var(--correct)' }}>
                {Math.round(card.avgAccuracy)}%
              </td>
              <td className="px-3 py-2" style={{ color: 'var(--muted)' }}>
                {card.attemptCount}
              </td>
              <td className="px-3 py-2">
                <MasteryBadge level={card.masteryLevel} confidence={card.confidence} compact />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
