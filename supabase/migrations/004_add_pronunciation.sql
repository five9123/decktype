-- Add pronunciation field to cards table
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS pronunciation TEXT DEFAULT '';
