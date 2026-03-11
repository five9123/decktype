import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/stats',
        '/billing',
        '/create',
        '/upload',
        '/deck/',
        '/results',
        '/api/',
      ],
    },
    sitemap: 'https://www.typee.app/sitemap.xml',
  };
}
