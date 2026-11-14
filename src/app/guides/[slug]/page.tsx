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
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { VERIFIED_ARTICLES } from '@/data/articles';

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

  return {
    title: `${article.title} | BengalCampus Guide`,
    description: article.description,
    alternates: {
      canonical: `https://bengalcampus.in/guides/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | BengalCampus`,
      description: article.description,
      url: `https://bengalcampus.in/guides/${article.slug}`,
      type: 'article',
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = VERIFIED_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = VERIFIED_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
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
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-[#64748B] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#64748B]" />
            <span>{article.readTimeMinutes} min read</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-extrabold text-[#102A56] tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
          {article.description}
        </p>
      </div>

      {/* 3. Featured Hero Image Banner matching Mockup 8 */}
      <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm mb-10 bg-[#FAFBFD]">
        <Image
          src="/images/colleges/jadavpur-university-engineering.jpg"
          alt={article.title}
          fill
          priority
          sizes="(max-width: 1240px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      {/* 4. Two-Column Reading Layout matching Mockup 8 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Sticky Table of Contents */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sticky top-24 space-y-4">
          <h3 className="font-heading font-bold text-base text-[#102A56] pb-3 border-b border-[#F1F5F9]">
            Table of Contents
          </h3>
          <ol className="space-y-2.5 text-xs text-[#64748B]">
            <li className="flex items-center gap-2 text-[#1455B8] font-bold">
              <span>1.</span>
              <span>Overview &amp; Core Significance</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#1455B8] transition-colors">
              <span>2.</span>
              <span>Counselling Schedule &amp; Timelines</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#1455B8] transition-colors">
              <span>3.</span>
              <span>Choice Filling Framework (Safe, Target, Reach)</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#1455B8] transition-colors">
              <span>4.</span>
              <span>Seat Allotment &amp; Upgrade Mechanics</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#1455B8] transition-colors">
              <span>5.</span>
              <span>Documents Required for Reporting</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#1455B8] transition-colors">
              <span>6.</span>
              <span>Common Cutoff Traps to Avoid</span>
            </li>
          </ol>

          <div className="pt-4 mt-4 border-t border-[#F1F5F9] space-y-2">
            <span className="text-[11px] font-semibold text-[#102A56] block">
              Need personalized guidance?
            </span>
            <Link
              href="/counselling"
              className="w-full py-2 rounded-xl bg-[#EAF2FF] hover:bg-[#D8E7FF] text-[#1455B8] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Consult an Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* Right Column: Main Article Body */}
        <main className="lg:col-span-8 space-y-6">
          {/* Key Highlights Callout Card matching Mockup 8 */}
          <div className="p-6 rounded-2xl bg-[#EAF2FF] border border-[#BFDBFE] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1455B8] uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-[#F4B740]" />
              <span>Key Highlights</span>
            </div>
            <p className="text-xs sm:text-sm text-[#102A56] font-medium leading-relaxed">
              In WBJEE centralized counseling, your choice sheet is strictly processed sequentially from Option 1 downwards. If you are allotted Option 4 in Round 1, choices 5 and lower are permanently eliminated for subsequent rounds. Always order colleges by true preference rather than guessing cutoff ranks.
            </p>
          </div>

          {/* Formatted Markdown Content */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 text-sm leading-relaxed text-[#172033] space-y-6">
            <h2 className="text-2xl font-heading font-bold text-[#102A56]">
              1. Overview of the Centralized Allocation Process
            </h2>
            <p className="text-[#64748B]">
              The West Bengal Joint Entrance Examinations Board conducts centralized online counseling for engineering, technology, and pharmacy courses across state universities, government colleges, and self-financed institutions.
            </p>

            <h3 className="text-lg font-heading font-bold text-[#102A56] pt-3">
              Understanding the TFW (Tuition Fee Waiver) Advantage
            </h3>
            <p className="text-[#64748B]">
              Up to 5% supernumerary seats are allocated in each branch under the AICTE TFW scheme where the 100% tuition fee is waived for West Bengal domiciled candidates whose annual family income is below ₹2.5 Lakhs. Always place verified TFW codes above general seats of the same institute.
            </p>

            <h3 className="text-lg font-heading font-bold text-[#102A56] pt-3">
              Strategic Choice Tiering
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#E6F6F2] border border-[#A7E3D4]">
                <span className="text-xs font-bold text-[#0F8B70] block">Safe Options (30%)</span>
                <p className="text-[11px] text-[#0F8B70]/90 mt-1">
                  Colleges where closing ranks were well ahead of your GMR.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EAF2FF] border border-[#BFDBFE]">
                <span className="text-xs font-bold text-[#1455B8] block">Realistic Targets (50%)</span>
                <p className="text-[11px] text-[#1455B8]/90 mt-1">
                  Programs matching your exact rank in past Round 2 / Mop-up.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FEF8EB] border border-[#FDE4B0]">
                <span className="text-xs font-bold text-[#B45309] block">Reach Choices (20%)</span>
                <p className="text-[11px] text-[#B45309]/90 mt-1">
                  Dream colleges where cutoffs might slide in later rounds.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F1F5F9]">
              <span className="text-xs font-bold text-[#102A56] block mb-2">
                Official Regulatory References:
              </span>
              <ul className="space-y-1.5 text-xs text-[#1455B8]">
                <li>
                  <a
                    href="https://wbjeeb.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    <span>WBJEEB Centralized Counseling Portal (wbjeeb.nic.in)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.aicte-india.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    <span>AICTE Approval Process Handbook (TFW Guidelines)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
