'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopToolbar } from '@/components/TopToolbar';

type BillingInterval = 'monthly' | 'yearly';

const FREE_FEATURES = [
  '3 decks',
  '200 cards per deck',
  'All practice modes',
  'WPM & accuracy tracking',
  'Basic stats',
];

const PRO_FEATURES = [
  'Unlimited decks',
  'Unlimited cards',
  'Activity heatmap',
  'WPM trend chart',
  'Priority support',
];

export default function PricingPage() {
  const { user } = useAuth();
  const { isPro, loading: profileLoading } = useProfile();
  const { t } = useLanguage();
  const router = useRouter();
  const [interval, setInterval] = useState<BillingInterval>('monthly');
  const [loading, setLoading] = useState(false);

  const price = interval === 'monthly' ? '$5' : '$48';
  const period = interval === 'monthly' ? t.pricingPerMonth : t.pricingPerYear;

  const handleGetPro = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: interval }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopToolbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        {/* Header */}
        <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
          PRICING
        </p>
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
          {t.pricingTitle}
        </h1>
        <p className="text-base mb-10" style={{ color: 'var(--muted)' }}>
          {t.pricingSubtitle}
        </p>

        {/* Billing toggle */}
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full mb-12"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {(['monthly', 'yearly'] as const).map((iv) => (
            <button
              key={iv}
              onClick={() => setInterval(iv)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: interval === iv ? 'var(--accent)' : 'transparent',
                color: interval === iv ? '#fff' : 'var(--muted)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {iv === 'monthly' ? t.pricingMonthly : t.pricingAnnual}
              {iv === 'yearly' && (
                <span
                  className="ml-2 px-1.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.25)', fontSize: '0.65rem' }}
                >
                  {t.annualDiscount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free */}
          <div
            className="p-8 rounded-2xl text-left flex flex-col"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                {t.pricingFreeTier.toUpperCase()}
              </p>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl font-bold" style={{ color: 'var(--text)' }}>$0</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Forever free</p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
                  <span style={{ color: 'var(--muted)' }}>✓</span> {f}
                </li>
              ))}
            </ul>

            {user ? (
              !profileLoading && !isPro ? (
                <div
                  className="block w-full py-3 rounded-xl text-sm font-bold text-center"
                  style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                >
                  {t.currentPlanFree}
                </div>
              ) : null
            ) : (
              <Link
                href="/auth/login"
                className="block w-full py-3 rounded-xl text-sm font-bold text-center no-underline"
                style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' }}
              >
                Get Started Free
              </Link>
            )}
          </div>

          {/* Pro */}
          <div
            className="p-8 rounded-2xl text-left flex flex-col relative overflow-hidden"
            style={{ background: 'var(--accent)', border: '1px solid var(--accent)' }}
          >
            {/* Popular badge */}
            <div
              className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              POPULAR
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t.pricingProTier.toUpperCase()}
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">{price}</span>
                <span className="text-base mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{period}</span>
              </div>
              {interval === 'yearly' && (
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  billed annually ($4/mo)
                </p>
              )}
            </div>

            <p className="text-sm font-medium mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {t.proFeatures}
            </p>
            <ul className="space-y-3 flex-1 mb-8">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white">
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>✓</span> {f}
                </li>
              ))}
            </ul>

            {!profileLoading && isPro ? (
              <div
                className="block w-full py-3 rounded-xl text-sm font-bold text-center"
                style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
              >
                {t.currentPlanPro}
              </div>
            ) : (
              <button
                onClick={handleGetPro}
                disabled={loading}
                className="block w-full py-3 rounded-xl text-sm font-bold text-center transition-opacity hover:opacity-90"
                style={{
                  background: '#fff',
                  color: 'var(--accent)',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? '...' : t.getPro}
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs" style={{ color: 'var(--muted)' }}>
          Cancel anytime · Secure payment by Stripe · VAT may apply
        </p>
      </main>
    </>
  );
}
