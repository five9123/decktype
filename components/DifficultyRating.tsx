'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { FSRSRating } from '@/types';

interface DifficultyRatingProps {
  onRate: (rating: FSRSRating) => void;
  progress: number; // 0-1 auto-advance countdown
}

const COLORS: Record<number, string> = {
  1: 'var(--incorrect)',
  2: '#F59E0B',
  3: 'var(--correct)',
  4: '#3B82F6',
};

export function DifficultyRating({ onRate, progress }: DifficultyRatingProps) {
  const { t } = useLanguage();
  const labels: Record<number, string> = {
    1: t.rateAgain,
    2: t.rateHard,
    3: t.rateGood,
    4: t.rateEasy,
  };

  return (
    <div className="mt-2">
      <p className="text-xs text-center mb-1.5" style={{ color: 'var(--muted)' }}>
        {t.rateHint}
      </p>
      <div className="relative grid grid-cols-4 gap-1 sm:gap-1.5 overflow-hidden rounded-xl">
        {([1, 2, 3, 4] as FSRSRating[]).map((rating) => (
          <button
            key={rating}
            onClick={() => onRate(rating)}
            className="py-2.5 rounded-lg text-[11px] sm:text-sm font-bold whitespace-nowrap"
            style={{
              background: COLORS[rating],
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              opacity: 0.9,
              transition: 'opacity 150ms',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.9'; }}
          >
            {labels[rating]}
          </button>
        ))}
        {/* Auto-advance progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ width: `${(1 - progress) * 100}%`, background: 'rgba(255,255,255,0.5)' }}
        />
      </div>
    </div>
  );
}
