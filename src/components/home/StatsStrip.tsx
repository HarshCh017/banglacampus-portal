'use client';

import React from 'react';
import { Building2, ShieldCheck, MapPin, IndianRupee } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { NumberTicker } from '@/components/ui/NumberTicker';
import { DecryptedText } from '@/components/ui/react-bits/DecryptedText';

export function StatsStrip() {
  const stats = [
    {
      icon: Building2,
      value: 20,
      suffix: '',
      label: 'Accredited Institutions',
      detail: 'State, Govt & UGC-Autonomous',
    },
    {
      icon: ShieldCheck,
      value: 100,
      suffix: '%',
      label: 'AICTE & NAAC Verified',
      detail: 'Traced to primary gazette files',
    },
    {
      icon: MapPin,
      value: 12,
      suffix: '+',
      label: 'Districts Across WB',
      detail: 'Kolkata, Nadia, Purulia & North Bengal',
    },
    {
      icon: IndianRupee,
      value: 0,
      prefix: '₹',
      suffix: '',
      label: 'Cost to Students',
      detail: 'Zero agent commissions or fees',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <SpotlightCard
              key={stat.label}
              className="bg-[#0B1210] border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/40 p-5 rounded-2xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.25)] flex items-center justify-center text-[#10B981]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#05080A] text-[#9DB0A8] border border-[rgba(255,255,255,0.06)]">
                  <DecryptedText
                    text="Live"
                    speed={30}
                    animateOn="inViewHover"
                    className="text-[#10B981]"
                    encryptedClassName="text-[#10B981]/50"
                  />
                </span>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#ECF4F0] flex items-baseline gap-1">
                  <NumberTicker
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={0.1 * i}
                  />
                </div>
                <div className="text-xs sm:text-sm font-serif font-bold text-[#ECF4F0] mt-1">
                  {stat.label}
                </div>
                <p className="text-[11px] text-[#9DB0A8] mt-0.5 leading-snug">
                  {stat.detail}
                </p>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
