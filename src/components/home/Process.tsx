import Image from 'next/image';
import Button from '@/components/ui/Button';
import ProcessStep from './ProcessStep';
import { PROCESS } from '@/data/process';
import { processPipework } from '@/assets/images';
import styles from './Process.module.css';

// The full commissioning sequence. A sticky left column (eyebrow, heading,
// image, button) beside a divided list of the five stages on the right. Each
// stage is a self-contained answer block, which is what an AI answer engine
// cites when asked what commissioning a new water main involves.
export default function Process() {
  return (
    <section className={`section section--alt ${styles.process}`} aria-labelledby="process-title">
      <div className={`container ${styles.inner}`}>
        <aside className={styles.aside}>
          <p className="eyebrow eyebrow--slash">The process</p>
          <h2 id="process-title" className={styles.title}>
            Support at <span className={styles.accent}>every stage</span>, from a laid main to a signed certificate.
          </h2>
          <div className={styles.media}>
            <Image src={processPipework} alt="Water main pipework being commissioned" fill sizes="(max-width: 900px) 100vw, 40vw" className={styles.mediaImg} placeholder="blur" />
          </div>
          <Button href="/services" variant="primary" arrow className={styles.cta}>All services</Button>
        </aside>

        <ol className={styles.list}>
          {PROCESS.map((step) => (
            <ProcessStep key={step.order} step={step} />
          ))}
        </ol>
      </div>
    </section>
  );
}
