import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { WbjeePredictorClient } from '../wbjee-predictor/WbjeePredictorClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WBJEE Choice-Filling Simulator 2026–2027 | Safe, Realistic & Ambitious College Matches',
  description:
    'Simulate your WBJEE e-counselling choices with verified 3-tier preference sequencing (Safe, Realistic, Ambitious). Order college codes and view closing cutoff probabilities.',
  alternates: {
    canonical: 'https://bengalcampus.in/counselling-simulator',
  },
  openGraph: {
    title: 'WBJEE Choice-Filling Simulator | BengalCampus Tool',
    description:
      'Evidence-backed choice filling and preference sequencing engine for West Bengal engineering counselling.',
    url: 'https://bengalcampus.in/counselling-simulator',
    type: 'website',
  },
};

export default function CounsellingSimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1455B8] animate-spin" />
          <p className="text-xs text-[#64748B] font-medium">Loading WBJEE choice simulator...</p>
        </div>
      }
    >
      <WbjeePredictorClient />
    </Suspense>
  );
}
