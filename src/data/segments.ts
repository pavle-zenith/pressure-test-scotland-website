import type { Segment } from './types';

// Who we work with. Named B2B buyer segments, each with the specific job PTS
// does for them. The subcontracting angle is deliberately first: another
// contractor who needs commissioning subbed out is the best-margin lead.

export const SEGMENTS: Segment[] = [
  {
    label: 'Groundworks',
    name: 'Groundworks and civils contractors',
    job: 'You lay the main. We swab, test, chlorinate, sample and certify it, so your scope ends at a signed-off connection.',
  },
  {
    label: 'Developers',
    name: 'Developers and housebuilders',
    job: 'We take the water main on your site through to the certificate Scottish Water needs, so plots connect on programme.',
  },
  {
    label: 'Multi-utility',
    name: 'UCP, SLO and multi-utility contractors',
    job: 'We handle the commissioning stage as your subcontractor, with a certificate pack that fits straight into your submission.',
  },
  {
    label: 'Consultants',
    name: 'Consultants and main contractors',
    job: 'One specialist owns the commissioning sequence on your commercial, industrial or public sector site, with one point of contact.',
  },
];
