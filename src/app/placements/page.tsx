import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PlacementsSummary } from '@/components/PlacementsSummary';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ChevronRight, ShieldCheck, Building2, TrendingUp, Users, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Tech Placement Statistics & Industry Recruiters | IEM Kolkata',
  description:
    'Sourced B.Tech placement audit for Institute of Engineering & Management (IEM), Kolkata. Verified salary medians, prominent IT recruiters, and career outcomes.',
};

export default function PlacementsPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Placement Records</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Sourced &amp; Regulatory Audited Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              B.Tech Placement Statistics &amp; Recruiter Reality
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Review honest, sourced placement metrics. We share verified institutional medians and legitimate corporate recruiters without unsubstantiated superlatives.
            </p>
          </div>
        </div>
      </section>

      {/* Placements Component */}
      <PlacementsSummary />

      {/* Training & Corporate Cell Section */}
      <section className="py-14 md:py-18 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-7 space-y-6 text-xs text-slate-700 leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Training &amp; Placement Cell Architecture
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  How IEM prepares engineering undergraduates for competitive corporate hiring cycles:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Pre-Placement Training (From 3rd Year)</h3>
                  <p className="text-slate-600">
                    Mandatory modules in Data Structures &amp; Algorithms (DSA), System Design, Quantitative Aptitude, Technical Communication, and Mock Technical Interviews.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Industry Tie-Ups &amp; Certifications</h3>
                  <p className="text-slate-600">
                    Collaborations with IBM, Oracle, AWS Academy, and NPTEL providing certified skill pathways for cloud computing, cybersecurity, and artificial intelligence.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Sector V Location Dividend</h3>
                  <p className="text-slate-600">
                    Situated in Salt Lake Electronics Complex (Sector V), students enjoy close proximity to major tech delivery centers for internships, hackathons, and corporate guest lectures.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Important Ethical Disclaimer:</strong>
                  <p className="mt-0.5 text-amber-800">
                    Admission to IEM does not imply guaranteed placement. Employment offers depend entirely upon individual academic performance, technical proficiency, attendance compliance, and employer selection criteria.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 sticky top-24">
              <LeadCaptureForm
                id="placements-lead-form"
                sourceCtaId="placements-audit-page"
                headline="Download Placement Audit Guide"
                subheadline="Receive branch-wise recruiter distribution &amp; average package reports."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
