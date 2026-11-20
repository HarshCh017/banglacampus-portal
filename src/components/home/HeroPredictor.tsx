'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight } from 'lucide-react';

export function HeroPredictor() {
  const router = useRouter();
  const [rank, setRank] = useState<string>('');
  const [category, setCategory] = useState<string>('General');
  const [branch, setBranch] = useState<string>('All Branches');

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRank = rank.replace(/[^0-9]/g, '');
    const queryParams = new URLSearchParams();
    if (cleanRank) queryParams.set('rank', cleanRank);
    if (category) queryParams.set('category', category);
    if (branch && branch !== 'All Branches') queryParams.set('branch', branch);
    router.push(`/wbjee-predictor?${queryParams.toString()}`);
  };

  const showcaseColleges = [
    {
      name: 'Jadavpur University',
      short: 'JU Faculty of Engg.',
      city: 'Kolkata',
      code: '101',
      type: 'State University',
      cutoff: 'CSE Closing: ~260 GMR',
      fees: '₹10,000 / 4-yr total',
      image: '/images/colleges/jadavpur-university-engineering-2.jpg',
      href: '/colleges/jadavpur-university-engineering',
    },
    {
      name: 'IEM Kolkata',
      short: 'IEM Salt Lake',
      city: 'Salt Lake, Kolkata',
      code: '104',
      type: 'Autonomous Private',
      cutoff: 'CSE Closing: ~2,480 GMR',
      fees: '₹1.80L – ₹2.36L / yr',
      image: '/images/colleges/iem-kolkata.jpg',
      href: '/colleges/iem-kolkata',
    },
    {
      name: 'Heritage Institute (HITK)',
      short: 'Heritage Kolkata',
      city: 'Anandapur, Kolkata',
      code: '108',
      type: 'Autonomous Private',
      cutoff: 'CSE Closing: ~4,200 GMR',
      fees: '₹1.60L – ₹2.10L / yr',
      image: '/images/colleges/heritage-institute-of-technology.jpg',
      href: '/colleges/heritage-institute-of-technology',
    },
  ];

  return (
    <section
      style={{ backgroundColor: '#ffffff' }}
      className="w-full pt-12 sm:pt-16 pb-12 sm:pb-16"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline block */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1
            style={{ fontSize: '28px', fontWeight: 700, color: '#102A56', lineHeight: 1.3 }}
            className="mb-3"
          >
            Find Your Best Engineering College in West Bengal
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 400, color: '#6a6a6a', lineHeight: 1.6 }}>
            Compare verified WBJEE institutions. Explore closing ranks, fees, and NIRF data — free, no commission.
          </p>
        </div>

        {/* Pill search bar — desktop */}
        <div className="max-w-3xl mx-auto mb-5">
          <form
            onSubmit={handlePredict}
            style={{
              height: '64px',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              border: '1px solid #dddddd',
              boxShadow:
                'rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px',
            }}
            className="hidden sm:flex items-center overflow-hidden transition-shadow hover:shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.06)_0_2px_8px,rgba(0,0,0,0.14)_0_6px_14px]"
          >
            {/* Segment 1: Rank */}
            <div className="flex-1 px-6 py-2 flex flex-col justify-center min-w-0">
              <label
                htmlFor="hero-rank"
                style={{ fontSize: '11px', fontWeight: 700, color: '#6a6a6a', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                className="block mb-0.5"
              >
                WBJEE Rank
              </label>
              <input
                id="hero-rank"
                type="text"
                placeholder="e.g. 2,450"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                style={{ fontSize: '14px', fontWeight: 600, color: '#102A56' }}
                className="w-full bg-transparent placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', backgroundColor: '#dddddd', flexShrink: 0 }} />

            {/* Segment 2: Category */}
            <div className="flex-1 px-6 py-2 flex flex-col justify-center min-w-0">
              <label
                htmlFor="hero-category"
                style={{ fontSize: '11px', fontWeight: 700, color: '#6a6a6a', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                className="block mb-0.5"
              >
                Category
              </label>
              <select
                id="hero-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ fontSize: '14px', fontWeight: 600, color: '#102A56' }}
                className="w-full bg-transparent focus:outline-none cursor-pointer appearance-none"
              >
                <option value="General">General / Open</option>
                <option value="TFW">TFW (Tuition Fee Waiver)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="OBC-A">OBC-A</option>
                <option value="OBC-B">OBC-B</option>
              </select>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', backgroundColor: '#dddddd', flexShrink: 0 }} />

            {/* Segment 3: Branch */}
            <div className="flex-1 px-6 py-2 flex flex-col justify-center min-w-0">
              <label
                htmlFor="hero-branch"
                style={{ fontSize: '11px', fontWeight: 700, color: '#6a6a6a', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                className="block mb-0.5"
              >
                Branch
              </label>
              <select
                id="hero-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                style={{ fontSize: '14px', fontWeight: 600, color: '#102A56' }}
                className="w-full bg-transparent focus:outline-none cursor-pointer appearance-none"
              >
                <option value="All Branches">All Branches</option>
                <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                <option value="Information Technology (IT)">Information Technology (IT)</option>
                <option value="Electronics & Communication (ECE)">Electronics &amp; Comm. (ECE)</option>
                <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
                <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
              </select>
            </div>

            {/* CTA Orb */}
            <div className="pr-2">
              <button
                type="submit"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '9999px',
                  backgroundColor: '#102A56',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: 'none',
                  cursor: 'pointer',
                }}
                className="hover:bg-[#0E3A70] active:scale-95 transition-all"
                aria-label="Predict College Matches"
              >
                <Search style={{ width: '20px', height: '20px', color: '#ffffff' }} />
              </button>
            </div>
          </form>

          {/* Mobile stacked form */}
          <form
            onSubmit={handlePredict}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #dddddd',
              borderRadius: '16px',
              boxShadow: 'rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.08) 0 4px 12px',
            }}
            className="flex sm:hidden flex-col gap-0 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-[#dddddd]">
              <label
                htmlFor="hero-rank-m"
                style={{ fontSize: '11px', fontWeight: 700, color: '#6a6a6a', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                className="block mb-1"
              >
                WBJEE Rank
              </label>
              <input
                id="hero-rank-m"
                type="text"
                placeholder="e.g. 2,450"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                style={{ fontSize: '15px', fontWeight: 600, color: '#102A56', width: '100%' }}
                className="bg-transparent placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <div className="px-5 py-4 border-b border-[#dddddd]">
              <label
                htmlFor="hero-category-m"
                style={{ fontSize: '11px', fontWeight: 700, color: '#6a6a6a', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                className="block mb-1"
              >
                Category
              </label>
              <select
                id="hero-category-m"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ fontSize: '15px', fontWeight: 600, color: '#102A56', width: '100%' }}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="General">General / Open</option>
                <option value="TFW">TFW (Tuition Fee Waiver)</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC-A">OBC-A</option>
                <option value="OBC-B">OBC-B</option>
              </select>
            </div>
            <div className="px-5 py-4 border-b border-[#dddddd]">
              <label
                htmlFor="hero-branch-m"
                style={{ fontSize: '11px', fontWeight: 700, color: '#6a6a6a', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                className="block mb-1"
              >
                Branch
              </label>
              <select
                id="hero-branch-m"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                style={{ fontSize: '15px', fontWeight: 600, color: '#102A56', width: '100%' }}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="All Branches">All Branches</option>
                <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                <option value="Information Technology (IT)">Information Technology (IT)</option>
                <option value="Electronics & Communication (ECE)">Electronics &amp; Comm. (ECE)</option>
                <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
                <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
              </select>
            </div>
            <div className="px-4 py-4">
              <button
                type="submit"
                style={{
                  width: '100%',
                  height: '52px',
                  borderRadius: '9999px',
                  backgroundColor: '#102A56',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                className="hover:bg-[#0E3A70] active:scale-[0.98] transition-all"
              >
                <Search style={{ width: '18px', height: '18px' }} />
                Predict Matches
              </button>
            </div>
          </form>
        </div>

        {/* Quick-search chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#6a6a6a' }}>Popular:</span>
          {[
            { label: 'Jadavpur University', href: '/colleges/jadavpur-university-engineering' },
            { label: 'IEM Kolkata', href: '/colleges/iem-kolkata' },
            { label: 'Heritage (HITK)', href: '/colleges/heritage-institute-of-technology' },
            { label: 'Government Colleges', href: '/colleges?type=government' },
          ].map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              style={{
                borderRadius: '9999px',
                border: '1px solid #dddddd',
                padding: '5px 14px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#222222',
                backgroundColor: '#ffffff',
                textDecoration: 'none',
                transition: 'background-color 0.15s',
              }}
              className="hover:bg-gray-50 transition-colors"
            >
              {chip.label}
            </Link>
          ))}
          <Link
            href="/cutoffs"
            style={{
              borderRadius: '9999px',
              border: '1px solid #BFDBFE',
              padding: '5px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#1455B8',
              backgroundColor: '#EAF2FF',
              textDecoration: 'none',
            }}
            className="hover:bg-blue-100 transition-colors"
          >
            WBJEE Cutoffs 2027 →
          </Link>
        </div>

        {/* Campus photo strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {showcaseColleges.map((col, idx) => (
            <Link
              key={idx}
              href={col.href}
              style={{ borderRadius: '14px', overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', border: '1px solid #dddddd' }}
              className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
            >
              {/* Photo */}
              <div style={{ position: 'relative', width: '100%', height: '176px', backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)' }} />

                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.95)', color: '#374151', border: '1px solid #e5e7eb' }}>
                    {col.type}
                  </span>
                </div>

                <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin style={{ width: '14px', height: '14px', color: '#93c5fd' }} />
                    {col.city}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'monospace', color: '#fcd34d' }}>
                    WBJEE #{col.code}
                  </span>
                </div>
              </div>

              {/* Card meta */}
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#102A56', lineHeight: 1.3, margin: 0 }} className="group-hover:text-[#1455B8] transition-colors">
                    {col.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{col.cutoff}</p>
                </div>

                <div style={{ paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{col.fees}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1455B8', display: 'flex', alignItems: 'center', gap: '4px' }} className="group-hover:translate-x-0.5 transition-transform">
                    View Profile <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HeroPredictor;
