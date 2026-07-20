import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { SITE, NAP_ONE_LINE } from '@/data/site';
import LegalPage from '@/components/legal/LegalPage';

// NOTE: This is accurate template copy grounded in how the site actually
// handles data (quote form -> Supabase + Resend, no analytics/tracking yet).
// Have David or a solicitor review before launch, and update if analytics,
// marketing email, or file uploads are added later.

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Pressure Test Scotland collects, uses and protects your information when you request a quote or get in touch.',
  path: '/privacy-policy',
  noindex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>
        This policy explains how {SITE.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses your
        personal information when you use this website or get in touch with us. We are the data
        controller for the information you provide.
      </p>

      <h2>Who we are</h2>
      <p>
        {SITE.legalName}, a company registered in Scotland (company number {SITE.companyNumber}), of{' '}
        {NAP_ONE_LINE}. You can reach us by phone on{' '}
        <a href={SITE.phone.href}>{SITE.phone.display}</a> or by email at{' '}
        <a href={SITE.email.href}>{SITE.email.display}</a>.
      </p>

      <h2>What we collect</h2>
      <p>When you request a quote or contact us, we collect only what you give us:</p>
      <ul>
        <li>Your name and, where given, your company</li>
        <li>Your phone number and email address</li>
        <li>The service you need, your site location, and any job details you provide</li>
      </ul>
      <p>
        We do not ask for any information we do not need to quote and carry out the work. We do not
        collect special category data.
      </p>

      <h2>How we use it</h2>
      <p>We use the information you provide to:</p>
      <ul>
        <li>Prepare and send you a quote</li>
        <li>Contact you about your enquiry and the work</li>
        <li>Carry out and record the work you engage us for</li>
      </ul>
      <p>
        Our lawful basis is our legitimate interest in responding to your enquiry and, where you go
        ahead, the performance of our contract with you. We do not use your details for marketing and
        we do not sell or share them for marketing.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We use a small number of trusted service providers to run this website and handle your
        enquiry. They only process your information on our instructions:
      </p>
      <ul>
        <li><strong>Supabase</strong> stores the details you submit through our forms.</li>
        <li><strong>Resend</strong> delivers the notification email of your enquiry to us.</li>
        <li><strong>Vercel</strong> hosts and serves this website.</li>
      </ul>
      <p>
        We do not share your information with anyone else unless we are required to by law.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry and quote information for as long as we need it to respond to you and to
        carry out any resulting work, and then only as long as we are required to for our records and
        legal obligations. When it is no longer needed, we delete it.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK data protection law you have the right to ask us for a copy of the information we
        hold about you, to correct it, to delete it, or to object to how we use it. To make a request,
        contact us at <a href={SITE.email.href}>{SITE.email.display}</a>. You also have the right to
        complain to the Information Commissioner&apos;s Office (ico.org.uk).
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not set advertising or analytics cookies. See our{' '}
        <a href="/cookie-policy">Cookie Policy</a> for detail.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows when it was last
        changed.
      </p>
    </LegalPage>
  );
}
