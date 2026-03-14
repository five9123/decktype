import { NextResponse } from 'next/server';
import { getAllPosts, getAllTags } from '@/lib/blog';

export const runtime = 'nodejs';

const VALID_LANGS = ['en', 'ko', 'ja', 'es', 'zh', 'fr'];
const TAG_RE = /^[a-z0-9-]+$/i;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawLang = searchParams.get('lang') ?? 'en';
  const lang = VALID_LANGS.includes(rawLang) ? rawLang : 'en';
  const tag = searchParams.get('tag');

  let posts = getAllPosts(lang);
  if (tag && TAG_RE.test(tag)) {
    posts = posts.filter((p) => p.frontmatter.tags.includes(tag));
  }

  const tags = getAllTags(lang);

  return NextResponse.json({ posts, tags });
}
