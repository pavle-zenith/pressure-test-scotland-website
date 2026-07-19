import type { FaqItem } from './types';

// Rich content for the per-service detail pages. Keyed by service slug. Built as
// a template now (mains-laying fully authored); the rest follow the same shape
// and will move to a CMS later. Any slug without an entry falls back to the
// base Service record on the /services hub.

export interface ProcessStage {
  /** Short icon key (maps to an inline SVG in the timeline). */
  icon: string;
  name: string;
  text: string;
}

export interface ServiceDetail {
  slug: string;
  /** One-line tagline shown in the hero and the right rail. */
  tagline: string;
  /** Hero intro sentence. */
  intro: string;
  /** Chips shown under the hero heading. */
  chips: string[];
  /** Overview paragraphs (the main left-column body). */
  overview: string[];
  keyBenefits: { title: string; text: string }[];
  included: string[];
  /** Quick facts for the right rail. */
  facts: { label: string; value: string }[];
  process: ProcessStage[];
  faqs: FaqItem[];
  /** Related service slugs to show at the foot. */
  related: string[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'mains-laying': {
    slug: 'mains-laying',
    tagline: 'Laid right. Signed off first time.',
    intro:
      'We supply, lay and construct new water, fire, sprinkler and rising mains as a WIRS accredited contractor, then take the main through commissioning to a certificate.',
    chips: ['Water mains', 'Fire & sprinkler', 'Rising mains', 'WIRS accredited'],
    overview: [
      'No two sites run the same way. Ground conditions, tie-in points and the connection date all shape how a main should be laid, and a main laid without commissioning in mind is a main that fails its test later. Pressure Test Scotland lays new water, fire, sprinkler and rising mains as a WIRS accredited contractor, and because we commission what we lay, the job does not fall between two trades.',
      'We work from your drawings, lay to the correct depth and bedding, and set the main up so the pressure test, chlorination and sample all pass first time. When the pipe is in the ground we swab it, test it, disinfect it and hand you the certificate pack the water authority accepts to permit connection. One firm, one point of contact, from open trench to signed certificate.',
    ],
    keyBenefits: [
      { title: 'One firm, laid and commissioned', text: 'We lay the main and take it through commissioning, so nothing is lost in the handover between trades.' },
      { title: 'WIRS accredited', text: 'Work carried out by a Water Industry Registration Scheme accredited contractor, to the standard Scottish Water expects.' },
      { title: 'Laid to pass first time', text: 'We set the main up for the tests it has to pass, so the pressure test and sample do not send you back to the start.' },
      { title: 'Scottish Water tie-ins', text: 'Primary tie-ins to the existing network handled as part of the job, not subbed out to a third party.' },
      { title: 'Water, fire, sprinkler and rising mains', text: 'Adoptable and private mains laid to the same standard, whatever the main is for.' },
      { title: 'Certificate pack at the end', text: 'You get the auditable pack that gets the main connected, ready for the water authority or Building Control.' },
    ],
    included: [
      'Supply and lay of the main to drawing',
      'Correct depth, bedding and surround',
      'Primary tie-ins to Scottish Water',
      'Swabbing, pressure testing and chlorination',
      'Bacteriological sampling via a UKAS lab',
      'The full certificate pack for connection',
    ],
    facts: [
      { label: 'Accreditation', value: 'WIRS' },
      { label: 'Main types', value: 'Water, fire, sprinkler, rising' },
      { label: 'Coverage', value: 'Scotland-wide, Ayr base' },
      { label: 'Turnaround', value: 'Quote by next working day' },
    ],
    process: [
      { icon: 'survey', name: 'Survey & drawings', text: 'We review your drawings and the site, and confirm the route, depth and tie-in points.' },
      { icon: 'lay', name: 'Supply & lay', text: 'The main is laid to the correct depth and bedding, ready for a clean test.' },
      { icon: 'test', name: 'Swab & test', text: 'We swab out air and debris, then pressure test the main against the allowable loss.' },
      { icon: 'disinfect', name: 'Chlorinate & sample', text: 'The main is disinfected, dechlorinated and sampled by a UKAS lab.' },
      { icon: 'certify', name: 'Tie-in & certify', text: 'We tie into the network and hand you the certificate pack for connection.' },
    ],
    faqs: [
      {
        question: 'Do you both lay and commission the main?',
        answer:
          'Yes. We supply and lay the main and then take it through swabbing, pressure testing, chlorination and sampling to a certificate. One firm handles the whole job, so nothing is lost in a handover between the groundworks and the commissioning.',
      },
      {
        question: 'What types of main do you lay?',
        answer:
          'Water, fire, sprinkler and rising mains, both adoptable and private. Whatever the main is for, it is laid to the same standard and set up to pass the tests it has to pass before it can be connected.',
      },
      {
        question: 'Are you accredited to work on Scottish Water connections?',
        answer:
          'Yes. We are a WIRS accredited contractor, which is the Water Industry Registration Scheme standard for utility connection providers. We handle primary tie-ins to the existing Scottish Water network as part of the job.',
      },
      {
        question: 'How soon can you get to site?',
        answer:
          'We are based in Ayr, so the west and central belt are quick to reach and wider Scotland is booked in on programme. Call 07749 245626 with your site and connection date, and we will tell you straight when we can be there.',
      },
    ],
    related: ['pressure-testing', 'chlorination', 'certification'],
  },
};
