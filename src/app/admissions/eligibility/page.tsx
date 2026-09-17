import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ChevronRight, ShieldCheck, CheckCircle2, AlertCircle, Info, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Tech Eligibility Criteria & Cutoff Calculator | IEM Kolkata',
  description:
    'Check your Class 12 aggregate and PCM percentage against published cutoffs for B.Tech CSE, IT, ECE, and other engineering branches at IEM Kolkata.',
};

export default function EligibilityPage() {
  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/admissions" className="hover:text-brandBlue-600 font-medium">Admissions</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Eligibility Criteria</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Published Criteria (2027–28 Session)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              B.Tech Eligibility Criteria &amp; Preliminary Checker
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Compare your Class 12 aggregate or PCM percentage against the published institutional admission benchmarks for all engineering disciplines at IEM Kolkata.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Col: Criteria Table & Regulatory Rules (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Branch-Wise Published Criteria Matrix
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Thresholds for direct counselling guidance. Candidates must have passed 10+2 with Physics and Mathematics alongside Chemistry/CS/Biology.
                </p>
              </div>

              {/* Responsive Criteria Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <th className="py-3 px-4">Engineering Branch</th>
                      <th className="py-3 px-4 text-center">Class 12th Aggregate</th>
                      <th className="py-3 px-4 text-center">Class 12th PCM</th>
                      <th className="py-3 px-4 text-center">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {VERIFIED_BRANCHES.map((b) => (
                      <tr key={b.slug} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {b.name} ({b.shortName})
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                          {b.minAggregatePercent ? `${b.minAggregatePercent}%` : '60.0%'}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                          {b.minPcmPercent ? `${b.minPcmPercent}%` : '50.0%'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              b.status === 'VERIFIED_PRIMARY'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {b.status === 'VERIFIED_PRIMARY' ? 'Verified Primary' : 'Counsellor Review'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mandatory Legal Qualification Notice */}
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-brandBlue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Legal &amp; Regulatory Copy Rule:</strong>
                  <p className="mt-1 text-blue-800">
                    Meeting these percentage thresholds indicates a preliminary academic match for counselling consideration. It does NOT constitute an official guarantee of admission. Final seat allotment depends on entrance test rank (IEMJEE / WBJEE / JEE Main), board subject-wise pass certificates, category quotas, and verified document clearance at Ashram Building.
                  </p>
                </div>
              </div>

              {/* Lateral Entry Section */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Eligibility for Polytechnic Diploma Holders (Lateral Entry)
                </h3>
                <p>
                  Candidates who have completed a 3-year AICTE-approved diploma in Engineering &amp; Technology with at least 45% marks (40% for reserved categories) are eligible for direct admission to the 2nd Year (3rd Semester) of B.Tech programs.
                </p>
                <p className="text-slate-500 pt-1">
                  Lateral entry admissions are routed through the West Bengal Joint Entrance Examination for Lateral Entry (WB JELET) counselling.
                </p>
              </div>

            </div>

            {/* Right Col: Embedded Indicator Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <LeadCaptureForm
                id="eligibility-lead-form"
                sourceCtaId="eligibility-calculator-page"
                headline="Check Your Branch Indication"
                subheadline="Enter your Class 12 percentage to evaluate your score instantly against published criteria."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
