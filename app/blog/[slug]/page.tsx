'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { TopToolbar } from '@/components/TopToolbar';
import { blogMDXComponents, extractHeadings } from '@/components/BlogMDXComponents';
import { BlogPostHeader, TableOfContents, RelatedPosts } from '@/components/BlogPost';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPostMeta } from '@/lib/blog';

interface PostData {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    keywords: string[];
  };
  content: string;
  mdxSource: MDXRemoteSerializeResult;
  readingTime: number;
  headings: { level: number; text: string; id: string }[];
  relatedPosts: BlogPostMeta[];
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t, lang } = useLanguage();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError('');

    fetch(`/api/blog/${slug}?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
        // Update document title
        if (data.frontmatter?.title) {
          document.title = `${data.frontmatter.title} | typee Blog`;
        }
      })
      .catch(() => {
        setError('Post not found');
        setLoading(false);
      });
  }, [slug, lang]);

  if (loading) {
    return (
      <>
        <TopToolbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 rounded-full border-3 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
            />
          </div>
        </main>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <TopToolbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            {error || 'Post not found'}
          </h1>
          <a href="/blog" style={{ color: 'var(--accent)' }}>
            &larr; {t.blogBackToList}
          </a>
        </main>
      </>
    );
  }

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
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
                { '@type': 'ListItem', position: 3, name: post.frontmatter.title, item: `https://www.typee.app/blog/${slug}` },
              ],
            }),
          }}
        />

        {/* BlogPosting Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.frontmatter.title,
              description: post.frontmatter.description,
              datePublished: post.frontmatter.date,
              author: {
                '@type': 'Organization',
                name: 'typee',
                url: 'https://www.typee.app',
              },
              publisher: {
                '@type': 'Organization',
                name: 'typee',
                url: 'https://www.typee.app',
              },
              mainEntityOfPage: `https://www.typee.app/blog/${slug}`,
              keywords: post.frontmatter.keywords?.join(', '),
            }),
          }}
        />

        {/* Back link */}
        <a
          href="/blog"
          className="inline-block text-sm mb-6 no-underline transition-opacity hover:opacity-80"
          style={{ color: 'var(--muted)' }}
        >
          &larr; {t.blogBackToList}
        </a>

        {/* Post Header */}
        <BlogPostHeader
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          readingTime={post.readingTime}
          tags={post.frontmatter.tags}
          author={post.frontmatter.author}
          minLabel={t.blogMinRead}
        />

        {/* Table of Contents */}
        {post.headings && post.headings.length > 2 && (
          <TableOfContents headings={post.headings} tocLabel={t.blogToc} />
        )}

        {/* MDX Content */}
        <article className="blog-content">
          <MDXRemote {...post.mdxSource} components={blogMDXComponents} />
        </article>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            posts={post.relatedPosts}
            label={t.blogRelated}
            minLabel={t.blogMinRead}
          />
        )}
      </main>
    </>
  );
}
