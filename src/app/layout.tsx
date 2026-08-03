import type { Metadata, Viewport } from 'next';
import '@/styles/global.css';
import { archivo, manrope, plexMono } from './fonts';
import { SITE } from '@/data/site';
import { absolute } from '@/lib/url';
import { orgSchema, websiteSchema } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileActionBar from '@/components/layout/MobileActionBar';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.host),
  title: {
    default: `Water Mains Pressure Testing Ayr | ${SITE.shortName}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  alternates: { canonical: absolute('/') },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization + WebSite ship on every page; pages add their own nodes.
  const globalNodes = [orgSchema(), websiteSchema()];

  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body>
        <JsonLd nodes={globalNodes} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
