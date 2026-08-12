import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import { SITE } from '@/data/site';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

// Branded 404. Rendered inside the root layout, so header, footer and the
// mobile action bar wrap it for free. Points a lost visitor back to the pages
// that convert, and gives the phone number for the impatient ones.
export default function NotFound() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container-narrow">
        <p className="eyebrow eyebrow--slash">Error 404</p>
        <h1 className={styles.title}>We cannot find that page</h1>
        <p className={styles.body}>
          The page may have moved or the link may be wrong. Head back to the main
          pages below, or call us and we will point you the right way.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary" size="lg" arrow>Back to home</Button>
          <Button href="/services" variant="secondary" size="lg">All services</Button>
          <Button href="/contact" variant="secondary" size="lg">Get a quote</Button>
        </div>
        <p className={styles.call}>
          Or call <a href={SITE.phone.href}>{SITE.phone.display}</a>
        </p>
      </div>
    </section>
  );
}
