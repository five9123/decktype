import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Practice Typing with Anki Decks on typee',
  description:
    'Learn how to upload your Anki deck and practice typing flashcards with WPM and accuracy tracking.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Upload Your Deck',
      text: 'Export an .apkg file from Anki, then drag and drop it into typee or click Browse to upload. You can also try the built-in demo decks.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Choose a Practice Mode',
      text: 'Select a practice direction (front-to-back or back-to-front), card order (sequential, random, or difficult-first), and start your session.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Type Your Answers',
      text: 'The front of each card is displayed. Type the correct answer and press Enter. typee shows real-time WPM and per-character accuracy feedback.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Track Your Progress',
      text: 'View your WPM trends, accuracy stats, and mastery level for each card. Smart Review automatically prioritizes cards you find difficult.',
    },
  ],
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            howToSchema,
            faqSchema,
            breadcrumbSchema([{ name: 'Usage Guide', url: 'https://www.typee.app/guide' }]),
          ]),
        }}
      />
      {children}
    </>
  );
}
