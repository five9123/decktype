'use client';

import { xpToNextLevel } from '@/lib/achievements';

interface XPProgressBarProps {
  xp: number;
  level: number;
}

export function XPProgressBar({ xp, level }: XPProgressBarProps) {
  const { currentLevelXP, nextLevelXP, progress } = xpToNextLevel(xp);
  const currentInLevel = xp - currentLevelXP;
  const needed = nextLevelXP - currentLevelXP;

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-bold" style={{ color: 'var(--accent)', minWidth: 32 }}>
        Lv.{level}
      </span>
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: 'var(--surface)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress * 100, 100)}%`, background: 'var(--accent)' }}
        />
      </div>
      <span className="text-xs tabular-nums" style={{ color: 'var(--muted)', minWidth: 48, textAlign: 'right' }}>
        {currentInLevel}/{needed} XP
      </span>
    </div>
  );
}
