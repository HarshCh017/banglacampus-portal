import { MetadataRoute } from 'next';

const BASE_URL = 'https://bengalcampus.in';

export default function robots(): MetadataRoute.Robots {
  const privateRoutes = [
    '/api/',
    '/login',
    '/admin',
    '/dashboard',
    '/thank-you',
    '/data-deletion',
    '/_next/',
    '/privacy', // Redirects to /privacy-policy
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privateRoutes,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/images/', '/icon*.png', '/apple-touch-icon.png', '/google*.html'],
        disallow: privateRoutes,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/public/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: privateRoutes,
      },
      // Modern AI Search Crawlers (Perplexity, ChatGPT Search, Claude, Apple Intelligence)
      {
        userAgent: [
          'PerplexityBot',
          'Claude-SearchBot',
          'GPTBot',
          'ChatGPT-User',
          'Applebot',
          'Applebot-Extended',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/api/', '/admin', '/dashboard', '/login'],
      },
      // Block aggressive commercial scrapers to conserve server resources
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot'],
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
