'use client';
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { createBrowserClient } from '@/lib/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { FREE_CARDS_PER_DECK } from '@/lib/constants';
import { extractWords } from '@/lib/text-parser';
import { detectLang, type ScriptLang } from '@/lib/lang-detect';
import { MediaTabContent, type MediaCardsResult } from '@/components/MediaTabContent';

// ─── Types ──────────────────────────────────────────────────────────────

type Tab = 'url' | 'text' | 'manual' | 'media';
type ExtractState = 'idle' | 'extracting' | 'words' | 'looking_up' | 'editing' | 'saving';

interface WordEntry {
  id: number;
  front: string;
  back: string;
  pronunciation: string;
  status: 'pending' | 'found' | 'not_found' | 'manual';
}

interface ManualRow {
  id: number;
  front: string;
  back: string;
  pronunciation: string;
}

const TARGET_LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
];

// ─── Component ──────────────────────────────────────────────────────────

export default function CreateDeckPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const router = useRouter();

  // Stable ID counter (survives re-renders, safe with Strict Mode)
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  const makeManualRow = (): ManualRow => ({ id: nextId(), front: '', back: '', pronunciation: '' });

  // --- Shared ---
  const [tab, setTab] = useState<Tab>('url');
  const [deckName, setDeckName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // --- URL Tab ---
  const [url, setUrl] = useState('');
  const [extractState, setExtractState] = useState<ExtractState>('idle');
  const [extractedText, setExtractedText] = useState('');
  const [extractedTitle, setExtractedTitle] = useState('');

  // --- Text Tab ---
  const [rawText, setRawText] = useState('');

  // --- Shared for URL/Text ---
  const [detectedLang, setDetectedLang] = useState<ScriptLang>('en');
  const [targetLang, setTargetLang] = useState('en');
  const [wordEntries, setWordEntries] = useState<WordEntry[]>([]);
  const [lookupProgress, setLookupProgress] = useState(0);

  // --- Manual Tab ---
  const [manualRows, setManualRows] = useState<ManualRow[]>(() =>
    Array.from({ length: 5 }, makeManualRow)
  );
  const tableRef = useRef<HTMLDivElement>(null);
  const mediaCardsRef = useRef<MediaCardsResult[]>([]);

  const filledManualRows = manualRows.filter((r) => r.front.trim() || r.back.trim());
  const manualAtLimit = !isPro && manualRows.length >= FREE_CARDS_PER_DECK;

  // ─── URL Extraction ────────────────────────────────────────────────────

  const handleExtractUrl = useCallback(async () => {
    if (!url.trim()) return;
    setError('');
    setExtractState('extracting');
    try {
      const res = await fetch('/api/extract-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to extract text');
        setExtractState('idle');
        return;
      }
      setExtractedText(data.text);
      setExtractedTitle(data.title || '');
      setDetectedLang(data.lang);
      // Auto-set target language: if detected lang is not English, target is English; otherwise Korean
      setTargetLang(data.lang === 'en' ? 'ko' : 'en');
      if (!deckName && data.title) setDeckName(data.title);
      setExtractState('words');
    } catch {
      setError('Failed to connect to server');
      setExtractState('idle');
    }
  }, [url, deckName]);

  // ─── Extract Words (shared between URL and Text tabs) ──────────────────

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

  const handleExtractFromExtracted = useCallback(() => {
    if (!extractedText.trim()) return;
    handleExtractWords(extractedText, detectedLang);
  }, [extractedText, detectedLang, handleExtractWords]);

  // ─── Lookup Meanings ───────────────────────────────────────────────────

  // Keep a ref to wordEntries so the async loop always reads the latest snapshot
  const wordEntriesRef = useRef(wordEntries);
  wordEntriesRef.current = wordEntries;

  const handleLookup = useCallback(async () => {
    // Read pending words from the ref to avoid stale closure during the async loop
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
          body: JSON.stringify({
            words: chunk,
            sourceLang: detectedLang,
            targetLang,
          }),
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
            })
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
      prev.map((w) => (w.id === id ? { ...w, [field]: value, status: field === 'front' ? 'manual' : w.status } : w))
    );
  };

  const deleteWord = (id: number) => {
    setWordEntries((prev) => prev.filter((w) => w.id !== id));
  };

  const addWord = () => {
    setWordEntries((prev) => [
      ...prev,
      { id: nextId(), front: '', back: '', pronunciation: '', status: 'manual' },
    ]);
  };

  // ─── Manual Tab Editing ────────────────────────────────────────────────

  const updateManualRow = (id: number, field: keyof Omit<ManualRow, 'id'>, value: string) => {
    setManualRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const deleteManualRow = (id: number) => {
    setManualRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  };

  const addManualRows = (n: number) => {
    if (manualAtLimit) return;
    const toAdd = isPro ? n : Math.min(n, FREE_CARDS_PER_DECK - manualRows.length);
    setManualRows((prev) => [...prev, ...Array.from({ length: toAdd }, makeManualRow)]);
    setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
  };

  // ─── Save Deck ─────────────────────────────────────────────────────────

  const getCardsToSave = (): { front: string; back: string; pronunciation: string; extra: string; noteType: string }[] => {
    if (tab === 'media') {
      return mediaCardsRef.current.map((c) => ({
        front: c.front.trim(),
        back: c.back.trim(),
        pronunciation: c.pronunciation.trim(),
        extra: c.extra.trim(),
        noteType: c.noteType,
      }));
    }
    if (tab === 'manual') {
      return filledManualRows.map((r) => ({
        front: r.front.trim(),
        back: r.back.trim(),
        pronunciation: r.pronunciation.trim(),
        extra: '',
        noteType: 'Basic',
      }));
    }
    return wordEntries
      .filter((w) => w.front.trim())
      .map((w) => ({
        front: w.front.trim(),
        back: w.back.trim(),
        pronunciation: w.pronunciation.trim(),
        extra: '',
        noteType: 'Basic',
      }));
  };

  const handleSave = async () => {
    const cards = getCardsToSave();
    if (!deckName.trim()) { setError(t.deckNameRequired); return; }
    if (cards.length === 0) { setError(t.cardsRequired); return; }
    setError('');
    setSaving(true);

    if (!user) {
      // Guest: save to sessionStorage and go to practice
      try {
        sessionStorage.setItem(
          'atype-guest-deck',
          JSON.stringify({ name: deckName.trim(), cards })
        );
      } catch { /* ignore */ }
      router.push('/practice/guest');
      return;
    }

    const supabase = createBrowserClient();
    const cardsToSave = isPro ? cards : cards.slice(0, FREE_CARDS_PER_DECK);

    const { data: deck, error: deckErr } = await supabase
      .from('decks')
      .insert({
        user_id: user.id,
        name: deckName.trim(),
        card_count: cardsToSave.length,
        note_type: cardsToSave.some((c) => c.noteType === 'Cloze') ? 'Cloze' : 'Basic',
        tags: [],
      })
      .select()
      .single();

    if (deckErr || !deck) {
      setError(deckErr?.message ?? 'Failed to create deck');
      setSaving(false);
      return;
    }

    const BATCH = 100;
    let cardInsertFailed = false;
    for (let i = 0; i < cardsToSave.length; i += BATCH) {
      const batch = cardsToSave.slice(i, i + BATCH).map((card, idx) => ({
        deck_id: deck.id,
        front: card.front,
        back: card.back,
        pronunciation: card.pronunciation,
        extra: card.extra,
        note_type: card.noteType,
        sort_order: i + idx,
      }));
      const { error: cardsErr } = await supabase.from('cards').insert(batch);
      if (cardsErr) {
        cardInsertFailed = true;
        break;
      }
    }

    // Rollback: delete orphaned deck + any partial cards on failure
    if (cardInsertFailed) {
      await supabase.from('cards').delete().eq('deck_id', deck.id);
      await supabase.from('decks').delete().eq('id', deck.id);
      setError(t.cardSaveError);
      setSaving(false);
      return;
    }

    setSaving(false);
    router.push(`/deck/${deck.id}`);
  };

  const handleMediaCardsReady = (cards: MediaCardsResult[]) => {
    mediaCardsRef.current = cards;
    handleSave();
  };

  // ─── Render ────────────────────────────────────────────────────────────

  const cardCount = tab === 'manual' ? filledManualRows.length : wordEntries.filter((w) => w.front.trim()).length;

  return (
    <>
      <TopToolbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {t.createDeckTitle}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              {t.createDeckSubtitle}
            </p>
          </div>
          {(tab === 'manual' || extractState === 'editing') && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? t.savingLabel : `${t.saveDeck} (${cardCount})`}
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full mb-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {([
            { key: 'url' as const, label: '🔗 URL' },
            { key: 'text' as const, label: '📝 Text' },
            { key: 'manual' as const, label: '✏️ Manual' },
            { key: 'media' as const, label: '🎬 Media' },
          ]).map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => {
                setTab(tabItem.key);
                setError('');
                // Reset extract state when switching tabs to prevent cross-tab state corruption
                if (tabItem.key !== tab && extractState !== 'idle') {
                  setExtractState('idle');
                  setWordEntries([]);
                }
              }}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: tab === tabItem.key ? 'var(--accent)' : 'transparent',
                color: tab === tabItem.key ? '#fff' : 'var(--muted)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tabItem.label}
            </button>
          ))}
        </div>

        {/* Deck Name — always visible */}
        <div className="mb-6">
          <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted)' }}>
            {t.deckNameLabel} *
          </label>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder={t.deckNamePlaceholder}
            className="w-full px-4 py-2.5 rounded-xl text-sm"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              outline: 'none',
              maxWidth: 400,
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="px-4 py-3 rounded-xl text-sm mb-4"
            style={{
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.3)',
              color: 'var(--incorrect)',
            }}
          >
            {error}
          </div>
        )}

        {/* ═══ URL Tab ═══ */}
        {tab === 'url' && (
          <div>
            {/* URL Input */}
            {(extractState === 'idle' || extractState === 'extracting') && (
              <div
                className="rounded-xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <label className="text-xs font-medium block mb-2" style={{ color: 'var(--muted)' }}>
                  Paste a URL to extract vocabulary
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://en.wikipedia.org/wiki/..."
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      outline: 'none',
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleExtractUrl(); }}
                    disabled={extractState === 'extracting'}
                  />
                  <button
                    onClick={handleExtractUrl}
                    disabled={extractState === 'extracting' || !url.trim()}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 whitespace-nowrap"
                    style={{
                      background: 'var(--accent)',
                      color: '#fff',
                      border: 'none',
                      cursor: extractState === 'extracting' ? 'not-allowed' : 'pointer',
                      opacity: extractState === 'extracting' || !url.trim() ? 0.6 : 1,
                    }}
                  >
                    {extractState === 'extracting' ? 'Extracting...' : 'Extract'}
                  </button>
                </div>
                {extractState === 'extracting' && (
                  <div className="flex items-center gap-2 mt-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: 'var(--border)', borderTopColor: 'transparent' }}
                    />
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>
                      Fetching page content...
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Extracted Text Preview */}
            {extractState === 'words' && (
              <div
                className="rounded-xl p-6 mb-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                      {extractedTitle || 'Extracted Text'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      Language: {detectedLang.toUpperCase()} &middot; {extractedText.length.toLocaleString()} chars
                    </p>
                  </div>
                  <button
                    onClick={() => { setExtractState('idle'); setExtractedText(''); }}
                    className="text-xs px-3 py-1 rounded-lg"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer' }}
                  >
                    ← Back
                  </button>
                </div>
                <textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  rows={8}
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={handleExtractFromExtracted}
                    className="px-5 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                    style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Extract Words →
                  </button>
                </div>
              </div>
            )}

            {/* Word Editing UI (shared) */}
            {(extractState === 'editing' || extractState === 'looking_up') && (
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
                onBack={() => {
                  setExtractState('words');
                  setWordEntries([]);
                }}
              />
            )}
          </div>
        )}

        {/* ═══ Text Tab ═══ */}
        {tab === 'text' && (
          <div>
            {(extractState === 'idle' || extractState === 'extracting') && (
              <div
                className="rounded-xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
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
                <button
                  onClick={handleExtractFromText}
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
                  Extract Words →
                </button>
              </div>
            )}

            {/* Word Editing UI (shared) */}
            {(extractState === 'editing' || extractState === 'looking_up') && (
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
                onBack={() => {
                  setExtractState('idle');
                  setWordEntries([]);
                }}
              />
            )}
          </div>
        )}

        {/* ═══ Manual Tab ═══ */}
        {tab === 'manual' && (
          <div>
            {/* Table */}
            <div ref={tableRef} className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
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
                <span>{t.columnFront}</span>
                <span>{t.columnBack}</span>
                <span>{t.columnPronunciation}</span>
                <span />
              </div>

              <div style={{ background: 'var(--surface)' }}>
                {manualRows.map((row, i) => (
                  <div
                    key={row.id}
                    className="grid items-center px-3 py-1.5"
                    style={{
                      gridTemplateColumns: '36px 1fr 1fr 1fr 32px',
                      gap: '8px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span className="text-xs text-center" style={{ color: 'var(--muted)' }}>{i + 1}</span>
                    <input
                      type="text"
                      value={row.front}
                      onChange={(e) => updateManualRow(row.id, 'front', e.target.value)}
                      placeholder="Word"
                      className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        outline: 'none',
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Tab' && !e.shiftKey && i === manualRows.length - 1 && !manualAtLimit) {
                          e.preventDefault();
                          addManualRows(1);
                        }
                      }}
                    />
                    <input
                      type="text"
                      value={row.back}
                      onChange={(e) => updateManualRow(row.id, 'back', e.target.value)}
                      placeholder="Meaning"
                      className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                    />
                    <input
                      type="text"
                      value={row.pronunciation}
                      onChange={(e) => updateManualRow(row.id, 'pronunciation', e.target.value)}
                      placeholder="Pronunciation"
                      className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                    />
                    <button
                      onClick={() => deleteManualRow(row.id)}
                      className="flex items-center justify-center rounded-lg w-7 h-7 transition-opacity hover:opacity-80"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                      aria-label="Delete row"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Row Buttons */}
            <div className="flex items-center gap-2 mb-8">
              {!manualAtLimit && (
                <>
                  <button
                    onClick={() => addManualRows(1)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
                  >
                    {t.addRow}
                  </button>
                  <button
                    onClick={() => addManualRows(10)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
                  >
                    {t.addTenRows}
                  </button>
                </>
              )}
              <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>
                {manualRows.length}{!isPro && ` / ${FREE_CARDS_PER_DECK}`}
                {manualAtLimit && <span style={{ color: '#fbbf24' }}> {t.maxLabel}</span>}
              </span>
            </div>
          </div>
        )}

        {/* ═══ Media Tab ═══ */}
        {tab === 'media' && (
          <MediaTabContent
            deckName={deckName}
            setDeckName={setDeckName}
            onCardsReady={handleMediaCardsReady}
            isPro={isPro}
          />
        )}

        {/* Saving overlay */}
        {saving && (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin mb-4"
              style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
            />
            <p className="font-medium" style={{ color: 'var(--text)' }}>{t.savingLabel}</p>
          </div>
        )}
      </main>
    </>
  );
}

// ─── Word Editing UI Component ──────────────────────────────────────────

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
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {TARGET_LANGS.filter((l) => l.code !== detectedLang).map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
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
          {extractState === 'looking_up'
            ? `Looking up... ${lookupProgress}%`
            : `Look Up Meanings (${pendingCount})`}
        </button>

        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          {entries.length} words
        </span>
      </div>

      {/* Progress bar during lookup */}
      {extractState === 'looking_up' && (
        <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${lookupProgress}%`, background: 'var(--accent)' }}
          />
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
              style={{
                gridTemplateColumns: '36px 1fr 1fr 1fr 32px',
                gap: '8px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span className="text-xs text-center" style={{ color: 'var(--muted)' }}>{i + 1}</span>
              <input
                type="text"
                value={entry.front}
                onChange={(e) => onUpdate(entry.id, 'front', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  outline: 'none',
                }}
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
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => onDelete(entry.id)}
                className="flex items-center justify-center rounded-lg w-7 h-7 transition-opacity hover:opacity-80"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                aria-label="Delete word"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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
