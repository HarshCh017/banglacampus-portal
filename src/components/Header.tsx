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
      {/* Header */}
      <header
        style={{ height: '80px', borderBottom: '1px solid #dddddd' }}
        className="sticky top-0 z-40 bg-white flex items-center"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <GraduationCap
              className="w-7 h-7"
              style={{ color: '#102A56' }}
              aria-hidden="true"
            />
            <span
              className="font-extrabold text-xl tracking-tight leading-none"
              style={{ color: '#102A56' }}
            >
              Bengal<span style={{ fontWeight: 800 }}>Campus</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label, matchFn, hasCompareCount }) => {
              const isActive = matchFn(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative flex items-center gap-1.5 px-4 py-2 transition-colors duration-150"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#222222',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    style={{
                      borderBottom: isActive ? '2px solid #102A56' : '2px solid transparent',
                      paddingBottom: '2px',
                      color: isActive ? '#102A56' : '#222222',
                    }}
                  >
                    {label}
                  </span>
                  {hasCompareCount && selectedSlugs.length > 0 && (
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-white text-[11px] font-bold"
                      style={{ background: '#102A56' }}
                    >
                      {selectedSlugs.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search pill — desktop */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150 cursor-pointer"
              style={{
                borderRadius: '9999px',
                border: '1px solid #dddddd',
                background: '#ffffff',
                color: '#6a6a6a',
                fontWeight: 500,
              }}
              aria-label="Search colleges (⌘K)"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span>Search</span>
              <kbd
                className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: '#f5f5f5', border: '1px solid #dddddd', color: '#999' }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Search icon — mobile */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer transition-colors duration-150"
              style={{
                borderRadius: '9999px',
                border: '1px solid #dddddd',
                background: '#ffffff',
                color: '#6a6a6a',
              }}
              aria-label="Search colleges"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* CTA: Predict College */}
            <Link
              href="/wbjee-predictor"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-bold text-white transition-colors duration-150"
              style={{
                borderRadius: '9999px',
                background: '#102A56',
              }}
            >
              Predict College
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 cursor-pointer transition-colors duration-150"
              style={{
                borderRadius: '9999px',
                border: '1px solid #dddddd',
                background: '#ffffff',
                color: '#222222',
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
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
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
            {/* Header / Drag handle row */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-[#eeeeee]">
              <span className="font-extrabold text-base" style={{ color: '#102A56' }}>
                BengalCampus Navigation
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#6a6a6a] cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-2" aria-label="Mobile navigation">
              {MOBILE_NAV_LINKS.map(({ href, label, icon: Icon, hasCompareCount }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl transition-colors duration-150"
                    style={{
                      background: isActive ? '#EAF2FF' : '#fafafa',
                      border: `1px solid ${isActive ? '#BFDBFE' : '#eeeeee'}`,
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
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-colors duration-150 cursor-pointer"
                style={{
                  background: '#fafafa',
                  border: '1px solid #eeeeee',
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
                  className="block w-full text-center py-3.5 text-white font-bold text-sm rounded-2xl transition-colors duration-150"
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
