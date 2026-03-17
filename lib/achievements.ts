// ── Achievement Definitions & XP Logic ──

import type { Achievement } from '@/types';

export const ACHIEVEMENTS: Achievement[] = [
  // Streak milestones
  { id: 'streak_3',     category: 'streak',   icon: '🔥', threshold: 3,    xpReward: 50 },
  { id: 'streak_7',     category: 'streak',   icon: '🔥', threshold: 7,    xpReward: 100 },
  { id: 'streak_30',    category: 'streak',   icon: '🔥', threshold: 30,   xpReward: 300 },
  { id: 'streak_100',   category: 'streak',   icon: '🔥', threshold: 100,  xpReward: 500 },

  // Session count
  { id: 'sessions_10',  category: 'sessions', icon: '📝', threshold: 10,   xpReward: 50 },
  { id: 'sessions_50',  category: 'sessions', icon: '📝', threshold: 50,   xpReward: 150 },
  { id: 'sessions_100', category: 'sessions', icon: '📝', threshold: 100,  xpReward: 300 },
  { id: 'sessions_500', category: 'sessions', icon: '📝', threshold: 500,  xpReward: 500 },

  // Mastery (total mastered cards)
  { id: 'mastery_10',   category: 'mastery',  icon: '⭐', threshold: 10,   xpReward: 100 },
  { id: 'mastery_50',   category: 'mastery',  icon: '⭐', threshold: 50,   xpReward: 200 },
  { id: 'mastery_100',  category: 'mastery',  icon: '⭐', threshold: 100,  xpReward: 400 },

  // Speed records (WPM)
  { id: 'wpm_40',       category: 'speed',    icon: '⚡', threshold: 40,   xpReward: 50 },
  { id: 'wpm_60',       category: 'speed',    icon: '⚡', threshold: 60,   xpReward: 150 },
  { id: 'wpm_80',       category: 'speed',    icon: '⚡', threshold: 80,   xpReward: 300 },

  // Cards practiced total
  { id: 'cards_100',    category: 'cards',    icon: '🃏', threshold: 100,  xpReward: 50 },
  { id: 'cards_500',    category: 'cards',    icon: '🃏', threshold: 500,  xpReward: 200 },
  { id: 'cards_1000',   category: 'cards',    icon: '🃏', threshold: 1000, xpReward: 400 },

  // Variety (practice modes used)
  { id: 'variety_3',    category: 'variety',  icon: '🎮', threshold: 3,    xpReward: 100 },
  { id: 'variety_5',    category: 'variety',  icon: '🎮', threshold: 5,    xpReward: 200 },
];

/** XP awarded per source */
export const XP_SOURCES = {
  session_complete: 10,
  card_practiced: 2,
  accuracy_bonus_90: 5,
  accuracy_bonus_95: 10,
  streak_day_bonus: 5,      // per day of current streak (capped at 50)
  streak_day_max: 50,
  mastery_level_up: 15,
  goal_complete: 25,
} as const;

/**
 * Compute level from total XP.
 * L1=0, L2=50, L3=200, L4=450, L5=800, L10=4050, L20=18050
 */
export function xpToLevel(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(1 + Math.sqrt(xp / 50));
}

/** XP threshold to reach a given level. */
export function levelToXP(level: number): number {
  return Math.pow(level - 1, 2) * 50;
}

/** Progress info toward next level. */
export function xpToNextLevel(xp: number): {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progress: number;
} {
  const currentLevel = xpToLevel(xp);
  const currentLevelXP = levelToXP(currentLevel);
  const nextLevelXP = levelToXP(currentLevel + 1);
  const range = nextLevelXP - currentLevelXP;
  const progress = range > 0 ? (xp - currentLevelXP) / range : 0;
  return { currentLevel, currentLevelXP, nextLevelXP, progress };
}

/**
 * Calculate total XP for a completed session.
 */
export function calculateSessionXP(params: {
  cardCount: number;
  accuracy: number;
  currentStreak: number;
  levelUpCount: number;
}): number {
  const { cardCount, accuracy, currentStreak, levelUpCount } = params;

  let xp = XP_SOURCES.session_complete;
  xp += cardCount * XP_SOURCES.card_practiced;

  // Accuracy bonus
  if (accuracy >= 95) xp += XP_SOURCES.accuracy_bonus_95;
  else if (accuracy >= 90) xp += XP_SOURCES.accuracy_bonus_90;

  // Streak bonus
  xp += Math.min(currentStreak * XP_SOURCES.streak_day_bonus, XP_SOURCES.streak_day_max);

  // Mastery level-up bonus
  xp += levelUpCount * XP_SOURCES.mastery_level_up;

  return xp;
}
