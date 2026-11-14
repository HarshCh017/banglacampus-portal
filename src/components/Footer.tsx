'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  Shield,
  Compass,
  Scale,
  Award,
  Calculator,
  BookOpen,
  ArrowUp,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sources = [
    { name: 'AICTE Approvals', href: 'https://www.aicte-india.org', badge: 'Apex Technical Body' },
    { name: 'WBJEEB Seat Matrix', href: 'https://wbjeeb.nic.in', badge: 'Official Counselling' },
    { name: 'NIRF Engineering 2024', href: 'https://www.nirfindia.org', badge: 'MoE Ranking' },
    { name: 'NAAC Portal', href: 'https://www.naac.gov.in', badge: 'Institutional Grade' },
    { name: 'WBFSC Fee Circulars', href: '/methodology', badge: 'Audited Gazettes' },
  ];

  return (
    <footer id="site-footer" className="bg-[#070F22] text-slate-300 pt-14 pb-10 border-t border-[#142954] relative z-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 1. Main 4-Column Grid (Inspired by iem-2027-28.vercel.app) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#142954]/80">
          
          {/* Column 1: Brand, Mission & Monospace Provenance Tags */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-[#0052CC] text-white flex items-center justify-center font-extrabold text-base shadow-sm group-hover:bg-[#146EF5] transition-colors">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  Bengal<span className="text-[#388FFF]">Campus</span>
                </h3>
                <p className="text-xs text-slate-400">West Bengal Engineering Intelligence</p>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Independent higher education research and admissions intelligence platform for West Bengal. Auditing B.Tech tuition fees, approved AICTE seat matrices, and official WBJEE closing cutoffs directly from verified regulatory gazettes.
            </p>

            {/* Monospace Provenance Badges (Matches iem-2027-28 styling) */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#142954] text-[11px] text-slate-300 font-mono">
                AICTE Audited
              </span>
              <span className="px-2 py-0.5 rounded bg-[#142954] text-[11px] text-slate-300 font-mono">
                WBJEEB Sourced
              </span>
              <span className="px-2 py-0.5 rounded bg-[#142954] text-[11px] text-slate-300 font-mono">
                Zero Commission
              </span>
              <span className="px-2 py-0.5 rounded bg-[#142954] text-[11px] text-slate-300 font-mono">
                DPDP 2023 Compliant
              </span>
            </div>
          </div>

          {/* Column 2: Admissions & Guidance Decision Tools */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase font-heading">
              Admissions Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/wbjee-predictor" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>WBJEE Rank Predictor 2026</span>
                </Link>
              </li>
              <li>
                <Link href="/counselling-simulator" className="hover:text-white transition-colors">
                  WBJEE Choice-Filling Simulator
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Side-by-Side Comparison Engine
                </Link>
              </li>
              <li>
                <Link href="/fee-calculator" className="hover:text-white transition-colors">
                  4-Year Transparent Fee Calculator
                </Link>
              </li>
              <li>
                <Link href="/cutoffs" className="hover:text-white transition-colors">
                  Verified Opening &amp; Closing Cutoffs
                </Link>
              </li>
              <li>
                <Link href="/counselling" className="hover:text-white transition-colors">
                  Free 1-on-1 Academic Advisory Desk
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/guides" className="text-[#388FFF] font-semibold hover:underline inline-flex items-center gap-1">
                  <span>View All Counselling Guides</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Colleges Directory */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase font-heading">
              Premier Colleges
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/colleges/jadavpur-university-engineering" className="hover:text-white transition-colors">
                  Faculty of Engineering, Jadavpur University
                </Link>
              </li>
              <li>
                <Link href="/colleges/kalyani-government-engineering-college" className="hover:text-white transition-colors">
                  Kalyani Govt Engineering College (KGEC)
                </Link>
              </li>
              <li>
                <Link href="/colleges/iem-kolkata" className="hover:text-white transition-colors">
                  Institute of Engineering &amp; Management (IEM)
                </Link>
              </li>
              <li>
                <Link href="/colleges/heritage-institute-of-technology" className="hover:text-white transition-colors">
                  Heritage Institute of Technology (HIT)
                </Link>
              </li>
              <li>
                <Link href="/colleges/jalpaiguri-government-engineering-college" className="hover:text-white transition-colors">
                  Jalpaiguri Govt Engineering College (JGEC)
                </Link>
              </li>
              <li>
                <Link href="/colleges/techno-main-salt-lake" className="hover:text-white transition-colors">
                  Techno Main Salt Lake (TMSL)
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/colleges" className="text-[#388FFF] font-semibold hover:underline inline-flex items-center gap-1">
                  <span>Explore All 20 Verified Institutions</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Advisory & Research Desk (Matches iem-2027-28 styling) */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase font-heading">
              Admissions Advisory Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>Admissions Research Cell</strong>
                  <br />
                  Sector V, Salt Lake Electronics Complex, Kolkata – 700 091, West Bengal, India.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span>Helpline: Inquire Online or Request 1-on-1 Call</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <a href="mailto:admissions@bengalcampus.in" className="hover:text-white text-[#388FFF]">
                  admissions@bengalcampus.in
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Academic Research &amp; Advisory Desk (Mon–Sat: 09:30 AM – 06:00 PM IST)
              </p>
            </div>
          </div>

        </div>

        {/* 2. All 20 Verified Engineering Colleges Directory Index (Full Search Engine Crawl Index) */}
        <div className="pt-2">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Verified Engineering Colleges in West Bengal (Complete 20-Institution Index):
              </span>
              <span className="text-[11px] font-mono text-slate-400">WBJEE 2026 Registry</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-slate-400">
              {VERIFIED_COLLEGES.map((c, i) => (
                <React.Fragment key={c.slug}>
                  <Link
                    href={`/colleges/${c.slug}`}
                    className="hover:text-white transition-colors"
                    title={`${c.name} (WBJEE Code: ${c.wbjeebCode})`}
                  >
                    {c.shortName}
                  </Link>
                  {i < VERIFIED_COLLEGES.length - 1 && (
                    <span className="text-slate-600 select-none">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Audited Regulatory Repositories & Compliance Badges (Stylized Interactive Grid) */}
        <div className="pt-4 pb-2 border-t border-[#142954]/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-semibold text-xs text-slate-200 shrink-0">
                Audited Regulatory Repositories:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {sources.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md bg-[#0B1B3D] hover:bg-[#142954] border border-[#142954] hover:border-[#388FFF]/60 text-slate-300 hover:text-white text-xs transition-all inline-flex items-center gap-1.5 group"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono group-hover:text-slate-300">
                      ({s.badge})
                    </span>
                    <ExternalLink className="w-3 h-3 text-[#14B8A6] opacity-75 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#142954] hover:bg-[#1E3A74] text-white transition-all cursor-pointer text-xs self-start lg:self-auto font-medium shadow-xs"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#388FFF]" />
            </button>
          </div>
        </div>

        {/* 4. Structured Legal Disclosures & Operational Notice Box (Signature element from iem-2027-28.vercel.app) */}
        <div className="p-4 rounded-xl bg-[#0B1B3D] border border-[#142954] text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <strong className="text-slate-200">Legal Disclosures &amp; Operational Sourcing Notice:</strong>
              <p>
                BengalCampus operates as an independent higher education research and candidate advisory platform for West Bengal engineering colleges. BengalCampus operates with zero commercial brokerages and zero sponsored placements. All published NIRF rankings, NAAC accreditations, approved intake matrices, and tuition fees are sourced directly from public gazettes published by the All India Council for Technical Education (AICTE), the West Bengal Joint Entrance Examinations Board (WBJEEB), and institutional accounts circulations.
              </p>
              <p>
                Submitting a guidance inquiry form registers a request for admission consultation and does not constitute a formal grant of admission or seat reservation. Final admission to any institution is governed strictly by merit in recognized entrance examinations (WBJEE, JEE Main, institutional entrance exams), board eligibility, and seat allotment through centralized counselling. Never make cash payments or personal transfers to unauthorized third parties.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Copyright & Mandatory Policy Strip */}
        <div className="pt-2 border-t border-[#142954]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} BengalCampus Academic Research Desk. All rights reserved. Truth in Admissions · Verified Sourcing.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
            <Link href="/privacy" className="hover:text-white underline py-1">
              Privacy Policy (DPDP Act)
            </Link>
            <Link href="/terms" className="hover:text-white underline py-1">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-white underline py-1">
              Non-Affiliation Disclaimer
            </Link>
            <Link href="/methodology" className="hover:text-white underline py-1">
              Data Verification Methodology
            </Link>
            <Link href="/login" className="hover:text-white underline py-1 opacity-75">
              Staff Console
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
