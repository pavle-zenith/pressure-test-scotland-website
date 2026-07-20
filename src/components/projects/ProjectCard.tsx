import Image from 'next/image';
import Link from 'next/link';
import type { ProjectSnapshot } from '@/data/types';
import { coverageScotland } from '@/assets/images';
import styles from './ProjectCard.module.css';

// Two-panel project card: the work image on the left, and on the right a blue
// panel (faint Scotland photo behind it) with the project title, a LOCATION /
// CLIENT stat row, and a white "Get a Quote" action button. Where no real
// photo exists yet the left panel is a plain navy block, never stock.
export default function ProjectCard({ project }: { project: ProjectSnapshot }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.mediaImg}
          />
        ) : (
          <div className={styles.mediaPlaceholder} aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
              <path d="M9 26 C9 15 20 15 20 15 C20 15 31 15 31 26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
              <path d="M14 26h12" stroke="var(--color-mint)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      <div className={styles.panel}>
        <Image src={coverageScotland} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.panelBg} placeholder="blur" aria-hidden="true" />
        <div className={styles.panelInner}>
          <h2 className={styles.title}>{project.title}</h2>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{project.location}</span>
              <span className={styles.statLabel}>Location</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{project.client}</span>
              <span className={styles.statLabel}>Client</span>
            </div>
          </div>

          <Link href="/contact" className={styles.quote}>
            Get a Quote
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
