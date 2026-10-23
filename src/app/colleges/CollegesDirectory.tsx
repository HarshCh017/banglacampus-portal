'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { VERIFIED_COLLEGES, getAllCategories, getAllDistricts } from '@/data/colleges';
import { College } from '@/types/college';
import { CollegeCard } from '@/components/CollegeCard';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Compass,
  Check,
  Building,
  MapPin,
  ChevronDown,
} from 'lucide-react';

export function CollegesDirectory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categories = useMemo(() => getAllCategories(), []);
  const districts = useMemo(() => getAllDistricts(), []);

  // Read initial filter values from URL params
  const initialQ = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialDistrict = searchParams.get('district') || '';
  const initialFee = searchParams.get('maxFee') ? Number(searchParams.get('maxFee')) : null;
  const initialNaac = searchParams.get('naac') === 'true';
  const initialSort = searchParams.get('sort') || 'name-asc';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [maxAnnualFee, setMaxAnnualFee] = useState<number | null>(initialFee);
  const [naacOnly, setNaacOnly] = useState(initialNaac);
  const [sortBy, setSortBy] = useState(initialSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state back to URL parameters
  const updateUrl = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'false') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateUrl({ q: val || null });
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    updateUrl({ category: val || null });
  };

  const handleDistrictChange = (val: string) => {
    setSelectedDistrict(val);
    updateUrl({ district: val || null });
  };

  const handleFeeChange = (val: number | null) => {
    setMaxAnnualFee(val);
    updateUrl({ maxFee: val ? String(val) : null });
  };

  const handleNaacChange = (val: boolean) => {
    setNaacOnly(val);
    updateUrl({ naac: val ? 'true' : null });
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    updateUrl({ sort: val !== 'name-asc' ? val : null });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDistrict('');
    setMaxAnnualFee(null);
    setNaacOnly(false);
    setSortBy('name-asc');
    router.replace(pathname, { scroll: false });
  };

  // Filter & Sort Pipeline
  const filteredColleges = useMemo(() => {
    return VERIFIED_COLLEGES.filter((c) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q);
        const matchesCity = c.city.toLowerCase().includes(q) || c.district.toLowerCase().includes(q);
        const matchesCode = c.wbjeebCode.toLowerCase().includes(q);
        const matchesProgram = c.programs.some((p) => p.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesCode && !matchesProgram) {
          return false;
        }
      }

      // Category
      if (selectedCategory && c.category !== selectedCategory) {
        return false;
      }

      // District
      if (selectedDistrict && c.district !== selectedDistrict) {
        return false;
      }

      // NAAC Accreditation
      if (naacOnly && !c.naacGrade) {
        return false;
      }

      // Max Annual Fee
      if (maxAnnualFee !== null) {
        const collegeMinFee = c.feeStructure.annualTuitionMin;
        if (collegeMinFee === null || collegeMinFee > maxAnnualFee) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'nirf-asc') {
        const rankA = typeof a.nirfRankEngineering2024 === 'number' ? a.nirfRankEngineering2024 : 999;
        const rankB = typeof b.nirfRankEngineering2024 === 'number' ? b.nirfRankEngineering2024 : 999;
        return rankA - rankB;
      }
      if (sortBy === 'fee-asc') {
        const feeA = a.feeStructure.annualTuitionMin ?? Number.MAX_SAFE_INTEGER;
        const feeB = b.feeStructure.annualTuitionMin ?? Number.MAX_SAFE_INTEGER;
        return feeA - feeB;
      }
      if (sortBy === 'fee-desc') {
        const feeA = a.feeStructure.annualTuitionMax ?? -1;
        const feeB = b.feeStructure.annualTuitionMax ?? -1;
        return feeB - feeA;
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedDistrict, naacOnly, maxAnnualFee, sortBy]);

  const activeFiltersCount = [
    Boolean(searchQuery.trim()),
    Boolean(selectedCategory),
    Boolean(selectedDistrict),
    maxAnnualFee !== null,
    naacOnly,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>West Bengal Engineering Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          Engineering Colleges Directory
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Filter and compare accredited engineering institutions across West Bengal. Every fee figure and accreditation status is cross-referenced with public AICTE and WBJEEB records.
        </p>
      </div>

      {/* Main Search & Sort Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by college name, city, or stream..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle on Mobile & Sort Selector */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl border border-slate-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="name-asc">Name (A to Z)</option>
              <option value="nirf-asc">NIRF Rank (Top First)</option>
              <option value="fee-asc">Tuition Fee (Lowest First)</option>
              <option value="fee-desc">Tuition Fee (Highest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside
          aria-label="Directory Filters"
          className={`space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs md:block ${
            mobileFiltersOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <span>Filter Colleges</span>
            </h2>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
              Institution Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="">All Categories ({VERIFIED_COLLEGES.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
              District / Location
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="">All Districts ({districts.length})</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Max Annual Fee Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
              Maximum Annual Fee
            </label>
            <div className="space-y-1.5 text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                <input
                  type="radio"
                  name="fee"
                  checked={maxAnnualFee === null}
                  onChange={() => handleFeeChange(null)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Any Fee Structure</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                <input
                  type="radio"
                  name="fee"
                  checked={maxAnnualFee === 50000}
                  onChange={() => handleFeeChange(50000)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Under ₹50,000/yr (Govt/Subsidized)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                <input
                  type="radio"
                  name="fee"
                  checked={maxAnnualFee === 150000}
                  onChange={() => handleFeeChange(150000)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Under ₹1.5 Lakh/yr</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                <input
                  type="radio"
                  name="fee"
                  checked={maxAnnualFee === 250000}
                  onChange={() => handleFeeChange(250000)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Under ₹2.5 Lakh/yr</span>
              </label>
            </div>
          </div>

          {/* NAAC Accreditation Checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={naacOnly}
                onChange={(e) => handleNaacChange(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-emerald-600 rounded bg-slate-50 border-slate-300 focus:ring-emerald-500"
              />
              <span className="font-medium">
                Show Only NAAC Accredited Colleges
              </span>
            </label>
          </div>
        </aside>

        {/* Directory Results Grid */}
        <main className="md:col-span-3 space-y-6">
          {/* Result Counts & Active Filter Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900">{filteredColleges.length}</strong> of{' '}
              {VERIFIED_COLLEGES.length} engineering institutions
            </span>

            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span>{selectedCategory}</span>
                    <button type="button" onClick={() => handleCategoryChange('')}>
                      <X className="w-3 h-3 hover:text-emerald-950" />
                    </button>
                  </span>
                )}
                {selectedDistrict && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span>{selectedDistrict}</span>
                    <button type="button" onClick={() => handleDistrictChange('')}>
                      <X className="w-3 h-3 hover:text-emerald-950" />
                    </button>
                  </span>
                )}
                {maxAnnualFee !== null && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span>≤ ₹{(maxAnnualFee / 100000).toFixed(1)}L/yr</span>
                    <button type="button" onClick={() => handleFeeChange(null)}>
                      <X className="w-3 h-3 hover:text-emerald-950" />
                    </button>
                  </span>
                )}
                {naacOnly && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span>NAAC Only</span>
                    <button type="button" onClick={() => handleNaacChange(false)}>
                      <X className="w-3 h-3 hover:text-emerald-950" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredColleges.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                No Colleges Match Your Selected Filters
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your fee ceiling, clearing district selections, or adjusting your search keywords.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
