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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm sm:max-w-md w-[calc(100%-2rem)] sm:w-auto"
    >
      <div
        style={{
          borderRadius: 14,
          border: '1px solid #dddddd',
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        }}
        className="bg-white overflow-hidden transition-all duration-200"
      >
        {/* Dock Header Bar */}
        <div
          style={{ borderBottom: '1px solid #eeeeee' }}
          className="px-4 py-2.5 bg-[#f7f7f7] flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <div
              style={{ background: '#102A56' }}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
            >
              <Scale className="w-3.5 h-3.5" />
            </div>
            <span
              style={{ color: '#102A56' }}
              className="font-heading font-bold text-xs"
            >
              Compare Deck ({selectedColleges.length}/{maxLimit})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMinimized(!minimized)}
              className="p-1 rounded text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer"
              aria-label={minimized ? 'Expand comparison dock' : 'Minimize comparison dock'}
            >
              {minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={clearCompare}
              className="p-1 rounded text-[#6a6a6a] hover:text-red-600 transition-colors cursor-pointer"
              title="Clear comparison"
              aria-label="Clear all colleges from comparison"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expanded View */}
        {!minimized && (
          <div className="p-3.5 space-y-3 bg-white">
            {/* Chips of Selected Colleges */}
            <div className="flex flex-wrap gap-1.5">
              {selectedColleges.map((c) => (
                <div
                  key={c!.id}
                  style={{
                    border: '1px solid #dddddd',
                    background: '#f7f7f7',
                    borderRadius: 8,
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#222222] transition-colors"
                >
                  <span className="truncate max-w-[150px] font-medium">{c!.shortName}</span>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(c!.slug)}
                    className="text-[#6a6a6a] hover:text-red-600 p-0.5 rounded cursor-pointer transition-colors"
                    aria-label={`Remove ${c!.shortName} from comparison`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div
              style={{ borderTop: '1px solid #eeeeee' }}
              className="flex items-center justify-between gap-2 pt-2.5"
            >
              <span className="text-[11px] text-[#6a6a6a]">
                {maxLimit - selectedColleges.length > 0
                  ? `Select ${maxLimit - selectedColleges.length} more`
                  : 'Deck full (3 of 3)'}
              </span>

              <Link
                href="/compare"
                style={{
                  background: '#102A56',
                  borderRadius: 9999,
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-xs cursor-pointer"
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
