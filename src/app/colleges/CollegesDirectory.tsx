'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeCounsellingCard } from '@/components/college/CollegeCounsellingCard';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react';

export function CollegesDirectory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQ = searchParams.get('q') || '';
  const rawType = searchParams.get('type') || '';
  const initialType = rawType === 'university' ? 'state-univ' : rawType;
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

  const govtCount = VERIFIED_COLLEGES.filter(
    (c) => c.category === 'State University Faculty' || c.category === 'Government Engineering College'
  ).length;
  const privateCount = VERIFIED_COLLEGES.filter(
    (c) => c.category === 'Autonomous Private Institute' || c.category === 'Private Engineering College'
  ).length;
  const stateUnivCount = VERIFIED_COLLEGES.filter(
    (c) => c.category === 'State University Faculty'
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

  const filteredColleges = useMemo(() => {
    return VERIFIED_COLLEGES.filter((college) => {
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
      } else if (selectedType === 'state-univ') {
        if (college.category !== 'State University Faculty') {
          return false;
        }
      }

      if (selectedLocations.length > 0) {
        if (!selectedLocations.includes(college.city)) return false;
      }

      if (maxFee < 200000) {
        const fee = college.feeStructure.annualTuitionMin || 0;
        if (fee > maxFee) return false;
      }

      if (selectedAccreditations.length > 0) {
        if (!college.naacGrade || !selectedAccreditations.includes(college.naacGrade)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'fee-asc') {
        return (a.feeStructure.annualTuitionMin || 0) - (b.feeStructure.annualTuitionMin || 0);
      }
      if (sortBy === 'fee-desc') {
        return (b.feeStructure.annualTuitionMin || 0) - (a.feeStructure.annualTuitionMin || 0);
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });
  }, [searchQuery, selectedType, selectedLocations, maxFee, selectedAccreditations, sortBy]);

  /* ── Type filter pill label helper ── */
  const typePills: { key: string; label: string; count: number }[] = [
    { key: '', label: 'All', count: VERIFIED_COLLEGES.length },
    { key: 'government', label: 'Govt', count: govtCount },
    { key: 'private', label: 'Private', count: privateCount },
    { key: 'state-univ', label: 'State Univ', count: stateUnivCount },
  ];

  return (
    <div>
      {/* ── Filter Pills Row (mobile-friendly) ── */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {typePills.map((pill) => {
          const active = selectedType === pill.key;
          return (
            <button
              key={pill.key}
              type="button"
              onClick={() => setSelectedType(pill.key)}
              style={{
                borderRadius: '9999px',
                border: active ? '1.5px solid #102A56' : '1px solid #dddddd',
                background: active ? '#102A56' : '#ffffff',
                color: active ? '#ffffff' : '#222222',
                fontWeight: active ? 700 : 500,
                fontSize: '13px',
                padding: '6px 16px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {pill.label}
              <span
                style={{
                  marginLeft: '6px',
                  fontSize: '11px',
                  opacity: 0.7,
                }}
              >
                ({pill.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Main 2-Column Discovery Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-5 sticky top-24">
          <CollegeCounsellingCard
            variant="sidebar"
            id="directory-sidebar-counselling"
            title="Free College Counselling"
            subtitle="Personalized WBJEE College Shortlist"
          />

          <div
            style={{ borderRadius: '14px', border: '1px solid #dddddd' }}
            className="bg-white p-6 space-y-6"
          >
            <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid #ebebeb' }}>
              <h2 className="font-heading font-bold text-sm text-[#102A56]">Filters</h2>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-semibold text-[#1455B8] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* College Type */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6a6a6a]">
                College Type
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { value: 'government', label: 'Government', count: govtCount },
                  { value: 'private', label: 'Private', count: privateCount },
                  { value: 'state-univ', label: 'State University', count: stateUnivCount },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center justify-between cursor-pointer group">
                    <span className="flex items-center gap-2 text-[#3f3f3f] group-hover:text-[#102A56]">
                      <input
                        type="checkbox"
                        checked={selectedType === opt.value}
                        onChange={() => setSelectedType(selectedType === opt.value ? '' : opt.value)}
                        className="w-4 h-4 rounded border-[#dddddd] text-[#1455B8] focus:ring-[#1455B8]"
                      />
                      <span>{opt.label}</span>
                    </span>
                    <span className="text-[#929292] font-mono text-[11px]">({opt.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3 pt-4" style={{ borderTop: '1px solid #ebebeb' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6a6a6a]">
                Location
              </h3>
              <div className="space-y-2 text-xs max-h-48 overflow-y-auto pr-1">
                {topLocations.map((loc) => (
                  <label key={loc.city} className="flex items-center justify-between cursor-pointer group">
                    <span className="flex items-center gap-2 text-[#3f3f3f] group-hover:text-[#102A56]">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc.city)}
                        onChange={() => toggleLocation(loc.city)}
                        className="w-4 h-4 rounded border-[#dddddd] text-[#1455B8] focus:ring-[#1455B8]"
                      />
                      <span>{loc.city}</span>
                    </span>
                    <span className="text-[#929292] font-mono text-[11px]">({loc.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fee Range */}
            <div className="space-y-3 pt-4" style={{ borderTop: '1px solid #ebebeb' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6a6a6a]">
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
              <div className="flex items-center justify-between text-[11px] text-[#929292] font-mono">
                <span>₹2,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* Accreditation */}
            <div className="space-y-3 pt-4" style={{ borderTop: '1px solid #ebebeb' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6a6a6a]">
                Accreditation
              </h3>
              <div className="space-y-2 text-xs">
                {accreditations.map((acc) => (
                  <label key={acc.grade} className="flex items-center justify-between cursor-pointer group">
                    <span className="flex items-center gap-2 text-[#3f3f3f] group-hover:text-[#102A56]">
                      <input
                        type="checkbox"
                        checked={selectedAccreditations.includes(acc.grade)}
                        onChange={() => toggleAccreditation(acc.grade)}
                        className="w-4 h-4 rounded border-[#dddddd] text-[#1455B8] focus:ring-[#1455B8]"
                      />
                      <span>NAAC {acc.grade}</span>
                    </span>
                    <span className="text-[#929292] font-mono text-[11px]">({acc.count})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Column */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-5">

          {/* Toolbar: count + search bar + sort */}
          <div
            style={{ borderRadius: '14px', border: '1px solid #dddddd' }}
            className="bg-white p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
          >
            <div className="text-sm font-bold text-[#102A56] whitespace-nowrap px-1">
              {filteredColleges.length} colleges found
            </div>

            {/* Pill search bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#929292] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges (e.g. Jadavpur, IEM, KGEC…)"
                style={{
                  borderRadius: '9999px',
                  border: '1px solid #dddddd',
                  height: '56px',
                }}
                className="w-full pl-11 pr-10 bg-[#f7f7f7] text-xs sm:text-sm text-[#222222] placeholder-[#929292] focus:bg-white focus:border-[#1455B8] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929292] hover:text-[#222222]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                style={{ borderRadius: '9999px', border: '1px solid #dddddd', height: '40px' }}
                className="lg:hidden px-3.5 bg-[#f7f7f7] text-xs font-semibold text-[#102A56] flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1455B8]" />
                <span>Filters</span>
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ borderRadius: '9999px', border: '1px solid #dddddd', height: '40px' }}
                  className="pl-3.5 pr-8 bg-[#f7f7f7] text-xs font-semibold text-[#102A56] focus:bg-white focus:border-[#1455B8] focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="fee-asc">Sort: Lowest Tuition</option>
                  <option value="fee-desc">Sort: Highest Tuition</option>
                  <option value="name-asc">Sort: A–Z</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#929292] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* College cards */}
          {filteredColleges.length > 0 ? (
            <div className="space-y-4">
              <CollegeCounsellingCard
                variant="banner"
                id="directory-top-counselling"
                title="Confused Between These Engineering Colleges?"
                subtitle="Get 1-on-1 personalized counselling based on your WBJEE General Merit Rank (GMR) with zero biased agent calls."
              />

              {filteredColleges.map((college) => (
                <CollegeCard key={college.slug} college={college} />
              ))}

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
            <div
              style={{ borderRadius: '14px', border: '1px solid #dddddd' }}
              className="bg-white p-12 text-center space-y-4"
            >
              <div
                style={{ borderRadius: '9999px' }}
                className="w-12 h-12 bg-[#EAF2FF] text-[#1455B8] mx-auto flex items-center justify-center"
              >
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#102A56]">
                No matching institutions found
              </h3>
              <p className="text-xs text-[#6a6a6a] max-w-md mx-auto">
                No college matched your active filters. Try resetting your fee filter or location
                selections.
              </p>
              <button
                type="button"
                onClick={handleClearAll}
                style={{ borderRadius: '8px', background: '#1455B8' }}
                className="px-5 py-2.5 text-white text-xs font-bold hover:bg-[#0E4496] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid #ebebeb' }}>
              <h2 className="font-heading font-bold text-base text-[#102A56]">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#6a6a6a] hover:text-[#222222]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Type pills in mobile drawer */}
              <div className="space-y-2">
                <span className="font-bold text-[#222222] uppercase tracking-wider block">College Type</span>
                <div className="flex flex-wrap gap-2">
                  {typePills.map((pill) => (
                    <button
                      key={pill.key}
                      type="button"
                      onClick={() => setSelectedType(pill.key)}
                      style={{
                        borderRadius: '9999px',
                        border: selectedType === pill.key ? '1.5px solid #102A56' : '1px solid #dddddd',
                        background: selectedType === pill.key ? '#102A56' : '#ffffff',
                        color: selectedType === pill.key ? '#ffffff' : '#222222',
                        padding: '5px 12px',
                        fontWeight: selectedType === pill.key ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee */}
              <div className="space-y-2">
                <span className="font-bold text-[#222222] uppercase tracking-wider block">
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
                  onClick={() => { handleClearAll(); setMobileFilterOpen(false); }}
                  style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                  className="flex-1 py-2.5 text-[#222222] font-bold cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  style={{ borderRadius: '8px', background: '#1455B8' }}
                  className="flex-1 py-2.5 text-white font-bold cursor-pointer"
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
