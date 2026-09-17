import { MetadataRoute } from 'next';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { RESOURCE_ARTICLES } from '@/data/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iem-admissions.edu.in';
  const lastModified = new Date();

  const coreRoutes = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/courses`, lastModified, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/admissions`, lastModified, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/admissions/fees`, lastModified, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/admissions/eligibility`, lastModified, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/iemjee`, lastModified, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/placements`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/campus`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/resources`, lastModified, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/apply`, lastModified, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const branchRoutes = VERIFIED_BRANCHES.map((b) => ({
    url: `${baseUrl}/courses/${b.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const resourceRoutes = RESOURCE_ARTICLES.map((r) => ({
    url: `${baseUrl}/resources/${r.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...coreRoutes, ...branchRoutes, ...resourceRoutes];
}
