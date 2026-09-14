/**
 * Shared OpenAI client with explicit retry/backoff and error classification.
 *
 * Why this exists:
 * - All AI routes (process-media, deck-generate, coaching-tip) used to construct
 *   their own client / raw fetch with no retry. A single 429 or transient 5xx
 *   from OpenAI surfaced straight to the user.
 * - Retry policy is now in one place and observable (Sentry breadcrumbs), and
 *   errors are classified into stable `code`s the UI can act on.
 *
 * Retry policy:
 * - Retry on: 429 (rate limit), 408, 409, 5xx, network/timeout errors.
 * - Never retry on: 400/401/403/404/422 (won't succeed on repeat), or once the
 *   overall deadline is exhausted.
 * - Backoff: exponential with full jitter (base 500ms, cap 8s), but honours the
 *   `Retry-After` header when OpenAI sends one.
 */
import OpenAI, { APIError, APIConnectionError, APIConnectionTimeoutError } from 'openai';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions';
import * as Sentry from '@sentry/nextjs';

export type AiErrorCode =
  | 'NOT_CONFIGURED'   // OPENAI_API_KEY missing
  | 'RATE_LIMITED'     // OpenAI 429 after retries
  | 'TIMEOUT'          // request deadline exceeded
  | 'UPSTREAM_ERROR'   // OpenAI 5xx / connection error after retries
  | 'BAD_REQUEST'      // 4xx we caused (prompt too long, bad params)
  | 'EMPTY_RESPONSE'   // model returned no content
  | 'MALFORMED_JSON'   // JSON mode output could not be parsed
  | 'UNKNOWN';

export class AiError extends Error {
  constructor(
    public readonly code: AiErrorCode,
    message: string,
    /** HTTP status to return to the client */
    public readonly httpStatus: number,
    public readonly retryAfterSec?: number,
  ) {
    super(message);
    this.name = 'AiError';
  }
}

export interface RetryOptions {
  maxRetries?: number;      // default 3 (i.e. up to 4 attempts)
  baseDelayMs?: number;     // default 500
  maxDelayMs?: number;      // default 8000
  deadlineMs?: number;      // overall budget incl. retries; default 50_000
  /** injectable for tests */
  sleep?: (ms: number) => Promise<void>;
  random?: () => number;
}

const DEFAULTS: Required<Omit<RetryOptions, 'sleep' | 'random'>> = {
  maxRetries: 3,
  baseDelayMs: 500,
  maxDelayMs: 8_000,
  deadlineMs: 50_000,
};

const RETRYABLE_STATUS = new Set([408, 409, 429, 500, 502, 503, 504]);

export function isRetryable(err: unknown): boolean {
  if (err instanceof APIConnectionTimeoutError) return true;
  if (err instanceof APIConnectionError) return true;
  if (err instanceof APIError) return err.status !== undefined && RETRYABLE_STATUS.has(err.status);
  if (err instanceof Error && (err.name === 'AbortError' || err.name === 'TimeoutError')) return true;
  return false;
}

/** Parse Retry-After (seconds or HTTP-date) into ms, or undefined. */
export function retryAfterMs(err: unknown): number | undefined {
  if (!(err instanceof APIError)) return undefined;
  const raw = err.headers?.get?.('retry-after') ?? (err.headers as Record<string, string> | undefined)?.['retry-after'];
  if (!raw) return undefined;
  const secs = Number(raw);
  if (Number.isFinite(secs)) return Math.max(0, secs * 1000);
  const date = Date.parse(raw);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

/** Exponential backoff with full jitter. */
export function backoffDelay(attempt: number, opts: Required<Pick<RetryOptions, 'baseDelayMs' | 'maxDelayMs'>>, random = Math.random): number {
  const exp = Math.min(opts.maxDelayMs, opts.baseDelayMs * 2 ** attempt);
  return Math.floor(random() * exp);
}

/**
 * Run `fn` with retries. Generic so it can wrap any OpenAI SDK call.
 */
export async function withRetry<T>(fn: (attempt: number) => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const o = { ...DEFAULTS, ...options };
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
  const random = options.random ?? Math.random;
  const started = Date.now();

  let lastErr: unknown;
  for (let attempt = 0; attempt <= o.maxRetries; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastErr = err;
      const elapsed = Date.now() - started;
      if (!isRetryable(err) || attempt === o.maxRetries) break;

      const hinted = retryAfterMs(err);
      const delay = hinted ?? backoffDelay(attempt, o, random);
      if (elapsed + delay > o.deadlineMs) break;

      Sentry.addBreadcrumb({
        category: 'openai.retry',
        level: 'warning',
        message: `attempt ${attempt + 1} failed, retrying in ${delay}ms`,
        data: { status: err instanceof APIError ? err.status : undefined, hinted: hinted !== undefined },
      });
      await sleep(delay);
    }
  }
  throw lastErr;
}

