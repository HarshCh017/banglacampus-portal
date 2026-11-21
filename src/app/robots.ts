import { MetadataRoute } from 'next';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const BASE_URL = rawSiteUrl && !rawSiteUrl.includes('localhost') ? rawSiteUrl.replace(/\/$/, '') : 'https://bengalcampus.in';

export default function robots(): MetadataRoute.Robots {
  const privateRoutes = [
    '/api/',
    '/login',
    '/admin',
    '/dashboard',
    '/thank-you',
    '/data-deletion',
    '/*?*preselect=',
    '/*?*branch=',
    '/*?*colleges=',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/images/', '/icon*.png', '/apple-touch-icon.png', '/_next/static/'],
        disallow: privateRoutes,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/images/', '/icon*.png', '/apple-touch-icon.png', '/google*.html', '/_next/static/'],
        disallow: privateRoutes,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/public/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/images/', '/icon*.png', '/apple-touch-icon.png', '/_next/static/'],
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
