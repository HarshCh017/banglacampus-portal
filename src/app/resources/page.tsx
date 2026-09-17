import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RESOURCE_ARTICLES } from '@/data/resources';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ChevronRight, ShieldCheck, BookOpen, Clock, ArrowRight, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Admission & Preparation Resources | IEM Kolkata',
  description:
    'Free admission resources, IEMJEE 2027 syllabus guides, WBJEE comparison, and computing branch selection strategies for B.Tech aspirants.',
};

export default function ResourcesPage() {
  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Resources &amp; Guides</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <BookOpen className="w-4 h-4" />
              <span>Candidate Preparation Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Engineering Admission Guides &amp; Resources
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Expert guides written to demystify engineering entrance pathways, branch choices, and admission counselling for IEM Kolkata.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Listing */}
      <section className="py-14 md:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCE_ARTICLES.map((art) => (
              <div
                key={art.slug}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-brandBlue-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-brandBlue-50 text-brandBlue-700 font-semibold text-[11px]">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 font-heading group-hover:text-brandBlue-600 transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">{art.publishedDate}</span>
                  <Link
                    href={`/resources/${art.slug}`}
                    className="text-xs font-bold text-brandBlue-600 group-hover:text-brandBlue-700 flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <LeadCaptureForm
              id="resources-lead-form"
              sourceCtaId="resources-hub-page"
              headline="Download Fee &amp; Placement PDF Guide"
              subheadline="Submit your Class 12 details to receive our comprehensive 2027 admission document."
            />
          </div>
        </div>
      </section>
    </>
  );
}
