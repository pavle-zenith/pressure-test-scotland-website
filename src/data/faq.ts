import type { FaqItem } from './types';

// Buyer-voiced questions from the client's own draft. Answer-first, 40-70 words,
// self-contained so an AI answer engine can lift a single answer out of context.
// Feeds both the FAQ section and FAQPage schema.

export const FAQS: FaqItem[] = [
  {
    question: 'How soon can you attend?',
    answer:
      'We are based in Ayr, so the west and central belt are quick to reach, often within a few days. Wider Scotland is booked in on programme. Call 07749 245626 with your site and the stage you are at, and we will tell you straight when we can be there.',
  },
  {
    question: 'How long does the work take?',
    answer:
      'A straightforward main can be swabbed, pressure tested and chlorinated in a single visit, with sampling to follow. The lab result then takes a few days. Timing depends on the pipe length and how many stages you need, so tell us the detail and we will give you a realistic window.',
  },
  {
    question: 'What happens if a sample fails?',
    answer:
      'The main is re-chlorinated, dechlorinated and flushed, then re-sampled, which costs days, not hours. We manage the disinfection and residual carefully the first time to get a first-time pass, because a failed sample is the thing that stalls a connection and holds up plots. We usually carry any re-chlorination and re-sampling at our own cost and time.',
  },
  {
    question: 'Do private mains need testing too?',
    answer:
      'Yes. Fire, sprinkler and rising mains, and any private supply that will carry water, need pressure testing. The water authority or Building Control will want a test certificate. We handle private mains the same way as adoptable ones. Chlorination and sampling will depend on the project.',
  },
  {
    question: 'How do you price a job?',
    answer:
      'On the actual scope, not a padded one. Send us the drawings or tell us the pipe size, length and which stages you need, and we quote only that. No work you can do without, no surprises on the invoice. Call or use the form and we will come back with a price.',
  },
];
