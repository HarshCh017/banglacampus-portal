import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CounsellingSimulatorClient } from './CounsellingSimulatorClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WBJEE Choice-Filling Simulator & Preference Sequencing | BanglaCampus',
  description:
    'Simulate your WBJEE e-counselling choices with verified 3-tier preference sequencing (Safe, Target, Ambitious). Order college codes and export your personalized choice list.',
  openGraph: {
    title: 'WBJEE Choice-Filling Simulator | BanglaCampus',
    description: 'Evidence-backed preference sequencing engine for West Bengal engineering counselling.',
  },
};

export default function CounsellingSimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading WBJEE choice-filling simulator...</p>
        </div>
      }
    >
      <CounsellingSimulatorClient />
    </Suspense>
  );
}
