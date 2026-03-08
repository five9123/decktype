'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PreferencesPanel } from './PreferencesPanel';

export function TopToolbar() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
  const [showPrefs, setShowPrefs] = useState(false);

  return (
    <header
      className="top-toolbar sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3"
      style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-bold no-underline"
        style={{ color: 'var(--text)' }}
      >
        <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--accent)' }}>typee</span>
      </Link>

      <nav className="flex items-center gap-2 sm:gap-3">
        {user && (
          <>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-80"
              style={{ color: 'var(--text)' }}
            >
              {t.myDecks}
            </Link>
            <Link
              href="/stats"
              className="px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-80"
              style={{ color: 'var(--text)' }}
            >
              {t.statsTitle}
            </Link>
            {isPro ? (
              <Link
                href="/billing"
                className="px-2 py-0.5 rounded-full text-xs font-bold no-underline"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                PRO
              </Link>
            ) : (
              <Link
                href="/pricing"
                className="px-3 py-1.5 rounded-lg text-sm font-bold no-underline transition-opacity hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                {t.upgradeToPro}
              </Link>
            )}
          </>
        )}

        {/* Preferences button */}
        <div className="relative">
          <button
            onClick={() => setShowPrefs((v) => !v)}
            aria-label={t.preferencesTitle}
            className="p-2 rounded-lg transition-opacity hover:opacity-80"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          {showPrefs && <PreferencesPanel onClose={() => setShowPrefs(false)} />}
        </div>

        <LanguageSwitcher />
        {user ? (
          <button
            onClick={signOut}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              cursor: 'pointer',
            }}
          >
            {t.signOut}
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="px-4 py-1.5 rounded-lg text-sm font-bold no-underline transition-opacity hover:opacity-90"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
            }}
          >
            {t.signIn}
          </Link>
        )}
      </nav>
    </header>
  );
}
