import Image from 'next/image';
import { COVERAGE_INTRO, COVERAGE_AREAS } from '@/data/coverage';
import { coverageScotland } from '@/assets/images';
import styles from './Coverage.module.css';

// Named areas as plain crawlable text (never a bare map graphic). Heading and
// intro top-left, then the region chips wrapping full-width below. The local
// SEO section and the source of truth for phase-3 location pages.
function Pin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.pin}>
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function Coverage() {
  return (
    <section id="coverage" className={`section section--alt ${styles.coverage}`} aria-labelledby="coverage-title">
      <Image src={coverageScotland} alt="" fill sizes="100vw" className={styles.texture} placeholder="blur" aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2 id="coverage-title" className={styles.title}>Based in Ayr. Working Scotland-wide.</h2>
          <p className={styles.intro}>{COVERAGE_INTRO}</p>
        </div>

        <ul className={styles.areas}>
          {COVERAGE_AREAS.map((area) => (
            <li key={area.name} className={styles.area}>
              <Pin />
              <span className={styles.name}>{area.name}</span>
              {area.note && <span className={styles.note}>{area.note}</span>}
            </li>
          ))}
          <li className={styles.area}>
            <Pin />
            <span className={styles.name}>and the rest of Scotland</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
