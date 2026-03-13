import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about typee — learn languages through music, movies, and content you love. Our mission: make language learning immersive through typing practice.',
  alternates: { canonical: 'https://www.typee.app/about' },
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumb) }}
      />
      {children}
    </>
  );
}
