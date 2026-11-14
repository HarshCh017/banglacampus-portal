import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { ComparisonDock } from '@/components/ComparisonDock';
import { StudentEnquiryModal } from '@/components/StudentEnquiryModal';
import { FloatingConsultationButton } from '@/components/FloatingConsultationButton';
import { LoginModal } from '@/components/LoginModal';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ComparisonProvider } from '@/context/ComparisonContext';
import { AuthProvider } from '@/context/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#102A56',
};

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = rawSiteUrl && !rawSiteUrl.includes('localhost') ? rawSiteUrl : 'https://bengalcampus.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BengalCampus | Top West Bengal Engineering Colleges, WBJEE 2026 Cutoffs & Fees',
    template: '%s | BengalCampus',
  },
  description:
    'Independent engineering-college discovery and admission intelligence platform for West Bengal. Compare verified 2026 B.Tech programs, tuition fees, AICTE/NAAC accreditations, and WBJEE historical cutoffs.',
  authors: [{ name: 'BengalCampus Editorial & Research Desk' }],
  applicationName: 'BengalCampus',
  category: 'Education',
  keywords: [
    'IEM college',
    'IEM Kolkata',
    'IEM college Kolkata',
    'Institute of Engineering and Management',
    'WBJEE 2026 cutoffs',
    'West Bengal engineering colleges',
    'WBJEE college predictor',
    'B.Tech admission West Bengal',
    'Jadavpur University cutoff',
    'MAKAUT colleges',
    'WBJEEB counselling',
    'engineering college fees West Bengal',
    'NAAC accredited colleges WB',
    'AICTE approved colleges West Bengal',
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'googlef7ed5998c447340c',
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          'msvalidate.01': [process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION],
        }
      : undefined,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'BengalCampus | West Bengal Engineering Colleges, WBJEE Predictor & Fees',
    description:
      'Explore verified engineering colleges in West Bengal. Traceable regulatory sources, side-by-side comparison, and real tuition fees.',
    siteName: 'BengalCampus',
    images: [
      {
        url: '/images/colleges/jadavpur-university-engineering.jpg',
        width: 1200,
        height: 675,
        alt: 'BengalCampus - West Bengal Engineering Colleges Discovery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bengalcampus',
    creator: '@bengalcampus',
    title: 'BengalCampus | West Bengal Engineering Colleges, WBJEE Predictor & Fees',
    description:
      'Explore verified engineering colleges in West Bengal. Traceable regulatory sources, side-by-side comparison, and real tuition fees.',
    images: ['/images/colleges/jadavpur-university-engineering.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BengalCampus',
    url: 'https://bengalcampus.in',
    description: 'Independent engineering-college discovery and admission intelligence for West Bengal.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://bengalcampus.in/colleges?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'BengalCampus',
    url: 'https://bengalcampus.in',
    logo: 'https://bengalcampus.in/icon.svg',
    description:
      'Independent higher education research and admission intelligence platform for West Bengal engineering institutions.',
    foundingDate: '2024',
    areaServed: {
      '@type': 'State',
      name: 'West Bengal',
      containedIn: { '@type': 'Country', name: 'India' },
    },
    knowsAbout: [
      'WBJEE 2026',
      'B.Tech Admissions',
      'Engineering Colleges',
      'West Bengal Higher Education',
      'WBJEEB Counselling Cutoffs',
      'AICTE Approved Institutions',
      'NIRF Ranking'
    ],
    sameAs: [
      'https://twitter.com/bengalcampus',
      'https://www.linkedin.com/company/bengalcampus',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-33-2414-6666',
      contactType: 'Admissions Advisory Desk',
      availableLanguage: ['English', 'Bengali', 'Hindi'],
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAFBFD] text-[#172033] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1455B8] focus:text-white focus:rounded-md focus:shadow-xl focus:ring-2 focus:ring-white font-medium"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <AuthProvider>
          <ComparisonProvider>
            <Header />
            <main id="main-content" className="flex-grow focus:outline-none">
              {children}
            </main>
            <Footer />
            <ComparisonDock />
            <CookieConsent />
            <StudentEnquiryModal />
            <FloatingConsultationButton />
            <LoginModal />
          </ComparisonProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
