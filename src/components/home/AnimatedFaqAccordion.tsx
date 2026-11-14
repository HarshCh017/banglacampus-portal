'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface AnimatedFaqAccordionProps {
  faqs: FaqItem[];
}

export function AnimatedFaqAccordion({ faqs }: AnimatedFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`transition-all duration-200 overflow-hidden rounded-2xl border ${
              isOpen
                ? 'bg-white border-[#1455B8]/30 shadow-sm border-l-4 border-l-[#1455B8]'
                : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            >
              <span
                className={`font-heading text-sm sm:text-base font-bold transition-colors ${
                  isOpen ? 'text-[#1455B8]' : 'text-[#102A56] hover:text-[#1455B8]'
                }`}
              >
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? 'bg-[#EAF2FF] text-[#1455B8]'
                    : 'bg-[#FAFBFD] text-[#64748B]'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9]">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default AnimatedFaqAccordion;
