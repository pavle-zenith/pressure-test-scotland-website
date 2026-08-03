import Image from 'next/image';
import { COVERAGE_INTRO, COVERAGE_AREAS } from '@/data/coverage';
import Icon from '@/components/ui/Icon';
import { coverageScotland } from '@/assets/images';
import styles from './Coverage.module.css';

// Named areas as plain crawlable text (never a bare map graphic). Heading and
// intro top-left, then the region chips wrapping full-width below. The local
// SEO section and the source of truth for phase-3 location pages.
function Pin() {
  return <Icon name="map-pin" size={15} className={styles.pin} />;
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
