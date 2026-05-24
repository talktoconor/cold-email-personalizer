import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { getStripe, type PlanId } from "@/lib/stripe";
import { getAuthUser } from "@/lib/auth-helper";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment." },
      { status: 503 }
    );
  }

  try {
    const { priceId, planId } = (await request.json()) as {
      priceId: string;
      planId: PlanId;
    };

    if (!priceId || !planId) {
      return Response.json(
        { error: "priceId and planId are required" },
        { status: 400 }
      );
    }

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

    // Create or retrieve Stripe customer
    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;

      await db
        .update(users)
        .set({ stripeCustomerId, updatedAt: new Date() })
        .where(eq(users.id, authUser.id));
    }

    // Build the checkout session
    const headersList = await headers();
    const baseUrl = headersList.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/app?checkout=success`,
      cancel_url: `${baseUrl}/pricing`,
      metadata: { userId: user.id, planId },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
