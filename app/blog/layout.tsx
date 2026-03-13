import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore the science and practical strategies behind typing-based language learning. Tips, guides, and research for mastering new languages through typing.',
  alternates: { canonical: 'https://www.typee.app/blog' },
  openGraph: {
    title: 'Blog | typee',
    description:
      'Learn why typing is one of the most effective ways to master a new language. Science-backed articles and practical guides.',
    url: 'https://www.typee.app/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | typee',
    description:
      'Science-backed articles on typing-based language learning.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
