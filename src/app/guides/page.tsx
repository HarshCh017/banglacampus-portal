import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { GuidesLibraryClient } from './GuidesLibraryClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WBJEE Admission Guides & Cutoff Analysis | BengalCampus',
  description:
    'Comprehensive step-by-step admission guides, WBJEE counselling choice-filling strategies, college comparisons, and fee waiver insights for West Bengal engineering candidates.',
  alternates: {
    canonical: 'https://bengalcampus.in/guides',
  },
  openGraph: {
    title: 'WBJEE Admission Guides | BengalCampus',
    description:
      'Expert research-backed admission guides and WBJEE counselling walkthroughs.',
    url: 'https://bengalcampus.in/guides',
    type: 'website',
  },
};

export default function GuidesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1455B8] animate-spin" />
          <p className="text-xs text-[#64748B] font-medium">Loading admission guides...</p>
        </div>
      }
    >
      <GuidesLibraryClient />
    </Suspense>
  );
}
