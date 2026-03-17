'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { DeckCard } from '@/components/DeckCard';
import { StreakCounter } from '@/components/StreakCounter';
import { UpgradeBanner } from '@/components/UpgradeBanner';
import { RetentionBanner } from '@/components/RetentionBanner';
import { GoalProgressBar } from '@/components/GoalProgressBar';
import { GoalSettingsModal } from '@/components/GoalSettingsModal';
import { GoalCelebration } from '@/components/GoalCelebration';
import { Coachmark } from '@/components/Coachmark';
import { useProgress } from '@/hooks/useProgress';
import { useGoals } from '@/hooks/useGoals';
import { trackEvent } from '@/lib/analytics';
import { useProfile } from '@/hooks/useProfile';
import { useXP } from '@/hooks/useXP';
import { XPProgressBar } from '@/components/XPProgressBar';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import type { Deck } from '@/types';
import { FREE_DECK_LIMIT } from '@/lib/constants';
import { STORAGE_KEY_ONBOARDING } from '@/lib/storage-keys';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const { xp, level, loading: xpLoading } = useXP();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dueCounts, setDueCounts] = useState<Record<string, number>>({});
  const { streak, sessions, loading: progressLoading } = useProgress();
  const { goalProgress, goals, setGoal, removeGoal } = useGoals();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGoalSettings, setShowGoalSettings] = useState(false);
  const [celebratingGoalType, setCelebratingGoalType] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const supabase = createBrowserClient();
    supabase
      .from('decks')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }: { data: Deck[] | null; error: { message: string } | null }) => {
        if (err) setError(err.message);
        else setDecks(data ?? []);
        setLoading(false);
      });
  }, [user]);

  // Load due card counts per deck
  useEffect(() => {
    if (!user || decks.length === 0) return;
    const supabase = createBrowserClient();
    const deckIds = decks.map((d) => d.id);

    supabase
      .from('card_mastery')
      .select('card_id, cards!inner(deck_id)')
      .lte('next_review_at', new Date().toISOString())
      .then(({ data }: { data: { card_id: string; cards: { deck_id: string } }[] | null }) => {
        const counts: Record<string, number> = {};
        (data ?? []).forEach((row) => {
          const did = row.cards?.deck_id;
          if (did && deckIds.includes(did)) {
            counts[did] = (counts[did] ?? 0) + 1;
          }
        });
        setDueCounts(counts);
      })
      .catch(() => {
        // Due counts are non-critical; silently ignore on failure
      });
  }, [user, decks]);

  // Show onboarding for first-time users
  useEffect(() => {
    if (!user || loading) return;
    const completed = localStorage.getItem(STORAGE_KEY_ONBOARDING);
    if (!completed) {
      const timer = setTimeout(() => setShowOnboarding(true), 500);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  const completeOnboarding = () => {
    localStorage.setItem(STORAGE_KEY_ONBOARDING, 'completed');
    setShowOnboarding(false);
    trackEvent('onboarding_completed');
  };

  const skipOnboarding = () => {
    localStorage.setItem(STORAGE_KEY_ONBOARDING, 'completed');
    setShowOnboarding(false);
    trackEvent('onboarding_skipped');
  };

  const onboardingSteps = [
    {
      title: t.onboardingWelcomeTitle,
      description: t.onboardingWelcomeDesc,
    },
    {
      targetSelector: '[data-onboarding="create-deck"]',
      title: t.onboardingCreateTitle,
      description: t.onboardingCreateDesc,
      position: 'bottom' as const,
    },
    {
      targetSelector: '[data-onboarding="create-deck"]',
      title: t.onboardingStartTitle,
      description: t.onboardingStartDesc,
      position: 'bottom' as const,
    },
  ];

  // Trigger celebration when a goal completes
  useEffect(() => {
    const completed = goalProgress.find((gp) => gp.completed);
    if (completed) setCelebratingGoalType(completed.goal.goal_type + '_' + completed.goal.period);
  }, [goalProgress]);

  const atLimit = !isPro && decks.length >= FREE_DECK_LIMIT;

  return (
    <>
      <TopToolbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Streak Counter */}
        {!progressLoading && (
          <div className="mb-4">
            <StreakCounter streak={streak} />
          </div>
        )}

        {/* XP Progress Bar */}
        {!xpLoading && user && (
          <XPProgressBar xp={xp} level={level} />
        )}

        {/* Retention Banner */}
        {!progressLoading && !loading && (
          <RetentionBanner
            streak={streak}
            dueCount={Object.values(dueCounts).reduce((a, b) => a + b, 0)}
            lastSessionDate={sessions[0]?.created_at}
            firstDeckId={decks[0]?.id}
          />
        )}

        {/* Goal Progress */}
        {!progressLoading && (
          <GoalProgressBar
            goalProgress={goalProgress}
            onOpenSettings={() => setShowGoalSettings(true)}
          />
        )}

        {/* Review Summary Banner */}
        {(() => {
          const totalDue = Object.values(dueCounts).reduce((a, b) => a + b, 0);
          const dueDecks = Object.entries(dueCounts).filter(([, c]) => c > 0);
          if (totalDue === 0) return null;
          const firstDueDeckId = dueDecks[0]?.[0];
          return (
            <div
              className="flex items-center justify-between px-4 py-3 rounded-xl mb-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 18 }}>📚</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {t.reviewSummary
                    .replace('{cards}', String(totalDue)).replace('{decks}', String(dueDecks.length))}
                </span>
              </div>
              {firstDueDeckId && (
                <Link
                  href={`/deck/${firstDueDeckId}/practice?order=smart_review`}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold no-underline"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {t.reviewNow}
                </Link>
              )}
            </div>
          );
        })()}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{t.myDecks}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              {isPro
                ? `${decks.length} ${t.myDecks.toLowerCase()}`
                : `${decks.length} / ${FREE_DECK_LIMIT} ${t.myDecks.toLowerCase()}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={atLimit ? '#' : '/create'}
              data-onboarding="create-deck"
              className={`px-5 py-2.5 rounded-xl text-sm font-bold no-underline transition-opacity ${atLimit ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
              style={{
                background: 'var(--accent)',
                color: '#FFFFFF',
                pointerEvents: atLimit ? 'none' : 'auto',
              }}
            >
              {t.createDeck}
            </Link>
          </div>
        </div>

        {atLimit && <UpgradeBanner type="deck" />}

        {/* Deck Grid */}
        {error && (
          <div className="px-4 py-3 rounded-xl text-sm mb-6" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}>
            Failed to load decks: {error}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
          </div>
        ) : decks.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-4xl mb-4">📦</p>
            <p style={{ color: 'var(--muted)' }}>{t.noDeckYet}</p>
            <Link
              href="/create"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t.createDeck}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} dueCount={dueCounts[deck.id]} />
            ))}
          </div>
        )}
      </main>

      {showOnboarding && (
        <Coachmark
          steps={onboardingSteps}
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
          nextLabel={t.onboardingNext}
          skipLabel={t.onboardingSkip}
          doneLabel={t.onboardingDone}
        />
      )}

      {showGoalSettings && (
        <GoalSettingsModal
          goals={goals}
          onSetGoal={setGoal}
          onRemoveGoal={removeGoal}
          onClose={() => setShowGoalSettings(false)}
        />
      )}

      {celebratingGoalType && (
        <GoalCelebration
          goalType={celebratingGoalType}
          onDismiss={() => setCelebratingGoalType(null)}
        />
      )}
    </>
  );
}
