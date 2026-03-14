-- Performance indexes for common query patterns

-- Filter/count by mastery level (stats page)
CREATE INDEX IF NOT EXISTS idx_card_mastery_level
  ON card_mastery(mastery_level);

-- Lookup personal bests by deck (deck detail page)
CREATE INDEX IF NOT EXISTS idx_personal_bests_deck
  ON personal_bests(deck_id);

-- User+deck scoped session queries (progress, history)
CREATE INDEX IF NOT EXISTS idx_sessions_user_deck
  ON typing_sessions(user_id, deck_id);
