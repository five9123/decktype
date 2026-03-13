import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const SUPPORTED_LANGS = ['en', 'ko', 'ja', 'zh', 'es', 'fr'] as const;
type BlogLang = (typeof SUPPORTED_LANGS)[number];

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  keywords: string[];
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: number; // minutes
}

export interface BlogPostMeta {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTime: number;
}

/**
 * Get all blog post slugs (directory names under content/blog/).
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

/**
 * Resolve the best language file for a post.
 * Falls back to 'en' if the requested language is not available.
 */
function resolvePostPath(slug: string, lang: string): string | null {
  const preferred = path.join(BLOG_DIR, slug, `${lang}.mdx`);
  if (fs.existsSync(preferred)) return preferred;
  const fallback = path.join(BLOG_DIR, slug, 'en.mdx');
  if (fs.existsSync(fallback)) return fallback;
  return null;
}

/**
 * Load a single blog post by slug and language.
 */
export function getPostBySlug(slug: string, lang: string = 'en'): BlogPost | null {
  const filePath = resolvePostPath(slug, lang);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: {
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      updated: data.updated,
      author: data.author ?? 'typee',
      tags: data.tags ?? [],
      keywords: data.keywords ?? [],
      coverImage: data.coverImage,
    },
    content,
    readingTime: Math.ceil(stats.minutes),
  };
}

/**
 * Get metadata for all posts in a given language, sorted by date descending.
 */
export function getAllPosts(lang: string = 'en'): BlogPostMeta[] {
  const slugs = getAllSlugs();
  const posts: BlogPostMeta[] = [];

  for (const slug of slugs) {
    const post = getPostBySlug(slug, lang);
    if (!post) continue;
    posts.push({
      slug: post.slug,
      frontmatter: post.frontmatter,
      readingTime: post.readingTime,
    });
  }

  return posts.sort((a, b) => {
    const da = new Date(a.frontmatter.date).getTime();
    const db = new Date(b.frontmatter.date).getTime();
    return db - da;
  });
}

/**
 * Get posts filtered by tag.
 */
export function getPostsByTag(tag: string, lang: string = 'en'): BlogPostMeta[] {
  return getAllPosts(lang).filter((p) => p.frontmatter.tags.includes(tag));
}

/**
 * Get all unique tags across all posts.
 */
export function getAllTags(lang: string = 'en'): string[] {
  const posts = getAllPosts(lang);
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  return [...tagSet].sort();
}

/**
 * Get related posts (same tags, excluding current).
 */
export function getRelatedPosts(slug: string, lang: string = 'en', limit: number = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug, lang);
  if (!current) return [];

  const all = getAllPosts(lang).filter((p) => p.slug !== slug);
  const scored = all.map((post) => {
    const overlap = post.frontmatter.tags.filter((t) => current.frontmatter.tags.includes(t)).length;
    return { post, score: overlap };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

/**
 * Check which languages are available for a given post slug.
 */
export function getAvailableLangs(slug: string): BlogLang[] {
  const dir = path.join(BLOG_DIR, slug);
  if (!fs.existsSync(dir)) return [];
  return SUPPORTED_LANGS.filter((lang) => fs.existsSync(path.join(dir, `${lang}.mdx`)));
}
