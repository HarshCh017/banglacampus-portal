import { MetadataRoute } from 'next';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { VERIFIED_ARTICLES } from '@/data/articles';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { RESOURCE_ARTICLES } from '@/data/resources';
import { getSiteUrl } from '@/lib/site';

const BASE_URL = getSiteUrl();

// Stable deterministic timestamps for accurate search engine crawl scheduling
const RECENT_CONTENT_DATE = new Date('2026-11-21T00:00:00Z');
const ARCHIVE_REFRESH_DATE = new Date('2026-10-25T00:00:00Z');
const FOUNDING_DATE = new Date('2024-01-01T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
  // Core Platform Pages
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/colleges`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/wbjee-predictor`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/compare`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/compare/iem-kolkata-vs-heritage`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/cutoffs`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/counselling-simulator`, lastModified: ARCHIVE_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/fee-calculator`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/counselling`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/courses`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/guides`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/admissions`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/admissions/fees`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/admissions/eligibility`, lastModified: ARCHIVE_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/iemjee`, lastModified: ARCHIVE_REFRESH_DATE, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/placements`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/apply`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/resources`, lastModified: RECENT_CONTENT_DATE, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/contact`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/methodology`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/sources`, lastModified: ARCHIVE_REFRESH_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/campus`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // College Directory Slugs (/colleges/[slug])
  const collegeRoutes: MetadataRoute.Sitemap = VERIFIED_COLLEGES.map((c) => {
    const rawDate = c.provenance?.fees?.retrievedAt;
    const lastModified = rawDate ? new Date(rawDate) : RECENT_CONTENT_DATE;
    return {
      url: `${BASE_URL}/colleges/${c.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: c.slug === 'iem-kolkata' || c.slug === 'haldia-institute-of-technology' ? 0.95 : 0.9,
    };
  });

  // Branch & Course Slugs (/courses/[slug])
  const branchRoutes: MetadataRoute.Sitemap = VERIFIED_BRANCHES.map((b) => ({
    url: `${BASE_URL}/courses/${b.slug}`,
    lastModified: RECENT_CONTENT_DATE,
    changeFrequency: 'monthly' as const,
    priority: b.slug === 'cse-iot-cs-bt' ? 0.9 : 0.8,
  }));

  // Guides Library Slugs (/guides/[slug])
  const guideRoutes: MetadataRoute.Sitemap = VERIFIED_ARTICLES.map((a) => ({
    url: `${BASE_URL}/guides/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Resource Library Slugs (/resources/[slug])
  const resourceRoutes: MetadataRoute.Sitemap = RESOURCE_ARTICLES.map((r) => ({
    url: `${BASE_URL}/resources/${r.slug}`,
    lastModified: r.updatedAt ? new Date(r.updatedAt) : ARCHIVE_REFRESH_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [
    ...coreRoutes,
    ...collegeRoutes,
    ...branchRoutes,
    ...guideRoutes,
    ...resourceRoutes,
  ];
}
