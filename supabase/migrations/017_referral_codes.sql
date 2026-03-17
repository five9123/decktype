-- Migration 017: Referral / Influencer Discount Codes
-- Enables influencer collaboration with per-code discount tracking

-- Referral codes table (one row per influencer code)
CREATE TABLE IF NOT EXISTS referral_codes (
  id                       UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  code                     TEXT    UNIQUE NOT NULL,               -- e.g. 'MINSOO20' (stored uppercase)
  influencer_name          TEXT    NOT NULL,                      -- e.g. '민수 TV'
  stripe_promotion_code_id TEXT    NOT NULL,                      -- Stripe promo code ID (promo_xxx)
  discount_pct             INTEGER NOT NULL CHECK (discount_pct BETWEEN 1 AND 100),
  active                   BOOLEAN DEFAULT true,
  created_at               TIMESTAMPTZ DEFAULT now()
);

-- Conversion tracking table (one row per successful referral-attributed subscription)
CREATE TABLE IF NOT EXISTS referral_conversions (
  id                UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code_id  UUID    NOT NULL REFERENCES referral_codes(id) ON DELETE CASCADE,
  user_id           UUID    REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT,
  plan              TEXT,   -- 'monthly' | 'yearly'
  converted_at      TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_referral_codes_code   ON referral_codes(code) WHERE active = true;
CREATE INDEX idx_referral_conv_code_id ON referral_conversions(referral_code_id);
CREATE INDEX idx_referral_conv_user_id ON referral_conversions(user_id);

-- RLS: no public access — all reads/writes go through service-role API routes
ALTER TABLE referral_codes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_conversions  ENABLE ROW LEVEL SECURITY;

-- No public policies created intentionally; API routes use service role key
