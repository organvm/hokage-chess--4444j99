import { NextResponse } from "next/server";

// V7 — Kit (ConvertKit) email-capture endpoint.
// Reads KIT_API_KEY (server-only) + NEXT_PUBLIC_KIT_FORM_ID (public) from env.
// If either is absent, returns 503 with a developer-readable reason so the
// landing form can degrade gracefully (logs locally; surfaces "config incomplete"
// in dev). When both are set, forwards to Kit v3 forms/subscribe endpoint.

interface SubscribeRequest {
  email?: unknown;
}

interface KitErrorBody {
  error?: string;
  message?: string;
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

  const apiKey = process.env.KIT_API_KEY; // allow-secret (env read, not hardcoded)
  const formId = process.env.NEXT_PUBLIC_KIT_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json(
      {
        ok: false,
        reason: "config_incomplete",
        detail:
          "Set KIT_API_KEY (server) and NEXT_PUBLIC_KIT_FORM_ID (public) in env. See docs/business/2026-04-29-kit-setup-runbook.md.",
      },
      { status: 503 },
    );
  }

  const kitRes = await fetch(
    `https://api.convertkit.com/v3/forms/${encodeURIComponent(formId)}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }), // allow-secret (env-sourced)
    },
  );

  if (!kitRes.ok) {
    const errBody = (await kitRes.json().catch(() => ({}))) as KitErrorBody;
    return NextResponse.json(
      {
        ok: false,
        reason: "kit_error",
        status: kitRes.status,
        detail: errBody.message ?? errBody.error ?? "unknown",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
