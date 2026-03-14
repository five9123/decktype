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
