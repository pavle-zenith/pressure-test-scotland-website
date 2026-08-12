'use client';

import { useState, type FormEvent } from 'react';
import { SITE } from '@/data/site';
import { SERVICES } from '@/data/services';
import Icon from './Icon';
import styles from './QuoteForm.module.css';

// Quote request form: an optional recommendation header, then Name, Site
// Location, Email, Phone, Service Needed, Message. Posts to /api/quote via fetch
// with an inline result; degrades to a native POST if JS is off.
interface Props {
  source?: string;
  /**
   * Shows the "Recommended by contractors" header (hero form). Wording is
   * provable from the named references on the reviews section; deliberately not
   * a star rating, as there is no rating system to substantiate one.
   */
  showRating?: boolean;
  submitLabel?: string;
}

type Status = { kind: 'ok' | 'error'; message: string } | null;

export default function QuoteForm({
  source = 'website',
  showRating = false,
  submitLabel = 'Get my quote',
}: Props) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        form.reset();
        // Conversion event; only lands if the visitor accepted analytics.
        window.gtag?.('event', 'quote_submitted', { source });
        setStatus({
          kind: 'ok',
          message: 'Thanks, your request is in. You will have a quote by the next working day. Call 07749 245626 if it is urgent.',
        });
      } else {
        setStatus({
          kind: 'error',
          message: json.message ?? 'Something went wrong sending that. Please call us and we will sort it.',
        });
      }
    } catch {
      setStatus({ kind: 'error', message: 'Could not reach the server. Please call us and we will sort it.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={styles.form} method="POST" action="/api/quote" noValidate onSubmit={onSubmit}>
      {showRating && (
        <a className={styles.rating} href="/#reviews">
          <span className={styles.ratingLabel}>Recommended by the contractors who put us on their sites</span>
          <Icon name="arrow-right" size={16} aria-hidden="true" />
        </a>
      )}

      <input type="hidden" name="source" value={source} />
      {/* Honeypot */}
      <div className={styles.hp} aria-hidden="true">
        <label>Leave this field empty<input type="text" name="company_url" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`qf-name-${source}`}>Your name</label>
          <input id={`qf-name-${source}`} name="name" type="text" required autoComplete="name" placeholder="John Doe" />
        </div>
        <div className={styles.field}>
          <label htmlFor={`qf-site-${source}`}>Site location</label>
          <input id={`qf-site-${source}`} name="site_location" type="text" autoComplete="address-level2" placeholder="Glasgow" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`qf-email-${source}`}>Email</label>
          <input id={`qf-email-${source}`} name="email" type="email" required autoComplete="email" placeholder="you@company.co.uk" />
        </div>
        <div className={styles.field}>
          <label htmlFor={`qf-phone-${source}`}>Phone</label>
          <input id={`qf-phone-${source}`} name="phone" type="tel" autoComplete="tel" placeholder="07…" />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`qf-service-${source}`}>Service needed</label>
        <div className={styles.selectWrap}>
          <select id={`qf-service-${source}`} name="service" defaultValue="">
            <option value="">Choose one</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
            <option value="Full commissioning">Full commissioning</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
          <Icon name="chevron-down" size={18} className={styles.chev} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`qf-message-${source}`}>Message</label>
        <textarea id={`qf-message-${source}`} name="message" rows={3}
          placeholder="120m of 90mm PE water main, need it commissioned before connection in three weeks" />
      </div>

      <button type="submit" className={styles.submit} disabled={busy}>{submitLabel}</button>

      <p className={styles.fallback}>
        Quote back by the next working day. Or call <a href={SITE.phone.href}>{SITE.phone.display}</a>
      </p>

      {status && (
        <p className={`${styles.status} ${status.kind === 'ok' ? styles.ok : styles.err}`} role="status" aria-live="polite">
          {status.message}
        </p>
      )}
    </form>
  );
}
