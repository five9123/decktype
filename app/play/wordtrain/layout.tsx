import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play Word Train',
  description:
    'Play Word Train — type words against the clock and build combos! No sign-up required.',
  robots: { index: false },
};

export default function PlayWordTrainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
