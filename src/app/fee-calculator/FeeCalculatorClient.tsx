'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ChevronRight,
  Info,
  Building2,
  ArrowRight,
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
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6a6a6a] mb-4">
        <Link href="/" className="hover:text-[#102A56] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#222222]">Fee Calculator</span>
      </nav>

      {/* 2. Page Header */}
      <div className="mb-8">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#222222',
            letterSpacing: '-0.02em',
          }}
        >
          Engineering Fee Calculator
        </h1>
        <p style={{ fontSize: 14, color: '#6a6a6a', marginTop: 4 }}>
          Estimate your total education investment across 4 years, including verified tuition, hostel, and semester costs.
        </p>
      </div>

      {/* 3. Two-Column Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px solid #dddddd',
            padding: 28,
          }}
          className="lg:col-span-6 space-y-5"
        >
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#ebebeb]">
            <Building2 style={{ width: 20, height: 20, color: '#102A56' }} />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>
              Select Program &amp; Preferences
            </h2>
          </div>

          {/* Input 1: Select College */}
          <div className="space-y-1.5">
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#222222' }}>
              Select College
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              style={{
                width: '100%',
                height: 44,
                padding: '0 12px',
                borderRadius: 8,
                border: '1px solid #dddddd',
                background: '#ffffff',
                fontSize: 13,
                fontWeight: 500,
                color: '#222222',
                outline: 'none',
              }}
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
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#222222' }}>
              Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              style={{
                width: '100%',
                height: 44,
                padding: '0 12px',
                borderRadius: 8,
                border: '1px solid #dddddd',
                background: '#ffffff',
                fontSize: 13,
                color: '#222222',
                outline: 'none',
              }}
            >
              <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
              <option value="B.Tech Lateral">B.Tech Lateral Entry (JELET, 3 Years)</option>
            </select>
          </div>

          {/* Input 3: Duration */}
          <div className="space-y-1.5">
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#222222' }}>
              Course Duration
            </label>
            <select
              value={durationYears}
              onChange={(e) => setDurationYears(Number(e.target.value))}
              style={{
                width: '100%',
                height: 44,
                padding: '0 12px',
                borderRadius: 8,
                border: '1px solid #dddddd',
                background: '#ffffff',
                fontSize: 13,
                color: '#222222',
                outline: 'none',
              }}
            >
              <option value={4}>4 Years (Standard 8 Semesters)</option>
              <option value={3}>3 Years (Lateral Entry 6 Semesters)</option>
            </select>
          </div>

          {/* Input 4: Hostel & Mess */}
          <div className="space-y-1.5">
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#222222' }}>
              Campus Hostel &amp; Mess Accommodation
            </label>
            <select
              value={includeHostel ? 'yes' : 'no'}
              onChange={(e) => setIncludeHostel(e.target.value === 'yes')}
              style={{
                width: '100%',
                height: 44,
                padding: '0 12px',
                borderRadius: 8,
                border: '1px solid #dddddd',
                background: '#ffffff',
                fontSize: 13,
                color: '#222222',
                outline: 'none',
              }}
            >
              <option value="yes">Yes (Include Hostel &amp; Food Costs)</option>
              <option value="no">No (Day Scholar / Commuting From Home)</option>
            </select>
          </div>

          {/* Input 5: Books & Contingencies */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label style={{ fontWeight: 600, color: '#222222' }}>
                Books, Exam Fees &amp; Supplies (per year)
              </label>
              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#102A56' }}>
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
              className="w-full accent-[#102A56] cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 8,
                background: '#102A56',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span>Calculate Total Budget</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>

        {/* Right Column: Estimated Cost Breakdown Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px solid #dddddd',
            padding: 28,
          }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-[#ebebeb]">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                background: '#f7f7f7',
                border: '1px solid #dddddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#102A56',
              }}
            >
              <Calculator style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>
                Estimated Cost Breakdown
              </h2>
              <span style={{ fontSize: 12, color: '#6a6a6a' }}>
                {selectedCollege.name} ({durationYears} Years)
              </span>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3.5 text-xs sm:text-sm">
            {/* Tuition */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ebebeb]">
              <span style={{ color: '#6a6a6a', fontWeight: 500 }}>
                Tuition Fee (per year)
              </span>
              <span style={{ fontWeight: 600, fontSize: 16, color: '#222222' }}>
                ₹{tuitionPerYear.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Hostel */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ebebeb]">
              <span style={{ color: '#6a6a6a', fontWeight: 500 }}>
                Hostel &amp; Mess (per year)
              </span>
              <span style={{ fontWeight: 600, fontSize: 16, color: '#222222' }}>
                {includeHostel ? `₹${hostelPerYear.toLocaleString('en-IN')}` : '₹0 (Day Scholar)'}
              </span>
            </div>

            {/* Other Expenses */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ebebeb]">
              <span style={{ color: '#6a6a6a', fontWeight: 500 }}>
                Other Expenses (per year)
              </span>
              <span style={{ fontWeight: 600, fontSize: 16, color: '#222222' }}>
                ₹{otherExpenses.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Total Per Year */}
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: '#f7f7f7',
                border: '1px solid #dddddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontWeight: 600, color: '#222222', fontSize: 14 }}>
                Total per year
              </span>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#102A56' }}>
                ₹{totalPerYear.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Total 4-Year Course Cost */}
            <div
              style={{
                padding: 20,
                borderRadius: 10,
                background: '#ffffff',
                border: '2px solid #102A56',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#102A56', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total for {durationYears} years
                </span>
                <span style={{ fontSize: 11, color: '#6a6a6a' }}>
                  Comprehensive education investment
                </span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 26, color: '#102A56' }}>
                ₹{totalCourseCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Disclaimer Note */}
          <div className="pt-2 flex items-start gap-2 text-xs text-[#6a6a6a] leading-relaxed">
            <Info style={{ width: 16, height: 16, color: '#102A56', flexShrink: 0, marginTop: 2 }} />
            <p>
              This is an estimated cost based on verified annual tuition circulars. Hostel and mess expenses vary depending on room type and mess plans. Please verify the latest schedule with the official college administration.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/colleges/${selectedCollege.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                width: '100%',
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #dddddd',
                background: '#ffffff',
                color: '#222222',
                fontSize: 13,
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f7f7f7')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff')}
            >
              <span>View Verified {selectedCollege.shortName} Fee Circulars</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeCalculatorClient;
