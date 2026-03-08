'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { TopToolbar } from '@/components/TopToolbar';
import { PersonalBestBanner } from '@/components/PersonalBestBanner';
import { WpmVariationChart } from '@/components/charts/WpmVariationChart';
import { MasteryBadge } from '@/components/MasteryBadge';
import { WrongCardsReview } from '@/components/WrongCardsReview';
import { analyzeErrorPatterns } from '@/lib/error-patterns';
import { createBrowserClient } from '@/lib/supabase/client';
import type { MasteryLevel } from '@/types';

interface CardResult {
  card_id: string;
  wpm: number;
  accuracy: number;
  time_ms: number;
  typed_text?: string;
  target_text?: string;
}

interface CardInfo {
  id: string;
  front: string;
  back: string;
}

interface PBRecord {
  type: 'wpm' | 'accuracy' | 'composite';
  oldValue: number;
  newValue: number;
}

interface SessionData {
  deck_id: string;
  wpm: number;
  accuracy: number;
  composite_score: number;
  card_count: number;
  duration_ms: number;
  mode: string;
  cardResults?: CardResult[];
  levelUps?: { cardId: string; level: MasteryLevel }[];
  cards?: CardInfo[];
  pbRecords?: PBRecord[];
}

function getRating(score: number, t: ReturnType<typeof useLanguage>['t']) {
  if (score >= 95) return { label: t.outstanding, color: '#4ADE80' };
  if (score >= 80) return { label: t.greatJob, color: '#60A5FA' };
  if (score >= 60) return { label: t.goodEffort, color: '#FBBF24' };
  return { label: t.keepGoing, color: '#F87171' };
}

