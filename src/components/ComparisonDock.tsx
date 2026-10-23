'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useComparison } from '@/context/ComparisonContext';
import { getCollegeBySlug } from '@/data/colleges';
import { Scale, X, ArrowRight, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export function ComparisonDock() {
  const { selectedSlugs, removeFromCompare, clearCompare, maxLimit } = useComparison();
  const pathname = usePathname();
  const [minimized, setMinimized] = useState(false);

  // Don't show dock when already on the /compare page or when no colleges selected
  if (selectedSlugs.length === 0 || pathname === '/compare') {
    return null;
  }

  const selectedColleges = selectedSlugs
    .map((slug) => getCollegeBySlug(slug))
    .filter((c) => Boolean(c));

  return (
    <aside
      aria-label="Active Comparison Dock"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 max-w-lg w-[calc(100%-2rem)] sm:w-auto"
    >
      <div className="bg-slate-950/95 backdrop-blur-md text-white border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200">
        {/* Dock Header Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Scale className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading font-bold text-xs text-white">
              Compare Deck ({selectedColleges.length}/{maxLimit})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMinimized(!minimized)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              aria-label={minimized ? 'Expand comparison dock' : 'Minimize comparison dock'}
            >
              {minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={clearCompare}
              className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear comparison"
              aria-label="Clear all colleges from comparison"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expanded View */}
        {!minimized && (
          <div className="p-3.5 space-y-3">
            {/* Chips of Selected Colleges */}
            <div className="flex flex-wrap gap-1.5">
              {selectedColleges.map((c) => (
                <div
                  key={c!.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200"
                >
                  <span className="truncate max-w-[150px] font-medium">{c!.shortName}</span>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(c!.slug)}
                    className="text-slate-400 hover:text-rose-400 p-0.5 rounded"
                    aria-label={`Remove ${c!.shortName} from comparison`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">
                {maxLimit - selectedColleges.length > 0
                  ? `Select ${maxLimit - selectedColleges.length} more`
                  : 'Deck full (3 of 3)'}
              </span>

              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-xs"
              >
                <span>Compare Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
