'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { createBrowserClient } from '@/lib/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { STORAGE_KEY_GUEST_DECK } from '@/lib/storage-keys';
import { saveDeckWithCards, type CardToSave } from '@/lib/deck-save';
import { trackEvent } from '@/lib/analytics';
import { ErrorAlert } from '@/components/ErrorAlert';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MediaTabContent, type MediaCardsResult } from '@/components/MediaTabContent';
import { UploadTabContent } from '@/components/UploadTabContent';
import { TextTabContent, type CardData } from '@/components/TextTabContent';
import { AiTabContent } from '@/components/AiTabContent';

// ─── Types ──────────────────────────────────────────────────────────────

type Tab = 'text' | 'media' | 'upload' | 'ai';

// ─── Component ──────────────────────────────────────────────────────────

export default function CreateDeckPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const router = useRouter();

  const [tab, setTab] = useState<Tab>('media');
  const [deckName, setDeckName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const mediaCardsRef = useRef<MediaCardsResult[]>([]);
  const [mediaSourceLang, setMediaSourceLang] = useState<string | null>(null);

  // ─── Save Deck ─────────────────────────────────────────────────────────

  const handleSave = async (cards: CardToSave[], sourceLang?: string | null) => {
    if (!deckName.trim()) { setError(t.deckNameRequired); return; }
    if (cards.length === 0) { setError(t.cardsRequired); return; }
    setError('');
    setSaving(true);

    if (!user) {
      // Guest: save to sessionStorage and go to practice
      try {
        sessionStorage.setItem(
          STORAGE_KEY_GUEST_DECK,
          JSON.stringify({ name: deckName.trim(), cards, sourceLang: sourceLang ?? null }),
        );
      } catch { /* ignore */ }
      router.push('/practice/guest');
      return;
    }

    const supabase = createBrowserClient();
    const result = await saveDeckWithCards({
      supabase,
      userId: user.id,
      deckName: deckName.trim(),
      cards,
      sourceLang: sourceLang ?? null,
      isPro,
    });

    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    trackEvent('deck_created', { deck_id: result.deckId, card_count: cards.length });
    router.push(`/deck/${result.deckId}`);
  };

  const handleMediaCardsReady = (cards: MediaCardsResult[]) => {
    mediaCardsRef.current = cards;
    handleSave(
      cards.map((c) => ({ front: c.front.trim(), back: c.back.trim(), pronunciation: c.pronunciation.trim(), extra: c.extra.trim(), noteType: c.noteType })),
      mediaSourceLang,
    );
  };

  const handleTextSave = (cards: CardData[], sourceLang: string) => {
    handleSave(cards, sourceLang);
  };

  // ─── Render ────────────────────────────────────────────────────────────

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
            { key: 'ai' as const, label: '🤖 AI' },
          ]).map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => { setTab(tabItem.key); setError(''); }}
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
        {error && <ErrorAlert message={error} onClose={() => setError('')} />}

        {/* ═══ Tab Content ═══ */}
        {tab === 'text' && <TextTabContent onSave={handleTextSave} isPro={isPro} />}

        {tab === 'media' && (
          <MediaTabContent
            deckName={deckName}
            setDeckName={setDeckName}
            onCardsReady={handleMediaCardsReady}
            onSourceLangChange={setMediaSourceLang}
            isPro={isPro}
          />
        )}

        {tab === 'upload' && <UploadTabContent />}

        {tab === 'ai' && <AiTabContent onSave={(cards, sourceLang) => handleSave(cards, sourceLang)} isPro={isPro} />}

        {/* Saving overlay */}
        {saving && <LoadingSpinner title={t.savingLabel} />}
      </main>
    </>
  );
}
