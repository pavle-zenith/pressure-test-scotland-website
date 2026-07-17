import type { ProcessStep } from './types';

// The commissioning sequence, in order. This is the most important content on
// the site. Each step is written as a self-contained answer block: what
// happens, why it matters, what fails without it. Structured this way so an AI
// answer engine can lift a single step out of context and it still reads.

export const PROCESS: ProcessStep[] = [
  {
    order: 1,
    label: 'Swab',
    name: 'Swabbing and pre-commission cleaning',
    what: 'A foam swab is driven through the length of the main to push out trapped air and the debris left behind during installation.',
    why: 'A clean, air-free main is the precondition for every step that follows. Do this first and the pressure test reads true.',
    fails: 'Skip it and trapped air gives a false pressure reading, while leftover debris carries a chlorine demand that fails the sample.',
    focus: ['Foam swabbing', 'Air removal', 'Debris clearance'],
  },
  {
    order: 2,
    label: 'Pressure test',
    name: 'Hydrostatic pressure testing',
    what: 'The main is filled, brought up to working pressure and held, then monitored against the allowable loss for the pipe and length.',
    why: 'It proves the pipe, joints and fittings hold before the main is tied in and buried, while a fault is still cheap to reach.',
    fails: 'A leak found after connection means digging up a live tie-in, a stalled programme and a very different repair bill.',
    focus: ['Data logging', 'Working pressure', 'Joint integrity'],
  },
  {
    order: 3,
    label: 'Chlorinate',
    name: 'Chlorination and disinfection',
    what: 'A dosed disinfection solution is introduced and held in the main for the required contact time, then dechlorinated and flushed down to the network residual.',
    why: 'Disinfection is what turns a tested pipe into one fit to carry drinking water. Contact time and residual are both checked.',
    fails: 'Cut the contact time or leave the residual wrong and the bacteriological sample comes back failed, sending you back to the start.',
    focus: ['Dosing', 'Contact time', 'Dechlorination'],
  },
  {
    order: 4,
    label: 'Sample',
    name: 'Bacteriological sampling',
    what: 'Water samples are drawn from the disinfected main and sent for laboratory analysis against the potable standard.',
    why: 'The lab result is the evidence that the main is safe for supply. It is the gate Scottish Water will not let you past without.',
    fails: 'A failed sample means re-chlorination and a re-test, days of delay, and a developer asking why the plot is not connected.',
    focus: ['UKAS lab', 'Coliforms & E. coli', 'Potable standard'],
  },
  {
    order: 5,
    label: 'Certify',
    name: 'Certification',
    what: 'The results from every stage are assembled into the auditable certificate pack that Scottish Water accepts to permit connection.',
    why: 'The certificate is what you are actually buying. It is the document that turns a finished main into a connected one.',
    fails: 'A gap in the pack, a missing result or an unclear record, and the connection sits waiting while the paperwork is chased.',
    focus: ['Certificate pack', 'Audit trail', 'Scottish Water accepted'],
  },
];
