'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function GlobalFooter() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        color: 'var(--muted)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Navigation columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold no-underline"
              style={{ color: 'var(--accent)' }}
            >
              typee
            </Link>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>
              {t.footer}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--text)' }}
            >
              {t.footerProduct}
            </h4>
            <ul className="space-y-2 text-sm list-none p-0 m-0">
              <li>
                <Link href="/demo" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerDemo}
                </Link>
              </li>
              <li>
                <Link href="/upload" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerUpload}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerPricing}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--text)' }}
            >
              {t.footerSupport}
            </h4>
            <ul className="space-y-2 text-sm list-none p-0 m-0">
              <li>
                <Link href="/guide" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerGuide}
                </Link>
              </li>
              <li>
                <Link href="/about" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerAbout}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerContact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--text)' }}
            >
              {t.footerLegal}
            </h4>
            <ul className="space-y-2 text-sm list-none p-0 m-0">
              <li>
                <Link href="/terms" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerTerms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="no-underline transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  {t.footerPrivacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <LanguageSwitcher />
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            &copy; {new Date().getFullYear()} typee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
