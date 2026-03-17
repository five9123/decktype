/**
 * Centralised storage key constants.
 * Use these instead of inline string literals to prevent typos and make
 * renaming easy.
 */

/** localStorage: user UI preferences (theme, font-size, etc.) */
export const STORAGE_KEY_PREFS = 'atype-prefs' as const;

/** localStorage: last-selected UI language */
export const STORAGE_KEY_LANG = 'atype-lang' as const;

/** sessionStorage: guest deck data uploaded before sign-in */
export const STORAGE_KEY_GUEST_DECK = 'atype-guest-deck' as const;

/** sessionStorage: typing session results for the results page */
export const STORAGE_KEY_SESSION = 'atype__session' as const;

/** localStorage: onboarding coachmark completion status */
export const STORAGE_KEY_ONBOARDING = 'atype-onboarding' as const;

/** sessionStorage: retention banner dismissed for current session */
export const STORAGE_KEY_RETENTION_DISMISSED = 'atype-retention-dismissed' as const;

/** sessionStorage: analytics session ID (random per tab) */
export const STORAGE_KEY_ANALYTICS_SESSION = 'atype-analytics-sid' as const;

/** sessionStorage: goal celebration shown today */
export const STORAGE_KEY_GOAL_CELEBRATED = 'atype-goal-celebrated' as const;

/** sessionStorage: XP gain amount for animation on results page */
export const STORAGE_KEY_XP_ANIMATION = 'atype-xp-anim' as const;
