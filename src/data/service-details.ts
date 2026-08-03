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
  /**
   * Keyword-first meta title (brand appended by pageMetadata). Front-loads the
   * search term; keep it under ~35 chars so the whole title stays under 60.
   * Falls back to the service name when absent.
   */
  metaTitle?: string;
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
    metaTitle: 'New Water Mains, Supplied & Laid',
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

  'pressure-testing': {
    slug: 'pressure-testing',
    metaTitle: 'Water Main Pressure Testing',
    tagline: 'Proven to hold, before it goes live.',
    intro:
      'Data-logged hydrostatic pressure testing that proves a new main holds working pressure before it is tied in and buried. We test PE, MDPE, barrier and ductile.',
    chips: ['Hydrostatic', 'Data-logged', 'PE & MDPE', 'Barrier & ductile'],
    overview: [
      'A leak found after connection means digging up a live tie-in, a stalled programme and a very different repair bill. A pressure test finds it while the fault is still cheap to reach. We fill the main, bring it up to working pressure and hold it, then monitor the loss against the allowable figure for the pipe material and length.',
      'The test is data-logged, so you get a clear record of what the main did under pressure, not just a verbal pass. We test PE, MDPE, barrier and ductile mains. Where we have swabbed and cleared the pipe first, the test is clean and the result stands, which is why we never test a main that has not been properly swabbed.',
    ],
    keyBenefits: [
      { title: 'Data-logged result', text: 'The test is logged, so you get an auditable record of the pressure held and the loss measured, not just a note that it passed.' },
      { title: 'Held at working pressure', text: 'The main is brought up to working pressure and held, then monitored against the allowable loss for the pipe and length.' },
      { title: 'All the common materials', text: 'We test PE, MDPE, barrier and ductile mains, adoptable and private.' },
      { title: 'Found before it is buried', text: 'A fault is caught while it is still cheap to reach, not after the main is tied in and covered.' },
      { title: 'Swabbed first, tested clean', text: 'We clear air and debris out of the pipe before testing, so the result is valid and not thrown by trapped air.' },
      { title: 'Certificate for your records', text: 'A pass certificate goes into the pack the water authority and Building Control expect to see.' },
    ],
    included: [
      'Foam swab and flush before testing',
      'Data-logged hydrostatic test',
      'Held at working pressure for the test period',
      'Loss measured against the allowable figure',
      'PE, MDPE, barrier and ductile mains',
      'Pass certificate for the compliance pack',
    ],
    facts: [
      { label: 'Method', value: 'Data-logged hydrostatic' },
      { label: 'Materials', value: 'PE, MDPE, barrier, ductile' },
      { label: 'Coverage', value: 'Scotland-wide, Ayr base' },
      { label: 'Turnaround', value: 'Quote by next working day' },
    ],
    process: [
      { icon: 'survey', name: 'Confirm the main', text: 'We confirm the pipe material, length and working pressure from your drawings.' },
      { icon: 'lay', name: 'Swab & fill', text: 'The main is swabbed clear of air and debris, then filled ready for test.' },
      { icon: 'test', name: 'Pressurise & hold', text: 'The main is brought up to working pressure and held while the loss is logged.' },
      { icon: 'certify', name: 'Log & certify', text: 'The data-logged result is recorded and a pass certificate issued for your pack.' },
    ],
    faqs: [
      {
        question: 'What pipe materials do you test?',
        answer:
          'We test PE, MDPE, barrier and ductile mains, both adoptable and private. We monitor the pressure loss against the allowable figure for that pipe material and the length of the run, so the pass reflects the main you actually have.',
      },
      {
        question: 'Is the test data-logged?',
        answer:
          'Yes. The test is data-logged, so you get a clear record of the pressure held and the loss measured over the test period. That record goes into the certificate pack the water authority and Building Control expect, rather than a verbal pass.',
      },
      {
        question: 'Do you swab the main before testing?',
        answer:
          'Always. Air and debris left in the pipe can invalidate a pressure test and cause a sample to fail later. We swab and flush the main clear first, so the test is clean and the result stands. We never test a main that has not been properly swabbed.',
      },
      {
        question: 'What happens if the main fails the test?',
        answer:
          'We find the fault while the pipe is still accessible, before it is tied in and buried, which is the whole point of testing first. That keeps the repair cheap and the programme intact, rather than digging up a live connection later.',
      },
    ],
    related: ['mains-laying', 'chlorination', 'certification'],
  },

  chlorination: {
    slug: 'chlorination',
    metaTitle: 'Chlorination & Water Sampling',
    tagline: 'Clean, disinfected and proven safe.',
    intro:
      'Swabbing, chlorination, dechlorination and UKAS-lab bacteriological sampling in one package, so the main is clean, disinfected and proven safe before it goes live.',
    chips: ['Swab & flush', 'Chlorination', 'Dechlorination', 'UKAS sampling'],
    overview: [
      'Before a new main is connected and made live, the water authority needs to see a chlorination certificate and the sample results from the microbiological test. That is the proof the new pipework is free from bacteria that could cause illness to the people it serves. Pressure Test Scotland offers a fast and complete package for the whole disinfection and sampling stage.',
      'The process starts with pre-flushing and swabbing the pipe, then the introduction of a high-strength chlorine solution, a period of standing, further flushing and a second period of standing, before we collect the final on-site parameters for chlorine residual and take the water sample. The microbiological samples are taken to and analysed by a UKAS accredited laboratory, so the result carries the weight the water authority expects.',
    ],
    keyBenefits: [
      { title: 'One package, start to sample', text: 'Swabbing, chlorination, dechlorination and sampling handled together, so nothing is missed between stages.' },
      { title: 'Swabbed and flushed first', text: 'Air, spoil and debris cleared out of the pipe before disinfection, because a dirty pipe fails its sample.' },
      { title: 'High-strength disinfection', text: 'A high-strength chlorine solution introduced and held for the required contact time, then flushed.' },
      { title: 'Dechlorinated to residual', text: 'The main is dechlorinated and flushed down to the network residual, so it is safe to connect.' },
      { title: 'UKAS accredited lab', text: 'Bacteriological samples analysed by a UKAS accredited laboratory, the result the water authority accepts.' },
      { title: 'First-time pass, our cost if not', text: 'We manage the residual carefully to pass first time, and usually carry any re-chlorination and re-sampling at our own cost.' },
    ],
    included: [
      'Pre-flush and foam swab of the main',
      'High-strength chlorine dosing',
      'Held for the required contact time',
      'Dechlorination and flush to residual',
      'On-site chlorine residual readings',
      'UKAS accredited bacteriological sampling',
    ],
    facts: [
      { label: 'Lab', value: 'UKAS accredited' },
      { label: 'Tests', value: 'Coliforms, E. coli, TVCs' },
      { label: 'Coverage', value: 'Scotland-wide, Ayr base' },
      { label: 'Turnaround', value: 'Sample result in a few days' },
    ],
    process: [
      { icon: 'lay', name: 'Swab & pre-flush', text: 'The pipe is swabbed and flushed to clear air, spoil and debris before dosing.' },
      { icon: 'disinfect', name: 'Chlorinate & stand', text: 'A high-strength chlorine solution is introduced and held for the contact time.' },
      { icon: 'test', name: 'Dechlorinate & flush', text: 'The main is dechlorinated and flushed down to the network residual.' },
      { icon: 'certify', name: 'Sample & certify', text: 'Final residuals are taken and a UKAS lab analyses the sample for the certificate.' },
    ],
    faqs: [
      {
        question: 'Why does a new main need chlorination and sampling?',
        answer:
          'Before connecting a main to make it live, the water authority needs a chlorination certificate and microbiological sample results. This demonstrates the new pipework is free from bacteria that could cause illness to those it serves. A main cannot be signed off for connection without it.',
      },
      {
        question: 'What does the chlorination process involve?',
        answer:
          'Pre-flushing and swabbing the pipe, then introducing a high-strength chlorine solution, a period of standing, further flushing, and a second period of standing. We then collect the final on-site chlorine residual readings and take the water sample for the lab.',
      },
      {
        question: 'Where are the samples analysed?',
        answer:
          'The microbiological samples are taken to and analysed by a UKAS accredited laboratory. The lab tests for coliforms, E. coli and total viable counts, and the result is what the water authority accepts as proof the main is safe to connect.',
      },
      {
        question: 'What happens if a sample fails?',
        answer:
          'The main is re-chlorinated, dechlorinated, flushed and re-sampled, which costs days, not hours. We manage the disinfection and residual carefully the first time to get a first-time pass, and we usually carry any re-chlorination and re-sampling at our own cost and time.',
      },
    ],
    related: ['mains-laying', 'pressure-testing', 'certification'],
  },

  certification: {
    slug: 'certification',
    metaTitle: 'Water Main Certification & Tie-ins',
    tagline: 'The pack that gets you connected.',
    intro:
      'The chlorination certificate and sample results pack, plus primary tie-ins to the existing Scottish Water network, so the main is ready to connect.',
    chips: ['Certificate pack', 'Sample results', 'Primary tie-ins', 'Ready to connect'],
    overview: [
      'The certificate is what gets a new main connected. Once the main has been tested, disinfected and sampled, we assemble the full pack the water authority and Building Control expect to see: the chlorination certificate, the pressure test record and the UKAS lab sample results, in one auditable set. You do not have to chase paperwork from three different places.',
      'We also handle the primary tie-ins to the existing Scottish Water infrastructure as part of the job, rather than subbing them out to a third party. One firm takes the main from an open trench to a signed certificate and a live connection, with one point of contact the whole way.',
    ],
    keyBenefits: [
      { title: 'One complete pack', text: 'The chlorination certificate, pressure test record and sample results assembled in one auditable set.' },
      { title: 'What the authority accepts', text: 'The pack is built for what the water authority and Building Control need to permit connection.' },
      { title: 'Primary tie-ins handled', text: 'Tie-ins to the existing Scottish Water network done as part of the job, not subbed out.' },
      { title: 'No paperwork chasing', text: 'You get the full record from one firm, rather than chasing documents from separate trades.' },
      { title: 'One point of contact', text: 'The same firm that laid and commissioned the main issues the pack, so nothing is lost in handover.' },
      { title: 'Ready to connect', text: 'The main is handed over signed off and ready for a live Scottish Water connection.' },
    ],
    included: [
      'Chlorination certificate',
      'Data-logged pressure test record',
      'UKAS lab sample results',
      'The full compliance pack, assembled',
      'Primary tie-ins to Scottish Water',
      'One point of contact throughout',
    ],
    facts: [
      { label: 'Pack includes', value: 'Chlorination, test, samples' },
      { label: 'Tie-ins', value: 'Primary, to Scottish Water' },
      { label: 'Coverage', value: 'Scotland-wide, Ayr base' },
      { label: 'Turnaround', value: 'Pack on sample sign-off' },
    ],
    process: [
      { icon: 'test', name: 'Collect the records', text: 'The pressure test, chlorination and sample results are gathered into one set.' },
      { icon: 'certify', name: 'Assemble the pack', text: 'We build the certificate pack the water authority and Building Control expect.' },
      { icon: 'lay', name: 'Tie in to the network', text: 'Primary tie-ins to the existing Scottish Water infrastructure are handled.' },
      { icon: 'survey', name: 'Hand over to connect', text: 'The main is handed over signed off, ready for a live connection.' },
    ],
    faqs: [
      {
        question: 'What is in the certificate pack?',
        answer:
          'The chlorination certificate, the data-logged pressure test record and the UKAS lab bacteriological sample results, assembled into one auditable set. It is the record the water authority and Building Control need to permit the main to be connected and made live.',
      },
      {
        question: 'Do you handle the tie-in to Scottish Water?',
        answer:
          'Yes. We handle primary tie-ins to the existing Scottish Water network as part of the job, rather than subbing them out. One firm takes the main from open trench to a signed certificate and a live connection, with one point of contact throughout.',
      },
      {
        question: 'How quickly do we get the pack?',
        answer:
          'The pack is assembled once the sample result comes back from the UKAS lab, which is usually a few days after sampling. Because we hold the pressure test and chlorination records already, there is no waiting on paperwork from separate trades.',
      },
    ],
    related: ['mains-laying', 'pressure-testing', 'chlorination'],
  },

  'flow-and-pressure-testing': {
    slug: 'flow-and-pressure-testing',
    metaTitle: 'Flow & Pressure Testing, Scotland',
    tagline: 'The flow and pressure figures your design needs.',
    intro:
      'Flow and pressure testing for clients and developers across Scotland, provided as a small-works survey when a fire, sprinkler or water main designer requires it.',
    chips: ['Small works', 'Flow & pressure', 'For designers', 'Scotland-wide'],
    overview: [
      'As part of our small-works services, and when a fire main, sprinkler or water main designer requires it, we can provide flow and pressure testing for clients and developers across Scotland. Designers need real flow and pressure figures to size a system correctly, and this survey gives them that. If the survey is required for your development, contact us for a quotation.',
      'Note that a Scottish Water full-capacity flow and pressure test must be carried out by Scottish Water Horizons. The survey we provide is the flow and pressure testing your designer asks for as part of the design process, not the Scottish Water Horizons capacity test.',
    ],
    keyBenefits: [
      { title: 'For the designer', text: 'Provides the flow and pressure figures a fire, sprinkler or water main designer needs to size a system.' },
      { title: 'Small-works survey', text: 'Offered as part of our small-works services, quoted per development on request.' },
      { title: 'Scotland-wide', text: 'Available to clients and developers the length of Scotland, from our Ayr base.' },
      { title: 'When your design requires it', text: 'Carried out when the designer calls for it, so you are not paying for a survey you do not need.' },
      { title: 'Clear on the scope', text: 'A Scottish Water full-capacity flow and pressure test must be done by Scottish Water Horizons; we are clear on which is which.' },
      { title: 'One call to price it', text: 'Tell us the development and what the designer has asked for, and we come back with a quotation.' },
    ],
    included: [
      'Flow and pressure survey on site',
      'For fire, sprinkler and water main designs',
      'Figures reported for your development',
      'Small-works service, quoted on request',
      'Scotland-wide, from our Ayr base',
    ],
    facts: [
      { label: 'Service', value: 'Small-works survey' },
      { label: 'For', value: 'Fire, sprinkler, water designs' },
      { label: 'Coverage', value: 'Scotland-wide, Ayr base' },
      { label: 'Note', value: 'Full capacity via SW Horizons' },
    ],
    process: [
      { icon: 'survey', name: 'Confirm the requirement', text: 'We confirm what the designer has asked for and the development details.' },
      { icon: 'test', name: 'Survey on site', text: 'Flow and pressure are measured on site for the development.' },
      { icon: 'certify', name: 'Report the figures', text: 'The figures are reported back for the design, and we quote per development.' },
    ],
    faqs: [
      {
        question: 'When do I need flow and pressure testing?',
        answer:
          'When a fire main, sprinkler or water main designer requires it to size the system for your development. It is offered as part of our small-works services. If the survey is required for your project, contact us for a quotation with the development details.',
      },
      {
        question: 'Is this the same as the Scottish Water capacity test?',
        answer:
          'No. A Scottish Water full-capacity flow and pressure test must be carried out by Scottish Water Horizons. The survey we provide is the flow and pressure testing your designer asks for as part of the design process, which is a separate small-works service.',
      },
      {
        question: 'Who is this service for?',
        answer:
          'Clients and developers across Scotland whose fire, sprinkler or water main designer has asked for flow and pressure figures. We carry it out from our Ayr base, Scotland-wide, and quote per development on request.',
      },
    ],
    related: ['mains-laying', 'pressure-testing', 'certification'],
  },
};
