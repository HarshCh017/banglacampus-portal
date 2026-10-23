import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { ComparisonDock } from '@/components/ComparisonDock';
import { ComparisonProvider } from '@/context/ComparisonContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#064e3b',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://banglacampus.in'),
  title: {
    default: 'BanglaCampus | Discover & Compare Engineering Colleges in West Bengal',
    template: '%s | BanglaCampus',
  },
  description:
    'Independent, evidence-backed college discovery platform for engineering aspirants in West Bengal. Compare verified B.Tech programs, tuition fees, AICTE/NAAC accreditations, and official regulatory sources.',
  keywords: [
    'West Bengal engineering colleges',
    'WBJEE colleges list',
    'B.Tech admission West Bengal',
    'compare engineering colleges Kolkata',
    'Jadavpur University engineering',
    'IEM Kolkata',
    'Heritage Institute of Technology',
    'KGEC Kalyani',
    'MAKAUT affiliated autonomous colleges',
    'engineering college fees West Bengal',
  ],
  authors: [{ name: 'BanglaCampus Editorial & Research Desk' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://banglacampus.in',
    title: 'BanglaCampus | Discover & Compare Engineering Colleges in West Bengal',
    description:
      'Explore verified engineering colleges in West Bengal. Traceable field-level sources, side-by-side comparison, and real tuition fees.',
    siteName: 'BanglaCampus',
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
    name: 'BanglaCampus',
    url: 'https://banglacampus.in',
    description: 'Evidence-backed college discovery & comparison engine for West Bengal engineering institutions.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://banglacampus.in/colleges?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-700 focus:text-white focus:rounded-md focus:shadow-xl focus:ring-2 focus:ring-white font-medium"
        >
          Skip to main content
        </a>
        <ComparisonProvider>
          <Header />
          <main id="main-content" className="flex-grow focus:outline-none">
            {children}
          </main>
          <Footer />
          <ComparisonDock />
          <CookieConsent />
        </ComparisonProvider>
      </body>
    </html>
  );
}
