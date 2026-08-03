import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
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
                <Icon name="chevron-down" size={20} className={styles.icon} />
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
