'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';

export function TopToolbar() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const { isPro } = useProfile();
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
        <span className="font-bold tracking-tight" style={{ color: 'var(--accent)', fontSize: '1.95rem' }}>typee</span>
      </Link>

      <nav className="flex items-center gap-2 sm:gap-3">
        {!user && (
          <Link
            href="/blog"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-80"
            style={{ color: 'var(--text)' }}
          >
            {t.footerBlog}
          </Link>
        )}
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
              className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-80"
              style={{ color: 'var(--text)' }}
            >
              {t.statsTitle}
            </Link>
            <Link
              href="/create"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-80"
              style={{ color: 'var(--text)' }}
            >
              {t.createDeck}
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
