import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PlacementsSummary } from '@/components/PlacementsSummary';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ChevronRight, ShieldCheck, AlertCircle, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'West Bengal Engineering College Placements: Average Packages, Top Recruiters & Salary Benchmarks | BengalCampus',
  description:
    'Compare verified placement records, median salary packages (NIRF-sourced), and recruiter footprints across top West Bengal engineering colleges, including Jadavpur University, KGEC, IEM, and Heritage.',
  keywords: [
    'West Bengal engineering college placements',
    'WBJEE college salary packages',
    'Jadavpur University engineering placement',
    'IEM Kolkata placement package',
    'Heritage Institute of Technology placements',
    'Haldia Institute of Technology placements',
    'BTech average package West Bengal',
  ],
  alternates: {
    canonical: 'https://bengalcampus.in/placements',
  },
  openGraph: {
    title: 'West Bengal Engineering College Placement Records & Salary Packages | BengalCampus',
    description:
      'Compare verified placement records, median salary packages (NIRF-sourced), and recruiter footprints across top West Bengal engineering colleges.',
    url: 'https://bengalcampus.in/placements',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'West Bengal Engineering College Placements | Median Packages & Recruiters',
    description: 'Verified placement audit for West Bengal engineering colleges: median CTCs, NIRF-reported figures, and campus hiring cells.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PlacementsPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAFBFD] border-b border-[#E2E8F0] py-3 px-4 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#1455B8] font-medium transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#102A56] font-semibold">Engineering Placements</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[#102A56] text-white py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-[#0F8B70]" />
              <span>Sourced &amp; Regulatory Audited Placement Records</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              West Bengal Engineering College Placements &amp; Salary Benchmarks
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Review honest, sourced placement metrics across West Bengal government institutions and autonomous private engineering colleges. We share verified institutional medians and legitimate corporate recruiters without unsubstantiated superlatives.
            </p>
          </div>
        </div>
      </section>

      {/* Placements Comparison Component */}
      <PlacementsSummary />

      {/* Corporate Hiring & Preparation Section */}
      <section className="py-14 md:py-18 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-7 space-y-6 text-xs text-slate-700 leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold text-[#102A56] font-heading">
                  Training &amp; Placement Cell Architecture
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  How leading West Bengal engineering colleges prepare undergraduates for competitive campus placement drives:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0]">
                  <h3 className="text-sm font-bold text-[#102A56] mb-1">Pre-Placement Training Modules</h3>
                  <p className="text-[#64748B]">
                    Colleges conduct structured training in Data Structures &amp; Algorithms (DSA), System Design, Quantitative Aptitude, Technical Communication, and Mock Coding Interviews starting from the 5th semester.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0]">
                  <h3 className="text-sm font-bold text-[#102A56] mb-1">Industry Tie-Ups &amp; Certifications</h3>
                  <p className="text-[#64748B]">
                    Authorized training tracks in AWS Cloud, IBM AI, Oracle Database, and NPTEL Swayam provide verified credentials for software engineering and cloud infrastructure roles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0]">
                  <h3 className="text-sm font-bold text-[#102A56] mb-1">Sector V Location Dividend for Kolkata Colleges</h3>
                  <p className="text-[#64748B]">
                    Institutions situated in Salt Lake Sector V (such as IEM Kolkata and Techno Main Salt Lake) benefit from proximity to major multinational software delivery centers for internships and industrial projects.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Important Admission &amp; Outcome Advisory:</strong>
                  <p className="mt-0.5 text-amber-800 text-[11px] leading-relaxed">
                    College enrollment does not guarantee placement. Employment offers depend entirely upon individual academic performance, coding ability, project portfolio, attendance compliance, and employer selection rounds.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 sticky top-24">
              <LeadCaptureForm
                id="placements-lead-form"
                sourceCtaId="placements-audit-page"
                headline="Download West Bengal Placement Audit"
                subheadline="Receive branch-wise recruiter distribution &amp; median CTC reports."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
