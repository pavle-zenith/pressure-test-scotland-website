import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { contactPageSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { FAQS } from '@/data/faq';
import JsonLd from '@/components/seo/JsonLd';
import ContactHero from '@/components/contact/ContactHero';
import ContactSteps from '@/components/contact/ContactSteps';
import Coverage from '@/components/home/Coverage';
import Reviews from '@/components/home/Reviews';
import Faq from '@/components/home/Faq';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get a quote for water main commissioning across Scotland. Send your drawings for a price by the next working day, or call our team on 07749 245626.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        nodes={[
          contactPageSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <ContactHero />
      <ContactSteps />
      <Coverage />
      <Reviews />
      <Faq />
    </>
  );
}
