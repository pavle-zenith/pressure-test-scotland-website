import Image from 'next/image';
import Button from '@/components/ui/Button';
import { aboutPipeline } from '@/assets/images';
import styles from './ProjectsHero.module.css';

// S1. Full-bleed dark hero: on-brand site photo behind a navy overlay, an
// eyebrow, a big two-line headline carrying the work + outcome + geography,
// a short intro and the quote CTA.
export default function ProjectsHero() {
  return (
    <section className={styles.hero} aria-labelledby="projects-hero-title">
      <Image src={aboutPipeline} alt="" fill priority sizes="100vw" className={styles.photo} placeholder="blur" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Our projects</p>
        <h1 id="projects-hero-title" className={styles.title}>
          Water mains laid, tested<br />and connected across Scotland
        </h1>
        <p className={styles.intro}>
          Real jobs on real sites, taken through testing and commissioning to a
          signed-off Scottish Water connection.
        </p>
        <Button href="/contact" variant="primary" size="lg" arrow>Get a Quote</Button>
      </div>
    </section>
  );
}
