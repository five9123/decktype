'use client';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

function BillingContent() {
  const { user } = useAuth();
  const { profile, isPro, loading, refresh } = useProfile();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [portalLoading, setPortalLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Refresh profile after upgrade redirect
  useEffect(() => {
    if (searchParams.get('upgraded') === 'true') {
      refresh();
      setShowSuccess(true);
    }
  }, [searchParams, refresh]);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/create-portal', { method: 'POST' });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else alert(error ?? 'Could not open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
      </div>
    );
  }

  return (
    <>
      <TopToolbar />
      <main className="max-w-lg mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
          {t.billingTitle}
        </h1>

        {/* Upgrade success banner */}
        {showSuccess && (
          <div
            className="px-4 py-3 rounded-xl text-sm mb-6 font-medium"
            style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)', color: 'var(--correct)' }}
          >
            {t.upgradeSuccess}
          </div>
        )}

        {/* Plan status card */}
        <div
          className="p-6 rounded-2xl mb-4"
          style={{ background: 'var(--surface)', border: `1px solid ${isPro ? 'var(--accent)' : 'var(--border)'}` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                CURRENT PLAN
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                  {isPro ? 'Pro' : 'Free'}
                </span>
                {isPro && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    ACTIVE
                  </span>
                )}
              </div>
            </div>
            {isPro ? (
              <span className="text-3xl">⭐</span>
            ) : (
              <span className="text-3xl">🆓</span>
            )}
          </div>

          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
            {isPro ? t.currentPlanPro : t.currentPlanFree}
          </p>

          {isPro ? (
            <button
              onClick={handleManageBilling}
              disabled={portalLoading}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                cursor: portalLoading ? 'not-allowed' : 'pointer',
                opacity: portalLoading ? 0.7 : 1,
              }}
            >
              {portalLoading ? '...' : t.manageBilling}
            </button>
          ) : (
            <Link
              href="/pricing"
              className="block w-full py-2.5 rounded-xl text-sm font-bold text-center no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t.upgradeToPro} →
            </Link>
          )}
        </div>

        {/* Account info */}
        <div
          className="p-4 rounded-xl text-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p style={{ color: 'var(--muted)' }}>
            <span className="font-medium" style={{ color: 'var(--text)' }}>Account: </span>
            {profile?.email}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/dashboard" className="text-sm no-underline" style={{ color: 'var(--muted)' }}>
            ← {t.myDecks}
          </Link>
        </div>
      </main>
    </>
  );
}

export default function BillingPage() {
  return (
    <Suspense>
      <BillingContent />
    </Suspense>
  );
}
