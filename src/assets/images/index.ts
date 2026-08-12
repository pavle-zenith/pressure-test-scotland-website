// Central image imports so components reference one place and next/image can
// optimize them (WebP/AVIF, responsive srcset, blur placeholders).
// Real stock photography; swap files here to change what each section shows.
import type { StaticImageData } from 'next/image';

// Section backdrops
export { default as heroPipes } from './hero-pipes.jpg';
export { default as aboutPipeline } from './about-pipeline.jpg';
export { default as ctaValve } from './cta-valve.jpg';
export { default as processPipework } from './services-pipework.jpg';
export { default as featuredPipes } from './contractors-pipes.jpg';
export { default as whyVan } from './why-van.jpg';
export { default as coverageScotland } from './coverage-scotland.jpg';
export { default as pipeTexture } from './pipe-texture.jpg';

// Why-choose panel images, one per differentiator (01-04). Real van first.
import whyVanImg from './why-van.jpg';
import whyPipesImg from './hero-pipes.jpg';
import whyContractorsImg from './contractors-pipes.jpg';
import whyPipelineImg from './about-pipeline.jpg';
import type { StaticImageData as _SID } from 'next/image';
export const whyImages: _SID[] = [whyVanImg, whyPipesImg, whyContractorsImg, whyPipelineImg];

// Service-card backgrounds (faded behind card text), keyed by service slug.
import svcMainsLaying from './svc-mains-laying.jpg';
import svcSwabbing from './svc-swabbing.jpg';
import svcPressureTesting from './svc-pressure-testing.jpg';
// Client-supplied real photos (2026-08-12) for certification and flow/pressure.
import svcCertification from './svc-certification-new.jpg';
import svcFlowPressure from './svc-flow-pressure-new.jpg';

// Keys match live SERVICES slugs. Swabbing and bacteriological-sampling were
// consolidated into the chlorination box (2026-07-30); their photos are reused
// below so no two adjacent cards show the same image.
export const serviceImages: Record<string, StaticImageData> = {
  'mains-laying': svcMainsLaying,
  'pressure-testing': svcPressureTesting,
  // The consolidated swab/chlorinate/sample box: the swabbing photo reads best.
  chlorination: svcSwabbing,
  certification: svcCertification,
  'flow-and-pressure-testing': svcFlowPressure,
};

// Who-we-work-with card images (clean, on top of each card), keyed by index.
// Client-supplied photos (2026-07-30) to match each buyer type: a stripped
// site for groundworks, a housing site for developers, water pipes for
// UCP/SLO, and a drawing for consultants.
import segGroundworks from './seg-groundworks-new.jpg';
import segDevelopers from './seg-developers-new.jpg';
import segMultiutility from './seg-multiutility-new.jpg';
import segConsultants from './seg-consultants-new.jpg';

export const segmentImages: StaticImageData[] = [
  segGroundworks,
  segDevelopers,
  segMultiutility,
  segConsultants,
];
