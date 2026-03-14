'use client';

import { useState, useRef, useCallback } from 'react';
import { detectAndParse, type ParsedMedia } from '@/lib/media-parser';
import { detectLang } from '@/lib/lang-detect';
import { useLanguage } from '@/contexts/LanguageContext';
import type { NoteType } from '@/types';

// ── Types ──────────────────────────────────────────────────────────────

type MediaState = 'idle' | 'preview' | 'processing' | 'editing';
type GenerateMode = 'vocabulary' | 'cloze' | 'both';

interface GeneratedCard {
  id: number;
  front: string;
  back: string;
  pronunciation: string;
  extra: string;
  noteType: NoteType;
}

export interface MediaCardsResult {
  front: string;
  back: string;
  pronunciation: string;
  extra: string;
  noteType: NoteType;
}

interface Props {
  deckName: string;
  setDeckName: (name: string) => void;
  onCardsReady: (cards: MediaCardsResult[]) => void;
  isPro: boolean;
}

const TARGET_LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_INPUT_CHARS = 4000;

function friendlyError(msg: string): string {
  if (msg.includes('timeout') || msg.includes('aborted')) {
    return 'Processing timed out. Try reducing the text or lowering the max words count.';
  }
  if (msg.includes('Too many requests') || msg.includes('429')) {
    return 'Too many requests. Please wait a minute and try again. (Limit: 5/min)';
  }
  if (msg.includes('not configured') || msg.includes('OPENAI_API_KEY')) {
    return 'AI processing is not configured on the server.';
  }
  if (msg.includes('OpenAI API error')) {
    return 'AI service error. Please try again in a moment.';
  }
  if (msg.includes('Empty response')) {
    return 'AI returned an empty response. Try with shorter text.';
  }
  if (msg.includes('cut off') || msg.includes('too long')) {
    return 'AI response was too long and got cut off. Try reducing the max words count or using a shorter text.';
  }
  if (msg.includes('invalid JSON') || msg.includes('Unterminated string')) {
    return 'AI returned a malformed response. Please try again — sometimes reducing max words helps.';
  }
  return msg;
}

// ── Component ──────────────────────────────────────────────────────────

