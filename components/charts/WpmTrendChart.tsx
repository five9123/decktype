'use client';
import { useMemo, useState } from 'react';

interface DataPoint {
  wpm: number;
  date: string;
}

interface WpmTrendChartProps {
  sessions: DataPoint[];
}

const WIDTH = 600;
const HEIGHT = 200;
const PADDING = { top: 20, right: 20, bottom: 30, left: 40 };

export function WpmTrendChart({ sessions }: WpmTrendChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const { points, yTicks } = useMemo(() => {
    if (sessions.length === 0) return { points: [], minWpm: 0, maxWpm: 100, yTicks: [] };

    const wpms = sessions.map((s) => s.wpm);
    const min = Math.max(0, Math.min(...wpms) - 5);
    const max = Math.max(...wpms) + 5;
    const range = max - min || 1;

    const chartW = WIDTH - PADDING.left - PADDING.right;
    const chartH = HEIGHT - PADDING.top - PADDING.bottom;

    const pts = sessions.map((s, i) => ({
      x: PADDING.left + (i / Math.max(sessions.length - 1, 1)) * chartW,
      y: PADDING.top + chartH - ((s.wpm - min) / range) * chartH,
      wpm: s.wpm,
      date: s.date,
    }));

    // Y-axis ticks
    const tickCount = 4;
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) => {
      const value = min + (range / tickCount) * i;
      return {
        value: Math.round(value),
        y: PADDING.top + chartH - (i / tickCount) * chartH,
      };
    });

    return { points: pts, minWpm: min, maxWpm: max, yTicks: ticks };
  }, [sessions]);

  if (sessions.length < 2) return null;

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        style={{ maxWidth: WIDTH, minWidth: 300 }}
      >
        {/* Grid lines */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={PADDING.left}
              y1={tick.y}
              x2={WIDTH - PADDING.right}
              y2={tick.y}
              stroke="var(--border)"
              strokeWidth={0.5}
              strokeDasharray="4,4"
            />
            <text
              x={PADDING.left - 6}
              y={tick.y + 4}
              fontSize={10}
              fill="var(--muted)"
              textAnchor="end"
            >
              {tick.value}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <polygon
          points={`${points[0].x},${HEIGHT - PADDING.bottom} ${polylinePoints} ${points[points.length - 1].x},${HEIGHT - PADDING.bottom}`}
          fill="var(--accent)"
          opacity={0.08}
        />

        {/* Line */}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hovered === i ? 5 : 3}
            fill={hovered === i ? 'var(--accent)' : 'var(--bg)'}
            stroke="var(--accent)"
            strokeWidth={2}
            style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {/* Hover tooltip */}
        {hovered !== null && points[hovered] && (
          <g>
            <rect
              x={points[hovered].x - 35}
              y={points[hovered].y - 30}
              width={70}
              height={22}
              rx={4}
              fill="var(--surface)"
              stroke="var(--border)"
            />
            <text
              x={points[hovered].x}
              y={points[hovered].y - 16}
              fontSize={10}
              fill="var(--text)"
              textAnchor="middle"
              fontWeight="bold"
            >
              {points[hovered].wpm} WPM
            </text>
          </g>
        )}

        {/* X-axis label */}
        <text
          x={WIDTH / 2}
          y={HEIGHT - 4}
          fontSize={10}
          fill="var(--muted)"
          textAnchor="middle"
        >
          {sessions.length} sessions
        </text>
      </svg>
    </div>
  );
}
