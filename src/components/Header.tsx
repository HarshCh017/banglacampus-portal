'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Scale,
  Compass,
  BookOpen,
  Award,
  Search,
  ChevronDown,
  GraduationCap,
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import { QuickSearchDialog } from './QuickSearchDialog';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collegesDropdownOpen, setCollegesDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const pathname = usePathname();
  const { selectedSlugs } = useComparison();

  const collegesRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (collegesRef.current && !collegesRef.current.contains(e.target as Node)) {
        setCollegesDropdownOpen(false);
      }
      if (guidesRef.current && !guidesRef.current.contains(e.target as Node)) {
        setGuidesDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setCollegesDropdownOpen(false);
    setGuidesDropdownOpen(false);
    setAboutDropdownOpen(false);
  }, [pathname]);

  // Global ⌘K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-md shadow-sm transition-all duration-200 ${
          isHomePage
            ? 'bg-[#061433]/95 border-b border-white/10 text-white'
            : 'bg-white/95 border-b border-[#E2E8F0]'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#1455B8] text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-[#0E4496] transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading font-bold text-xl sm:text-2xl tracking-tight leading-none ${
                  isHomePage ? 'text-white' : 'text-[#102A56]'
                }`}
              >
                Bengal<span className={isHomePage ? 'text-[#38BDF8]' : 'text-[#1455B8]'}>Campus</span>
              </span>
              <span
                className={`text-[10px] font-medium tracking-wide ${
                  isHomePage ? 'text-slate-300' : 'text-[#64748B]'
                }`}
              >
                West Bengal Engineering Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-medium ${
              isHomePage ? 'text-white/90' : 'text-[#102A56]'
            }`}
          >
            {/* Colleges Dropdown (Fully Crawlable <Link> with SSR-ready Submenu) */}
            <div
              className="relative group"
              ref={collegesRef}
              onMouseEnter={() => setCollegesDropdownOpen(true)}
              onMouseLeave={() => setCollegesDropdownOpen(false)}
            >
              <div className="flex items-center">
                <Link
                  href="/colleges"
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    isHomePage
                      ? 'hover:text-white hover:bg-white/10'
                      : 'hover:text-[#1455B8] hover:bg-[#EAF2FF]/50'
                  } ${
                    pathname.startsWith('/colleges')
                      ? isHomePage
                        ? 'text-[#38BDF8] font-semibold bg-white/10'
                        : 'text-[#1455B8] font-semibold'
                      : ''
                  }`}
                >
                  <span>Colleges</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isHomePage ? 'text-slate-300' : 'text-[#64748B]'
                    } ${collegesDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </Link>
              </div>

              {/* Crawlable Submenu in DOM */}
              <div
                className={`absolute top-full left-0 mt-1 w-64 p-2 bg-white rounded-xl border border-[#E2E8F0] shadow-dropdown z-50 transition-all duration-150 ${
                  collegesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'
                }`}
              >
                <Link
                  href="/colleges"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#102A56] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  All 20 Engineering Colleges
                </Link>
                <Link
                  href="/colleges?type=government"
                  className="block px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  Government Colleges &amp; State Univs
                </Link>
                <Link
                  href="/colleges?type=private"
                  className="block px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  UGC-Autonomous &amp; Private Institutes
                </Link>
                <Link
                  href="/cutoffs"
                  className="block px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors border-t border-[#F1F5F9] mt-1 pt-2"
                >
                  WBJEE Historical Cutoffs Archive
                </Link>
              </div>
            </div>

            {/* WBJEE Predictor */}
            <Link
              href="/wbjee-predictor"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                isHomePage
                  ? 'hover:text-white hover:bg-white/10'
                  : 'hover:text-[#1455B8] hover:bg-[#EAF2FF]/50'
              } ${
                pathname === '/wbjee-predictor' || pathname === '/counselling-simulator'
                  ? isHomePage
                    ? 'text-[#38BDF8] font-semibold bg-white/10'
                    : 'text-[#1455B8] font-semibold bg-[#EAF2FF]/60'
                  : ''
              }`}
            >
              <span>WBJEE Predictor</span>
              <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                isHomePage
                  ? 'bg-blue-500/20 text-[#38BDF8] border border-blue-400/30'
                  : 'bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE]'
              }`}>
                Hot
              </span>
            </Link>

            {/* Compare Colleges */}
            <Link
              href="/compare"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                isHomePage
                  ? 'hover:text-white hover:bg-white/10'
                  : 'hover:text-[#1455B8] hover:bg-[#EAF2FF]/50'
              } ${
                pathname === '/compare'
                  ? isHomePage
                    ? 'text-[#38BDF8] font-semibold bg-white/10'
                    : 'text-[#1455B8] font-semibold bg-[#EAF2FF]/60'
                  : ''
              }`}
            >
              <span>Compare Colleges</span>
              {selectedSlugs.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#1455B8] text-white text-[11px] font-bold flex items-center justify-center">
                  {selectedSlugs.length}
                </span>
              )}
            </Link>

            {/* Fee Calculator */}
            <Link
              href="/fee-calculator"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isHomePage
                  ? 'hover:text-white hover:bg-white/10'
                  : 'hover:text-[#1455B8] hover:bg-[#EAF2FF]/50'
              } ${
                pathname === '/fee-calculator'
                  ? isHomePage
                    ? 'text-[#38BDF8] font-semibold bg-white/10'
                    : 'text-[#1455B8] font-semibold bg-[#EAF2FF]/60'
                  : ''
              }`}
            >
              <span>Fee Calculator</span>
            </Link>

            {/* Guides Dropdown (Fully Crawlable <Link> with SSR-ready Submenu) */}
            <div
              className="relative group"
              ref={guidesRef}
              onMouseEnter={() => setGuidesDropdownOpen(true)}
              onMouseLeave={() => setGuidesDropdownOpen(false)}
            >
              <div className="flex items-center">
                <Link
                  href="/blog"
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    isHomePage
                      ? 'hover:text-white hover:bg-white/10'
                      : 'hover:text-[#1455B8] hover:bg-[#EAF2FF]/50'
                  } ${
                    pathname.startsWith('/guides') || pathname.startsWith('/blog')
                      ? isHomePage
                        ? 'text-[#38BDF8] font-semibold bg-white/10'
                        : 'text-[#1455B8] font-semibold'
                      : ''
                  }`}
                >
                  <span>Admission Guides</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isHomePage ? 'text-slate-300' : 'text-[#64748B]'
                  } ${guidesDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              <div
                className={`absolute top-full left-0 mt-1 w-64 p-2 bg-white rounded-xl border border-[#E2E8F0] shadow-dropdown z-50 text-[#102A56] transition-all duration-150 ${
                  guidesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'
                }`}
              >
                <Link
                  href="/blog"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#102A56] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  All Admission Guides &amp; Insights
                </Link>
                <Link
                  href="/blog/wbjee-2026-counselling-choice-filling-guide"
                  className="block px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  WBJEE Choice-Filling Strategy
                </Link>
                <Link
                  href="/blog/autonomous-vs-makaut-affiliated-colleges"
                  className="block px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  Autonomous vs MAKAUT Affiliated
                </Link>
              </div>
            </div>

            {/* About Dropdown (Fully Crawlable <Link> with SSR-ready Submenu) */}
            <div
              className="relative group"
              ref={aboutRef}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <div className="flex items-center">
                <Link
                  href="/about"
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    isHomePage
                      ? 'hover:text-white hover:bg-white/10'
                      : 'hover:text-[#1455B8] hover:bg-[#EAF2FF]/50'
                  } ${
                    pathname === '/about' || pathname === '/methodology'
                      ? isHomePage
                        ? 'text-[#38BDF8] font-semibold bg-white/10'
                        : 'text-[#1455B8] font-semibold'
                      : ''
                  }`}
                >
                  <span>About</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isHomePage ? 'text-slate-300' : 'text-[#64748B]'
                  } ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              <div
                className={`absolute top-full right-0 mt-1 w-52 p-2 bg-white rounded-xl border border-[#E2E8F0] shadow-dropdown z-50 text-[#102A56] transition-all duration-150 ${
                  aboutDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'
                }`}
              >
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#102A56] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  About BengalCampus
                </Link>
                <Link
                  href="/methodology"
                  className="block px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  Data Verification Standards
                </Link>
                <Link
                  href="/counselling"
                  className="block px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1455B8] transition-colors"
                >
                  Admission Guidance Helpdesk
                </Link>
              </div>
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Pill Input Trigger (Matches mockup) */}
            {isHomePage ? (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 text-xs font-medium transition-colors cursor-pointer"
                aria-label="Search colleges (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-300" />
                <span>Search colleges, branches...</span>
              </button>
            ) : null}

            {/* Search Icon Trigger for Mobile or non-homepage */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`${
                isHomePage ? 'md:hidden bg-white/10 text-white border-white/20' : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
              } w-10 h-10 rounded-full hover:bg-[#EAF2FF] hover:text-[#1455B8] border flex items-center justify-center transition-colors cursor-pointer`}
              aria-label="Search colleges (⌘K)"
              title="Search colleges (⌘K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Primary Action Button: "Find My College" */}
            <Link
              href="/wbjee-predictor"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1455B8] hover:bg-[#0E4496] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span>Find My College</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`lg:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                isHomePage
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#102A56]'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-x-0 top-18 bg-white border-b border-[#E2E8F0] shadow-xl z-30 overflow-hidden"
          >
            <div className="p-4 sm:p-6 space-y-3 max-h-[80vh] overflow-y-auto">
              <Link
                href="/colleges"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-sm font-semibold text-[#102A56]"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#1455B8]" />
                  <span>Engineering Colleges</span>
                </div>
                <span className="text-xs text-[#64748B]">20 Colleges</span>
              </Link>

              <Link
                href="/wbjee-predictor"
                className="flex items-center justify-between p-3 rounded-xl bg-[#EAF2FF] border border-[#BFDBFE] text-sm font-semibold text-[#1455B8]"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-[#1455B8]" />
                  <span>WBJEE Predictor</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1455B8] text-white font-bold">New</span>
              </Link>

              <Link
                href="/compare"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-sm font-semibold text-[#102A56]"
              >
                <div className="flex items-center gap-3">
                  <Scale className="w-4 h-4 text-[#1455B8]" />
                  <span>Compare Colleges</span>
                </div>
                {selectedSlugs.length > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1455B8] text-white">
                    {selectedSlugs.length}
                  </span>
                )}
              </Link>

              <Link
                href="/fee-calculator"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-sm font-semibold text-[#102A56]"
              >
                <div className="flex items-center gap-3">
                  <Calculator className="w-4 h-4 text-[#1455B8]" />
                  <span>Fee Calculator</span>
                </div>
              </Link>

              <Link
                href="/guides"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-sm font-semibold text-[#102A56]"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#1455B8]" />
                  <span>Admission Guides</span>
                </div>
              </Link>

              <Link
                href="/counselling"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-sm font-semibold text-[#102A56]"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#0F8B70]" />
                  <span>Admission Guidance Desk</span>
                </div>
              </Link>

              <div className="pt-2">
                <Link
                  href="/wbjee-predictor"
                  className="w-full py-3 rounded-xl bg-[#1455B8] text-white font-bold text-center block text-sm"
                >
                  Find My College Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Quick Search Modal (⌘K) */}
      <QuickSearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
