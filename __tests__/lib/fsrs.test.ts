import { describe, it, expect } from 'vitest';
import { initState, retrievability, schedule, autoRate, type FSRSState } from '@/lib/fsrs';

describe('fsrs', () => {
  describe('initState', () => {
    it('returns default initial state', () => {
      const state = initState();
      expect(state).toEqual({
        stability: 0,
        difficulty: 5.0,
        reps: 0,
        lapses: 0,
      });
    });
  });

  describe('retrievability', () => {
    it('returns 0 when stability is 0', () => {
      expect(retrievability(0, 1)).toBe(0);
    });

    it('returns 0 when stability is negative', () => {
      expect(retrievability(-1, 1)).toBe(0);
    });

    it('returns 1 when elapsed days is 0', () => {
      expect(retrievability(5, 0)).toBe(1);
    });

    it('decreases as elapsed days increase', () => {
      const r1 = retrievability(5, 1);
      const r5 = retrievability(5, 5);
      const r30 = retrievability(5, 30);
      expect(r1).toBeGreaterThan(r5);
      expect(r5).toBeGreaterThan(r30);
    });

    it('returns values between 0 and 1', () => {
      const r = retrievability(5, 10);
      expect(r).toBeGreaterThan(0);
      expect(r).toBeLessThanOrEqual(1);
    });

    it('higher stability means higher retrievability', () => {
      const low = retrievability(2, 5);
      const high = retrievability(10, 5);
      expect(high).toBeGreaterThan(low);
    });
  });

  describe('autoRate', () => {
    it('returns 1 (Again) for accuracy < 60', () => {
      expect(autoRate(50, 1.0)).toBe(1);
      expect(autoRate(0, 1.0)).toBe(1);
      expect(autoRate(59, 1.0)).toBe(1);
    });

    it('returns 2 (Hard) for accuracy 60-79', () => {
      expect(autoRate(60, 1.0)).toBe(2);
      expect(autoRate(79, 1.0)).toBe(2);
    });

    it('returns 3 (Good) for accuracy 80-94', () => {
      expect(autoRate(80, 1.0)).toBe(3);
      expect(autoRate(94, 1.0)).toBe(3);
    });

    it('returns 4 (Easy) for accuracy >= 95 and wpmRatio >= 1.0', () => {
      expect(autoRate(95, 1.0)).toBe(4);
      expect(autoRate(100, 1.5)).toBe(4);
    });

    it('returns 3 (Good) for high accuracy but low wpmRatio', () => {
      expect(autoRate(95, 0.9)).toBe(3);
      expect(autoRate(100, 0.5)).toBe(3);
    });
  });

  describe('schedule', () => {
    // Use a reviewed card state (reps > 0, stability > 0) to test scheduling,
    // since ts-fsrs v5 validates memory state strictly and rejects stability=0
    const reviewedState: FSRSState = {
      stability: 3.5,
      difficulty: 5.0,
      reps: 1,
      lapses: 0,
    };

    it('returns intervalDays = 1 for rating Again', () => {
      const result = schedule(reviewedState, 1, 3);
      expect(result.intervalDays).toBe(1);
    });

    it('produces positive stability and interval for Good rating', () => {
      const result = schedule(reviewedState, 3, 3);
      expect(result.nextState.stability).toBeGreaterThan(0);
      expect(result.intervalDays).toBeGreaterThanOrEqual(1);
    });

    it('increments reps count', () => {
      const result = schedule(reviewedState, 3, 3);
      expect(result.nextState.reps).toBe(2);
    });

    it('produces higher stability for Easy vs Hard rating', () => {
      const easy = schedule(reviewedState, 4, 3);
      const hard = schedule(reviewedState, 2, 3);
      expect(easy.nextState.stability).toBeGreaterThan(hard.nextState.stability);
    });

    it('produces longer interval for Easy vs Hard', () => {
      const easy = schedule(reviewedState, 4, 3);
      const hard = schedule(reviewedState, 2, 3);
      expect(easy.intervalDays).toBeGreaterThanOrEqual(hard.intervalDays);
    });

    it('increments lapses on Again rating', () => {
      const result = schedule(reviewedState, 1, 3);
      expect(result.nextState.lapses).toBeGreaterThanOrEqual(1);
    });

    it('rounds stability to 2 decimal places', () => {
      const result = schedule(reviewedState, 3, 3);
      const s = result.nextState.stability;
      expect(s).toBe(Math.round(s * 100) / 100);
    });
  });
});
