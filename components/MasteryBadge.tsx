'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { MasteryLevel } from '@/types';

const LEVEL_CONFIG: Record<MasteryLevel, { bg: string; color: string; key: string }> = {
  learning: { bg: 'rgba(248,113,113,0.15)', color: '#F87171', key: 'learning' },
  familiar: { bg: 'rgba(251,191,36,0.15)', color: '#FBBF24', key: 'familiar' },
  mastered: { bg: 'rgba(74,222,128,0.15)', color: '#4ADE80', key: 'mastered' },
};

interface MasteryBadgeProps {
  level: MasteryLevel;
  confidence?: number;
  compact?: boolean;
}

export function MasteryBadge({ level, confidence, compact }: MasteryBadgeProps) {
  const { t } = useLanguage();
  const config = LEVEL_CONFIG[level];
  const label = (t as Record<string, string>)[config.key] ?? level;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full font-medium"
      style={{
        background: config.bg,
        color: config.color,
        padding: compact ? '1px 6px' : '2px 8px',
        fontSize: compact ? '0.65rem' : '0.7rem',
      }}
      title={confidence !== undefined ? `Confidence: ${confidence}%` : undefined}
    >
      <span style={{ fontSize: compact ? '0.5rem' : '0.55rem' }}>
        {level === 'mastered' ? '★' : level === 'familiar' ? '◉' : '○'}
      </span>
      {label}
    </span>
  );
}
