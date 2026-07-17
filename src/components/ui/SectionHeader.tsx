import styles from './SectionHeader.module.css';

// Slash-wrapped blue eyebrow, the H2, and an optional lead paragraph. The
// eyebrow is a <p>, never a heading, so the document outline stays clean.
interface Props {
  eyebrow?: string;
  title: string;
  id?: string;
  lead?: string;
  align?: 'start' | 'center';
  onNavy?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  id,
  lead,
  align = 'start',
  onNavy = false,
}: Props) {
  return (
    <div
      className={[styles.header, align === 'center' && styles.center, onNavy && styles.onNavy]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && <p className={`eyebrow eyebrow--slash ${styles.eyebrow}`}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
