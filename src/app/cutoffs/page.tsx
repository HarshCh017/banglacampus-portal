import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CutoffExplorerClient } from './CutoffExplorerClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WBJEE Cutoffs 2027 | College-wise Closing Ranks & Benchmarks',
  description:
    'Explore official WBJEE 2027 projected cutoffs and closing ranks across West Bengal engineering colleges. Analyze GMR cutoffs for Jadavpur University, KGEC, IEM, Heritage, JGEC, and HIT with verified citations.',
  alternates: {
    canonical: 'https://bengalcampus.in/cutoffs',
  },
  openGraph: {
    title: 'WBJEE Cutoffs & Closing Ranks Explorer | BengalCampus',
    description:
      'Explore official WBJEE Round 1, Round 2, and Mop-Up closing ranks across top West Bengal engineering colleges.',
    url: 'https://bengalcampus.in/cutoffs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WBJEE Cutoffs & Closing Ranks Explorer | BengalCampus',
    description: 'Find WBJEE cutoffs for all engineering branches and category reservations.',
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
