import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import { absolute } from '@/lib/url';

// Builds a Next Metadata object with the house rules baked in: dot separator in
// titles (never a pipe), canonical URL on the one canonical host, OG/Twitter,
// en_GB. Per-page metadata spreads the result and overrides as needed.

interface PageMeta {
  /** Bare page title; the brand suffix is appended with a dot. */
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
  const fullTitle = title === brand ? title : `${title} . ${brand}`;
  const canonical = absolute(path);
  const images = ogImage
    ? [{ url: ogImage.startsWith('http') ? ogImage : absolute(ogImage) }]
    : undefined;

  return {
    title: fullTitle,
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
      card: images ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      images: images?.map((i) => i.url),
    },
  };
}
