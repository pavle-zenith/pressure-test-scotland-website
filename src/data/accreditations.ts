import type { Accreditation } from './types';

// Confirmed by client 2026-07-17: Lloyd's WIRS, SMAS (SSIP), SafeContractor.
// These render as marks on the trust bar and footer. Logo files are not yet
// supplied, so AccreditationMark falls back to a text badge until a logo path
// is added here. Set confirmed:false to hide any that later prove out of date.

export const ACCREDITATIONS: Accreditation[] = [
  { id: 'wirs', label: "Lloyd's WIRS", logo: null, confirmed: true },
  { id: 'smas', label: 'SMAS SSIP', logo: null, confirmed: true },
  { id: 'safecontractor', label: 'SafeContractor', logo: null, confirmed: true },
];

/** Only these render anywhere. */
export const confirmedAccreditations = ACCREDITATIONS.filter((a) => a.confirmed);
