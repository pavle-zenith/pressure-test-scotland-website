import { SITE } from '@/data/site';
import SmartLink from '@/components/ui/SmartLink';
import Icon from '@/components/ui/Icon';
import styles from './MobileActionBar.module.css';

// Sticky bottom bar on mobile: two actions only, Call and Quote. Hidden at
// desktop widths where the header CTA is visible.
export default function MobileActionBar() {
  return (
    <div className={styles.bar} role="navigation" aria-label="Quick actions">
      <a className={`${styles.action} ${styles.call}`} href={SITE.phone.href}>
        <Icon name="phone" size={18} />
        Call
      </a>
      <SmartLink className={`${styles.action} ${styles.quote}`} href="/contact">
        Get a Quote
      </SmartLink>
    </div>
  );
}
