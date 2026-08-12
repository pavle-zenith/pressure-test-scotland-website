import { NextResponse, type NextRequest } from 'next/server';
import { submitLead, type Lead } from '@/lib/leads';

// The one dynamic route. Secrets used inside submitLead stay server-side.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function wantsJson(request: NextRequest): boolean {
  return (request.headers.get('accept') ?? '').includes('application/json');
}

/** Reject cross-site form posts: Origin host must match the request host. */
function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // no Origin (e.g. some same-origin navigations) is allowed
  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, message: 'Cross-site request blocked.' }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: 'Could not read the form.' }, { status: 400 });
  }

  const get = (key: string) => (form.get(key) ?? '').toString().trim();
  const json = wantsJson(request);

  // Honeypot. Bots fill hp_check; pretend success. The field name is chosen so
  // browser autofill never matches it (autofill filling the old company_url
  // field silently discarded real submissions). Log every trip so a silent
  // discard is visible in the runtime logs rather than invisible.
  if (get('hp_check') !== '') {
    console.warn('[leads] honeypot tripped, submission discarded', {
      source: get('source') || 'website',
    });
    return json
      ? NextResponse.json({ ok: true })
      : NextResponse.redirect(new URL('/?sent=1#final-cta-title', request.url), 303);
  }

  const name = get('name');
  const email = get('email');
  const errors: string[] = [];
  if (!name) errors.push('name');
  if (!email || !EMAIL_RE.test(email)) errors.push('email');

  if (errors.length > 0) {
    return json
      ? NextResponse.json(
          { ok: false, message: 'Please add your name and a valid email.', fields: errors },
          { status: 422 },
        )
      : NextResponse.redirect(new URL('/?error=1#final-cta-title', request.url), 303);
  }

  const lead: Lead = {
    name,
    company: get('company') || undefined,
    siteLocation: get('site_location') || undefined,
    service: get('service') || undefined,
    email,
    phone: get('phone') || undefined,
    message: get('message') || undefined,
    source: get('source') || 'website',
  };

  const result = await submitLead(lead);

  if (!result.ok) {
    return json
      ? NextResponse.json(
          { ok: false, message: 'We could not send that just now. Please call us on 07749 245626.' },
          { status: 502 },
        )
      : NextResponse.redirect(new URL('/?error=1#final-cta-title', request.url), 303);
  }

  return json
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL('/?sent=1#final-cta-title', request.url), 303);
}
