import { confirmedProjects } from '@/data/proof';
import ProjectCard from './ProjectCard';
import styles from './ProjectsList.module.css';

// S3. The stacked project rows. Only confirmed projects render, so the list is
// honest and grows as more jobs are cleared and photographed.
export default function ProjectsList() {
  if (confirmedProjects.length === 0) return null;

  return (
    <section className={`section section--alt ${styles.section}`} aria-label="Recent projects">
      <div className="container">
        <div className={styles.list}>
          {confirmedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <p className={styles.note}>
          More projects added here as work completes across Scotland.
        </p>
      </div>
    </section>
  );
}
