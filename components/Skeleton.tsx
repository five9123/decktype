'use client';

/** Skeleton pulse block — base building block */
function SkeletonBox({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`skeleton-pulse rounded-xl ${className}`}
      style={{ background: 'var(--surface)', ...style }}
    />
  );
}

/** Skeleton for a single DeckCard */
export function SkeletonCard() {
  return (
    <div
      className="p-5 rounded-2xl"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <SkeletonBox style={{ height: 20, width: '70%', marginBottom: 12, borderRadius: 8 }} />
      <SkeletonBox style={{ height: 14, width: '40%', marginBottom: 20, borderRadius: 6 }} />
      <div className="flex gap-2">
        <SkeletonBox style={{ height: 28, width: 60, borderRadius: 14 }} />
        <SkeletonBox style={{ height: 28, width: 80, borderRadius: 14 }} />
      </div>
    </div>
  );
}

/** Skeleton grid — renders n SkeletonCards in a responsive grid */
export function SkeletonCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/** Skeleton for a text line */
export function SkeletonText({ width = '100%' }: { width?: string | number }) {
  return <SkeletonBox style={{ height: 14, width, borderRadius: 6, marginBottom: 8 }} />;
}

/** Skeleton for chart/heatmap area */
export function SkeletonChart({ height = 200 }: { height?: number }) {
  return (
    <div
      className="skeleton-pulse rounded-2xl"
      style={{
        height,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    />
  );
}

/** Skeleton for a stat row (label + value) */
export function SkeletonStatRow() {
  return (
    <div className="flex items-center justify-between py-3">
      <SkeletonBox style={{ height: 14, width: 100, borderRadius: 6 }} />
      <SkeletonBox style={{ height: 20, width: 60, borderRadius: 8 }} />
    </div>
  );
}

/** Skeleton for stats page overview */
export function SkeletonStatsOverview() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <SkeletonBox style={{ height: 12, width: '60%', borderRadius: 6, marginBottom: 8 }} />
            <SkeletonBox style={{ height: 28, width: '80%', borderRadius: 8 }} />
          </div>
        ))}
      </div>
      <SkeletonChart height={200} />
    </div>
  );
}
