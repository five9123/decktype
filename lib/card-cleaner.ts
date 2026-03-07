/**
 * Card text cleaning utilities for Anki card content.
 * Handles HTML stripping, cloze deletion parsing, and media tag removal.
 */

/** Remove [sound:filename.mp3] tags */
function removeSoundTags(text: string): string {
  return text.replace(/\[sound:[^\]]*\]/g, '');
}

/** Remove <img ...> tags */
function removeImageTags(text: string): string {
  return text.replace(/<img[^>]*>/gi, '');
}

/** Strip all HTML tags and decode entities */
function stripHtml(html: string): string {
  // Use DOMParser if available (browser), otherwise regex fallback
  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent ?? '';
  }
  // Regex fallback for SSR
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(div|p|li|tr|td|th|blockquote|h[1-6])[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

/**
 * Clean card text: remove media tags, strip HTML, normalize whitespace.
 */
export function cleanCardText(html: string): string {
  let text = html;
  text = removeSoundTags(text);
  text = removeImageTags(text);
  text = stripHtml(text);
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

/**
 * Parse cloze deletions from Anki format.
 * Input: "The capital of {{c1::France::hint}} is {{c2::Paris}}"
 * Returns individual cloze cards.
 */
export function parseClozeCards(text: string): { display: string; answer: string }[] {
  // Find all cloze patterns: {{c<num>::<answer>::<optional hint>}}
  const clozePattern = /\{\{c(\d+)::([^}:]+)(?:::([^}]*))?\}\}/g;
  const matches = [...text.matchAll(clozePattern)];

  if (matches.length === 0) return [];

  // Get unique cloze numbers
  const clozeNums = [...new Set(matches.map((m) => m[1]))];

  return clozeNums.map((num) => {
    let display = text;
    let answer = '';

    // Replace the target cloze with blank, keep others revealed
    display = display.replace(clozePattern, (_, cNum, cAnswer, cHint) => {
      if (cNum === num) {
        answer = cAnswer.trim();
        return cHint ? `[${cHint}]` : '[...]';
      }
      return cAnswer.trim();
    });

    return { display: cleanCardText(display), answer };
  });
}

/**
 * Detect if text contains cloze deletions.
 */
export function isCloze(text: string): boolean {
  return /\{\{c\d+::/.test(text);
}
