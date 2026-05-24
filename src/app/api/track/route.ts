import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      event,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      url,
      referrer,
    } = body;

    const trackingData = {
      event: event || "page_view",
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      utm_term: utm_term || null,
      url: url || null,
      referrer: referrer || null,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // TODO: Store in database (Neon/Postgres) when connected
    // For now, log to stdout for Vercel logs
    console.log("TRACK:", JSON.stringify(trackingData));

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
