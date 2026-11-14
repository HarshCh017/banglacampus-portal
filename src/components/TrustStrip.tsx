import React from 'react';
import { ShieldCheck, Award, BookOpen, Building2, Check, Sparkles } from 'lucide-react';

export function TrustStrip() {
  const verifications = [
    {
      icon: ShieldCheck,
      title: 'AICTE Approved',
      subtitle: 'New Delhi Regulatory Charter',
      source: 'AICTE EoA Records',
    },
    {
      icon: Award,
      title: 'MAKAUT Affiliated',
      subtitle: 'Autonomous Degree Status',
      source: 'Univ. Affiliation Circular',
    },
    {
      icon: BookOpen,
      title: "NAAC 'A' & NBA",
      subtitle: 'Accredited CSE, IT & ECE',
      source: 'National Accreditation',
    },
    {
      icon: Building2,
      title: 'Sector V Tech Hub',
      subtitle: 'Ashram Building GN-34/2',
      source: 'Kolkata Campus',
    },
    {
      icon: Sparkles,
      title: 'Free IEMJEE 2027',
      subtitle: '₹0 Registration Fee',
      source: 'Official Exam Portal',
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {verifications.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors ${
                  idx === 4 ? 'col-span-2 md:col-span-1 max-w-sm mx-auto w-full md:max-w-none' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-brandBlue-100 text-brandBlue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                    {item.subtitle}
                  </p>
                  <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                    {item.source}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
