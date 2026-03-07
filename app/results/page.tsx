'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { PersonalBestBanner } from '@/components/PersonalBestBanner';
import { WpmVariationChart } from '@/components/charts/WpmVariationChart';
import { MasteryBadge } from '@/components/MasteryBadge';
import type { MasteryLevel } from '@/types';

interface CardResult {
  card_id: string;
  wpm: number;
  accuracy: number;
  time_ms: number;
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

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

function ResultsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('deck');

  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('atype__session');
      if (raw) setSession(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

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
