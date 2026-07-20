import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/data/site';
import LegalPage from '@/components/legal/LegalPage';

// NOTE: Accurate to the site as built today, which sets no advertising or
// analytics cookies. If analytics (e.g. Plausible/GA) or a consent banner is
// added later, update this page and add a consent mechanism.

export const metadata: Metadata = pageMetadata({
  title: 'Cookie Policy',
  description:
    'How Pressure Test Scotland uses cookies. This website sets no advertising or analytics cookies.',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="July 2026">
      <p>
        Cookies are small text files that a website can store on your device. This page explains how
        this website uses them.
      </p>

      <h2>The short version</h2>
      <p>
        This website does not set any advertising or analytics cookies, and it does not track you
        across other websites. There is no cookie banner because there is nothing to consent to.
      </p>

      <h2>What we do and do not use</h2>
      <p>
        We do not use advertising cookies, and we do not use third-party analytics that profile you.
        The site loads its own fonts and images and does not embed third-party trackers, social
        widgets or maps that would set cookies.
      </p>
      <p>
        If your browser stores anything while you use the site, it is limited to what is strictly
        necessary for the page to work and for security. These do not identify you and are not used to
        track your activity.
      </p>

      <h2>Forms</h2>
      <p>
        When you submit a quote request, the details you enter are sent to us and stored so we can
        respond. That is covered in our <a href="/privacy-policy">Privacy Policy</a>, not by cookies.
      </p>

      <h2>If this changes</h2>
      <p>
        If we add analytics or any cookie that is not strictly necessary in future, we will update
        this page and ask for your consent first.
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
