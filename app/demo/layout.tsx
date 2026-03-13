import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Try Demo',
  description:
    'Try typee without signing up. Practice vocabulary from Japanese and Korean content with Fill Blank, Word Game, and typing modes.',
  alternates: { canonical: 'https://www.typee.app/demo' },
  openGraph: {
    title: 'Try Demo — typee',
    description: 'No sign-up required. Learn Japanese and Korean through songs and games.',
  },
  twitter: {
    card: 'summary',
    title: 'Try Demo — typee',
    description: 'No sign-up required. Learn Japanese and Korean through songs and games.',
  },
};

const demoBreadcrumb = breadcrumbSchema([
  { name: 'Demo', url: 'https://www.typee.app/demo' },
]);

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(demoBreadcrumb) }}
      />
      {children}
    </>
  );
}
