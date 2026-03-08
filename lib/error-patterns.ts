// ── Error Pattern Analysis ──

interface ErrorPair {
  expected: string;
  actual: string;
  count: number;
}

/**
 * Segment a string into grapheme clusters for multi-language support.
 */
function segmentGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return [...segmenter.segment(text)].map((s) => s.segment);
  }
  return [...text];
}

/**
 * Analyze typing errors across multiple card results.
 * Returns the top N most frequent substitution patterns.
 */
export function analyzeErrorPatterns(
  results: { typed_text: string; target_text: string }[],
  topN: number = 5,
): ErrorPair[] {
  const pairCounts = new Map<string, { expected: string; actual: string; count: number }>();

  for (const { typed_text, target_text } of results) {
    if (!typed_text || !target_text) continue;

    const typed = segmentGraphemes(typed_text.normalize('NFC'));
    const target = segmentGraphemes(target_text.normalize('NFC'));
    const len = Math.min(typed.length, target.length);

    for (let i = 0; i < len; i++) {
      const t = target[i];
      const u = typed[i];
      // Skip spaces and matching characters
      if (t === ' ' || u === ' ' || t === u) continue;

      const key = `${t}→${u}`;
      const existing = pairCounts.get(key);
      if (existing) {
        existing.count++;
      } else {
        pairCounts.set(key, { expected: t, actual: u, count: 1 });
      }
    }
  }

  return [...pairCounts.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}
