import type { Accreditation } from '@/data/types';
import styles from './AccreditationMark.module.css';

// A single accreditation mark. Shows the logo when a file exists, otherwise a
// text badge. `tone` adapts it for light or navy backgrounds.
interface Props {
  mark: Accreditation;
  tone?: 'light' | 'navy';
}

export default function AccreditationMark({ mark, tone = 'light' }: Props) {
  return (
    <div className={`${styles.mark} ${tone === 'navy' ? styles.navy : styles.light}`} title={mark.label}>
      {mark.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mark.logo} alt={`${mark.label} accreditation`} height={44} loading="lazy" />
      ) : (
        <span className={styles.text}>{mark.label}</span>
      )}
    </div>
  );
}
