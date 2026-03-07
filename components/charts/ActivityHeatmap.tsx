'use client';
import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { DailyActivity } from '@/types';

interface ActivityHeatmapProps {
  data: DailyActivity[];
  days?: 90 | 180;
}

const CELL_SIZE = 12;
const GAP = 2;
const ROWS = 7; // Days of week

function getIntensity(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

export function ActivityHeatmap({ data, days = 180 }: ActivityHeatmapProps) {
  const { t } = useLanguage();
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const { grid, months, cols } = useMemo(() => {
    const activityMap = new Map<string, number>();
    data.forEach((d) => activityMap.set(d.date, d.sessionCount));

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);

    // Align to start of week (Sunday)
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    const totalDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const numCols = Math.ceil(totalDays / 7);

    const grid: { date: string; count: number; col: number; row: number }[] = [];
    const monthLabels: { label: string; col: number }[] = [];
    let lastMonth = -1;

    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < ROWS; row++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + col * 7 + row);
        if (d > today) continue;

        const dateStr = d.toISOString().slice(0, 10);
        const count = activityMap.get(dateStr) ?? 0;
        grid.push({ date: dateStr, count, col, row });

        if (d.getMonth() !== lastMonth && row === 0) {
          lastMonth = d.getMonth();
          monthLabels.push({
            label: d.toLocaleDateString(undefined, { month: 'short' }),
            col,
          });
        }
      }
    }

    return { grid, months: monthLabels, cols: numCols };
  }, [data, days]);

  const width = cols * (CELL_SIZE + GAP) + 30;
  const height = ROWS * (CELL_SIZE + GAP) + 20;

  return (
    <div className="relative overflow-x-auto">
      <svg width={width} height={height} style={{ display: 'block' }}>
        {/* Month labels */}
        {months.map((m, i) => (
          <text
            key={i}
            x={30 + m.col * (CELL_SIZE + GAP)}
            y={10}
            fontSize={9}
            fill="var(--muted)"
          >
            {m.label}
          </text>
        ))}

        {/* Cells */}
        {grid.map((cell, i) => {
          const intensity = getIntensity(cell.count);
          const opacityMap = [0.06, 0.25, 0.45, 0.7, 1];

          return (
            <rect
              key={i}
              x={30 + cell.col * (CELL_SIZE + GAP)}
              y={16 + cell.row * (CELL_SIZE + GAP)}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              fill={intensity === 0 ? 'var(--surface2)' : 'var(--accent)'}
              opacity={opacityMap[intensity]}
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => {
                const rect = (e.target as SVGRectElement).getBoundingClientRect();
                const d = new Date(cell.date);
                setTooltip({
                  x: rect.left + rect.width / 2,
                  y: rect.top - 4,
                  text: `${d.toLocaleDateString()}: ${cell.count} ${t.sessionsLabel}`,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed px-2 py-1 rounded text-xs z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
