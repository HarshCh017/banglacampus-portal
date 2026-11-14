import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CompareView } from './CompareView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compare Engineering Colleges in West Bengal 2027 | Side-by-Side Comparison',
  description:
    'Compare up to 3 West Bengal engineering colleges side by side. Audited tuition fees, WBJEE cutoffs, NIRF rankings, NAAC grades, and B.Tech branch matrices.',
  alternates: {
    canonical: 'https://bengalcampus.in/compare',
  },
  openGraph: {
    title: 'Compare Engineering Colleges in West Bengal | BengalCampus Matrix',
    description:
      'Compare West Bengal engineering colleges side by side with zero sponsored bias. Audited fees, cutoffs, and accreditations.',
    url: 'https://bengalcampus.in/compare',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Engineering Colleges in West Bengal | BengalCampus',
    description: 'Side-by-side comparison matrix for WBJEE aspirants: cutoffs, fees, and rankings.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading comparison matrix...</p>
        </div>
      }
    >
      <CompareView />
    </Suspense>
  );
}
