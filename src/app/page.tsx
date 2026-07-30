import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { allServiceSchemas, faqSchema } from '@/lib/schema';
import { FAQS } from '@/data/faq';
import JsonLd from '@/components/seo/JsonLd';

import Hero from '@/components/home/Hero';
import WhatWeDo from '@/components/home/WhatWeDo';
import WhyUs from '@/components/home/WhyUs';
import AboutStats from '@/components/home/AboutStats';
import WhoWeWorkWith from '@/components/home/WhoWeWorkWith';
import Process from '@/components/home/Process';
import Reviews from '@/components/home/Reviews';
import Coverage from '@/components/home/Coverage';
import Faq from '@/components/home/Faq';
import FinalCta from '@/components/home/FinalCta';

export const metadata: Metadata = pageMetadata({
  title: 'Water Mains Commissioning Scotland',
  description:
    'Pressure testing, chlorination and UKAS-lab sampling for new water mains across Scotland. Based in Ayr. We get your main passed and signed off first time.',
  path: '/',
});

export default function HomePage() {
  const schemaNodes = [...allServiceSchemas(), faqSchema(FAQS)];

  return (
    <>
      <JsonLd nodes={schemaNodes} />
      <Hero />
      <WhatWeDo />
      <WhyUs />
      <AboutStats />
      <WhoWeWorkWith />
      <Process />
      <Reviews />
      <Coverage />
      <Faq />
      <FinalCta />
    </>
  );
}
