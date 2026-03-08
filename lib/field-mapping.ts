import { cleanCardText } from './card-cleaner';

export type FieldRole = 'front' | 'back' | 'pronunciation' | 'skip';
export type FieldMapping = Record<number, FieldRole>;

/**
 * Detect the most likely role for each field based on its name.
 */
function detectRole(fieldName: string, index: number): FieldRole {
  const name = fieldName.toLowerCase().trim();

  // ── SKIP: media, metadata, grammar info ──
  if (/(audio|sound|mp3|wav|ogg|image|img|picture|photo|video|media)/.test(name)) return 'skip';
  if (/^(number|num|#|no\.|order|rank|frequency|freq|sort|id|uuid)$/.test(name)) return 'skip';
  // Japanese/Chinese metadata
  if (/(jlpt|jouyou|grade|stroke|radical|component|classif|keyword|story|koohii|nanori|traditional|simplified)/.test(name)) return 'skip';
  // Grammar / ancillary
  if (/(gender|genre|g[eé]nero|genere|geschlecht)/.test(name)) return 'skip';
  if (/(article|plural|pluriel|plurale|conjugat|infinitiv|declension)/.test(name)) return 'skip';
  // Examples / extra context
  if (/(example|exemple|ejemplo|esempio|exemplo|sentence|frase|satz|context|extra|hint|detail|notes?|notas?|anmerkung)/.test(name)) return 'skip';
  // Standalone frequency / tags
  if (/^(frequency|freq|tags?|source|chapter|lesson|unit|level)$/.test(name)) return 'skip';

  // ── PRONUNCIATION: IPA, romanization, readings ──
  if (/\bipa\b/.test(name)) return 'pronunciation';   // IPA (International Phonetic Alphabet)
  if (/(pronunci|prononc|pronúncia|aussprache|pronuncia)/.test(name)) return 'pronunciation';
  if (/(transcription|phonetic|phonétique|fon[eé]tica)/.test(name)) return 'pronunciation';
  if (/(reading|onyomi|kunyomi|furigana|hiragana|katakana|kana|yomi)/.test(name)) return 'pronunciation';
  if (/(pinyin|romaji|romanization|romanji)/.test(name)) return 'pronunciation';

  // ── BACK: meaning / translation (any language) ──
  if (/(english|meaning|definition|translation|gloss|equiv|answer)/.test(name)) return 'back';
  // Romance languages: translation
  if (/(traduction|traducción|traduccion|tradução|traducao|traduzione)/.test(name)) return 'back';
  // Romance/Germanic: meaning
  if (/(significado|signification|significato|bedeutung|übersetzung|ubersetzung)/.test(name)) return 'back';
  if (/\b(sens|native|l1)\b/.test(name)) return 'back';

  // ── FRONT: the target-language word ──
  // CJK / East Asian
  if (/(kanji|korean|japanese|chinese|hanzi|漢字|한국어|日本語)/.test(name)) return 'front';
  // European languages by name
  if (/(french|français|francais|spanish|español|espanol)/.test(name)) return 'front';
  if (/(portuguese|português|portugues|italian|italiano)/.test(name)) return 'front';
  if (/(german|deutsch|dutch|nederlands|russian|arabic)/.test(name)) return 'front';
  // Generic "word" in major languages
  if (/\b(word|term|expression|character|vocab|lemma|target|l2)\b/.test(name)) return 'front';
  if (/\b(mot|palabra|palavra|parola|wort|woord)\b/.test(name)) return 'front';
  if (/(vocabulaire|vocabulario|vocabulário|vocabolario)/.test(name)) return 'front';

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
