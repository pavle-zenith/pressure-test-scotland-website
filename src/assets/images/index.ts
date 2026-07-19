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
import svcChlorination from './svc-chlorination.jpg';
import svcSampling from './svc-sampling.jpg';
import svcCertification from './svc-certification.jpg';

export const serviceImages: Record<string, StaticImageData> = {
  'mains-laying': svcMainsLaying,
  swabbing: svcSwabbing,
  'pressure-testing': svcPressureTesting,
  chlorination: svcChlorination,
  'bacteriological-sampling': svcSampling,
  certification: svcCertification,
};

// Who-we-work-with card images (clean, on top of each card), keyed by index.
import segGroundworks from './seg-groundworks.jpg';
import segDevelopers from './seg-developers.jpg';
import segMultiutility from './seg-multiutility.jpg';
import segConsultants from './seg-consultants.jpg';

export const segmentImages: StaticImageData[] = [
  segGroundworks,
  segDevelopers,
  segMultiutility,
  segConsultants,
];
