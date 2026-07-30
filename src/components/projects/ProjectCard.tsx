import Image from 'next/image';
import Link from 'next/link';
import type { ProjectSnapshot } from '@/data/types';
import { coverageScotland } from '@/assets/images';
import styles from './ProjectCard.module.css';

// Project card. With a real photo it is a two-panel card: the work image on the
// left, a blue panel (faint Scotland photo behind it) on the right with the
// title, outcome, LOCATION / CLIENT / SCOPE meta and a "Get a Quote" button.
// With no photo yet it collapses to a single full-width blue panel (no empty
// image box), so a photo-less card still reads as a complete, deliberate card.
export default function ProjectCard({ project }: { project: ProjectSnapshot }) {
  const hasImage = Boolean(project.image);

  const panel = (
    <div className={styles.panel}>
      <Image src={coverageScotland} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.panelBg} placeholder="blur" aria-hidden="true" />
      <div className={styles.panelInner}>
        <h2 className={styles.title}>{project.title}</h2>
        {project.outcome && <p className={styles.outcome}>{project.outcome}</p>}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{project.location}</span>
            <span className={styles.statLabel}>Location</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{project.client}</span>
            <span className={styles.statLabel}>Client</span>
          </div>
          {project.scope && (
            <div className={styles.stat}>
              <span className={styles.statValue}>{project.scope}</span>
              <span className={styles.statLabel}>Scope</span>
            </div>
          )}
        </div>

        <Link href="/contact" className={styles.quote}>
          Get a Quote
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );

  if (!hasImage) {
    return <article className={`${styles.card} ${styles.cardSolo}`}>{panel}</article>;
  }

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={project.image as string}
          alt={project.imageAlt ?? project.title}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.mediaImg}
        />
      </div>
      {panel}
    </article>
  );
}
