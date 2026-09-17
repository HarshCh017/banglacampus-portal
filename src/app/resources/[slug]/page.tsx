import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RESOURCE_ARTICLES, getResourceBySlug } from '@/data/resources';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ChevronRight, Clock, BookOpen, Share2, ArrowLeft, ShieldCheck, Phone } from 'lucide-react';

interface ResourceArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESOURCE_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ResourceArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceBySlug(slug);

  if (!article) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: `${article.title} | IEM Kolkata Resources`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
    },
  };
}

export default async function ResourceArticlePage({ params }: ResourceArticlePageProps) {
  const { slug } = await params;
  const article = getResourceBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'EducationalOrganization',
      name: 'Institute of Engineering & Management (IEM), Kolkata',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Institute of Engineering & Management (IEM), Kolkata',
    },
    datePublished: '2027-01-01',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/resources" className="hover:text-brandBlue-600 font-medium">Resources</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{article.title}</span>
        </div>
      </div>

      <article className="py-12 md:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandBlue-600 hover:text-brandBlue-700 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Resources</span>
          </Link>

          {/* Article Header */}
          <div className="space-y-3 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="px-2.5 py-0.5 rounded-full bg-brandBlue-100 text-brandBlue-700 font-bold uppercase tracking-wider text-[10px]">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>Published {article.publishedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed font-sans">
              {article.excerpt}
            </p>
          </div>

          {/* Article Content */}
          <div className="py-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
            {article.content.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* In-Content Guidance Card */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <LeadCaptureForm
              id={`article-lead-form-${article.slug}`}
              sourceCtaId={`article-${article.slug}`}
              headline="Have Questions on This Topic?"
              subheadline="Connect with an IEM Kolkata academic counsellor to discuss your branch and entrance options."
            />
          </div>

        </div>
      </article>
    </>
  );
}
