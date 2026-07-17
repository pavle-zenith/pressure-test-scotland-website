import Button from '@/components/ui/Button';
import { FAQS } from '@/data/faq';
import styles from './Faq.module.css';

// Buyer-voiced questions with self-contained answers. Left column has the
// heading, intro and a Get a Quote button; right column is the accordion.
// Native <details>/<summary> so it works with zero JS and stays crawlable.
export default function Faq() {
  return (
    <section className={`section ${styles.faq}`} aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className="eyebrow eyebrow--slash">Questions</p>
          <h2 id="faq-title" className={styles.title}>Frequently asked questions</h2>
          <p className={styles.intro}>The things site managers ask first. If yours is not here, call and ask.</p>
          <Button href="/contact" variant="primary" arrow>Get a Quote</Button>
        </div>

        <div className={styles.list}>
          {FAQS.map((item, i) => (
            <details key={item.question} className={styles.item} name="home-faq" open={i === 0}>
              <summary className={styles.q}>
                <span>{item.question}</span>
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className={styles.a}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
