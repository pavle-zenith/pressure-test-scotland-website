import type { ProcessStep as ProcessStepType } from '@/data/types';
import styles from './Process.module.css';

// One row in the process list: the step title on the left, its description and
// focus chips on the right. Divided from the next by a rule. A self-contained
// answer block for AI extraction.
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
      </div>
    </li>
  );
}
