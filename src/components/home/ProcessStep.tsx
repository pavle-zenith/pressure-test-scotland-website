import Link from 'next/link';
import type { ProcessStep as ProcessStepType } from '@/data/types';
import styles from './Process.module.css';

// One row in the process list: the step title on the left, its description plus
// focus chips and a Learn more link on the right. Divided from the next by a
// rule. A self-contained answer block for AI extraction.
export default function ProcessStep({ step }: { step: ProcessStepType }) {
  return (
    <li className={styles.step}>
      <div className={styles.stepHead}>
        <span className={styles.stepNum}>{String(step.order).padStart(2, '0')}</span>
        <h3 className={styles.stepName}>{step.name}</h3>
      </div>

      <div className={styles.stepBody}>
        <p className={styles.stepWhat}>{step.what}</p>

        <p className={styles.focusLabel}>Stage focus:</p>
        <ul className={styles.focus}>
          {step.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <Link href={`/services#${step.label.toLowerCase().replace(/\s+/g, '-')}`} className={styles.learn}>
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </li>
  );
}
