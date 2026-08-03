import Image from 'next/image';
import { SITE, NAP_ONE_LINE } from '@/data/site';
import QuoteForm from '@/components/ui/QuoteForm';
import Icon, { type IconName } from '@/components/ui/Icon';
import { pipeTexture } from '@/assets/images';
import styles from './ContactHero.module.css';

// Contact hero: light mode with a faint pipe texture. Content on the left with
// the heading at the top and a "need immediate help" box pinned to the bottom
// (aligned with the base of the form), the standard quote form on the right,
// then a 4-block info strip that goes blue on hover.

export default function ContactHero() {
  const blocks: { label: string; value: string; icon: IconName; href?: string }[] = [
    { label: 'Address', value: NAP_ONE_LINE, icon: 'map-pin' },
    { label: 'Phone', value: SITE.phone.display, icon: 'phone', href: SITE.phone.href },
    { label: 'Email', value: SITE.email.display, icon: 'mail', href: SITE.email.href },
    { label: 'Hours', value: 'Monday to Friday, working hours', icon: 'clock' },
  ];

  return (
    <section className={styles.hero} aria-labelledby="contact-title">
      <Image src={pipeTexture} alt="" fill sizes="100vw" className={styles.photo} placeholder="blur" aria-hidden="true" priority />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.text}>
            <div className={styles.textTop}>
              <p className={styles.eyebrow}>Get in touch</p>
              <h1 id="contact-title" className={styles.title}>Let&apos;s get your main signed off.</h1>
              <p className={styles.sub}>
                Tell us what you need commissioned and where. You get a real person, a straight answer, and a quote back by the next working day.
              </p>
            </div>

            <div className={styles.help}>
              <div className={styles.helpText}>
                <span className={styles.helpTag}>Need immediate help?</span>
                <p className={styles.helpLine}>Failed sample or a stalled site? Call and we will tell you when we can be there.</p>
              </div>
              <a href={SITE.phone.href} className={styles.helpPhone}>
                <Icon name="phone" size={20} />
                {SITE.phone.display}
              </a>
            </div>
          </div>

          <div className={styles.form}>
            <QuoteForm source="contact-page" showRating submitLabel="Get my quote" />
          </div>
        </div>

        <div className={styles.strip}>
          {blocks.map((b) => {
            const inner = (
              <>
                <span className={styles.blockIcon} aria-hidden="true">
                  <Icon name={b.icon} size={20} />
                </span>
                <span className={styles.blockLabel}>{b.label}</span>
                <span className={styles.blockValue}>{b.value}</span>
              </>
            );
            return b.href ? (
              <a key={b.label} href={b.href} className={styles.block}>{inner}</a>
            ) : (
              <div key={b.label} className={styles.block}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
