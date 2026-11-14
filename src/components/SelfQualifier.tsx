import React from 'react';
import { UserCheck, Users, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export function SelfQualifier() {
  const cards = [
    {
      audience: 'For High School Students (Class 12)',
      title: 'Seeking Top Tech Branch Fit & Placement Reality',
      icon: UserCheck,
      description: 'You are completing Class 12 with Physics & Mathematics and want a rigorous computing or core engineering education with recognized recruiters.',
      checklist: [
        'Compare CSE, AI & ML, IoT, Cyber Security & IT curricula',
        'Learn how zero-fee IEMJEE opens direct seat options',
        'Understand cutoff criteria without spam phone calls',
      ],
      ctaText: 'Check Branch Indication',
      ctaLink: '#lead-form',
      theme: 'blue',
    },
    {
      audience: 'For Engineering Parents & Sponsors',
      title: 'Demanding Academic Legitimacy & Financial Clarity',
      icon: Users,
      description: "You are investing in your child's 4-year engineering future and need verified proof of MAKAUT degree legitimacy, fee certainty, and disciplined safety.",
      checklist: [
        'AICTE approval & autonomous syllabus governed by MAKAUT',
        'Transparent semester fee ranges with Indian Overseas Bank loan letters',
        'Direct contact with Ashram Building official admission office',
      ],
      ctaText: 'Review Fees & Accreditations',
      ctaLink: '#fees',
      theme: 'navy',
    },
    {
      audience: 'For Polytechnic Diploma Holders',
      title: 'Evaluating 2nd-Year B.Tech Lateral Entry (JELET)',
      icon: Compass,
      description: 'You hold or are completing a 3-year AICTE-approved engineering diploma and want direct admission into the 3rd semester of B.Tech at IEM.',
      checklist: [
        'Branch mapping from diploma discipline to B.Tech streams',
        'Clear guidance on decentralized WBJEEB JELET rounds',
        'Curriculum bridging and placement parity with 4-year cohorts',
      ],
      ctaText: 'Inquire About Lateral Entry',
      ctaLink: '#lead-form',
      theme: 'teal',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-brandBlue-600 uppercase tracking-wider">
            Self-Qualification Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-heading">
            Is I.E.M. Kolkata the Right Choice for You?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Engineering education is a 4-year commitment. Select your situation to explore how our academic framework meets your specific goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-xl p-5 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brandBlue-100 text-brandBlue-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {card.audience}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {card.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {card.checklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={card.ctaLink}
                  className="w-full py-2.5 px-4 rounded-md border border-slate-200 bg-slate-50 hover:bg-brandBlue-600 hover:text-white hover:border-brandBlue-600 text-slate-800 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 group"
                >
                  <span>{card.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
