import Image, { type StaticImageData } from 'next/image';
import type { Service } from '@/data/types';
import Button from '@/components/ui/Button';
import Icon, { type IconName } from '@/components/ui/Icon';
import styles from './ServiceDetail.module.css';

// One large service card: content on one side, image on the other, alternating
// per row. Content holds an icon badge, the number + title, description, a
// divider, a "What's included" list and a More details link.
interface Props {
  service: Service;
  index: number;
  image?: StaticImageData;
}

export default function ServiceDetail({ service, index, image }: Props) {
  const flipped = index % 2 === 1;

  return (
    <article className={`${styles.card} ${flipped ? styles.flipped : ''}`} id={service.slug}>
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <Icon name={service.slug as IconName} size={30} />
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
