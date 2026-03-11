import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Try Demo',
  description:
    'Try typee without signing up. Practice typing with a sample Anki deck and experience WPM tracking and smart review.',
  alternates: { canonical: 'https://www.typee.app/demo' },
  openGraph: {
    title: 'Try Demo — typee',
    description: 'No sign-up required. See how typee turns Anki flashcards into typing practice.',
  },
  twitter: {
    card: 'summary',
    title: 'Try Demo — typee',
    description: 'No sign-up required. See how typee turns Anki flashcards into typing practice.',
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
