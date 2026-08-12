import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import { absolute } from '@/lib/url';

// Builds a Next Metadata object with the house rules baked in: pipe separator in
// titles for local SEO ("Keyword, Ayr | Pressure Test Scotland"), canonical URL
// on the one canonical host, OG/Twitter, en_GB. Per-page metadata spreads the
// result and overrides as needed. Keep the whole title under ~60 chars; the
// brand already carries "Scotland", so pages only add the town (Ayr) where it
// strengthens the local signal.

interface PageMeta {
  /** Keyword-first page title; the brand is appended with a pipe. */
  title: string;
  description: string;
  /** Site-relative canonical path. */
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  noindex,
}: PageMeta): Metadata {
  const brand = SITE.shortName;
  const fullTitle = title === brand ? title : `${title} | ${brand}`;
  const canonical = absolute(path);
  // Default to the sitewide OG card so every shared link renders an image;
  // a page can still override with its own ogImage.
  const ogPath = ogImage ?? '/og.jpg';
  const images = [{ url: ogPath.startsWith('http') ? ogPath : absolute(ogPath) }];

  return {
    // `absolute` bypasses the root layout's title template, so the brand suffix
    // (added here) is not applied twice.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: 'en_GB',
      title: fullTitle,
      description,
      url: canonical,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
