'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { StreakCounter } from '@/components/StreakCounter';
import { ActivityHeatmap } from '@/components/charts/ActivityHeatmap';
import { WpmTrendChart } from '@/components/charts/WpmTrendChart';
import { CardStatsTable } from '@/components/CardStatsTable';
import { MasteryProgress } from '@/components/MasteryProgress';
import { useProgress } from '@/hooks/useProgress';
import { useProfile } from '@/hooks/useProfile';
import { ProGateOverlay } from '@/components/ProGateOverlay';
import { createBrowserClient } from '@/lib/supabase/client';
import { useXP } from '@/hooks/useXP';
import { useAchievements } from '@/hooks/useAchievements';
import { XPProgressBar } from '@/components/XPProgressBar';
import { AchievementCard } from '@/components/AchievementCard';
import { ACHIEVEMENTS } from '@/lib/achievements';
import type { CardStats, Deck, AchievementCategory } from '@/types';

type Tab = 'overview' | 'decks' | 'history' | 'achievements';

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

export default function StatsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const { xp, level } = useXP();
  const { unlocked: unlockedAchievements } = useAchievements();
  const [tab, setTab] = useState<Tab>('overview');
  const { sessions, dailyActivity, streak, personalBests, loading, error } = useProgress();

  // Decks tab data
  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckMastery, setDeckMastery] = useState<Map<string, { learning: number; familiar: number; mastered: number; total: number }>>(new Map());
  const [deckCardStats, setDeckCardStats] = useState<Map<string, CardStats[]>>(new Map());
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [decksLoaded, setDecksLoaded] = useState(false);

  // Load decks + mastery when Decks tab is selected
  useEffect(() => {
    if (tab !== 'decks' || !user || decksLoaded) return;
    const supabase = createBrowserClient();

    supabase.from('decks').select('*').order('created_at', { ascending: false }).then(async ({ data: deckData }: { data: Deck[] | null }) => {
      const allDecks = (deckData ?? []) as Deck[];
      setDecks(allDecks);

      if (allDecks.length > 0 && !selectedDeck) {
        setSelectedDeck(allDecks[0].id);
      }

      // Load mastery data for all decks
      const masteryMap = new Map<string, { learning: number; familiar: number; mastered: number; total: number }>();
      for (const deck of allDecks) {
        const { data: cards } = await supabase.from('cards').select('id').eq('deck_id', deck.id);
        const cardIds = (cards ?? []).map((c: { id: string }) => c.id);
        const total = cardIds.length;

        if (cardIds.length > 0) {
          const { data: mastery } = await supabase
            .from('card_mastery')
            .select('mastery_level')
            .in('card_id', cardIds);

          let learning = 0, familiar = 0, mastered = 0;
          (mastery ?? []).forEach((m: { mastery_level: string }) => {
            if (m.mastery_level === 'learning') learning++;
            else if (m.mastery_level === 'familiar') familiar++;
            else if (m.mastery_level === 'mastered') mastered++;
          });
          masteryMap.set(deck.id, { learning, familiar, mastered, total });
        } else {
          masteryMap.set(deck.id, { learning: 0, familiar: 0, mastered: 0, total });
        }
      }
      setDeckMastery(masteryMap);
      setDecksLoaded(true);
    });
  }, [tab, user, decksLoaded, selectedDeck]);

  // Load card stats for selected deck
  useEffect(() => {
    if (!selectedDeck || !user) return;
    if (deckCardStats.has(selectedDeck)) return;

    const supabase = createBrowserClient();
    supabase.from('cards').select('id, front, back').eq('deck_id', selectedDeck).then(async ({ data: cards }: { data: { id: string; front: string; back: string }[] | null }) => {
      const cardList = cards ?? [];
      if (cardList.length === 0) return;

      const cardIds = cardList.map((c: { id: string }) => c.id);
      const { data: mastery } = await supabase
        .from('card_mastery')
        .select('*')
        .in('card_id', cardIds);

      const stats: CardStats[] = cardList.map((c: { id: string; front: string; back: string }) => {
        const m = (mastery ?? []).find((row: { card_id: string }) => row.card_id === c.id);
        return {
          card_id: c.id,
          front: c.front,
          back: c.back,
          avgWpm: m?.avg_wpm ?? 0,
          avgAccuracy: m?.avg_accuracy ?? 0,
          attemptCount: m?.attempt_count ?? 0,
          masteryLevel: m?.mastery_level ?? 'learning',
          confidence: m?.confidence ?? 0,
        };
      });

      setDeckCardStats((prev) => new Map(prev).set(selectedDeck, stats));
    });
  }, [selectedDeck, user, deckCardStats]);

  const bestAccuracy = sessions.length > 0 ? Math.max(...sessions.map((s) => s.accuracy)) : 0;
  const avgWpm = sessions.length > 0 ? Math.round(sessions.reduce((a, s) => a + s.wpm, 0) / sessions.length) : 0;

  const tabItems: { key: Tab; label: string }[] = [
    { key: 'overview', label: t.overview },
    { key: 'decks', label: t.decksTab },
    { key: 'history', label: t.historyTab },
    { key: 'achievements', label: t.achievementsTab },
  ];

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>{t.statsTitle}</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{t.statsSubtitle}</p>

        {error && (
          <div className="px-4 py-3 rounded-xl text-sm mb-6" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}>
            Failed to load stats: {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 sm:mb-8 p-1 rounded-xl overflow-x-auto" style={{ background: 'var(--surface)' }}>
          {tabItems.map((ti) => (
            <button
              key={ti.key}
              onClick={() => setTab(ti.key)}
              className="flex-1 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap"
              style={{
                background: tab === ti.key ? 'var(--accent)' : 'transparent',
                color: tab === ti.key ? '#fff' : 'var(--muted)',
                border: 'none',
                cursor: 'pointer',
                minWidth: 0,
              }}
            >
              {ti.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
          </div>
        ) : sessions.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-4xl mb-4">📊</p>
            <p style={{ color: 'var(--muted)' }}>{t.noStatsYet}</p>
          </div>
        ) : (
          <>
            {/* ── Overview Tab ── */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <StreakCounter streak={streak} />

                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { label: t.totalSessions, value: sessions.length.toString() },
                    { label: t.bestAccuracy, value: `${bestAccuracy}%` },
                    { label: t.speedLabel, value: `${avgWpm} WPM` },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="p-2.5 sm:p-4 rounded-xl text-center"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                    >
                      <p className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--accent)' }}>{s.value}</p>
                      <p className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--muted)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>Activity</h3>
                  {isPro ? (
                    <ActivityHeatmap data={dailyActivity} />
                  ) : (
                    <ProGateOverlay>
                      <ActivityHeatmap data={dailyActivity} />
                    </ProGateOverlay>
                  )}
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>WPM Trend</h3>
                  {isPro ? (
                    <WpmTrendChart
                      sessions={sessions.slice(0, 30).reverse().map((s) => ({
                        wpm: s.wpm,
                        date: s.created_at.slice(0, 10),
                      }))}
                    />
                  ) : (
                    <ProGateOverlay>
                      <WpmTrendChart
                        sessions={sessions.slice(0, 30).reverse().map((s) => ({
                          wpm: s.wpm,
                          date: s.created_at.slice(0, 10),
                        }))}
                      />
                    </ProGateOverlay>
                  )}
                </div>
              </div>
            )}

            {/* ── Decks Tab ── */}
            {tab === 'decks' && (
              <div className="space-y-6">
                {decks.length === 0 ? (
                  <p className="text-center py-10" style={{ color: 'var(--muted)' }}>{t.loading}</p>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {decks.map((deck) => (
                        <button
                          key={deck.id}
                          onClick={() => setSelectedDeck(deck.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: selectedDeck === deck.id ? 'var(--accent)' : 'var(--surface)',
                            color: selectedDeck === deck.id ? '#fff' : 'var(--text)',
                            border: `1px solid ${selectedDeck === deck.id ? 'var(--accent)' : 'var(--border)'}`,
                            cursor: 'pointer',
                          }}
                        >
                          {deck.name}
                        </button>
                      ))}
                    </div>

                    {selectedDeck && (
                      <>
                        {deckMastery.has(selectedDeck) && (
                          <div
                            className="p-4 rounded-xl"
                            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                          >
                            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
                              {t.masteryProgress}
                            </h3>
                            <MasteryProgress {...deckMastery.get(selectedDeck)!} />
                          </div>
                        )}

                        {(() => {
                          const deckPBs = personalBests.filter((pb) => pb.deck_id === selectedDeck);
                          if (deckPBs.length === 0) return null;
                          return (
                            <div
                              className="p-4 rounded-xl"
                              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                            >
                              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
                                {t.personalBest}
                              </h3>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-center">
                                {deckPBs.map((pb) => (
                                  <div key={pb.id}>
                                    <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{pb.mode}</p>
                                    <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{Math.round(pb.best_wpm)} WPM</p>
                                    <p className="text-xs" style={{ color: 'var(--correct)' }}>{Math.round(pb.best_accuracy)}%</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {deckCardStats.has(selectedDeck) && (
                          <div>
                            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
                              {t.weakestCards}
                            </h3>
                            <CardStatsTable stats={deckCardStats.get(selectedDeck)!} />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ── Achievements Tab ── */}
            {tab === 'achievements' && (
              <div className="space-y-6">
                <XPProgressBar xp={xp} level={level} />

                {/* Group achievements by category */}
                {(['streak', 'sessions', 'mastery', 'speed', 'cards', 'variety'] as AchievementCategory[]).map((category) => {
                  const categoryAchievements = ACHIEVEMENTS.filter((a) => a.category === category);
                  if (categoryAchievements.length === 0) return null;
                  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
                  return (
                    <div key={category}>
                      <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
                        {categoryLabel}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {categoryAchievements.map((achievement) => (
                          <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            userAchievement={unlockedAchievements.find((ua) => ua.achievement_id === achievement.id)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── History Tab ── */}
            {tab === 'history' && (
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                {/* Mobile card view */}
                <div className="sm:hidden space-y-0">
                  {sessions.slice(0, 100).map((session) => (
                    <div
                      key={session.id}
                      className="px-4 py-3 flex items-center justify-between"
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                          {session.composite_score}<span className="font-normal text-xs ml-1" style={{ color: 'var(--muted)' }}>pts</span>
                        </p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                          {new Date(session.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-3 text-xs text-right">
                        <div>
                          <p style={{ color: 'var(--text)' }}>{session.wpm}</p>
                          <p style={{ color: 'var(--muted)' }}>WPM</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--correct)' }}>{session.accuracy}%</p>
                          <p style={{ color: 'var(--muted)' }}>Acc</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--text)' }}>{session.card_count}</p>
                          <p style={{ color: 'var(--muted)' }}>{t.cards}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Desktop table view */}
                <table className="hidden sm:table w-full text-sm">
                  <thead>
                    <tr style={{ background: 'var(--surface2)' }}>
                      <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>Date</th>
                      <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>Score</th>
                      <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>WPM</th>
                      <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>{t.accuracyLabel}</th>
                      <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>{t.cards}</th>
                      <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>{t.timeLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.slice(0, 100).map((session) => (
                      <tr key={session.id} style={{ borderTop: '1px solid var(--border)' }}>
                        <td className="px-4 py-3" style={{ color: 'var(--text)' }}>
                          {new Date(session.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 font-bold" style={{ color: 'var(--accent)' }}>
                          {session.composite_score}
                        </td>
                        <td className="px-4 py-3" style={{ color: 'var(--text)' }}>{session.wpm}</td>
                        <td className="px-4 py-3" style={{ color: 'var(--correct)' }}>{session.accuracy}%</td>
                        <td className="px-4 py-3" style={{ color: 'var(--text)' }}>{session.card_count}</td>
                        <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{formatTime(session.duration_ms)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
