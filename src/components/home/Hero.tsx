import Image from 'next/image';
import { SITE } from '@/data/site';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import QuoteForm from '@/components/ui/QuoteForm';
import { confirmedAccreditations } from '@/data/accreditations';
import { heroPipes } from '@/assets/images';
import styles from './Hero.module.css';

// Certification standards shown on the client's Wix draft. These are standards
// the work is carried out to. NOTE: not individually sign-off-confirmed with
// David yet; kept here because the draft leads with them. Confirm before launch.
const STANDARDS = [
  'BS EN 805',
  'WIS 4-01-03',
  'BS 8558',
  'EUSR National Water Hygiene',
  'UKAS-accredited lab sampling',
  'Scottish Water Byelaws 2014',
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image src={heroPipes} alt="" fill priority sizes="100vw" className={styles.photo} placeholder="blur" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <div className={styles.top}>
            <h1 id="hero-title" className={styles.title}>
              Scotland-wide pipe pressure testing based in Ayr
            </h1>
            <p className={styles.sub}>
              Data-logged pressure testing, chlorination and UKAS-lab sampling across Scotland. We turn up when we are booked and do our best to get you a first-time pass.
            </p>

            <div className={styles.actions}>
              <Button href="#quote-form" variant="primary" size="lg" arrow>Get my quote</Button>
              <Button href={SITE.phone.href} variant="white" size="lg">
                <Icon name="phone" size={18} />
                {SITE.phone.display}
              </Button>
            </div>

            <figure className={styles.pull}>
              <blockquote>Over 20 years, he has never let me down once.</blockquote>
              <figcaption>Jim McCormack, Utilities Manager, TSL Contractors</figcaption>
            </figure>
          </div>

          {confirmedAccreditations.length > 0 && (
            <div className={styles.certs}>
              <p className={styles.certsLabel}>Awards and certifications</p>
              <ul className={styles.certsList}>
                {confirmedAccreditations.map((a) => (
                  <li key={a.id}>{a.label}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.form} id="quote-form">
          <QuoteForm source="home-hero" showRating submitLabel="Get my quote" />
        </div>
      </div>

      <div className={styles.standards}>
        <div className={`container ${styles.standardsRow}`}>
          <span className={styles.standardsLabel}>UK-wide tested &amp; certified</span>
          <ul>
            {STANDARDS.map((s) => (
              <li key={s}><span className={styles.dot} aria-hidden="true" />{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
