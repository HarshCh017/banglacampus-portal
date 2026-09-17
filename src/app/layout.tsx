import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileStickyBar } from '@/components/MobileStickyBar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030712',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://iem-admissions.edu.in'),
  title: {
    default: 'B.Tech Admission 2027 | Institute of Engineering & Management (IEM), Kolkata',
    template: '%s | Institute of Engineering & Management (IEM), Kolkata',
  },
  description:
    'Official B.Tech admission acquisition & guidance for Institute of Engineering & Management (IEM), Kolkata. Check preliminary branch eligibility, view transparent fees, and learn about IEMJEE 2027.',
  keywords: [
    'IEM Kolkata',
    'Institute of Engineering and Management',
    'IEM B.Tech admission',
    'IEM Kolkata CSE fees',
    'IEMJEE 2027',
    'IEM Kolkata cutoffs',
    'IEM Salt Lake Sector V',
    'autonomous engineering college Kolkata',
  ],
  authors: [{ name: 'Institute of Engineering & Management Admission Guidance' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://iem-admissions.edu.in',
    title: 'B.Tech Admission 2027 | Institute of Engineering & Management (IEM), Kolkata',
    description:
      'Check preliminary branch cutoffs, transparent semester fees, and application pathways for IEM Kolkata.',
    siteName: 'IEM Kolkata B.Tech Admissions',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Institute of Engineering & Management',
    alternateName: ['IEM Kolkata', 'IEM Salt Lake'],
    disambiguatingDescription:
      'Autonomous engineering and management college in Salt Lake Sector V, Kolkata, affiliated with MAKAUT and approved by AICTE.',
    url: 'https://iem.edu.in',
    email: 'admissions@iem.edu.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ashram Building, GN-34/2, Sector V, Salt Lake Electronics Complex',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700091',
      addressCountry: 'IN',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'NAAC Grade A Accredited',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'AICTE Approved',
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
