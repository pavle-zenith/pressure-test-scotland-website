import SectionHeader from '@/components/ui/SectionHeader';
import styles from './ContactSteps.module.css';

// What happens after someone submits a quote request: three numbered steps.
// Primes the buyer to expect a callback.
const STEPS = [
  {
    title: 'You send the job',
    text: 'Your details and what you need commissioned, with drawings if you have them.',
  },
  {
    title: 'We review and may call',
    text: 'We check the scope and coverage, and ring to confirm anything that affects the price.',
  },
  {
    title: 'You get a quote',
    text: 'A clear price back by the next working day, with a date that fits your programme.',
  },
];

export default function ContactSteps() {
  return (
    <section className={`section section--alt ${styles.steps}`} aria-labelledby="steps-title">
      <div className="container">
        <SectionHeader
          eyebrow="What happens next"
          title="From your enquiry to a quote in three steps"
          id="steps-title"
          lead="No sending it into the void. Here is exactly what happens after you hit send."
        />

        <ol className={styles.track}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <div className={styles.marker}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                {i < STEPS.length - 1 && <span className={styles.line} aria-hidden="true" />}
              </div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
