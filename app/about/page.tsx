'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" style={{ color: 'var(--text)' }}>
        <h1 className="text-3xl font-bold mb-4">{t.aboutTitle}</h1>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-3">{t.aboutMission}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t.aboutMissionDesc}
          </p>
        </section>

        {/* Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-3">{t.aboutStory}</h2>
          <div className="space-y-4" style={{ color: 'var(--muted)' }}>
            <p className="text-base leading-relaxed">{t.aboutStoryP1}</p>
            <p className="text-base leading-relaxed">{t.aboutStoryP2}</p>
            <p className="text-base leading-relaxed">{t.aboutStoryP3}</p>
          </div>
        </section>

        {/* Why Typing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t.aboutWhyTitle}</h2>
          <ul className="space-y-3">
            {[t.aboutWhy1, t.aboutWhy2, t.aboutWhy3, t.aboutWhy4].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <span style={{ color: 'var(--accent)' }} className="mt-0.5 font-bold">
                  &#x2022;
                </span>
                <span style={{ color: 'var(--muted)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tech */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-3">{t.aboutTechTitle}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t.aboutTechDesc}
          </p>
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
