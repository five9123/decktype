import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the typee team. Questions, feedback, or support requests about Anki typing practice.',
  alternates: { canonical: 'https://www.typee.app/contact' },
  openGraph: {
    title: 'Contact Us — typee',
    description: 'Get in touch with the typee team for support or feedback.',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us — typee',
    description: 'Get in touch with the typee team for support or feedback.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
