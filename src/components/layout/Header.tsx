'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/data/site';
import { isLiveHref } from '@/lib/routes';
import { logoHorizontal } from '@/assets/images';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Escape closes the open mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${SITE.name}, home`} onClick={() => setOpen(false)}>
          <Image src={logoHorizontal} alt="" className={styles.logoImg} priority sizes="320px" />
        </Link>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav id="primary-nav" className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Primary">
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
              <Icon name="phone" size={16} />
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
