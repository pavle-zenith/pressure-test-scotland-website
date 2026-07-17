import { SITE } from '../data/site';

/**
 * Turn a site-relative path into a full canonical URL on the one canonical
 * host. Every absolute URL on the site (canonical tags, schema @id/url, OG
 * urls) goes through here, so the host can never drift between them and no code
 * string-concatenates a literal domain.
 */
export function absolute(path: string = '/'): string {
  return new URL(path, SITE.host).href;
}

/** Canonical @id for the business entity. Referenced by every other node. */
export const ORG_ID = `${SITE.host}/#organization`;

/** Canonical @id for the website node. */
export const WEBSITE_ID = `${SITE.host}/#website`;
