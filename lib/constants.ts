import type { Lang } from '@/lib/translations';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://decktype.vercel.app';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'ko', label: '한국어',   flag: '🇰🇷' },
  { code: 'ja', label: '日本語',   flag: '🇯🇵' },
  { code: 'es', label: 'Español',  flag: '🇪🇸' },
];

/** Max upload file size: 20MB */
export const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;

/** Free plan limits */
export const FREE_DECK_LIMIT = 3;
export const FREE_CARDS_PER_DECK = 200;

/** Scoring weights */
export const ACCURACY_WEIGHT = 0.7;
export const SPEED_WEIGHT = 0.3;
export const MAX_WPM_FOR_SCORE = 60;

/** Auto-advance delay after correct input (ms) */
export const AUTO_ADVANCE_DELAY = 1800;
