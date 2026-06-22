import { NextResponse } from "next/server";

// CWS-3 - Beehiiv email-capture endpoint for Hokage Scroll.
// Reads BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID from server env. Optional
// BEEHIIV_AUTOMATION_ID and BEEHIIV_NEWSLETTER_LIST_ID preserve the same public
// /api/subscribe contract while letting Beehiiv own welcome delivery.

interface SubscribeRequest {
  email?: unknown;
}

interface BeehiivErrorBody {
  error?: string;
  message?: string;
  detail?: string;
  errors?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

function compactList(values: Array<string | undefined>): string[] | undefined {
  const present = values.filter((value): value is string => Boolean(value));
  return present.length > 0 ? present : undefined;
}

function getErrorDetail(body: BeehiivErrorBody): string {
  if (body.message) return body.message;
  if (body.error) return body.error;
  if (body.detail) return body.detail;
  if (Array.isArray(body.errors) && body.errors.length > 0) {
    const first = body.errors[0] as { message?: unknown };
    return typeof first.message === "string" ? first.message : "unknown";
  }
  return "unknown";
}

export async function POST(req: Request) {
  let body: SubscribeRequest;
  try {
    body = (await req.json()) as SubscribeRequest;
  } catch {
    return NextResponse.json(
      { ok: false, reason: "invalid_json" },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, reason: "invalid_email" },
      { status: 400 },
    );
  }

  const apiKey = process.env.BEEHIIV_API_KEY; // allow-secret (env read, not hardcoded)
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const automationIds = compactList([process.env.BEEHIIV_AUTOMATION_ID]);
  const newsletterListIds = compactList([
    process.env.BEEHIIV_NEWSLETTER_LIST_ID,
  ]);

  if (!apiKey || !publicationId) {
    return NextResponse.json(
      {
        ok: false,
        reason: "config_incomplete",
        detail:
          "Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID in env. See docs/business/2026-06-22-hokage-scroll-beehiiv-runbook.md.",
      },
      { status: 503 },
    );
  }

  const subscribeRes = await fetch(
    `${BEEHIIV_API_BASE}/publications/${encodeURIComponent(publicationId)}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`, // allow-secret (env-sourced)
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "hokage_chess_site",
        utm_medium: "owned_site",
        utm_campaign: "hokage_scroll",
        referring_site: new URL(req.url).origin,
        custom_fields: [
          { name: "pillar", value: "chess" },
          { name: "source", value: "hokage-site-email-capture" },
          { name: "stage", value: "l2_lead" },
          { name: "newsletter", value: "hokage_scroll" },
          { name: "cadence", value: "weekly_sunday_quest_log" },
        ],
        ...(automationIds ? { automation_ids: automationIds } : {}),
        ...(newsletterListIds ? { newsletter_list_ids: newsletterListIds } : {}),
      }),
    },
  );

  if (!subscribeRes.ok) {
    const errBody = (await subscribeRes
      .json()
      .catch(() => ({}))) as BeehiivErrorBody;
    return NextResponse.json(
      {
        ok: false,
        reason: "beehiiv_error",
        status: subscribeRes.status,
        detail: getErrorDetail(errBody),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
