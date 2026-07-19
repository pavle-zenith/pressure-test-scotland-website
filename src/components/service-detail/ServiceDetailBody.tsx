import Image, { type StaticImageData } from 'next/image';
import type { ServiceDetail } from '@/data/service-details';
import { confirmedAccreditations } from '@/data/accreditations';
import Button from '@/components/ui/Button';
import styles from './ServiceDetailBody.module.css';

// Two-column body, layout swapped from the LOADEX reference: main content on the
// LEFT (overview, key benefits, what's included, image), the eye-candy/extras in
// a sticky rail on the RIGHT (tagline, quick facts, CTA, accreditations).
interface Props {
  detail: ServiceDetail;
  image?: StaticImageData;
}

export default function ServiceDetailBody({ detail, image }: Props) {
  return (
    <section className={`container section ${styles.body}`}>
      {/* LEFT: main content */}
      <div className={styles.main}>
        <div className={styles.block}>
          <h2 className={styles.h2}>Service overview</h2>
          {detail.overview.map((p, i) => <p key={i} className={styles.p}>{p}</p>)}
        </div>

        {image && (
          <div className={styles.figure}>
            <Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" className={styles.figureImg} placeholder="blur" />
          </div>
        )}

        <div className={styles.block}>
          <h2 className={styles.h2}>Key benefits</h2>
          <ul className={styles.benefits}>
            {detail.keyBenefits.map((b) => (
              <li key={b.title} className={styles.benefit}>
                <strong>{b.title}</strong>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h2 className={styles.h2}>What&apos;s included</h2>
          <ul className={styles.included}>
            {detail.included.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      {/* RIGHT: extras rail */}
      <aside className={styles.rail}>
        <div className={styles.railInner}>
          <p className={styles.tagline}>{detail.tagline}</p>

          <dl className={styles.facts}>
            {detail.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.cta}>
            <p className={styles.ctaText}>Get a price for this on your site.</p>
            <Button href="/contact" variant="primary" arrow className={styles.ctaBtn}>Get a Quote</Button>
          </div>

          {confirmedAccreditations.length > 0 && (
            <div className={styles.accreditations}>
              <p className={styles.accLabel}>Accredited and certified</p>
              <ul>
                {confirmedAccreditations.map((a) => <li key={a.id}>{a.label}</li>)}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
