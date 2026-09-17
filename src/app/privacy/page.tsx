import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock, FileCheck, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | IEM B.Tech Admission Acquisition',
  description:
    'DPDP-aligned privacy policy. Details our data minimization standards, explicit consent tracking, retention periods, and user data rights.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
              DPDP Compliance Standard (India)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Privacy Policy &amp; Data Protection Statement
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: 2027 Intake Cycle | Policy Version: v1.0-2027
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">1. Commitment to Data Minimization</h2>
            <p>
              In strict accordance with the Digital Personal Data Protection (DPDP) Act, 2023, this admission acquisition portal collects only the minimal information strictly required to assess preliminary branch eligibility and provide genuine educational counselling:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Full Name:</strong> To address you and verify application identity.</li>
              <li><strong>Mobile Number:</strong> To connect you with an official counsellor via Telephone and WhatsApp.</li>
              <li><strong>Class 12th Percentage &amp; Type:</strong> To evaluate your declared score against published thresholds.</li>
              <li><strong>Desired B.Tech Branch:</strong> To route your inquiry to the relevant academic department.</li>
            </ul>
            <p className="font-semibold text-slate-800">
              We NEVER collect, infer, or store sensitive personal information such as caste, religion, health status, political views, or financial distress.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">2. Purpose Limitation</h2>
            <p>
              Your personal data is utilized exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Communicating published admission criteria, cutoffs, and IEMJEE examination details.</li>
              <li>Issuing certified fee schedules and bank loan demand estimates.</li>
              <li>Scheduling physical document verification at Ashram Building, Sector V, Salt Lake.</li>
            </ul>
            <p>
              We do not sell, lease, or distribute your contact details to third-party marketing brokers or unrelated commercial entities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">3. Consent Architecture &amp; Verification</h2>
            <p>
              Consent is collected explicitly via an unchecked checkbox before submission. Each submission records a cryptographic timestamp (ISO 8601 UTC) and the corresponding policy version identifier (<code>v1.0-2027</code>). You may withdraw consent at any point by contacting our Data Grievance Officer.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">4. Data Retention &amp; Erasure</h2>
            <p>
              Lead records and consultation notes are retained for a maximum duration of twelve (12) months following the completion of the 2027–28 academic admission cycle. Upon expiration of this retention window, all identifiable contact records are permanently erased from our local and synchronized databases.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">5. Data Protection Officer &amp; Grievance Redressal</h2>
            <p>
              For questions regarding your data, requests for correction, or immediate erasure, contact:
            </p>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs space-y-1">
              <div><strong>Grievance Office:</strong> Admissions Data Desk, Ashram Building</div>
              <div><strong>Address:</strong> GN-34/2, Sector V, Salt Lake, Kolkata – 700091</div>
              <div><strong>Email:</strong> admissions@iem.edu.in</div>
              <div><strong>Official Desk:</strong> Ashram Building, Sector V, Salt Lake</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
