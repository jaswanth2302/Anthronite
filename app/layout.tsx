import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  display: "swap",
});

const googleSans = localFont({
  src: "./fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
  variable: "--font-google-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["Inter", "-apple-system", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anthronite.tech'),
  title: {
    default: 'Anthronite | AI Research & Engineering Lab',
    template: '%s | Anthronite',
  },
  description: 'High-end AI research lab and engineering firm architecting sovereign infrastructure and autonomous systems.',
  keywords: [
    'Sovereign AI Infrastructure',
    'Anthronite Systems',
    'AI Research Lab India',
    'Agentic Workflows',
    'Industrial Intelligence',
    'Machine Learning Engineering',
    'Full-Stack Architecture',
    'Offensive Security',
    'Chennai AI Lab',
    'Autonomous Systems',
  ],
  authors: [{ name: 'Jaswanth Kanna S', url: 'https://linkedin.com/in/jaswanth2302' }],
  creator: 'Jaswanth Kanna S',
  publisher: 'Anthronite Systems',
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
  icons: {
    icon: '/logo no bg.png',
    apple: '/logo no bg.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anthronite.tech',
    siteName: 'Anthronite Systems',
    title: 'Anthronite | AI Research & Engineering Lab',
    description: 'High-end AI research lab and engineering firm architecting sovereign infrastructure and autonomous systems.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Anthronite - Intelligence, Shipped.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anthronite | AI Research & Engineering Lab',
    description: 'High-end AI research lab and engineering firm architecting sovereign infrastructure and autonomous systems.',
    images: ['/opengraph-image.png'],
    creator: '@Anthronite85747',
    site: '@Anthronite85747',
  },
  alternates: {
    canonical: 'https://anthronite.tech',
    languages: {
      'en-US': 'https://anthronite.tech',
    },
  },
  other: {
    'ICBM': '13.0827, 80.2707',
    'geo.position': '13.0827;80.2707',
    'geo.region': 'IN-TN',
    'geo.placename': 'Chennai',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ResearchOrganization',
        '@id': 'https://anthronite.tech/#organization',
        name: 'Anthronite Systems',
        alternateName: 'Anthronite',
        url: 'https://anthronite.tech',
        logo: {
          '@type': 'ImageObject',
          url: 'https://anthronite.tech/logo no bg.png',
          width: 512,
          height: 512,
        },
        description: 'High-end AI research lab and engineering firm architecting sovereign infrastructure and autonomous systems.',
        foundingDate: '2025',
        knowsAbout: [
          'Artificial Intelligence',
          'Machine Learning',
          'Sovereign Infrastructure',
          'Full-Stack Architecture',
          'Offensive Security',
          'Agentic Workflows',
          'Autonomous Systems',
          'Industrial Intelligence',
        ],
        areaServed: [
          {
            '@type': 'Place',
            name: 'Global',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
          {
            '@type': 'City',
            name: 'Chennai',
          },
        ],
        sameAs: [
          'https://x.com/Anthronite85747',
          'https://github.com/anthronite',
          'https://linkedin.com/company/anthronite',
          'https://instagram.com/anthronite',
        ],
        founder: {
          '@id': 'https://anthronite.tech/#founder',
        },
      },
      {
        '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
        '@id': 'https://anthronite.tech/#localbusiness',
        name: 'Anthronite Systems',
        image: 'https://anthronite.tech/logo no bg.png',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 13.0827,
          longitude: 80.2707,
        },
        url: 'https://anthronite.tech',
        telephone: '+91-9176101672',
        priceRange: 'Enterprise',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://anthronite.tech/#website',
        url: 'https://anthronite.tech',
        name: 'Anthronite Systems',
        description: 'High-end AI research lab and engineering firm architecting sovereign infrastructure and autonomous systems.',
        publisher: {
          '@id': 'https://anthronite.tech/#organization',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': 'https://anthronite.tech/#founder',
        name: 'Jaswanth Kanna S',
        jobTitle: 'Founder',
        worksFor: {
          '@id': 'https://anthronite.tech/#organization',
        },
        sameAs: [
          'https://linkedin.com/in/jaswanth2302',
          'https://github.com/jaswanth2302',
          'https://instagram.com/jaswanth.explains',
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${googleSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
