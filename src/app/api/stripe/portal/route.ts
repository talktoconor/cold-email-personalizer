import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { getStripe } from "@/lib/stripe";
import { getAuthUser } from "@/lib/auth-helper";

export async function POST() {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment." },
      { status: 503 }
    );
  }

  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, authUser.id))
      .limit(1);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.stripeCustomerId) {
      return Response.json(
        { error: "No billing account found. Subscribe to a plan first." },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const baseUrl = headersList.get("origin") || "http://localhost:3000";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrl}/app`,
    });

    return Response.json({ url: portalSession.url });
  } catch (err) {
    console.error("Stripe portal error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
