import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldAlert, AlertTriangle, Building2, Landmark, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Regulatory & Editorial Disclaimer | BanglaCampus',
  description:
    'Mandatory legal disclaimer, independent publisher notice, non-affiliation disclosures, and fee verification guidelines for BanglaCampus.',
};

export default function DisclaimerPage() {
  return (
    <>
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-700 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Regulatory Disclaimer</span>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Regulatory &amp; Independence Disclaimer
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Version 1.0 · Independent Platform &amp; Consumer Protection Safeguards
            </p>
          </div>

          {/* 1. Independent Publisher Notice */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              <span>1. Independent Educational Discovery Platform</span>
            </h2>
            <p>
              BanglaCampus is an independent informational and comparative discovery catalog dedicated to engineering colleges across West Bengal. <strong>BanglaCampus is NOT an admission agent, admission broker, or commercial placement consultancy.</strong> Submitting an enquiry or comparison on this platform does not constitute an application for admission, seat reservation, or counseling allotment.
            </p>
          </div>

          {/* 2. Non-Affiliation Disclosures */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-700" />
              <span>2. Non-Affiliation with Regulatory Examination Boards</span>
            </h2>
            <p>
              BanglaCampus is not affiliated with, endorsed by, or operated by the <strong>West Bengal Joint Entrance Examinations Board (WBJEEB)</strong>, the <strong>All India Council for Technical Education (AICTE)</strong>, <strong>MAKAUT</strong>, or any State Government Department of Higher Education. All trademarks, college codes, exam titles (WBJEE, JEE Main, JELET), and institutional insignia are the property of their respective statutory bodies and institutions, cited strictly under fair use for candidate guidance.
            </p>
          </div>

          {/* 3. Strict Warning Against Fraudulent Admission Agents */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 text-amber-950">
            <h2 className="text-base font-bold text-amber-950 font-heading flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
              <span>3. Advisory Against Unofficial Admission Brokers</span>
            </h2>
            <p className="leading-relaxed">
              Neither BanglaCampus nor accredited engineering institutions in West Bengal authorize outside middlemen, touts, or unauthorized brokers claiming to offer &quot;guaranteed management quota seats&quot;. All valid centralized admissions occur through the official WBJEEB e-counselling portal (<strong>wbjeeb.nic.in</strong>) or direct institutional decentralized merit counseling held physically on college campuses.
            </p>
            <p className="font-bold text-amber-950">
              Never transfer cash or remit personal digital payments to individual bank accounts. All legitimate academic fees must be deposited strictly to official institutional bank accounts or government treasury portals.
            </p>
          </div>

          {/* 4. Verification of Time-Sensitive Information */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-emerald-700" />
              <span>4. Mandatory Candidate Verification Before Payment</span>
            </h2>
            <p>
              While BanglaCampus audits published facts against official gazetted notifications and AICTE Extension of Approval records, tuition fee schedules, hostel charges, and eligibility percentages are subject to institutional and regulatory revisions. Candidates and guardians must independently verify final demand letters directly with the official college administration before paying admission fees.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
