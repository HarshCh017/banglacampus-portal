import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CutoffExplorerClient } from './CutoffExplorerClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WBJEE 2026 Cutoff: College-Wise Opening & Closing Ranks | BengalCampus',
  description:
    'Explore historical WBJEE 2026 college-wise and branch-wise cutoff data. Compare published counselling records by college and branch, and verify official notices before making admission choices.',
  alternates: {
    canonical: 'https://bengalcampus.in/cutoffs',
  },
  openGraph: {
    title: 'WBJEE 2026 Cutoff: College-Wise Opening & Closing Ranks | BengalCampus',
    description:
      'Compare published WBJEE 2026 Round 1, Round 2, and Mop-Up closing ranks across top West Bengal engineering colleges.',
    url: 'https://bengalcampus.in/cutoffs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WBJEE 2026 Cutoff: College-Wise Opening & Closing Ranks | BengalCampus',
    description: 'Historical WBJEE 2026 closing rank archives for all engineering branches and category reservations.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CutoffsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading WBJEE cutoff intelligence...</p>
        </div>
      }
    >
      <CutoffExplorerClient />
    </Suspense>
  );
}
