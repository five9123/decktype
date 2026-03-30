import { SkeletonChart } from '@/components/Skeleton';

export default function LeaderboardLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="skeleton-pulse rounded-xl mb-6" style={{ height: 32, width: 180, background: 'var(--surface)' }} />
      <div className="flex gap-2 mb-6">
        {[80, 90, 100].map((w) => (
          <div key={w} className="skeleton-pulse rounded-full" style={{ height: 32, width: w, background: 'var(--surface)' }} />
        ))}
      </div>
      <SkeletonChart height={400} />
    </div>
  );
}
