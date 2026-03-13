import { NextResponse } from 'next/server';
import { detectLang } from '@/lib/lang-detect';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const MAX_TEXT_LENGTH = 50_000;
const FETCH_TIMEOUT = 10_000;
// Rate limit: 10 requests per minute per IP
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60_000;

/**
 * Block SSRF: reject private/reserved IP ranges and localhost.
 */
function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h === '::1') return true;
  // Reject any IPv6 bracket notation
  if (h.startsWith('[')) return true;
  // Reject private IPv4 ranges
  const ipv4 = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 10) return true;                          // 10.0.0.0/8
    if (a === 172 && b >= 16 && b <= 31) return true;   // 172.16.0.0/12
    if (a === 192 && b === 168) return true;             // 192.168.0.0/16
    if (a === 169 && b === 254) return true;             // 169.254.0.0/16 (link-local / AWS metadata)
    if (a === 127) return true;                          // 127.0.0.0/8
    if (a === 0) return true;                            // 0.0.0.0/8
  }
  return false;
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const { limited, resetMs } = rateLimit(`extract-url:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
    if (limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(resetMs / 1000)) } },
      );
    }

    const body = await req.json();
    const { url } = body as { url?: string };

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    let parsed: URL;
    try {
      parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Only HTTP/HTTPS URLs are supported' }, { status: 400 });
    }

    // Block SSRF: reject private/internal hosts
    if (isPrivateHost(parsed.hostname)) {
      return NextResponse.json({ error: 'Internal/private URLs are not allowed' }, { status: 400 });
    }

    // Fetch with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    let html: string;
    try {
      const res = await fetch(parsed.href, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; typee/1.0; +https://www.typee.app)',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8,ja;q=0.7',
        },
      });
      clearTimeout(timeout);

      if (!res.ok) {
        return NextResponse.json({ error: `Failed to fetch URL: ${res.status}` }, { status: 502 });
      }

      const contentType = res.headers.get('content-type') ?? '';
      if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
        return NextResponse.json({ error: 'URL does not point to an HTML page' }, { status: 400 });
      }

      html = await res.text();
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof DOMException && err.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timed out' }, { status: 504 });
      }
      return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 502 });
    }

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';

    // Extract main text content
    const text = extractText(html, parsed.hostname);

    if (!text || text.trim().length < 20) {
      return NextResponse.json({ error: 'Could not extract meaningful text from this page' }, { status: 404 });
    }

    const truncated = text.slice(0, MAX_TEXT_LENGTH);
    const lang = detectLang(truncated);

    return NextResponse.json({ title, text: truncated, lang });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Extract clean text from HTML, with special handling for Wikipedia and news sites.
 */
function extractText(html: string, hostname: string): string {
  let content = html;

  // Wikipedia: focus on mw-content-text
  if (hostname.includes('wikipedia.org')) {
    const wikiMatch = content.match(/<div[^>]*id="mw-content-text"[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*id="/i);
    if (wikiMatch) content = wikiMatch[1];
    // Remove infobox, sidebar, navbox
    content = content.replace(/<table[^>]*class="[^"]*(?:infobox|sidebar|navbox|wikitable)[^"]*"[^>]*>[\s\S]*?<\/table>/gi, '');
    // Remove references section
    content = content.replace(/<ol[^>]*class="references"[^>]*>[\s\S]*?<\/ol>/gi, '');
  }

  // Try <article> first
  const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) content = articleMatch[1];
  else {
    // Try <main>
    const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) content = mainMatch[1];
  }

  // Remove unwanted tags and their content
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
  content = content.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');
  content = content.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
  content = content.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');
  content = content.replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '');
  // Remove HTML comments
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  // Strip remaining HTML tags
  content = content.replace(/<[^>]+>/g, ' ');

  // Decode entities
  content = decodeHtmlEntities(content);

  // Normalize whitespace
  content = content.replace(/\s+/g, ' ').trim();

  return content;
}

const NAMED_ENTITIES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
  '&nbsp;': ' ', '&ensp;': '\u2002', '&emsp;': '\u2003', '&thinsp;': '\u2009',
  '&mdash;': '—', '&ndash;': '–', '&hellip;': '…',
  '&lsquo;': '\u2018', '&rsquo;': '\u2019', '&ldquo;': '\u201C', '&rdquo;': '\u201D',
  '&bull;': '•', '&middot;': '·', '&copy;': '©', '&reg;': '®', '&trade;': '™',
  '&deg;': '°', '&plusmn;': '±', '&times;': '×', '&divide;': '÷',
  '&laquo;': '«', '&raquo;': '»',
  '&eacute;': 'é', '&egrave;': 'è', '&ecirc;': 'ê', '&euml;': 'ë',
  '&aacute;': 'á', '&agrave;': 'à', '&acirc;': 'â', '&auml;': 'ä',
  '&oacute;': 'ó', '&ograve;': 'ò', '&ocirc;': 'ô', '&ouml;': 'ö',
  '&uacute;': 'ú', '&ugrave;': 'ù', '&ucirc;': 'û', '&uuml;': 'ü',
  '&iacute;': 'í', '&igrave;': 'ì', '&icirc;': 'î', '&iuml;': 'ï',
  '&ntilde;': 'ñ', '&ccedil;': 'ç', '&szlig;': 'ß',
};

function decodeHtmlEntities(text: string): string {
  return text
    // Named entities (case-insensitive lookup)
    .replace(/&[a-zA-Z]+;/g, (entity) => NAMED_ENTITIES[entity.toLowerCase()] ?? entity)
    // Legacy &#39; (not covered by named pattern)
    .replace(/&#39;/g, "'")
    // Decimal numeric entities
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    // Hexadecimal numeric entities
    .replace(/&#x([a-fA-F0-9]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}
