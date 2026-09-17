import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/thank-you'],
      },
    ],
    sitemap: 'https://iem-admissions.edu.in/sitemap.xml',
  };
}
