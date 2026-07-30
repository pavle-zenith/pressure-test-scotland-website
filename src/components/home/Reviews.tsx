import { sliderTestimonials } from '@/data/proof';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Reviews.module.css';

// Client reviews, shown stacked (no carousel): the first confirmed review as a
// full-width featured card, then any others in a two-column grid. Static markup,
// so every review is visible and there is nothing to announce or paginate.
function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  const reviews = sliderTestimonials;
  if (reviews.length === 0) return null;

  const [featured, ...rest] = reviews;

  return (
    <section id="reviews" className={`section ${styles.section}`} aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeader
          eyebrow="Reviews"
          title="What contractors and developers say"
          id="reviews-title"
          lead="Real references from the people who put us on their sites, from main contractors to long-standing clients."
        />

        <figure className={styles.featured}>
          <div className={styles.bar}>
            <span className={styles.company}>{featured.company}</span>
            <Stars />
          </div>
          <div className={styles.body}>
            <svg className={styles.mark} width="120" height="120" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 7h4v6a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2H7zm8 0h4v6a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2h-2z" />
            </svg>
            <blockquote className={styles.quote}>
              {featured.highlight && <p className={styles.highlight}>{featured.highlight}</p>}
              <p className={styles.full}>{featured.quote}</p>
            </blockquote>
            <figcaption className={styles.cite}>
              <span className={styles.name}>{featured.name}</span>
              <span className={styles.meta}>{featured.role}, {featured.company}</span>
            </figcaption>
          </div>
        </figure>

        {rest.length > 0 && (
          <ul className={styles.grid}>
            {rest.map((r) => (
              <li key={r.name}>
                <figure className={styles.card}>
                  <div className={styles.cardBar}>
                    <span className={styles.company}>{r.company}</span>
                    <Stars />
                  </div>
                  <div className={styles.cardBody}>
                    <blockquote className={styles.cardQuote}>
                      {r.highlight && <p className={styles.cardHighlight}>{r.highlight}</p>}
                      <p className={styles.cardFull}>{r.quote}</p>
                    </blockquote>
                    <figcaption className={styles.cardCite}>
                      <span className={styles.name}>{r.name}</span>
                      <span className={styles.meta}>{r.role}, {r.company}</span>
                    </figcaption>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
