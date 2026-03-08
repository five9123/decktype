'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

export default function PrivacyPage() {
  const { t } = useLanguage();
  return (
    <>
      <TopToolbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16" style={{ color: 'var(--text)' }}>
        <h1 className="text-3xl font-bold mb-4">{t.footerPrivacy}</h1>
        <p style={{ color: 'var(--muted)' }}>{t.comingSoon}</p>
      </main>
    </>
  );
}
