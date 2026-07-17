// Server-only lead handling. Runs inside the /api/quote route handler, so these
// env vars never reach the browser. Uses the Supabase and Resend REST APIs
// directly via fetch, so no SDK dependency is added. When keys are absent
// (local dev), it logs instead of calling out, so the form flow is testable
// without secrets.

import 'server-only';

export interface Lead {
  name: string;
  company?: string;
  siteLocation?: string;
  service?: string;
  email: string;
  phone?: string;
  message?: string;
  /** Where the lead came from, e.g. 'home-hero'. */
  source: string;
}

export interface LeadResult {
  ok: boolean;
  /** True when the lead was durably stored (or dev-stubbed). */
  stored: boolean;
  /** True when a notification email was sent (or dev-stubbed). */
  notified: boolean;
  error?: string;
}

// Env vars. Set in Vercel project settings, never committed.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_NOTIFY_TO = process.env.LEAD_NOTIFY_TO; // David's inbox
const LEAD_NOTIFY_FROM =
  process.env.LEAD_NOTIFY_FROM ?? 'quotes@pressuretestscotland.co.uk';

/** Insert the lead into the Supabase `leads` table. */
async function storeLead(lead: Lead): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.info('[leads] Supabase not configured, dev-stubbing store:', lead);
    return true;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: lead.name,
      company: lead.company ?? null,
      site_location: lead.siteLocation ?? null,
      service: lead.service ?? null,
      email: lead.email,
      phone: lead.phone ?? null,
      message: lead.message ?? null,
      source: lead.source,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('[leads] Supabase insert failed:', res.status, detail);
    return false;
  }
  return true;
}

/** Email David a notification of the new lead via Resend. */
async function notifyLead(lead: Lead): Promise<boolean> {
  if (!RESEND_API_KEY || !LEAD_NOTIFY_TO) {
    console.info('[leads] Resend not configured, dev-stubbing notify:', lead);
    return true;
  }

  const lines = [
    `New quote request from ${lead.source}`,
    '',
    `Name: ${lead.name}`,
    lead.company ? `Company: ${lead.company}` : null,
    lead.siteLocation ? `Site location: ${lead.siteLocation}` : null,
    lead.service ? `Service: ${lead.service}` : null,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    '',
    lead.message ? `Message:\n${lead.message}` : 'No message.',
  ].filter(Boolean);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: LEAD_NOTIFY_FROM,
      to: LEAD_NOTIFY_TO,
      reply_to: lead.email,
      subject: `Quote request: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
      text: lines.join('\n'),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('[leads] Resend send failed:', res.status, detail);
    return false;
  }
  return true;
}

/**
 * Store the lead, then notify. Storage is attempted first so a lead is never
 * lost if the email fails. Returns a granular result the endpoint turns into a
 * response.
 */
export async function submitLead(lead: Lead): Promise<LeadResult> {
  try {
    const stored = await storeLead(lead);
    const notified = await notifyLead(lead);
    // As long as one path worked, the lead is not lost.
    return { ok: stored || notified, stored, notified };
  } catch (err) {
    console.error('[leads] Unexpected error:', err);
    return {
      ok: false,
      stored: false,
      notified: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
