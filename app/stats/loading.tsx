import { SkeletonStatsOverview } from '@/components/Skeleton';

export default function StatsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="skeleton-pulse rounded-xl mb-6" style={{ height: 32, width: 140, background: 'var(--surface)' }} />
      <SkeletonStatsOverview />
    </div>
  );
}
