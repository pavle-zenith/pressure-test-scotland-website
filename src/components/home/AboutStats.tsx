import Image from 'next/image';
import Button from '@/components/ui/Button';
import { aboutPipeline } from '@/assets/images';
import styles from './AboutStats.module.css';

// Combined About + Stats. A tall full-bleed section with a pipeline photo behind
// a navy overlay: the about text and CTA on top, a row of real, defensible
// figures below. No placeholder repeated percentages.
const STATS = [
  // David has personally worked Scotland's water mains since 2003 (the Ltd
  // company was registered 2013 — that legal date stays in the footer/schema).
  { value: '2003', label: 'On Scotland’s water mains since' },
  { value: '3', label: 'Accreditations held' },
  { value: 'Scotland', label: 'Coverage, from an Ayr base' },
  { value: '1', label: 'Point of contact, start to certificate' },
];

export default function AboutStats() {
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <Image src={aboutPipeline} alt="" fill sizes="100vw" className={styles.photo} placeholder="blur" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.about}>
          <div className={styles.text}>
            <p className="eyebrow eyebrow--slash">About</p>
            <h2 id="about-title" className={styles.title}>About Pressure Test Scotland</h2>
            <p className={styles.body}>
              Water main pressure testing, chlorination and UKAS-lab sampling across Scotland. We supply, lay, test and commission water, fire, sprinkler and rising mains, and hand you the certificate pack that gets the main connected.
            </p>
          </div>
          <div className={styles.action}>
            <Button href="/contact" variant="primary" size="lg" arrow>Get a Quote</Button>
          </div>
        </div>

        <ul className={styles.stats}>
          {STATS.map((s) => (
            <li key={s.label} className={styles.stat}>
              <span className={styles.value}>{s.value}</span>
              <span className={styles.label}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
