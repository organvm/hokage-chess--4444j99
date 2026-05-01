import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { POST } from "../src/app/api/subscribe/route";

const ENDPOINT = "http://localhost/api/subscribe";
const TEST_API_KEY = "test_api_key";
const TEST_FORM_ID = "test_form_123";

function buildRequest(body: BodyInit): Request {
  return new Request(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

describe("POST /api/subscribe", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn> | null = null;

  beforeEach(() => {
    // Default to fully-configured env so each branch test can opt in/out.
    vi.stubEnv("KIT_API_KEY", TEST_API_KEY);
    vi.stubEnv("NEXT_PUBLIC_KIT_FORM_ID", TEST_FORM_ID);
  });

  afterEach(() => {
    fetchSpy?.mockRestore();
    fetchSpy = null;
    vi.unstubAllEnvs();
  });

  describe("invalid_json branch", () => {
    it("returns 400 with reason=invalid_json when body is not valid JSON", async () => {
      const req = buildRequest("not-json");
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = (await res.json()) as { ok: boolean; reason: string };
      expect(body.ok).toBe(false);
      expect(body.reason).toBe("invalid_json");
    });

    it("returns 400 when body is empty string", async () => {
      const req = buildRequest("");
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = (await res.json()) as { reason: string };
      expect(body.reason).toBe("invalid_json");
    });
  });

  describe("invalid_email branch", () => {
    it("returns 400 with reason=invalid_email when email is missing", async () => {
      const req = buildRequest(JSON.stringify({}));
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = (await res.json()) as { ok: boolean; reason: string };
      expect(body.ok).toBe(false);
      expect(body.reason).toBe("invalid_email");
    });

    it("returns 400 when email is malformed (no @)", async () => {
      const req = buildRequest(JSON.stringify({ email: "not-an-email" }));
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = (await res.json()) as { reason: string };
      expect(body.reason).toBe("invalid_email");
    });

    it("returns 400 when email is whitespace-only", async () => {
      const req = buildRequest(JSON.stringify({ email: "   " }));
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = (await res.json()) as { reason: string };
      expect(body.reason).toBe("invalid_email");
    });

    it("returns 400 when email is wrong type (number)", async () => {
      const req = buildRequest(JSON.stringify({ email: 42 }));
      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = (await res.json()) as { reason: string };
      expect(body.reason).toBe("invalid_email");
    });
  });

  describe("config_incomplete branch", () => {
    it("returns 503 when KIT_API_KEY is absent", async () => {
      vi.stubEnv("KIT_API_KEY", "");
      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(503);
      const body = (await res.json()) as {
        ok: boolean;
        reason: string;
        detail: string;
      };
      expect(body.ok).toBe(false);
      expect(body.reason).toBe("config_incomplete");
      expect(body.detail).toBeTruthy();
    });

    it("returns 503 when NEXT_PUBLIC_KIT_FORM_ID is absent", async () => {
      vi.stubEnv("NEXT_PUBLIC_KIT_FORM_ID", "");
      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(503);
      const body = (await res.json()) as { reason: string };
      expect(body.reason).toBe("config_incomplete");
    });
  });

  describe("kit_error branch", () => {
    it("returns 502 with reason=kit_error when Kit returns 4xx", async () => {
      fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ message: "bad request" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(502);
      const body = (await res.json()) as {
        ok: boolean;
        reason: string;
        status: number;
        detail: string;
      };
      expect(body.ok).toBe(false);
      expect(body.reason).toBe("kit_error");
      expect(body.status).toBe(400);
      expect(body.detail).toBe("bad request");
    });

    it("returns 502 when Kit returns 5xx", async () => {
      fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ error: "server down" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(502);
      const body = (await res.json()) as { reason: string; detail: string };
      expect(body.reason).toBe("kit_error");
      expect(body.detail).toBe("server down");
    });

    it("falls back to 'unknown' detail when Kit error body is unparseable", async () => {
      fetchSpy = vi
        .spyOn(global, "fetch")
        .mockResolvedValue(new Response("plain-text-error", { status: 503 }));

      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(502);
      const body = (await res.json()) as { reason: string; detail: string };
      expect(body.reason).toBe("kit_error");
      expect(body.detail).toBe("unknown");
    });
  });

  describe("ok branch", () => {
    it("returns 200 with ok=true when Kit accepts the subscription", async () => {
      fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ subscription: { id: 1 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = (await res.json()) as { ok: boolean };
      expect(body.ok).toBe(true);
    });

    it("trims surrounding whitespace before validating the email", async () => {
      fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ subscription: { id: 2 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const req = buildRequest(
        JSON.stringify({ email: "  user@example.com  " }),
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = (await res.json()) as { ok: boolean };
      expect(body.ok).toBe(true);
    });

    it("posts to the Kit forms/subscribe endpoint with api_key + email", async () => {
      fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ subscription: { id: 3 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      await POST(req);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, init] = fetchSpy!.mock.calls[0] as [
        string,
        RequestInit | undefined,
      ];
      expect(url).toContain(
        `https://api.convertkit.com/v3/forms/${TEST_FORM_ID}/subscribe`,
      );
      expect(init?.method).toBe("POST");
      const sentBody = JSON.parse(init?.body as string) as {
        api_key: string;
        email: string;
      };
      expect(sentBody.api_key).toBe(TEST_API_KEY);
      expect(sentBody.email).toBe("user@example.com");
    });
  });
});
