'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DIFFERENTIATORS } from '@/data/differentiators';
import { whyImages } from '@/assets/images';
import styles from './WhyUs.module.css';

// "Why businesses choose Pressure Test Scotland." Big heading, then a list of
// the reasons on the left; selecting one (or the auto-rotation) shows its image
// and detail text on the right.
export default function WhyUs() {
  const points = DIFFERENTIATORS.filter((d) => d.confirmed);
  const [active, setActive] = useState(0);
  // Auto-rotation stops for good once the user picks a reason, so nobody reading
  // a panel gets yanked to the next (WCAG 2.2.2 Pause, Stop, Hide).
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % points.length), 5000);
    return () => clearInterval(id);
  }, [points.length, paused]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const current = points[active];

  return (
    <section className={`section section--alt ${styles.why}`} aria-labelledby="why-title">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow eyebrow--slash">Why us</p>
          <h2 id="why-title" className={styles.title}>Why businesses choose Pressure Test Scotland</h2>
        </div>

        <div className={styles.body}>
          <ul className={styles.list} aria-label="Reasons to choose us">
            {points.map((point, i) => (
              <li key={point.title}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  className={`${styles.item} ${i === active ? styles.itemActive : ''}`}
                  onClick={() => select(i)}
                >
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.itemTitle}>{point.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.panel}>
            <div className={styles.media}>
              {points.map((point, i) => (
                <Image
                  key={point.title}
                  src={whyImages[i % whyImages.length]}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 100vw, 55vw"
                  className={`${styles.mediaImg} ${i === active ? styles.mediaActive : ''}`}
                  placeholder="blur"
                />
              ))}
              <div className={styles.mediaOverlay} aria-hidden="true" />
              <div className={styles.caption}>
                <h3 className={styles.captionTitle}>{current.title}</h3>
                <p className={styles.captionText}>{current.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
