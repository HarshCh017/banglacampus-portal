'use client';

import React, { useState } from 'react';
import { ShieldCheck, Award, Sparkles, CheckCircle2, TrendingUp, Info } from 'lucide-react';

export interface ScoreBadgeProps {
  score?: number;
  maxScore?: number;
  label?: string;
  variant?: 'trust' | 'seo' | 'accreditation' | 'minimal';
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

export function ScoreBadge({
  score = 98,
  maxScore = 100,
  label,
  variant = 'trust',
  subtitle,
  size = 'md',
  showDetails = true,
  className = '',
}: ScoreBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration based on variant
  const config = {
    trust: {
      defaultLabel: 'BengalCampus Trust Score',
      defaultSubtitle: 'Audited Regulatory Provenance',
      icon: ShieldCheck,
      badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
      ringColor: 'text-emerald-500',
      scoreColor: 'text-emerald-700 dark:text-emerald-400',
      metrics: [
        { name: 'AICTE Approval Verification', score: '100%' },
        { name: 'Tuition Fee Source Auditing', score: '100%' },
        { name: 'WBJEE Cutoff Citation Accuracy', score: '99%' },
        { name: 'Zero Sponsored Placement Policy', score: '100%' },
      ],
    },
    seo: {
      defaultLabel: 'SEO & Performance Score',
      defaultSubtitle: 'Lighthouse 100 & DPDP Compliant',
      icon: TrendingUp,
      badgeColor: 'bg-blue-50 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
      ringColor: 'text-blue-500',
      scoreColor: 'text-blue-700 dark:text-blue-400',
      metrics: [
        { name: 'Mobile Web Vitals', score: '99/100' },
        { name: 'Structured Data Schema (JSON-LD)', score: '100%' },
        { name: 'Accessibility & Contrast (WCAG AA)', score: '98/100' },
        { name: 'Fast Canonical Indexing', score: 'Active' },
      ],
    },
    accreditation: {
      defaultLabel: 'Institutional Rating',
      defaultSubtitle: 'NAAC / NBA / NIRF Benchmark',
      icon: Award,
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      ringColor: 'text-amber-500',
      scoreColor: 'text-amber-700 dark:text-amber-400',
      metrics: [
        { name: 'Statutory Body Approval', score: 'Verified' },
        { name: 'Accreditation Tier', score: 'Top Tier' },
        { name: 'Faculty-Student Ratio Check', score: 'Conforming' },
      ],
    },
    minimal: {
      defaultLabel: 'Verified Quality Score',
      defaultSubtitle: 'Evidence-Based Index',
      icon: Sparkles,
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
      ringColor: 'text-emerald-500',
      scoreColor: 'text-slate-900 dark:text-slate-100',
      metrics: [],
    },
  }[variant];

  const IconComponent = config.icon;
  const displayLabel = label || config.defaultLabel;
  const displaySubtitle = subtitle || config.defaultSubtitle;

  const sizeClasses = {
    sm: 'text-xs py-1 px-2.5 gap-1.5',
    md: 'text-xs sm:text-sm py-1.5 px-3.5 gap-2.5',
    lg: 'text-sm sm:text-base py-2 px-4 gap-3',
  }[size];

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        role="status"
        aria-label={`${displayLabel}: ${score} out of ${maxScore}`}
        onClick={() => showDetails && setIsOpen(!isOpen)}
        className={`inline-flex items-center rounded-full border shadow-sm transition-all duration-200 font-medium cursor-pointer hover:shadow-md ${config.badgeColor} ${sizeClasses}`}
      >
        <div className="flex items-center gap-1.5">
          <IconComponent className="w-4 h-4 flex-shrink-0" />
          <span className="font-semibold tracking-tight">{displayLabel}</span>
        </div>

        {/* Score pill */}
        <div className="inline-flex items-center gap-1 pl-1.5 border-l border-current/20">
          <span className={`font-extrabold tracking-tight ${config.scoreColor}`}>
            {score}
          </span>
          <span className="opacity-60 text-[10px]">/{maxScore}</span>
        </div>

        {showDetails && (
          <Info className="w-3 h-3 opacity-60 hover:opacity-100 transition-opacity ml-0.5" />
        )}
      </div>

      {/* Detail Tooltip Popover */}
      {showDetails && isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 sm:w-80 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 text-slate-800 dark:text-slate-100 text-xs space-y-3 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <IconComponent className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{displayLabel}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {displaySubtitle}
                </p>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs">
                {score}/{maxScore}
              </div>
            </div>

            {config.metrics.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Audit Breakdown
                </div>
                {config.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-800/60 last:border-0"
                  >
                    <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      {m.name}
                    </span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-200">
                      {m.score}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>Verified by BengalCampus Engine</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
