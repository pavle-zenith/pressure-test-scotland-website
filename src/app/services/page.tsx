import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { allServiceSchemas, breadcrumbSchema } from '@/lib/schema';
import { SERVICES } from '@/data/services';
import { serviceImages } from '@/assets/images';
import JsonLd from '@/components/seo/JsonLd';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceDetail from '@/components/services/ServiceDetail';
import Reviews from '@/components/home/Reviews';
import Faq from '@/components/home/Faq';
import FinalCta from '@/components/home/FinalCta';
import styles from './services.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Water Main Commissioning, Ayr',
  description:
    'Water main laying, swabbing, pressure testing, chlorination, UKAS-lab sampling and certification across Scotland. One specialist for the whole commissioning stage.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        nodes={[
          ...allServiceSchemas(),
          // FAQPage JSON-LD ships once, on the home page, so engines have a
          // single canonical answer source. The visible accordion stays here.
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />
      <ServicesHero />

      <div className={`container section ${styles.list}`}>
        {SERVICES.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i} image={serviceImages[service.slug]} />
        ))}
      </div>

      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}
