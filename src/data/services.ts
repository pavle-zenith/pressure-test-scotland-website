import type { Service } from './types';

// Services from the client's own docs and draft. Pressure Test Scotland handles
// the whole commissioning stage plus new mains laying. Dual-purpose records:
// display fields feed the cards and /services hub, the same records feed the
// Service JSON-LD. Order runs mains first, then the commissioning sequence,
// then certification.

export const SERVICES: Service[] = [
  {
    slug: 'mains-laying',
    name: 'New mains, supplied and laid',
    what: 'Supply, lay and construct new water, fire, sprinkler and rising mains as a WIRS accredited contractor.',
    why: 'One firm lays the main and takes it through commissioning, so the job does not fall between two trades.',
    included: [
      'Water, fire, sprinkler and rising mains',
      'WIRS accredited installation',
      'Primary tie-ins to Scottish Water',
    ],
    serviceType: 'Water main laying and installation',
  },
  {
    slug: 'swabbing',
    name: 'Swabbing and flushing',
    what: 'Air, spoil and debris cleared out of the pipe first with a foam swab and flush.',
    why: 'Skip this and your pressure test is invalid and your sample fails. We never skip it.',
    included: [
      'Foam swabbing through the main',
      'Air and debris removal',
      'Flush to clean running water',
    ],
    serviceType: 'Water main swabbing and pre-commission cleaning',
  },
  {
    slug: 'pressure-testing',
    name: 'Pressure testing',
    what: 'Data-logged hydrostatic testing to prove the main holds working pressure before tie-in.',
    why: 'A leak found after connection means digging up a live tie-in. We prove it holds first.',
    included: [
      'Data-logged hydrostatic test',
      'Held at working pressure',
      'Pass certificate for your records',
    ],
    serviceType: 'Hydrostatic pressure testing of water mains',
  },
  {
    slug: 'chlorination',
    name: 'Chlorination and disinfection',
    what: 'Swab, high-strength chlorine dose, contact time, then dechlorination and flush to the network residual.',
    why: 'A main cannot go live until it is disinfected. This is what the water authority checks.',
    included: [
      'High-strength chlorine dosing',
      'Held for the required contact time',
      'Dechlorination and flush to residual',
    ],
    serviceType: 'Water main chlorination, disinfection and dechlorination',
  },
  {
    slug: 'bacteriological-sampling',
    name: 'Bacteriological sampling',
    what: 'Samples taken and analysed by a UKAS accredited lab for coliforms, E. coli and TVCs.',
    why: 'The scientific proof your connection needs. A failed sample is what stalls a site.',
    included: [
      'Samples drawn on site',
      'UKAS accredited lab analysis',
      'Coliforms, E. coli and TVCs',
    ],
    serviceType: 'Bacteriological sampling of potable water mains',
  },
  {
    slug: 'certification',
    name: 'Certification and tie-ins',
    what: 'The chlorination certificate and sample results pack, plus primary tie-ins to existing Scottish Water infrastructure.',
    why: 'The certificate is what gets you connected. We hand you the full pack, ready for the water authority.',
    included: [
      'Chlorination certificate',
      'Sample results pack',
      'Primary tie-ins to Scottish Water',
    ],
    serviceType: 'Water mains certification and Scottish Water tie-ins',
  },
];
