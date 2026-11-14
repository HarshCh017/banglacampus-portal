'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeCounsellingCard } from '@/components/college/CollegeCounsellingCard';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronRight,
  ChevronDown,
  Headphones,
  Sparkles,
  Phone,
  ArrowRight,
} from 'lucide-react';

export function CollegesDirectory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read initial filter values from URL params
  const initialQ = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialSort = searchParams.get('sort') || 'relevance';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    initialLocation ? [initialLocation] : []
  );
  const [maxFee, setMaxFee] = useState<number>(200000);
  const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Dynamic counts for filters
  const govtCount = VERIFIED_COLLEGES.filter(
    (c) => c.category === 'State University Faculty' || c.category === 'Government Engineering College'
  ).length;
  const privateCount = VERIFIED_COLLEGES.filter(
    (c) => c.category === 'Autonomous Private Institute' || c.category === 'Private Engineering College'
  ).length;

  const topLocations = [
    { city: 'Kolkata', count: 6 },
    { city: 'Kalyani', count: 2 },
    { city: 'Howrah', count: 2 },
    { city: 'Nadia', count: 2 },
    { city: 'Jalpaiguri', count: 1 },
    { city: 'Burdwan', count: 1 },
    { city: 'Haldia', count: 1 },
  ];

  const accreditations = [
    { grade: 'A++', count: 3 },
    { grade: 'A+', count: 4 },
    { grade: 'A', count: 5 },
    { grade: 'B++', count: 3 },
  ];

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedLocations([]);
    setMaxFee(200000);
    setSelectedAccreditations([]);
    setSortBy('relevance');
    router.replace(pathname, { scroll: false });
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleAccreditation = (acc: string) => {
    setSelectedAccreditations((prev) =>
      prev.includes(acc) ? prev.filter((a) => a !== acc) : [...prev, acc]
    );
  };

  // Filter & Sort Pipeline
  const filteredColleges = useMemo(() => {
    return VERIFIED_COLLEGES.filter((college) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(q);
        const matchesShort = college.shortName.toLowerCase().includes(q);
        const matchesCity = college.city.toLowerCase().includes(q);
        const matchesDistrict = college.district.toLowerCase().includes(q);
        const matchesCode = college.wbjeebCode.toLowerCase().includes(q);
        if (!matchesName && !matchesShort && !matchesCity && !matchesDistrict && !matchesCode) {
          return false;
        }
      }

      // College Type
      if (selectedType === 'government') {
        if (
          college.category !== 'State University Faculty' &&
          college.category !== 'Government Engineering College'
        ) {
          return false;
        }
      } else if (selectedType === 'private') {
        if (
          college.category !== 'Autonomous Private Institute' &&
          college.category !== 'Private Engineering College'
        ) {
          return false;
        }
      }

      // Locations
      if (selectedLocations.length > 0) {
        if (!selectedLocations.includes(college.city)) {
          return false;
        }
      }

      // Max Annual Fee
      if (maxFee < 200000) {
        const fee = college.feeStructure.annualTuitionMin || 0;
        if (fee > maxFee) return false;
      }

      // Accreditations
      if (selectedAccreditations.length > 0) {
        if (!college.naacGrade || !selectedAccreditations.includes(college.naacGrade)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'fee-asc') {
        const feeA = a.feeStructure.annualTuitionMin || 0;
        const feeB = b.feeStructure.annualTuitionMin || 0;
        return feeA - feeB;
      }
      if (sortBy === 'fee-desc') {
        const feeA = a.feeStructure.annualTuitionMin || 0;
        const feeB = b.feeStructure.annualTuitionMin || 0;
        return feeB - feeA;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      // Relevance / default: State univs and govt colleges first, then by nirf rank
      return a.category.localeCompare(b.category);
    });
  }, [searchQuery, selectedType, selectedLocations, maxFee, selectedAccreditations, sortBy]);

  return (
    <div>
      {/* Main 2-Column Discovery Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3.5 space-y-5 sticky top-24">
          {/* 1. Free College Counselling Card at TOP of Sidebar */}
          <CollegeCounsellingCard
            variant="sidebar"
            id="directory-sidebar-counselling"
            title="Free College Counselling"
            subtitle="Personalized WBJEE College Shortlist"
          />

          {/* 2. Filter Controls Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-heading font-bold text-base text-[#102A56]">Filters</h2>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-semibold text-[#1455B8] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

          {/* College Type Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              College Type
            </h3>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-slate-700 group-hover:text-[#102A56]">
                  <input
                    type="checkbox"
                    checked={selectedType === 'government'}
                    onChange={() => setSelectedType(selectedType === 'government' ? '' : 'government')}
                    className="w-4 h-4 rounded border-slate-300 text-[#1455B8] focus:ring-[#1455B8]"
                  />
                  <span>Government</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">({govtCount})</span>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-slate-700 group-hover:text-[#102A56]">
                  <input
                    type="checkbox"
                    checked={selectedType === 'private'}
                    onChange={() => setSelectedType(selectedType === 'private' ? '' : 'private')}
                    className="w-4 h-4 rounded border-slate-300 text-[#1455B8] focus:ring-[#1455B8]"
                  />
                  <span>Private</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">({privateCount})</span>
              </label>
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Location
            </h3>
            <div className="space-y-2 text-xs max-h-48 overflow-y-auto no-scrollbar pr-1">
              {topLocations.map((loc) => (
                <label key={loc.city} className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-700 group-hover:text-[#102A56]">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(loc.city)}
                      onChange={() => toggleLocation(loc.city)}
                      className="w-4 h-4 rounded border-slate-300 text-[#1455B8] focus:ring-[#1455B8]"
                    />
                    <span>{loc.city}</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">({loc.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Annual Fee Range Slider */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Annual Fee
              </h3>
              <span className="text-xs font-bold text-[#1455B8]">
                Up to ₹{maxFee.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="200000"
              step="5000"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full accent-[#1455B8] cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>₹2,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          {/* Accreditation Filter */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Accreditation
            </h3>
            <div className="space-y-2 text-xs">
              {accreditations.map((acc) => (
                <label key={acc.grade} className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-700 group-hover:text-[#102A56]">
                    <input
                      type="checkbox"
                      checked={selectedAccreditations.includes(acc.grade)}
                      onChange={() => toggleAccreditation(acc.grade)}
                      className="w-4 h-4 rounded border-slate-300 text-[#1455B8] focus:ring-[#1455B8]"
                    />
                    <span>NAAC {acc.grade}</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">({acc.count})</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

        {/* Right Main Column (Matches Mockup 2: Toolbar + Cards Stack) */}
        <main className="lg:col-span-8 xl:col-span-8.5 space-y-5">
          
          {/* Top Toolbar: "20 colleges found" + Search Bar + Sort Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Left Count */}
            <div className="text-sm font-bold text-[#102A56] whitespace-nowrap px-1">
              {filteredColleges.length} colleges found
            </div>

            {/* Middle Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges (e.g. Jadavpur, IEM, KGEC...)"
                className="w-full h-10 pl-10 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#102A56] placeholder-slate-400 focus:bg-white focus:border-[#1455B8] focus:outline-hidden transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right Sort Dropdown & Mobile Filter Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-[#102A56] flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1455B8]" />
                <span>Filters</span>
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 pl-3.5 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#102A56] focus:bg-white focus:border-[#1455B8] focus:outline-hidden cursor-pointer appearance-none"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="fee-asc">Sort: Lowest Tuition</option>
                  <option value="fee-desc">Sort: Highest Tuition</option>
                  <option value="name-asc">Sort: Alphabetical (A-Z)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* College Cards Stack */}
          {filteredColleges.length > 0 ? (
            <div className="space-y-4">
              {/* Strategic Counselling Card at Top of College Cards */}
              <CollegeCounsellingCard
                variant="banner"
                id="directory-top-counselling"
                title="Confused Between These Engineering Colleges?"
                subtitle="Get 1-on-1 personalized counselling based on your WBJEE General Merit Rank (GMR) with zero biased agent calls."
              />

              {filteredColleges.map((college) => (
                <CollegeCard key={college.slug} college={college} />
              ))}

              {/* Strategic Counselling Card at Bottom of College Cards */}
              <div className="pt-4">
                <CollegeCounsellingCard
                  variant="banner"
                  id="directory-bottom-counselling"
                  title="Still Exploring Options?"
                  subtitle="Speak with an expert admission counsellor to analyze choice-filling priority order for your target colleges."
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1455B8] mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#102A56]">
                No matching institutions found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No college matched your active search query or filter thresholds. Try resetting your fee filter or location selections.
              </p>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-5 py-2.5 rounded-xl bg-[#1455B8] text-white text-xs font-bold hover:bg-[#0E4496] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-heading font-bold text-base text-[#102A56]">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Controls */}
            <div className="space-y-6 text-xs">
              {/* Type */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider block">College Type</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedType === 'government'}
                      onChange={() => setSelectedType(selectedType === 'government' ? '' : 'government')}
                    />
                    <span>Government ({govtCount})</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedType === 'private'}
                      onChange={() => setSelectedType(selectedType === 'private' ? '' : 'private')}
                    />
                    <span>Private ({privateCount})</span>
                  </label>
                </div>
              </div>

              {/* Fee */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider block">
                  Annual Tuition: Up to ₹{maxFee.toLocaleString('en-IN')}
                </span>
                <input
                  type="range"
                  min="2000"
                  max="200000"
                  step="5000"
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full accent-[#1455B8]"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleClearAll();
                    setMobileFilterOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1455B8] text-white font-bold"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollegesDirectory;
