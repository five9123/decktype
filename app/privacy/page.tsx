'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function PrivacyPage() {
  const { t } = useLanguage();
  const sections = [
    { title: t.privacySection1Title, desc: t.privacySection1Desc },
    { title: t.privacySection2Title, desc: t.privacySection2Desc },
    { title: t.privacySection3Title, desc: t.privacySection3Desc },
    { title: t.privacySection4Title, desc: t.privacySection4Desc },
    { title: t.privacySection5Title, desc: t.privacySection5Desc },
    { title: t.privacySection6Title, desc: t.privacySection6Desc },
    { title: t.privacySection7Title, desc: t.privacySection7Desc },
  ];

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" style={{ color: 'var(--text)' }}>
        <h1 className="text-3xl font-bold mb-2">{t.privacyTitle}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>{t.privacyLastUpdated}</p>
        <p className="text-lg mb-10" style={{ color: 'var(--muted)' }}>{t.privacyIntro}</p>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
              <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>{section.desc}</p>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
