import { SITE } from '@/data/site';
import SmartLink from '@/components/ui/SmartLink';
import styles from './MobileActionBar.module.css';

// Sticky bottom bar on mobile: two actions only, Call and Quote. Hidden at
// desktop widths where the header CTA is visible.
export default function MobileActionBar() {
  return (
    <div className={styles.bar} role="navigation" aria-label="Quick actions">
      <a className={`${styles.action} ${styles.call}`} href={SITE.phone.href}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z" fill="currentColor" />
        </svg>
        Call
      </a>
      <SmartLink className={`${styles.action} ${styles.quote}`} href="/contact">
        Get a Quote
      </SmartLink>
    </div>
  );
}
