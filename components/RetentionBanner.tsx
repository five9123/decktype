'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { STORAGE_KEY_RETENTION_DISMISSED } from '@/lib/storage-keys';
import type { PracticeStreak } from '@/types';

interface RetentionBannerProps {
  streak: PracticeStreak;
  dueCount: number;
  lastSessionDate?: string;
  /** deck id to link practice button to (first deck) */
  firstDeckId?: string;
}

type BannerType = 'streak_milestone' | 'practice_today' | 'welcome_back' | 'due_cards';

interface BannerConfig {
  message: string;
  bg: string;
  border: string;
  color: string;
  emoji: string;
}

export function RetentionBanner({ streak, dueCount, lastSessionDate, firstDeckId }: RetentionBannerProps) {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(true); // Start dismissed to avoid flash

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY_RETENTION_DISMISSED);
    setDismissed(!!wasDismissed);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY_RETENTION_DISMISSED, 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  // Determine banner type by priority
  const bannerType = getBannerType(streak, dueCount, lastSessionDate);
  if (!bannerType) return null;

  const config = getBannerConfig(bannerType, streak, dueCount, t);

  return (
    <div
      className="retention-banner px-4 py-3 rounded-xl text-sm mb-4 flex items-center justify-between gap-3"
      style={{ background: config.bg, border: `1px solid ${config.border}`, color: config.color }}
    >
      <span>
        <span className="mr-2">{config.emoji}</span>
        {config.message}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        {firstDeckId && bannerType !== 'streak_milestone' && (
          <Link
            href={`/deck/${firstDeckId}/practice`}
            className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-opacity hover:opacity-90"
            style={{ background: config.color, color: config.bg.includes('accent') ? '#fff' : '#000' }}
          >
            {t.retentionStartBtn}
          </Link>
        )}
        <button
          onClick={handleDismiss}
          className="text-xs opacity-60 hover:opacity-100 transition-opacity"
          style={{ background: 'none', border: 'none', color: config.color, cursor: 'pointer', padding: '4px' }}
          aria-label={t.retentionDismiss}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function getBannerType(
  streak: PracticeStreak,
  dueCount: number,
  lastSessionDate?: string,
): BannerType | null {
  // Priority 1: Streak milestone (7, 14, 21, 30, 50, 100...)
  if (streak.current >= 7 && (streak.current % 7 === 0 || streak.current === 30 || streak.current === 50 || streak.current === 100)) {
    return 'streak_milestone';
  }

  // Priority 2: Welcome back (3+ days since last session)
  if (lastSessionDate) {
    const daysSince = Math.floor((Date.now() - new Date(lastSessionDate).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince >= 3) return 'welcome_back';
  }

  // Priority 3: Due cards for review
  if (dueCount > 0) return 'due_cards';

  // Priority 4: Practice today
  if (!streak.todayDone) return 'practice_today';

  return null;
}

function getBannerConfig(
  type: BannerType,
  streak: PracticeStreak,
  dueCount: number,
  t: ReturnType<typeof useLanguage>['t'],
): BannerConfig {
  switch (type) {
    case 'streak_milestone':
      return {
        message: t.retentionStreakMilestone.replace('{n}', String(streak.current)),
        bg: 'rgba(189,147,249,0.1)',
        border: 'rgba(189,147,249,0.3)',
        color: 'var(--accent)',
        emoji: '🔥',
      };
    case 'practice_today':
      return {
        message: t.retentionPracticeToday,
        bg: 'var(--surface2)',
        border: 'var(--border)',
        color: 'var(--text)',
        emoji: '💪',
      };
    case 'welcome_back':
      return {
        message: t.retentionWelcomeBack,
        bg: 'rgba(251,191,36,0.1)',
        border: 'rgba(251,191,36,0.3)',
        color: '#fbbf24',
        emoji: '👋',
      };
    case 'due_cards':
      return {
        message: t.retentionDueCards.replace('{n}', String(dueCount)),
        bg: 'rgba(189,147,249,0.08)',
        border: 'rgba(189,147,249,0.2)',
        color: 'var(--accent)',
        emoji: '📚',
      };
  }
}
