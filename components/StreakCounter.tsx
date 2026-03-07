'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PracticeStreak } from '@/types';

interface StreakCounterProps {
  streak: PracticeStreak;
  compact?: boolean;
}

export function StreakCounter({ streak, compact }: StreakCounterProps) {
  const { t } = useLanguage();

  if (streak.current === 0 && !streak.todayDone) {
    if (compact) return null;
    return (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        <span style={{ fontSize: '1rem' }}>🔥</span>
        {t.practiceToday}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}
      style={{ color: 'var(--text)' }}
    >
      <span style={{ fontSize: compact ? '1rem' : '1.25rem' }}>🔥</span>
      <span className="font-bold" style={{ color: 'var(--accent)' }}>
        {streak.current}
      </span>
      <span style={{ color: 'var(--muted)' }}>
        {compact ? 'd' : t.currentStreak}
      </span>
      {!compact && streak.longest > streak.current && (
        <span className="text-xs" style={{ color: 'var(--muted)', opacity: 0.6 }}>
          ({t.longestStreak}: {streak.longest})
        </span>
      )}
    </div>
  );
}
