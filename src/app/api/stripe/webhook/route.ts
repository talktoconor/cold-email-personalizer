import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { getStripe, type PlanId } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return new Response("Stripe is not configured", { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret not configured", { status: 503 });
  }

  // Read the raw body as text for signature verification
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId as PlanId | undefined;

        if (userId && planId) {
          await db
            .update(users)
            .set({
              plan: planId,
              stripeCustomerId:
                typeof session.customer === "string"
                  ? session.customer
                  : session.customer?.id ?? null,
              stripeSubscriptionId:
                typeof session.subscription === "string"
                  ? session.subscription
                  : session.subscription?.id ?? null,
              updatedAt: new Date(),
            })
            .where(eq(users.id, userId));
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer?.id;

        if (customerId) {
          // Look up user by stripe customer ID
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.stripeCustomerId, customerId))
            .limit(1);

          if (user) {
            // Update subscription ID in case it changed
            await db
              .update(users)
              .set({
                stripeSubscriptionId: subscription.id,
                updatedAt: new Date(),
              })
              .where(eq(users.id, user.id));
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer?.id;

        if (customerId) {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.stripeCustomerId, customerId))
            .limit(1);

          if (user) {
            await db
              .update(users)
              .set({
                plan: "free",
                stripeSubscriptionId: null,
                updatedAt: new Date(),
              })
              .where(eq(users.id, user.id));
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;
        console.warn(
          `Payment failed for customer ${customerId}, invoice ${invoice.id}`
        );
        break;
      }

      default:
        // Unhandled event type — acknowledge receipt
        break;
    }
  } catch (err) {
    console.error(`Error handling webhook event ${event.type}:`, err);
    return new Response("Webhook handler error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
