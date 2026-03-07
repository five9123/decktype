'use client';
import { useLanguage } from '@/contexts/LanguageContext';

interface MasteryProgressProps {
  learning: number;
  familiar: number;
  mastered: number;
  total: number;
  compact?: boolean;
}

export function MasteryProgress({ learning, familiar, mastered, total, compact }: MasteryProgressProps) {
  const { t } = useLanguage();

  if (total === 0) return null;

  const pctLearning = (learning / total) * 100;
  const pctFamiliar = (familiar / total) * 100;
  const pctMastered = (mastered / total) * 100;
  const unpracticed = total - learning - familiar - mastered;

  return (
    <div>
      {/* Progress bar */}
      <div
        className="flex overflow-hidden"
        style={{
          height: compact ? 6 : 8,
          borderRadius: compact ? 3 : 4,
          background: 'var(--surface2)',
        }}
      >
        {pctMastered > 0 && (
          <div style={{ width: `${pctMastered}%`, background: '#4ADE80', transition: 'width 0.3s ease' }} />
        )}
        {pctFamiliar > 0 && (
          <div style={{ width: `${pctFamiliar}%`, background: '#FBBF24', transition: 'width 0.3s ease' }} />
        )}
        {pctLearning > 0 && (
          <div style={{ width: `${pctLearning}%`, background: '#F87171', transition: 'width 0.3s ease' }} />
        )}
      </div>

      {/* Legend */}
      {!compact && (
        <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: 'var(--muted)' }}>
          <span className="flex items-center gap-1">
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#4ADE80', display: 'inline-block' }} />
            {t.mastered} {mastered}
          </span>
          <span className="flex items-center gap-1">
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#FBBF24', display: 'inline-block' }} />
            {t.familiar} {familiar}
          </span>
          <span className="flex items-center gap-1">
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#F87171', display: 'inline-block' }} />
            {t.learning} {learning}
          </span>
          {unpracticed > 0 && (
            <span style={{ color: 'var(--muted)', opacity: 0.6 }}>
              +{unpracticed}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
