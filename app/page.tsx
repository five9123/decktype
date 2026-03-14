'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ctaHref = user ? '/dashboard' : '/demo';
  const ctaLabel = user ? t.myDecks : t.tryWithoutDeck;

  return (
    <>
      <TopToolbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'typee',
            applicationCategory: 'EducationApplication',
            applicationSubCategory: 'Language Learning',
            operatingSystem: 'Web Browser',
            url: 'https://www.typee.app',
            description:
              'Upload your Anki deck and turn flashcards into typing practice. Track WPM, accuracy, and master your cards faster.',
            featureList:
              'Anki deck upload, WPM tracking, accuracy statistics, spaced repetition, multi-language support, 10+ color themes',
            offers: [
              {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                name: 'Free',
                description: '1 deck, up to 100 cards',
              },
              {
                '@type': 'Offer',
                price: '5',
                priceCurrency: 'USD',
                name: 'Pro Monthly',
                description: 'Unlimited decks, advanced stats, priority support',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  billingDuration: 'P1M',
                },
              },
            ],
          }, {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is typee and how does it work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'typee is a typing practice app for Anki flashcard users. Upload your .apkg deck file, and typee converts each card into a typing exercise. You see the front of a card and type the answer. The app tracks your WPM (words per minute), accuracy, and mastery level for every card.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is typee free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The free plan includes 1 deck with up to 100 cards, all practice modes, all themes, and basic statistics. The Pro plan ($5/month or $48/year) unlocks unlimited decks, advanced progress tracking, and priority support.',
                },
              },
              {
                '@type': 'Question',
                name: 'What languages does typee support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'typee supports any language that works in Anki. This includes Japanese, Korean, Chinese, Spanish, French, German, Arabic, Thai, and many more.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need an Anki account to use typee?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. typee is a standalone web app. You just need an .apkg file exported from Anki. You can also try the built-in demo decks without uploading anything or creating an account.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is typee different from regular Anki review?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Anki uses passive recognition. typee adds active recall through typing. You must physically type the answer, which builds stronger muscle memory and deeper retention.',
                },
              },
            ],
          }]),
        }}
      />
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
            {t.landingBadge}
          </div>

          {/* Headline */}
          <h1 className="font-bold leading-tight mb-6" style={{ wordBreak: 'keep-all' }}>
            <span className="block" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: 'var(--text)' }}>
              {t.landingHero1}
            </span>
            <span className="block" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: 'var(--accent)' }}>
              {t.landingHero2}
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg mb-10 leading-relaxed"
            style={{ maxWidth: 520, color: 'var(--muted)', wordBreak: 'keep-all' }}
          >
            {t.landingSubtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-bold no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t.tryDemo} →
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-medium no-underline transition-opacity hover:opacity-80"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {t.myDecks} →
              </Link>
            ) : (
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-medium no-underline transition-opacity hover:opacity-80"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {t.startForFree} →
              </Link>
            )}
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
                typee.app/practice
              </div>
            </div>
            {/* Typing UI preview */}
            <div className="p-8 text-center">
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                자전거
              </p>
              <p className="text-sm mb-1" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                jajeongeo
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
                자저<span style={{ borderRight: '2px solid var(--accent)' }}>&nbsp;</span>
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
            {t.howItWorksLabel}
          </p>
          <h2 className="text-4xl font-bold mb-16" style={{ color: 'var(--text)' }}>
            {t.howItWorksTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', title: t.step01Title, desc: t.step01Desc, icon: '📦' },
              { step: '02', title: t.step02Title, desc: t.step02Desc, icon: '⌨️' },
              { step: '03', title: t.step03Title, desc: t.step03Desc, icon: '📈' },
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
            {t.featuresLabel}
          </p>
          <h2 className="text-4xl font-bold mb-16" style={{ color: 'var(--text)' }}>
            {t.featuresTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Card 1 — Smart Review */}
            <div className="p-8 rounded-2xl text-left" style={{ background: '#3730a3', border: '1px solid #4338ca' }}>
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3 text-white">{t.feature1Title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {t.feature1Desc}
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
              <h3 className="text-xl font-bold mb-3 text-white">{t.feature2Title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {t.feature2Desc}
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
              <h3 className="text-xl font-bold mb-3 text-white">{t.feature3Title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {t.feature3Desc}
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
              <h3 className="text-xl font-bold mb-3 text-white">{t.feature4Title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {t.feature4Desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['日本語', '한국어', 'Español', 'Français', 'Medical', '+ more'].map((lang) => (
                  <span key={lang} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── What is typee? ── */}
        <section className="px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold tracking-widest mb-4 text-center" style={{ color: 'var(--accent)' }}>
              ABOUT
            </p>
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: 'var(--text)' }}>
              {t.whatIsTitle}
            </h2>

            {/* Main description card */}
            <div
              className="p-8 rounded-2xl mb-8"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--accent)',
              }}
            >
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                {t.whatIsDesc}
              </p>
            </div>

            {/* Detail cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: '📦', label: 'Any Deck', desc: t.whatIsDetail1 },
                { icon: '🔄', label: 'Smart Review', desc: t.whatIsDetail2 },
                { icon: '🌐', label: 'Global', desc: t.whatIsDetail3 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <p className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                    {item.label.toUpperCase()}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-4 py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-widest mb-4 text-center" style={{ color: 'var(--accent)' }}>
              FAQ
            </p>
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: 'var(--text)' }}>
              {t.homeFaqTitle}
            </h2>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {[
                { q: t.homeFaq1Q, a: t.homeFaq1A },
                { q: t.homeFaq2Q, a: t.homeFaq2A },
                { q: t.homeFaq3Q, a: t.homeFaq3A },
                { q: t.homeFaq4Q, a: t.homeFaq4A },
                { q: t.homeFaq5Q, a: t.homeFaq5A },
              ].map((faq, i, arr) => (
                <div
                  key={i}
                  style={i < arr.length - 1 ? { borderBottom: '1px solid var(--border)' } : undefined}
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                    style={{ background: 'transparent', color: 'var(--text)' }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <h3 className="font-semibold text-base">{faq.q}</h3>
                    <span
                      className="flex-shrink-0 text-lg"
                      style={{
                        color: 'var(--accent)',
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? 300 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p className="text-sm leading-relaxed px-6 pb-6" style={{ color: 'var(--muted)' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
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
              {t.getStartedLabel}
            </p>
            <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--text)' }}>
              {t.getStartedTitle}
            </h2>
            <p className="text-base mb-10" style={{ color: 'var(--muted)', maxWidth: 400, margin: '0 auto 2.5rem' }}>
              {t.getStartedDesc}
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

      </main>
    </>
  );
}
