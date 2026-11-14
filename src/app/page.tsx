import React from 'react';
import type { Metadata } from 'next';
import { HeroPredictor } from '@/components/home/HeroPredictor';
import { TrustMetricsStrip } from '@/components/home/TrustMetricsStrip';
import { CategoryCards } from '@/components/home/CategoryCards';
import { FeaturedColleges } from '@/components/home/FeaturedColleges';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { GuidesPreview } from '@/components/home/GuidesPreview';
import { GuidanceCallout } from '@/components/home/GuidanceCallout';
import { AnimatedFaqAccordion } from '@/components/home/AnimatedFaqAccordion';

export const metadata: Metadata = {
  title: 'BengalCampus | Top West Bengal Engineering Colleges, WBJEE Predictor & Fees 2026–2027',
  description:
    'Discover and compare verified engineering colleges in West Bengal. Audited WBJEE closing ranks, semester tuition fees, AICTE & NAAC approvals, and choice-filling predictor.',
  keywords: [
    'WBJEE 2026 cutoffs',
    'West Bengal engineering colleges',
    'WBJEE college predictor',
    'Jadavpur University engineering cutoffs',
    'MAKAUT colleges West Bengal',
    'B.Tech admissions Kolkata',
    'engineering colleges with lowest fees WB',
    'WBJEE counselling choice filling',
  ],
  alternates: {
    canonical: 'https://bengalcampus.in',
  },
  openGraph: {
    title: 'BengalCampus | Top West Bengal Engineering Colleges, WBJEE Predictor & Fees',
    description:
      'Compare verified engineering colleges in West Bengal. Audited WBJEE closing ranks, tuition fees, and admission predictor.',
    url: 'https://bengalcampus.in',
    siteName: 'BengalCampus',
    images: [
      {
        url: '/images/colleges/jadavpur-university-engineering.jpg',
        width: 1200,
        height: 675,
        alt: 'BengalCampus - West Bengal Engineering College Discovery',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BengalCampus | Top West Bengal Engineering Colleges, WBJEE Predictor & Fees',
    description:
      'Compare verified engineering colleges in West Bengal. Audited WBJEE cutoffs, fees, and admission predictor.',
    images: ['/images/colleges/jadavpur-university-engineering.jpg'],
  },
};

export default function HomePage() {
  const homeFaqs = [
    {
      q: 'How does BengalCampus verify engineering college data?',
      a: 'We trace every published figure including NIRF rankings, NAAC grades, AICTE approvals, approved seat capacities, and tuition circulars directly to authoritative regulatory gazettes with publication dates and verifiable provenance.',
    },
    {
      q: 'Are any colleges paying BengalCampus for higher placement or sponsored badges?',
      a: 'No. BengalCampus operates with zero admission commissions and zero sponsored placements. Rankings and directory listings are ordered by verified objective metrics such as NIRF ranks, seat codes, or user-selected filters rather than commercial sponsorship.',
    },
    {
      q: 'How does the WBJEE college predictor calculate match tiers?',
      a: 'The predictor matches your General Merit Rank (GMR) against three consecutive years of official WBJEEB Round 1, Round 2, and decentralized mop-up closing ranks. It groups institutions into Safe (>1.25x your rank), Realistic (within 10-15%), and Ambitious tiers.',
    },
    {
      q: 'How does the side-by-side comparison tool work?',
      a: 'You can select up to three colleges from anywhere in the directory. Our comparison matrix aligns regulatory approvals, tuition fee bands, campus locations, accepted entrance examinations, and B.Tech branch offerings with explicit handling of missing values.',
    },
    {
      q: 'What should I verify before paying admission or counseling fees?',
      a: 'Always cross-verify current-year notices and fee demand letters directly with the official college administration or the centralized WBJEEB counseling portal at wbjeeb.nic.in. BengalCampus provides verified public information, but institutional fee revisions can occur annually.',
    },
    {
      q: 'Is the 1-on-1 counseling guidance truly free for students?',
      a: 'Yes, 100% free. We never charge students, collect advance deposits, or steer applicants to private partner colleges. Our recommendations reflect published WBJEE seat rules and proven cutoff statistics.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="pb-16 bg-[#FAFBFD] text-[#172033]">
      {/* FAQ Schema for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Full-Width Deep Navy & Sapphire Hero with Integrated Campus Photo & Floating Glass Predictor */}
      <HeroPredictor />

      {/* 2. Floating Translucent Trust Metrics Strip Overlapping Hero Bottom Edge */}
      <TrustMetricsStrip />

      {/* Main Content Sections with Consistent Visual Rhythm */}
      <div className="space-y-4 sm:space-y-6">
        {/* 3. College Categories (State Univs, Govt Colleges, Autonomous/Private) */}
        <CategoryCards />

        {/* 4. Featured Colleges (Image-led carousel with navigation controls) */}
        <FeaturedColleges />

        {/* 5. How the Predictor Works (Deep Navy Feature Section) */}
        <HowItWorksSection />

        {/* 6. Latest Admission Guides */}
        <GuidesPreview />

        {/* 7. Guidance CTA Banner */}
        <GuidanceCallout />
      </div>

      {/* 8. Frequently Asked Questions */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1455B8] bg-[#EAF2FF] px-3 py-1 rounded-full border border-[#BFDBFE]">
            Platform Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#102A56] mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
            How BengalCampus collects regulatory data, maintains independence, and guides students.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatedFaqAccordion faqs={homeFaqs} />
        </div>
      </section>
    </div>
  );
}
