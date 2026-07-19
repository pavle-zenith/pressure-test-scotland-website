import Image from 'next/image';
import Button from '@/components/ui/Button';
import { aboutPipeline, pipeTexture } from '@/assets/images';
import styles from './ServicesHero.module.css';

// Services page hero: eyebrow + big heading on the left, a short intro and CTA
// on the right, over a very faint pipe texture, then a full-width image below.
export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-hero-title">
      <Image src={pipeTexture} alt="" fill sizes="100vw" className={styles.texture} placeholder="blur" aria-hidden="true" priority />
      <div className={`container ${styles.top}`}>
        <div className={styles.headline}>
          <p className="eyebrow eyebrow--slash">Our services</p>
          <h1 id="services-hero-title" className={styles.title}>
            The whole commissioning stage, one specialist
          </h1>
        </div>
        <div className={styles.aside}>
          <p className={styles.intro}>
            From clearing the pipe to the certificate that gets you connected. We supply and lay the main, then swab, test, chlorinate, sample and certify it.
          </p>
          <Button href="/contact" variant="primary" size="lg" arrow>Get a Quote</Button>
        </div>
      </div>

      <div className={styles.banner}>
        <Image src={aboutPipeline} alt="Water main pipework running through a Scottish valley" fill sizes="100vw" className={styles.bannerImg} placeholder="blur" priority />
      </div>
    </section>
  );
}