export function MediaTabContent({ deckName, setDeckName, onCardsReady, isPro }: Props) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<MediaState>('idle');
  const [parsed, setParsed] = useState<ParsedMedia | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  // Language selection
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ko');

  // Generate options
  const [genMode, setGenMode] = useState<GenerateMode>('both');
  const [maxWords, setMaxWords] = useState(30);

  // Generated cards
  const [cards, setCards] = useState<GeneratedCard[]>([]);
  const idCounter = useRef(0);

  // ── File handling ──────────────────────────────────────────────────

  const handleFileContent = useCallback((content: string, filename?: string) => {
    try {
      const result = detectAndParse(content, filename);
      if (result.lines.length === 0) {
        setError(t.mediaNoContent ?? 'No content found in file');
        return;
      }
      setParsed(result);

      // Auto-detect language
      const detected = detectLang(result.fullText.slice(0, 500));
      if (detected) {
        setSourceLang(detected);
        setTargetLang(detected === 'en' ? 'ko' : 'en');
      }

      // Auto-set deck name from filename
      if (filename && !deckName) {
        const nameWithoutExt = filename.replace(/\.[^.]+$/, '');
        setDeckName(nameWithoutExt);
      }

      setState('preview');
      setError('');
    } catch {
      setError('Failed to parse file. Make sure it is a valid .srt, .txt, or .lrc file.');
    }
  }, [deckName, setDeckName, t.mediaNoContent]);

  const handleFileSelect = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 2 MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleFileContent(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handlePasteSubmit = () => {
    if (!pasteText.trim()) return;
    handleFileContent(pasteText.trim());
  };

  // ── LLM Processing ────────────────────────────────────────────────

  const handleGenerate = async () => {
    if (!parsed) return;
    setState('processing');
    setError('');

    try {
      const res = await fetch('/api/process-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: parsed.fullText,
          sourceLang,
          targetLang,
          mode: genMode,
          maxWords,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(friendlyError(data.error ?? 'Failed to generate cards'));
        setState('preview');
        return;
      }

      const generated: GeneratedCard[] = [];

      // Vocabulary cards → Basic note type
      if (data.vocabulary && Array.isArray(data.vocabulary)) {
        for (const v of data.vocabulary) {
          generated.push({
            id: ++idCounter.current,
            front: v.word ?? '',
            back: v.translation ?? '',
            pronunciation: v.pronunciation ?? '',
            extra: v.context ?? '',
            noteType: 'Basic',
          });
        }
      }

      // Cloze cards → Cloze note type
      if (data.cloze && Array.isArray(data.cloze)) {
        for (const c of data.cloze) {
          generated.push({
            id: ++idCounter.current,
            front: c.sentence_with_blank ?? '',
            back: c.answer ?? '',
            pronunciation: c.hint ?? '',
            extra: c.full_sentence ?? '',
            noteType: 'Cloze',
          });
        }
      }

      if (generated.length === 0) {
        setError('AI generated no cards. Try with different text or a higher max words count.');
        setState('preview');
        return;
      }

      setCards(generated);
      setState('editing');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      setError(friendlyError(msg) || 'Network error. Check your connection and try again.');
      setState('preview');
    }
  };

  // ── Card editing ───────────────────────────────────────────────────

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCard = (id: number, field: 'front' | 'back' | 'pronunciation', value: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleSaveCards = () => {
    const validCards = cards.filter((c) => c.front.trim() && c.back.trim());
    if (validCards.length === 0) {
      setError('No valid cards to save');
      return;
    }
    onCardsReady(
      validCards.map((c) => ({
        front: c.front.trim(),
        back: c.back.trim(),
        pronunciation: c.pronunciation.trim(),
        extra: c.extra.trim(),
        noteType: c.noteType,
      }))
    );
  };

  // ── Reset ──────────────────────────────────────────────────────────

  const handleReset = () => {
    setState('idle');
    setParsed(null);
    setPasteText('');
    setCards([]);
    setError('');
  };

  // ── Render ─────────────────────────────────────────────────────────

  return (
    <div>
      {error && (
        <div
          className="px-4 py-3 rounded-xl text-sm mb-4 flex items-start gap-2"
          style={{
            background: 'rgba(248,113,113,0.1)',
            border: '1px solid rgba(248,113,113,0.3)',
            color: 'var(--incorrect)',
          }}
        >
          <span className="flex-1">{error}</span>
          <button
            onClick={() => setError('')}
            className="text-xs opacity-60 hover:opacity-100 shrink-0"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--incorrect)' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ═══ Idle: Upload + Paste ═══ */}
      {state === 'idle' && (
        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl p-8 text-center cursor-pointer transition-all"
            style={{
              background: dragOver ? 'rgba(var(--accent-rgb, 99,102,241),0.1)' : 'var(--surface)',
              border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            <div className="text-3xl mb-3">🎬</div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
              {t.uploadMediaFile ?? 'Drop SRT or lyrics file here'}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {t.supportedFormats ?? 'Supports .srt, .txt, .lrc files (max 2MB)'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".srt,.txt,.lrc"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>

          {/* Or paste */}
          <div className="text-center text-xs" style={{ color: 'var(--muted)' }}>or</div>

          <div
            className="rounded-xl p-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={t.pasteSubtitles ?? 'Paste subtitles, lyrics, or any text here...'}
              className="w-full text-sm resize-none"
              rows={6}
              style={{
                background: 'transparent',
                color: 'var(--text)',
                border: 'none',
                outline: 'none',
              }}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePasteSubmit}
                disabled={!pasteText.trim()}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  cursor: pasteText.trim() ? 'pointer' : 'not-allowed',
                  opacity: pasteText.trim() ? 1 : 0.5,
                }}
              >
                {t.mediaPreview ?? 'Preview'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Preview: Parsed content ═══ */}
      {state === 'preview' && parsed && (
        <div className="space-y-4">
          {/* Content preview */}
          <div
            className="rounded-xl p-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
                  {parsed.type.toUpperCase()} · {parsed.lines.length} {t.lineCount ?? 'lines'}
                </p>
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: parsed.fullText.length > MAX_INPUT_CHARS ? 'rgba(251,191,36,0.15)' : 'var(--surface2)',
                    color: parsed.fullText.length > MAX_INPUT_CHARS ? '#b45309' : 'var(--muted)',
                  }}
                >
                  {Math.min(parsed.fullText.length, MAX_INPUT_CHARS).toLocaleString()} / {MAX_INPUT_CHARS.toLocaleString()} chars
                  {parsed.fullText.length > MAX_INPUT_CHARS && ' (truncated)'}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs px-2 py-1 rounded"
                style={{ color: 'var(--muted)', background: 'var(--surface2)', border: 'none', cursor: 'pointer' }}
              >
                ✕ Reset
              </button>
            </div>
            <div
              className="max-h-40 overflow-y-auto text-sm space-y-0.5"
              style={{ color: 'var(--text)' }}
            >
              {parsed.lines.slice(0, 20).map((line) => (
                <p key={line.index} className="leading-relaxed">
                  {line.startMs !== undefined && (
                    <span className="text-xs mr-2" style={{ color: 'var(--muted)' }}>
                      {formatMs(line.startMs)}
                    </span>
                  )}
                  {line.text}
                </p>
              ))}
              {parsed.lines.length > 20 && (
                <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
                  ... and {parsed.lines.length - 20} more lines
                </p>
              )}
            </div>
          </div>

          {/* Language selection */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted)' }}>
                Source
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {TARGET_LANGS.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end pb-2 text-sm" style={{ color: 'var(--muted)' }}>→</div>
            <div className="flex-1">
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted)' }}>
                Target
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {TARGET_LANGS.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate options */}
          <div
            className="rounded-xl p-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>
              {t.generateMode ?? 'Card Type'}
            </p>
            <div className="flex gap-2 mb-4">
              {([
                { value: 'vocabulary' as const, label: t.vocabularyCards ?? 'Vocabulary' },
                { value: 'cloze' as const, label: t.clozeCards ?? 'Fill-in-blank' },
                { value: 'both' as const, label: t.bothCardTypes ?? 'Both' },
              ]).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setGenMode(opt.value)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    background: genMode === opt.value ? 'var(--accent)' : 'var(--surface2)',
                    color: genMode === opt.value ? '#fff' : 'var(--text)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {genMode !== 'cloze' && (
              <div className="mb-4">
                <label className="text-xs block mb-1" style={{ color: 'var(--muted)' }}>
                  Max words: {maxWords}
                </label>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={maxWords}
                  onChange={(e) => setMaxWords(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: 'var(--accent)' }}
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              ✨ {t.generateWithAI ?? 'Generate with AI'}
            </button>
          </div>
        </div>
      )}

      {/* ═══ Processing: Spinner ═══ */}
      {state === 'processing' && (
        <div className="flex flex-col items-center py-16">
          <div
            className="w-8 h-8 rounded-full border-3 border-t-transparent animate-spin mb-4"
            style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent', borderWidth: 3 }}
          />
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
            {t.generating ?? 'Generating cards with AI...'}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            This may take up to 30 seconds
          </p>
        </div>
      )}

      {/* ═══ Editing: Generated cards ═══ */}
      {state === 'editing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              {cards.length} cards generated
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer' }}
              >
                Reset
              </button>
              <button
                onClick={handleSaveCards}
                className="px-4 py-1.5 rounded-lg text-sm font-bold"
                style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                {t.saveDeck ?? 'Save Deck'} ({cards.length})
              </button>
            </div>
          </div>

          {/* Vocabulary cards */}
          {cards.some((c) => c.noteType === 'Basic') && (
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>
                {t.vocabularyCards ?? 'Vocabulary Cards'}
              </p>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                {cards
                  .filter((c) => c.noteType === 'Basic')
                  .map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center gap-2 px-3 py-2 text-sm"
                      style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
                    >
                      <input
                        value={card.front}
                        onChange={(e) => updateCard(card.id, 'front', e.target.value)}
                        className="flex-1 px-2 py-1 rounded text-sm"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                      />
                      <input
                        value={card.back}
                        onChange={(e) => updateCard(card.id, 'back', e.target.value)}
                        className="flex-1 px-2 py-1 rounded text-sm"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                      />
                      <input
                        value={card.pronunciation}
                        onChange={(e) => updateCard(card.id, 'pronunciation', e.target.value)}
                        className="w-24 px-2 py-1 rounded text-xs"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                      />
                      <button
                        onClick={() => removeCard(card.id)}
                        className="text-xs px-1"
                        style={{ color: 'var(--incorrect)', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Cloze cards */}
          {cards.some((c) => c.noteType === 'Cloze') && (
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>
                {t.clozeCards ?? 'Fill-in-the-blank Cards'}
              </p>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                {cards
                  .filter((c) => c.noteType === 'Cloze')
                  .map((card) => (
                    <div
                      key={card.id}
                      className="px-3 py-2 text-sm"
                      style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
                    >
                      <div className="flex items-center gap-2">
                        <p className="flex-1 text-sm" style={{ color: 'var(--text)' }}>
                          {card.front}
                        </p>
                        <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--accent)', color: '#fff' }}>
                          {card.back}
                        </span>
                        <button
                          onClick={() => removeCard(card.id)}
                          className="text-xs px-1"
                          style={{ color: 'var(--incorrect)', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                      {card.pronunciation && (
                        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                          💡 {card.pronunciation}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────

function formatMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
