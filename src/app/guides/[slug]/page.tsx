import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ChevronRight,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { VERIFIED_ARTICLES } from '@/data/articles';
import {
  MarkdownArticleRenderer,
  extractHeadings,
} from '@/components/MarkdownArticleRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VERIFIED_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = VERIFIED_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Guide Not Found | BengalCampus' };

  const canonicalUrl = `https://bengalcampus.in/guides/${article.slug}`;
  const heroImg = article.heroImage
    ? (article.heroImage.startsWith('http') ? article.heroImage : `https://bengalcampus.in${article.heroImage}`)
    : 'https://bengalcampus.in/images/hero-campus.jpg';

  return {
    title: `${article.title} | BengalCampus Guide`,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | BengalCampus`,
      description: article.description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: heroImg,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [heroImg],
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = VERIFIED_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadings(article.content);
  const related = VERIFIED_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.heroImage
      ? (article.heroImage.startsWith('http') ? article.heroImage : `https://bengalcampus.in${article.heroImage}`)
      : 'https://bengalcampus.in/images/hero-campus.jpg',
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.title,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BengalCampus',
      url: 'https://bengalcampus.in',
      logo: 'https://bengalcampus.in/icon.svg',
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: `https://bengalcampus.in/guides/${article.slug}`,
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bengalcampus.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Admission Guides',
        item: 'https://bengalcampus.in/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://bengalcampus.in/guides/${article.slug}`,
      },
    ],
  };

  const heroImageSrc = article.heroImage || '/images/colleges/jadavpur-university-engineering.jpg';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 1. Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-6">
          <Link href="/" className="hover:text-[#1455B8] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/guides" className="hover:text-[#1455B8] transition-colors">
            Admission Guides
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#102A56] truncate max-w-sm">
            {article.title}
          </span>
        </nav>

        {/* 2. Article Header */}
        <div className="max-w-4xl mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2FF] text-[#1455B8] font-bold text-xs border border-[#BFDBFE]">
              {article.tags[0] || 'WBJEE Process'}
            </span>
            <span className="text-xs text-[#64748B] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
              <span>
                Published:{' '}
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </span>
            {article.updatedAt && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-[#0F8B70] font-medium flex items-center gap-1">
                  <span>
                    Updated:{' '}
                    {new Date(article.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </span>
              </>
            )}
            <span className="text-slate-300">•</span>
            <span className="text-xs text-[#64748B] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{article.readTimeMinutes} min read</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            {article.description}
          </p>

          {/* Author Byline */}
          <div className="pt-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EAF2FF] border border-[#BFDBFE] flex items-center justify-center text-[#1455B8] font-bold text-xs shrink-0">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-[#102A56] flex items-center gap-1.5">
                <span>{article.author.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F8B70]" />
              </div>
              <div className="text-[11px] text-[#64748B]">{article.author.title}</div>
            </div>
          </div>
        </div>

        {/* 3. Featured Hero Image Banner */}
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm mb-10 bg-[#FAFBFD]">
          <Image
            src={heroImageSrc}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1240px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* 4. Two-Column Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Dynamic Sticky Table of Contents */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sticky top-24 space-y-4">
            <h3 className="font-heading font-bold text-base text-[#102A56] pb-3 border-b border-[#F1F5F9]">
              Table of Contents
            </h3>
            {headings.length > 0 ? (
              <ol className="space-y-2 text-xs text-[#64748B]">
                {headings.map((heading, idx) => (
                  <li
                    key={heading.id}
                    className={`flex items-start gap-2 hover:text-[#1455B8] transition-colors ${
                      heading.level === 3 ? 'pl-3 text-[11px]' : heading.level === 4 ? 'pl-6 text-[11px]' : 'font-medium'
                    }`}
                  >
                    <span className="text-slate-400 font-mono text-[10px] shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <a
                      href={`#${heading.id}`}
                      className="hover:underline leading-snug"
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-slate-400">Section navigation available in body.</p>
            )}

            <div className="pt-4 mt-4 border-t border-[#F1F5F9] space-y-2">
              <span className="text-[11px] font-semibold text-[#102A56] block">
                Need personalized admission advice?
              </span>
              <Link
                href="/counselling"
                className="w-full py-2.5 rounded-xl bg-[#EAF2FF] hover:bg-[#D8E7FF] text-[#1455B8] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Consult an Admissions Advisor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Right Column: Dynamic Article Content */}
          <main className="lg:col-span-8 space-y-6">
            {/* Regulatory Verified Citation Banner */}
            <div className="p-4 rounded-xl bg-[#EAF2FF]/70 border border-[#BFDBFE] flex items-center justify-between text-xs text-[#102A56]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0F8B70] shrink-0" />
                <span className="font-semibold">
                  Audited Research Guide &bull; West Bengal Technical Admissions
                </span>
              </div>
              <span className="text-[11px] text-[#64748B]">Academic Cycle 2026–2027</span>
            </div>

            {/* Dynamic Markdown Body */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 text-sm leading-relaxed text-[#172033]">
              <MarkdownArticleRenderer content={article.content} />

              {/* Official External Resources Footer */}
              <div className="mt-8 pt-6 border-t border-[#F1F5F9] space-y-3">
                <span className="text-xs font-bold text-[#102A56] block">
                  Authoritative Statutory References:
                </span>
                <ul className="space-y-2 text-xs text-[#1455B8]">
                  <li>
                    <a
                      href="https://wbjeeb.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>WBJEEB Centralized Admissions Portal (wbjeeb.nic.in)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.aicte-india.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>AICTE Approval Process Handbook &amp; TFW Guidelines</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://svmcm.wbhed.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>SVMCM Higher Education Scholarship Portal (svmcm.wbhed.gov.in)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Related Guides */}
            {related.length > 0 && (
              <div className="pt-6 space-y-3">
                <h3 className="font-heading font-bold text-base text-[#102A56]">
                  Related Admission Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/guides/${rel.slug}`}
                      className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#1455B8] hover:shadow-xs transition-all space-y-1.5 block group"
                    >
                      <span className="text-[10px] font-bold text-[#1455B8] uppercase tracking-wider block">
                        {rel.tags[0] || 'Guide'}
                      </span>
                      <h4 className="text-xs font-bold text-[#102A56] group-hover:text-[#1455B8] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] line-clamp-2">
                        {rel.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
