-- Webhook idempotency: prevent duplicate Stripe event processing
CREATE TABLE IF NOT EXISTS webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure one Stripe customer maps to at most one profile
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id
  ON profiles(stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;
