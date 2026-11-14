import React from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';
import { Award, CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-navy-950 text-white overflow-hidden pt-8 pb-16 md:py-20 engineering-grid">
      {/* Subtle radial glow overlay */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandBlue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brandTeal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Outcome Headline & Institutional Legitimacy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg sm:rounded-full bg-navy-900 border border-navy-700 text-[11px] sm:text-xs font-medium text-slate-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Autonomous under MAKAUT · AICTE Approved · NAAC &apos;A&apos; Grade</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Secure Your B.Tech Future at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-teal-200">
                I.E.M. Kolkata
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              West Bengal&apos;s premier autonomous engineering institution in Salt Lake Sector V. Check your branch eligibility indication in 60 seconds, explore transparent fee schedules, and connect with official counsellors.
            </p>

            {/* Trust Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="bg-navy-900/90 border border-navy-800 p-3 sm:p-3.5 rounded-xl">
                <div className="text-lg sm:text-2xl font-extrabold text-white font-heading">Est. 1989</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">35+ Years of Engineering Excellence</div>
              </div>

              <div className="bg-navy-900/90 border border-navy-800 p-3 sm:p-3.5 rounded-xl">
                <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-heading">Grade &apos;A&apos;</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">NAAC Accredited &amp; NBA Certified Streams</div>
              </div>

              <div className="bg-navy-900/90 border border-navy-800 p-3 sm:p-3.5 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-lg sm:text-2xl font-extrabold text-sky-400 font-heading">₹0 Fee</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Zero Application Fee for IEMJEE 2027</div>
              </div>
            </div>

            {/* Fast Bullet Points */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pathways via IEMJEE, WBJEE Centralized Counselling, and JEE Main merit</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Active recruitment by global tech employers: TCS, Cognizant, Wipro, Capgemini &amp; PwC</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Primary Ashram Campus located in Kolkata&apos;s primary IT hub (Sector V)</span>
              </div>
            </div>

            {/* Secondary Action Link */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <a
                href="#programs"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-white transition-colors py-1"
              >
                <span>Explore Approved B.Tech Branches</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <a
                href="#fees"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors py-1"
              >
                <span>View Fee Structure &amp; Bank Loans</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4-Field Lead Capture Form (5 cols) */}
          <div className="lg:col-span-5 w-full max-w-xl mx-auto lg:max-w-none">
            <LeadCaptureForm
              id="lead-form"
              sourceCtaId="hero-primary-form"
              headline="Get Admission Guidance"
              subheadline="Enter your details below to check preliminary branch thresholds & receive official fee information."
            />
          </div>

        </div>
      </div>
    </section>
  );
}
