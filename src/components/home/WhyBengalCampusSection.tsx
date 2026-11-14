'use client';

import React from 'react';
import { ShieldCheck, IndianRupee, Sparkles, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function WhyBengalCampusSection() {
  const principles = [
    {
      number: '01',
      icon: ShieldCheck,
      title: 'Audited Regulatory Approvals',
      description:
        'We cross-check AICTE Extension of Approval records, official WBJEEB intake circulars, and NAAC grade certificates so you never rely on unverified marketing brochures.',
      footnote: 'Permanent public citations on every profile',
    },
    {
      number: '02',
      icon: IndianRupee,
      title: 'Transparent Annual Tuition Fees',
      description:
        'Compare actual semester fees, tuition ranges, and AICTE Tuition Fee Waiver (TFW) quotas across government and autonomous institutions before seat acceptance.',
      footnote: 'Zero surprise levies or hidden booking charges',
    },
    {
      number: '03',
      icon: Sparkles,
      title: 'Predictive Choice Sheet Simulator',
      description:
        'Input your General Merit Rank to generate an organized three-tier preference list with official institute codes ready for centralized e-counseling registration.',
      footnote: 'Multi-year closing cutoff probability engine',
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981] bg-[#10B981]/15 px-3 py-1 rounded-full border border-[#10B981]/30 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Core Editorial Principles</span>
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#ECF4F0] tracking-tight">
          Built for Clear Decisions, Not Sales Pitches
        </h2>
        <p className="text-xs sm:text-sm text-[#9DB0A8] leading-relaxed">
          Unlike commercial education portals funded by private college lead sales, every figure on BengalCampus is cross-checked against public regulatory gazettes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
        {principles.map((item) => {
          const Icon = item.icon;
          return (
            <SpotlightCard
              key={item.number}
              className="bg-[#0B1210] hover:bg-[#111C18] p-6 sm:p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/40 shadow-xl shadow-black/60 flex flex-col justify-between transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center font-bold text-lg shadow-sm font-mono">
                    {item.number}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#05080A] text-[#9DB0A8] border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#10B981]" />
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#ECF4F0]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9DB0A8] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.06)] text-xs font-semibold text-[#10B981] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>{item.footnote}</span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
