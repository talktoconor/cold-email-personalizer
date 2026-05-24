import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Paths that require authentication
const protectedPages = ["/app"];
const protectedApi = ["/api/generate", "/api/research"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtectedPage = protectedPages.some((p) =>
    pathname.startsWith(p)
  );
  const isProtectedApi = protectedApi.some((p) =>
    pathname.startsWith(p)
  );

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // Get session via NextAuth
  const session = await auth();

  if (!session) {
    if (isProtectedApi) {
      return Response.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    // Redirect unauthenticated users to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/api/generate/:path*", "/api/research/:path*"],
};
