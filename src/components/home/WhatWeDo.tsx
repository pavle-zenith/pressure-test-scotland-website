import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import { SERVICES } from '@/data/services';
import { serviceImages } from '@/assets/images';
import styles from './WhatWeDo.module.css';

// Services. Headline + supporting paragraph on the left, buttons on the right,
// then the service-card grid. Each card carries its own faded background photo.
export default function WhatWeDo() {
  return (
    <section className={`section ${styles.services}`} aria-labelledby="services-title">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.headline}>
            <p className="eyebrow eyebrow--slash">Services</p>
            <h2 id="services-title" className={styles.title}>New water mains, passed and signed off first time</h2>
          </div>
          <div className={styles.intro}>
            <p>
              One specialist for the whole commissioning stage, from clearing the pipe to the certificate that gets you connected. We supply and lay the main, swab it, pressure test it, chlorinate and sample it, then hand you the pack the water authority accepts.
            </p>
            <div className={styles.actions}>
              <Button href="/contact" variant="primary" arrow>Get a Quote</Button>
              <Button href="/services" variant="secondary">Browse all services</Button>
            </div>
          </div>
        </div>

        <ul className={styles.grid}>
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} image={serviceImages[service.slug]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
