import { MetadataRoute } from 'next';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { VERIFIED_ARTICLES } from '@/data/articles';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { RESOURCE_ARTICLES } from '@/data/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://banglacampus.in';
  const lastModified = new Date();

  const coreRoutes = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/colleges`, lastModified, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/compare`, lastModified, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/cutoffs`, lastModified, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/cookie-policy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.4 },

    // Preserved institutional acquisition routes
    { url: `${baseUrl}/courses`, lastModified, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/admissions`, lastModified, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/admissions/fees`, lastModified, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/admissions/eligibility`, lastModified, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/iemjee`, lastModified, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/placements`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/campus`, lastModified, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/resources`, lastModified, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/apply`, lastModified, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const collegeRoutes = VERIFIED_COLLEGES.map((c) => ({
    url: `${baseUrl}/colleges/${c.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogRoutes = VERIFIED_ARTICLES.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const branchRoutes = VERIFIED_BRANCHES.map((b) => ({
    url: `${baseUrl}/courses/${b.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const resourceRoutes = RESOURCE_ARTICLES.map((r) => ({
    url: `${baseUrl}/resources/${r.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...coreRoutes, ...collegeRoutes, ...blogRoutes, ...branchRoutes, ...resourceRoutes];
}
