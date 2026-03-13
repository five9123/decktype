// ── Card & Deck Types ──

export interface Card {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  pronunciation: string;
  extra: string;
  note_type: NoteType;
  sort_order: number;
}

export type NoteType = 'Basic' | 'Cloze' | 'Custom';

export interface Deck {
  id: string;
  user_id: string;
  name: string;
  description: string;
  card_count: number;
  note_type: string;
  tags: string[];
  created_at: string;
}

// ── Typing Types ──

export type CharStatus = 'idle' | 'correct' | 'incorrect' | 'extra';

export interface CharState {
  char: string;
  status: CharStatus;
}

export type PracticeMode = 'front_to_back' | 'back_to_front' | 'acid_rain' | 'fill_blank';
export type CardOrder = 'sequential' | 'random' | 'difficult_first' | 'smart_review';

// ── Session & Stats Types ──

export interface TypingSession {
  id: string;
  user_id: string;
  deck_id: string;
  wpm: number;
  accuracy: number;
  composite_score: number;
  card_count: number;
  duration_ms: number;
  mode: PracticeMode;
  created_at: string;
}

export interface CardResult {
  id: string;
  session_id: string;
  card_id: string;
  wpm: number;
  accuracy: number;
  time_ms: number;
  typed_text: string;
  target_text: string;
}

// ── APKG Parser Types ──

export interface ParsedCard {
  front: string;
  back: string;
  pronunciation: string;
  extra: string;
  noteType: NoteType;
  rawFields: string[];
}

export interface ParsedDeck {
  name: string;
  cards: ParsedCard[];
  fieldNames: string[];
  noteType: string;
}

// ── User Types ──

export type Plan = 'free' | 'pro';

export interface Profile {
  id: string;
  email: string;
  plan: Plan;
  created_at: string;
}

// ── Theme & Preferences Types ──

export type { ThemeId, FontSize } from '@/lib/themes';

export interface TypingPreferences {
  theme: import('@/lib/themes').ThemeId;
  fontSize: import('@/lib/themes').FontSize;
  soundEnabled: boolean;
  soundType: 'mechanical' | 'soft' | 'typewriter';
}

// ── Mastery Types (Feature 1) ──

export type MasteryLevel = 'learning' | 'familiar' | 'mastered';

export interface CardMastery {
  id: string;
  user_id: string;
  card_id: string;
  confidence: number;
  mastery_level: MasteryLevel;
  attempt_count: number;
  total_correct: number;
  avg_wpm: number;
  avg_accuracy: number;
  last_wpm: number;
  last_accuracy: number;
  streak: number;
  error_count: number;
  next_review_at: string;
  last_practiced_at: string;
  ease_factor: number;
}

// ── Progress Types (Feature 3) ──

export interface PersonalBest {
  id: string;
  user_id: string;
  deck_id: string;
  mode: PracticeMode;
  best_wpm: number;
  best_accuracy: number;
  best_composite: number;
  updated_at: string;
}

export interface DailyActivity {
  date: string;
  sessionCount: number;
  totalDurationMs: number;
}

export interface PracticeStreak {
  current: number;
  longest: number;
  todayDone: boolean;
}

export interface CardStats {
  card_id: string;
  front: string;
  back: string;
  avgWpm: number;
  avgAccuracy: number;
  attemptCount: number;
  masteryLevel: MasteryLevel;
  confidence: number;
}
