import { SERVICE_DETAILS } from '@/data/service-details';

// Which internal routes actually exist yet. Until the About / Portfolio pages
// are built, links to them should not navigate (so a client demo never hits a
// 404). External links (tel:, mailto:, http) and same-page anchors (#…) are
// always allowed. Service detail pages are live only for slugs that have
// authored content in service-details.ts.
//
// To enable a page once it is built: add its path here (or author its detail).
const LIVE_ROUTES = new Set<string>([
  '/',
  '/services',
  '/projects',
  '/contact',
  '/privacy-policy',
  '/cookie-policy',
]);

const LIVE_SERVICE_DETAILS = new Set(
  Object.keys(SERVICE_DETAILS).map((slug) => `/services/${slug}`),
);

/** True if an href is safe to navigate to right now. */
export function isLiveHref(href: string): boolean {
  if (!href) return false;
  // External protocols and same-page anchors are always fine.
  if (!href.startsWith('/')) return true;
  if (href.startsWith('/#')) return true;
  // Compare the path portion (ignore #hash and ?query).
  const path = href.split(/[?#]/)[0];
  return LIVE_ROUTES.has(path) || LIVE_SERVICE_DETAILS.has(path);
}
