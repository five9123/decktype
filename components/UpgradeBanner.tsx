import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

interface UpgradeBannerProps {
  type: 'deck' | 'card';
}

export function UpgradeBanner({ type }: UpgradeBannerProps) {
  const { t } = useLanguage();
  const cta = type === 'deck' ? t.deckLimitReachedCta : t.cardLimitReachedCta;

  return (
    <div
      className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm mb-4 sm:mb-6 flex items-center justify-between gap-2 sm:gap-4"
      style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
    >
      <span>{t.deckLimitReached.split('.')[0]}.</span>
      <Link
        href="/pricing"
        onClick={() => trackEvent('upgrade_clicked', { source: `upgrade_banner_${type}` })}
        className="no-underline text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 transition-opacity hover:opacity-90"
        style={{ background: '#fbbf24', color: '#000' }}
      >
        {cta.replace(' →', '')} →
      </Link>
    </div>
  );
}
