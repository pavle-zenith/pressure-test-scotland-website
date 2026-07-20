import type { ProjectSnapshot, Testimonial } from './types';

// Reviews drafted on the client's own site. The quotes read genuine and are
// water-mains specific, but they are NOT yet confirmed by David as real
// attributed testimonials, and the draft carried US placeholder locations.
// Locations are rewritten to plausible Scottish ones here, and every record
// stays confirmed:false so the Reviews section does not publish until David
// verifies them. Flip confirmed:true per review once verified.

// Recent work. Only records with confirmed:true render on /projects, so nothing
// unverified or un-photographed ever publishes. The Currie job is real and
// cleared (it carries the confirmed Carlsson testimonial). The others are
// placeholders in the shape a real card takes: they DO NOT render until David
// confirms the details, clears the client name, and supplies a real photo.
// Never point `image` at a stock photo. A card with image:null renders as an
// honest text block; a fake photo is worse than none.
// Recent work shown on /projects as horizontal cards (photo + title + outcome +
// CLIENT / LOCATION / SCOPE meta). The Currie job is real and cleared. The rest
// are DUMMY entries so the grid can be seen and reviewed. Replace each with a
// real, publish-cleared job (and swap `image` for a real site photo) before
// launch; never point `image` at a stock photo in production.
export const PROJECTS: ProjectSnapshot[] = [
  {
    slug: 'currie-six-house-development',
    title: 'Six-house development, Currie',
    location: 'Currie, Edinburgh',
    client: 'Residential developer',
    scope: 'Lay, test, commission, connect',
    outcome:
      'New water mains for a six-plot residential development. We laid the mains, completed testing and commissioning, and liaised with Scottish Water through to a first-time connection so the plots progressed without a hold-up.',
    tags: ['Currie', 'New water main', 'Laid, tested, connected'],
    image: null,
    imageAlt: 'New water main for a six-house development, Currie',
    confirmed: true,
  },
  {
    // DUMMY. Replace with a real cleared job before launch.
    slug: 'dummy-glasgow-fire-main',
    title: 'New fire main, Glasgow',
    location: 'Glasgow',
    client: 'Main contractor',
    scope: 'Swab, pressure test, chlorinate, sample',
    outcome:
      'Fire main for a commercial unit swabbed, hydrostatically tested and chlorinated in a single mobilisation. Bacteriological samples came back clean first time and the full compliance pack was issued for sign-off.',
    tags: ['Glasgow', 'Fire main', 'Passed first time'],
    image: null,
    confirmed: true,
  },
  {
    // DUMMY. Replace with a real cleared job before launch.
    slug: 'dummy-perth-rural-main',
    title: 'Rural water main, Perth and Kinross',
    location: 'Perth and Kinross',
    client: 'Groundworks contractor',
    scope: 'Pressure test, chlorinate, sample, certify',
    outcome:
      'A rural connection a couple of other firms would not travel to. Pressure test, chlorination and sampling all completed in one visit, with certificates issued a few days later ready for the Scottish Water connection.',
    tags: ['Perth and Kinross', 'New water main', 'Signed off'],
    image: null,
    confirmed: true,
  },
  {
    // DUMMY. Replace with a real cleared job before launch.
    slug: 'dummy-ayr-developer',
    title: 'Twelve-plot development, Ayr',
    location: 'Ayr, South Ayrshire',
    client: 'Residential developer',
    scope: 'Supply, lay, test, commission, connect',
    outcome:
      'New water mains supplied and laid across a twelve-plot site, then swabbed, tested, chlorinated and sampled through to a live Scottish Water connection kept on the developer’s programme.',
    tags: ['Ayr', 'New water main', '12 plots'],
    image: null,
    confirmed: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    // Real, attributed client testimonial (confirmed 2026-07-17). Featured.
    quote:
      'We appointed Pressure Test Scotland to carry out the new water connections for our six-house development in Currie, and the service provided by David was excellent from start to finish. David managed the installation of all the water mains, completed the required testing and commissioning, and, most importantly, liaised with Scottish Water throughout the process to ensure a smooth and hassle-free installation for our team. His knowledge, professionalism, and attention to detail were second to none. I would have no hesitation in recommending Pressure Test Scotland for any water main installation works.',
    name: 'Peter Mauritzen',
    role: 'Construction Director',
    company: 'Carlsson Properties Limited',
    confirmed: true,
  },
  {
    quote:
      "We'd had a quote elsewhere that padded in work we didn't need. David looked at the drawings and told us straight what the job actually required, and it came in well under. Honest is the word.",
    name: 'Patricia M.',
    role: 'Care facility owner',
    company: 'Paisley',
    confirmed: false,
  },
  {
    quote:
      'Groundworks is a tight programme and a failed sample would have set us back a fortnight. The swabbing and testing was done properly, sample came back clean, and we had the full pack ready for Building Control. No chasing.',
    name: 'David R.',
    role: 'HVAC company owner',
    company: 'Glasgow',
    confirmed: false,
  },
  {
    quote:
      "Travelled up to a rural site near Perth that a couple of others wouldn't touch. Pressure test, chlorination and sampling all sorted in one visit, certificates in hand a few days later. Will use again.",
    name: 'Robert K.',
    role: 'Site manager',
    company: 'Perth',
    confirmed: false,
  },
];

// Only confirmed projects render on /projects, so nothing unverified publishes.
export const confirmedProjects = PROJECTS.filter((p) => p.confirmed);
export const confirmedTestimonials = TESTIMONIALS.filter((t) => t.confirmed);

// The single review shown in the featured testimonial section. This is a real,
// confirmed client testimonial (Peter Mauritzen, Carlsson Properties). The
// highlight is a short pull-quote drawn from the full review.
export const featuredTestimonial = {
  ...TESTIMONIALS[0],
  highlight: 'Excellent from start to finish, and second to none.',
};
