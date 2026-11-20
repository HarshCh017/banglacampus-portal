export const DEFAULT_SITE_URL = 'https://www.bengalcampus.in';

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl.replace(/\/$/, '');
  }
  return DEFAULT_SITE_URL;
}
