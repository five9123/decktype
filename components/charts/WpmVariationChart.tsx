'use client';

interface CardWpm {
  label: string;
  wpm: number;
  accuracy: number;
}

interface WpmVariationChartProps {
  cards: CardWpm[];
}

function getBarColor(accuracy: number): string {
  if (accuracy >= 90) return 'var(--correct)';
  if (accuracy >= 70) return '#FBBF24';
  return 'var(--incorrect)';
}

export function WpmVariationChart({ cards }: WpmVariationChartProps) {
  if (cards.length === 0) return null;

  const maxWpm = Math.max(...cards.map((c) => c.wpm), 1);

  return (
    <div className="space-y-1.5">
      {cards.map((card, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span
            className="truncate text-right"
            style={{ color: 'var(--muted)', width: 80, minWidth: 80 }}
          >
            {card.label}
          </span>
          <div className="flex-1 relative" style={{ height: 16 }}>
            <div
              className="absolute inset-y-0 left-0 rounded"
              style={{
                width: `${Math.max((card.wpm / maxWpm) * 100, 4)}%`,
                background: getBarColor(card.accuracy),
                opacity: 0.8,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span style={{ color: 'var(--text)', minWidth: 48, textAlign: 'right' }}>
            {card.wpm} WPM
          </span>
        </div>
      ))}
    </div>
  );
}
