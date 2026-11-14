'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  Scale,
  ShieldCheck,
} from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Enter WBJEE Rank',
      subtitle: 'General Merit Rank (GMR)',
      desc: 'Input your declared or expected WBJEE GMR score. No phone number or registration required.',
      icon: Sparkles,
      iconColor: 'text-[#60A5FA]',
    },
    {
      num: '02',
      title: 'Set Category & Stream',
      subtitle: 'Quota & Branch Filters',
      desc: 'Filter by General, TFW, SC, ST, or OBC, and select preferred engineering branches like CSE, IT, or ECE.',
      icon: SlidersHorizontal,
      iconColor: 'text-[#34D399]',
    },
    {
      num: '03',
      title: 'Explore Decision Tiers',
      subtitle: 'Safe, Realistic & Ambitious',
      desc: 'Algorithms benchmark your rank against official Round 1, Round 2, and Mop-Up closing cutoffs.',
      icon: Layers,
      iconColor: 'text-[#F5B544]',
    },
    {
      num: '04',
      title: 'Compare & Shortlist',
      subtitle: 'Side-by-Side Matrix',
      desc: 'Pin up to 3 colleges side-by-side to compare audited tuition fees, hostel costs, and accreditations.',
      icon: Scale,
      iconColor: 'text-[#93C5FD]',
    },
  ];

  const tiers = [
    {
      name: 'Safe Matches',
      rule: 'Historic Closing Rank > 1.25× Your Rank',
      desc: 'Institutions where historical closing ranks have comfortably exceeded your merit score in Round 1 & Round 2.',
      badge: 'High Historical Alignment',
      badgeColor: 'bg-[#E6F6F2]/20 text-[#34D399] border-[#34D399]/40',
    },
    {
      name: 'Realistic Targets',
      rule: 'Historic Closing Rank Within 10%–15%',
      desc: 'Your primary target band. Institutions where past cutoffs closely match your exact rank score.',
      badge: 'Core Target Band',
      badgeColor: 'bg-[#2563EB]/25 text-[#93C5FD] border-[#60A5FA]/40',
    },
    {
      name: 'Ambitious Reach',
      rule: 'Historic Closing Rank < 0.90× Your Rank',
      desc: 'Top-tier aspirational branches that occasionally shift in decentralized counseling or spot mop-ups.',
      badge: 'Aspirational Reach',
      badgeColor: 'bg-[#F5B544]/20 text-[#F5B544] border-[#F5B544]/40',
    },
  ];

  return (
    <section id="how-it-works" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Deep Navy Feature Container for Visual Rhythm & Dramatic Contrast */}
      <div className="bg-[#102A56] rounded-3xl sm:rounded-4xl p-6 sm:p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden border border-white/10">
        {/* Ambient background glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1455B8]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Section Heading */}
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#93C5FD] bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Transparent Methodology
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white mt-3 tracking-tight">
              How the WBJEE Predictor Works
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              We trace 3 consecutive years of official WBJEEB centralized counseling data to help you build a structured, realistic choice-filling list.
            </p>
          </div>

          {/* 4 Step Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-14">
            {steps.map((st, sIdx) => {
              const Icon = st.icon;
              return (
                <div
                  key={sIdx}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-heading font-extrabold text-white/40 group-hover:text-[#60A5FA] transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${st.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-base font-heading font-bold text-white mb-0.5">
                    {st.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#93C5FD] block mb-2">
                    {st.subtitle}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 3 Decision Tiers Explanation */}
          <div className="pt-8 border-t border-white/15">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#34D399]" />
              <span>Deterministic Classification Standards</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((t, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-white">
                      {t.name}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.badgeColor}`}>
                      {t.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-medium text-[#93C5FD] bg-black/25 px-2.5 py-1.5 rounded-lg border border-white/5">
                    {t.rule}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              * Statistical predictions are derived strictly from published WBJEEB ORCR archives. Seat allocation is governed by the official WBJEEB board.
            </p>

            <Link
              href="/wbjee-predictor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
            >
              <span>Launch WBJEE Predictor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
