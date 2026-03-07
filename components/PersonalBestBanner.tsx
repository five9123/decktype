'use client';
import { useLanguage } from '@/contexts/LanguageContext';

interface PBRecord {
  type: 'wpm' | 'accuracy' | 'composite';
  oldValue: number;
  newValue: number;
}

interface PersonalBestBannerProps {
  records: PBRecord[];
}

const TYPE_LABELS: Record<string, string> = {
  wpm: 'WPM',
  accuracy: 'Accuracy',
  composite: 'Score',
};

export function PersonalBestBanner({ records }: PersonalBestBannerProps) {
  const { t } = useLanguage();

  if (records.length === 0) return null;

  return (
    <div
      className="px-4 py-3 rounded-xl mb-6 text-center"
      style={{
        background: 'rgba(74,222,128,0.1)',
        border: '1px solid rgba(74,222,128,0.3)',
      }}
    >
      <p className="text-lg font-bold mb-1" style={{ color: 'var(--correct)' }}>
        🏆 {t.newPB}
      </p>
      <div className="flex justify-center gap-4 text-sm">
        {records.map((r) => (
          <span key={r.type} style={{ color: 'var(--text)' }}>
            <span style={{ color: 'var(--muted)' }}>{TYPE_LABELS[r.type]}:</span>{' '}
            <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>{r.oldValue}</span>
            {' → '}
            <span className="font-bold" style={{ color: 'var(--correct)' }}>{r.newValue}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
