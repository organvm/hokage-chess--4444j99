import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { POST } from "../src/app/api/subscribe/route";

const ENDPOINT = "http://localhost/api/subscribe";
const TEST_API_KEY = "test_api_key";
const TEST_PUBLICATION_ID = "pub_00000000-0000-0000-0000-000000000000";
const TEST_AUTOMATION_ID = "aut_00000000-0000-0000-0000-000000000000";
const TEST_NEWSLETTER_LIST_ID = "nl_list_00000000-0000-0000-0000-000000000000";

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
    vi.stubEnv("BEEHIIV_API_KEY", TEST_API_KEY);
    vi.stubEnv("BEEHIIV_PUBLICATION_ID", TEST_PUBLICATION_ID);
    vi.stubEnv("BEEHIIV_AUTOMATION_ID", TEST_AUTOMATION_ID);
    vi.stubEnv("BEEHIIV_NEWSLETTER_LIST_ID", TEST_NEWSLETTER_LIST_ID);
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
    it("returns 503 when BEEHIIV_API_KEY is absent", async () => {
      vi.stubEnv("BEEHIIV_API_KEY", "");
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

    it("returns 503 when BEEHIIV_PUBLICATION_ID is absent", async () => {
      vi.stubEnv("BEEHIIV_PUBLICATION_ID", "");
      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(503);
      const body = (await res.json()) as { reason: string };
      expect(body.reason).toBe("config_incomplete");
    });
  });

  describe("beehiiv_error branch", () => {
    it("returns 502 with reason=beehiiv_error when Beehiiv returns 4xx", async () => {
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
      expect(body.reason).toBe("beehiiv_error");
      expect(body.status).toBe(400);
      expect(body.detail).toBe("bad request");
    });

    it("returns 502 when Beehiiv returns 5xx", async () => {
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
      expect(body.reason).toBe("beehiiv_error");
      expect(body.detail).toBe("server down");
    });

    it("falls back to 'unknown' detail when Beehiiv error body is unparseable", async () => {
      fetchSpy = vi
        .spyOn(global, "fetch")
        .mockResolvedValue(new Response("plain-text-error", { status: 503 }));

      const req = buildRequest(JSON.stringify({ email: "user@example.com" }));
      const res = await POST(req);
      expect(res.status).toBe(502);
      const body = (await res.json()) as { reason: string; detail: string };
      expect(body.reason).toBe("beehiiv_error");
      expect(body.detail).toBe("unknown");
    });
  });

  describe("ok branch", () => {
    it("returns 200 with ok=true when Beehiiv accepts the subscription", async () => {
      fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ data: { id: "sub_123" } }), {
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
        new Response(JSON.stringify({ data: { id: "sub_456" } }), {
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

    it("posts to the Beehiiv subscriptions endpoint with bearer auth and Hokage Scroll metadata", async () => {
      fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ data: { id: "sub_789" } }), {
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
      expect(url).toBe(
        `https://api.beehiiv.com/v2/publications/${TEST_PUBLICATION_ID}/subscriptions`,
      );
      expect(init?.method).toBe("POST");
      expect(init?.headers).toMatchObject({
        Authorization: `Bearer ${TEST_API_KEY}`,
        "Content-Type": "application/json",
      });
      const sentBody = JSON.parse(init?.body as string) as {
        email: string;
        send_welcome_email: boolean;
        reactivate_existing: boolean;
        utm_campaign: string;
        automation_ids: string[];
        newsletter_list_ids: string[];
        custom_fields: Array<{ name: string; value: string }>;
      };
      expect(sentBody.email).toBe("user@example.com");
      expect(sentBody.send_welcome_email).toBe(true);
      expect(sentBody.reactivate_existing).toBe(true);
      expect(sentBody.utm_campaign).toBe("hokage_scroll");
      expect(sentBody.automation_ids).toEqual([TEST_AUTOMATION_ID]);
      expect(sentBody.newsletter_list_ids).toEqual([
        TEST_NEWSLETTER_LIST_ID,
      ]);
      expect(sentBody.custom_fields).toContainEqual({
        name: "newsletter",
        value: "hokage_scroll",
      });
      expect(sentBody.custom_fields).toContainEqual({
        name: "cadence",
        value: "weekly_sunday_quest_log",
      });
    });
  });
});
