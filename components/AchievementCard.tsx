'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { Achievement, UserAchievement } from '@/types';

interface AchievementCardProps {
  achievement: Achievement;
  userAchievement?: UserAchievement;
}

export function AchievementCard({ achievement, userAchievement }: AchievementCardProps) {
  const { t } = useLanguage();
  const tAny = t as Record<string, string>;
  const isUnlocked = !!userAchievement;

  const nameKey = `achiev${achievement.id.split('_').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')}`;
  const name = tAny[nameKey] || achievement.id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="flex flex-col items-center justify-center p-3 rounded-xl text-center"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${isUnlocked ? 'var(--accent)' : 'var(--border)'}`,
        opacity: isUnlocked ? 1 : 0.5,
        minHeight: 100,
      }}
    >
      <span style={{ fontSize: 28, filter: isUnlocked ? 'none' : 'grayscale(1)' }}>
        {isUnlocked ? achievement.icon : '🔒'}
      </span>
      <p className="text-xs font-bold mt-1.5" style={{ color: isUnlocked ? 'var(--text)' : 'var(--muted)' }}>
        {name}
      </p>
      {isUnlocked && userAchievement && (
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
          {new Date(userAchievement.unlocked_at).toLocaleDateString()}
        </p>
      )}
      {!isUnlocked && (
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
          +{achievement.xpReward} XP
        </p>
      )}
    </div>
  );
}
