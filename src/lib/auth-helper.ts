import { auth } from "./auth";

/**
 * Get the authenticated user from the NextAuth session.
 * Use this in API routes to identify the current user.
 *
 * Returns { id, plan, email } if authenticated, null otherwise.
 */
export async function getAuthUser(): Promise<{
  id: string;
  plan: string;
  email: string;
} | null> {
  try {
    const session = await auth();
    if (!session?.user?.id) return null;

    return {
      id: session.user.id,
      plan: (session.user as { plan?: string }).plan ?? "free",
      email: session.user.email ?? "",
    };
  } catch {
    // Auth not configured or session check failed
    return null;
  }
}
