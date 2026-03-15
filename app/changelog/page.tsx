'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';
import { CHANGELOG } from '@/lib/changelog-data';

export default function ChangelogPage() {
  const { lang, t } = useLanguage();
  const isKo = lang === 'ko';

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" style={{ color: 'var(--text)' }}>
        <h1 className="text-3xl font-bold mb-2">{t.changelogTitle}</h1>
        <p className="text-base mb-12" style={{ color: 'var(--muted)' }}>
          {t.changelogIntro}
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px"
            style={{ background: 'var(--border)' }}
          />

          <div className="space-y-8">
            {CHANGELOG.map((entry) => (
              <div key={entry.version} className="relative pl-10">
                {/* Timeline dot */}
                <div
                  className="absolute left-[10px] top-[22px] w-[11px] h-[11px] rounded-full border-2"
                  style={{ background: 'var(--bg)', borderColor: 'var(--accent)' }}
                />

                {/* Version card */}
                <div
                  className="p-5 rounded-xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span
                      className="inline-block px-2.5 py-0.5 text-sm font-bold rounded-full"
                      style={{ background: 'var(--accent)', color: '#fff' }}
                    >
                      v{entry.version}
                    </span>

                    <span className="text-sm" style={{ color: 'var(--muted)' }}>
                      {entry.date}
                    </span>

                    <span
                      className="inline-block px-2 py-0.5 text-xs rounded-md"
                      style={{
                        background: 'var(--surface2)',
                        color: 'var(--text)',
                      }}
                    >
                      {entry.tagEmoji} {isKo ? entry.tagKo : entry.tag}
                    </span>
                  </div>

                  {/* Change list */}
                  <ul className="space-y-1.5 m-0 p-0 list-none">
                    {entry.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span style={{ color: 'var(--accent)' }} className="mt-px shrink-0">•</span>
                        <span style={{ color: 'var(--muted)' }}>
                          {isKo ? change.ko : change.en}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
