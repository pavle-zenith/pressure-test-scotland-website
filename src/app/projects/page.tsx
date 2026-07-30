import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectsIntro from '@/components/projects/ProjectsIntro';
import ProjectsList from '@/components/projects/ProjectsList';
import FinalCta from '@/components/home/FinalCta';

export const metadata: Metadata = pageMetadata({
  title: 'Recent Projects',
  description:
    'Recent water mains laid, tested and connected across Scotland. Real jobs taken through commissioning to a signed-off Scottish Water connection.',
  path: '/projects',
  // Thin for now (one cleared job). Kept out of the index and unlinked from nav
  // until there are 2+ real, cleared projects to show. Remove noindex and add a
  // nav/footer link at that point.
  noindex: true,
});

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsIntro />
      <ProjectsList />
      <FinalCta />
    </>
  );
}
