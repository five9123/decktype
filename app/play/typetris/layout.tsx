import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play Typetris',
  description:
    'Play the Typetris word game — type falling words to destroy them! No sign-up required.',
  robots: { index: false },
};

export default function PlayTypetrisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
