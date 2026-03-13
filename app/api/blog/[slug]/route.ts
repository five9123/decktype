import { NextResponse } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { extractHeadings } from '@/components/BlogMDXComponents';

export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') ?? 'en';

  const post = getPostBySlug(slug, lang);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Serialize MDX content
  const mdxSource = await serialize(post.content, {
    parseFrontmatter: false,
  });

  // Extract headings for TOC
  const headings = extractHeadings(post.content);

  // Get related posts
  const relatedPosts = getRelatedPosts(slug, lang, 3);

  return NextResponse.json({
    frontmatter: post.frontmatter,
    content: post.content,
    mdxSource,
    readingTime: post.readingTime,
    headings,
    relatedPosts,
  });
}
