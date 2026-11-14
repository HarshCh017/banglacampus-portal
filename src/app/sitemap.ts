import { MetadataRoute } from 'next';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { VERIFIED_ARTICLES } from '@/data/articles';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { RESOURCE_ARTICLES } from '@/data/resources';

const BASE_URL = 'https://bengalcampus.in';

// Stable deterministic timestamps for accurate search engine crawl scheduling
const CURRENT_DATE = new Date();
const DATA_REFRESH_DATE = new Date('2026-03-01T00:00:00Z');
const FOUNDING_DATE = new Date('2024-01-01T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
  // Core Platform Pages
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: CURRENT_DATE, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/colleges`, lastModified: CURRENT_DATE, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/wbjee-predictor`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/compare`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/cutoffs`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/counselling-simulator`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/fee-calculator`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/counselling`, lastModified: CURRENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/courses`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/blog`, lastModified: CURRENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/guides`, lastModified: CURRENT_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/admissions`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/admissions/fees`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/admissions/eligibility`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/iemjee`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/placements`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/apply`, lastModified: CURRENT_DATE, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/resources`, lastModified: CURRENT_DATE, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/contact`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/methodology`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/sources`, lastModified: DATA_REFRESH_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/campus`, lastModified: FOUNDING_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: FOUNDING_DATE, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // College Directory Slugs (/colleges/[slug])
  const collegeRoutes: MetadataRoute.Sitemap = VERIFIED_COLLEGES.map((c) => ({
    url: `${BASE_URL}/colleges/${c.slug}`,
    lastModified: DATA_REFRESH_DATE,
    changeFrequency: 'weekly' as const,
    priority: c.slug === 'iem-kolkata' ? 0.95 : 0.9,
  }));

  // Branch & Course Slugs (/courses/[slug])
  const branchRoutes: MetadataRoute.Sitemap = VERIFIED_BRANCHES.map((b) => ({
    url: `${BASE_URL}/courses/${b.slug}`,
    lastModified: DATA_REFRESH_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Editorial Articles (/blog/[slug])
  const blogRoutes: MetadataRoute.Sitemap = VERIFIED_ARTICLES.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Guides Library Slugs (/guides/[slug])
  const guideRoutes: MetadataRoute.Sitemap = VERIFIED_ARTICLES.map((a) => ({
    url: `${BASE_URL}/guides/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Resource Library Slugs (/resources/[slug])
  const resourceRoutes: MetadataRoute.Sitemap = RESOURCE_ARTICLES.map((r) => ({
    url: `${BASE_URL}/resources/${r.slug}`,
    lastModified: DATA_REFRESH_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...collegeRoutes,
    ...branchRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...resourceRoutes,
  ];
}
