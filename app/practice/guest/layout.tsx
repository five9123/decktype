import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Preview',
  description: 'Try typing practice with your Anki deck before signing up.',
  robots: { index: false },
};

export default function GuestPracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
