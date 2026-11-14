'use client';

import React from 'react';
import { FileText, Download, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function GuideDownloadSection() {
  const handleDownloadClick = () => {
    trackEvent('brochure_download_clicked', {
      source_cta_id: 'homepage-guide-dossier-card',
    });

    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 md:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 rounded-2xl text-white p-5 sm:p-8 md:p-12 shadow-xl relative overflow-hidden engineering-grid">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-xs text-sky-300 font-semibold">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>2027–28 Academic Cycle Handbook</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-heading leading-snug">
                Download the I.E.M. B.Tech Admission &amp; Branch Comparison Guide
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                A verified 18-page compilation covering autonomous curricula, branch-wise cutoffs, bank loan application guidelines, and IEMJEE preparation modules.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Official fee structure & Indian Overseas Bank loan format',
                  'Syllabus comparison: CSE vs CSE (AI&ML) vs IT',
                  'IEMJEE 2027 exam pattern, phases & sample paper outline',
                  'Hostel options, mess charges & Salt Lake commute guide',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brandTeal-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right CTA Card (4 cols) */}
            <div className="lg:col-span-4 bg-navy-950/80 border border-navy-800 rounded-xl p-5 sm:p-6 text-center space-y-4 max-w-md mx-auto lg:max-w-none w-full">
              <div className="w-12 h-12 rounded-xl bg-brandBlue-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Download className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Get Instant Free Access
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Check branch criteria and receive the PDF handbook directly.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadClick}
                className="w-full min-h-[44px] py-3 px-4 rounded-lg bg-brandBlue-600 hover:bg-brandBlue-500 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Request Guide &amp; Guidance</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero spam · DPDP compliant</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
