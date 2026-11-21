import React from 'react';
import Link from 'next/link';
import { Building2, AlertCircle, ExternalLink, ShieldCheck, TrendingUp } from 'lucide-react';

interface CollegePlacementRecord {
  name: string;
  shortName: string;
  slug: string;
  type: string;
  medianPackage: string;
  highestPackage: string;
  primarySectors: string[];
  topRecruiters: string[];
  reportingCycle: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const VERIFIED_PLACEMENT_BENCHMARKS: CollegePlacementRecord[] = [
  {
    name: 'Faculty of Engineering & Technology, Jadavpur University',
    shortName: 'Jadavpur University (FET)',
    slug: 'jadavpur-university-engineering',
    type: 'State University Faculty',
    medianPackage: '₹15.5 LPA',
    highestPackage: '₹85.0 LPA',
    primarySectors: ['Software & Product', 'Semiconductors', 'Data & Analytics', 'Consulting'],
    topRecruiters: ['Google', 'Microsoft', 'Texas Instruments', 'Amazon', 'PwC'],
    reportingCycle: '2023–2024 Graduating Cohort',
    sourceLabel: 'NIRF 2024 Engineering Data & University Placement Record',
    sourceUrl: 'https://www.nirfindia.org',
  },
  {
    name: 'Kalyani Government Engineering College',
    shortName: 'KGEC Kalyani',
    slug: 'kalyani-government-engineering-college',
    type: 'Government Engineering College',
    medianPackage: '₹6.5 LPA',
    highestPackage: '₹44.0 LPA',
    primarySectors: ['IT Services', 'Core Engineering', 'Fintech'],
    topRecruiters: ['TCS Digital', 'Cognizant', 'Wipro Technologies', 'Infosys', 'Capgemini'],
    reportingCycle: '2023–2024 Graduating Cohort',
    sourceLabel: 'Mandatory Regulatory Disclosure & Institutional Placement Cell',
  },
  {
    name: 'Institute of Engineering & Management',
    shortName: 'IEM Kolkata',
    slug: 'iem-kolkata',
    type: 'Autonomous Private (MAKAUT Affiliated)',
    medianPackage: '₹5.5 – ₹7.2 LPA',
    highestPackage: '₹72.0 LPA',
    primarySectors: ['Enterprise IT', 'Cloud & DevOps', 'Consulting', 'Core Automation'],
    topRecruiters: ['TCS', 'Cognizant', 'Wipro', 'Capgemini', 'PwC', 'Deloitte', 'Mindtree'],
    reportingCycle: '2023–2024 Audited Placement File',
    sourceLabel: 'Audited NIRF 2024 Institutional Submission',
  },
  {
    name: 'Heritage Institute of Technology',
    shortName: 'Heritage (HITK)',
    slug: 'heritage-institute-of-technology',
    type: 'Autonomous Private (MAKAUT Affiliated)',
    medianPackage: '₹5.0 – ₹6.2 LPA',
    highestPackage: '₹38.0 LPA',
    primarySectors: ['IT Consulting', 'Digital Engineering', 'VLSI Design'],
    topRecruiters: ['TCS', 'Infosys', 'Cognizant', 'Wipro', 'IBM India'],
    reportingCycle: '2023–2024 Graduating Cohort',
    sourceLabel: 'NIRF 2024 Institutional Data',
  },
  {
    name: 'Haldia Institute of Technology',
    shortName: 'HIT Haldia',
    slug: 'haldia-institute-of-technology',
    type: 'Autonomous Private (MAKAUT Affiliated)',
    medianPackage: '₹4.5 – ₹5.5 LPA',
    highestPackage: '₹40.0 LPA',
    primarySectors: ['Chemical & Refining', 'Core Mechanical', 'IT Services'],
    topRecruiters: ['Haldia Petrochemicals', 'IOCL (Apprenticeships)', 'Wipro', 'TCS', 'Tech Mahindra'],
    reportingCycle: '2023–2024 Graduating Cohort',
    sourceLabel: 'Annual Institutional Audit Report & TPO Placement Gazette',
  },
];

export function PlacementsSummary() {
  const allRecruiters = [
    'Tata Consultancy Services (TCS)',
    'Cognizant Technology Solutions',
    'Wipro Technologies',
    'Capgemini India',
    'PricewaterhouseCoopers (PwC)',
    'Infosys',
    'Deloitte USI',
    'LTIMindtree',
    'Persistent Systems',
    'Tech Mahindra',
    'Ericsson India',
    'IBM India',
  ];

  return (
    <section id="placements" className="py-12 sm:py-16 bg-[#FAFBFD] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2FF] text-[#1455B8] text-xs font-bold uppercase tracking-wider border border-[#BFDBFE]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audited Institutional Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#102A56] tracking-tight">
            West Bengal Engineering Placements: Comparative Benchmarks
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Transparent analysis of median CTCs and recruiter footprints. We publish government-audited NIRF medians to show realistic graduate outcomes without marketing exaggeration.
          </p>
        </div>

        {/* 1. Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs text-center space-y-1">
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Premier State University Median
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#102A56]">
              ₹15.5 LPA
            </div>
            <p className="text-[11px] text-[#64748B]">
              Jadavpur University FET (NIRF 2024 audited engineering submission).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs text-center space-y-1">
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Autonomous College Medians
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#1455B8]">
              ₹4.8 – ₹7.2 LPA
            </div>
            <p className="text-[11px] text-[#64748B]">
              Across top-tier MAKAUT-affiliated autonomous engineering colleges.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs text-center space-y-1">
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Sector V Tech Ecosystem
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#0F8B70]">
              Salt Lake IT Hub
            </div>
            <p className="text-[11px] text-[#64748B]">
              Proximity dividend for colleges near Kolkata IT corridor (Sector V).
            </p>
          </div>
        </div>

        {/* 2. Institutional Comparative Placement Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-base text-[#102A56]">
                Institutional Placement Comparison Table
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Sourced from official NIRF engineering reports and mandatory regulatory disclosures.
              </p>
            </div>
            <span className="text-xs text-[#1455B8] bg-[#EAF2FF] px-2.5 py-1 rounded-lg font-bold border border-[#BFDBFE] self-start sm:self-auto">
              Cohort 2023–2024
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAFBFD] border-b border-[#E2E8F0] text-[#102A56]">
                  <th className="py-3.5 px-4 font-heading font-bold">Institution</th>
                  <th className="py-3.5 px-4 font-heading font-bold">Category</th>
                  <th className="py-3.5 px-4 font-heading font-bold text-[#1455B8]">Median Package</th>
                  <th className="py-3.5 px-4 font-heading font-bold">Peak / Highest Package</th>
                  <th className="py-3.5 px-4 font-heading font-bold">Key Hiring Companies</th>
                  <th className="py-3.5 px-4 font-heading font-bold">Source Citation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {VERIFIED_PLACEMENT_BENCHMARKS.map((col, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#102A56]">
                      <Link
                        href={`/colleges/${col.slug}`}
                        className="hover:text-[#1455B8] hover:underline"
                      >
                        {col.shortName}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B] text-xs">
                      {col.type}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#1455B8]">
                      {col.medianPackage}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#102A56]">
                      {col.highestPackage}
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B] text-xs max-w-xs">
                      {col.topRecruiters.join(', ')}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-[#64748B] italic">
                      {col.sourceLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Common Regular Tech Recruiters Strip */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-2xs space-y-4">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-base text-[#102A56]">
              Major IT &amp; Engineering Employers in West Bengal Campus Drives
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Active recruiters conducting on-campus and pool hiring drives across WBJEE participating colleges.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allRecruiters.map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-xs font-medium text-[#102A56] flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[#1455B8] shrink-0" />
                <span className="truncate">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Median vs Highest Package Policy Disclosure */}
        <div className="p-5 rounded-2xl bg-[#EAF2FF]/60 border border-[#BFDBFE] text-xs text-[#102A56] flex items-start gap-3 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-[#1455B8] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-[#102A56]">Understanding Placement Statistics:</strong>
            <p className="text-[#334155]">
              Peak packages (such as ₹72 LPA or ₹85 LPA) represent exceptional individual student achievements in specialized product, off-campus, or international roles. The true cohort benchmark is the <strong>Median Salary</strong>, which represents what the typical graduate secured in campus placements. Admission to any institution does not guarantee employment; offers depend strictly upon individual academic standing, coding proficiency, and employer selection rounds.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
