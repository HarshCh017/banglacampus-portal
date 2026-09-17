import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-14 pb-10 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-800/80">
          {/* Col 1: Institutional Profile & Entity Disambiguation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brandBlue-600 text-white flex items-center justify-center font-extrabold text-base">
                IEM
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  Institute of Engineering & Management
                </h3>
                <p className="text-xs text-slate-400">Kolkata, West Bengal (Est. 1989)</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous engineering institute approved by AICTE, New Delhi and affiliated with Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal. NAAC Accredited with &apos;A&apos; Grade.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-navy-800 text-[11px] text-slate-300 font-mono">
                AICTE Approved
              </span>
              <span className="px-2 py-0.5 rounded bg-navy-800 text-[11px] text-slate-300 font-mono">
                MAKAUT Affiliated
              </span>
              <span className="px-2 py-0.5 rounded bg-navy-800 text-[11px] text-slate-300 font-mono">
                Autonomous
              </span>
              <span className="px-2 py-0.5 rounded bg-navy-800 text-[11px] text-slate-300 font-mono">
                NAAC &apos;A&apos;
              </span>
            </div>
          </div>

          {/* Col 2: Programs & Direct Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">B.Tech Programs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/courses/cse" className="hover:text-white transition-colors">
                  B.Tech Computer Science & Engineering (CSE)
                </Link>
              </li>
              <li>
                <Link href="/courses/cse-aiml" className="hover:text-white transition-colors">
                  B.Tech CSE (Artificial Intelligence & ML)
                </Link>
              </li>
              <li>
                <Link href="/courses/it" className="hover:text-white transition-colors">
                  B.Tech Information Technology (IT)
                </Link>
              </li>
              <li>
                <Link href="/courses/ece" className="hover:text-white transition-colors">
                  B.Tech Electronics & Communication (ECE)
                </Link>
              </li>
              <li>
                <Link href="/courses/ee" className="hover:text-white transition-colors">
                  B.Tech Electrical Engineering (EE)
                </Link>
              </li>
              <li>
                <Link href="/courses/me" className="hover:text-white transition-colors">
                  B.Tech Mechanical Engineering (ME)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-brandBlue-400 font-semibold hover:underline">
                  View All 12 Specializations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Important Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Admissions & Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admissions" className="hover:text-white transition-colors">
                  Admission Roadmap & Timeline 2027
                </Link>
              </li>
              <li>
                <Link href="/admissions/fees" className="hover:text-white transition-colors">
                  Fee Structure & Education Loans
                </Link>
              </li>
              <li>
                <Link href="/admissions/eligibility" className="hover:text-white transition-colors">
                  Branch Eligibility Calculator
                </Link>
              </li>
              <li>
                <Link href="/iemjee" className="hover:text-white transition-colors">
                  IEMJEE 2027 Examination Details
                </Link>
              </li>
              <li>
                <Link href="/placements" className="hover:text-white transition-colors">
                  Sourced Placement Records
                </Link>
              </li>
              <li>
                <a
                  href="https://exam.iem.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brandBlue-400 hover:underline"
                >
                  <span>Official IEMJEE Test Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified NAP & Contact Information */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Official Admission Office</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brandTeal-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Ashram Building (1st Floor)</strong>
                  <br />
                  GN-34/2, Sector – V, Saltlake Electronics Complex, Kolkata – 700 091, West Bengal, India.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brandTeal-500 shrink-0" />
                <span>Admission Desk: Inquire Online or Visit Ashram Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brandTeal-500 shrink-0" />
                <a href="mailto:admissions@iem.edu.in" className="hover:text-white">
                  admissions@iem.edu.in
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Ashram Building Admission Cell (Mon–Sat: 09:30 AM – 05:30 PM IST)
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & Operating Model Disclosure (Section 1 / Model B Guidance) */}
        <div className="pt-8 pb-4 text-xs text-slate-400 space-y-3">
          <div className="p-3.5 rounded-lg bg-navy-900 border border-navy-800 text-[11px] leading-relaxed">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Legal Disclosures & Operational Notice:</strong>
                <p className="mt-1">
                  This portal serves as an independent admission guidance and candidate acquisition system for B.Tech programs at the Institute of Engineering & Management (IEM), Kolkata. Completing a guidance inquiry form registers a request for admission consultation and does not constitute a formal grant of admission or seat reservation. Final admission to IEM Kolkata is governed strictly by merit in entrance examinations (WBJEE, JEE Main, IEMJEE), board eligibility, and seat allotment through centralized counselling or authorized institutional guidelines.
                </p>
                <p className="mt-1">
                  Demand Drafts for fees are payable exclusively in favour of <strong>&quot;Institute of Engineering &amp; Management Trust&quot;</strong> payable at Kolkata. Never hand over cash or personal payments to third-party individuals.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-[11px]">
            <p>
              &copy; {new Date().getFullYear()} Institute of Engineering & Management Admission Guidance. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
              <Link href="/privacy" className="hover:text-white underline py-1">
                Privacy Policy (DPDP)
              </Link>
              <Link href="/terms" className="hover:text-white underline py-1">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="hover:text-white underline py-1">
                Mandatory Disclaimers
              </Link>
              <Link href="/contact" className="hover:text-white underline py-1">
                Contact Office
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
