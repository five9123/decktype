import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMeta;
  readMoreLabel?: string;
  minLabel?: string;
}

export function BlogCard({ post, readMoreLabel = 'Read more', minLabel = 'min' }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl p-6 no-underline transition-all hover:translate-y-[-2px]"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Tags */}
      {frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: 'rgba(124,58,237,0.1)',
                color: 'var(--accent)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3
        className="text-lg font-bold mb-2 transition-colors"
        style={{ color: 'var(--text)' }}
      >
        {frontmatter.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm mb-4 line-clamp-2"
        style={{ color: 'var(--muted)', lineHeight: 1.6 }}
      >
        {frontmatter.description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          {formatDate(frontmatter.date)} &middot; {readingTime} {minLabel}
        </span>
        <span
          className="text-xs font-medium transition-opacity group-hover:opacity-100 opacity-70"
          style={{ color: 'var(--accent)' }}
        >
          {readMoreLabel} &rarr;
        </span>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
