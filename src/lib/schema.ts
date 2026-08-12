import { SITE } from '../data/site';
import type { Service, FaqItem } from '../data/types';
import { SERVICES } from '../data/services';
import { absolute, ORG_ID, WEBSITE_ID } from './url';

// JSON-LD builders. Each returns a plain object; a page collects the nodes it
// needs and BaseHead renders them as a single @graph in <head>. The linked-data
// pattern is: declare the organisation once, and reference it everywhere else
// by { '@id': ORG_ID } rather than repeating it, so crawlers resolve one
// canonical entity.

type JsonLdNode = Record<string, unknown>;

/**
 * The business entity. Anchor node for the whole graph. Every Service, the
 * WebSite and future breadcrumbs reference this @id.
 */
export function orgSchema(): JsonLdNode {
  const node: JsonLdNode = {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.host,
    logo: absolute('/logo.png'),
    image: absolute('/og.png'),
    telephone: SITE.phone.display,
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: SITE.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Companies House',
      value: SITE.companyNumber,
    },
  };

  // Only include email once confirmed publishable.
  if (SITE.email.confirmed) {
    node.email = SITE.email.display;
  }
  // Only include sameAs when there is at least one profile.
  if (SITE.sameAs.length > 0) {
    node.sameAs = SITE.sameAs;
  }

  return node;
}

/** The website node, published by the organisation. */
export function websiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.host,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-GB',
  };
}

/** A single Service node, provided by the organisation. */
export function serviceSchema(service: Service): JsonLdNode {
  return {
    '@type': 'Service',
    name: service.name,
    serviceType: service.serviceType,
    url: absolute(`/services#${service.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  };
}

/** All five Service nodes. */
export function allServiceSchemas(): JsonLdNode[] {
  return SERVICES.map(serviceSchema);
}

/** FAQPage node from the Q/A pairs. Answers ship as plain text. */
export function faqSchema(items: FaqItem[]): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList from an ordered trail of {name, path}. Built now, wired into
 * inner pages in phase 2; the home page does not use it.
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

/**
 * ContactPage node with a ContactPoint. References the org rather than
 * redefining it.
 */
export function contactPageSchema(): JsonLdNode {
  return {
    '@type': 'ContactPage',
    url: absolute('/contact'),
    name: `Contact ${SITE.shortName}`,
    about: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ContactPoint',
      telephone: SITE.phone.display,
      contactType: 'sales',
      areaServed: SITE.areaServed,
      availableLanguage: 'English',
    },
  };
}

/**
 * Wrap a set of nodes in one @graph with a shared context. This is what gets
 * JSON.stringify'd into the single ld+json script.
 */
export function buildGraph(nodes: JsonLdNode[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
