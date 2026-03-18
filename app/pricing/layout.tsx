import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Start free with 1 deck. Upgrade to typee Pro for unlimited decks, advanced stats, and priority support. $5/month or $48/year.',
  alternates: {
    canonical: 'https://www.typee.app/pricing',
    languages: {
      'en': 'https://www.typee.app/pricing',
      'ja': 'https://www.typee.app/pricing',
      'ko': 'https://www.typee.app/pricing',
      'es': 'https://www.typee.app/pricing',
      'zh': 'https://www.typee.app/pricing',
      'fr': 'https://www.typee.app/pricing',
      'x-default': 'https://www.typee.app/pricing',
    },
  },
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

const pricingSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'typee Free',
    description:
      'Free language learning with 1 deck, 100 cards, all practice modes (typing, fill blank, word game), WPM and accuracy tracking.',
    brand: { '@type': 'Organization', name: 'typee' },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.typee.app/pricing',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'typee Pro',
    description:
      'Unlimited decks and cards, AI media generation from lyrics & subtitles, activity heatmap, WPM trend chart, and priority support.',
    brand: { '@type': 'Organization', name: 'typee' },
    offers: [
      {
        '@type': 'Offer',
        price: '5.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.typee.app/pricing',
        priceValidUntil: '2026-12-31',
        billingDuration: 'P1M',
      },
      {
        '@type': 'Offer',
        price: '48.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.typee.app/pricing',
        priceValidUntil: '2026-12-31',
        billingDuration: 'P1Y',
      },
    ],
  },
];

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...pricingSchema,
            breadcrumbSchema([{ name: 'Pricing', url: 'https://www.typee.app/pricing' }]),
          ]),
        }}
      />
      {children}
    </>
  );
}
