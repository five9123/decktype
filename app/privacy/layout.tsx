import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for typee. Learn how we handle your data when you use our Anki typing practice tool.',
  alternates: { canonical: 'https://www.typee.app/privacy' },
  openGraph: {
    title: 'Privacy Policy — typee',
    description: 'How typee handles your data and protects your privacy.',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy — typee',
    description: 'How typee handles your data and protects your privacy.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
