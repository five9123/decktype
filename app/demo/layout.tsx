import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Try Demo',
  description:
    'Try typee without signing up. Practice typing with a sample Anki deck and experience WPM tracking and smart review.',
  openGraph: {
    title: 'Try Demo — typee',
    description: 'No sign-up required. See how typee turns Anki flashcards into typing practice.',
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
