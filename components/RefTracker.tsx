'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const STORAGE_KEY = 'typee_ref';

/**
 * Tracks social media referral source from URL ?ref= param.
 * Stores in sessionStorage so it persists across page navigations.
 * Uses window.location.search instead of useSearchParams to avoid Suspense requirement.
 */
export function RefTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      sessionStorage.setItem(STORAGE_KEY, ref);
      trackEvent('social_referral', { source: ref, landing_page: window.location.pathname });
    }
  }, []);

  return null;
}

/** Get the stored referral source (if any) */
export function getRefSource(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE_KEY);
}
