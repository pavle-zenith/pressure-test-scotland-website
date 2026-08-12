// Central image imports so components reference one place and next/image can
// optimize them (WebP/AVIF, responsive srcset, blur placeholders).
// Sources are WebP (q80) to keep the repo and build lean; next/image still
// re-encodes to AVIF/WebP per request. Swap files here to change a section.
import type { StaticImageData } from 'next/image';

// Brand. Horizontal wordmark (blue on transparent), client-supplied 2026-08-12.
export { default as logoHorizontal } from './logo-horizontal.webp';

// Section backdrops
export { default as heroPipes } from './hero-pipes.webp';
export { default as aboutPipeline } from './about-pipeline.webp';
export { default as ctaValve } from './cta-valve.webp';
export { default as processPipework } from './services-pipework.webp';
export { default as featuredPipes } from './contractors-pipes.webp';
export { default as whyVan } from './why-van.webp';
export { default as coverageScotland } from './coverage-scotland.webp';
export { default as pipeTexture } from './pipe-texture.webp';

// Why-choose panel images, one per differentiator (01-04). Real van first.
import whyVanImg from './why-van.webp';
import whyPipesImg from './hero-pipes.webp';
import whyContractorsImg from './contractors-pipes.webp';
import whyPipelineImg from './about-pipeline.webp';
import type { StaticImageData as _SID } from 'next/image';
export const whyImages: _SID[] = [whyVanImg, whyPipesImg, whyContractorsImg, whyPipelineImg];

// Service-card backgrounds (faded behind card text), keyed by service slug.
import svcMainsLaying from './svc-mains-laying.webp';
import svcSwabbing from './svc-swabbing.webp';
import svcPressureTesting from './svc-pressure-testing.webp';
// Client-supplied real photos (2026-08-12) for certification and flow/pressure.
import svcCertification from './svc-certification-new.webp';
import svcFlowPressure from './svc-flow-pressure-new.webp';

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
import segGroundworks from './seg-groundworks-new.webp';
import segDevelopers from './seg-developers-new.webp';
import segMultiutility from './seg-multiutility-new.webp';
import segConsultants from './seg-consultants-new.webp';

export const segmentImages: StaticImageData[] = [
  segGroundworks,
  segDevelopers,
  segMultiutility,
  segConsultants,
];
