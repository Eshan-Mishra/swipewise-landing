import { supabase } from '../lib/supabase';

// ── Anti-abuse constants ──────────────────────────────────
const COOLDOWN_MS = 30_000; // 30s between submissions
const MIN_INTERACTION_MS = 2_000; // reject if submitted < 2s after mount (bot speed)
const EMAIL_MAX_LEN = 254; // RFC 5321
const STRICT_EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Block common disposable / throwaway domains
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'dispostable.com', 'trashmail.com', 'fakeinbox.com', 'maildrop.cc',
  'temp-mail.org', 'getnada.com', '10minutemail.com',
]);

let lastSubmitTs = 0;

// ── Public API ────────────────────────────────────────────
export interface WaitlistResult {
  ok: boolean;
  error?: string;
}

/**
 * Validates and submits an email to the waitlist.
 *
 * Guards (client-side):
 *  1. Honeypot check (bot filled a hidden field)
 *  2. Time-gate: rejects submissions < 2s after page interaction
 *  3. Cooldown: 30s between consecutive calls
 *  4. Strict email regex (RFC 5322 subset)
 *  5. Length cap (254 chars)
 *  6. Disposable domain blocklist
 *
 * Server-side:
 *  - UNIQUE constraint on email (dupes treated as success)
 *  - RLS: anon INSERT only, no read/update/delete
 */
export async function joinWaitlist(
  email: string,
  source: 'hero' | 'cta' = 'hero',
  opts?: { honeypot?: string; mountedAt?: number },
): Promise<WaitlistResult> {
  // 1 ▸ Honeypot — if the hidden field has any value, it's a bot
  if (opts?.honeypot) {
    // Silently "succeed" so the bot thinks it worked
    return { ok: true };
  }

  // 2 ▸ Time-gate — bots submit instantly
  if (opts?.mountedAt && Date.now() - opts.mountedAt < MIN_INTERACTION_MS) {
    return { ok: true }; // silent fake success
  }

  // 3 ▸ Cooldown — prevent rapid-fire
  const now = Date.now();
  if (now - lastSubmitTs < COOLDOWN_MS) {
    const secsLeft = Math.ceil((COOLDOWN_MS - (now - lastSubmitTs)) / 1000);
    return { ok: false, error: `Please wait ${secsLeft}s before trying again.` };
  }

  // 4 ▸ Sanitize
  const cleaned = email.toLowerCase().trim();

  // 5 ▸ Length
  if (cleaned.length > EMAIL_MAX_LEN) {
    return { ok: false, error: 'Email address is too long.' };
  }

  // 6 ▸ Strict format
  if (!STRICT_EMAIL_RE.test(cleaned)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  // 7 ▸ Disposable domain
  const domain = cleaned.split('@')[1];
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, error: 'Please use a non-disposable email address.' };
  }

  // ── All checks passed — submit ────────────────────────
  lastSubmitTs = Date.now();

  const { error } = await supabase
    .from('waitlist')
    .insert({ email: cleaned, source });

  if (error) {
    if (error.code === '23505') {
      // unique constraint — already signed up, treat as success
      return { ok: true };
    }
    return { ok: false, error: 'Something went wrong. Please try again.' };
  }

  return { ok: true };
}