function ComparisonStat({ label, current, previous, suffix = '' }: {
  label: string; current: number; previous: number; suffix?: string;
}) {
  const diff = current - previous;
  const isPositive = diff > 0;
  const color = diff === 0 ? 'var(--muted)' : isPositive ? 'var(--correct)' : 'var(--incorrect)';
  const arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '';
  return (
    <div>
      <span style={{ color: 'var(--text)' }}>{label}: {current}{suffix} </span>
      {diff !== 0 && (
        <span className="font-medium" style={{ color }}>
          {arrow}{Math.abs(diff)}{suffix}
        </span>
      )}
    </div>
  );
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

interface PrevSessionAvg {
  wpm: number;
  accuracy: number;
}

function ResultsContent() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('deck');

  const [session, setSession] = useState<SessionData | null>(null);
  const [prevAvg, setPrevAvg] = useState<PrevSessionAvg | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('atype__session');
      if (raw) setSession(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  // Load previous sessions for comparison
  useEffect(() => {
    if (!user || !deckId || !session) return;
    const supabase = createBrowserClient();
    supabase
      .from('typing_sessions')
      .select('wpm, accuracy')
      .eq('deck_id', deckId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(1, 5) // Skip current session (index 0), get 1-5
      .then(({ data }: { data: { wpm: number; accuracy: number }[] | null }) => {
        if (data && data.length > 0) {
          const avgWpm = Math.round(data.reduce((s, r) => s + r.wpm, 0) / data.length);
          const avgAcc = Math.round(data.reduce((s, r) => s + r.accuracy, 0) / data.length);
          setPrevAvg({ wpm: avgWpm, accuracy: avgAcc });
        }
      });
  }, [user, deckId, session]);

  if (!session) {
    return (
      <div className="flex items-center justify-center py-20">
        <p style={{ color: 'var(--muted)' }}>No session data found</p>
      </div>
    );
  }

  const rating = getRating(session.composite_score, t);

  // Build card variation data
  const cardVariation = (session.cardResults ?? []).map((cr) => {
    const cardInfo = (session.cards ?? []).find((c) => c.id === cr.card_id);
    return {
      label: cardInfo?.front ?? cr.card_id.slice(0, 8),
      wpm: cr.wpm,
      accuracy: cr.accuracy,
    };
  });

  return (
    <main className="max-w-lg mx-auto px-4 py-12 text-center">
      {/* Personal Best Banner */}
      {session.pbRecords && session.pbRecords.length > 0 && (
        <PersonalBestBanner records={session.pbRecords} />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: rating.color }}>
          {rating.label}
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{t.resultsTitle}</p>
      </div>

      <div
        className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-8"
        style={{ border: `4px solid ${rating.color}` }}
      >
        <div>
          <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
            {session.composite_score}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Score</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: t.accuracyLabel, value: `${session.accuracy}%`, color: 'var(--correct)' },
          { label: t.speedLabel, value: `${session.wpm} WPM`, color: 'var(--accent)' },
          { label: t.correctLabel, value: `${session.card_count}`, color: 'var(--text)' },
          { label: t.timeLabel, value: formatTime(session.duration_ms), color: 'var(--text)' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Level-up notifications */}
      {session.levelUps && session.levelUps.length > 0 && (
        <div
          className="px-4 py-3 rounded-xl mb-6 text-left"
          style={{
            background: 'rgba(96,165,250,0.1)',
            border: '1px solid rgba(96,165,250,0.3)',
          }}
        >
          <p className="text-sm font-bold mb-2" style={{ color: 'var(--accent)' }}>
            Level Up!
          </p>
          <div className="flex flex-wrap gap-2">
            {session.levelUps.map((lu) => {
              const card = (session.cards ?? []).find((c) => c.id === lu.cardId);
              return (
                <span
                  key={lu.cardId}
                  className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span className="truncate" style={{ maxWidth: 100, color: 'var(--text)' }}>
                    {card?.front ?? '...'}
                  </span>
                  <MasteryBadge level={lu.level} confidence={0} compact />
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* WPM Variation Chart */}
      {cardVariation.length > 1 && (
        <div
          className="p-4 rounded-xl mb-6 text-left"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
            Card Performance
          </h3>
          <WpmVariationChart cards={cardVariation} />
        </div>
      )}

      {/* Session Comparison */}
      {prevAvg && (
        <div
          className="px-4 py-3 rounded-xl mb-6 text-left"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
            {t.vsLastSession ?? 'vs Previous'}
          </h3>
          <div className="flex gap-6 text-sm">
            <ComparisonStat label="WPM" current={session.wpm} previous={prevAvg.wpm} />
            <ComparisonStat label={t.accuracyLabel} current={session.accuracy} previous={prevAvg.accuracy} suffix="%" />
          </div>
        </div>
      )}

      {/* Error Patterns */}
      {(() => {
        const resultsWithText = (session.cardResults ?? []).filter(
          (cr) => cr.typed_text && cr.target_text && cr.accuracy < 100,
        );
        if (resultsWithText.length === 0) return null;
        const patterns = analyzeErrorPatterns(
          resultsWithText as { typed_text: string; target_text: string }[],
        );
        if (patterns.length === 0) return null;
        return (
          <div
            className="px-4 py-3 rounded-xl mb-6 text-left"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
              {t.commonMistakes ?? 'Common Mistakes'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {patterns.map((p, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-mono"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                  <span style={{ color: 'var(--correct)' }}>{p.expected}</span>
                  <span style={{ color: 'var(--muted)' }}>→</span>
                  <span style={{ color: 'var(--incorrect)' }}>{p.actual}</span>
                  <span style={{ color: 'var(--muted)' }}>×{p.count}</span>
                </span>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Wrong Cards Review */}
      {session.cardResults && session.cards && (
        <WrongCardsReview
          cardResults={session.cardResults as { card_id: string; wpm: number; accuracy: number; typed_text: string; target_text: string }[]}
          cards={session.cards}
        />
      )}

      <div className="flex flex-col gap-3">
        <Link
          href={`/deck/${deckId}/practice?mode=${session.mode}`}
          className="px-6 py-3 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {t.practiceAgain}
        </Link>
        <Link
          href={`/deck/${deckId}`}
          className="px-6 py-3 rounded-xl text-sm font-medium no-underline transition-opacity hover:opacity-80"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          {t.backToDeck}
        </Link>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <>
      <TopToolbar />
      <Suspense fallback={<div className="flex items-center justify-center py-20"><p style={{ color: 'var(--muted)' }}>Loading...</p></div>}>
        <ResultsContent />
      </Suspense>
    </>
  );
}
