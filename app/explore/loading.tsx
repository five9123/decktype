import { SkeletonCardGrid } from '@/components/Skeleton';

export default function ExploreLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="skeleton-pulse rounded-xl mb-6" style={{ height: 32, width: 160, background: 'var(--surface)' }} />
      <SkeletonCardGrid count={9} />
    </div>
  );
}
