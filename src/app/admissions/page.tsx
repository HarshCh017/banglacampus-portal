import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AdmissionTimeline } from '@/components/AdmissionTimeline';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import {
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  CreditCard,
  Building2,
  Phone,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Tech Admission Process & Timeline (2027–28) | IEM Kolkata',
  description:
    'Comprehensive B.Tech admission guide for IEM Kolkata. WBJEE, JEE Main, and IEMJEE pathways, Ashram campus verification, and document requirements.',
};

export default function AdmissionsPage() {
  const documents = [
    'Class 10 (Madhyamik / ICSE / CBSE) Admit Card (Age proof)',
    'Class 10 Marksheet & Passing Certificate',
    'Class 12 (10+2) Marksheet & Passing Certificate',
    'WBJEE / JEE Main / IEMJEE Rank Card & Allotment Letter',
    'Duly filled Anti-Ragging Affidavit (via antiragging.in)',
    'Medical Fitness Certificate signed by a Registered Medical Practitioner',
    'Original Character Certificate / School Leaving Certificate',
    'Recent passport-size colored photographs (6 copies)',
    'Aadhaar Card or Government Photo Identity Card copy',
  ];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Admissions</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Official 2027–28 Admissions Cycle</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              B.Tech Admission Process &amp; Verification
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Learn how entrance examinations (IEMJEE, WBJEE, JEE Main), document verification, and institutional seat allotments work at the Ashram Campus in Salt Lake Sector V.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Process Timeline Component */}
      <AdmissionTimeline />

      {/* Document Checklist & Lead Form Section */}
      <section className="py-14 md:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Document Verification Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Campus Verification Requirements
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Mandatory Documents for Physical Enrollment
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Newly allotted candidates must submit one set of self-attested photocopies along with original certificates for physical verification at Ashram Building.
                </p>
              </div>

              <div className="space-y-2.5">
                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5"
                  >
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>

              {/* Payment Safeguards */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brandBlue-600" />
                  <span>Official Fee Payment Modes</span>
                </h3>
                <p>
                  Demand Drafts must be drawn strictly in favour of <strong>&quot;Institute of Engineering &amp; Management Trust&quot;</strong> payable at Kolkata. NEFT, Net Banking, and Card Swipe are accepted at the official accounts desk (120, SDF Building / Ashram Campus).
                </p>
                <p className="text-red-700 font-medium">
                  Cash transactions are strictly prohibited for tuition and booking deposits.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/admissions/fees"
                  className="text-xs font-bold text-brandBlue-600 hover:text-brandBlue-700 underline"
                >
                  View Full 8-Semester Tuition Breakdown &rarr;
                </Link>
                <Link
                  href="/admissions/eligibility"
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 underline"
                >
                  Check Branch Cutoff Requirements &rarr;
                </Link>
              </div>
            </div>

            {/* Right: Embedded Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <LeadCaptureForm
                id="admissions-guidance-form"
                sourceCtaId="admissions-guide-page"
                headline="Request Admission Guidance"
                subheadline="Get in touch with an official counsellor for 2027 seat guidance."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
