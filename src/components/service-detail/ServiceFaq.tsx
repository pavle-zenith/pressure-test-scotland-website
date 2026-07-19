import Button from '@/components/ui/Button';
import type { FaqItem } from '@/data/types';
import styles from './ServiceFaq.module.css';

// FAQ for a single service. Left column has the heading and a CTA; right column
// is a native <details> accordion. Answers stay in the DOM for crawlers.
export default function ServiceFaq({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className={`section ${styles.faq}`} aria-labelledby="sd-faq-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className="eyebrow eyebrow--slash">Questions</p>
          <h2 id="sd-faq-title" className={styles.title}>Common questions</h2>
          <p className={styles.intro}>If yours is not here, call and ask.</p>
          <Button href="/contact" variant="primary" arrow>Get a Quote</Button>
        </div>

        <div className={styles.list}>
          {faqs.map((item, i) => (
            <details key={item.question} className={styles.item} name="sd-faq" open={i === 0}>
              <summary className={styles.q}>
                <span>{item.question}</span>
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className={styles.a}><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
