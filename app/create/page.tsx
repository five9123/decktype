'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { createBrowserClient } from '@/lib/supabase/client';
import { FREE_CARDS_PER_DECK } from '@/lib/constants';

interface Row {
  id: number;
  front: string;
  back: string;
  pronunciation: string;
}

let nextId = 1;
function makeRow(): Row {
  return { id: nextId++, front: '', back: '', pronunciation: '' };
}

function makeRows(n: number): Row[] {
  return Array.from({ length: n }, makeRow);
}

export default function CreateDeckPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [deckName, setDeckName] = useState('');
  const [rows, setRows] = useState<Row[]>(() => makeRows(5));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const tableRef = useRef<HTMLDivElement>(null);

  const filledRows = rows.filter((r) => r.front.trim() || r.back.trim());
  const atLimit = rows.length >= FREE_CARDS_PER_DECK;

  const updateRow = (id: number, field: keyof Omit<Row, 'id'>, value: string) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const deleteRow = (id: number) => {
    setRows((prev) => prev.length > 1 ? prev.filter((r) => r.id !== id) : prev);
  };

  const addRows = (n: number) => {
    if (atLimit) return;
    const toAdd = Math.min(n, FREE_CARDS_PER_DECK - rows.length);
    setRows((prev) => [...prev, ...makeRows(toAdd)]);
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!deckName.trim()) { setError('덱 이름을 입력해주세요.'); return; }
    if (filledRows.length === 0) { setError('카드를 1개 이상 입력해주세요.'); return; }
    setError('');
    setSaving(true);

    const supabase = createBrowserClient();

    const { data: deck, error: deckErr } = await supabase
      .from('decks')
      .insert({
        user_id: user.id,
        name: deckName.trim(),
        card_count: filledRows.length,
        note_type: 'Basic',
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
    const cards = filledRows.slice(0, FREE_CARDS_PER_DECK);
    for (let i = 0; i < cards.length; i += BATCH) {
      const batch = cards.slice(i, i + BATCH).map((r, idx) => ({
        deck_id: deck.id,
        front: r.front.trim(),
        back: r.back.trim(),
        pronunciation: r.pronunciation.trim(),
        extra: '',
        note_type: 'Basic',
        sort_order: i + idx,
      }));
      const { error: cardsErr } = await supabase.from('cards').insert(batch);
      if (cardsErr) {
        setError('카드 저장 중 오류가 발생했습니다.');
        setSaving(false);
        return;
      }
    }

    router.push(`/deck/${deck.id}`);
  };

  return (
    <>
      <TopToolbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>새 덱 만들기</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              카드를 직접 입력해서 덱을 만드세요 (최대 {FREE_CARDS_PER_DECK}개)
            </p>
          </div>
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
            {saving ? '저장 중...' : `저장 (${filledRows.length}장)`}
          </button>
        </div>

        {/* Deck Name */}
        <div className="mb-6">
          <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted)' }}>
            덱 이름 *
          </label>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="예) 한국어 기초 단어"
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
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: 'var(--incorrect)' }}
          >
            {error}
          </div>
        )}

        {/* Table */}
        <div ref={tableRef} className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
          {/* Header */}
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
            <span>단어 (앞면)</span>
            <span>뜻 (뒷면)</span>
            <span>발음기호</span>
            <span />
          </div>

          {/* Rows */}
          <div style={{ background: 'var(--surface)' }}>
            {rows.map((row, i) => (
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
                  onChange={(e) => updateRow(row.id, 'front', e.target.value)}
                  placeholder="자전거"
                  className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    outline: 'none',
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab' && !e.shiftKey && i === rows.length - 1 && !atLimit) {
                      e.preventDefault();
                      addRows(1);
                    }
                  }}
                />
                <input
                  type="text"
                  value={row.back}
                  onChange={(e) => updateRow(row.id, 'back', e.target.value)}
                  placeholder="bicycle"
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
                  value={row.pronunciation}
                  onChange={(e) => updateRow(row.id, 'pronunciation', e.target.value)}
                  placeholder="jajeongeo"
                  className="w-full px-2.5 py-1.5 rounded-lg text-sm"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => deleteRow(row.id)}
                  className="flex items-center justify-center rounded-lg w-7 h-7 transition-opacity hover:opacity-80"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                  aria-label="Delete row"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Row Buttons */}
        <div className="flex items-center gap-2 mb-8">
          {!atLimit && (
            <>
              <button
                onClick={() => addRows(1)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
              >
                + 행 추가
              </button>
              <button
                onClick={() => addRows(10)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
              >
                + 10행 추가
              </button>
            </>
          )}
          <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>
            {rows.length} / {FREE_CARDS_PER_DECK}행
            {atLimit && <span style={{ color: '#fbbf24' }}> (최대)</span>}
          </span>
        </div>
      </main>
    </>
  );
}
