import Image from 'next/image';
import { SITE } from '@/data/site';
import { featuredTestimonial } from '@/data/proof';
import { featuredPipes } from '@/assets/images';
import styles from './FeaturedTestimonial.module.css';

// A single highlighted review: navy header bar (business name + five stars) over
// a light body with the quote and attribution and a faint quote-mark watermark,
// paired with an on-brand photo on the right.
export default function FeaturedTestimonial() {
  const t = featuredTestimonial;
  if (!t) return null;

  return (
    <section className={`section ${styles.section}`} aria-label="Featured review">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.text}>
            <div className={styles.bar}>
              <span className={styles.brand}>{SITE.name}</span>
              <span className={styles.stars} aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                <p className={styles.highlight}>{t.highlight}</p>
                <p className={styles.full}>{t.quote}</p>
              </blockquote>
              <figcaption className={styles.cite}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.meta}>{t.role}, {t.company}</span>
              </figcaption>
            </div>
          </div>

          <div className={styles.media}>
            <Image src={featuredPipes} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" className={styles.mediaImg} placeholder="blur" />
          </div>
        </div>
      </div>
    </section>
  );
}
