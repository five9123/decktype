'use client';

import { useState, useEffect } from 'react';
import { TopToolbar } from '@/components/TopToolbar';
import { BlogCard } from '@/components/BlogCard';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPostMeta } from '@/lib/blog';

const TAG_LABELS: Record<string, string> = {
  all: 'All',
  science: 'Science',
  memory: 'Memory',
  vocabulary: 'Vocabulary',
  strategy: 'Strategy',
  guide: 'Guide',
  korean: 'Korean',
  japanese: 'Japanese',
  chinese: 'Chinese',
  spanish: 'Spanish',
  english: 'English',
  beginner: 'Beginner',
  comparison: 'Comparison',
  technology: 'Technology',
  spelling: 'Spelling',
  speaking: 'Speaking',
  fluency: 'Fluency',
};

export default function BlogListPage() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts ?? []);
        setTags(data.tags ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lang]);

  const filteredPosts = activeTag === 'all'
    ? posts
    : posts.filter((p) => p.frontmatter.tags.includes(activeTag));

  return (
    <>
      <TopToolbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            {t.blogTitle}
          </h1>
          <p className="text-base" style={{ color: 'var(--muted)', maxWidth: 600 }}>
            {t.blogDescription}
          </p>
        </div>

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.typee.app' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.typee.app/blog' },
              ],
            }),
          }}
        />

        {/* Tag Filter */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTag('all')}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: activeTag === 'all' ? 'var(--accent)' : 'var(--surface)',
                color: activeTag === 'all' ? '#fff' : 'var(--muted)',
                border: activeTag === 'all' ? 'none' : '1px solid var(--border)',
                cursor: 'pointer',
              }}
            >
              {TAG_LABELS.all}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={{
                  background: activeTag === tag ? 'var(--accent)' : 'var(--surface)',
                  color: activeTag === tag ? '#fff' : 'var(--muted)',
                  border: activeTag === tag ? 'none' : '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                {TAG_LABELS[tag] ?? tag}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 rounded-full border-3 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
            />
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                readMoreLabel={t.blogReadMore}
                minLabel={t.blogMinRead}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: 'var(--muted)' }}>
              {t.blogNoPosts}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
