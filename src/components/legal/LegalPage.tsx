import type { ReactNode } from 'react';
import styles from './LegalPage.module.css';

// Reusable layout for legal / utility pages (privacy, cookies). Clean prose in a
// single readable column with a title and last-updated date.
interface Props {
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: Props) {
  return (
    <article className={`container section ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated {updated}</p>
      </header>
      <div className={styles.prose}>{children}</div>
    </article>
  );
}
