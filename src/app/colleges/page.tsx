import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CollegesDirectory } from './CollegesDirectory';
import { Loader2, ChevronRight } from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { formatLocation } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Top Engineering Colleges in West Bengal 2027 | WBJEE & NIRF',
  description:
    'Search and filter 20 verified engineering institutions in West Bengal. Compare audited B.Tech tuition fees, NIRF ranks, NAAC grades, and WBJEE cutoffs.',
  alternates: {
    canonical: 'https://bengalcampus.in/colleges',
  },
  openGraph: {
    title: 'Top Engineering Colleges in West Bengal 2027 | BengalCampus Directory',
    description:
      'Explore 20 verified engineering colleges in West Bengal with field-level provenance, official cutoffs, and transparent tuition fee structures.',
    url: 'https://bengalcampus.in/colleges',
    type: 'website',
    images: [
      {
        url: '/images/colleges/jadavpur-university-engineering.jpg',
        width: 1200,
        height: 675,
        alt: 'Top Engineering Colleges in West Bengal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Engineering Colleges in West Bengal 2027 | BengalCampus',
    description:
      'Search verified WB engineering institutions by district, branch, cutoffs, and fee bands.',
    images: ['/images/colleges/jadavpur-university-engineering.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CollegesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Verified Engineering Colleges in West Bengal',
    description: 'Audited directory of approved engineering colleges in West Bengal with AICTE, NIRF and WBJEEB provenance.',
    numberOfItems: VERIFIED_COLLEGES.length,
    itemListElement: VERIFIED_COLLEGES.map((college, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: college.name,
      url: `https://bengalcampus.in/colleges/${college.slug}`,
      description: `${college.category} institution in ${formatLocation(college.city, college.district)}. Code: ${college.wbjeebCode}.`,
    })),
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* 1. Breadcrumb Navigation (Server-rendered for instant indexing) */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
        <Link href="/" className="hover:text-[#1455B8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-[#102A56]">Colleges</span>
      </nav>

      {/* 2. SSR Page Header & Descriptive Context */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight">
          Engineering Colleges in West Bengal (2027 Admissions)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Comprehensive directory of 20 verified engineering institutions across West Bengal for 2027 admissions. Filter by government vs autonomous status, district location, tuition fee ceiling, and NIRF / NAAC accreditation.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Loading verified colleges directory...</p>
          </div>
        }
      >
        <CollegesDirectory />
      </Suspense>
    </div>
  );
}
