import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Create Deck',
  description:
    'Create a language learning deck from song lyrics, SRT subtitle files, or any text. AI generates vocabulary and fill-in-the-blank cards instantly.',
  alternates: { canonical: 'https://www.typee.app/create' },
  openGraph: {
    title: 'Create Deck — typee',
    description: 'Paste lyrics or drop subtitles — AI creates typing and fill-blank cards instantly.',
  },
  twitter: {
    card: 'summary',
    title: 'Create Deck — typee',
    description: 'Paste lyrics or drop subtitles — AI creates typing and fill-blank cards instantly.',
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
