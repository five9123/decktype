import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Create Deck',
  description:
    'Create a typing practice deck from any URL or text. Paste a link or raw text to extract vocabulary with automatic language detection.',
  alternates: { canonical: 'https://www.typee.app/create' },
  openGraph: {
    title: 'Create Deck — typee',
    description: 'Create flashcard decks from URLs or raw text for typing practice.',
  },
  twitter: {
    card: 'summary',
    title: 'Create Deck — typee',
    description: 'Create flashcard decks from URLs or raw text for typing practice.',
  },
};

const createBreadcrumb = breadcrumbSchema([
  { name: 'Create Deck', url: 'https://www.typee.app/create' },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadcrumb) }}
      />
      {children}
    </>
  );
}
