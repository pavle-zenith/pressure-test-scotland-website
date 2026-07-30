'use client';

import { useState } from 'react';
import { sliderTestimonials } from '@/data/proof';
import { SITE } from '@/data/site';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Reviews.module.css';

// One unified reviews slider, used everywhere. Each slide is a confirmed client
// review: navy header bar (business + five stars) over a light body with a
// large pull-quote, the full review and the attribution. Prev/next and dots
// move between reviews. Renders nothing if there are no confirmed reviews.
export default function Reviews() {
  const reviews = sliderTestimonials;
  const [i, setI] = useState(0);
  if (reviews.length === 0) return null;

  const count = reviews.length;
  const active = reviews[i];
  const go = (n: number) => setI((n + count) % count);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeader
          eyebrow="Reviews"
          title="What contractors and developers say"
          id="reviews-title"
          lead="Real references from the people who put us on their sites, from main contractors to long-standing clients."
        />

        <div className={styles.slider}>
          <figure className={styles.card} aria-roledescription="slide" aria-label={`Review ${i + 1} of ${count}`}>
            <div className={styles.bar}>
              <span className={styles.brand}>{SITE.name}</span>
              <span className={styles.stars} aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                  </svg>
                ))}
              </span>
            </div>

            <div className={styles.body}>
              <svg className={styles.mark} width="120" height="120" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 7h4v6a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2H7zm8 0h4v6a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2h-2z" />
              </svg>
              <blockquote className={styles.quote}>
                {active.highlight && <p className={styles.highlight}>{active.highlight}</p>}
                <p className={styles.full}>{active.quote}</p>
              </blockquote>
              <figcaption className={styles.cite}>
                <span className={styles.name}>{active.name}</span>
                <span className={styles.meta}>{active.role}, {active.company}</span>
              </figcaption>
            </div>
          </figure>

          {count > 1 && (
            <div className={styles.controls}>
              <button type="button" className={styles.arrow} onClick={() => go(i - 1)} aria-label="Previous review">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className={styles.dots}>
                {reviews.map((r, d) => (
                  <li key={r.name}>
                    <button
                      type="button"
                      className={`${styles.dot} ${d === i ? styles.dotActive : ''}`}
                      onClick={() => setI(d)}
                      aria-label={`Go to review ${d + 1}`}
                      aria-current={d === i ? 'true' : undefined}
                    />
                  </li>
                ))}
              </ul>
              <button type="button" className={styles.arrow} onClick={() => go(i + 1)} aria-label="Next review">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
