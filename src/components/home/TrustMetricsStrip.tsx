'use client';

import React from 'react';
import { Building2, Layers, ShieldCheck, Clock, Tag } from 'lucide-react';

export function TrustMetricsStrip() {
  return (
    <section className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-14 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-slate-200/90 shadow-2xl shadow-slate-900/10 px-5 sm:px-8 lg:px-10 py-4 sm:py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 items-center lg:divide-x divide-slate-200">
          
          {/* Metric 1: Engineering Colleges */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1455B8] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-heading font-extrabold text-[#102A56] block leading-tight">
                20 Verified
              </span>
              <span className="text-xs text-[#64748B] font-medium block">
                Top Institutions
              </span>
            </div>
          </div>

          {/* Metric 2: Branches */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-heading font-extrabold text-[#102A56] block leading-tight">
                50+
              </span>
              <span className="text-xs text-[#64748B] font-medium block">
                Branches
              </span>
            </div>
          </div>

          {/* Metric 3: Verified Information */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B7A62] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-heading font-bold text-[#102A56] block leading-tight">
                Verified Information
              </span>
              <span className="text-xs text-[#64748B] font-medium block">
                from official sources
              </span>
            </div>
          </div>

          {/* Metric 4: Updated for WBJEE 2026 */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1455B8] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-heading font-bold text-[#102A56] block leading-tight">
                Updated for
              </span>
              <span className="text-xs text-[#64748B] font-medium block">
                WBJEE 2026
              </span>
            </div>
          </div>

          {/* Metric 5: Free Tools */}
          <div className="flex items-center gap-3 col-span-2 sm:col-span-1 lg:px-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-heading font-bold text-[#102A56] block leading-tight">
                Free Tools
              </span>
              <span className="text-xs text-[#64748B] font-medium block">
                Predictor, Compare, Calculator
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TrustMetricsStrip;
