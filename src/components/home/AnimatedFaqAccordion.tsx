'use client';

import React, { useState } from 'react';
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
            style={{
              borderRadius: 14,
              border: '1px solid #dddddd',
              background: '#ffffff',
            }}
            className="overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: isOpen ? '#102A56' : '#222222',
                  lineHeight: 1.4,
                }}
                className="transition-colors"
              >
                {faq.q}
              </span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9999,
                  background: isOpen ? '#EAF2FF' : '#f7f7f7',
                  border: '1px solid #dddddd',
                  color: isOpen ? '#102A56' : '#6a6a6a',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                className="flex items-center justify-center shrink-0"
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                style={{
                  borderTop: '1px solid #eeeeee',
                  padding: '14px 20px 18px',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#6a6a6a',
                }}
                className="animate-in fade-in duration-150"
              >
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AnimatedFaqAccordion;
