import React from 'react';
import Link from 'next/link';
import { Shield, BookOpen, Compass, Scale, Mail, MapPin, ExternalLink, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-slate-900 text-white flex items-center justify-center font-heading font-black text-base shadow-md">
                BC
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-lg tracking-tight">
                  BanglaCampus
                </h3>
                <p className="text-xs text-slate-400">West Bengal Engineering Discovery & Comparison</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An independent, evidence-backed college discovery platform for students and families in West Bengal. We publish field-level provenance from official sources (AICTE, WBJEEB, NIRF, NAAC) with zero agent sponsorships or fabricated ratings.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-emerald-400 border border-slate-800 font-mono">
                100% Verified Citations
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-800 font-mono">
                Zero Admission Commissions
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-800 font-mono">
                DPDP 2023 Compliant
              </span>
            </div>
          </div>

          {/* Directory & Comparison */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Directory & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/colleges" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  <span>All Engineering Colleges</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Side-by-Side Compare (Max 3)</span>
                </Link>
              </li>
              <li>
                <Link href="/cutoffs" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WBJEE Rank & Cutoffs Explorer</span>
                </Link>
              </li>
              <li>
                <Link href="/counselling-simulator" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">★</span>
                  <span>WBJEE Choice-Filling Simulator</span>
                </Link>
              </li>
              <li>
                <Link href="/colleges?category=State+University+Faculty" className="hover:text-emerald-400 transition-colors">
                  State University Faculties
                </Link>
              </li>
              <li>
                <Link href="/colleges?category=Government+Engineering+College" className="hover:text-emerald-400 transition-colors">
                  Govt. Engineering Colleges
                </Link>
              </li>
              <li>
                <Link href="/colleges?category=Autonomous+Private+Institute" className="hover:text-emerald-400 transition-colors">
                  Autonomous Private Institutes
                </Link>
              </li>
              <li>
                <Link href="/colleges/iem-kolkata" className="hover:text-emerald-400 transition-colors text-slate-400">
                  IEM Kolkata Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Guides */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Guidance & Research</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Educational Articles</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/wbjee-2026-counselling-choice-filling-guide"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WBJEE Choice Filling Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/autonomous-vs-makaut-affiliated-colleges"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Autonomous vs MAKAUT Degree
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-verify-aicte-naac-nba-accreditation"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Auditing AICTE & NBA Approvals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal, Privacy & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About BanglaCampus
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact & Error Reporting
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy (DPDP 2023)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">
                  Regulatory Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-emerald-400 transition-colors">
                  Cookie & Storage Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Safeguard Notice */}
        <div className="pt-8 space-y-4 text-xs text-slate-400">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <Shield className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="font-semibold text-white">Independent Publisher Notice & Caution</p>
              <p className="leading-relaxed">
                BanglaCampus is an independent educational publisher and comparative discovery catalog. It is not affiliated with the West Bengal Joint Entrance Examinations Board (WBJEEB), AICTE, MAKAUT, or any higher education institution unless explicitly disclosed. All tuition figures, cutoff ranges, seat matrices, and accreditations are verified against official publications; however, fee schedules and eligibility rules are subject to institutional revisions. Candidates must verify final demand circulars directly from official college portals before remitting any academic fees.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} BanglaCampus. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/sitemap.xml" className="hover:text-slate-400">
                Sitemap
              </Link>
              <Link href="/privacy-policy" className="hover:text-slate-400">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-400">
                Terms
              </Link>
              <Link href="/disclaimer" className="hover:text-slate-400">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
