'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function GuidePage() {
  const { t } = useLanguage();
  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" style={{ color: 'var(--text)' }}>
        <h1 className="text-3xl font-bold mb-4">{t.guideTitle}</h1>
        <p className="text-lg mb-12" style={{ color: 'var(--muted)' }}>{t.guideIntro}</p>

        {/* Getting Started Steps */}
        <section className="mb-12">
          {[
            { title: t.guideStep1Title, desc: t.guideStep1Desc },
            { title: t.guideStep2Title, desc: t.guideStep2Desc },
            { title: t.guideStep3Title, desc: t.guideStep3Desc },
            { title: t.guideStep4Title, desc: t.guideStep4Desc },
          ].map((step, i) => (
            <div key={i} className="mb-6 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
              <p style={{ color: 'var(--muted)' }}>{step.desc}</p>
            </div>
          ))}
        </section>

        {/* Practice Modes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t.guideModesTitle}</h2>
          <ul className="space-y-3">
            {[
              t.guideModeFrontToBack,
              t.guideModeBackToFront,
              t.guideModeSequential,
              t.guideModeRandom,
              t.guideModeDifficult,
            ].map((mode, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--surface)' }}>
                <span style={{ color: 'var(--accent)' }} className="mt-0.5 font-bold">&#x2022;</span>
                <span style={{ color: 'var(--muted)' }}>{mode}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t.guideTipsTitle}</h2>
          <div className="space-y-3">
            {[t.guideTip1, t.guideTip2, t.guideTip3, t.guideTip4].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--surface)' }}>
                <span className="text-lg">💡</span>
                <span style={{ color: 'var(--muted)' }}>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Formats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t.guideFormatsTitle}</h2>
          <p style={{ color: 'var(--muted)' }}>{t.guideFormatsDesc}</p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.guideFaqTitle}</h2>
          <div className="space-y-4">
            {[
              { q: t.guideFaq1Q, a: t.guideFaq1A },
              { q: t.guideFaq2Q, a: t.guideFaq2A },
              { q: t.guideFaq3Q, a: t.guideFaq3A },
              { q: t.guideFaq4Q, a: t.guideFaq4A },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p style={{ color: 'var(--muted)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-8">
          <Link
            href="/demo"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            {t.tryDemo}
          </Link>
        </div>
      </main>
    </>
  );
}
