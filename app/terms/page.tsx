'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function TermsPage() {
  const { t } = useLanguage();
  const sections = [
    { title: t.termsSection1Title, desc: t.termsSection1Desc },
    { title: t.termsSection2Title, desc: t.termsSection2Desc },
    { title: t.termsSection3Title, desc: t.termsSection3Desc },
    { title: t.termsSection4Title, desc: t.termsSection4Desc },
    { title: t.termsSection5Title, desc: t.termsSection5Desc },
    { title: t.termsSection6Title, desc: t.termsSection6Desc },
    { title: t.termsSection7Title, desc: t.termsSection7Desc },
    { title: t.termsSection8Title, desc: t.termsSection8Desc },
  ];

  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" style={{ color: 'var(--text)' }}>
        <h1 className="text-3xl font-bold mb-2">{t.termsTitle}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>{t.termsLastUpdated}</p>
        <p className="text-lg mb-10" style={{ color: 'var(--muted)' }}>{t.termsIntro}</p>

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
