import { cleanCardText } from './card-cleaner';

export type FieldRole = 'front' | 'back' | 'pronunciation' | 'skip';
export type FieldMapping = Record<number, FieldRole>;

/**
 * Detect the most likely role for each field based on its name.
 */
function detectRole(fieldName: string, index: number): FieldRole {
  const name = fieldName.toLowerCase().trim();

  // ── SKIP: media, metadata, ancillary info ──
  if (/(audio|sound|mp3|wav|ogg|image|img|picture|photo|video|media)/.test(name)) return 'skip';
  if (/^(number|num|#|no\.|order|rank|frequency|freq|sort|id|uuid)$/.test(name)) return 'skip';
  if (/(jlpt|jouyou|grade|stroke|radical|component|classif|keyword|story|koohii|nanori|traditional|simplified|frequency|example|sentence|context|extra|hint|detail|notes?)$/.test(name)) return 'skip';

  // ── PRONUNCIATION: readings, romanization ──
  if (/(reading|read|pronunci|onyomi|kunyomi|furigana|hiragana|katakana|pinyin|romaji|romanization|romanji|phonetic|kana|yomi)/.test(name)) return 'pronunciation';

  // ── BACK: meaning / translation ──
  if (/(english|meaning|definition|translation|gloss|equiv|answer)/.test(name)) return 'back';

  // ── FRONT: the target-language word ──
  if (/(kanji|korean|japanese|chinese|hanzi|vocab|word|term|expression|character|漢字|한국어|日本語)/.test(name)) return 'front';

  // Generic positional names
  if (name === 'front') return 'front';
  if (name === 'back') return 'back';

  // ── Positional fallback ──
  if (index === 0) return 'front';
  if (index === 1) return 'back';
  if (index === 2) return 'pronunciation';
  return 'skip';
}

/**
 * Auto-detect an initial field mapping from a list of field names.
 * Ensures at most one 'front' and one 'back' are assigned (first match wins).
 */
export function detectFieldMapping(fieldNames: string[]): FieldMapping {
  const mapping: FieldMapping = {};
  let hasFront = false;
  let hasBack = false;

  for (let i = 0; i < fieldNames.length; i++) {
    const role = detectRole(fieldNames[i], i);

    if (role === 'front') {
      mapping[i] = hasFront ? 'skip' : 'front';
      hasFront = true;
    } else if (role === 'back') {
      mapping[i] = hasBack ? 'skip' : 'back';
      hasBack = true;
    } else {
      mapping[i] = role;
    }
  }

  // Guarantee at least a front and back
  if (!hasFront && fieldNames.length > 0) mapping[0] = 'front';
  if (!hasBack && fieldNames.length > 1) {
    for (let i = 1; i < fieldNames.length; i++) {
      if (mapping[i] !== 'front' && mapping[i] !== 'pronunciation') {
        mapping[i] = 'back';
        break;
      }
    }
  }

  return mapping;
}

/**
 * Apply a field mapping to a card's rawFields, returning front/back/pronunciation.
 * Multiple pronunciation fields are joined with ' • '.
 */
export function applyMapping(
  rawFields: string[],
  mapping: FieldMapping,
): { front: string; back: string; pronunciation: string } {
  let front = '';
  let back = '';
  const pronunciations: string[] = [];

  for (const [idxStr, role] of Object.entries(mapping)) {
    const idx = Number(idxStr);
    const val = cleanCardText(rawFields[idx] ?? '');
    if (!val) continue;
    if (role === 'front' && !front) front = val;
    else if (role === 'back' && !back) back = val;
    else if (role === 'pronunciation') pronunciations.push(val);
  }

  return { front, back, pronunciation: pronunciations.join(' • ') };
}
