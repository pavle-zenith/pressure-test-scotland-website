import type { CoverageArea } from './types';

// Coverage as crawlable text. Regions from the client's own draft. This is the
// local SEO section and the source of truth for phase-3 location pages.

export const COVERAGE_INTRO =
  'Based in Ayr, working the length of Scotland. Mobilisation is quickest across the west and central belt, and we travel wider across Scotland for planned works.';

export const COVERAGE_AREAS: CoverageArea[] = [
  { name: 'Ayrshire', note: 'base' },
  { name: 'Glasgow' },
  { name: 'Edinburgh' },
  { name: 'Lanarkshire' },
  { name: 'Central Belt' },
  { name: 'Stirling' },
  { name: 'Fife' },
  { name: 'Perth and Kinross' },
  { name: 'Dumfries and Galloway' },
  { name: 'Scottish Borders' },
];
