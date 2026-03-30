import { describe, it, expect } from 'vitest';
import {
  ACHIEVEMENTS,
  XP_SOURCES,
  xpToLevel,
  levelToXP,
  xpToNextLevel,
  calculateSessionXP,
} from '@/lib/achievements';

describe('achievements', () => {
  describe('ACHIEVEMENTS', () => {
    it('has 19 achievements', () => {
      expect(ACHIEVEMENTS).toHaveLength(19);
    });

    it('all have required fields', () => {
      for (const a of ACHIEVEMENTS) {
        expect(a.id).toBeTruthy();
        expect(a.category).toBeTruthy();
        expect(a.icon).toBeTruthy();
        expect(a.threshold).toBeGreaterThan(0);
        expect(a.xpReward).toBeGreaterThan(0);
      }
    });

    it('has unique ids', () => {
      const ids = ACHIEVEMENTS.map((a) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('xpToLevel', () => {
    it('returns level 1 for 0 XP', () => {
      expect(xpToLevel(0)).toBe(1);
    });

    it('returns level 1 for negative XP', () => {
      expect(xpToLevel(-10)).toBe(1);
    });

    it('returns level 2 for 50 XP', () => {
      expect(xpToLevel(50)).toBe(2);
    });

    it('returns level 3 for 200 XP', () => {
      expect(xpToLevel(200)).toBe(3);
    });

    it('increases monotonically', () => {
      let prevLevel = 0;
      for (let xp = 0; xp <= 10000; xp += 100) {
        const level = xpToLevel(xp);
        expect(level).toBeGreaterThanOrEqual(prevLevel);
        prevLevel = level;
      }
    });
  });

  describe('levelToXP', () => {
    it('returns 0 for level 1', () => {
      expect(levelToXP(1)).toBe(0);
    });

    it('returns 50 for level 2', () => {
      expect(levelToXP(2)).toBe(50);
    });

    it('returns 200 for level 3', () => {
      expect(levelToXP(3)).toBe(200);
    });

    it('is inverse of xpToLevel at level boundaries', () => {
      for (let level = 1; level <= 20; level++) {
        const xp = levelToXP(level);
        expect(xpToLevel(xp)).toBe(level);
      }
    });
  });

  describe('xpToNextLevel', () => {
    it('returns correct progress info', () => {
      const info = xpToNextLevel(100);
      expect(info.currentLevel).toBe(xpToLevel(100));
      expect(info.progress).toBeGreaterThanOrEqual(0);
      expect(info.progress).toBeLessThanOrEqual(1);
      expect(info.nextLevelXP).toBeGreaterThan(info.currentLevelXP);
    });

    it('returns 0 progress at level boundary', () => {
      const info = xpToNextLevel(50); // exactly level 2
      expect(info.currentLevel).toBe(2);
      expect(info.progress).toBe(0);
    });
  });

  describe('calculateSessionXP', () => {
    it('awards base XP for session completion', () => {
      const xp = calculateSessionXP({
        cardCount: 0,
        accuracy: 0,
        currentStreak: 0,
        levelUpCount: 0,
      });
      expect(xp).toBe(XP_SOURCES.session_complete);
    });

    it('awards per-card XP', () => {
      const xp = calculateSessionXP({
        cardCount: 10,
        accuracy: 0,
        currentStreak: 0,
        levelUpCount: 0,
      });
      expect(xp).toBe(XP_SOURCES.session_complete + 10 * XP_SOURCES.card_practiced);
    });

    it('awards accuracy bonus at 90%', () => {
      const xp90 = calculateSessionXP({
        cardCount: 0,
        accuracy: 90,
        currentStreak: 0,
        levelUpCount: 0,
      });
      expect(xp90).toBe(XP_SOURCES.session_complete + XP_SOURCES.accuracy_bonus_90);
    });

    it('awards higher accuracy bonus at 95%', () => {
      const xp95 = calculateSessionXP({
        cardCount: 0,
        accuracy: 95,
        currentStreak: 0,
        levelUpCount: 0,
      });
      expect(xp95).toBe(XP_SOURCES.session_complete + XP_SOURCES.accuracy_bonus_95);
    });

    it('caps streak bonus', () => {
      const xpHigh = calculateSessionXP({
        cardCount: 0,
        accuracy: 0,
        currentStreak: 100,
        levelUpCount: 0,
      });
      const xpMax = calculateSessionXP({
        cardCount: 0,
        accuracy: 0,
        currentStreak: 10,
        levelUpCount: 0,
      });
      expect(xpHigh).toBe(xpMax); // Both capped at streak_day_max
    });

    it('awards mastery level-up bonus', () => {
      const xp = calculateSessionXP({
        cardCount: 0,
        accuracy: 0,
        currentStreak: 0,
        levelUpCount: 3,
      });
      expect(xp).toBe(XP_SOURCES.session_complete + 3 * XP_SOURCES.mastery_level_up);
    });

    it('combines all bonuses', () => {
      const xp = calculateSessionXP({
        cardCount: 5,
        accuracy: 95,
        currentStreak: 3,
        levelUpCount: 1,
      });
      const expected =
        XP_SOURCES.session_complete +
        5 * XP_SOURCES.card_practiced +
        XP_SOURCES.accuracy_bonus_95 +
        3 * XP_SOURCES.streak_day_bonus +
        1 * XP_SOURCES.mastery_level_up;
      expect(xp).toBe(expected);
    });
  });
});
