import type { ProjectSnapshot, Testimonial } from './types';

// Reviews drafted on the client's own site. The quotes read genuine and are
// water-mains specific, but they are NOT yet confirmed by David as real
// attributed testimonials, and the draft carried US placeholder locations.
// Locations are rewritten to plausible Scottish ones here, and every record
// stays confirmed:false so the Reviews section does not publish until David
// verifies them. Flip confirmed:true per review once verified.

export const PROJECTS: ProjectSnapshot[] = [
  {
    slug: 'example-project',
    title: 'Placeholder project',
    location: 'Placeholder location',
    scope: 'What the main was: size, length and context.',
    outcome: 'What PTS did and the outcome, with the certificate at the end.',
    confirmed: false,
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

export const confirmedProjects = PROJECTS.filter((p) => p.confirmed);
export const confirmedTestimonials = TESTIMONIALS.filter((t) => t.confirmed);

// The single review shown in the featured testimonial section. This is a real,
// confirmed client testimonial (Peter Mauritzen, Carlsson Properties). The
// highlight is a short pull-quote drawn from the full review.
export const featuredTestimonial = {
  ...TESTIMONIALS[0],
  highlight: 'Excellent from start to finish, and second to none.',
};
