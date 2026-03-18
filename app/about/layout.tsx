import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about typee — learn languages through music, movies, and content you love. Our mission: make language learning immersive through typing practice.',
  alternates: {
    canonical: 'https://www.typee.app/about',
    languages: {
      'en': 'https://www.typee.app/about',
      'ja': 'https://www.typee.app/about',
      'ko': 'https://www.typee.app/about',
      'es': 'https://www.typee.app/about',
      'zh': 'https://www.typee.app/about',
      'fr': 'https://www.typee.app/about',
      'x-default': 'https://www.typee.app/about',
    },
  },
  openGraph: {
    title: 'About — typee',
    description:
      'typee turns songs, movies, and subtitles into typing practice. Learn about our mission and why active recall builds stronger memory.',
  },
  twitter: {
    card: 'summary',
    title: 'About — typee',
    description:
      'typee turns songs, movies, and subtitles into typing practice. Learn about our mission and why active recall builds stronger memory.',
  },
};

const aboutBreadcrumb = breadcrumbSchema([
  { name: 'About', url: 'https://www.typee.app/about' },
]);

const aboutSchemas = [
  aboutBreadcrumb,
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About typee — Free Typing Practice App for Language Learning',
    url: 'https://www.typee.app/about',
    description:
      'Learn about typee, the free typing practice app that turns songs, movies, and any content you love into interactive language learning exercises powered by AI.',
    mainEntity: {
      '@type': 'Organization',
      name: 'typee',
      url: 'https://www.typee.app',
      foundingDate: '2024',
      description:
        'typee is built on the belief that the best way to learn a language is through content you already love. By combining active recall typing practice with AI-generated flashcards from real-world content, typee makes language acquisition faster and more enjoyable.',
      knowsAbout: [
        'Language Learning',
        'Typing Practice',
        'Active Recall',
        'Spaced Repetition',
        'AI-powered Education',
        'Vocabulary Acquisition',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: 'https://www.typee.app/contact',
      },
    },
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchemas) }}
      />
      {children}
    </>
  );
}
