'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ChevronRight,
  Info,
  CheckCircle2,
  Building2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';

export function FeeCalculatorClient() {
  const [selectedSlug, setSelectedSlug] = useState<string>('iem-kolkata');
  const [course, setCourse] = useState<string>('B.Tech');
  const [durationYears, setDurationYears] = useState<number>(4);
  const [includeHostel, setIncludeHostel] = useState<boolean>(true);
  const [otherExpenses, setOtherExpenses] = useState<number>(20000);

  const selectedCollege = useMemo(() => {
    return (
      VERIFIED_COLLEGES.find((c) => c.slug === selectedSlug) ||
      VERIFIED_COLLEGES[0]
    );
  }, [selectedSlug]);

  const isGovt =
    selectedCollege.category === 'State University Faculty' ||
    selectedCollege.category === 'Government Engineering College';

  // Tuition per year (verified)
  const tuitionPerYear = selectedCollege.feeStructure.annualTuitionMin ?? 2400;

  // Hostel per year (estimated based on governance type)
  const hostelPerYear = includeHostel ? (isGovt ? 24000 : 110000) : 0;

  // Annual Total
  const totalPerYear = tuitionPerYear + hostelPerYear + otherExpenses;

  // 4-Year Total
  const totalCourseCost = totalPerYear * durationYears;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
        <Link href="/" className="hover:text-[#1455B8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#102A56]">Fee Calculator</span>
      </nav>

      {/* 2. Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight">
          Engineering Fee Calculator
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mt-1.5">
          Estimate your total education cost, including tuition, hostel and other expenses.
        </p>
      </div>

      {/* 3. Two-Column Calculator Layout (Mockup 6 baseline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#F1F5F9]">
            <Building2 className="w-5 h-5 text-[#1455B8]" />
            <h2 className="font-heading font-bold text-lg text-[#102A56]">
              Select Program &amp; Preferences
            </h2>
          </div>

          {/* Input 1: Select College */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#102A56]">
              Select College
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-sm font-semibold text-[#102A56] focus:border-[#1455B8] transition-colors"
            >
              {VERIFIED_COLLEGES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name} ({c.category})
                </option>
              ))}
            </select>
          </div>

          {/* Input 2: Course */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#102A56]">
              Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-sm font-medium text-[#102A56] focus:border-[#1455B8]"
            >
              <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
              <option value="B.Tech Lateral">B.Tech Lateral Entry (JELET, 3 Years)</option>
            </select>
          </div>

          {/* Input 3: Duration */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#102A56]">
              Course Duration
            </label>
            <select
              value={durationYears}
              onChange={(e) => setDurationYears(Number(e.target.value))}
              className="w-full h-12 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-sm font-medium text-[#102A56] focus:border-[#1455B8]"
            >
              <option value={4}>4 Years (Standard 8 Semesters)</option>
              <option value={3}>3 Years (Lateral Entry 6 Semesters)</option>
            </select>
          </div>

          {/* Input 4: Hostel & Mess */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#102A56]">
              Campus Hostel &amp; Mess Accommodation
            </label>
            <select
              value={includeHostel ? 'yes' : 'no'}
              onChange={(e) => setIncludeHostel(e.target.value === 'yes')}
              className="w-full h-12 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-sm font-medium text-[#102A56] focus:border-[#1455B8]"
            >
              <option value="yes">Yes (Include Hostel &amp; Food Costs)</option>
              <option value="no">No (Day Scholar / Commuting From Home)</option>
            </select>
          </div>

          {/* Input 5: Books & Contingencies */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-semibold text-[#102A56]">
                Books, Exam Fees &amp; Supplies (per year)
              </label>
              <span className="font-mono font-bold text-[#1455B8]">
                ₹{otherExpenses.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="5000"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(Number(e.target.value))}
              className="w-full accent-[#1455B8] cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="w-full h-12 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Calculate Total Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Estimated Cost Breakdown Card (Mockup 6 baseline) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F1F5F9]">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1455B8] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-[#102A56]">
                Estimated Cost Breakdown
              </h2>
              <span className="text-xs text-[#64748B]">
                {selectedCollege.name} ({durationYears} Years)
              </span>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3.5 text-xs sm:text-sm">
            {/* Tuition */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <span className="text-[#64748B] font-medium">
                Tuition Fee (per year)
              </span>
              <span className="font-heading font-bold text-base text-[#1455B8]">
                ₹{tuitionPerYear.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Hostel */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <span className="text-[#64748B] font-medium">
                Hostel &amp; Mess (per year)
              </span>
              <span className="font-heading font-bold text-base text-[#1455B8]">
                {includeHostel ? `₹${hostelPerYear.toLocaleString('en-IN')}` : '₹0 (Day Scholar)'}
              </span>
            </div>

            {/* Other Expenses */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <span className="text-[#64748B] font-medium">
                Other Expenses (per year)
              </span>
              <span className="font-heading font-bold text-base text-[#1455B8]">
                ₹{otherExpenses.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Total Per Year Highlight Box */}
            <div className="p-4 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] flex items-center justify-between">
              <span className="font-bold text-[#102A56] text-sm">
                Total per year
              </span>
              <span className="font-heading font-extrabold text-xl text-[#1455B8]">
                ₹{totalPerYear.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Total 4-Year Course Cost (Amber accent highlight) */}
            <div className="p-5 rounded-xl bg-[#FEF8EB] border border-[#FDE4B0] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#B45309] block uppercase tracking-wider">
                  Total for {durationYears} years
                </span>
                <span className="text-[11px] text-[#B45309]/80">
                  Comprehensive education investment
                </span>
              </div>
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#102A56]">
                ₹{totalCourseCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Disclaimer Note matching Mockup 6 */}
          <div className="pt-2 flex items-start gap-2 text-[11px] text-[#64748B] leading-relaxed">
            <Info className="w-4 h-4 text-[#1455B8] shrink-0 mt-0.5" />
            <p>
              This is an estimated cost based on verified annual tuition circulars. Hostel and mess expenses vary depending on room type and mess plans. Please verify the latest schedule with the official college administration.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/colleges/${selectedCollege.slug}`}
              className="w-full py-2.5 rounded-xl border border-[#CBD5E1] text-[#102A56] hover:bg-[#FAFBFD] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Verified {selectedCollege.shortName} Fee Circulars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeCalculatorClient;
