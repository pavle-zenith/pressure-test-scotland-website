import Image, { type StaticImageData } from 'next/image';
import type { Service } from '@/data/types';
import SmartLink from './SmartLink';
import Icon, { type IconName } from './Icon';
import styles from './ServiceCard.module.css';

// One service card. Dark navy fill with a heavily-faded photo behind the text,
// white stroke icon top-left, white title, blue arrow link. Sharp corners, flat
// fill. The whole card is a link surface.
interface Props {
  service: Service;
  image?: StaticImageData;
}

export default function ServiceCard({ service, image }: Props) {
  // Link to the service's detail page. SmartLink renders it inert until that
  // page exists (only slugs with authored detail content are live).
  const href = `/services/${service.slug}`;

  return (
    <article className={styles.card}>
      {image && (
        <Image src={image} alt="" fill sizes="(max-width: 560px) 100vw, 50vw" className={styles.bg} placeholder="blur" />
      )}
      <div className={styles.tint} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <Icon name={service.slug as IconName} size={28} />
        </span>
        <h3 className={styles.name}>
          <SmartLink href={href}>{service.name}</SmartLink>
        </h3>
        <p className={styles.what}>{service.what}</p>
        <span className={styles.more} aria-hidden="true">
          Learn more
          <Icon name="arrow-right" size={15} />
        </span>
      </div>
    </article>
  );
}
