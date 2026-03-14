-- Track per-user daily AI API usage to prevent cost overruns
-- Free users: 3 AI requests per day
-- Pro users: 50 AI requests per day

CREATE TABLE IF NOT EXISTS public.ai_usage (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  used_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  endpoint   TEXT NOT NULL DEFAULT 'process-media'
);

-- Index for fast daily count lookups
CREATE INDEX idx_ai_usage_user_day
  ON public.ai_usage (user_id, used_at DESC);

-- RLS: users can only see their own usage
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own ai_usage"
  ON public.ai_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own ai_usage"
  ON public.ai_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Cleanup: auto-delete rows older than 7 days (run via pg_cron or manual)
-- This keeps the table small while retaining enough history for debugging
COMMENT ON TABLE public.ai_usage IS 'Tracks per-user AI API calls for daily quota enforcement. Rows older than 7 days can be pruned.';
