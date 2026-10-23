import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | BanglaCampus',
  description: 'Terms and conditions governing the use of the BanglaCampus engineering discovery platform.',
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-700 font-medium">Home</Link>
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
              Version 1.0 · Independent Platform Usage Standard
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">1. Scope of the Discovery Service</h2>
            <p>
              BanglaCampus provides educational discovery, structured comparative assessment, and public citation services regarding engineering colleges in West Bengal. Use of this website is strictly informational and does not constitute an offer, contract, or guarantee of admission to any institution.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">2. User Representations &amp; Acceptable Use</h2>
            <p>
              By utilizing the directory search, comparison tools, or contact forms, you agree to submit truthful information and refrain from automated web scraping, DDoS attacks, or submitting malicious data intended to disrupt platform stability.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">3. No Guarantee of Admission, Rank, or Cutoff</h2>
            <p>
              Closing ranks, cutoffs, and seat matrices shown on BanglaCampus reflect historical official records from previous WBJEEB cycles. Because applicant competition, seat additions, and branch demands fluctuate each year, past cutoffs are never a guarantee of future admission.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">4. Intellectual Property &amp; Citations</h2>
            <p>
              Platform design tokens, comparative algorithms, and editorial guides are the proprietary intellectual property of BanglaCampus. Institutional marks, regulatory logos, and official notice excerpts belong to their respective statutory owners and are reproduced strictly for factual identification and fair commentary.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-heading">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These terms shall be governed and construed in accordance with the laws of the Republic of India. Any legal dispute or proceeding arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
