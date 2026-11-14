import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Trash2, ArrowLeft, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Deletion & Erasure Request (DPDP Act 2023) | BengalCampus',
  description:
    'Exercise your right to correction and erasure under Section 12 of the India Digital Personal Data Protection Act 2023 for BengalCampus student consultation records.',
  alternates: {
    canonical: 'https://bengalcampus.in/data-deletion',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DataDeletionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#1455B8] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-[#102A56] font-medium">Data Deletion Policy</span>
      </div>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#1455B8]" />
          <span>DPDP Act 2023 · Section 12 Statutory Right</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102A56] tracking-tight">
          Right to Correction &amp; Erasure of Personal Data
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Statutory mechanism for data principals to request full removal of admission consultation submissions.
        </p>
      </div>

      {/* Overview Notice */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 font-heading font-bold text-base text-[#102A56]">
          <Trash2 className="w-5 h-5 text-[#1455B8]" />
          <span>How to Request Data Erasure</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Under the Digital Personal Data Protection (DPDP) Act, 2023, you have the statutory right to request the correction, completion, or full erasure of any personal data submitted via the BengalCampus student guidance forms.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Upon receiving your request, BengalCampus will permanently delete your contact details, academic percentages, and college preference entries from our active operational stores and backup queues within <strong className="text-[#102A56]">72 business hours</strong>.
        </p>
      </div>

      {/* Procedure Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#FAFBFD] border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE] flex items-center justify-center font-bold text-xs font-mono">
            01
          </div>
          <h3 className="font-bold text-sm text-[#102A56]">Submit Email Request</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Send an email to <a href="mailto:privacy@bengalcampus.in" className="text-[#1455B8] underline">privacy@bengalcampus.in</a> or <a href="mailto:admissions@bengalcampus.in" className="text-[#1455B8] underline">admissions@bengalcampus.in</a> with subject line &ldquo;Data Erasure Request&rdquo;.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAFBFD] border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE] flex items-center justify-center font-bold text-xs font-mono">
            02
          </div>
          <h3 className="font-bold text-sm text-[#102A56]">Identify Submission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Include the full name and mobile number used during submission, or your unique Submission ID (e.g. <code className="text-[#1455B8] font-mono">BC-ENQ-XXXXX</code>) provided upon form submission.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAFBFD] border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE] flex items-center justify-center font-bold text-xs font-mono">
            03
          </div>
          <h3 className="font-bold text-sm text-[#102A56]">Confirmation of Erasure</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our Data Protection Desk will purge all matching records and issue an email confirmation within 72 hours verifying permanent record destruction.
          </p>
        </div>
      </div>

      {/* Statutory Retention Standards */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
        <h3 className="font-heading font-bold text-sm sm:text-base text-[#102A56] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#0F8B70]" />
          <span>Automated Retention Policy (24-Month Default Purge)</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Even without an explicit erasure request, BengalCampus maintains an automated 24-month retention ceiling. All student inquiries associated with a given admissions intake cycle are systematically scrubbed from active operational records 24 months post-intake conclusion.
        </p>
      </div>
    </div>
  );
}
