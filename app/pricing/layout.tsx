import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Start free with 1 deck. Upgrade to typee Pro for unlimited decks, advanced stats, and priority support. $5/month or $48/year.',
  alternates: { canonical: 'https://www.typee.app/pricing' },
  openGraph: {
    title: 'Pricing — typee',
    description: 'Free plan available. Upgrade to Pro from $5/month.',
  },
  twitter: {
    card: 'summary',
    title: 'Pricing — typee',
    description: 'Free plan available. Upgrade to Pro from $5/month.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
