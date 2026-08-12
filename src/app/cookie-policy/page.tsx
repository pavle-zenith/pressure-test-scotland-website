import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/data/site';
import LegalPage from '@/components/legal/LegalPage';

// NOTE: The site uses Google Analytics 4, loaded only after the visitor accepts
// via the cookie banner (see components/analytics/Analytics.tsx). No analytics
// cookie is set before consent. If advertising cookies or other third parties
// are ever added, update this page and the consent banner together.

export const metadata: Metadata = pageMetadata({
  title: 'Cookie Policy',
  description:
    'How Pressure Test Scotland uses cookies, including the Google Analytics cookies that are only set if you accept them.',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="August 2026">
      <p>
        Cookies are small text files that a website can store on your device. This page explains how
        this website uses them and how you can control them.
      </p>

      <h2>The short version</h2>
      <p>
        We use Google Analytics to understand how visitors use the site. These are the only
        non-essential cookies we use, and they are set only if you press &ldquo;Accept&rdquo; on our
        cookie banner. We do not use advertising cookies and we do not track you across other
        websites.
      </p>

      <h2>Your choice</h2>
      <p>
        When you first visit, a banner asks whether you accept analytics cookies. Nothing from Google
        is loaded and no analytics cookie is set unless you accept. If you press &ldquo;Reject&rdquo;,
        the site works exactly the same and no analytics cookies are set. Your choice is remembered on
        your device so you are not asked every time.
      </p>
      <p>
        To change your mind, clear this website&rsquo;s site data in your browser settings (or use
        your browser&rsquo;s &ldquo;private&rdquo; window) and the banner will appear again on your
        next visit.
      </p>

      <h2>Analytics cookies we use</h2>
      <p>
        If you accept, Google Analytics sets a small number of cookies (such as{' '}
        <span className="mono">_ga</span> and <span className="mono">_ga_&lt;id&gt;</span>) to tell
        returning visits apart and measure things like which pages are viewed. We have IP-address
        anonymisation switched on, and we use the data only as aggregated, anonymous statistics to
        improve the site. We do not use it to identify you.
      </p>

      <h2>Strictly necessary storage</h2>
      <p>
        We store your cookie choice itself on your device so we can honour it. This is required to
        remember your decision and is not used to track you.
      </p>

      <h2>Advertising</h2>
      <p>
        We do not use advertising cookies and we do not embed third-party trackers, social widgets or
        maps that would set cookies.
      </p>

      <h2>Forms</h2>
      <p>
        When you submit a quote request, the details you enter are sent to us and stored so we can
        respond. That is covered in our <a href="/privacy-policy">Privacy Policy</a>, not by cookies.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about this policy, contact us at{' '}
        <a href={SITE.email.href}>{SITE.email.display}</a> or on{' '}
        <a href={SITE.phone.href}>{SITE.phone.display}</a>.
      </p>
    </LegalPage>
  );
}
