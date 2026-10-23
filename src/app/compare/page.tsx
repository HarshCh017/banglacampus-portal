import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CompareView } from './CompareView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Side-by-Side College Comparison (Max 3) | West Bengal Engineering',
  description:
    'Compare up to three engineering colleges in West Bengal side-by-side. Traceable tuition fees, AICTE and NAAC approvals, NIRF rank comparisons, and B.Tech branch matrices.',
  openGraph: {
    title: 'College Comparison Matrix | BanglaCampus',
    description: 'Compare West Bengal engineering colleges side by side with zero fake data.',
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
