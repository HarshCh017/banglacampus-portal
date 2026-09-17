'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQ_DATA } from '@/data/faqs';

export { FAQ_DATA };

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brandBlue-100 text-brandBlue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Verification &amp; FAQs
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Questions Students &amp; Parents Ask Before Applying
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Direct, sourced answers to the most common institutional, regulatory, and admission queries.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-3.5 sm:py-4 px-4 sm:px-5 text-left flex items-start justify-between gap-3 sm:gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-brandBlue-600 focus:outline-none transition-colors min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-brandBlue-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brandBlue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 p-6 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <h3 className="text-base font-bold text-slate-900 font-heading">Have a specific question about branch cutoffs or loans?</h3>
          <p className="text-xs text-slate-600 mt-1">Our counsellors are available during business hours at the Ashram Campus admission office.</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#lead-form"
              className="py-2.5 px-5 rounded-md bg-brandBlue-600 hover:bg-brandBlue-500 text-white font-semibold text-xs transition-colors"
            >
              Ask an Admission Counsellor
            </a>
            <a
              href="#lead-form"
              className="py-2.5 px-5 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors"
            >
              Request Admission Callback
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
