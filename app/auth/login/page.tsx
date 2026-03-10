'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

        {/* ── LEFT PANEL (desktop only) ── */}
        <div
          className="hidden md:flex flex-col justify-center items-center p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 50%, #1a1a2e 50%))',
          }}
        >
          {/* Decorative glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }} />

          <div className="relative z-10 max-w-md w-full">
            {/* Value proposition */}
            <h2 className="text-3xl font-bold mb-3 text-white">
              {t.loginHeroTitle}
            </h2>
            <p className="text-base mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {t.loginHeroDesc}
            </p>

            {/* Product mockup */}
            <div className="rounded-2xl overflow-hidden" style={{
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'var(--surface)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
            }}>
              {/* Browser chrome */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#F87171' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FBBF24' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#4ADE80' }} />
                <div
                  className="flex-1 mx-3 px-2 py-0.5 rounded text-xs text-center"
                  style={{ background: 'var(--bg)', color: 'var(--muted)' }}
                >
                  typee.app/practice
                </div>
              </div>
              {/* Typing UI preview */}
              <div className="p-6 text-center">
                <p className="text-2xl font-bold mb-0.5" style={{ color: 'var(--text)' }}>자전거</p>
                <p className="text-xs mb-0.5" style={{ color: 'var(--accent)', opacity: 0.8 }}>jajeongeo</p>
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>bicycle</p>
                <div className="flex justify-center gap-0.5 font-mono text-lg mb-4">
                  {['자', '전', '거'].map((ch, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < 1 ? 'var(--correct)' : i === 1 ? 'var(--incorrect)' : 'var(--muted)',
                        opacity: i === 2 ? 0.4 : 1,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
                <div
                  className="mx-auto px-3 py-2 rounded-lg text-sm text-left"
                  style={{
                    maxWidth: 200,
                    background: 'var(--bg)',
                    border: '1px solid var(--accent)',
                    color: 'var(--text)',
                  }}
                >
                  자저<span style={{ borderRight: '2px solid var(--accent)' }}>&nbsp;</span>
                </div>
                <div className="flex justify-center gap-4 mt-4 text-xs" style={{ color: 'var(--muted)' }}>
                  <span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>74</span> WPM</span>
                  <span><span style={{ color: 'var(--correct)', fontWeight: 700 }}>96%</span> Accuracy</span>
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="mt-10 space-y-4">
              {[
                { icon: '🧠', text: t.loginFeature1 },
                { icon: '📊', text: t.loginFeature2 },
                { icon: '🌍', text: t.loginFeature3 },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-sm font-medium text-white">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL (always visible) ── */}
        <div className="flex flex-col justify-center items-center px-6 py-12 md:px-12">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              typee
            </h1>

            {/* Welcome */}
            <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              {t.loginWelcome}
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
              {t.loginDesc}
            </p>

            {/* Google sign-in */}
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {t.signInWithGoogle}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{t.loginOrDivider}</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            {/* Demo link */}
            <Link
              href="/demo"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-opacity hover:opacity-90"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
            >
              {t.loginTryDemo} →
            </Link>

            {/* Reassurance */}
            <div className="mt-8 space-y-1.5 text-center">
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                ✓ {t.loginReassurance1}
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                ✓ {t.loginReassurance2}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
