'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, GraduationCap, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Programs', href: '/courses' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Fees & Loans', href: '/admissions/fees' },
    { label: 'IEMJEE 2027', href: '/iemjee' },
    { label: 'Placements', href: '/placements' },
    { label: 'Campus', href: '/campus' },
  ];

  const handleHelplineClick = (location: string) => {
    trackEvent('counsellor_contact_clicked', { source_cta_id: `header-helpline-${location}` });
  };

  return (
    <>
      {/* Top Advisory Strip (Institutional Identity & Verification) */}
      <div className="bg-navy-950 text-slate-300 text-xs py-1.5 px-3 sm:px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-medium text-slate-200 truncate text-[11px] sm:text-xs">
              <span className="inline md:hidden">IEM Kolkata</span>
              <span className="hidden md:inline">Institute of Engineering & Management (IEM), Kolkata</span>
            </span>
            <span className="hidden md:inline text-slate-400 shrink-0">| Autonomous under MAKAUT · AICTE Approved</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-[11px] sm:text-xs">
            <a
              href="#lead-form"
              onClick={() => handleHelplineClick('top-bar')}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="hidden md:inline">Admissions Desk (Ashram Campus)</span>
              <span className="inline md:hidden">Admissions Desk</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">Sector V, Salt Lake</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5 sm:py-3'
            : 'bg-white border-b border-slate-200 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-navy-900 text-white flex items-center justify-center font-heading font-extrabold text-base sm:text-lg shadow-sm group-hover:bg-brandBlue-600 transition-colors shrink-0">
              IEM
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-slate-900 text-sm sm:text-base leading-tight tracking-tight">
                I.E.M. Kolkata
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight truncate max-w-[170px] xs:max-w-[200px] sm:max-w-[240px] md:max-w-none">
                B.Tech Admission Guidance 2027
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-brandBlue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs - Visible on Tablet and Desktop */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="#lead-form"
              onClick={() => handleHelplineClick('desktop-nav')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-navy-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brandBlue-600" />
              <span>Request Callback</span>
            </a>

            <a
              href="#lead-form"
              className="px-3.5 py-2 text-xs font-bold text-white bg-brandBlue-600 hover:bg-brandBlue-500 rounded-md shadow-sm transition-all focus:ring-2 focus:ring-brandBlue-600 focus:outline-none"
            >
              Get Guidance
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-navy-900 hover:bg-slate-100 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition-transform shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 active:bg-slate-100 hover:text-brandBlue-600 min-h-[44px]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="#lead-form"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleHelplineClick('mobile-menu');
                }}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-lg bg-slate-100 active:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-brandBlue-600" />
                <span>Admissions Desk: Request Callback</span>
              </a>
              <a
                href="#lead-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-3 px-4 rounded-lg bg-brandBlue-600 active:bg-brandBlue-700 text-white font-bold text-xs text-center shadow-sm flex items-center justify-center transition-colors"
              >
                <span>Get B.Tech Admission Guidance</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
