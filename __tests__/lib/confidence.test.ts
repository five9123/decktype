import { describe, it, expect } from 'vitest';
import {
  calculateConfidence,
  getMasteryLevel,
  calculateNextReview,
  adjustEaseFactor,
} from '@/lib/confidence';

describe('confidence', () => {
  describe('calculateConfidence', () => {
    it('returns 0 for zero attempts', () => {
      expect(
        calculateConfidence({
          recentAccuracies: [],
          recentWpms: [],
          userAvgWpm: 50,
          attemptCount: 0,
          streak: 0,
        }),
      ).toBe(0);
    });

    it('returns higher score for perfect accuracy', () => {
      const high = calculateConfidence({
        recentAccuracies: [100, 100, 100],
        recentWpms: [50],
        userAvgWpm: 50,
        attemptCount: 3,
        streak: 3,
      });
      const low = calculateConfidence({
        recentAccuracies: [50, 50, 50],
        recentWpms: [50],
        userAvgWpm: 50,
        attemptCount: 3,
        streak: 0,
      });
      expect(high).toBeGreaterThan(low);
    });

    it('caps at 100', () => {
      const score = calculateConfidence({
        recentAccuracies: [100, 100, 100, 100, 100],
        recentWpms: [100, 100, 100],
        userAvgWpm: 50,
        attemptCount: 20,
        streak: 10,
      });
      expect(score).toBeLessThanOrEqual(100);
    });

    it('weighs recent attempts more heavily', () => {
      const recentGood = calculateConfidence({
        recentAccuracies: [100, 50],
        recentWpms: [50],
        userAvgWpm: 50,
        attemptCount: 2,
        streak: 1,
      });
      const recentBad = calculateConfidence({
        recentAccuracies: [50, 100],
        recentWpms: [50],
        userAvgWpm: 50,
        attemptCount: 2,
        streak: 0,
      });
      expect(recentGood).toBeGreaterThan(recentBad);
    });

    it('includes speed component', () => {
      const fast = calculateConfidence({
        recentAccuracies: [80],
        recentWpms: [75],
        userAvgWpm: 50,
        attemptCount: 1,
        streak: 1,
      });
      const slow = calculateConfidence({
        recentAccuracies: [80],
        recentWpms: [10],
        userAvgWpm: 50,
        attemptCount: 1,
        streak: 1,
      });
      expect(fast).toBeGreaterThan(slow);
    });
  });

  describe('getMasteryLevel', () => {
    it('returns learning for low confidence', () => {
      expect(getMasteryLevel(0)).toBe('learning');
      expect(getMasteryLevel(39)).toBe('learning');
    });

    it('returns familiar for medium confidence', () => {
      expect(getMasteryLevel(40)).toBe('familiar');
      expect(getMasteryLevel(74)).toBe('familiar');
    });

    it('returns mastered for high confidence', () => {
      expect(getMasteryLevel(75)).toBe('mastered');
      expect(getMasteryLevel(100)).toBe('mastered');
    });
  });

  describe('calculateNextReview', () => {
    it('returns immediate review for streak 0', () => {
      const now = Date.now();
      const next = calculateNextReview(50, 0);
      expect(next.getTime() - now).toBeLessThan(120_000); // within 2 min
    });

    it('returns ~10 min for streak 1', () => {
      const now = Date.now();
      const next = calculateNextReview(50, 1);
      const diffMinutes = (next.getTime() - now) / 60_000;
      expect(diffMinutes).toBeCloseTo(10, 0);
    });

    it('returns ~1 day for streak 2', () => {
      const now = Date.now();
      const next = calculateNextReview(50, 2);
      const diffHours = (next.getTime() - now) / 3_600_000;
      expect(diffHours).toBeCloseTo(24, 0);
    });

    it('increases interval with higher streak', () => {
      const s3 = calculateNextReview(80, 3);
      const s5 = calculateNextReview(80, 5);
      expect(s5.getTime()).toBeGreaterThan(s3.getTime());
    });
  });

  describe('adjustEaseFactor', () => {
    it('increases ease for high accuracy', () => {
      expect(adjustEaseFactor(2.5, 95)).toBe(2.65);
    });

    it('keeps ease same for medium accuracy', () => {
      expect(adjustEaseFactor(2.5, 85)).toBe(2.5);
    });

    it('decreases ease for low accuracy', () => {
      expect(adjustEaseFactor(2.5, 70)).toBe(2.35);
    });

    it('decreases ease more for very low accuracy', () => {
      expect(adjustEaseFactor(2.5, 50)).toBe(2.2);
    });

    it('never goes below minimum ease (1.3)', () => {
      expect(adjustEaseFactor(1.3, 50)).toBe(1.3);
      expect(adjustEaseFactor(1.4, 50)).toBe(1.3);
    });
  });
});
