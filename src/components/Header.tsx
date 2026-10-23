'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Scale, Compass, BookOpen, Info, Mail, Sparkles, Building2, Award, Search, User, LogOut, ChevronDown, Bookmark } from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import { useAuth } from '@/context/AuthContext';
import { QuickSearchDialog } from './QuickSearchDialog';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { selectedSlugs } = useComparison();
  const { user, logout, openLoginModal } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut
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

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Colleges', href: '/colleges', icon: Compass },
    { label: 'Compare', href: '/compare', icon: Scale, badge: selectedSlugs.length },
    { label: 'Cutoffs', href: '/cutoffs', icon: Award },
    { label: 'Simulator', href: '/counselling-simulator', icon: Sparkles },
    { label: 'Articles', href: '/blog', icon: BookOpen },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* Skip to Main Content Link for WCAG 2.2 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-700 focus:text-white focus:rounded-md focus:shadow-xl focus:font-semibold text-sm outline-none ring-2 ring-white"
      >
        Skip to main content
      </a>

      {/* Top Advisory Strip (Independent Platform & Regulatory Provenance) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="font-medium text-slate-200 truncate text-[11px] sm:text-xs">
              BanglaCampus: 100% Verified Regulatory Data (AICTE, WBJEEB, NIRF, NAAC)
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-[11px] sm:text-xs">
            <span className="text-emerald-400 font-semibold hidden md:inline">Zero Agent Commissions</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <Link
              href="/colleges/iem-kolkata"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>IEM Kolkata Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white/95 backdrop-blur-md border-b ${
          isScrolled ? 'border-slate-200 shadow-sm py-2.5' : 'border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 text-white flex items-center justify-center shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
              <span className="font-heading font-black text-xl tracking-tighter text-emerald-200">BC</span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1">
                BanglaCampus
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  WB
                </span>
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5 font-medium">
                West Bengal Engineering Discovery
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-emerald-600 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-800 rounded-lg transition-colors border border-slate-200"
              aria-label="Search colleges (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search...</span>
              <kbd className="hidden lg:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-white rounded border border-slate-300 text-slate-400">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/compare"
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-700" />
              <span>Compare</span>
              {selectedSlugs.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-600 text-white">
                  {selectedSlugs.length}/3
                </span>
              )}
            </Link>

            <Link
              href="/colleges"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Directory</span>
            </Link>

            {/* User Account / Login Button */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] uppercase font-bold">
                    {user.name.charAt(0)}
                  </span>
                  <span className="truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900 truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-500 truncate font-mono">{user.email}</div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Student Dashboard</span>
                    </Link>

                    <Link
                      href="/dashboard#saved"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Saved Colleges</span>
                    </Link>

                    {(user.role === 'counsellor' || user.role === 'admin') && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-blue-700 hover:bg-blue-50 font-semibold transition-colors"
                      >
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Counsellor Desk</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
              >
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile menu and search buttons */}
          <div className="flex md:hidden items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search colleges"
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>
            <Link
              href="/compare"
              aria-label="View comparison"
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg relative"
            >
              <Scale className="w-5 h-5 text-emerald-700" />
              {selectedSlugs.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {selectedSlugs.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                      <span>{link.label}</span>
                    </div>
                    {typeof link.badge === 'number' && link.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                        {link.badge}/3
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/colleges/iem-kolkata"
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>IEM Kolkata Acquisition Hub</span>
                </Link>
              </div>
            </nav>

            <div className="pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full py-2.5 px-3.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Search College Directory</span>
              </button>
              <Link
                href="/colleges"
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
              >
                Browse All Engineering Colleges
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Cmd+K Modal */}
      <QuickSearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
