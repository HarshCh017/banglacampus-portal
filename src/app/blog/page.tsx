import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { VERIFIED_ARTICLES } from '@/data/articles';
import { BookOpen, Calendar, Clock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Admission & Counselling Insights | BanglaCampus Blog',
  description:
    'Research-backed guides for West Bengal engineering admissions, WBJEE choice-filling strategies, autonomous college accreditations, and regulatory compliance.',
  openGraph: {
    title: 'Admission Insights & Guidance | BanglaCampus',
    description: 'Evidence-based advice on West Bengal engineering colleges and WBJEE counselling.',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span>Educational Research & Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          Admissions, Cutoffs & Regulatory Analysis
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Unbiased, verified editorial publications to guide applicants and guardians through the complexities of WBJEE choice filling, institutional autonomy, and AICTE compliance.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VERIFIED_ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {article.tags[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.readTimeMinutes} min read</span>
                </span>
              </div>

              <h2 className="font-heading font-bold text-lg text-slate-900 hover:text-emerald-700 transition-colors leading-snug">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {article.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <span className="font-medium text-slate-700 block">{article.author.name}</span>
                <span className="text-[11px] text-slate-400">
                  {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 p-1 transition-colors"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
