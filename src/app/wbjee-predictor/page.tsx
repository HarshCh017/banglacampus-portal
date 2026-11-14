import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { WbjeePredictorClient } from './WbjeePredictorClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WBJEE College Predictor 2026–2027 | Safe, Realistic & Ambitious College Matches',
  description:
    'Free WBJEE 2026 engineering college predictor. Enter your rank and category to generate personalized Safe, Realistic, and Ambitious college and branch matches based on verified historical closing cutoffs.',
  alternates: {
    canonical: 'https://bengalcampus.in/wbjee-predictor',
  },
  openGraph: {
    title: 'WBJEE College Predictor 2026–2027 | BengalCampus',
    description:
      'Predict your West Bengal engineering college matches by WBJEE merit rank. Multi-year cutoff analysis with 3-tier strategic sequencing.',
    url: 'https://bengalcampus.in/wbjee-predictor',
    type: 'website',
  },
};

export default function WbjeePredictorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1455B8] animate-spin" />
          <p className="text-xs text-[#64748B] font-medium">Loading WBJEE College Predictor...</p>
        </div>
      }
    >
      <WbjeePredictorClient />
    </Suspense>
  );
}
