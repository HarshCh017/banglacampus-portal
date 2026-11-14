import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { FeeCalculatorClient } from './FeeCalculatorClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'West Bengal Engineering Fee Calculator | 4-Year B.Tech Tuition & Hostel Estimator',
  description:
    'Calculate the total cost of studying B.Tech across West Bengal engineering colleges. Includes verified annual tuition fees, hostel expenses, and 4-year education projections.',
  alternates: {
    canonical: 'https://bengalcampus.in/fee-calculator',
  },
  openGraph: {
    title: 'Engineering Fee Calculator | BengalCampus Tool',
    description:
      'Transparent 4-year B.Tech fee calculator for West Bengal engineering institutions.',
    url: 'https://bengalcampus.in/fee-calculator',
    type: 'website',
  },
};

export default function FeeCalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1455B8] animate-spin" />
          <p className="text-xs text-[#64748B] font-medium">Loading Fee Calculator...</p>
        </div>
      }
    >
      <FeeCalculatorClient />
    </Suspense>
  );
}
