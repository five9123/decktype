import { createBrowserClient } from '@/lib/supabase/client';
import { STORAGE_KEY_ANALYTICS_SESSION } from '@/lib/storage-keys';

export type AnalyticsEvent =
  | 'page_view'
  | 'deck_created'
  | 'practice_started'
  | 'practice_completed'
  | 'upgrade_clicked'
  | 'upgrade_completed'
  | 'ai_used'
  | 'onboarding_completed'
  | 'onboarding_skipped'
  | 'share_clicked'
  | 'deck_published'
  | 'deck_unpublished'
  | 'deck_liked'
  | 'deck_unliked'
  | 'deck_cloned'
  | 'explore_viewed'
  | 'goal_set'
  | 'goal_completed'
  | 'coaching_tip_requested'
  | 'achievement_unlocked'
  | 'level_up'
  | 'xp_gained'
  | 'card_rated'
  | 'social_referral';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem(STORAGE_KEY_ANALYTICS_SESSION);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(STORAGE_KEY_ANALYTICS_SESSION, sid);
  }
  return sid;
}

/**
 * Fire-and-forget analytics event tracking.
 * Inserts into Supabase `analytics_events` table.
 * Silently ignores errors to avoid impacting UX.
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  eventData?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;

  try {
    const supabase = createBrowserClient();
    supabase.auth.getUser().then(({ data }: { data: { user: { id: string } | null } }) => {
      supabase
        .from('analytics_events')
        .insert({
          user_id: data?.user?.id ?? null,
          event_name: eventName,
          event_data: eventData ?? {},
          page_path: window.location.pathname,
          session_id: getSessionId(),
        })
        .then(() => { /* fire-and-forget */ })
        .catch(() => { /* silently ignore */ });
    }).catch(() => { /* silently ignore */ });
  } catch {
    /* silently ignore */
  }
}
