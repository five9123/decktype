import { describe, it, expect } from 'vitest';
import {
  parseSRT,
  parseLyrics,
  parseRawText,
  detectAndParse,
} from '@/lib/media-parser';

describe('media-parser', () => {
  describe('parseSRT', () => {
    it('parses standard SRT content', () => {
      const srt = `1
00:00:01,000 --> 00:00:04,000
Hello world

2
00:00:05,000 --> 00:00:08,000
This is a test`;

      const result = parseSRT(srt);
      expect(result.type).toBe('srt');
      expect(result.lines).toHaveLength(2);
      expect(result.lines[0].text).toBe('Hello world');
      expect(result.lines[0].startMs).toBe(1000);
      expect(result.lines[0].endMs).toBe(4000);
      expect(result.lines[1].text).toBe('This is a test');
    });

    it('strips HTML tags from subtitles', () => {
      const srt = `1
00:00:01,000 --> 00:00:04,000
<b>Bold text</b> and <i>italic</i>`;

      const result = parseSRT(srt);
      expect(result.lines[0].text).toBe('Bold text and italic');
    });

    it('handles BOM marker', () => {
      const srt = `\uFEFF1
00:00:01,000 --> 00:00:04,000
BOM test`;

      const result = parseSRT(srt);
      expect(result.lines[0].text).toBe('BOM test');
    });

    it('deduplicates identical adjacent lines', () => {
      const srt = `1
00:00:01,000 --> 00:00:02,000
Repeated line

2
00:00:02,000 --> 00:00:03,000
Repeated line`;

      const result = parseSRT(srt);
      expect(result.lines).toHaveLength(1);
    });

    it('handles Windows line endings (CRLF)', () => {
      const srt = "1\r\n00:00:01,000 --> 00:00:04,000\r\nCRLF test\r\n";
      const result = parseSRT(srt);
      expect(result.lines[0].text).toBe('CRLF test');
    });

    it('parses timestamps with period separator', () => {
      const srt = `1
00:00:01.500 --> 00:00:04.200
Dot separator`;

      const result = parseSRT(srt);
      expect(result.lines[0].startMs).toBe(1500);
      expect(result.lines[0].endMs).toBe(4200);
    });

    it('joins multi-line subtitle text', () => {
      const srt = `1
00:00:01,000 --> 00:00:04,000
First line
Second line`;

      const result = parseSRT(srt);
      expect(result.lines[0].text).toBe('First line Second line');
    });

    it('returns empty for invalid content', () => {
      const result = parseSRT('just some random text');
      expect(result.lines).toHaveLength(0);
    });

    it('generates fullText from all lines', () => {
      const srt = `1
00:00:01,000 --> 00:00:02,000
Line one

2
00:00:03,000 --> 00:00:04,000
Line two`;

      const result = parseSRT(srt);
      expect(result.fullText).toBe('Line one\nLine two');
    });
  });

  describe('parseLyrics', () => {
    it('parses plain lyrics', () => {
      const lyrics = `Hello darkness my old friend
I've come to talk with you again`;

      const result = parseLyrics(lyrics);
      expect(result.type).toBe('lyrics');
      expect(result.lines).toHaveLength(2);
    });

    it('strips LRC timestamps', () => {
      const lrc = `[00:15.30] First line
[00:20.50] Second line`;

      const result = parseLyrics(lrc);
      expect(result.lines[0].text).toBe('First line');
      expect(result.lines[1].text).toBe('Second line');
    });

    it('removes section markers', () => {
      const lyrics = `[Verse 1]
First verse line
[Chorus]
Chorus line
[Bridge]
Bridge line`;

      const result = parseLyrics(lyrics);
      expect(result.lines.map((l) => l.text)).toEqual([
        'First verse line',
        'Chorus line',
        'Bridge line',
      ]);
    });

    it('skips empty lines', () => {
      const lyrics = `Line one

Line two

Line three`;

      const result = parseLyrics(lyrics);
      expect(result.lines).toHaveLength(3);
    });

    it('handles HTML entities', () => {
      const lyrics = `Rock &amp; Roll
"Quotes" &amp; more`;

      const result = parseLyrics(lyrics);
      expect(result.lines[0].text).toBe('Rock & Roll');
    });
  });

  describe('parseRawText', () => {
    it('parses plain text into lines', () => {
      const text = `Line one
Line two
Line three`;

      const result = parseRawText(text);
      expect(result.type).toBe('text');
      expect(result.lines).toHaveLength(3);
    });

    it('skips blank lines', () => {
      const text = `Line one

Line two`;

      const result = parseRawText(text);
      expect(result.lines).toHaveLength(2);
    });

    it('normalizes whitespace', () => {
      const text = `  extra   spaces  `;
      const result = parseRawText(text);
      expect(result.lines[0].text).toBe('extra spaces');
    });
  });

  describe('detectAndParse', () => {
    it('detects SRT by filename extension', () => {
      const result = detectAndParse('anything', 'movie.srt');
      expect(result.type).toBe('srt');
    });

    it('detects LRC by filename extension', () => {
      const result = detectAndParse('[00:15.30] test', 'song.lrc');
      expect(result.type).toBe('lyrics');
    });

    it('auto-detects SRT by timestamp pattern', () => {
      const srt = `1
00:00:01,000 --> 00:00:04,000
Auto detected`;

      const result = detectAndParse(srt);
      expect(result.type).toBe('srt');
    });

    it('auto-detects LRC by timestamp pattern', () => {
      const lrc = `[00:15.30] Auto detected LRC`;
      const result = detectAndParse(lrc);
      expect(result.type).toBe('lyrics');
    });

    it('auto-detects lyrics by section markers', () => {
      const lyrics = `[Verse 1]
First line`;
      const result = detectAndParse(lyrics);
      expect(result.type).toBe('lyrics');
    });

    it('falls back to raw text', () => {
      const result = detectAndParse('Just plain text');
      expect(result.type).toBe('text');
    });
  });
});
