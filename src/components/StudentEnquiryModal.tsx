'use client';

import React, { useState, useEffect, useRef, useId, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';
import { INDIAN_STATES_AND_UTS } from '@/data/indianStates';
import { ENQUIRY_CONFIG } from '@/config/enquiry';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building2,
  ChevronDown,
  Loader2,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export function StudentEnquiryModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Auto-detect current college from route (e.g., /colleges/jadavpur-university-engineering)
  const currentCollegeFromRoute = useMemo(() => {
    if (!pathname) return null;
    const match = pathname.match(/\/colleges\/([^/?#]+)/);
    if (match && match[1]) {
      return getCollegeBySlug(match[1]) || null;
    }
    return null;
  }, [pathname]);

  // Form Fields State (Fields 1 to 6 in specified order)
  const [fullName, setFullName] = useState('');
  const [class10Percentage, setClass10Percentage] = useState('');
  const [class12Percentage, setClass12Percentage] = useState('');
  const [state, setState] = useState('West Bengal'); // Default to home state for high UX, easily searchable
  const [preferredCollege, setPreferredCollege] = useState('');
  const [preferredBranch, setPreferredBranch] = useState('');
  const [consent, setConsent] = useState(false);
  const [hpField, setHpField] = useState(''); // Bot honeypot

  // Search filter states for dropdowns
  const [collegeSearch, setCollegeSearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

  // Form session idempotency key
  const [idempotencyKey, setIdempotencyKey] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Initialize or update preferred college when route changes
  useEffect(() => {
    if (currentCollegeFromRoute) {
      setPreferredCollege(currentCollegeFromRoute.slug);
      setPreferredBranch(''); // Clear previous branch when route college switches
    }
  }, [currentCollegeFromRoute]);

  // Generate idempotency key on mount
  useEffect(() => {
    setIdempotencyKey(`idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  // 5-Second Trigger Timer logic respecting dismissal policy
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if session has already successfully submitted
    const isSubmitted = sessionStorage.getItem(ENQUIRY_CONFIG.STORAGE_KEYS.SUBMITTED_FLAG);
    if (isSubmitted === 'true') {
      return;
    }

    // Check dismissal policy
    const dismissedRoutesRaw = sessionStorage.getItem(ENQUIRY_CONFIG.STORAGE_KEYS.DISMISSED_ROUTES);
    const dismissedRoutes: string[] = dismissedRoutesRaw ? JSON.parse(dismissedRoutesRaw) : [];

    if (ENQUIRY_CONFIG.DISMISSAL_POLICY === 'session_wide' && dismissedRoutes.length > 0) {
      return;
    }

    if (ENQUIRY_CONFIG.DISMISSAL_POLICY === 'per_route' && dismissedRoutes.includes(pathname || '')) {
      return;
    }

    // Timer: wait exactly 5000ms
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, ENQUIRY_CONFIG.TRIGGER_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  // Support manual opening on button click via custom event
  useEffect(() => {
    const handleOpen = () => {
      setSubmitSuccess(false);
      setGeneralError(null);
      setIsOpen(true);
    };
    window.addEventListener('banglacampus:open-enquiry', handleOpen);
    return () => window.removeEventListener('banglacampus:open-enquiry', handleOpen);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && pathname) {
      const dismissedRaw = sessionStorage.getItem(ENQUIRY_CONFIG.STORAGE_KEYS.DISMISSED_ROUTES);
      const dismissedList: string[] = dismissedRaw ? JSON.parse(dismissedRaw) : [];
      if (!dismissedList.includes(pathname)) {
        dismissedList.push(pathname);
        sessionStorage.setItem(
          ENQUIRY_CONFIG.STORAGE_KEYS.DISMISSED_ROUTES,
          JSON.stringify(dismissedList)
        );
      }
    }
  }, [pathname]);

  // Handle Escape key and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleDismiss]);

  // Selected college object
  const selectedCollegeObj = useMemo(() => {
    return (
      getCollegeBySlug(preferredCollege) ||
      VERIFIED_COLLEGES.find((c) => c.id === preferredCollege) ||
      null
    );
  }, [preferredCollege]);

  // Available branches dynamically computed for selected college
  const availableBranches = useMemo(() => {
    if (!selectedCollegeObj) return [];
    return selectedCollegeObj.programs || [];
  }, [selectedCollegeObj]);

  // Filtered colleges for searchable dropdown
  const filteredColleges = useMemo(() => {
    const query = collegeSearch.trim().toLowerCase();
    if (!query) return VERIFIED_COLLEGES;
    return VERIFIED_COLLEGES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.shortName.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.wbjeebCode.includes(query)
    );
  }, [collegeSearch]);

  // Filtered states for searchable dropdown
  const filteredStates = useMemo(() => {
    const query = stateSearch.trim().toLowerCase();
    if (!query) return INDIAN_STATES_AND_UTS;
    return INDIAN_STATES_AND_UTS.filter((s) => s.name.toLowerCase().includes(query));
  }, [stateSearch]);

  const handleCollegeSelect = (slug: string) => {
    setPreferredCollege(slug);
    setPreferredBranch(''); // Clear incompatible previous branch selection
    setIsCollegeDropdownOpen(false);
    setCollegeSearch('');
    // Clear field error
    setFieldErrors((prev) => ({ ...prev, preferredCollege: '' }));
  };

  const handleStateSelect = (stateName: string) => {
    setState(stateName);
    setIsStateDropdownOpen(false);
    setStateSearch('');
    setFieldErrors((prev) => ({ ...prev, state: '' }));
  };

  // Client-Side Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'Full Name must be at least 2 characters.';
    }

    const c10 = parseFloat(class10Percentage);
    if (!class10Percentage || isNaN(c10)) {
      errors.class10Percentage = 'Class 10 percentage is required.';
    } else if (c10 < 0 || c10 > 100) {
      errors.class10Percentage = 'Percentage must be between 0 and 100.';
    }

    const c12 = parseFloat(class12Percentage);
    if (!class12Percentage || isNaN(c12)) {
      errors.class12Percentage = 'Class 12 percentage is required.';
    } else if (c12 < 0 || c12 > 100) {
      errors.class12Percentage = 'Percentage must be between 0 and 100.';
    }

    if (!state.trim()) {
      errors.state = 'Please select your State / Union Territory.';
    }

    if (!preferredCollege) {
      errors.preferredCollege = 'Please select a preferred engineering college.';
    }

    if (!preferredBranch) {
      errors.preferredBranch = 'Please select your preferred engineering branch.';
    }

    if (!consent) {
      errors.consent = 'You must agree to the privacy policy to submit.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        class10Percentage: parseFloat(class10Percentage),
        class12Percentage: parseFloat(class12Percentage),
        state: state.trim(),
        preferredCollege,
        preferredBranch,
        consent,
        hp_field: hpField,
        sourceUrl: typeof window !== 'undefined' ? window.location.href : pathname,
        idempotencyKey,
      };

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors) {
          const mapped: Record<string, string> = {};
          Object.entries(data.errors).forEach(([k, v]: [string, any]) => {
            mapped[k] = Array.isArray(v) ? v[0] : String(v);
          });
          setFieldErrors(mapped);
        }
        throw new Error(data?.message || 'Failed to submit enquiry. Please try again.');
      }

      // Success confirmed by server
      setSubmissionId(data.submissionId);
      setSubmitSuccess(true);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(ENQUIRY_CONFIG.STORAGE_KEYS.SUBMITTED_FLAG, 'true');
      }
    } catch (err: any) {
      setGeneralError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-12 border border-slate-100"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleDismiss}
          aria-label="Close enquiry popup"
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-slate-100 rounded-full transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Educational Context & Trust (Desktop 5 cols, Hidden on small mobile or stacked) */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>BanglaCampus Admission Guidance</span>
            </div>

            <h2 id={titleId} className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Find the Right Engineering College for You
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Tell us a little about your academic background and preferences to help us understand which colleges and branches interest you.
            </p>

            {/* If on a college page or college selected, showcase institution preview */}
            {selectedCollegeObj ? (
              <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Selected Institution</span>
                </div>
                <div className="text-sm font-bold text-white leading-snug">
                  {selectedCollegeObj.name}
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <span>Code: {selectedCollegeObj.wbjeebCode}</span>
                  <span>·</span>
                  <span>{selectedCollegeObj.district}</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Personalized Counselling Matching</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Compare government and autonomous institutions, check fee waivers (TFW), and receive accurate WBJEE cutoff updates.
                </p>
              </div>
            )}
          </div>

          {/* Trust badges footer in left column */}
          <div className="relative z-10 pt-6 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Free · Zero Agent Surcharges</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct WBJEEB &amp; AICTE Provenance</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The 6 Form Fields (Desktop 7 cols, Vertically scrollable) */}
        <div className="md:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[85vh] bg-white">
          {submitSuccess ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Preferences Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                Thank you! Your preferences have been submitted successfully.
              </p>
              {submissionId && (
                <div className="px-4 py-2 bg-slate-100 rounded-xl font-mono text-xs text-slate-700 font-bold border border-slate-200">
                  Submission ID: {submissionId}
                </div>
              )}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  Continue Browsing Colleges
                </button>
              </div>
            </div>
          ) : (
            /* ENQUIRY FORM */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {generalError && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{generalError}</p>
                    <p className="mt-0.5 text-amber-800">
                      We couldn&apos;t submit your information right now. Your entries are still here. Please try again.
                    </p>
                  </div>
                </div>
              )}

              {/* Bot Honeypot */}
              <input
                type="text"
                name="hp_field"
                value={hpField}
                onChange={(e) => setHpField(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              {/* FIELD 1: Student Name */}
              <div>
                <label htmlFor="enquiry-fullName" className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="enquiry-fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="e.g. Suman Mukherjee"
                  maxLength={80}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.fullName
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* PERCENTAGES ROW: Fields 2 & 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* FIELD 2: Class 10 Percentage */}
                <div>
                  <label htmlFor="enquiry-class10" className="block text-xs font-bold text-slate-700 mb-1">
                    Class 10 Percentage <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-class10"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={class10Percentage}
                      onChange={(e) => {
                        setClass10Percentage(e.target.value);
                        if (fieldErrors.class10Percentage)
                          setFieldErrors((prev) => ({ ...prev, class10Percentage: '' }));
                      }}
                      placeholder="e.g. 88.5"
                      className={`w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-mono ${
                        fieldErrors.class10Percentage
                          ? 'border-rose-400 focus:ring-rose-400'
                          : 'border-slate-200 focus:ring-emerald-500'
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      %
                    </span>
                  </div>
                  {fieldErrors.class10Percentage && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.class10Percentage}</p>
                  )}
                </div>

                {/* FIELD 3: Class 12 Percentage */}
                <div>
                  <label htmlFor="enquiry-class12" className="block text-xs font-bold text-slate-700 mb-1">
                    Class 12 Percentage <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-class12"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={class12Percentage}
                      onChange={(e) => {
                        setClass12Percentage(e.target.value);
                        if (fieldErrors.class12Percentage)
                          setFieldErrors((prev) => ({ ...prev, class12Percentage: '' }));
                      }}
                      placeholder="e.g. 84.0"
                      className={`w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-mono ${
                        fieldErrors.class12Percentage
                          ? 'border-rose-400 focus:ring-rose-400'
                          : 'border-slate-200 focus:ring-emerald-500'
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      %
                    </span>
                  </div>
                  {fieldErrors.class12Percentage && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.class12Percentage}</p>
                  )}
                </div>
              </div>

              {/* FIELD 4: State / Union Territory (Searchable Dropdown) */}
              <div className="relative">
                <label htmlFor="enquiry-state" className="block text-xs font-bold text-slate-700 mb-1">
                  State / Union Territory <span className="text-rose-500">*</span>
                </label>
                <button
                  id="enquiry-state"
                  type="button"
                  onClick={() => setIsStateDropdownOpen((prev) => !prev)}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-left flex items-center justify-between transition-all ${
                    fieldErrors.state
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                >
                  <span className="text-slate-900 font-medium">{state || 'Select State / UT'}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {isStateDropdownOpen && (
                  <div className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 max-h-48 overflow-y-auto">
                    <input
                      type="text"
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      placeholder="Search state..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="pt-1 divide-y divide-slate-100">
                      {filteredStates.map((s) => (
                        <button
                          key={s.code}
                          type="button"
                          onClick={() => handleStateSelect(s.name)}
                          className={`w-full px-2.5 py-1.5 text-left text-xs rounded-lg flex items-center justify-between hover:bg-emerald-50 hover:text-emerald-900 transition-colors ${
                            state === s.name ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                          }`}
                        >
                          <span>{s.name}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono">{s.type === 'Union Territory' ? 'UT' : 'State'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {fieldErrors.state && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.state}</p>
                )}
              </div>

              {/* FIELD 5: Preferred College (Searchable Dropdown) */}
              <div className="relative">
                <label htmlFor="enquiry-college" className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred College <span className="text-rose-500">*</span>
                </label>
                <button
                  id="enquiry-college"
                  type="button"
                  onClick={() => setIsCollegeDropdownOpen((prev) => !prev)}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-left flex items-center justify-between transition-all ${
                    fieldErrors.preferredCollege
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                >
                  <span className={selectedCollegeObj ? 'text-slate-900 font-semibold' : 'text-slate-400'}>
                    {selectedCollegeObj ? `${selectedCollegeObj.name} (${selectedCollegeObj.shortName})` : 'Search and select a college'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {isCollegeDropdownOpen && (
                  <div className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 max-h-52 overflow-y-auto">
                    <input
                      type="text"
                      value={collegeSearch}
                      onChange={(e) => setCollegeSearch(e.target.value)}
                      placeholder="Type college name, code, or city..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="pt-1 divide-y divide-slate-100">
                      {filteredColleges.map((c) => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => handleCollegeSelect(c.slug)}
                          className={`w-full px-2.5 py-2 text-left text-xs rounded-lg hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex flex-col gap-0.5 ${
                            preferredCollege === c.slug ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                          }`}
                        >
                          <div className="font-semibold text-slate-900">{c.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>Code: {c.wbjeebCode}</span>
                            <span>·</span>
                            <span>{c.city}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {fieldErrors.preferredCollege && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.preferredCollege}</p>
                )}
              </div>

              {/* FIELD 6: Choice of Branch (Dynamic based on selected college) */}
              <div>
                <label htmlFor="enquiry-branch" className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Engineering Branch <span className="text-rose-500">*</span>
                </label>
                <select
                  id="enquiry-branch"
                  value={preferredBranch}
                  disabled={!selectedCollegeObj || availableBranches.length === 0}
                  onChange={(e) => {
                    setPreferredBranch(e.target.value);
                    if (fieldErrors.preferredBranch)
                      setFieldErrors((prev) => ({ ...prev, preferredBranch: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.preferredBranch
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-slate-200 focus:ring-emerald-500'
                  } ${!selectedCollegeObj ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <option value="">
                    {!selectedCollegeObj
                      ? '← Select a college first to view verified branches'
                      : 'Select engineering branch'}
                  </option>
                  {availableBranches.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} {b.nbaAccredited ? ' (NBA Accredited)' : ''}
                    </option>
                  ))}
                </select>
                {fieldErrors.preferredBranch && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.preferredBranch}</p>
                )}
              </div>

              {/* Consent & Privacy Notice */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (fieldErrors.consent) setFieldErrors((prev) => ({ ...prev, consent: '' }));
                    }}
                    className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to the{' '}
                    <Link href="/privacy-policy" target="_blank" className="text-emerald-700 underline font-medium hover:text-emerald-800">
                      Privacy Policy
                    </Link>{' '}
                    and authorize BanglaCampus to record my college preferences for official admission guidance.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.consent}</p>
                )}
              </div>

              {/* ACTIONS: Primary & Secondary */}
              <div className="pt-3 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Preferences...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit My Preferences</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full sm:w-auto py-3 px-5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-semibold text-sm rounded-xl transition-colors text-center"
                >
                  Not Now
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
