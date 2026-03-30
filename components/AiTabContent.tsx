'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { TARGET_LANGS } from '@/lib/constants';
import type { CardToSave } from '@/lib/deck-save';

interface AiTabContentProps {
  onSave: (cards: CardToSave[], sourceLang: string) => void;
  isPro: boolean;
}

type Level = 'beginner' | 'intermediate' | 'advanced';

interface GeneratedCard {
  front: string;
  back: string;
  pronunciation: string;
}

export function AiTabContent({ onSave, isPro }: AiTabContentProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [targetLang, setTargetLang] = useState('ko');
  const [level, setLevel] = useState<Level>('beginner');
  const [cardCount, setCardCount] = useState(10);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [cards, setCards] = useState<GeneratedCard[]>([]);
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) { setError(t.aiTopicRequired ?? 'Please enter a topic'); return; }
    if (!user) { setError(t.signIn); return; }
    setError('');
    setGenerating(true);
    setCards([]);

    try {
      const res = await fetch('/api/deck-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), targetLang, level, cardCount }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'quota_exceeded') {
          setError(t.aiQuotaExceeded ?? `Daily AI limit reached (${data.limit}/${data.limit}). ${data.plan === 'free' ? 'Upgrade to Pro for more.' : 'Try again tomorrow.'}`);
        } else {
          setError(data.error || 'Generation failed');
        }
        return;
      }

      setCards(data.cards);
      if (data.quotaRemaining != null) setQuotaRemaining(data.quotaRemaining);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = () => {
    if (cards.length === 0) return;
    onSave(
      cards.map((c) => ({
        front: c.front,
        back: c.back,
        pronunciation: c.pronunciation,
        extra: '',
        noteType: 'Basic' as const,
      })),
      targetLang,
    );
  };

  const levelLabels: Record<Level, string> = {
    beginner: t.aiBeginner ?? 'Beginner',
    intermediate: t.aiIntermediate ?? 'Intermediate',
    advanced: t.aiAdvanced ?? 'Advanced',
  };

  return (
    <div>
      {/* Input form */}
      <div
        className="p-6 rounded-2xl mb-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {/* Topic */}
        <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted)' }}>
          {t.aiTopicLabel ?? 'Topic'} *
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={t.aiTopicPlaceholder ?? 'e.g., K-POP vocabulary, Travel phrases, Food & cooking...'}
          maxLength={100}
          className="w-full px-4 py-2.5 rounded-xl text-sm mb-5"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            outline: 'none',
          }}
        />

        {/* Language + Level + Count row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {/* Target Language */}
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted)' }}>
              {t.aiTargetLang ?? 'Language'}
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
              }}
            >
              {TARGET_LANGS.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted)' }}>
              {t.aiLevel ?? 'Level'}
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
              }}
            >
              {(['beginner', 'intermediate', 'advanced'] as Level[]).map((l) => (
                <option key={l} value={l}>{levelLabels[l]}</option>
              ))}
            </select>
          </div>

          {/* Card Count */}
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted)' }}>
              {t.aiCardCount ?? 'Cards'}
            </label>
            <select
              value={cardCount}
              onChange={(e) => setCardCount(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
              }}
            >
              {[10, 15, 20, 30].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={generating || !topic.trim()}
          className="px-6 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            cursor: generating ? 'wait' : 'pointer',
          }}
        >
          {generating ? (t.aiGenerating ?? 'Generating...') : (t.aiGenerate ?? 'Generate Cards')}
        </button>

        {quotaRemaining != null && (
          <span className="ml-3 text-xs" style={{ color: 'var(--muted)' }}>
            {t.aiQuotaRemaining ?? 'AI uses remaining'}: {quotaRemaining}/{isPro ? 50 : 5}
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          className="px-4 py-3 rounded-xl text-sm mb-6"
          style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}
        >
          {error}
        </div>
      )}

      {/* Card preview */}
      {cards.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
              {t.aiPreview ?? 'Preview'} ({cards.length} {t.cards})
            </h3>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--correct)', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              {t.saveDeck}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cards.map((card, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-base" style={{ color: 'var(--text)' }}>{card.front}</p>
                    {card.pronunciation && (
                      <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{card.pronunciation}</p>
                    )}
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'var(--surface2, var(--bg))', color: 'var(--muted)' }}>
                    #{i + 1}
                  </span>
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>{card.back}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              className="px-8 py-3 rounded-xl text-base font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              {t.saveDeck} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
