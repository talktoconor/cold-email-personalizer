import { getAuthUser } from "@/lib/auth-helper";
import { getUsageStats } from "@/lib/usage";

export async function GET() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return Response.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const stats = await getUsageStats(authUser.id);
    return Response.json(stats);
  } catch (error) {
    console.error("Usage stats error:", error);
    return Response.json(
      { error: "Failed to fetch usage stats" },
      { status: 500 },
    );
  }
}
