'use client';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { parseApkg } from '@/lib/apkg-parser';
import { createBrowserClient } from '@/lib/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { MAX_UPLOAD_SIZE, FREE_CARDS_PER_DECK } from '@/lib/constants';
import type { ParsedDeck } from '@/types';

type UploadState = 'idle' | 'parsing' | 'preview' | 'saving' | 'error';

export default function UploadPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<UploadState>('idle');
  const [progressMsg, setProgressMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [parsed, setParsed] = useState<ParsedDeck | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    // Validate
    if (!file.name.endsWith('.apkg')) {
      setErrorMsg('Please upload an .apkg file');
      setState('error');
      return;
    }
    if (file.size > MAX_UPLOAD_SIZE) {
      setErrorMsg(`File too large. Maximum size is ${MAX_UPLOAD_SIZE / 1024 / 1024}MB`);
      setState('error');
      return;
    }

    setState('parsing');
    setErrorMsg('');
    try {
      const result = await parseApkg(file, setProgressMsg);
      if (result.cards.length === 0) {
        setErrorMsg('No cards found in this deck');
        setState('error');
        return;
      }
      setParsed(result);
      setState('preview');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to parse deck');
      setState('error');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleSave = async () => {
    if (!parsed || !user) return;
    setState('saving');

    const supabase = createBrowserClient();

    // Limit cards for free plan
    const cardsToSave = isPro ? parsed.cards : parsed.cards.slice(0, FREE_CARDS_PER_DECK);

    // Insert deck
    const { data: deck, error: deckError } = await supabase
      .from('decks')
      .insert({
        user_id: user.id,
        name: parsed.name,
        card_count: cardsToSave.length,
        note_type: parsed.noteType,
        tags: [],
      })
      .select()
      .single();

    if (deckError || !deck) {
      setErrorMsg(deckError?.message ?? 'Failed to save deck');
      setState('error');
      return;
    }

    // Insert cards in batches
    const BATCH_SIZE = 100;
    for (let i = 0; i < cardsToSave.length; i += BATCH_SIZE) {
      const batch = cardsToSave.slice(i, i + BATCH_SIZE).map((card, idx) => ({
        deck_id: deck.id,
        front: card.front,
        back: card.back,
        pronunciation: card.pronunciation ?? '',
        extra: card.extra,
        note_type: card.noteType,
        sort_order: i + idx,
      }));

      const { error: cardsError } = await supabase.from('cards').insert(batch);
      if (cardsError) {
        setErrorMsg('Failed to save some cards');
        setState('error');
        return;
      }
    }

    router.push(`/deck/${deck.id}`);
  };

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>{t.uploadTitle}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>{t.uploadSubtitle}</p>

        {/* Drop Zone */}
        {(state === 'idle' || state === 'error') && (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center p-12 rounded-2xl cursor-pointer transition-colors ${isDragOver ? 'dropzone-active' : ''}`}
            style={{
              background: 'var(--surface)',
              border: `2px dashed ${isDragOver ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            <p className="text-4xl mb-4">📦</p>
            <p className="font-medium mb-2" style={{ color: 'var(--text)' }}>{t.dropHere}</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>.apkg files up to 20MB</p>
            <button
              className="mt-4 px-5 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              {t.browseFiles}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".apkg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>
        )}

        {/* Error */}
        {state === 'error' && errorMsg && (
          <div
            className="mt-4 px-4 py-3 rounded-xl text-sm"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}
          >
            {errorMsg}
          </div>
        )}

        {/* Parsing Progress */}
        {state === 'parsing' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin mb-4"
              style={{ borderColor: 'var(--border)', borderTopColor: 'transparent' }}
            />
            <p className="font-medium" style={{ color: 'var(--text)' }}>{t.parsing}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{progressMsg}</p>
          </div>
        )}

        {/* Card Preview */}
        {state === 'preview' && parsed && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{parsed.name}</h2>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {parsed.cards.length} {t.cards} &middot; {parsed.noteType}
                </p>
              </div>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                {t.saveDeck}
              </button>
            </div>

            {/* Free plan card limit warning */}
            {!isPro && parsed.cards.length > FREE_CARDS_PER_DECK && (
              <div
                className="px-4 py-3 rounded-xl text-sm mb-4"
                style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
              >
                ⚠️ This deck has <strong>{parsed.cards.length}</strong> cards. Free plan saves the first <strong>{FREE_CARDS_PER_DECK}</strong> cards. The remaining <strong>{parsed.cards.length - FREE_CARDS_PER_DECK}</strong> cards will be skipped.
              </div>
            )}

          {/* Card table */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--surface2)' }}>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)', width: '5%' }}>#</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>{t.front}</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>{t.back}</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: 'var(--muted)' }}>발음</th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.cards.slice(0, 20).map((card, i) => (
                    <tr
                      key={i}
                      style={{ borderTop: '1px solid var(--border)' }}
                    >
                      <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{i + 1}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text)' }}>
                        {card.front.slice(0, 80)}{card.front.length > 80 ? '...' : ''}
                      </td>
                      <td className="px-4 py-3" style={{ color: 'var(--text)' }}>
                        {card.back.slice(0, 80)}{card.back.length > 80 ? '...' : ''}
                      </td>
                      <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>
                        {card.pronunciation?.slice(0, 40)}{(card.pronunciation?.length ?? 0) > 40 ? '...' : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {parsed.cards.length > 20 && (
                <div className="px-4 py-3 text-center text-sm" style={{ color: 'var(--muted)', background: 'var(--surface)' }}>
                  + {parsed.cards.length - 20} more cards
                </div>
              )}
            </div>
          </div>
        )}

        {/* Saving */}
        {state === 'saving' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin mb-4"
              style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
            />
            <p className="font-medium" style={{ color: 'var(--text)' }}>Saving deck...</p>
          </div>
        )}
      </main>
    </>
  );
}
