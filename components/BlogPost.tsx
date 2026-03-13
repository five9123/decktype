'use client';

import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

interface TOCItem {
  level: number;
  text: string;
  id: string;
}

interface BlogPostHeaderProps {
  title: string;
  date: string;
  readingTime: number;
  tags: string[];
  author: string;
  minLabel?: string;
}

export function BlogPostHeader({
  title,
  date,
  readingTime,
  tags,
  author,
  minLabel = 'min read',
}: BlogPostHeaderProps) {
  return (
    <header className="mb-10">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full font-medium"
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
      <h1
        className="text-3xl sm:text-4xl font-bold mb-4"
        style={{ color: 'var(--text)', lineHeight: 1.25 }}
      >
        {title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
        <span>{author}</span>
        <span>&middot;</span>
        <time dateTime={date}>{formatDate(date)}</time>
        <span>&middot;</span>
        <span>{readingTime} {minLabel}</span>
      </div>
    </header>
  );
}

interface TableOfContentsProps {
  headings: TOCItem[];
  tocLabel?: string;
}

export function TableOfContents({ headings, tocLabel = 'Table of Contents' }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      className="rounded-xl p-5 mb-8"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      aria-label={tocLabel}
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
        {tocLabel}
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '16px' : '0' }}>
            <a
              href={`#${h.id}`}
              className="text-sm no-underline transition-opacity hover:opacity-80 block py-0.5"
              style={{ color: h.level === 2 ? 'var(--text)' : 'var(--muted)' }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface RelatedPostsProps {
  posts: BlogPostMeta[];
  label?: string;
  minLabel?: string;
}

export function RelatedPosts({ posts, label = 'Related Articles', minLabel = 'min' }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
        {label}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl p-4 no-underline transition-all hover:translate-y-[-1px]"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
              {post.frontmatter.title}
            </h3>
            <p className="text-xs line-clamp-2" style={{ color: 'var(--muted)' }}>
              {post.frontmatter.description}
            </p>
            <span className="text-xs mt-2 block" style={{ color: 'var(--muted)' }}>
              {post.readingTime} {minLabel}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
