import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CounsellingClient } from './CounsellingClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free WBJEE Admission Guidance & College Shortlisting | BengalCampus',
  description:
    'Request 1-on-1 independent engineering admission guidance for West Bengal colleges. Rank-based shortlisting, fee structure comparisons, and choice-filling advisory with zero agent commissions.',
  alternates: {
    canonical: 'https://bengalcampus.in/counselling',
  },
  openGraph: {
    title: 'Free WBJEE Admission Guidance | BengalCampus',
    description:
      'Independent academic advisory and rank-based college shortlisting for West Bengal engineering candidates.',
    url: 'https://bengalcampus.in/counselling',
    type: 'website',
  },
};

export default function CounsellingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1455B8] animate-spin" />
          <p className="text-xs text-[#64748B] font-medium">Loading guidance desk...</p>
        </div>
      }
    >
      <CounsellingClient />
    </Suspense>
  );
}
