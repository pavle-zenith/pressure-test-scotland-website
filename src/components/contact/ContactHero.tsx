import Image from 'next/image';
import { SITE, NAP_ONE_LINE } from '@/data/site';
import QuoteForm from '@/components/ui/QuoteForm';
import { pipeTexture } from '@/assets/images';
import styles from './ContactHero.module.css';

// Contact hero: light mode with a faint pipe texture. Content on the left with
// the heading at the top and a "need immediate help" box pinned to the bottom
// (aligned with the base of the form), the standard quote form on the right,
// then a 4-block info strip that goes blue on hover.

function Icon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PIN = 'M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z';
const PIN_DOT = 'M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z';
const PHONE = 'M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z';
const MAIL = 'M4 6h16v12H4zM4 7l8 6 8-6';
const CLOCK = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2';

export default function ContactHero() {
  const blocks = [
    { label: 'Address', value: NAP_ONE_LINE, icon: PIN, sub: PIN_DOT, href: undefined },
    { label: 'Phone', value: SITE.phone.display, icon: PHONE, href: SITE.phone.href },
    { label: 'Email', value: SITE.email.display, icon: MAIL, href: SITE.email.href },
    { label: 'Hours', value: 'Monday to Friday, working hours', icon: CLOCK, href: undefined },
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={PHONE} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                  <Icon path={b.icon} />
                  {b.sub && (
                    <svg className={styles.blockIconDot} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d={b.sub} stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
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
