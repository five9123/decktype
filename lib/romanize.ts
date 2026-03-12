import type { ScriptLang } from './lang-detect';

/**
 * Rule-based romanization for Korean and Japanese.
 * Chinese and English return empty string.
 */
export function romanize(word: string, lang: ScriptLang): string {
  switch (lang) {
    case 'ko': return romanizeKorean(word);
    case 'ja': return romanizeJapanese(word);
    default: return '';
  }
}

// ─── Korean (Revised Romanization) ─────────────────────────────────────

const INITIALS = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const MEDIALS = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
const FINALS = ['','k','k','k','n','n','n','t','l','l','l','l','l','l','l','l','m','p','p','t','t','ng','t','t','k','t','p','t'];

function romanizeKorean(text: string): string {
  const result: string[] = [];

  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const offset = code - 0xAC00;
      const ini = Math.floor(offset / (21 * 28));
      const med = Math.floor((offset % (21 * 28)) / 28);
      const fin = offset % 28;
      result.push(INITIALS[ini] + MEDIALS[med] + FINALS[fin]);
    } else {
      result.push(ch);
    }
  }

  return result.join('');
}

// ─── Japanese (Hepburn Romanization) ───────────────────────────────────

const HIRAGANA_MAP: Record<string, string> = {
  // Digraphs first (checked before singles)
  'きゃ':'kya','きゅ':'kyu','きょ':'kyo',
  'しゃ':'sha','しゅ':'shu','しょ':'sho',
  'ちゃ':'cha','ちゅ':'chu','ちょ':'cho',
  'にゃ':'nya','にゅ':'nyu','にょ':'nyo',
  'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo',
  'みゃ':'mya','みゅ':'myu','みょ':'myo',
  'りゃ':'rya','りゅ':'ryu','りょ':'ryo',
  'ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
  'じゃ':'ja','じゅ':'ju','じょ':'jo',
  'びゃ':'bya','びゅ':'byu','びょ':'byo',
  'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
  // Singles
  'あ':'a','い':'i','う':'u','え':'e','お':'o',
  'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
  'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
  'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
  'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
  'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
  'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
  'や':'ya','ゆ':'yu','よ':'yo',
  'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
  'わ':'wa','ゐ':'wi','ゑ':'we','を':'wo',
  'ん':'n',
  // Voiced
  'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
  'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
  'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
  'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
  'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
  // Small
  'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o',
  'ゃ':'ya','ゅ':'yu','ょ':'yo',
  'っ':'',  // handled specially (doubles next consonant)
  'ー':'-',
};

function romanizeJapanese(text: string): string {
  // Convert katakana to hiragana first (offset: 0x60)
  const hiragana = text.replace(/[\u30A1-\u30F6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );

  const result: string[] = [];
  let i = 0;

  while (i < hiragana.length) {
    const ch = hiragana[i];

    // Small tsu (っ) — double the next consonant
    if (ch === 'っ') {
      const nextRoman = lookupHiragana(hiragana, i + 1);
      if (nextRoman && nextRoman.roman.length > 0) {
        result.push(nextRoman.roman[0]); // double consonant
      }
      i++;
      continue;
    }

    // Try digraph (2 chars)
    const digraph = lookupHiragana(hiragana, i, 2);
    if (digraph && digraph.len === 2) {
      result.push(digraph.roman);
      i += 2;
      continue;
    }

    // Try single
    const single = HIRAGANA_MAP[ch];
    if (single !== undefined) {
      result.push(single);
      i++;
      continue;
    }

    // Kanji or other — pass through
    result.push(ch);
    i++;
  }

  return result.join('');
}

function lookupHiragana(text: string, idx: number, len?: number): { roman: string; len: number } | null {
  if (len === 2 && idx + 1 < text.length) {
    const pair = text[idx] + text[idx + 1];
    const roman = HIRAGANA_MAP[pair];
    if (roman !== undefined) return { roman, len: 2 };
  }
  if (!len || len === 1) {
    const roman = HIRAGANA_MAP[text[idx]];
    if (roman !== undefined) return { roman, len: 1 };
  }
  return null;
}
