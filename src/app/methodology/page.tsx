import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Scale,
  Award,
  AlertTriangle,
  Building2,
  Layers,
  Lock,
  ArrowRight,
  Calculator,
  Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Audit Methodology & Regulatory Provenance Standard | BengalCampus',
  description:
    'Detailed documentation of BengalCampus 4-tier regulatory verification, mathematical cutoff modeling, fee auditing rules, and DPDP Act 2023 compliance.',
  alternates: {
    canonical: 'https://bengalcampus.in/methodology',
  },
  openGraph: {
    title: 'Audit Methodology & Regulatory Provenance Standard | BengalCampus',
    description:
      'How BengalCampus independently audits 20 West Bengal engineering colleges using primary AICTE, WBJEEB, NIRF, and NAAC records with zero agent commissions.',
    url: 'https://bengalcampus.in/methodology',
    siteName: 'BengalCampus',
    type: 'website',
  },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] text-[#172033]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F6F2] border border-[#A7E3D4] text-[#0F8B70] text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-[#0F8B70]" />
            <span>Official Research Standard · Phase 2 Provenance Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#102A56] mb-6 leading-tight">
            Our Audit Methodology &amp; Regulatory Provenance
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl font-sans">
            Commercial educational portals frequently trade rank positioning for private sponsorships, fabricate inflated placement packages, and obscure actual fee structures. BengalCampus was engineered as an uncompromised, zero-sponsored admissions engine where every data point is anchored in primary statutory registries.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[#F1F5F9]">
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1455B8]">20</div>
              <div className="text-xs text-[#64748B] mt-1">Verified Institutions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1455B8]">4-Tier</div>
              <div className="text-xs text-[#64748B] mt-1">Provenance Hierarchy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1455B8]">₹0</div>
              <div className="text-xs text-[#64748B] mt-1">Agent Commissions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F8B70]">100%</div>
              <div className="text-xs text-[#64748B] mt-1">Automated CI Audited</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Tier 1 to 4 Hierarchy */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#1455B8]">
            <Layers className="w-4 h-4" />
            <span>Section 1 · Institutional Verification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#102A56]">
            The 4-Tier Regulatory Provenance Hierarchy
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            We reject self-reported promotional claims and marketing brochures. Every institutional profile, approved branch intake, and accreditation status in BengalCampus is classified across four strict verification tiers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#1455B8]/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#E6F6F2] text-[#0F8B70] font-mono text-xs font-bold">
                  Tier 1: Statutory / Regulatory
                </span>
                <span className="text-[#0F8B70] text-xs font-bold">Highest Authority</span>
              </div>
              <h3 className="text-base font-heading font-bold text-[#102A56]">Official Government &amp; Council Portals</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Extension of Approval (EoA) documents from AICTE New Delhi, official seat matrices and opening/closing ranks issued by the West Bengal Joint Entrance Examinations Board (WBJEEB), MHRD/MoE NIRF ranking reports, and NAAC peer team outcome certificates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#1455B8]/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#EAF2FF] text-[#1455B8] font-mono text-xs font-bold">
                  Tier 2: Primary Institutional
                </span>
                <span className="text-[#1455B8] text-xs font-bold">Audited Filings</span>
              </div>
              <h3 className="text-base font-heading font-bold text-[#102A56]">Mandatory Disclosure Statements</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Public annual audit reports, formal notices approved by institutional Governing Bodies, university gazettes, and signed circulars posted directly on verified institutional domain names.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#1455B8]/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#FEF8EB] text-[#B45309] font-mono text-xs font-bold">
                  Tier 3: Statutory Committee
                </span>
                <span className="text-[#B45309] text-xs font-bold">Tuition Regulation</span>
              </div>
              <h3 className="text-base font-heading font-bold text-[#102A56]">West Bengal Fee Structure Committee</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Periodic maximum allowable fee notifications issued by the Department of Higher Education, Government of West Bengal, for private un-aided degree engineering colleges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#1455B8]/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#64748B] font-mono text-xs font-bold">
                  Tier 4: Third-Party &amp; Placement
                </span>
                <span className="text-[#64748B] text-xs font-bold">Disclaimed</span>
              </div>
              <h3 className="text-base font-heading font-bold text-[#102A56]">Audited NIRF Placement Disclosures</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Median compensation packages and graduate enrollment figures cited strictly from Table 3A/3B of submitted NIRF disclosures with declared reporting academic years.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Predictive Modeling Standards */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#1455B8]">
            <Calculator className="w-4 h-4" />
            <span>Section 2 · Analytical Rules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#102A56]">
            Cutoff Classification Logic
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            The WBJEE College Predictor uses historical closing ranks from official counseling data:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-2 border-l-4 border-l-[#0F8B70]">
              <span className="text-xs font-bold text-[#0F8B70] uppercase tracking-wider">Safe Tier</span>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Closing rank is $\ge 1.25\times$ your General Merit Rank. Historically safe options across Round 1 and Round 2.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-2 border-l-4 border-l-[#2563EB]">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Realistic Tier</span>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Closing rank is between $0.90\times$ and $1.24\times$ your General Merit Rank. Competitive target band in Round 2 / Mop-up.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-2 border-l-4 border-l-[#F4B740]">
              <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider">Ambitious Tier</span>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Closing rank is between $0.70\times$ and $0.89\times$ your General Merit Rank. Reach options requiring higher cutoff drift.
              </p>
            </div>
          </div>
        </section>

        {/* Link back */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/sources"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1455B8] hover:underline"
          >
            <span>View Full Primary Sources Index</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/wbjee-predictor"
            className="px-5 py-2.5 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] text-white font-bold text-xs shadow-sm"
          >
            Launch College Predictor
          </Link>
        </div>
      </div>
    </div>
  );
}
