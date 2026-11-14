import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Scale,
  Award,
  Compass,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About BengalCampus | Independent West Bengal Engineering Discovery Platform',
  description:
    'Learn about BengalCampus: our zero-commission charter, field-level regulatory provenance methodology, and mission to bring transparency to WBJEE engineering admissions.',
  alternates: {
    canonical: 'https://bengalcampus.in/about',
  },
  openGraph: {
    title: 'About BengalCampus | Zero Commission College Discovery',
    description:
      'Learn about our transparent data auditing methodology, AICTE approvals verification, and zero agent bias charter.',
    url: 'https://bengalcampus.in/about',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F6F2] text-[#0F8B70] border border-[#A7E3D4] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#0F8B70]" />
          <span>Independent Educational Publisher</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#102A56] tracking-tight leading-tight">
          About BengalCampus
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
          BengalCampus was founded to solve a pervasive problem in West Bengal higher education: misleading admission advertisements, hidden tuition fee charges, and fabricated rankings.
        </p>
      </div>

      {/* Pre-launch Notice */}
      <div className="bg-[#FEF8EB] border border-[#FDE4B0] rounded-2xl p-5 text-xs text-[#B45309] space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-[#B45309]">
          <AlertTriangle className="w-4 h-4 text-[#F4B740] shrink-0" />
          <span>Pre-Launch Editorial Notice</span>
        </div>
        <p className="leading-relaxed">
          BengalCampus operates as an independent research initiative in pre-launch stage. The data published here is synthesized from public regulatory repositories (AICTE, WBJEEB, NIRF, NAAC). This platform does not provide legal counseling or represent admission agents.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-[#102A56]">
          Our Four Non-Negotiable Operating Standards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1455B8] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-heading font-bold text-base text-[#102A56]">
              Field-Level Traceability
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We never publish a fee, rank, or accreditation without linking to an authoritative source URL, academic cycle, and audit date. If an institution has not published its fees, we state &quot;Not verified in official gazette&quot; rather than inventing estimates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1455B8] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-heading font-bold text-base text-[#102A56]">
              Zero Agent Sponsorships
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We do not accept commissions, lead-referral payments, or paid directory placements. Every institution in our catalog is ranked and listed according to objective, verifiable criteria.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1455B8] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-heading font-bold text-base text-[#102A56]">
              Clear Legal & Entity Disambiguation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We clearly distinguish autonomous colleges from universities (e.g. distinguishing IEM Kolkata from UEM Kolkata, or Jadavpur FET from affiliated institutions) so candidates understand which authority confers their final degree.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900">
              Privacy & Consent by Default
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under the Digital Personal Data Protection (DPDP) Act 2023, we store comparison state locally in your browser, never inject advertising tracking cookies, and request explicit unbundled consent for enquiry communications.
            </p>
          </div>
        </div>
      </div>

      {/* Sources & Methodology */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold font-heading text-slate-900">
          Primary Regulatory Sources
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          BengalCampus audits data directly from the following public repositories:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0F8B70] shrink-0" />
            <span>AICTE Extension of Approval (EoA) Annual Letters</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0F8B70] shrink-0" />
            <span>WBJEEB Centralized Seat Matrices & Cutoff Archives</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0F8B70] shrink-0" />
            <span>NIRF India Engineering Ranking Repository</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0F8B70] shrink-0" />
            <span>NAAC Accreditation Assessment Reports</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0F8B70] shrink-0" />
            <span>West Bengal Higher Education Department Fee Orders</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0F8B70] shrink-0" />
            <span>College Mandatory Disclosure Statements</span>
          </li>
        </ul>
      </div>

      {/* Next Actions */}
      <div className="pt-4 flex flex-wrap items-center gap-3">
        <Link
          href="/colleges"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] text-white font-bold text-xs shadow-sm transition-colors"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Verified Directory</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#102A56] font-bold text-xs transition-colors"
        >
          <span>Contact Our Research Desk</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
