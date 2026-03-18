import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Usage Guide',
  description:
    'Learn how to use typee: paste song lyrics, drop SRT subtitles, or import Anki decks to create typing practice cards. Play Fill Blank and Word Game modes.',
  alternates: {
    canonical: 'https://www.typee.app/guide',
    languages: {
      'en': 'https://www.typee.app/guide',
      'ja': 'https://www.typee.app/guide',
      'ko': 'https://www.typee.app/guide',
      'es': 'https://www.typee.app/guide',
      'zh': 'https://www.typee.app/guide',
      'fr': 'https://www.typee.app/guide',
      'x-default': 'https://www.typee.app/guide',
    },
  },
  openGraph: {
    title: 'Usage Guide — typee',
    description: 'Step-by-step guide: create cards from lyrics & subtitles, then practice with typing, Fill Blank, and Word Game modes.',
  },
  twitter: {
    card: 'summary',
    title: 'Usage Guide — typee',
    description: 'Step-by-step guide: create cards from lyrics & subtitles, then practice with typing, Fill Blank, and Word Game modes.',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Learn Languages with Songs and Subtitles on typee',
  description:
    'Learn how to create vocabulary cards from song lyrics or SRT subtitles and practice with typing, Fill Blank, and Word Game modes.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Create from Any Content',
      text: 'Paste song lyrics or subtitles into the Media tab, or drop an .srt file. You can also import an Anki .apkg file or create cards manually. AI extracts vocabulary and cloze cards automatically.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Choose a Practice Mode',
      text: 'Select a practice mode: classic typing (back-to-front), Fill-in-the-blank for cloze cards, or Word Rain. Also set card order: sequential, random, or difficult-first.',
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
        text: 'Any language — Japanese, Korean, Chinese, Spanish, French, German, and more. typee is especially popular for learning through K-pop, J-pop, K-drama, and anime content.',
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
