import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  FileCheck2,
  Building2,
  Award,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Primary Regulatory Data Sources & Gazette Provenance | BengalCampus',
  description:
    'Full transparency index of all primary regulatory sources cited on BengalCampus, including AICTE Extension of Approvals, WBJEEB seat matrices, NIRF engineering ranks, and NAAC evaluations.',
  alternates: {
    canonical: 'https://bengalcampus.in/sources',
  },
};

export default function SourcesPage() {
  const sources = [
    {
      title: 'AICTE Extension of Approval (EoA) & Disclosures',
      authority: 'All India Council for Technical Education (Ministry of Education)',
      scope: 'Approved intake capacity, newly introduced B.Tech specializations, and mandatory institutional disclosures.',
      url: 'https://www.aicte-india.org',
      updateFrequency: 'Annual (March – June cycles)',
    },
    {
      title: 'WBJEEB Centralized Seat Matrix & Closing Cutoffs',
      authority: 'West Bengal Joint Entrance Examinations Board',
      scope: 'Round 1, Round 2, and Decentralized Mop-up opening and closing merit ranks across General, TFW, and reserved quotas.',
      url: 'https://wbjeeb.nic.in',
      updateFrequency: 'Post-counseling rounds (July – September)',
    },
    {
      title: 'NIRF Engineering National Rankings 2024',
      authority: 'Ministry of Education, Government of India',
      scope: 'Teaching, Learning & Resources (TLR), Graduation Outcomes (GO), and Perception scores for accredited institutions.',
      url: 'https://www.nirfindia.org',
      updateFrequency: 'Annual (June release)',
    },
    {
      title: 'NAAC Institutional Assessment & Accreditation',
      authority: 'National Assessment and Accreditation Council',
      scope: 'Cumulative Grade Point Average (CGPA) and Cycle grades (A++, A+, A, B++) for colleges and state universities.',
      url: 'https://www.naac.gov.in',
      updateFrequency: '5-year institutional accreditation cycles',
    },
    {
      title: 'West Bengal Fee Structure Committee (WBFSC) Circulars',
      authority: 'Higher Education Department, Government of West Bengal',
      scope: 'Mandatory tuition ceilings, development fees, and admission fee schedules for self-financed autonomous and private institutions.',
      url: 'https://bengalcampus.in/methodology',
      updateFrequency: 'Periodic regulatory gazettes',
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
        <Link href="/" className="hover:text-[#1455B8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#102A56]">Regulatory Sources</span>
      </nav>

      {/* 2. Header */}
      <div className="max-w-3xl mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B70] bg-[#E6F6F2] px-3 py-1 rounded-full border border-[#A7E3D4] inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0F8B70]" />
          <span>100% Traceable Citations</span>
        </span>

        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight">
          Primary Regulatory Repositories
        </h1>

        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
          BengalCampus does not publish unverified estimations, commercial placement rankings, or sponsored reviews. Every figure across all 20 verified profiles is cited directly from these official repositories.
        </p>
      </div>

      {/* 3. Sources List */}
      <div className="space-y-4 max-w-4xl">
        {sources.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="font-heading font-bold text-base sm:text-lg text-[#102A56]">
                {s.title}
              </h2>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1455B8] hover:underline shrink-0"
              >
                <span>Visit Primary Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs font-semibold text-[#1455B8]">
              Issuing Authority: {s.authority}
            </p>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {s.scope}
            </p>

            <div className="pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <span className="font-semibold text-[#102A56]">Update Frequency:</span> {s.updateFrequency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
