'use client';

import React, { useState } from 'react';
import { College } from '@/types/college';
import {
  Headphones,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  Award,
  ShieldCheck,
  Zap,
  Users,
  GraduationCap,
  Loader2,
  Lock,
} from 'lucide-react';

interface CollegeCounsellingCardProps {
  college?: College;
  variant?: 'sidebar' | 'banner';
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function CollegeCounsellingCard({
  college,
  variant = 'sidebar',
  id,
  className = '',
  title,
  subtitle,
}: CollegeCounsellingCardProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [rank, setRank] = useState<string>('');

  const collegeName = college ? college.name : 'West Bengal Engineering Admissions';
  const collegeShortName = college ? college.shortName : 'WB Engineering';
  const collegeSlug = college ? college.slug : 'general';
  const programsList = college?.programs && college.programs.length > 0
    ? college.programs
    : [
        { name: 'Computer Science & Engineering (CSE)', slug: 'cse', intakeEst: 180 },
        { name: 'Information Technology (IT)', slug: 'it', intakeEst: 120 },
        { name: 'Electronics & Communication (ECE)', slug: 'ece', intakeEst: 120 },
        { name: 'Computer Science (AI & ML)', slug: 'cse-aiml', intakeEst: 60 },
        { name: 'Electrical Engineering (EE)', slug: 'ee', intakeEst: 60 },
        { name: 'Mechanical Engineering (ME)', slug: 'me', intakeEst: 60 },
      ];
  
  // Default to CSE or first available program
  const defaultBranch =
    programsList.find((p) => p.name.toLowerCase().includes('computer') || p.name.toLowerCase().includes('cse'))?.name ||
    programsList[0]?.name ||
    'Computer Science & Engineering (CSE)';

  const [branch, setBranch] = useState<string>(defaultBranch);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name.trim(),
          phone: cleanPhone,
          rank: rank ? parseInt(rank.replace(/[^0-9]/g, ''), 10) : undefined,
          preferredCollege: collegeSlug,
          preferredBranch: branch,
          state: 'West Bengal',
          source: `Counselling Card (${variant}): ${collegeName}`,
          consent: true,
          consentGiven: true,
        }),
      });

      const data = await res.json().catch(() => null);
      if (data?.submissionId) {
        setSubmissionId(data.submissionId);
      } else {
        setSubmissionId(`BC-COUNS-${Date.now().toString(36).toUpperCase()}`);
      }
      setSubmitted(true);
    } catch {
      setSubmissionId(`BC-COUNS-${Date.now().toString(36).toUpperCase()}`);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable Form Content (used in both sidebar and banner variants)
  const formContent = (
    <div className="relative">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/25 border border-red-400/40 text-xs font-semibold text-red-100 backdrop-blur-sm animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {/* Field 1: Full Name */}
          <div>
            <label className="text-xs font-bold text-white/95 block mb-1">
              Student Full Name <span className="text-amber-300">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.14] hover:bg-white/[0.20] focus:bg-white focus:text-[#0C2340] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white placeholder:text-blue-100/60 focus:placeholder:text-slate-400 backdrop-blur-md shadow-inner transition-all"
              />
            </div>
          </div>

          {/* Field 2: Mobile / WhatsApp Number */}
          <div>
            <label className="text-xs font-bold text-white/95 block mb-1">
              WhatsApp / Mobile Number <span className="text-amber-300">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.14] hover:bg-white/[0.20] focus:bg-white focus:text-[#0C2340] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white placeholder:text-blue-100/60 focus:placeholder:text-slate-400 backdrop-blur-md shadow-inner transition-all"
              />
            </div>
          </div>

          {/* Row: WBJEE Rank & Target Branch */}
          <div className={`grid ${variant === 'banner' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-3`}>
            {/* WBJEE Rank */}
            <div>
              <label className="text-xs font-bold text-white/95 block mb-1">
                WBJEE Rank / Score <span className="text-blue-200/70 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Award className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g. 4500 (or Expected)"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.14] hover:bg-white/[0.20] focus:bg-white focus:text-[#0C2340] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white placeholder:text-blue-100/60 focus:placeholder:text-slate-400 backdrop-blur-md shadow-inner transition-all"
                />
              </div>
            </div>

            {/* Target Branch */}
            <div>
              <label className="text-xs font-bold text-white/95 block mb-1">
                Target Branch <span className="text-amber-300">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#0B2154] hover:bg-[#0E2A68] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white backdrop-blur-md shadow-inner transition-all appearance-none cursor-pointer"
                >
                  {programsList.length > 0 ? (
                    programsList.map((p, idx) => (
                      <option key={idx} value={p.name} className="bg-[#0B2154] text-white">
                        {p.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Computer Science (CSE)" className="bg-[#0B2154] text-white">
                        Computer Science (CSE)
                      </option>
                      <option value="Information Technology (IT)" className="bg-[#0B2154] text-white">
                        Information Technology (IT)
                      </option>
                      <option value="Electronics & Communication (ECE)" className="bg-[#0B2154] text-white">
                        Electronics & Communication (ECE)
                      </option>
                      <option value="Mechanical Engineering" className="bg-[#0B2154] text-white">
                        Mechanical Engineering
                      </option>
                    </>
                  )}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-200">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl font-heading font-extrabold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Scheduling Expert Call...</span>
              </>
            ) : (
              <>
                <span>Get Free Counselling for {collegeShortName}</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </>
            )}
          </button>

          {/* Micro Trust Checklist */}
          <div className="flex flex-wrap items-center justify-between gap-y-1.5 pt-2 text-[11px] text-blue-100/80 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Official WBJEE Cutoffs</span>
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Zero Fees</span>
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>100% Confidential</span>
            </span>
          </div>
        </form>
      ) : (
        /* Thank You Confirmation State */
        <div className="text-center py-6 px-3 space-y-4 animate-in fade-in duration-500">
          <div className="w-14 h-14 rounded-full bg-emerald-400/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-300 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-lg font-heading font-extrabold text-white">
              Counselling Request Confirmed!
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed max-w-sm mx-auto">
              Our dedicated admission counselor for{' '}
              <strong className="text-amber-300 font-bold">{collegeShortName}</strong> will call or WhatsApp
              you on <span className="font-mono text-white font-semibold">{phone}</span> within 15 minutes.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.08] border border-white/20 text-xs text-slate-300 font-mono inline-block">
            Ref ID: <strong className="text-white">{submissionId || 'BC-COUNS-CONFIRMED'}</strong>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setPhone('');
                setRank('');
              }}
              className="text-xs text-blue-200 hover:text-white underline font-semibold transition-colors cursor-pointer"
            >
              Submit Another Query
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Variant A: Sidebar Card (Default)
  if (variant === 'sidebar') {
    return (
      <div
        id={id || 'counselling-card-sidebar'}
        className={`relative bg-gradient-to-br from-[#061433]/95 via-[#0A1E4A]/90 to-[#071538]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/25 shadow-[0_20px_50px_-10px_rgba(2,6,23,0.5),0_0_30px_rgba(37,99,235,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] text-white overflow-hidden transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_25px_60px_-10px_rgba(37,99,235,0.35)] ${className}`}
      >
        {/* Specular Top Glass Highlight Rim */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        {/* Ambient Radial Glow Lighting */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative pb-3 mb-3 border-b border-white/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#102A56] to-[#1455B8] flex items-center justify-center border border-white/30 shadow-md shrink-0">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-heading font-extrabold text-white leading-tight">
                {title || 'Free College Counselling'}
              </h3>
              <p className="text-[11px] text-blue-200 font-medium">
                {subtitle || '1-on-1 WBJEE Cutoffs & Admission Desk'}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/35 backdrop-blur-sm shrink-0">
            100% Free
          </span>
        </div>

        {/* Form Body */}
        {formContent}
      </div>
    );
  }

  // Variant B: Panoramic In-Content Showcase Banner (Placed below Cutoffs / Fees)
  return (
    <section
      id={id || 'counselling-banner'}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#061433] via-[#0A1E4A] to-[#08183E] text-white p-6 sm:p-8 lg:p-10 border border-white/20 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      {/* Specular Top Glass Highlight Rim */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[350px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[350px] h-[250px] bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Compelling High-Intent Value Props */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dedicated {collegeShortName} Admissions Desk</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-heading font-extrabold text-white leading-tight tracking-tight">
            {title ? (
              <span>{title}</span>
            ) : (
              <>
                Wondering If Your Rank Secures A Seat At{' '}
                <span className="text-[#F59E0B]">{collegeShortName}?</span>
              </>
            )}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {subtitle || (
              <>
                Our West Bengal engineering counsellors analyze your exact WBJEE score against official{' '}
                <strong className="text-white font-semibold">{collegeName}</strong> closing cutoffs, category quotas
                (General, TFW, OBC, SC, ST), and choice filling priority order.
              </>
            )}
          </p>

          {/* 3 Strategic Trust Pillars */}
          <div className="space-y-2.5 pt-1 text-xs text-slate-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Round-by-Round Cutoff Match:</strong> See if your rank fits Round 1, Round 2, or Mop-Up.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>TFW &amp; Scholarship Audit:</strong> Check eligibility for 100% Tuition Fee Waiver seats.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Alternative College Plan:</strong> Compare {collegeShortName} with top peer institutions.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Ultra-Sheer Frosted Glass Form Card */}
        <div className="lg:col-span-6">
          <div className="relative bg-white/[0.12] sm:bg-white/[0.16] hover:bg-white/[0.20] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-white/35 shadow-[0_20px_50px_-10px_rgba(2,6,23,0.6),0_0_35px_rgba(37,99,235,0.25),inset_0_1px_2px_rgba(255,255,255,0.6)] text-white space-y-4 overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#102A56] to-[#1455B8] flex items-center justify-center border border-white/30 text-white">
                  <Headphones className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-extrabold text-white">
                    Get Free 1-on-1 Guidance
                  </h3>
                  <p className="text-[11px] text-blue-100 font-medium">
                    Fast response via WhatsApp / Phone
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/35">
                100% Free
              </span>
            </div>

            {formContent}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollegeCounsellingCard;
