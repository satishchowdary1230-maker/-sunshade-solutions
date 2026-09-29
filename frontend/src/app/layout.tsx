import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Sunshade Solutions | Architectural Tensile Structures & Industrial Sheds Hyderabad',
  description:
    'Premier industrial manufacturer of architectural tensile fabric structures, commercial car parking sheds, polycarbonate canopies, and PEB steel sheds in Mallapur IDA, Hyderabad. Contact S.C. Sharma: +91 99513 54848.',
  keywords: [
    'Tensile Fabric Structures Hyderabad',
    'Car Parking Sheds Hyderabad',
    'Polycarbonate Canopies Mallapur',
    'Industrial PEB Steel Sheds Telangana',
    'Swimming Pool Tensile Shades',
    'Sunshade Solutions S.C. Sharma',
    'Tensile Structure Manufacturer Telangana',
  ],
  authors: [{ name: 'Sunshade Solutions' }],
  openGraph: {
    title: 'Sunshade Solutions - Industrial Tensile Structures Hyderabad',
    description:
      'Engineered tensile fabric structures, cantilever car parking sheds, and heavy industrial sheds fabricated at IDA Mallapur, Hyderabad.',
    url: 'https://sunshadeindia.com',
    siteName: 'Sunshade Solutions',
    images: [
      {
        url: '/images/hero/tensile_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunshade Solutions Architectural Tensile Structure',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
