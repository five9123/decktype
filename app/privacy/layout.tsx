import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for typee. Learn how we handle your data when you use our Anki typing practice tool.',
  alternates: { canonical: 'https://www.typee.app/privacy' },
  openGraph: {
    title: 'Privacy Policy — typee',
    description: 'How typee handles your data and protects your privacy.',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy — typee',
    description: 'How typee handles your data and protects your privacy.',
  },
};

const privacyBreadcrumb = breadcrumbSchema([
  { name: 'Privacy Policy', url: 'https://www.typee.app/privacy' },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyBreadcrumb) }}
      />
      {children}
    </>
  );
}
