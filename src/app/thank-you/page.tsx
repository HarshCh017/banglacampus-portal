import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ThankYouContent } from './ThankYouContent';

export const metadata: Metadata = {
  title: 'Guidance Request Confirmed | BengalCampus Admissions Desk',
  description:
    'Thank you for submitting your WBJEE admission guidance and college selection request. Our verified academic counsellors will contact you shortly.',
  alternates: {
    canonical: 'https://bengalcampus.in/thank-you',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-600">Loading confirmation details...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
