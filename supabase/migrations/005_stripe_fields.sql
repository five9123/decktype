-- 005: Stripe integration fields + deck limit fix
-- Run in Supabase SQL Editor

-- Add Stripe fields to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';

-- Fix deck limit trigger: 3 → 1 (match client constant FREE_DECK_LIMIT = 1)
CREATE OR REPLACE FUNCTION check_deck_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT plan FROM public.profiles WHERE id = NEW.user_id) = 'free'
     AND (SELECT count(*) FROM public.decks WHERE user_id = NEW.user_id) >= 1 THEN
    RAISE EXCEPTION 'Free plan limited to 1 deck';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
