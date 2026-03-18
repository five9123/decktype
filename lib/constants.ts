import type { Lang } from '@/lib/translations';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.typee.app';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'zh', label: '中文',     flag: '🇨🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español',  flag: '🇪🇸' },
  { code: 'ko', label: '한국어',   flag: '🇰🇷' },
  { code: 'ja', label: '日本語',   flag: '🇯🇵' },
];

/** Max upload file size: 20MB */
export const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;

/** Free plan limits */
export const FREE_DECK_LIMIT = 3;
export const FREE_CARDS_PER_DECK = 200;

/** AI daily usage limits */
export const AI_DAILY_LIMIT_FREE = 5;
export const AI_DAILY_LIMIT_PRO = 50;

/** Explore page size */
export const EXPLORE_PAGE_SIZE = 20;

/** Max display name length */
export const MAX_DISPLAY_NAME_LENGTH = 30;

/** Scoring weights */
export const ACCURACY_WEIGHT = 0.7;
export const SPEED_WEIGHT = 0.3;
export const MAX_WPM_FOR_SCORE = 60;

/** Auto-advance delay after correct input (ms) */
export const AUTO_ADVANCE_DELAY = 1800;

/** Language options for the target language selector in deck creation */
export const TARGET_LANGS: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
];

/** Language names localized per UI language (for dropdowns) */
export const LANG_LABELS_LOCALIZED: Record<string, Record<string, string>> = {
  en: { en: 'English', ko: 'Korean', ja: 'Japanese', zh: 'Chinese', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese' },
  ko: { en: '영어', ko: '한국어', ja: '일본어', zh: '중국어', es: '스페인어', fr: '프랑스어', de: '독일어', it: '이탈리아어', pt: '포르투갈어' },
  ja: { en: '英語', ko: '韓国語', ja: '日本語', zh: '中国語', es: 'スペイン語', fr: 'フランス語', de: 'ドイツ語', it: 'イタリア語', pt: 'ポルトガル語' },
  es: { en: 'Inglés', ko: 'Coreano', ja: 'Japonés', zh: 'Chino', es: 'Español', fr: 'Francés', de: 'Alemán', it: 'Italiano', pt: 'Portugués' },
  zh: { en: '英语', ko: '韩语', ja: '日语', zh: '中文', es: '西班牙语', fr: '法语', de: '德语', it: '意大利语', pt: '葡萄牙语' },
  fr: { en: 'Anglais', ko: 'Coréen', ja: 'Japonais', zh: 'Chinois', es: 'Espagnol', fr: 'Français', de: 'Allemand', it: 'Italien', pt: 'Portugais' },
};

/** Language English names (for AI prompts) */
export const LANG_NAMES: Record<string, string> = {
  en: 'English',
  ko: 'Korean',
  ja: 'Japanese',
  zh: 'Chinese',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
};

/** Language BCP-47 codes (for MyMemory API) */
export const LANG_CODES_BCP47: Record<string, string> = {
  ko: 'ko',
  ja: 'ja',
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
};
