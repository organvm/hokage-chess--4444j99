import { NextResponse } from "next/server";

// Beehiiv email-capture endpoint.
// Reads BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID from env.
// If either is absent, returns 503 so the landing form can degrade gracefully.
// When both are set, forwards to Beehiiv v2 subscriptions endpoint.

interface SubscribeRequest {
  email?: unknown;
}

interface BeehiivErrorBody {
  message?: string;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const apiKey = process.env.BEEHIIV_API_KEY; // allow-secret
  const pubId = process.env.BEEHIIV_PUBLICATION_ID; // allow-secret

  if (!apiKey || !pubId) {
    return NextResponse.json(
      {
        ok: false,
        reason: "config_incomplete",
        detail:
          "Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID in env.",
      },
      { status: 503 },
    );
  }

  const beehiivRes = await fetch(
    `https://api.beehiiv.com/v2/publications/${encodeURIComponent(pubId)}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    },
  );

  if (!beehiivRes.ok) {
    const errBody = (await beehiivRes.json().catch(() => ({}))) as BeehiivErrorBody;
    return NextResponse.json(
      {
        ok: false,
        reason: "beehiiv_error",
        status: beehiivRes.status,
        detail: errBody.message ?? errBody.error ?? "unknown",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
