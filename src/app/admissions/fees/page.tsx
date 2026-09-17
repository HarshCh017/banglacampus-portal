import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FeesSummary } from '@/components/FeesSummary';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ChevronRight, ShieldCheck, Landmark, CreditCard, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Tech Fee Structure & Bank Loan Assistance (2027–28) | IEM Kolkata',
  description:
    'Verified B.Tech fee schedule for IEM Kolkata. Semester-by-semester tuition estimates, Indian Overseas Bank demand letters, and merit scholarship criteria.',
};

export default function FeesPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/admissions" className="hover:text-brandBlue-600 font-medium">Admissions</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Fee Structure</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparent Academic Financing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              B.Tech Fee Structure &amp; Education Loans
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Complete semester-wise tuition breakdown, bank loan demand letter procedures, and merit fee waivers for 2027–28 admissions.
            </p>
          </div>
        </div>
      </section>

      {/* Fees Summary Component */}
      <FeesSummary />

      {/* Additional Banking & Payment Guidance */}
      <section className="py-14 md:py-18 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  How to Avail an Institutional Education Loan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Students requiring a formal Bank Demand Estimate Letter for securing educational financing should follow these verified steps:
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-1">1. Provisional Allotment Verification</h3>
                  <p className="text-slate-600">
                    Receive your provisional admission offer letter following IEMJEE, WBJEE, or direct merit evaluation.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-1">2. Request Demand Estimate Letter</h3>
                  <p className="text-slate-600">
                    The Accounts Department at Ashram Building (GN-34/2, Sector V) or Room 120, SDF Building issues a bonafide fee estimate formatted specifically for nationalized banks.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-1">3. Bank Disbursement Payee Details</h3>
                  <p className="text-slate-600">
                    The education loan draft or NEFT transfer must be remitted directly to:
                  </p>
                  <div className="mt-2 p-2.5 bg-slate-50 rounded font-mono text-[11px] space-y-0.5">
                    <div><strong>A/C Name:</strong> Institute of Engineering &amp; Management Trust</div>
                    <div><strong>Bank:</strong> Indian Overseas Bank (Salt Lake Branch)</div>
                    <div><strong>A/C No:</strong> 164201000000488</div>
                    <div><strong>IFSC:</strong> IOBA0001642</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Refund &amp; Cancellation Notice:</strong>
                  <p className="mt-0.5 text-amber-800">
                    In the event of withdrawal prior to commencement of classes, fee refunds are processed strictly according to AICTE and UGC statutory guidelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 sticky top-24 w-full max-w-xl mx-auto lg:max-w-none">
              <LeadCaptureForm
                id="fees-lead-form"
                sourceCtaId="fees-detailed-page"
                headline="Get Fee &amp; Scholarship Help"
                subheadline="Inquire about specific branch fees, loan documentation &amp; merit eligibility."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
