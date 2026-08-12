'use client';

import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './CookieConsent.module.css';

// GA4, gated behind explicit consent (UK PECR: analytics cookies need opt-in).
// Nothing from Google loads and no cookie is set until the visitor presses
// Accept. The choice is remembered in localStorage so the banner is shown once.
// Configure the property by setting NEXT_PUBLIC_GA_ID in the environment; with
// it unset (local/preview) nothing renders and no banner shows.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = 'pts-cookie-consent'; // 'granted' | 'denied'

type Consent = 'granted' | 'denied' | null;

// Best-effort placement for a phone click, derived from where the link sits so
// we do not have to annotate every tel: link in the tree.
function placementOf(el: HTMLElement): string {
  if (el.closest('#mobile-action-bar')) return 'mobile-bar';
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  return 'body';
}

export default function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  // Read any stored choice after mount (avoids a hydration mismatch).
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'granted' || v === 'denied') setConsent(v);
    } catch {
      /* storage blocked; treat as undecided */
    }
    setReady(true);
  }, []);

  const choose = useCallback((value: 'granted' | 'denied') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  }, []);

  // Send a page_view on client-side route changes once GA is granted + loaded.
  useEffect(() => {
    if (consent !== 'granted' || !GA_ID) return;
    window.gtag?.('event', 'page_view', { page_path: pathname });
  }, [pathname, consent]);

  // Delegated phone-click tracking. Only active with consent.
  useEffect(() => {
    if (consent !== 'granted') return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="tel:"]') as HTMLElement | null;
      if (!a) return;
      window.gtag?.('event', 'phone_click', { placement: placementOf(a) });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [consent]);

  if (!GA_ID) return null;

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <section className={styles.banner} aria-label="Cookie consent">
          <p className={styles.text}>
            We would like to set Google Analytics cookies to see how visitors use the site.
            They are only set if you accept. Read our <a href="/cookie-policy">Cookie Policy</a>.
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.reject} onClick={() => choose('denied')}>
              Reject
            </button>
            <button type="button" className={styles.accept} onClick={() => choose('granted')}>
              Accept
            </button>
          </div>
        </section>
      )}
    </>
  );
}
