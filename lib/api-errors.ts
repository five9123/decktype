/**
 * Map raw API error messages + optional error codes into user-friendly strings.
 * Used by all AI-related UI components (Media, Text, Upload tabs).
 */
export function friendlyError(msg: string, code?: string): string {
  // Structured error codes from process-media API
  if (code === 'AUTH_REQUIRED') {
    return 'Sign in required to use AI features.';
  }
  if (code === 'QUOTA_EXCEEDED') {
    return msg; // Already user-friendly from server
  }
  // Structured codes from lib/openai-client.ts (already user-friendly, but keep
  // a couple of overrides where the UI can give better guidance)
  if (code === 'RATE_LIMITED') {
    return 'AI service is busy right now. Please wait a moment and try again.';
  }
  if (code === 'TIMEOUT') {
    return 'Processing timed out. Try reducing the text or lowering the max words count.';
  }
  if (code === 'MALFORMED_JSON') {
    return 'AI returned a malformed response. Please try again — sometimes reducing max words helps.';
  }
  if (code === 'NOT_CONFIGURED' || code === 'UPSTREAM_ERROR' || code === 'EMPTY_RESPONSE' || code === 'BAD_REQUEST') {
    return msg;
  }

  // Pattern-based fallback for unstructured errors
  if (msg.includes('timeout') || msg.includes('aborted')) {
    return 'Processing timed out. Try reducing the text or lowering the max words count.';
  }
  if (msg.includes('Too many requests') || msg.includes('429')) {
    return 'Too many requests. Please wait a minute and try again. (Limit: 5/min)';
  }
  if (msg.includes('not configured') || msg.includes('OPENAI_API_KEY')) {
    return 'AI processing is not configured on the server.';
  }
  if (msg.includes('OpenAI API error')) {
    return 'AI service error. Please try again in a moment.';
  }
  if (msg.includes('Empty response')) {
    return 'AI returned an empty response. Try with shorter text.';
  }
  if (msg.includes('cut off') || msg.includes('too long')) {
    return 'AI response was too long and got cut off. Try reducing the max words count or using a shorter text.';
  }
  if (msg.includes('invalid JSON') || msg.includes('Unterminated string')) {
    return 'AI returned a malformed response. Please try again — sometimes reducing max words helps.';
  }

  return msg;
}
