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
    what: 'Scotland-wide supply, lay, construction and testing of new water, fire, sprinkler and rising mains as a WIRS accredited contractor.',
    why: 'One firm lays the main and takes it through commissioning, so the job does not fall between two trades.',
    included: [
      'Water, fire, sprinkler and rising mains',
      'WIRS accredited installation',
      'Primary tie-ins to Scottish Water',
    ],
    serviceType: 'Water main laying and installation',
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
    // Consolidated box (client request 2026-07-30): swabbing, flushing,
    // chlorination and bacteriological sampling combined to keep the grid tidy.
    slug: 'chlorination',
    name: 'Swabbing, chlorination and sampling',
    what: 'Swab and flush the pipe clean, dose to a high-strength chlorine residual for the contact time, dechlorinate, then take UKAS-lab samples.',
    why: 'A main cannot go live until it is clean, disinfected and proven safe. This is what the water authority checks before it signs off.',
    included: [
      'Foam swabbing and flush',
      'Chlorination, contact time and dechlorination',
      'UKAS accredited bacteriological sampling',
    ],
    serviceType: 'Water main swabbing, chlorination, disinfection and bacteriological sampling',
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
  {
    // New box (client request 2026-07-30), placed last. Small-works survey
    // offered when a fire/sprinkler or water main designer requires it.
    slug: 'flow-and-pressure-testing',
    name: 'Flow and pressure testing',
    what: 'Flow and pressure testing for clients and developers when a fire, sprinkler or water main designer requires it. A small-works survey, quoted on request.',
    why: 'Designers need real flow and pressure figures to size a system. We provide the survey your design needs.',
    included: [
      'Flow and pressure survey',
      'For fire, sprinkler and water main designs',
      'Reported for your development',
    ],
    serviceType: 'Water flow and pressure testing survey',
  },
];
