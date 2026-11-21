'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, GraduationCap, Scale, BookOpen, Compass } from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import { QuickSearchDialog } from './QuickSearchDialog';

const NAV_LINKS = [
  { href: '/colleges', label: 'Colleges', matchFn: (p: string) => p.startsWith('/colleges') },
  { href: '/wbjee-predictor', label: 'WBJEE Predictor', matchFn: (p: string) => p === '/wbjee-predictor' || p === '/counselling-simulator' },
  { href: '/compare', label: 'Compare', matchFn: (p: string) => p === '/compare', hasCompareCount: true },
  { href: '/guides', label: 'Guides', matchFn: (p: string) => p.startsWith('/guides') },
];

const MOBILE_NAV_LINKS = [
  { href: '/colleges', label: 'Colleges', icon: Compass },
  { href: '/wbjee-predictor', label: 'WBJEE Predictor', icon: GraduationCap },
  { href: '/compare', label: 'Compare Colleges', icon: Scale, hasCompareCount: true },
  { href: '/guides', label: 'Guides', icon: BookOpen },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { selectedSlugs } = useComparison();

  // Close mobile drawer on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

  return (
    <>
      {/* Header — Deep Navy #102A56 per DESIGN.md & AGENTS.md Brand Standard */}
      <header
        style={{
          height: '80px',
          backgroundColor: '#102A56',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 2px 12px rgba(16, 42, 86, 0.25)',
        }}
        className="sticky top-0 z-40 flex items-center transition-colors"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/20"
            >
              <GraduationCap
                className="w-6 h-6 text-[#F4B740] transition-transform group-hover:scale-105"
                aria-hidden="true"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight leading-none text-white">
              Bengal<span className="text-[#60A5FA]">Campus</span>
            </span>
          </Link>

          {/* Desktop Nav Pills */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label, matchFn, hasCompareCount }) => {
              const isActive = matchFn(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-white/15 text-white font-bold shadow-xs'
                      : 'text-slate-200 hover:text-white hover:bg-white/10 font-medium'
                  }`}
                >
                  <span>{label}</span>
                  {hasCompareCount && selectedSlugs.length > 0 && (
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-white text-[11px] font-bold shadow-xs"
                      style={{ background: '#2563EB' }}
                    >
                      {selectedSlugs.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search pill — desktop */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm rounded-full cursor-pointer transition-all duration-150 text-white/90 hover:text-white"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
              aria-label="Search colleges (⌘K)"
            >
              <Search className="w-4 h-4 text-white/80" aria-hidden="true" />
              <span className="font-medium text-xs">Search colleges</span>
              <kbd
                className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Search icon button — mobile */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer rounded-full transition-colors text-white"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
              aria-label="Search colleges"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* CTA: Predict College */}
            <Link
              href="/wbjee-predictor"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-bold text-[#102A56] rounded-full shadow-sm hover:bg-slate-100 active:scale-95 transition-all duration-150"
              style={{
                backgroundColor: '#ffffff',
              }}
            >
              Predict College
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 cursor-pointer rounded-full transition-colors text-white"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom-sheet drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer — slides up from bottom */}
          <div
            className="fixed inset-x-0 bottom-0 bg-white shadow-2xl transition-transform duration-200 ease-out max-h-[85vh] overflow-y-auto z-10"
            style={{
              borderRadius: '20px 20px 0 0',
              borderTop: '1px solid #dddddd',
            }}
          >
            {/* Header / Title row */}
            <div
              style={{ backgroundColor: '#102A56', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
              className="flex items-center justify-between px-5 py-4 text-white"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#F4B740]" />
                <span className="font-extrabold text-base tracking-tight text-white">
                  Bengal<span className="text-[#60A5FA]">Campus</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-2 bg-[#FAFBFD]" aria-label="Mobile navigation">
              {MOBILE_NAV_LINKS.map(({ href, label, icon: Icon, hasCompareCount }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl transition-all duration-150"
                    style={{
                      background: isActive ? '#EAF2FF' : '#ffffff',
                      border: `1px solid ${isActive ? '#BFDBFE' : '#dddddd'}`,
                      color: isActive ? '#102A56' : '#222222',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className="w-4 h-4"
                        style={{ color: isActive ? '#1455B8' : '#6a6a6a' }}
                        aria-hidden="true"
                      />
                      <span>{label}</span>
                    </div>
                    {hasCompareCount && selectedSlugs.length > 0 && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: '#102A56' }}
                      >
                        {selectedSlugs.length}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-colors duration-150 cursor-pointer bg-white"
                style={{
                  border: '1px solid #dddddd',
                  color: '#222222',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                <Search className="w-4 h-4 text-[#6a6a6a]" />
                <span>Search Colleges & Degrees</span>
              </button>

              {/* CTA */}
              <div className="pt-3">
                <Link
                  href="/wbjee-predictor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3.5 text-white font-bold text-sm rounded-2xl transition-colors duration-150 shadow-sm"
                  style={{ background: '#102A56' }}
                >
                  Predict My College
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Global Quick Search Modal (⌘K) */}
      <QuickSearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Header;
