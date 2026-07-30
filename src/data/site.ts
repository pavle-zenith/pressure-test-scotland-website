// Single source of truth for the business identity and global config.
// Header, Footer, MobileActionBar and every JSON-LD node import from here.
// Nothing else in the codebase hard-codes the phone number or address.

export interface NavItem {
  label: string;
  href: string;
}

export const SITE = {
  // Canonical production origin. Everything (canonical tags, schema @id,
  // sitemap, OG urls) derives from this one value. WORKING ASSUMPTION until
  // David confirms www vs apex and .co.uk vs .scot. Keep in sync with
  // astro.config.mjs `site`.
  host: 'https://www.pressuretestscotland.co.uk',

  // Names. Confirmed publishable 2026-07-17.
  name: 'Pressure Test Scotland',
  legalName: 'Pressure Test Scotland (Water) Ltd',
  shortName: 'Pressure Test Scotland',

  // Company registration. Confirmed.
  companyNumber: 'SC457216',
  foundingYear: 2013,

  // One-line description reused in meta and schema.
  description:
    'One specialist for the whole water mains commissioning stage. Data-logged pressure testing, chlorination and UKAS-lab sampling across Scotland, based in Ayr.',

  // Contact. Confirmed from the client's own site 2026-07-17.
  phone: {
    display: '07749 245626',
    // E.164 for tel: links. 07749 -> +44 7749.
    href: 'tel:+447749245626',
  },
  email: {
    display: 'pressuretestscotland@yahoo.co.uk',
    href: 'mailto:pressuretestscotland@yahoo.co.uk',
    confirmed: true,
  },

  // NAP address. Confirmed publishable 2026-07-17.
  address: {
    street: '4 Newark Crescent',
    locality: 'Doonfoot',
    city: 'Ayr',
    region: 'South Ayrshire',
    postalCode: 'KA7 4HP',
    countryCode: 'GB',
  },

  // Coverage. Confirmed: Ayr base, Scotland-wide delivery.
  areaServed: [
    'Ayrshire',
    'Glasgow',
    'Edinburgh',
    'Lanarkshire',
    'Central Belt',
    'Stirling',
    'Fife',
    'Perth and Kinross',
    'Dumfries and Galloway',
    'Scottish Borders',
    'Scotland',
  ],

  // Primary navigation. About and Projects removed from the nav (2026-07-30).
  // Contact is a real nav item so users scanning for it find it, in addition to
  // the header's Get a Quote button. Projects stays unlinked and noindexed
  // until there are 2+ real, cleared jobs to show.
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ] as NavItem[],

  // External profiles for schema `sameAs`. Add once confirmed.
  sameAs: [] as string[],
} as const;

/** Full single-line NAP string, used where one address line is needed. */
export const NAP_ONE_LINE = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.city}, ${SITE.address.postalCode}`;
