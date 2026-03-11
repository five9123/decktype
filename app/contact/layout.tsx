import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the typee team. Questions, feedback, or support requests about Anki typing practice.',
  alternates: { canonical: 'https://www.typee.app/contact' },
  openGraph: {
    title: 'Contact Us — typee',
    description: 'Get in touch with the typee team for support or feedback.',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us — typee',
    description: 'Get in touch with the typee team for support or feedback.',
  },
};

const contactBreadcrumb = breadcrumbSchema([
  { name: 'Contact', url: 'https://www.typee.app/contact' },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumb) }}
      />
      {children}
    </>
  );
}
