/**
 * SRT subtitle, lyrics, and plain text parsers.
 * Extracts clean lines from media files for LLM processing.
 */

export interface ParsedLine {
  index: number;
  startMs?: number;
  endMs?: number;
  text: string;
}

export interface ParsedMedia {
  type: 'srt' | 'lyrics' | 'text';
  lines: ParsedLine[];
  fullText: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────

/** Strip BOM marker from file start */
function stripBOM(s: string): string {
  return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s;
}

/** Strip HTML tags (simplified, reuses card-cleaner pattern) */
function stripHtml(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/** Parse SRT timestamp "HH:MM:SS,mmm" → milliseconds */
function parseTimestamp(ts: string): number {
  const m = ts.trim().match(/^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})$/);
  if (!m) return 0;
  return (
    parseInt(m[1], 10) * 3600000 +
    parseInt(m[2], 10) * 60000 +
    parseInt(m[3], 10) * 1000 +
    parseInt(m[4], 10)
  );
}

/** Normalize whitespace and collapse multiple spaces */
function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

// ── SRT Parser ───────────────────────────────────────────────────────────

export function parseSRT(content: string): ParsedMedia {
  const cleaned = stripBOM(content).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const blocks = cleaned.split(/\n\n+/).filter(Boolean);
  const lines: ParsedLine[] = [];
  const seen = new Set<string>();

  for (const block of blocks) {
    const parts = block.trim().split('\n');
    if (parts.length < 2) continue;

    // Find the timestamp line (second line typically, but be flexible)
    let tsLineIdx = -1;
    for (let i = 0; i < Math.min(parts.length, 3); i++) {
      if (/-->/.test(parts[i])) {
        tsLineIdx = i;
        break;
      }
    }
    if (tsLineIdx < 0) continue;

    // Parse timestamps
    const tsMatch = parts[tsLineIdx].match(
      /(\d{1,2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{1,2}:\d{2}:\d{2}[,.]\d{3})/
    );
    if (!tsMatch) continue;

    const startMs = parseTimestamp(tsMatch[1]);
    const endMs = parseTimestamp(tsMatch[2]);

    // Text = all lines after the timestamp line
    const rawText = parts
      .slice(tsLineIdx + 1)
      .join(' ');
    const text = normalize(stripHtml(rawText));

    if (!text) continue;
    // Deduplicate adjacent identical lines
    if (seen.has(text)) continue;
    seen.add(text);

    lines.push({
      index: lines.length,
      startMs,
      endMs,
      text,
    });
  }

  return {
    type: 'srt',
    lines,
    fullText: lines.map((l) => l.text).join('\n'),
  };
}

// ── Lyrics Parser ────────────────────────────────────────────────────────

/** Section markers to exclude from text content */
const SECTION_MARKER = /^\[(?:chorus|verse|bridge|intro|outro|hook|pre-chorus|interlude|refrain|repeat).*\]$/i;

/** LRC timestamp format: [mm:ss.xx] or [mm:ss:xx] */
const LRC_TIMESTAMP = /^\[(\d{1,2}):(\d{2})[.:]\d{2,3}\]\s*/;

export function parseLyrics(content: string): ParsedMedia {
  const cleaned = stripBOM(content).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rawLines = cleaned.split('\n');
  const lines: ParsedLine[] = [];

  for (const raw of rawLines) {
    let line = raw.trim();
    if (!line) continue;

    // Skip section markers
    if (SECTION_MARKER.test(line)) continue;

    // Strip LRC timestamps if present
    const lrcMatch = line.match(LRC_TIMESTAMP);
    if (lrcMatch) {
      line = line.replace(LRC_TIMESTAMP, '');
    }

    const text = normalize(stripHtml(line));
    if (!text) continue;

    lines.push({
      index: lines.length,
      text,
    });
  }

  return {
    type: 'lyrics',
    lines,
    fullText: lines.map((l) => l.text).join('\n'),
  };
}

// ── Plain Text Parser ────────────────────────────────────────────────────

export function parseRawText(content: string): ParsedMedia {
  const cleaned = stripBOM(content).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rawLines = cleaned.split('\n');
  const lines: ParsedLine[] = [];

  for (const raw of rawLines) {
    const text = normalize(raw);
    if (!text) continue;

    lines.push({
      index: lines.length,
      text,
    });
  }

  return {
    type: 'text',
    lines,
    fullText: lines.map((l) => l.text).join('\n'),
  };
}

// ── Auto-detect and parse ────────────────────────────────────────────────

export function detectAndParse(content: string, filename?: string): ParsedMedia {
  const ext = filename?.split('.').pop()?.toLowerCase();

  if (ext === 'srt') return parseSRT(content);
  if (ext === 'lrc') return parseLyrics(content);

  // Auto-detect SRT by looking for timestamp pattern
  if (/\d{1,2}:\d{2}:\d{2}[,.]\d{3}\s*-->/.test(content)) {
    return parseSRT(content);
  }

  // Auto-detect LRC
  if (LRC_TIMESTAMP.test(content)) {
    return parseLyrics(content);
  }

  // Check for section markers common in lyrics
  if (SECTION_MARKER.test(content.split('\n')[0] ?? '')) {
    return parseLyrics(content);
  }

  return parseRawText(content);
}
