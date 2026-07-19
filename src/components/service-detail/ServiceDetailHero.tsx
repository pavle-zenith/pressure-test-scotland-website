import Image, { type StaticImageData } from 'next/image';
import type { Service } from '@/data/types';
import type { ServiceDetail } from '@/data/service-details';
import styles from './ServiceDetailHero.module.css';

// Service detail hero, vertical: "SERVICE" eyebrow, big name and intro on top,
// a thin divider, then the service pills below. Dark industrial photo behind.
interface Props {
  service: Service;
  detail: ServiceDetail;
  image?: StaticImageData;
}

export default function ServiceDetailHero({ service, detail, image }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="sd-title">
      {image && <Image src={image} alt="" fill sizes="100vw" className={styles.photo} placeholder="blur" priority />}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Service</p>
        <h1 id="sd-title" className={styles.title}>{service.name}</h1>
        <p className={styles.intro}>{detail.intro}</p>

        <hr className={styles.divider} />

        <ul className={styles.chips}>
          {detail.chips.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>
    </section>
  );
}
