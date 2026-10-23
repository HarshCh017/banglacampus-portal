import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { VERIFIED_ARTICLES, getArticleBySlug } from '@/data/articles';
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  Share2,
  BookOpen,
  Home,
  ShieldCheck,
} from 'lucide-react';

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
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${article.title} | BanglaCampus Guide`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: article.author.name,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'BanglaCampus',
      url: 'https://banglacampus.in',
    },
    mainEntityOfPage: `https://banglacampus.in/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-emerald-700">
            Articles
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                BC
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{article.author.name}</span>
                <span className="text-slate-400">{article.author.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Updated {new Date(article.updatedAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTimeMinutes} min read</span>
              </span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-slate-800 space-y-6 leading-relaxed text-sm sm:text-base">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-6 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('| ')) {
              // Simple markdown table
              const lines = paragraph.split('\n').filter(Boolean);
              const headers = lines[0].split('|').map((c) => c.trim()).filter(Boolean);
              const rows = lines.slice(2).map((line) => line.split('|').map((c) => c.trim()).filter(Boolean));
              return (
                <div key={index} className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {headers.map((h, i) => (
                          <th key={i} className="p-3 font-bold text-slate-900">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n- ').map((item) => item.replace(/^- /, ''));
              return (
                <ul key={index} className="list-disc pl-5 space-y-2 my-4 text-slate-700">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="text-slate-700">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Editorial Disclaimer Footer */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 space-y-2 mt-10">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Editorial Standard & Independence</span>
          </div>
          <p className="leading-relaxed">
            This guide was researched and published independently by the BanglaCampus Higher Education Desk. Figures and regulatory policies are verified against published AICTE, WBJEEB, and MAKAUT circulars. We accept zero financial compensation for institutional recommendations.
          </p>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <span>Explore Engineering Directory</span>
          </Link>
        </div>
      </article>
    </>
  );
}
