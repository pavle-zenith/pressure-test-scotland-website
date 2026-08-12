import Image from 'next/image';
import { SITE, NAP_ONE_LINE } from '@/data/site';
import { SERVICES } from '@/data/services';
import { logoHorizontal } from '@/assets/images';
import SmartLink from '@/components/ui/SmartLink';
import Icon from '@/components/ui/Icon';
import styles from './Footer.module.css';

const year = 2026;

// Link columns. Hrefs that are not live yet render inert via SmartLink, so a
// demo never hits a 404. The arrow glyph is decorative and CSS-drawn.
const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    // Link the ranking detail pages directly, with descriptive anchor text, so
    // every page passes internal-link equity to the SEO money pages (not the hub
    // anchor). Detail routes are gated live per slug in lib/routes.ts.
    heading: 'Services',
    links: SERVICES.slice(0, 4).map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    heading: 'Company',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    // Point at the coverage section, not the contact form: a user clicking
    // "Glasgow" expects coverage info. Swap to /coverage/<area> pages when built.
    heading: 'Coverage',
    links: [
      { label: 'Ayrshire', href: '/#coverage' },
      { label: 'Glasgow', href: '/#coverage' },
      { label: 'Edinburgh', href: '/#coverage' },
      { label: 'Central Belt', href: '/#coverage' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy-policy' },
      { label: 'Cookies', href: '/cookie-policy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.block}>
          {/* Top: link columns, socials only if confirmed profiles exist. */}
          <div className={styles.top}>
            {COLUMNS.map((col) => (
              <nav key={col.heading} className={styles.col} aria-label={col.heading}>
                <h2 className={styles.heading}>{col.heading}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label + l.href}>
                      <SmartLink href={l.href} className={styles.link}>{l.label}</SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {SITE.sameAs.length > 0 && (
              <ul className={styles.social} aria-label="Social profiles">
                {SITE.sameAs.map((href) => (
                  <li key={href}>
                    <a href={href} className={styles.socialLink} rel="me noopener" target="_blank">
                      <span className={styles.socialDot} aria-hidden="true" />
                      <span className="visually-hidden">{new URL(href).hostname}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* The close: giant statement + white pill CTA. */}
          <div className={styles.statementRow}>
            <p className={styles.statement}>
              One specialist for the whole<br />water mains commissioning stage.
            </p>
            <SmartLink href="/contact" className={styles.pill}>
              Get a Quote
              <Icon name="arrow-right" size={18} />
            </SmartLink>
          </div>

          {/* Base: identity left, contact right, over a hairline divider. */}
          <div className={styles.base}>
            <div className={styles.baseLeft}>
              <SmartLink href="/" className={styles.brand} aria-label={`${SITE.name}, home`}>
                <span className={styles.brandChip}>
                  <Image src={logoHorizontal} alt="" className={styles.brandImg} sizes="220px" />
                </span>
              </SmartLink>
              <p className={styles.reg}>
                &copy; {SITE.foundingYear}&ndash;{year} {SITE.legalName}. Registered in Scotland, company no. {SITE.companyNumber}.
              </p>
            </div>
            <address className={styles.baseRight}>
              <a href={SITE.phone.href} className={styles.phone}>{SITE.phone.display}</a>
              <span className={styles.nap}>{NAP_ONE_LINE}</span>
              <span className={styles.nap}>Based in Ayr, operating Scotland-wide</span>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
