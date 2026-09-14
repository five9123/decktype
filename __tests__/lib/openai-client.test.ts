import { describe, it, expect, vi } from 'vitest';
import { APIError, APIConnectionTimeoutError } from 'openai';
import { withRetry, isRetryable, backoffDelay, classifyError, retryAfterMs } from '@/lib/openai-client';

vi.mock('@sentry/nextjs', () => ({ addBreadcrumb: vi.fn(), captureException: vi.fn() }));

function apiError(status: number, headers: Record<string, string> = {}) {
  return new APIError(status, { message: `http ${status}` }, `http ${status}`, new Headers(headers));
}

const noSleep = { sleep: async () => {}, random: () => 0.5 };

describe('isRetryable', () => {
  it('retries 429 and 5xx', () => {
    expect(isRetryable(apiError(429))).toBe(true);
    expect(isRetryable(apiError(500))).toBe(true);
    expect(isRetryable(apiError(503))).toBe(true);
  });
  it('does not retry 4xx client errors', () => {
    expect(isRetryable(apiError(400))).toBe(false);
    expect(isRetryable(apiError(401))).toBe(false);
    expect(isRetryable(apiError(404))).toBe(false);
  });
  it('retries timeouts', () => {
    expect(isRetryable(new APIConnectionTimeoutError())).toBe(true);
  });
});

describe('withRetry', () => {
  it('returns on first success without retrying', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    await expect(withRetry(fn, noSleep)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries a 429 then succeeds', async () => {
    const fn = vi.fn().mockRejectedValueOnce(apiError(429)).mockRejectedValueOnce(apiError(503)).mockResolvedValue('ok');
    await expect(withRetry(fn, { ...noSleep, maxRetries: 3 })).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('gives up after maxRetries and rethrows the last error', async () => {
    const fn = vi.fn().mockRejectedValue(apiError(500));
    await expect(withRetry(fn, { ...noSleep, maxRetries: 2 })).rejects.toBeInstanceOf(APIError);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('does not retry non-retryable errors', async () => {
    const fn = vi.fn().mockRejectedValue(apiError(400));
    await expect(withRetry(fn, noSleep)).rejects.toBeInstanceOf(APIError);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('honours Retry-After header over computed backoff', async () => {
    const sleep = vi.fn().mockResolvedValue(undefined);
    const fn = vi.fn().mockRejectedValueOnce(apiError(429, { 'retry-after': '2' })).mockResolvedValue('ok');
    await withRetry(fn, { sleep, random: () => 0.5 });
    expect(sleep).toHaveBeenCalledWith(2000);
  });

  it('stops retrying when the deadline would be exceeded', async () => {
    const sleep = vi.fn().mockResolvedValue(undefined);
    const fn = vi.fn().mockRejectedValue(apiError(429, { 'retry-after': '30' }));
    await expect(withRetry(fn, { sleep, deadlineMs: 10_000 })).rejects.toBeInstanceOf(APIError);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });
});

describe('backoffDelay', () => {
  it('grows exponentially and is capped', () => {
    const o = { baseDelayMs: 500, maxDelayMs: 8000 };
    const full = () => 0.999;
    expect(backoffDelay(0, o, full)).toBeLessThanOrEqual(500);
    expect(backoffDelay(1, o, full)).toBeLessThanOrEqual(1000);
    expect(backoffDelay(10, o, full)).toBeLessThanOrEqual(8000);
  });
});

describe('classifyError', () => {
  it('maps 429 to RATE_LIMITED with Retry-After', () => {
    const e = classifyError(apiError(429, { 'retry-after': '5' }));
    expect(e.code).toBe('RATE_LIMITED');
    expect(e.httpStatus).toBe(429);
    expect(e.retryAfterSec).toBe(5);
  });
  it('maps 5xx to UPSTREAM_ERROR / 502', () => {
    expect(classifyError(apiError(502)).code).toBe('UPSTREAM_ERROR');
  });
  it('maps timeouts to TIMEOUT / 504', () => {
    expect(classifyError(new APIConnectionTimeoutError()).httpStatus).toBe(504);
  });
  it('maps missing key to NOT_CONFIGURED / 503', () => {
    expect(classifyError(new Error('OPENAI_API_KEY is not configured')).httpStatus).toBe(503);
  });
  it('parses Retry-After seconds', () => {
    expect(retryAfterMs(apiError(429, { 'retry-after': '3' }))).toBe(3000);
  });
});
