'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '@/data/faqs';

export { FAQ_DATA };

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-[#09090B] border-b border-[#27272A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-semibold uppercase tracking-wider mb-2">
            Verification &amp; FAQs
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAFAFA]">
            Questions Students &amp; Parents Ask Before Applying
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
            Direct, sourced answers to the most common institutional, regulatory, and admission queries.
          </p>
        </div>

        <div className="space-y-2 border-t border-[#27272A] pt-2">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#18181B] border-l-2 border-l-[#10B981] rounded-r-2xl shadow-[inset_6px_0_20px_-6px_rgba(16,185,129,0.25)] border-y border-r border-white/5'
                    : 'bg-transparent border-b border-[#27272A] hover:bg-[#18181B]/40 rounded-xl'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-4 sm:px-5 text-left flex items-start justify-between gap-3 sm:gap-4 font-serif font-medium text-sm sm:text-base text-[#FAFAFA] focus:outline-none transition-colors min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                    <span className="leading-snug">{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#71717A] shrink-0 mt-0.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#10B981]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-[#18181B] border border-[#27272A] shadow-xl shadow-black/50 text-center">
          <h3 className="text-base font-serif font-bold text-[#FAFAFA]">Have a specific question about branch cutoffs or loans?</h3>
          <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">Our counsellors provide 100% free guidance with zero agent commissions.</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('bengalcampus:open-enquiry'));
                }
              }}
              className="py-2.5 px-5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Ask an Admission Counsellor
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
