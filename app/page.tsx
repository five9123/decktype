'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function HomePage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
      </div>
    );
  }

  return (
    <>
      <TopToolbar />
      <main className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 60px)' }}>
        {/* Hero */}
        <div className="max-w-2xl text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--text)' }}
          >
            <span style={{ color: 'var(--accent)' }}>DeckType</span>
          </h1>
          <p
            className="text-lg sm:text-xl mb-8 whitespace-pre-line leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {t.subtitle}
          </p>
          <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>
            {t.description}
          </p>

          {/* CTA */}
          <Link
            href={user ? '/dashboard' : '/auth/login'}
            className="inline-block px-8 py-3 rounded-xl text-lg font-bold no-underline transition-opacity hover:opacity-90"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
            }}
          >
            {user ? t.myDecks : 'Get Started'}
          </Link>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {[
              { icon: '📦', label: 'Upload .apkg' },
              { icon: '⌨️', label: 'Typing Practice' },
              { icon: '📊', label: 'WPM & Accuracy' },
              { icon: '🌍', label: 'Any Language' },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-3xl w-full mt-20 mb-16">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: 'var(--text)' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Upload', desc: 'Drop your Anki .apkg file' },
              { step: '2', title: 'Practice', desc: 'Type your flashcard answers' },
              { step: '3', title: 'Improve', desc: 'Track WPM & accuracy over time' },
            ].map((s) => (
              <div
                key={s.step}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {s.step}
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pb-8 text-center text-xs" style={{ color: 'var(--muted)' }}>
          {t.footer}
        </footer>
      </main>
    </>
  );
}
