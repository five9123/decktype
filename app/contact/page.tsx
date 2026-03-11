'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" style={{ color: 'var(--text)' }}>
        <h1 className="text-3xl font-bold mb-4">{t.contactTitle}</h1>
        <p className="text-lg mb-10" style={{ color: 'var(--muted)' }}>
          {t.contactIntro}
        </p>

        {/* Email */}
        <section
          className="mb-10 p-6 rounded-xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-xl font-semibold mb-2">{t.contactEmailLabel}</h2>
          <p className="mb-3" style={{ color: 'var(--muted)' }}>{t.contactEmailDesc}</p>
          <a
            href="mailto:support@typee.app"
            className="inline-block text-lg font-semibold no-underline"
            style={{ color: 'var(--accent)' }}
          >
            support@typee.app
          </a>
          <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
            {t.contactResponseTime}
          </p>
        </section>

        {/* Topics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{t.contactTopics}</h2>
          <ul className="space-y-3">
            {[t.contactTopic1, t.contactTopic2, t.contactTopic3, t.contactTopic4].map(
              (topic, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--surface)' }}
                >
                  <span style={{ color: 'var(--accent)' }} className="mt-0.5 font-bold">
                    &#x2022;
                  </span>
                  <span style={{ color: 'var(--muted)' }}>{topic}</span>
                </li>
              )
            )}
          </ul>
        </section>
      </main>
    </>
  );
}
