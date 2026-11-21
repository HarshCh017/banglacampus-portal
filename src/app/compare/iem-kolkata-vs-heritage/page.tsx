import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  GraduationCap,
  Award,
  Coins,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck2,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'IEM Kolkata vs Heritage Institute of Technology: Fees, Placements & Cutoffs Compared | BengalCampus',
  description:
    'Compare IEM Kolkata and Heritage Institute of Technology (HITK) side-by-side: B.Tech tuition fees (₹9.45L vs ₹5.46L), NIRF placement medians, WBJEE cutoffs, campus facilities, and affiliations.',
  keywords: [
    'IEM Kolkata vs Heritage',
    'IEM vs Heritage Institute of Technology',
    'IEM Kolkata vs HITK',
    'IEM Kolkata fees vs Heritage',
    'IEM Kolkata placement vs Heritage placement',
    'IEM Kolkata cutoff vs Heritage cutoff',
    'which is better IEM or Heritage',
  ],
  alternates: {
    canonical: 'https://bengalcampus.in/compare/iem-kolkata-vs-heritage',
  },
  openGraph: {
    title: 'IEM Kolkata vs Heritage Institute of Technology Comparison | BengalCampus',
    description:
      'Detailed, audited comparison of IEM Kolkata and Heritage Institute of Technology: fees, NIRF placements, entrance examinations, accreditations, and campus culture.',
    url: 'https://bengalcampus.in/compare/iem-kolkata-vs-heritage',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IEM Kolkata vs Heritage: Fees, Placements & Cutoffs | BengalCampus',
    description:
      'Side-by-side comparison of Kolkata’s top autonomous private engineering colleges.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IemVsHeritagePage() {
  const comparisonData = [
    {
      metric: 'Year Established',
      iem: '1989 (Oldest private engineering college in West Bengal)',
      heritage: '2001 (Established by Kalyan Bharti Trust)',
    },
    {
      metric: 'Campus Location & Setting',
      iem: 'GN-34/2, Sector V, Salt Lake, Kolkata (Urban compact campus situated in Kolkata’s premier IT corridor)',
      heritage: 'Chowbaga Road, Anandapur, East Kolkata (Sprawling 10+ acre green residential campus)',
    },
    {
      metric: 'University Affiliation',
      iem: 'Autonomous Private; Affiliated to University of Engineering & Management (UEM), Kolkata (Historically MAKAUT)',
      heritage: 'Autonomous Private; Affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    },
    {
      metric: 'Primary Admission Route',
      iem: 'IEMJEE 2027 entrance exam (exam.iem.edu.in, ₹0 fee) + Institutional Counselling; Historical WBJEE Code #104 archive',
      heritage: 'WBJEE Centralized e-Counselling (WBJEEB Code #109, 90% seats) + JEE Main (10% All-India quota)',
    },
    {
      metric: 'B.Tech Course Tuition Fee',
      iem: '₹1,40,000 (1st Sem) + ₹1,15,000 (Sem 2–8) = ₹9,45,000 Total 8-Semester Fee (Published schedule)',
      heritage: '~₹5,46,000 Total 4-Year Tuition Fee (State Higher Education Fee Committee approved structure)',
    },
    {
      metric: 'NIRF Placement Median',
      iem: '₹6.00 LPA Median Salary (NIRF 2026 data; 787 of 907 placed, 86.8% placement rate, 102 higher studies)',
      heritage: '₹5.00 – ₹6.20 LPA Median Salary (NIRF 2024 reported data; consistent batch hiring)',
    },
    {
      metric: 'Peak / Highest Package',
      iem: '₹72 LPA (Off-campus / International peak); ₹32 LPA domestic peak offer',
      heritage: '~₹38 LPA (Domestic product / corporate drive peak offer)',
    },
    {
      metric: 'Accreditation Status',
      iem: 'AICTE approved; NAAC Grade A (cycle concluded Dec 31, 2024; renewal in progress); NBA for CSE, IT, ECE, EE (Mech not NBA)',
      heritage: 'AICTE approved; NAAC Grade B++; NBA accredited for major core engineering departments',
    },
    {
      metric: 'NIRF Engineering Rank Band',
      iem: 'Rank Band 151–200 across India (NIRF Engineering)',
      heritage: 'Rank Band 201–250 / Participating Institution (NIRF Engineering)',
    },
    {
      metric: 'Campus Life & Culture',
      iem: 'Strict academic discipline, heavy emphasis on coding certifications, attendance, and corporate technical readiness',
      heritage: 'Vibrant college campus life, active student clubs, extensive sports grounds, cultural fests (Ecstasia)',
    },
  ];

  const faqs = [
    {
      question: 'Which college is better: IEM Kolkata or Heritage Institute of Technology?',
      answer:
        'Neither is universally better for every student; the decision depends on budget, campus preference, and degree affiliation. IEM Kolkata offers direct location proximity in Salt Lake Sector V, a slightly higher NIRF placement median (₹6.00 LPA), and admission through the zero-fee IEMJEE test. Heritage Institute of Technology provides a significantly lower 4-year tuition fee (~₹5.46L vs ₹9.45L at IEM), an expansive 10+ acre green campus, and a state university MAKAUT degree allocated via centralized WBJEE counselling.',
    },
    {
      question: 'How do the B.Tech tuition fees compare between IEM and Heritage?',
      answer:
        'There is a notable difference in total degree expense. IEM Kolkata’s published schedule for B.Tech entails ₹1,40,000 in Semester 1 followed by ₹1,15,000 per semester from Semesters 2 to 8, bringing the total course fee to ₹9,45,000 across 4 years. Heritage Institute of Technology follows the West Bengal Higher Education Fee Committee schedule, resulting in approximately ₹5,46,000 across 8 semesters, making Heritage approximately ₹4 Lakh more affordable over four years.',
    },
    {
      question: 'How do admissions differ between IEM Kolkata and Heritage?',
      answer:
        'Heritage Institute of Technology admits candidates strictly through WBJEE centralized e-counselling (WBJEEB Code #109) for 90% of seats, with the remaining 10% through JEE Main. IEM Kolkata’s primary published admission route for the upcoming cycle is through its proprietary entrance examination, IEMJEE (exam.iem.edu.in, ₹0 application fee), followed by institutional counselling at the Salt Lake Ashram campus. Historical WBJEE allotment cutoffs for IEM (Code #104) serve as comparative benchmarks.',
    },
    {
      question: 'What are the placement differences between IEM Kolkata and Heritage?',
      answer:
        'Both institutions attract major enterprise IT recruiters (TCS, Cognizant, Wipro, PwC, Infosys, Capgemini). According to audited NIRF 2026 data, IEM Kolkata reported an audited median salary of ₹6.00 LPA (787 placed out of 907 graduates; 86.8% placement rate) with exceptional individual offers reaching up to ₹72 LPA off-campus. Heritage Institute of Technology reports a median salary range of ₹5.00–₹6.20 LPA with top offers around ₹38 LPA.',
    },
    {
      question: 'Which university awards the degree for IEM Kolkata vs Heritage?',
      answer:
        'Heritage Institute of Technology is an autonomous institution affiliated with Maulana Abul Kalam Azad University of Technology (MAKAUT, West Bengal). IEM Kolkata operates under the IEM-UEM Group and is affiliated with the University of Engineering & Management (UEM), Kolkata (historically affiliated with MAKAUT).',
    },
  ];

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bengalcampus.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare Colleges',
        item: 'https://bengalcampus.in/compare',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'IEM Kolkata vs Heritage',
        item: 'https://bengalcampus.in/compare/iem-kolkata-vs-heritage',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAFBFD] border-b border-[#E2E8F0] py-3 px-4 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#1455B8] font-medium transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/compare" className="hover:text-[#1455B8] font-medium transition-colors">
            Compare
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#102A56] font-semibold">IEM Kolkata vs Heritage</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[#102A56] text-white py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-[#0F8B70]" />
              <span>Independent Engineering College Comparison • Sourced Regulatory Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              IEM Kolkata vs Heritage Institute of Technology
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              A comprehensive, factual comparison of West Bengal’s two most sought-after private autonomous engineering institutions. Compare 4-year tuition fees, NIRF placement statistics, university affiliations, and campus environments without marketing bias.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Quick Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IEM Card */}
          <div className="p-6 rounded-2xl bg-white border-2 border-[#1455B8]/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1455B8]">
                Autonomous Private • IEM-UEM Group
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1455B8] border border-blue-200">
                Salt Lake Sector V
              </span>
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#102A56]">
              IEM Kolkata (Institute of Engineering &amp; Management)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Established in 1989 as West Bengal’s pioneer private engineering institute. Known for rigorous academic focus, proximity to Sector V IT offices, zero-fee IEMJEE entrance test, and an audited ₹6.00 LPA median placement.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">B.Tech Total Fees</span>
                <strong className="text-sm font-extrabold text-[#1455B8]">₹9,45,000</strong>
                <span className="text-[10px] text-slate-400 block">8 Semesters published</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">NIRF Median Package</span>
                <strong className="text-sm font-extrabold text-emerald-700">₹6.00 LPA</strong>
                <span className="text-[10px] text-slate-400 block">787 of 907 Placed</span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/colleges/iem-kolkata"
                className="text-xs font-bold text-[#1455B8] hover:underline flex items-center gap-1"
              >
                <span>Read Full IEM Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/iemjee"
                className="text-xs font-bold text-white bg-[#102A56] hover:bg-[#1455B8] px-3.5 py-1.5 rounded-lg transition-colors"
              >
                IEMJEE 2027 Guide
              </Link>
            </div>
          </div>

          {/* Heritage Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Autonomous Private • Kalyan Bharti Trust
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Anandapur, Kolkata
              </span>
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#102A56]">
              Heritage Institute of Technology (HITK)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Established in 2001 on an expansive 10+ acre campus in Anandapur. Affiliated with MAKAUT, offering state fee committee regulated tuition (~₹5.46L total), centralized WBJEE admission, and active campus student life.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">B.Tech Total Fees</span>
                <strong className="text-sm font-extrabold text-[#1455B8]">~₹5,46,000</strong>
                <span className="text-[10px] text-slate-400 block">State Committee Schedule</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">NIRF Median Package</span>
                <strong className="text-sm font-extrabold text-emerald-700">₹5.0 – ₹6.2 LPA</strong>
                <span className="text-[10px] text-slate-400 block">Reported NIRF range</span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/colleges/heritage-institute-of-technology"
                className="text-xs font-bold text-[#1455B8] hover:underline flex items-center gap-1"
              >
                <span>Read Full Heritage Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/wbjee-predictor?preselect=heritage-institute-of-technology"
                className="text-xs font-bold text-[#102A56] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg transition-colors"
              >
                Check WBJEE Rank
              </Link>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold font-heading text-[#102A56]">
              Detailed Parameter-by-Parameter Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Data sourced directly from official institutional accounts, NIRF submissions, and state regulatory filings.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAFBFD] border-b border-[#E2E8F0] text-[#102A56]">
                  <th className="py-3.5 px-4 font-heading font-bold w-1/4">Comparison Factor</th>
                  <th className="py-3.5 px-4 font-heading font-bold text-[#1455B8] w-3/8">IEM Kolkata</th>
                  <th className="py-3.5 px-4 font-heading font-bold text-slate-800 w-3/8">Heritage Institute of Technology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 bg-slate-50/40">
                      {row.metric}
                    </td>
                    <td className="py-3.5 px-4 leading-relaxed font-medium">
                      {row.iem}
                    </td>
                    <td className="py-3.5 px-4 leading-relaxed font-medium">
                      {row.heritage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* In-Depth Editorial Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs text-slate-700 leading-relaxed">
          {/* Fee Analysis */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-[#102A56]">
              <Coins className="w-5 h-5 text-[#1455B8]" />
              <span>1. Tuition Fee &amp; Cost of Education</span>
            </div>
            <p>
              Fee difference is one of the most substantial factors separating the two institutions:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
              <li>
                <strong>IEM Kolkata:</strong> Follows its institutional fee schedule of ₹1,40,000 for Semester 1 (inclusive of admission fees) and ₹1,15,000 per semester for Semesters 2 through 8, bringing the total course tuition to <strong>₹9,45,000</strong>.
              </li>
              <li>
                <strong>Heritage Institute of Technology:</strong> Follows the West Bengal Higher Education Fee Committee structure, with total 4-year tuition around <strong>~₹5,46,000</strong> across 8 semesters.
              </li>
              <li>
                <strong>Budget Impact:</strong> Heritage is approximately ₹4,00,000 less expensive across the 4-year degree course, which is a decisive consideration for families relying strictly on educational loans or personal savings.
              </li>
            </ul>
          </div>

          {/* Admission Route */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-[#102A56]">
              <GraduationCap className="w-5 h-5 text-[#1455B8]" />
              <span>2. Admission Route &amp; Exam Strategy</span>
            </div>
            <p>
              The application and counselling process differs fundamentally between the two colleges:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
              <li>
                <strong>Heritage:</strong> Admission is conducted centrally through WBJEEB (Code #109) e-counselling based on General Merit Rank (GMR), plus a 10% All-India quota through JEE Main. Candidates register at <code>wbjeeb.nic.in</code>.
              </li>
              <li>
                <strong>IEM Kolkata:</strong> The published admission pathway is through the <strong>IEMJEE entrance exam</strong> at <code>exam.iem.edu.in</code>, which is completely free of charge (₹0 fee). Qualified rank holders attend institutional counselling at the Salt Lake Ashram campus.
              </li>
              <li>
                <strong>Aspirant Strategy:</strong> Candidates targeting top Kolkata engineering options are encouraged to appear for both WBJEE and IEMJEE to preserve all counselling pathways.
              </li>
            </ul>
          </div>

          {/* Placement Outcomes */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-[#102A56]">
              <TrendingUp className="w-5 h-5 text-[#0F8B70]" />
              <span>3. Placement Reality &amp; Recruiting Cohorts</span>
            </div>
            <p>
              Both colleges have strong corporate brand recall among national IT recruiters:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
              <li>
                <strong>Recruiter Overlap:</strong> TCS, Cognizant, Wipro, Capgemini, Infosys, and PwC conduct annual campus recruitment drives at both campuses.
              </li>
              <li>
                <strong>IEM Statistics:</strong> Audited NIRF 2026 data shows 787 students placed out of 907 (86.8%) with a ₹6.00 LPA median and 102 entering higher studies. Peak individual offers reached ₹72 LPA off-campus.
              </li>
              <li>
                <strong>Heritage Statistics:</strong> Heritage maintains an audited median in the ₹5.00–₹6.20 LPA range, with strong placement rates in CSE, IT, and core disciplines.
              </li>
            </ul>
          </div>

          {/* Campus Environment & Location */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-[#102A56]">
              <MapPin className="w-5 h-5 text-purple-700" />
              <span>4. Campus Infrastructure &amp; Location</span>
            </div>
            <p>
              The two campuses offer contrasting collegiate environments:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
              <li>
                <strong>IEM Kolkata:</strong> Located at GN-34/2, Sector V, Salt Lake. It is an urban compact setup divided across buildings (Ashram, Gurukul, Management House). It is adjacent to tech parks and metro stations, giving an early taste of corporate life.
              </li>
              <li>
                <strong>Heritage:</strong> Spread across 10+ acres along Chowbaga Road in Anandapur. Features wide sports fields, dedicated college hostels, modern auditoriums, and an active campus fest culture.
              </li>
            </ul>
          </div>
        </div>

        {/* Verdict & Recommendation Guide */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              BengalCampus Independent Decision Framework
            </span>
            <h2 className="text-2xl font-bold font-heading">
              Which College Should You Choose?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              Use this objective criteria breakdown to match your academic priorities, financial plan, and career vision:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
            {/* Choose IEM */}
            <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
              <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Choose IEM Kolkata if:</span>
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>You prioritize being situated directly in Salt Lake Sector V’s IT corridor with quick access to corporate networking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>You prefer a structured, rigorous academic regimen focused on continuous technical testing and campus placements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>You seek an audited ₹6.00 LPA median placement benchmark and are applying via the zero-fee IEMJEE route.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Your educational budget accommodates the ₹9,45,000 4-year tuition fee schedule.</span>
                </li>
              </ul>
            </div>

            {/* Choose Heritage */}
            <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
              <h3 className="font-bold text-blue-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Choose Heritage Institute of Technology if:</span>
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>You desire a traditional, expansive 10+ acre collegiate campus with sports facilities, cultural fests, and on-campus hostels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>You prefer the state university (MAKAUT) affiliation and centralized WBJEEB seat allotment process.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>You want a significantly lower total tuition expense (~₹5.46L vs ₹9.45L at IEM), saving ~₹4 Lakh across 4 years.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>You have secured a strong WBJEE General Merit Rank within Heritage closing ranks (e.g. ~3,200–5,100 for CSE).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Student Queries</span>
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#102A56]">
              Frequently Asked Questions: IEM vs Heritage
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct, sourced answers regarding admission choices, fees, and campus life.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all open:border-[#1455B8]/60 open:shadow-md"
              >
                <summary className="flex items-center justify-between gap-4 p-5 text-sm sm:text-base font-bold text-[#102A56] cursor-pointer select-none group-hover:text-[#1455B8] transition-colors list-none">
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 group-open:bg-[#1455B8] group-open:text-white text-slate-600 font-mono text-xs flex items-center justify-center shrink-0 transition-colors">
                      {idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Next Steps CTA Strip */}
        <div className="p-6 rounded-2xl bg-[#EAF2FF] border border-[#BFDBFE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-base text-[#102A56]">
              Need Personalized Guidance on WBJEE Choice Filling?
            </h3>
            <p className="text-xs text-slate-600">
              Run your WBJEE rank through our predictor or consult with independent counsellors.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/wbjee-predictor"
              className="px-4 py-2 rounded-xl bg-[#102A56] hover:bg-[#0a1c38] text-white font-bold text-xs shadow-xs transition-colors"
            >
              WBJEE Predictor
            </Link>
            <Link
              href="/cutoffs"
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#1455B8] font-bold text-xs border border-[#BFDBFE] transition-colors"
            >
              Cutoff Archives
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
