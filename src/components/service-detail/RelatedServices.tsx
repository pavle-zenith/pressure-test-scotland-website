import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import { SERVICES } from '@/data/services';
import { serviceImages } from '@/assets/images';
import styles from './RelatedServices.module.css';

// Related services at the foot of a service detail page.
export default function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  if (related.length === 0) return null;

  return (
    <section className={`section section--alt ${styles.related}`} aria-labelledby="sd-related-title">
      <div className="container">
        <SectionHeader eyebrow="Related services" title="Often needed alongside" id="sd-related-title" />
        <ul className={styles.grid}>
          {related.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} image={serviceImages[service.slug]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
