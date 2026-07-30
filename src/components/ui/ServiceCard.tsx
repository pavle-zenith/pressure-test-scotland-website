import Image, { type StaticImageData } from 'next/image';
import type { Service } from '@/data/types';
import SmartLink from './SmartLink';
import styles from './ServiceCard.module.css';

// One service card. Dark navy fill with a heavily-faded photo behind the text,
// white stroke icon top-left, white title, blue arrow link. Sharp corners, flat
// fill. The whole card is a link surface.
interface Props {
  service: Service;
  image?: StaticImageData;
}

// Simple line-icon per service slug. Static inline SVG, no animation.
const icons: Record<string, string> = {
  'mains-laying': 'M3 12h4l2-3 3 6 2-3h7',
  swabbing: 'M4 7h16M4 12h16M4 17h16',
  'pressure-testing': 'M12 3v5m0 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm3.5 6.5L12 13',
  chlorination: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z',
  'bacteriological-sampling': 'M9 3h6M10 3v6l-4 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-9V3',
  certification: 'M6 3h9l5 5v13H6zM14 3v6h6M9 13h6M9 17h4',
  'flow-and-pressure-testing': 'M12 21a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-8 4-3',
};

export default function ServiceCard({ service, image }: Props) {
  // Link to the service's detail page. SmartLink renders it inert until that
  // page exists (only slugs with authored detail content are live).
  const href = `/services/${service.slug}`;
  const iconPath = icons[service.slug] ?? 'M4 7h16M4 12h16M4 17h16';

  return (
    <article className={styles.card}>
      {image && (
        <Image src={image} alt="" fill sizes="(max-width: 560px) 100vw, 50vw" className={styles.bg} placeholder="blur" />
      )}
      <div className={styles.tint} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d={iconPath} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className={styles.name}>
          <SmartLink href={href}>{service.name}</SmartLink>
        </h3>
        <p className={styles.what}>{service.what}</p>
        <span className={styles.more} aria-hidden="true">
          Learn more
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </article>
  );
}
