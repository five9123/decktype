'use client';

import { useState, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TARGET_LANGS } from '@/lib/constants';
import { extractWords } from '@/lib/text-parser';
import { detectLang, type ScriptLang } from '@/lib/lang-detect';
import { friendlyError } from '@/lib/api-errors';
import { ErrorAlert } from '@/components/ErrorAlert';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { MediaCardsResult } from '@/components/MediaTabContent';

// ─── Types ──────────────────────────────────────────────────────────────

type ExtractState = 'idle' | 'looking_up' | 'editing';

interface WordEntry {
  id: number;
  front: string;
  back: string;
  pronunciation: string;
  status: 'pending' | 'found' | 'not_found' | 'manual';
}

export interface CardData {
  front: string;
  back: string;
  pronunciation: string;
  extra: string;
  noteType: string;
}

interface Props {
  onSave: (cards: CardData[], sourceLang: string) => void;
  isPro: boolean;
}

// ─── Component ──────────────────────────────────────────────────────────

export function TextTabContent({ onSave, isPro }: Props) {
  const { user } = useAuth();

  // Stable ID counter
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  // State
  const [rawText, setRawText] = useState('');
  const [extractState, setExtractState] = useState<ExtractState>('idle');
  const [textAiMode, setTextAiMode] = useState(false);
  const [textAiProcessing, setTextAiProcessing] = useState(false);
  const [error, setError] = useState('');
  const [detectedLang, setDetectedLang] = useState<ScriptLang>('en');
  const [targetLang, setTargetLang] = useState('en');
  const [wordEntries, setWordEntries] = useState<WordEntry[]>([]);
  const [lookupProgress, setLookupProgress] = useState(0);

  const mediaCardsRef = useRef<MediaCardsResult[]>([]);

  // ─── Extract Words ─────────────────────────────────────────────────────

  const handleExtractWords = useCallback((text: string, lang?: ScriptLang) => {
    const { words, lang: detected } = extractWords(text, lang);
    setDetectedLang(detected);
    if (!lang) {
      setTargetLang(detected === 'en' ? 'ko' : 'en');
    }
    const entries: WordEntry[] = words.map((w) => ({
      id: nextId(),
      front: w.word,
      back: '',
      pronunciation: '',
      status: 'pending' as const,
    }));
    setWordEntries(entries);
    setExtractState('editing');
  }, []);

  const handleExtractFromText = useCallback(() => {
    if (!rawText.trim()) return;
    setError('');
    const detected = detectLang(rawText);
    setDetectedLang(detected);
    setTargetLang(detected === 'en' ? 'ko' : 'en');
    handleExtractWords(rawText, detected);
  }, [rawText, handleExtractWords]);

  // ─── AI Analyze ────────────────────────────────────────────────────────

  const handleTextAiAnalyze = useCallback(async () => {
    if (textAiProcessing) return;
    if (!rawText.trim()) return;
    setError('');
    const detected = detectLang(rawText);
    setDetectedLang(detected);
    const target = detected === 'en' ? 'ko' : 'en';
    setTargetLang(target);
    setTextAiMode(true);
    setTextAiProcessing(true);

    try {
      const res = await fetch('/api/process-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: rawText.slice(0, 8000),
          sourceLang: detected,
          targetLang: target,
          mode: 'both',
          maxWords: 30,
        }),
      });
      const data = await res.json();

      if (data.error) {
        if (data.code === 'AUTH_REQUIRED') {
          setError('Sign in to use AI features. Use "Extract Words" for free word extraction.');
        } else {
          setError(friendlyError(data.error, data.code));
        }
        setTextAiProcessing(false);
        setTextAiMode(false);
        return;
      }

      const vocabEntries: WordEntry[] = (data.vocabulary ?? []).map(
        (v: { word: string; translation: string; pronunciation: string; context: string }) => ({
          id: nextId(),
          front: v.word,
          back: v.translation,
          pronunciation: v.pronunciation,
          status: 'found' as const,
        }),
      );

      const clozeCards: MediaCardsResult[] = (data.cloze ?? [])
        .map((c: { sentence_with_blank: string; answer: string; hint: string; full_sentence: string }) => ({
          front: (c.sentence_with_blank ?? '').trim(),
          back: (c.answer ?? '').trim(),
          pronunciation: (c.hint ?? '').trim(),
          extra: (c.full_sentence ?? '').trim(),
          noteType: 'Cloze' as const,
        }))
        .filter((c: MediaCardsResult) => c.front && c.back);

      if (vocabEntries.length === 0 && clozeCards.length === 0) {
        setError('AI could not extract cards from this text. Try different content.');
        setTextAiMode(false);
        setTextAiProcessing(false);
        return;
      }

      mediaCardsRef.current = clozeCards;
      setWordEntries(vocabEntries);
      setExtractState('editing');
    } catch {
      setError('Failed to connect to AI service. Please try again.');
    }
    setTextAiProcessing(false);
  }, [rawText, textAiProcessing]);

  // ─── Lookup Meanings ───────────────────────────────────────────────────

  const wordEntriesRef = useRef(wordEntries);
  wordEntriesRef.current = wordEntries;

  const handleLookup = useCallback(async () => {
    const pending = wordEntriesRef.current.filter((w) => w.status === 'pending' && w.front.trim());
    if (pending.length === 0) return;

    setExtractState('looking_up');
    setLookupProgress(0);

    const BATCH = 20;
    const words = pending.map((w) => w.front);
    let completed = 0;

    for (let i = 0; i < words.length; i += BATCH) {
      const chunk = words.slice(i, i + BATCH);
      try {
        const res = await fetch('/api/lookup-words', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ words: chunk, sourceLang: detectedLang, targetLang }),
        });
        if (res.ok) {
          const data = await res.json();
          const results: { word: string; meaning: string; pronunciation: string }[] = data.results;
          setWordEntries((prev) =>
            prev.map((entry) => {
              const match = results.find((r) => r.word === entry.front);
              if (!match) return entry;
              return {
                ...entry,
                back: match.meaning || entry.back,
                pronunciation: match.pronunciation || entry.pronunciation,
                status: match.meaning ? 'found' : 'not_found',
              };
            }),
          );
        }
      } catch {
        // Silently continue — failed words stay as 'pending'
      }
      completed += chunk.length;
      setLookupProgress(Math.round((completed / words.length) * 100));
    }

    setExtractState('editing');
    setLookupProgress(100);
  }, [detectedLang, targetLang]);

  // ─── Word Entry Editing ────────────────────────────────────────────────

  const updateWord = (id: number, field: 'front' | 'back' | 'pronunciation', value: string) => {
    setWordEntries((prev) =>
      prev.map((w) => (w.id === id ? { ...w, [field]: value, status: field === 'front' ? 'manual' : w.status } : w)),
    );
  };

  const deleteWord = (id: number) => {
    setWordEntries((prev) => prev.filter((w) => w.id !== id));
  };

  const addWord = () => {
    setWordEntries((prev) => [...prev, { id: nextId(), front: '', back: '', pronunciation: '', status: 'manual' }]);
  };

  // ─── Save ──────────────────────────────────────────────────────────────

  const handleSave = () => {
    let cards: CardData[];

    if (textAiMode) {
      const basics = wordEntries
        .filter((w) => w.front.trim())
        .map((w) => ({ front: w.front.trim(), back: w.back.trim(), pronunciation: w.pronunciation.trim(), extra: '', noteType: 'Basic' }));
      const clozes = mediaCardsRef.current
        .filter((c) => c.front.trim() && c.back.trim())
        .map((c) => ({ front: c.front.trim(), back: c.back.trim(), pronunciation: c.pronunciation.trim(), extra: c.extra.trim(), noteType: c.noteType }));
      cards = [...basics, ...clozes];
    } else {
      cards = wordEntries
        .filter((w) => w.front.trim())
        .map((w) => ({ front: w.front.trim(), back: w.back.trim(), pronunciation: w.pronunciation.trim(), extra: '', noteType: 'Basic' }));
    }

    onSave(cards, detectedLang);
  };

  const handleBack = () => {
    setExtractState('idle');
    setWordEntries([]);
    setTextAiMode(false);
    setError('');
    mediaCardsRef.current = [];
  };

  // ─── Derived ───────────────────────────────────────────────────────────

  const cardCount = wordEntries.filter((w) => w.front.trim()).length + (textAiMode ? mediaCardsRef.current.length : 0);

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Idle: Text input */}
      {extractState === 'idle' && !textAiProcessing && (
        <div className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <label className="text-xs font-medium block mb-2" style={{ color: 'var(--muted)' }}>
            Paste text to extract vocabulary
          </label>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste any text here — articles, lyrics, study notes..."
            className="w-full px-3 py-2.5 rounded-xl text-sm mb-3"
            rows={10}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
          {rawText.trim() && (
            <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
              Detected language: <strong style={{ color: 'var(--text)' }}>{detectLang(rawText).toUpperCase()}</strong>
              &nbsp;&middot; {rawText.length.toLocaleString()} chars
            </p>
          )}
          {error && <ErrorAlert message={error} onClose={() => setError('')} className="mb-3" />}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExtractFromText}
              disabled={!rawText.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--surface2)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                cursor: !rawText.trim() ? 'not-allowed' : 'pointer',
                opacity: !rawText.trim() ? 0.6 : 1,
              }}
            >
              Extract Words →
            </button>
            <button
              onClick={handleTextAiAnalyze}
              disabled={!rawText.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                cursor: !rawText.trim() ? 'not-allowed' : 'pointer',
                opacity: !rawText.trim() ? 0.6 : 1,
              }}
            >
              ✨ AI Analyze
            </button>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              {!user ? 'Sign in to use AI analysis' : `AI-powered vocabulary + cloze cards (${isPro ? '50' : '3'}/day)`}
            </span>
          </div>
        </div>
      )}

      {/* AI Processing spinner */}
      {textAiProcessing && (
        <LoadingSpinner title="Analyzing with AI..." subtitle="Extracting vocabulary and generating cloze cards" />
      )}

      {/* Word Editing UI */}
      {(extractState === 'editing' || extractState === 'looking_up') && !textAiProcessing && (
        <div>
          {/* Cloze card count indicator for AI mode */}
          {textAiMode && mediaCardsRef.current.length > 0 && (
            <div
              className="px-4 py-3 rounded-xl text-sm mb-4"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--text)' }}
            >
              ✨ AI generated <strong>{wordEntries.length}</strong> vocabulary cards + <strong>{mediaCardsRef.current.length}</strong> cloze cards
            </div>
          )}

          {/* Save button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSave}
              disabled={cardCount === 0}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                cursor: cardCount === 0 ? 'not-allowed' : 'pointer',
                opacity: cardCount === 0 ? 0.6 : 1,
              }}
            >
              Save ({cardCount})
            </button>
          </div>

          <WordEditingUI
            entries={wordEntries}
            detectedLang={detectedLang}
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            extractState={extractState}
            lookupProgress={lookupProgress}
            onUpdate={updateWord}
            onDelete={deleteWord}
            onAdd={addWord}
            onLookup={handleLookup}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
}

// ─── Word Editing UI ──────────────────────────────────────────────────────

function WordEditingUI({
  entries,
  detectedLang,
  targetLang,
  setTargetLang,
  extractState,
  lookupProgress,
  onUpdate,
  onDelete,
  onAdd,
  onLookup,
  onBack,
}: {
  entries: WordEntry[];
  detectedLang: ScriptLang;
  targetLang: string;
  setTargetLang: (lang: string) => void;
  extractState: ExtractState;
  lookupProgress: number;
  onUpdate: (id: number, field: 'front' | 'back' | 'pronunciation', value: string) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  onLookup: () => void;
  onBack: () => void;
}) {
  const pendingCount = entries.filter((w) => w.status === 'pending' && w.front.trim()).length;

  return (
    <div>
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-3 rounded-xl p-4 mb-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <button
          onClick={onBack}
          className="text-xs px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer' }}
        >
          ← Back
        </button>

        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
          <span>{detectedLang.toUpperCase()}</span>
          <span>→</span>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-2 py-1 rounded-lg text-xs"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', outline: 'none' }}
          >
            {TARGET_LANGS.filter((l) => l.code !== detectedLang).map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onLookup}
          disabled={extractState === 'looking_up' || pendingCount === 0}
          className="px-4 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-90 ml-auto"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            cursor: extractState === 'looking_up' || pendingCount === 0 ? 'not-allowed' : 'pointer',
            opacity: extractState === 'looking_up' || pendingCount === 0 ? 0.6 : 1,
          }}
        >
          {extractState === 'looking_up' ? `Looking up... ${lookupProgress}%` : `Look Up Meanings (${pendingCount})`}
        </button>

        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          {entries.length} words
        </span>
      </div>

      {/* Progress bar during lookup */}
      {extractState === 'looking_up' && (
        <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'var(--border)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${lookupProgress}%`, background: 'var(--accent)' }} />
        </div>
      )}

      {/* Word Table */}
      <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
        <div
          className="grid text-xs font-medium px-3 py-2.5"
          style={{
            gridTemplateColumns: '36px 1fr 1fr 1fr 32px',
            gap: '8px',
            background: 'var(--surface2)',
            color: 'var(--muted)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span>#</span>
          <span>Word</span>
          <span>Meaning</span>
          <span>Pronunciation</span>
          <span />
        </div>

        <div style={{ background: 'var(--surface)', maxHeight: 480, overflowY: 'auto' }}>
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="grid items-center px-3 py-1.5"
              style={{ gridTemplateColumns: '36px 1fr 1fr 1fr 32px', gap: '8px', borderBottom: '1px solid var(--border)' }}
            >
              <span className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                {i + 1}
              </span>
              <input
                type="text"
                value={entry.front}
                onChange={(e) => onUpdate(entry.id, 'front', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
              />
              <input
                type="text"
                value={entry.back}
                onChange={(e) => onUpdate(entry.id, 'back', e.target.value)}
                placeholder={entry.status === 'not_found' ? '(not found)' : ''}
                className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                style={{
                  background: 'var(--bg)',
                  border: `1px solid ${entry.status === 'not_found' ? 'rgba(251,191,36,0.4)' : 'var(--border)'}`,
                  color: 'var(--text)',
                  outline: 'none',
                }}
              />
              <input
                type="text"
                value={entry.pronunciation}
                onChange={(e) => onUpdate(entry.id, 'pronunciation', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)', outline: 'none' }}
              />
              <button
                onClick={() => onDelete(entry.id)}
                className="flex items-center justify-center rounded-lg w-7 h-7 transition-opacity hover:opacity-80"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                aria-label="Delete word"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Word Button */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
        >
          + Add Word
        </button>
      </div>
    </div>
  );
}
