import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ThankYouContent } from './ThankYouContent';

export const metadata: Metadata = {
  title: 'Guidance Request Confirmed | Institute of Engineering & Management (IEM)',
  description: 'Thank you for submitting your admission guidance request for IEM Kolkata.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-600">Loading confirmation details...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
