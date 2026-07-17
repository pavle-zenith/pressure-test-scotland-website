'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SITE } from '@/data/site';
import { isLiveHref } from '@/lib/routes';
import Button from '@/components/ui/Button';
import styles from './Header.module.css';

function LogoMark() {
  return (
    <span className={styles.logoMark} aria-hidden="true">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="6" fill="var(--color-accent)" />
        <path d="M9 26 C9 15 20 15 20 15 C20 15 31 15 31 26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 26h12" stroke="var(--color-mint)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${SITE.name}, home`} onClick={() => setOpen(false)}>
          <LogoMark />
          <span className={styles.logoText}>
            <span className={styles.logoName}>Pressure Test</span>
            <span className={styles.logoRegion}>Scotland</span>
          </span>
        </Link>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Primary">
          <ul className={styles.navList}>
            {SITE.nav.map((item) => (
              <li key={item.href}>
                {isLiveHref(item.href) ? (
                  <Link
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`} aria-disabled="true">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href={SITE.phone.href} variant="phone" className={styles.phone}>
              <PhoneIcon />
              {SITE.phone.display}
            </Button>
            <Button href="/contact" variant="primary" arrow className={styles.cta} onClick={() => setOpen(false)}>
              Get a Quote
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
