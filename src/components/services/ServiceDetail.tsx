import Image, { type StaticImageData } from 'next/image';
import type { Service } from '@/data/types';
import Button from '@/components/ui/Button';
import styles from './ServiceDetail.module.css';

// One large service card: content on one side, image on the other, alternating
// per row. Content holds an icon badge, the number + title, description, a
// divider, a "What's included" list and a More details link.
interface Props {
  service: Service;
  index: number;
  image?: StaticImageData;
}

const icons: Record<string, string> = {
  'mains-laying': 'M3 12h4l2-3 3 6 2-3h7',
  swabbing: 'M4 7h16M4 12h16M4 17h16',
  'pressure-testing': 'M12 3v5m0 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm3.5 6.5L12 13',
  chlorination: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z',
  'bacteriological-sampling': 'M9 3h6M10 3v6l-4 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-9V3',
  certification: 'M6 3h9l5 5v13H6zM14 3v6h6M9 13h6M9 17h4',
  'flow-and-pressure-testing': 'M12 21a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-8 4-3',
};

export default function ServiceDetail({ service, index, image }: Props) {
  const iconPath = icons[service.slug] ?? 'M4 7h16M4 12h16M4 17h16';
  const flipped = index % 2 === 1;

  return (
    <article className={`${styles.card} ${flipped ? styles.flipped : ''}`} id={service.slug}>
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d={iconPath} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <h2 className={styles.title}>
          <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
          {service.name}
        </h2>
        <p className={styles.what}>{service.what}</p>

        <hr className={styles.rule} />

        <p className={styles.includedLabel}>What&apos;s included:</p>
        <ul className={styles.included}>
          {service.included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Button href="/contact" variant="primary" arrow>Get a Quote</Button>
          <Button href={`/services/${service.slug}`} variant="secondary">Learn more</Button>
        </div>
      </div>

      <div className={styles.media}>
        {image && (
          <Image src={image} alt={service.name} fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.mediaImg} placeholder="blur" />
        )}
      </div>
    </article>
  );
}
