import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Usage Guide',
  description:
    'Learn how to use typee: upload Anki decks, practice typing flashcards, track WPM and accuracy. Step-by-step guide with FAQ.',
  alternates: { canonical: 'https://www.typee.app/guide' },
  openGraph: {
    title: 'Usage Guide — typee',
    description: 'Step-by-step guide to typing practice with your Anki decks.',
  },
  twitter: {
    card: 'summary',
    title: 'Usage Guide — typee',
    description: 'Step-by-step guide to typing practice with your Anki decks.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is typee free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! The free plan includes 1 deck with up to 100 cards, all practice modes, and basic stats. Upgrade to Pro for unlimited decks and advanced features.',
      },
    },
    {
      '@type': 'Question',
      name: 'What languages are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any language that works in Anki works in typee — Japanese, Korean, Chinese, Spanish, French, German, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use typee without an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can try the demo or upload a deck as a guest. Create a free account to save your decks and track progress.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Smart Review work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart Review uses a confidence score that updates based on your accuracy. Cards you frequently get wrong are shown more often, while mastered cards appear less frequently.',
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