/** Map any thrown value from an OpenAI call into an AiError with a stable code + HTTP status. */
export function classifyError(err: unknown): AiError {
  if (err instanceof AiError) return err;
  if (err instanceof APIError) {
    const s = err.status ?? 0;
    if (s === 429) return new AiError('RATE_LIMITED', 'AI service is busy. Please try again in a moment.', 429, secondsFrom(retryAfterMs(err)));
    if (s >= 500) return new AiError('UPSTREAM_ERROR', 'AI service error. Please try again in a moment.', 502);
    if (s === 401 || s === 403) return new AiError('NOT_CONFIGURED', 'AI processing is not configured on the server.', 503);
    if (s >= 400) return new AiError('BAD_REQUEST', 'AI request was rejected. Try with shorter text.', 400);
  }
  if (err instanceof APIConnectionTimeoutError || (err instanceof Error && (err.name === 'AbortError' || err.name === 'TimeoutError'))) {
    return new AiError('TIMEOUT', 'Processing timed out. Try reducing the text or lowering the max words count.', 504);
  }
  if (err instanceof APIConnectionError) {
    return new AiError('UPSTREAM_ERROR', 'Could not reach the AI service. Please try again.', 502);
  }
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes('OPENAI_API_KEY')) return new AiError('NOT_CONFIGURED', 'AI processing is not configured on the server.', 503);
  return new AiError('UNKNOWN', 'AI request failed. Please try again.', 500);
}

function secondsFrom(ms?: number): number | undefined {
  return ms === undefined ? undefined : Math.ceil(ms / 1000);
}

let _client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new AiError('NOT_CONFIGURED', 'OPENAI_API_KEY is not configured', 503);
  if (!_client) {
    // maxRetries: 0 — retries are handled by withRetry so they are explicit and logged.
    _client = new OpenAI({ apiKey, maxRetries: 0 });
  }
  return _client;
}

export interface JsonCompletionOptions {
  model?: string;
  maxTokens: number;
  temperature?: number;
  /** per-attempt timeout; overall budget is RetryOptions.deadlineMs */
  timeoutMs?: number;
  retry?: RetryOptions;
}

export interface JsonCompletionResult {
  content: string;
  finishReason: string | null | undefined;
  truncated: boolean;
}

/**
 * Chat completion in JSON mode with retry + classified errors.
 * Returns the raw content string; callers parse/validate their own shape.
 */
export async function jsonCompletion(prompt: string, opts: JsonCompletionOptions): Promise<JsonCompletionResult> {
  const client = getOpenAI();
  const params: ChatCompletionCreateParamsNonStreaming = {
    model: opts.model ?? 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: opts.maxTokens,
    temperature: opts.temperature ?? 0.3,
    response_format: { type: 'json_object' },
  };

  try {
    const completion = await withRetry(
      () => client.chat.completions.create(params, { timeout: opts.timeoutMs ?? 55_000 }),
      opts.retry,
    );
    const choice = completion.choices[0];
    const content = choice?.message?.content;
    if (!content) throw new AiError('EMPTY_RESPONSE', 'AI returned an empty response. Try with shorter text.', 502);
    return { content, finishReason: choice.finish_reason, truncated: choice.finish_reason === 'length' };
  } catch (err) {
    const classified = classifyError(err);
    Sentry.captureException(err, { tags: { ai_error_code: classified.code } });
    throw classified;
  }
}

/** Build a NextResponse-compatible body/status for an AiError. */
export function aiErrorResponse(err: AiError, extra: Record<string, unknown> = {}) {
  return {
    body: { error: err.message, code: err.code, ...extra },
    init: {
      status: err.httpStatus,
      headers: err.retryAfterSec ? { 'Retry-After': String(err.retryAfterSec) } : undefined,
    },
  };
}
