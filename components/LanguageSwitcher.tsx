'use client';
import { useState, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGS } from '@/lib/constants';
import { useClickOutside } from '@/hooks/useClickOutside';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, useCallback(() => setOpen(false), []));

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 focus-ring"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          cursor: 'pointer',
        }}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <span className="hidden sm:inline" style={{ fontSize: 10, color: 'var(--muted)' }}>&#9662;</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1 rounded-xl overflow-hidden"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            minWidth: 148,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
        >
          {LANGS.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:opacity-80"
              style={{
                background: lang === code ? 'var(--surface2)' : 'transparent',
                color: lang === code ? 'var(--accent)' : 'var(--text)',
                cursor: 'pointer',
                border: 'none',
                textAlign: 'left',
              }}
            >
              <span>{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
