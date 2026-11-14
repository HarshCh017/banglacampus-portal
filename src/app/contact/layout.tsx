import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Student Admissions Support | BengalCampus',
  description:
    'Get in touch with the BengalCampus editorial & student counselling desk. Inquire about college profiles, report data corrections, or seek WBJEE admission guidance.',
  alternates: {
    canonical: 'https://bengalcampus.in/contact',
  },
  openGraph: {
    title: 'Contact BengalCampus | West Bengal College Guidance Desk',
    description:
      'Contact our editorial and admissions verification team for WBJEE cutoffs, fee corrections, or guidance.',
    url: 'https://bengalcampus.in/contact',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
