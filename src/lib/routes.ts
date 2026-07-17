// Which internal routes actually exist yet. Until the About / Services /
// Portfolio / Contact pages are built, links to them should not navigate (so a
// client demo of the home page never hits a 404). External links (tel:, mailto:,
// http) and same-page anchors (#…) are always allowed.
//
// To enable a page once it is built: add its path here (or remove the guard).
const LIVE_ROUTES = new Set<string>(['/']);

/** True if an href is safe to navigate to right now. */
export function isLiveHref(href: string): boolean {
  if (!href) return false;
  // External protocols and same-page anchors are always fine.
  if (!href.startsWith('/')) return true;
  if (href.startsWith('/#')) return true;
  // Compare the path portion (ignore #hash and ?query).
  const path = href.split(/[?#]/)[0];
  return LIVE_ROUTES.has(path);
}
