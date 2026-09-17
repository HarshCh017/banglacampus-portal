import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | IEM B.Tech Admission Acquisition',
  description: 'Terms of service governing the use of the IEM B.Tech admission acquisition and guidance platform.',
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Terms of Service</span>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last Updated: January 2027
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">1. Purpose of the Platform</h2>
            <p>
              This website provides educational consultation, preliminary percentage threshold evaluation, and inquiry routing for B.Tech programs at the Institute of Engineering &amp; Management (IEM), Kolkata. Use of this platform does not constitute an agreement or promise of seat allotment.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">2. User Representations &amp; Accuracy</h2>
            <p>
              By submitting an inquiry, you warrant that all information provided—specifically your Full Name, Mobile Number, Class 12 percentage, and scoring type—is truthful, accurate, and belongs to you or an applicant for whom you are the legal guardian. Submitting fraudulent or automated spam requests is strictly prohibited.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">3. No Guaranteed Admission or Employment</h2>
            <p>
              In accordance with ethical educational standards and advertising guidelines, no content on this website guarantees admission, selection, rank allotment, or post-graduation corporate employment. Final admission is subject to statutory entrance exams (WBJEE, JEE Main, IEMJEE), board eligibility verification, and institutional seat quotas.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">4. Intellectual Property</h2>
            <p>
              All institutional insignia, program trademarks, course descriptors, and design systems are the intellectual property of the Institute of Engineering &amp; Management or their respective rights holders.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
