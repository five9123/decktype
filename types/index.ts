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
  source_lang: string | null;
  is_public: boolean;
  published_at: string | null;
  like_count: number;
  clone_count: number;
  original_deck_id: string | null;
  created_at: string;
}

// ── Typing Types ──

export type CharStatus = 'idle' | 'correct' | 'incorrect' | 'extra';

export interface CharState {
  char: string;
  status: CharStatus;
}

export type PracticeMode = 'front_to_back' | 'back_to_front' | 'acid_rain' | 'fill_blank' | 'word_train';
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
  display_name: string;
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

// FSRS difficulty rating: 1=Again, 2=Hard, 3=Good, 4=Easy
export type FSRSRating = 1 | 2 | 3 | 4;

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
  // FSRS fields
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  last_rating: FSRSRating | null;
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

// ── Community Gallery Types ──

export interface DeckLike {
  id: string;
  user_id: string;
  deck_id: string;
  created_at: string;
}

// ── XP & Achievement Types ──

export type XPSource =
  | 'session_complete'
  | 'accuracy_bonus'
  | 'streak_bonus'
  | 'mastery_up'
  | 'goal_complete'
  | 'achievement_unlock';

export interface UserXP {
  user_id: string;
  total_xp: number;
  level: number;
  updated_at: string;
}

export interface XPEvent {
  id: string;
  user_id: string;
  amount: number;
  source: XPSource;
  source_id?: string;
  created_at: string;
}

export type AchievementCategory =
  | 'streak'
  | 'sessions'
  | 'mastery'
  | 'speed'
  | 'cards'
  | 'variety';

export interface Achievement {
  id: string;
  category: AchievementCategory;
  icon: string;
  threshold: number;
  xpReward: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

// ── Goal Types ──

export type GoalType = 'sessions' | 'minutes' | 'cards';
export type GoalPeriod = 'daily' | 'weekly';

export interface UserGoal {
  id: string;
  user_id: string;
  goal_type: GoalType;
  target_value: number;
  period: GoalPeriod;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
