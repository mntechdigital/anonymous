import crypto from "crypto";

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4;
  const padded = normalized + (pad ? "=".repeat(4 - pad) : "");
  return Buffer.from(padded, "base64");
}

function parseSignedRequest(signedRequest: string, appSecret: string) {
  const [encodedSig, payload] = signedRequest.split(".", 2);
  const sig = base64UrlDecode(encodedSig);
  const data = JSON.parse(base64UrlDecode(payload).toString("utf8"));
  const expectedSig = crypto
    .createHmac("sha256", appSecret)
    .update(payload)
    .digest();
  if (!crypto.timingSafeEqual(sig, expectedSig)) return null;
  return data as { user_id?: string };
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const signed = form.get("signed_request");
    if (typeof signed !== "string") {
      return new Response("missing signed_request", { status: 400 });
    }

    const secret = process.env.FACEBOOK_APP_SECRET;
    if (!secret) return new Response("server misconfigured", { status: 500 });

    const data = parseSignedRequest(signed, secret);
    if (!data) return new Response("bad signature", { status: 400 });

    const code = crypto.randomBytes(12).toString("hex");
    const base = process.env.NEXTAUTH_URL || "";
    const statusUrl = `${base}/data-deletion-status?code=${code}`;

    return Response.json({ url: statusUrl, confirmation_code: code });
  } catch {
    return new Response("error", { status: 500 });
  }
}
