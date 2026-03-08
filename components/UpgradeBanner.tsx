import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface UpgradeBannerProps {
  type: 'deck' | 'card';
}

export function UpgradeBanner({ type }: UpgradeBannerProps) {
  const { t } = useLanguage();
  const cta = type === 'deck' ? t.deckLimitReachedCta : t.cardLimitReachedCta;

  return (
    <div
      className="px-4 py-3 rounded-xl text-sm mb-6 flex items-center justify-between gap-4"
      style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
    >
      <span>{t.deckLimitReached.split('.')[0]}.</span>
      <Link
        href="/pricing"
        className="no-underline text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 transition-opacity hover:opacity-90"
        style={{ background: '#fbbf24', color: '#000' }}
      >
        {cta.replace(' →', '')} →
      </Link>
    </div>
  );
}
