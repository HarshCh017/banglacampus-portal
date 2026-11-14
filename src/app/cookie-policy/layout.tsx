import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy & Client Storage | BengalCampus',
  description:
    'Understand how BengalCampus uses browser local storage to preserve your college comparison shortlist and counselling simulation with zero invasive ad trackers.',
  alternates: {
    canonical: 'https://bengalcampus.in/cookie-policy',
  },
  openGraph: {
    title: 'Cookie & Local Storage Policy | BengalCampus',
    description:
      'Transparent disclosure of browser storage and privacy controls on BengalCampus.',
    url: 'https://bengalcampus.in/cookie-policy',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
