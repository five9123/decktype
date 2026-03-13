import { NextResponse } from 'next/server';
import { getAllPosts, getAllTags } from '@/lib/blog';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') ?? 'en';
  const tag = searchParams.get('tag');

  let posts = getAllPosts(lang);
  if (tag) {
    posts = posts.filter((p) => p.frontmatter.tags.includes(tag));
  }

  const tags = getAllTags(lang);

  return NextResponse.json({ posts, tags });
}
