import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for typee, the Anki deck typing practice web application.',
  alternates: { canonical: 'https://www.typee.app/terms' },
  openGraph: {
    title: 'Terms of Service — typee',
    description: 'Terms of Service for typee.',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service — typee',
    description: 'Terms of Service for typee.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
