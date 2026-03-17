'use client';

import Link from 'next/link';

interface LevelBadgeProps {
  level: number;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <Link
      href="/stats"
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold no-underline"
      style={{
        background: 'var(--accent)',
        color: '#fff',
        opacity: 0.9,
        transition: 'opacity 150ms',
      }}
      title={`Level ${level}`}
    >
      Lv.{level}
    </Link>
  );
}
