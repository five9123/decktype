'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { SkeletonStatRow } from '@/components/Skeleton';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

type Period = 'daily' | 'weekly' | 'alltime';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  wpm: number;
  accuracy: number;
  compositeScore: number;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [period, setPeriod] = useState<Period>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=${period}&limit=20`)
      .then((r) => r.json())
      .then((data) => {
        setEntries(data.leaderboard ?? []);
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [period]);

  const periodLabels: Record<Period, string> = {
    daily: t.leaderboardDaily ?? 'Today',
    weekly: t.leaderboardWeekly ?? 'This Week',
    alltime: t.leaderboardAllTime ?? 'All Time',
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Leaderboard', href: '/leaderboard' }]} />
      <TopToolbar />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          {t.leaderboardTitle ?? 'Leaderboard'}
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {t.leaderboardSubtitle ?? 'Top scores from the community'}
        </p>

        {/* Period tabs */}
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full mb-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {(['daily', 'weekly', 'alltime'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: period === p ? 'var(--accent)' : 'transparent',
                color: period === p ? '#fff' : 'var(--muted)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {periodLabels[p]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-3 text-xs font-bold"
            style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="col-span-1">#</div>
            <div className="col-span-5">{t.leaderboardPlayer ?? 'Player'}</div>
            <div className="col-span-2 text-right">WPM</div>
            <div className="col-span-2 text-right">{t.accuracyLabel}</div>
            <div className="col-span-2 text-right">{t.leaderboardScore ?? 'Score'}</div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="px-4 sm:px-6 py-4">
              {Array.from({ length: 8 }, (_, i) => <SkeletonStatRow key={i} />)}
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-3xl mb-3">🏆</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {t.leaderboardEmpty ?? 'No scores yet. Be the first!'}
              </p>
            </div>
          ) : (
            entries.map((entry) => {
              const isMe = user?.id === entry.userId;
              const isTop3 = entry.rank <= 3;
              return (
                <div
                  key={entry.userId}
                  className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-3 items-center text-sm transition-colors"
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: isMe ? 'rgba(var(--accent-rgb, 139,92,246), 0.08)' : 'transparent',
                  }}
                >
                  {/* Rank */}
                  <div className="col-span-1 font-bold" style={{ color: isTop3 ? 'var(--accent)' : 'var(--muted)' }}>
                    {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
                  </div>

                  {/* Name */}
                  <div className="col-span-5 truncate" style={{ color: isMe ? 'var(--accent)' : 'var(--text)' }}>
                    {entry.displayName}
                    {isMe && <span className="ml-1.5 text-xs" style={{ color: 'var(--accent)' }}>(you)</span>}
                  </div>

                  {/* WPM */}
                  <div className="col-span-2 text-right font-medium" style={{ color: 'var(--text)' }}>
                    {entry.wpm}
                  </div>

                  {/* Accuracy */}
                  <div className="col-span-2 text-right" style={{ color: 'var(--muted)' }}>
                    {entry.accuracy}%
                  </div>

                  {/* Score */}
                  <div className="col-span-2 text-right font-bold" style={{ color: isTop3 ? 'var(--accent)' : 'var(--text)' }}>
                    {entry.compositeScore}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
