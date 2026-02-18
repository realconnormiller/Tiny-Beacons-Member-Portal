import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PROTECTED_ROUTES = [
  "/hub",
  "/moment",
  "/library",
  "/resources",
  "/favorites",
  "/account",
];

const PUBLIC_ROUTES = ["/", "/home", "/login", "/pricing", "/about", "/auth"];

function isProtected(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Let the auth callback route handler run without any session interference.
    // updateSession calls getUser() which can corrupt the PKCE code-verifier cookie
    // before exchangeCodeForSession() in the route handler has a chance to use it.
    if (pathname.startsWith("/auth/callback")) {
      return NextResponse.next();
    }

    const { user, supabaseResponse } = await updateSession(request);

    // If user is not authenticated and trying to access a protected route,
    // redirect to /login with a "next" param to preserve intended destination
    if (!user && isProtected(pathname)) {
      const url = request.nextUrl.clone();
      const search = request.nextUrl.search;
      const nextPath = search ? `${pathname}${search}` : pathname;
      url.pathname = "/login";
      url.search = "";
      url.searchParams.set("next", nextPath);
      return NextResponse.redirect(url);
    }

    // If user is authenticated and visits /login, redirect to /hub
    if (user && pathname === "/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/hub";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch {
    // Fail open: never let middleware crash the entire request.
    // Protected-route enforcement is a best-effort safety net;
    // server components and route handlers have their own auth guards.
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|characters/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
