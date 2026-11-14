import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { GuidesLibraryClient } from '../guides/GuidesLibraryClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Admission & Counselling Insights | BengalCampus Guides',
  description:
    'Research-backed guides for West Bengal engineering admissions, WBJEE choice-filling strategies, autonomous college accreditations, and regulatory compliance.',
  alternates: {
    canonical: 'https://bengalcampus.in/guides',
  },
};

export default function BlogIndexPage() {
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
