import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for typee, the AI-powered language learning app for music and movie fans.',
  alternates: { canonical: 'https://www.typee.app/terms' },
  openGraph: {
    title: 'Terms of Service — typee',
    description: 'Terms of Service for typee.',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service — typee',
    description: 'Terms of Service for typee.',
  },
};

const termsBreadcrumb = breadcrumbSchema([
  { name: 'Terms of Service', url: 'https://www.typee.app/terms' },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsBreadcrumb) }}
      />
      {children}
    </>
  );
}
