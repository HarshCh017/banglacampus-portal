import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Scale,
  ShieldCheck,
  Search,
  CheckCircle2,
  Building2,
  FileText,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
} from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { VERIFIED_ARTICLES } from '@/data/articles';
import { CollegeCard } from '@/components/CollegeCard';
import { NewsletterForm } from '@/components/NewsletterForm';

export default function HomePage() {
  const featuredColleges = VERIFIED_COLLEGES.filter((c) => c.featured);
  const recentArticles = VERIFIED_ARTICLES.slice(0, 3);

  const homeFaqs = [
    {
      q: 'How does BanglaCampus verify engineering college data?',
      a: 'We trace every published figure (NIRF rankings, NAAC grades, AICTE approval, approved seats, and tuition circulars) to authoritative regulatory bodies including AICTE Extension of Approval records, WBJEEB seat matrices, NAAC registries, and official institutional disclosures. Each college profile provides direct source URLs and retrieval timestamps.',
    },
    {
      q: 'Are any colleges paying BanglaCampus for higher placement or sponsored badges?',
      a: 'No. BanglaCampus operates strictly with zero admission commissions and zero sponsored placements. Rankings and directory listings are ordered by verified objective metrics (such as NIRF ranks, seat codes, or user-selected filters) rather than marketing sponsorship.',
    },
    {
      q: 'How does the side-by-side comparison tool work?',
      a: 'You can select up to 3 colleges from anywhere in the directory. Our comparison matrix aligns regulatory approvals, tuition fee bands, campus locations, accepted entrance examinations, and B.Tech branch offerings with explicit missing-value handling.',
    },
    {
      q: 'What should I do before paying admission or counselling fees?',
      a: 'Always cross-verify current-year notices and fee demand letters directly with the official college administration or the centralized WBJEEB counselling portal (wbjeeb.nic.in). BanglaCampus provides verified public information, but institutional fee revisions can occur annually.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* FAQ Schema for Rich Search Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b15_1px,transparent_1px),linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Traceable Regulatory Data · Zero Agent Commissions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight max-w-4xl mx-auto text-white">
            <span className="text-white drop-shadow-md">Discover & Compare Engineering Colleges in</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 font-black">
              West Bengal
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Evidence-backed directory for students and families. Inspect verified B.Tech tuition fees, AICTE/NAAC credentials, WBJEEB seat matrices, and side-by-side comparisons with zero fabricated claims.
          </p>

          {/* Quick Search Form */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              action="/colleges"
              method="GET"
              className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search college by name, city, or stream (e.g. Jadavpur, Salt Lake, CSE)..."
                  className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-xl placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 shrink-0"
              >
                Search Colleges
              </button>
            </form>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All {VERIFIED_COLLEGES.length} Verified Colleges</span>
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Compare Up to 3 Side-by-Side</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How BanglaCampus Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Independent & Evidence-First
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            How BanglaCampus Empowers Your Decision
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No marketing slogans or inflated cutoffs. Every material fact is cited with verifiable provenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-black text-xl mb-5">
              1
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Verified Regulatory Sources
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We audit AICTE Extension of Approval records, WBJEEB seat matrices, NAAC certificates, and official gazetted circulars before publishing any figures.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-black text-xl mb-5">
              2
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Visible Field-Level Provenance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every profile exposes the exact URL, academic cycle, and verification timestamp behind fees, accreditations, and approved intakes. Unverified data is marked explicitly.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-black text-xl mb-5">
              3
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Objective Side-by-Side Comparison
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select any three institutions to compare government vs autonomous status, annual tuition ranges, NIRF ranks, and program lists on an aligned mobile-ready matrix.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Verified Colleges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Profiles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Featured West Bengal Institutions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Representative sample of audited engineering colleges across university, government, and autonomous categories.
            </p>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>View All {VERIFIED_COLLEGES.length} Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* Educational Guides Section */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Editorial Research
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Essential Admission & Counselling Guides
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Factual, non-promotional analysis to help navigate West Bengal technical admissions.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-emerald-700">{article.tags[0]}</span>
                    <span>•</span>
                    <span>{article.readTimeMinutes} min read</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 hover:text-emerald-700 transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Platform Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Understanding how BanglaCampus collects data, maintains independence, and supports students.
          </p>
        </div>

        <div className="space-y-4">
          {homeFaqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-slate-200 p-5 open:ring-1 open:ring-emerald-500 transition-all"
            >
              <summary className="font-heading font-bold text-base text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.q}</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform font-bold text-lg">
                  ↓
                </span>
              </summary>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Newsletter Signup (Transparent & Consensual) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm />
      </section>
    </div>
  );
}
