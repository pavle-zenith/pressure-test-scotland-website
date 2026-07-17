import Image from 'next/image';
import { DIFFERENTIATORS } from '@/data/differentiators';
import { whyVan } from '@/assets/images';
import styles from './WhyUs.module.css';

// "Why businesses choose Pressure Test Scotland." Centered heading + lead, then
// a supporting image on the left and a 2x2 grid of bordered cards with blue
// numerals (01-04). Real approved copy from the client.
export default function WhyUs() {
  const points = DIFFERENTIATORS.filter((d) => d.confirmed);

  return (
    <section className={`section section--alt ${styles.why}`} aria-labelledby="why-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="why-title" className={styles.title}>Why businesses choose Pressure Test Scotland</h2>
          <p className={styles.lead}>
            One specialist for the whole commissioning stage, from clearing the pipe to the certificate that gets you connected. Water, fire, sprinkler and rising mains.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.media}>
            <Image src={whyVan} alt="The Pressure Test Scotland van, a Scottish Water approved UCP contractor" fill sizes="(max-width: 860px) 100vw, 45vw" className={styles.mediaImg} placeholder="blur" />
          </div>

          <ol className={styles.grid}>
            {points.map((point, i) => (
              <li key={point.title} className={styles.card}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardDetail}>{point.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
