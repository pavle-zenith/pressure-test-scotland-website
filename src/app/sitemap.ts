import type { MetadataRoute } from 'next';
import { SERVICE_DETAILS } from '@/data/service-details';
import { absolute } from '@/lib/url';

// Indexable routes only. /projects is intentionally excluded while it is thin
// (noindex, one cleared job); add it back here once it earns a nav link.
const STATIC_PATHS = ['/', '/services', '/contact', '/privacy-policy', '/cookie-policy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = Object.keys(SERVICE_DETAILS).map((slug) => `/services/${slug}`);
  return [...STATIC_PATHS, ...servicePaths].map((path) => ({
    url: absolute(path),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
