'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

interface ProGateOverlayProps {
  message?: string;
  children?: React.ReactNode;
}

export function ProGateOverlay({ message, children }: ProGateOverlayProps) {
  const { t } = useLanguage();

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 120 }}>
      {/* Blurred preview content */}
      {children && (
        <div style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' }} aria-hidden>
          {children}
        </div>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
      >
        <div className="text-2xl">🔒</div>
        <p className="text-xs sm:text-sm text-center px-4" style={{ color: 'var(--text)', maxWidth: 280 }}>
          {message || t.statsProGate}
        </p>
        <Link
          href="/pricing"
          onClick={() => trackEvent('upgrade_clicked', { source: 'pro_gate_overlay' })}
          className="px-5 py-2 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {t.upgradeToPro} →
        </Link>
      </div>
    </div>
  );
}
