import { permanentRedirect } from 'next/navigation';
import { VERIFIED_ARTICLES } from '@/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VERIFIED_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export default async function BlogSlugRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/guides/${slug}`);
}
