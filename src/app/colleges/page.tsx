import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CollegesDirectory } from './CollegesDirectory';
import { Loader2 } from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';

export const metadata: Metadata = {
  title: 'Engineering Colleges Directory | West Bengal',
  description:
    'Search and filter verified engineering colleges in West Bengal. Compare tuition fees, NIRF rankings, NAAC accreditation, and B.Tech branch seat matrices.',
  openGraph: {
    title: 'Engineering Colleges Directory | BanglaCampus',
    description: 'Explore verified engineering colleges in West Bengal with field-level provenance.',
  },
};

export default function CollegesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Verified Engineering Colleges in West Bengal',
    description: 'Audited directory of approved engineering colleges in West Bengal with AICTE, NIRF and WBJEEB provenance.',
    numberOfItems: VERIFIED_COLLEGES.length,
    itemListElement: VERIFIED_COLLEGES.map((college, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: college.name,
      url: `https://banglacampus.in/colleges/${college.slug}`,
      description: `${college.category} institution in ${college.city}, ${college.district}. Code: ${college.wbjeebCode}.`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Loading verified colleges directory...</p>
          </div>
        }
      >
        <CollegesDirectory />
      </Suspense>
    </>
  );
}
