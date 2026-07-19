// Shared content types. Data modules in this folder export typed arrays that
// feed both the rendered UI and the JSON-LD, so the two never drift.

export interface Service {
  /** URL slug for the phase-2 spoke page and the #anchor on /services. */
  slug: string;
  /** Display name and Service schema `name`. */
  name: string;
  /** One sentence: what it is. */
  what: string;
  /** One line: why it matters (the failure it prevents). */
  why: string;
  /** "What's included" bullet points shown on the services page. */
  included: string[];
  /** schema.org serviceType, kept precise for AI extraction. */
  serviceType: string;
}

export interface ProcessStep {
  /** 1-based order in the commissioning sequence. */
  order: number;
  /** Short label, e.g. "Swab". */
  label: string;
  /** Full step name, e.g. "Swabbing and pre-commission cleaning". */
  name: string;
  /** What physically happens on site. */
  what: string;
  /** Why the step matters. */
  why: string;
  /** What fails if the step is skipped or done badly. */
  fails: string;
  /** Short focus tags shown as chips, e.g. ["Foam swab", "Air removal"]. */
  focus: string[];
}

export interface Segment {
  /** Short category label, e.g. "Groundworks". */
  label: string;
  /** Buyer type, e.g. "Groundworks and civils contractors". */
  name: string;
  /** The specific job PTS does for them. */
  job: string;
}

export interface Differentiator {
  /** The headline claim. Must carry a number, name or standard. */
  title: string;
  /** Supporting sentence. */
  detail: string;
  /** Set false while the claim depends on an unconfirmed fact. */
  confirmed: boolean;
}

export interface FaqItem {
  question: string;
  /** 40-70 words, self-contained, answer-first. */
  answer: string;
}

export interface CoverageArea {
  name: string;
  /** Optional note, e.g. "base" or "fast mobilisation". */
  note?: string;
}

export interface Accreditation {
  id: string;
  label: string;
  /** Path under /public or imported asset; null until a logo exists. */
  logo: string | null;
  /** Only rendered when true. Everything starts false pending David. */
  confirmed: boolean;
}

export interface ProjectSnapshot {
  slug: string;
  title: string;
  /** Where the main was. */
  location: string;
  /** What the main was (size, length, context). */
  scope: string;
  /** What PTS did and the outcome. */
  outcome: string;
  confirmed: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  confirmed: boolean;
}
