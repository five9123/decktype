'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

interface ErrorPattern {
  expected: string;
  actual: string;
  count: number;
}

interface AiCoachingTipProps {
  accuracy: number;
  wpm: number;
  compositeScore: number;
  errorPatterns?: ErrorPattern[];
  mode?: string;
  sourceLang?: string | null;
}

export function AiCoachingTip({ accuracy, wpm, compositeScore, errorPatterns, mode, sourceLang }: AiCoachingTipProps) {
  const { t } = useLanguage();
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null);

  const handleGetTips = async () => {
    setLoading(true);
    setError('');
    trackEvent('coaching_tip_requested', { accuracy, wpm, score: compositeScore });

    try {
      const res = await fetch('/api/coaching-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accuracy,
          wpm,
          composite_score: compositeScore,
          errorPatterns: errorPatterns ?? [],
          mode,
          sourceLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error === 'quota_exceeded' ? t.aiQuotaWarning : (t.aiCoachingError));
      } else {
        setTips(data.tips ?? []);
        setQuotaRemaining(data.quotaRemaining ?? null);
      }
    } catch {
      setError(t.aiCoachingError);
    }
    setLoading(false);
  };

  return (
    <div
      className="px-3 sm:px-4 py-3 sm:py-4 rounded-xl mb-4 sm:mb-6 text-left"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium" style={{ color: 'var(--text)' }}>{t.aiCoachingTitle}</h3>
        {quotaRemaining !== null && (
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{t.aiTipsRemaining.replace('{n}', String(quotaRemaining))}</span>
        )}
      </div>

      {tips.length === 0 && !error && (
        <button
          onClick={handleGetTips}
          disabled={loading}
          className="w-full py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            background: loading ? 'var(--surface2)' : 'var(--accent)',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? t.aiCoachingLoading : t.getAiTips}
        </button>
      )}

      {error && (
        <div className="space-y-2">
          <p className="text-xs" style={{ color: 'var(--incorrect)' }}>{error}</p>
          <button
            onClick={handleGetTips}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
          >
            {t.retryBtn ?? 'Retry'}
          </button>
        </div>
      )}

      {tips.length > 0 && (
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text)' }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{i + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
