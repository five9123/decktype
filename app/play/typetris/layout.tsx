import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play Word Rain',
  description:
    'Play Word Rain — type falling words to destroy them! No sign-up required.',
  robots: { index: false },
};

export default function PlayTypetrisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
