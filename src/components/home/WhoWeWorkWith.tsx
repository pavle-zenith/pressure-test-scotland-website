import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { SEGMENTS } from '@/data/segments';
import { segmentImages } from '@/assets/images';
import styles from './WhoWeWorkWith.module.css';

// Named B2B buyer segments as bordered cards: a clean image on top with a square
// icon badge overlapping its bottom edge, then the buyer type and the specific
// job we do for them.

// Alt text per segment image, in order. Names the scene for accessibility.
const IMAGE_ALTS: string[] = [
  'A development site being stripped ready for groundworks',
  'A new-build housing development under construction',
  'Water main pipes laid out on site',
  'An engineering site drawing',
];

// One line-icon per segment, in order.
const ICONS: string[] = [
  // Groundworks: excavator/dig
  'M3 20h18M5 20v-5l4-2 3 3h4l2 4M9 13V8h3l2 3',
  // Developers: buildings
  'M4 21V8l6-4v17M10 21V9l8 3v9M4 21h16M13 12h2M13 15h2M13 18h2',
  // Multi-utility: connected nodes
  'M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 7v6a4 4 0 0 0 4 4h6',
  // Consultants: clipboard/spec
  'M8 4h8v3H8zM6 6h2v2h8V6h2v15H6zM9 12h6M9 16h4',
];

export default function WhoWeWorkWith() {
  return (
    <section className={`section ${styles.who}`} aria-labelledby="who-title">
      <div className="container">
        <SectionHeader
          eyebrow="Who we work with"
          title="You lay the main. We commission and certify it."
          id="who-title"
          lead="We work for the trade, not homeowners. Most of our work is the commissioning stage subbed out by the people who install the pipe."
        />

        <ul className={styles.grid}>
          {SEGMENTS.map((segment, i) => (
            <li key={segment.name} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={segmentImages[i]}
                  alt={IMAGE_ALTS[i] ?? ''}
                  fill
                  sizes="(max-width: 960px) 50vw, 25vw"
                  className={styles.mediaImg}
                  placeholder="blur"
                />
                <span className={styles.icon} aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d={ICONS[i]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{segment.name}</h3>
                <p className={styles.job}>{segment.job}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
