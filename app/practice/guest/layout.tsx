import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Preview',
  description: 'Try typee without signing up. Upload any text or subtitle file to generate typing practice cards.',
  robots: { index: false },
};

export default function GuestPracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
