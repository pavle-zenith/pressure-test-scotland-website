import { SITE, NAP_ONE_LINE } from '@/data/site';
import { SERVICES } from '@/data/services';
import SmartLink from '@/components/ui/SmartLink';
import styles from './Footer.module.css';

const year = 2026;

// Link columns. Hrefs that are not live yet render inert via SmartLink, so a
// demo never hits a 404. The arrow glyph is decorative and CSS-drawn.
const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Services',
    links: SERVICES.slice(0, 4).map((s) => ({ label: s.name, href: `/services#${s.slug}` })),
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Coverage',
    links: [
      { label: 'Ayrshire', href: '/contact' },
      { label: 'Glasgow', href: '/contact' },
      { label: 'Edinburgh', href: '/contact' },
      { label: 'Central Belt', href: '/contact' },
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SmartLink>
          </div>

          {/* Base: identity left, contact right, over a hairline divider. */}
          <div className={styles.base}>
            <div className={styles.baseLeft}>
              <SmartLink href="/" className={styles.wordmark} aria-label={`${SITE.name}, home`}>
                {SITE.name}
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
