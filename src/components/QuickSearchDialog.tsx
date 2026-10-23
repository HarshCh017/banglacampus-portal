'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Building2, Scale, Award, BookOpen, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { College } from '@/types/college';

interface QuickSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickAction {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    title: 'Browse All Engineering Colleges',
    subtitle: '12 verified West Bengal engineering institutions',
    href: '/colleges',
    icon: Compass,
  },
  {
    title: 'WBJEE Cutoff Rank Explorer',
    subtitle: 'Check 2024 closing ranks by branch & category',
    href: '/cutoffs',
    icon: Award,
  },
  {
    title: 'Side-by-Side Comparison Engine',
    subtitle: 'Compare up to 3 institutions simultaneously',
    href: '/compare',
    icon: Scale,
  },
  {
    title: 'IEM Kolkata Acquisition Hub',
    subtitle: 'Direct admission & autonomous curriculum overview',
    href: '/colleges/iem-kolkata',
    icon: Building2,
    badge: 'Autonomous',
  },
  {
    title: 'Admission & Counselling Guides',
    subtitle: 'Factual choice-filling, syllabus & audit articles',
    href: '/blog',
    icon: BookOpen,
  },
];

export function QuickSearchDialog({ isOpen, onClose }: QuickSearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Focus input on dialog open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle global Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter colleges based on query
  const trimmed = query.trim().toLowerCase();
  const filteredColleges: College[] = trimmed
    ? VERIFIED_COLLEGES.filter((c) => {
        return (
          c.name.toLowerCase().includes(trimmed) ||
          c.shortName.toLowerCase().includes(trimmed) ||
          c.city.toLowerCase().includes(trimmed) ||
          c.district.toLowerCase().includes(trimmed) ||
          c.wbjeebCode.toLowerCase().includes(trimmed) ||
          c.category.toLowerCase().includes(trimmed) ||
          c.programs.some((p) => p.name.toLowerCase().includes(trimmed) || p.slug.toLowerCase().includes(trimmed))
        );
      }).slice(0, 6)
    : VERIFIED_COLLEGES.slice(0, 4);

  // Filter actions based on query
  const filteredActions: QuickAction[] = trimmed
    ? QUICK_ACTIONS.filter(
        (a) => a.title.toLowerCase().includes(trimmed) || a.subtitle.toLowerCase().includes(trimmed)
      )
    : QUICK_ACTIONS.slice(0, 3);

  const totalResults = filteredColleges.length + filteredActions.length;

  const navigateTo = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (totalResults > 0 ? (prev + 1) % totalResults : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (totalResults > 0 ? (prev - 1 + totalResults) % totalResults : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (totalResults === 0) return;
      if (selectedIndex < filteredColleges.length) {
        const selectedCollege = filteredColleges[selectedIndex];
        navigateTo(`/colleges/${selectedCollege.slug}`);
      } else {
        const actionIndex = selectedIndex - filteredColleges.length;
        const selectedAction = filteredActions[actionIndex];
        if (selectedAction) {
          navigateTo(selectedAction.href);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Search College Directory"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-emerald-700 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search verified colleges, cities, WBJEE codes (e.g. Jadavpur, IEM, 104)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 mr-2 transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 space-y-4 divide-y divide-slate-100">
          {/* Colleges Group */}
          {filteredColleges.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>{trimmed ? 'Matching Institutions' : 'Featured Institutions'}</span>
                <span>{filteredColleges.length} found</span>
              </div>
              <div className="space-y-0.5">
                {filteredColleges.map((college, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={college.id}
                      type="button"
                      onClick={() => navigateTo(`/colleges/${college.slug}`)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                        isSelected ? 'bg-emerald-50 text-emerald-950' : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {college.wbjeebCode}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm truncate">
                              {college.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold shrink-0">
                              {college.category}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {college.city}, {college.district} · {college.programs.length} Approved Branches
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-xs font-semibold">
                        {college.nirfRankEngineering2024 && (
                          <span className="hidden sm:inline-block text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            NIRF #{college.nirfRankEngineering2024}
                          </span>
                        )}
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-slate-300'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Actions Group */}
          {filteredActions.length > 0 && (
            <div className="pt-3 space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Navigation & Tools
              </div>
              <div className="space-y-0.5">
                {filteredActions.map((action, idx) => {
                  const globalIdx = filteredColleges.length + idx;
                  const isSelected = selectedIndex === globalIdx;
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.href}
                      type="button"
                      onClick={() => navigateTo(action.href)}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                        isSelected ? 'bg-emerald-50 text-emerald-950' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <span className="font-semibold text-xs sm:text-sm block truncate">
                            {action.title}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {action.subtitle}
                          </span>
                        </div>
                      </div>

                      {action.badge && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {action.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Zero Results State */}
          {totalResults === 0 && (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No matching institutions found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for a university name (e.g. Jadavpur), an autonomous college (IEM, Heritage), or a city (Kolkata, Kalyani).
              </p>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>AICTE, WBJEEB & NIRF Audited Registry</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono mr-1">↑↓</kbd>
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono mr-1">↵</kbd>
              Select
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
