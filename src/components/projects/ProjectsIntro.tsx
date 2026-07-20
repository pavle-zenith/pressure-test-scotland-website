import styles from './ProjectsIntro.module.css';

// S2 intro band. A blue eyebrow on the left, a large statement sentence on the
// right with the key phrase picked out in blue. States the through-line for the
// work shown below.
export default function ProjectsIntro() {
  return (
    <section className={`section ${styles.section}`} aria-label="What the work delivers">
      <div className={`container ${styles.grid}`}>
        <p className={styles.eyebrow}>Real performance</p>
        <p className={styles.statement}>
          Every job is taken from the pipe in the ground{' '}
          <span className={styles.accent}>through testing, chlorination and sampling</span>{' '}
          to the certificate that gets you connected.
        </p>
      </div>
    </section>
  );
}
