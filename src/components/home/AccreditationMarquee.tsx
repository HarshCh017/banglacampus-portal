'use client';

import React from 'react';
import { ShieldCheck, Award, Building2, ExternalLink } from 'lucide-react';

const ROW_1 = [
  { name: 'All India Council for Technical Education', code: 'AICTE', desc: 'Mandatory Extension of Approval (EoA)' },
  { name: 'West Bengal Joint Entrance Examinations Board', code: 'WBJEEB', desc: 'Centralized e-Counselling Matrices' },
  { name: 'National Institutional Ranking Framework', code: 'NIRF 2024', desc: 'MHRD / MoE Engineering Rankings' },
  { name: 'National Assessment & Accreditation Council', code: 'NAAC', desc: 'Institutional Quality Outcome Reports' },
  { name: 'Maulana Abul Kalam Azad Univ of Technology', code: 'MAKAUT', desc: 'Degree Granting Affiliation Registry' },
];

const ROW_2 = [
  { name: 'Dept of Higher Education, Govt of WB', code: 'HED WB', desc: 'Government Engineering College Admin' },
  { name: 'National Board of Accreditation', code: 'NBA', desc: 'Tier-I Washington Accord Accreditations' },
  { name: 'University Grants Commission', code: 'UGC 12(B)', desc: 'Autonomous University Recognition' },
  { name: 'West Bengal State Council of Tech Education', code: 'WBSCTE', desc: 'Lateral Entry JELET Standards' },
  { name: 'AICTE Mandatory Disclosure Portal', code: 'AICTE-MD', desc: 'Published Faculty & Infrastructure Circulars' },
];

export function AccreditationMarquee() {
  return (
    <section className="py-12 border-y border-[rgba(255,255,255,0.06)] bg-[#05080A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#60726A]">
          Direct Regulatory Sourcing &amp; Primary Data Provenance
        </span>
      </div>

      {/* Marquee with Left and Right Edge Fade Masks */}
      <div
        className="space-y-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* Row 1: Leftward */}
        <div className="flex gap-4 animate-marquee-left hover:[animation-play-state:paused]">
          {[...ROW_1, ...ROW_1, ...ROW_1].map((item, i) => (
            <div
              key={`${item.code}-${i}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B1210] border border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/50 transition-all shrink-0 group cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-[rgba(16,185,129,0.1)] text-[#10B981] group-hover:bg-[#10B981] group-hover:text-slate-950 transition-colors flex items-center justify-center font-mono font-bold text-xs">
                {item.code.substring(0, 3)}
              </div>
              <div className="text-left">
                <div className="text-xs font-serif font-bold text-[#ECF4F0] group-hover:text-[#10B981] transition-colors">
                  {item.name}
                </div>
                <div className="text-[10px] text-[#9DB0A8] font-medium">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward */}
        <div className="flex gap-4 animate-marquee-right hover:[animation-play-state:paused]">
          {[...ROW_2, ...ROW_2, ...ROW_2].map((item, i) => (
            <div
              key={`${item.code}-${i}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B1210] border border-[rgba(255,255,255,0.08)] hover:border-[#F5B942]/50 transition-all shrink-0 group cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-[rgba(245,185,66,0.1)] text-[#F5B942] group-hover:bg-[#F5B942] group-hover:text-slate-950 transition-colors flex items-center justify-center font-mono font-bold text-xs">
                {item.code.substring(0, 3)}
              </div>
              <div className="text-left">
                <div className="text-xs font-serif font-bold text-[#ECF4F0] group-hover:text-[#F5B942] transition-colors">
                  {item.name}
                </div>
                <div className="text-[10px] text-[#9DB0A8] font-medium">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
