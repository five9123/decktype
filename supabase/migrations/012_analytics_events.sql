-- Analytics events table for funnel tracking
-- Lightweight event tracking without external dependencies

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name text NOT NULL,
  event_data jsonb DEFAULT '{}',
  page_path text,
  session_id text,
  created_at timestamptz DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_analytics_event_name ON public.analytics_events(event_name);
CREATE INDEX idx_analytics_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_user_id ON public.analytics_events(user_id);

-- RLS: users can insert their own events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Convenience views for Supabase SQL Editor dashboards

-- Daily Active Users
CREATE OR REPLACE VIEW public.analytics_dau AS
SELECT
  date_trunc('day', created_at)::date AS day,
  count(DISTINCT user_id) AS dau
FROM public.analytics_events
WHERE user_id IS NOT NULL
GROUP BY 1
ORDER BY 1 DESC;

-- Conversion funnel
CREATE OR REPLACE VIEW public.analytics_funnel AS
SELECT
  event_name,
  count(DISTINCT user_id) AS users,
  count(*) AS total_events
FROM public.analytics_events
WHERE event_name IN (
  'deck_created',
  'practice_started',
  'practice_completed',
  'upgrade_clicked',
  'upgrade_completed'
)
GROUP BY event_name;
