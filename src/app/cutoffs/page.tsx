import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CutoffExplorerClient } from './CutoffExplorerClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WBJEE Rank & Cutoff Explorer | BanglaCampus',
  description:
    'Explore historical WBJEE closing ranks across West Bengal engineering colleges. Analyze GMR cutoffs for Jadavpur University, KGEC, IEM, Heritage, JGEC, and HIT with verified citations.',
  openGraph: {
    title: 'WBJEE Rank & Cutoff Explorer | BanglaCampus',
    description: 'Compare historical closing ranks across West Bengal engineering colleges.',
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
