import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { SERVICES } from '@/data/services';
import { SERVICE_DETAILS } from '@/data/service-details';
import { serviceImages } from '@/assets/images';
import JsonLd from '@/components/seo/JsonLd';
import ServiceDetailHero from '@/components/service-detail/ServiceDetailHero';
import ServiceDetailBody from '@/components/service-detail/ServiceDetailBody';
import Process from '@/components/home/Process';
import ServiceFaq from '@/components/service-detail/ServiceFaq';
import RelatedServices from '@/components/service-detail/RelatedServices';
import FinalCta from '@/components/home/FinalCta';

// Only slugs with authored detail content are built. The rest fall back to the
// /services hub. Adding a service later is a data change in service-details.ts.
export function generateStaticParams() {
  return Object.keys(SERVICE_DETAILS).map((slug) => ({ slug }));
}

// Do not render params outside the generated set.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) return {};
  return pageMetadata({
    // Keyword-first SEO title; falls back to the plain service name.
    title: detail.metaTitle ?? service.name,
    description: detail.intro.slice(0, 155),
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) notFound();

  const image = serviceImages[slug];

  return (
    <>
      <JsonLd
        nodes={[
          serviceSchema(service),
          faqSchema(detail.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path: `/services/${slug}` },
          ]),
        ]}
      />
      <ServiceDetailHero service={service} detail={detail} image={image} />
      <ServiceDetailBody detail={detail} image={image} />
      <Process />
      <ServiceFaq faqs={detail.faqs} />
      <RelatedServices slugs={detail.related} />
      <FinalCta />
    </>
  );
}
