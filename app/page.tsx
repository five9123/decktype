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

  const ctaHref = user ? '/dashboard' : '/auth/login';
  const ctaLabel = user ? t.myDecks : 'Start for Free';

  return (
    <>
      <TopToolbar />
      <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>

        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden"
          style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '4rem', paddingBottom: '6rem' }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(var(--accent-rgb, 139,92,246),0.18) 0%, transparent 70%)',
            }}
          />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-8"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
            }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>●</span>
            Free to start · No credit card required
          </div>

          {/* Headline */}
          <h1 className="font-bold leading-tight mb-6" style={{ maxWidth: 700 }}>
            <span className="block" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'var(--text)' }}>
              Type it. Learn it.
            </span>
            <span className="block" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'var(--accent)' }}>
              Master any deck.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg mb-10 leading-relaxed"
            style={{ maxWidth: 520, color: 'var(--muted)' }}
          >
            Turn your Anki flashcards into a typing practice session. Build muscle memory, track WPM, and actually remember what you study.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-bold no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {ctaLabel} →
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-medium no-underline transition-opacity hover:opacity-80"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
            >
              See how it works
            </Link>
          </div>

          {/* Product mockup */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              maxWidth: 780,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#4ADE80' }} />
              <div
                className="flex-1 mx-4 px-3 py-1 rounded-md text-xs text-center"
                style={{ background: 'var(--bg)', color: 'var(--muted)' }}
              >
                decktype.vercel.app/practice
              </div>
            </div>
            {/* Typing UI preview */}
            <div className="p-8 text-center">
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>
                FRONT
              </p>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                자전거
              </p>
              <p className="text-base mb-6" style={{ color: 'var(--muted)' }}>
                bicycle
              </p>
              <div className="flex justify-center flex-wrap gap-0.5 font-mono text-xl mb-6">
                {['자','전','거'].map((ch, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < 1 ? 'var(--correct)' : i === 1 ? 'var(--incorrect)' : 'var(--muted)',
                      opacity: i === 2 ? 0.4 : 1,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
              <div
                className="mx-auto max-w-xs px-4 py-3 rounded-xl text-sm text-left"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--accent)',
                  color: 'var(--text)',
                }}
              >
                자<span style={{ borderRight: '2px solid var(--accent)' }}>&nbsp;</span>
              </div>
              <div className="flex justify-center gap-6 mt-5 text-sm" style={{ color: 'var(--muted)' }}>
                <span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>74</span> WPM</span>
                <span><span style={{ color: 'var(--correct)', fontWeight: 700 }}>96%</span> Accuracy</span>
                <span><span style={{ color: 'var(--text)', fontWeight: 700 }}>3</span> / 20 cards</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="px-4 py-24 text-center">
          <p className="text-xs font-bold tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            HOW IT WORKS
          </p>
          <h2 className="text-4xl font-bold mb-16" style={{ color: 'var(--text)' }}>
            Three steps. Zero friction.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Upload your deck',
                desc: 'Drop any .apkg Anki file. We parse it instantly — cards, fields, and all.',
                icon: '📦',
              },
              {
                step: '02',
                title: 'Type your answers',
                desc: 'See the front of each card. Type the answer. Get instant feedback on every keystroke.',
                icon: '⌨️',
              },
              {
                step: '03',
                title: 'Watch yourself improve',
                desc: 'Track WPM, accuracy, and mastery level for every single card over time.',
                icon: '📈',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="p-8 rounded-2xl text-left"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <p className="text-xs font-bold mb-2" style={{ color: 'var(--accent)' }}>{s.step}</p>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="px-4 py-16 text-center">
          <p className="text-xs font-bold tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            FEATURES
          </p>
          <h2 className="text-4xl font-bold mb-16" style={{ color: 'var(--text)' }}>
            Built for real learning.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Card 1 — Smart Review */}
            <div className="p-8 rounded-2xl text-left" style={{ background: '#3730a3', border: '1px solid #4338ca' }}>
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3 text-white">Smart Review Algorithm</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Cards you keep getting wrong appear more often. Cards you&apos;ve mastered fade back. Powered by a confidence score that updates in real time.
              </p>
              <div className="mt-5 flex gap-2 flex-wrap">
                {['SRS', 'Adaptive', 'Per-card confidence'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 2 — Themes */}
            <div className="p-8 rounded-2xl text-left" style={{ background: '#831843', border: '1px solid #9d174d' }}>
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3 text-white">10 Beautiful Themes</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Dark, Light, Dracula, Nord, Tokyo Night, and more. Switch instantly. Your preference is saved locally — no account needed.
              </p>
              <div className="mt-5 flex gap-1.5">
                {['#1e1e2e','#faf4ed','#282a36','#2e3440','#1a1b26','#282828'].map((c) => (
                  <span key={c} className="w-6 h-6 rounded-full border-2 border-white/20 inline-block" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Card 3 — WPM & Stats */}
            <div className="p-8 rounded-2xl text-left" style={{ background: '#78350f', border: '1px solid #92400e' }}>
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-white">Deep Progress Tracking</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Activity heatmap, WPM trend chart, personal bests, and per-card stats. Know exactly which cards you&apos;re struggling with.
              </p>
              <div className="mt-5 flex items-end gap-1 h-10">
                {[30, 50, 40, 70, 55, 80, 65, 90, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: 'rgba(255,255,255,0.6)' }} />
                ))}
              </div>
            </div>

            {/* Card 4 — Any Language */}
            <div className="p-8 rounded-2xl text-left" style={{ background: '#14532d', border: '1px solid #166534' }}>
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3 text-white">Any Language, Any Deck</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Japanese kanji, Korean vocab, Spanish verbs, medical terminology. If it&apos;s in Anki, it works here.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['日本語', '한국어', 'Español', 'Français', 'Medical', '+ more'].map((lang) => (
                  <span key={lang} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-4 py-24">
          <div
            className="max-w-3xl mx-auto text-center px-8 py-16 rounded-3xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <p className="text-xs font-bold tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
              GET STARTED
            </p>
            <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--text)' }}>
              Start typing in seconds.
            </h2>
            <p className="text-base mb-10" style={{ color: 'var(--muted)', maxWidth: 400, margin: '0 auto 2.5rem' }}>
              Upload your deck, pick a mode, and start building real memory. No setup. No config.
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {ctaLabel} →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-10 text-center text-xs" style={{ color: 'var(--muted)' }}>
          {t.footer}
        </footer>

      </main>
    </>
  );
}
