import Image, { type StaticImageData } from 'next/image';
import { SITE } from '@/data/site';
import Button from './Button';
import styles from './CtaBlock.module.css';

// Dark CTA band. Headline + paragraph on the left, two buttons (quote + phone).
// `fullWidth` makes it a full-bleed section with an inner container; otherwise
// it is a contained rounded band. `image` sets a real photo behind the navy
// overlay.
interface Props {
  heading: string;
  body?: string;
  id?: string;
  ctaLabel?: string;
  ctaHref?: string;
  fullWidth?: boolean;
  image?: StaticImageData;
  imageAlt?: string;
}

export default function CtaBlock({
  heading,
  body,
  id,
  ctaLabel = 'Get a Quote',
  ctaHref = '/contact',
  fullWidth = false,
  image,
  imageAlt = '',
}: Props) {
  const content = (
    <div className={styles.inner}>
      <div className={styles.text}>
        <h2 id={id} className={styles.heading}>{heading}</h2>
        {body && <p className={styles.body}>{body}</p>}
      </div>
      <div className={styles.actions}>
        <Button href={ctaHref} variant="primary" size="lg" arrow>{ctaLabel}</Button>
        <Button href={SITE.phone.href} variant="white" size="lg">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z" fill="currentColor" />
          </svg>
          {SITE.phone.display}
        </Button>
      </div>
    </div>
  );

  return (
    <section
      className={`${styles.band} ${fullWidth ? styles.full : styles.contained}`}
      aria-labelledby={id}
    >
      {image && (
        <Image src={image} alt={imageAlt} fill sizes="100vw" className={styles.photo} placeholder="blur" />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      {fullWidth ? <div className="container">{content}</div> : content}
    </section>
  );
}
