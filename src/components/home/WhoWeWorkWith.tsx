import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import Icon, { type IconName } from '@/components/ui/Icon';
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

// One icon per segment, in order: groundworks, developers, multi-utility,
// consultants. Keys into the shared Icon set.
const ICON_NAMES: IconName[] = ['groundworks', 'developers', 'multiutility', 'consultants'];

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
                  <Icon name={ICON_NAMES[i]} size={26} />
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
