import Link from 'next/link';
import { SITE } from '@/data/site';
import { SERVICES } from '@/data/services';
import { confirmedAccreditations } from '@/data/accreditations';
import styles from './Footer.module.css';

const year = 2026;

export default function Footer() {
  const footerServices = SERVICES.slice(0, 5);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label={`${SITE.name}, home`}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="6" fill="var(--color-accent)" />
              <path d="M9 26 C9 15 20 15 20 15 C20 15 31 15 31 26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 26h12" stroke="var(--color-mint)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span>{SITE.name}</span>
          </Link>
          <p className={styles.tagline}>
            One specialist for the whole water mains commissioning stage. Based in Ayr, working Scotland-wide.
          </p>
          {confirmedAccreditations.length > 0 && (
            <ul className={styles.badges}>
              {confirmedAccreditations.map((a) => <li key={a.id}>{a.label}</li>)}
            </ul>
          )}
        </div>

        <nav className={styles.col} aria-label="Services">
          <h2 className={styles.heading}>Services</h2>
          <ul>
            {footerServices.map((s) => (
              <li key={s.slug}><Link href={`/services#${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Company">
          <h2 className={styles.heading}>Company</h2>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Contact</h2>
          <a className={`${styles.contact} ${styles.contactStrong}`} href={SITE.phone.href}>{SITE.phone.display}</a>
          <a className={styles.contact} href={SITE.email.href}>{SITE.email.display}</a>
          <p className={styles.coverage}>Based in Ayr, operating Scotland-wide</p>
        </div>
      </div>

      <div className={`container ${styles.base}`}>
        <p>&copy; 2013–{year} {SITE.legalName}. Registered in Scotland, company no. {SITE.companyNumber}.</p>
        <ul className={styles.legal}>
          <li><Link href="/privacy-policy">Privacy</Link></li>
          <li><Link href="/accessibility">Accessibility</Link></li>
        </ul>
      </div>
    </footer>
  );
}
