'use client';
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { createBrowserClient } from '@/lib/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { FREE_CARDS_PER_DECK, TARGET_LANGS } from '@/lib/constants';
import { STORAGE_KEY_GUEST_DECK } from '@/lib/storage-keys';
import { extractWords } from '@/lib/text-parser';
import { detectLang, type ScriptLang } from '@/lib/lang-detect';
import { MediaTabContent, type MediaCardsResult } from '@/components/MediaTabContent';
import { UploadTabContent } from '@/components/UploadTabContent';

// ─── Types ──────────────────────────────────────────────────────────────

type Tab = 'text' | 'media' | 'upload';
type ExtractState = 'idle' | 'looking_up' | 'editing' | 'saving';

interface WordEntry {
  id: number;
  front: string;
  back: string;
  pronunciation: string;
  status: 'pending' | 'found' | 'not_found' | 'manual';
}

// ─── Component ──────────────────────────────────────────────────────────

export default function CreateDeckPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const router = useRouter();

  // Stable ID counter (survives re-renders, safe with Strict Mode)
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  // --- Shared ---
  const [tab, setTab] = useState<Tab>('media');
  const [deckName, setDeckName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [extractState, setExtractState] = useState<ExtractState>('idle');

  // --- Text Tab ---
  const [rawText, setRawText] = useState('');
  const [textAiMode, setTextAiMode] = useState(false);
  const [textAiProcessing, setTextAiProcessing] = useState(false);
  const [textAiError, setTextAiError] = useState('');

  // --- Shared for URL/Text ---
  const [detectedLang, setDetectedLang] = useState<ScriptLang>('en');
  const [targetLang, setTargetLang] = useState('en');
  const [wordEntries, setWordEntries] = useState<WordEntry[]>([]);
  const [lookupProgress, setLookupProgress] = useState(0);

  const mediaCardsRef = useRef<MediaCardsResult[]>([]);
  const [mediaSourceLang, setMediaSourceLang] = useState<string | null>(null);

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

  // ─── AI Analyze (Text Tab) ───────────────────────────────────────────

  const handleTextAiAnalyze = useCallback(async () => {
    if (!rawText.trim()) return;
    setError('');
    setTextAiError('');
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
        // Handle auth/quota errors with actionable messages
        if (data.code === 'AUTH_REQUIRED') {
          setTextAiError('Sign in to use AI features. Use "Extract Words" for free word extraction.');
        } else if (data.code === 'QUOTA_EXCEEDED') {
          setTextAiError(data.error);
        } else {
          setTextAiError(data.error);
        }
        setTextAiProcessing(false);
        setTextAiMode(false);
        return;
      }

      // vocabulary → WordEntry (Basic cards)
      const vocabEntries: WordEntry[] = (data.vocabulary ?? []).map((v: { word: string; translation: string; pronunciation: string; context: string }) => ({
        id: nextId(),
        front: v.word,
        back: v.translation,
        pronunciation: v.pronunciation,
        status: 'found' as const,
      }));

      // cloze → store in mediaCardsRef for getCardsToSave()
      const clozeCards: MediaCardsResult[] = (data.cloze ?? []).map((c: { sentence_with_blank: string; answer: string; hint: string; full_sentence: string }) => ({
        front: (c.sentence_with_blank ?? '').trim(),
        back: (c.answer ?? '').trim(),
        pronunciation: (c.hint ?? '').trim(),
        extra: (c.full_sentence ?? '').trim(),
        noteType: 'Cloze' as const,
      }));

      mediaCardsRef.current = clozeCards;
      setWordEntries(vocabEntries);
      setExtractState('editing');
    } catch {
      setTextAiError('Failed to connect to AI service. Please try again.');
    }
    setTextAiProcessing(false);
  }, [rawText]);

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
    // Text tab with AI mode: combine vocabulary (Basic) + cloze cards
    if (tab === 'text' && textAiMode) {
      const basics = wordEntries
        .filter((w) => w.front.trim())
        .map((w) => ({
          front: w.front.trim(),
          back: w.back.trim(),
          pronunciation: w.pronunciation.trim(),
          extra: '',
          noteType: 'Basic',
        }));
      const clozes = mediaCardsRef.current.map((c) => ({
        front: c.front.trim(),
        back: c.back.trim(),
        pronunciation: c.pronunciation.trim(),
        extra: c.extra.trim(),
        noteType: c.noteType,
      }));
      return [...basics, ...clozes];
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
          STORAGE_KEY_GUEST_DECK,
          JSON.stringify({ name: deckName.trim(), cards, sourceLang: tab === 'media' ? mediaSourceLang : detectedLang || null })
        );
      } catch { /* ignore */ }
      router.push('/practice/guest');
      return;
    }

    const supabase = createBrowserClient();
    const cardsToSave = isPro ? cards : cards.slice(0, FREE_CARDS_PER_DECK);

    // Determine source language: Media tab uses its own state; Text tab uses detectedLang
    const sourceLangToSave = tab === 'media' ? mediaSourceLang : detectedLang || null;

    const { data: deck, error: deckErr } = await supabase
      .from('decks')
      .insert({
        user_id: user.id,
        name: deckName.trim(),
        card_count: cardsToSave.length,
        note_type: cardsToSave.some((c) => c.noteType === 'Cloze') ? 'Cloze' : 'Basic',
        tags: [],
        source_lang: sourceLangToSave,
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

  const cardCount = wordEntries.filter((w) => w.front.trim()).length
    + (textAiMode ? mediaCardsRef.current.length : 0);

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
          {extractState === 'editing' && (
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
            { key: 'media' as const, label: '🎬 Media' },
            { key: 'text' as const, label: '📝 Text' },
            { key: 'upload' as const, label: '📦 Anki' },
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
                  setTextAiMode(false);
                  setTextAiError('');
                  mediaCardsRef.current = [];
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
            maxLength={20}
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

        {/* ═══ Text Tab ═══ */}
        {tab === 'text' && (
          <div>
            {extractState === 'idle' && !textAiProcessing && (
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
                {textAiError && (
                  <div
                    className="px-4 py-3 rounded-xl text-sm mb-3"
                    style={{
                      background: 'rgba(248,113,113,0.1)',
                      border: '1px solid rgba(248,113,113,0.3)',
                      color: 'var(--incorrect)',
                    }}
                  >
                    {textAiError}
                  </div>
                )}
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
                    {!user
                      ? 'Sign in to use AI analysis'
                      : `AI-powered vocabulary + cloze cards (${isPro ? '50' : '3'}/day)`}
                  </span>
                </div>
              </div>
            )}

            {/* AI Processing spinner */}
            {textAiProcessing && (
              <div className="flex flex-col items-center justify-center py-20">
                <div
                  className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin mb-4"
                  style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
                />
                <p className="font-medium" style={{ color: 'var(--text)' }}>Analyzing with AI...</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Extracting vocabulary and generating cloze cards</p>
              </div>
            )}

            {/* Word Editing UI (shared) */}
            {(extractState === 'editing' || extractState === 'looking_up') && !textAiProcessing && (
              <div>
                {/* Cloze card count indicator for AI mode */}
                {textAiMode && mediaCardsRef.current.length > 0 && (
                  <div
                    className="px-4 py-3 rounded-xl text-sm mb-4"
                    style={{
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      color: 'var(--text)',
                    }}
                  >
                    ✨ AI generated <strong>{wordEntries.length}</strong> vocabulary cards + <strong>{mediaCardsRef.current.length}</strong> cloze cards
                  </div>
                )}
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
                    setTextAiMode(false);
                    setTextAiError('');
                    mediaCardsRef.current = [];
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* ═══ Media Tab ═══ */}
        {tab === 'media' && (
          <MediaTabContent
            deckName={deckName}
            setDeckName={setDeckName}
            onCardsReady={handleMediaCardsReady}
            onSourceLangChange={setMediaSourceLang}
            isPro={isPro}
          />
        )}

        {/* ═══ Upload Tab ═══ */}
        {tab === 'upload' && <UploadTabContent />}

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
