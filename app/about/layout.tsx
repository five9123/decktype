import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about typee — the typing practice tool for Anki users. Our mission, story, and why active recall through typing builds stronger memory.',
  alternates: { canonical: 'https://www.typee.app/about' },
  openGraph: {
    title: 'About — typee',
    description:
      'typee turns Anki flashcards into typing practice. Learn about our mission and why typing builds stronger memory.',
  },
  twitter: {
    card: 'summary',
    title: 'About — typee',
    description:
      'typee turns Anki flashcards into typing practice. Learn about our mission and why typing builds stronger memory.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
