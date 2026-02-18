import { NextRequest, NextResponse } from "next/server";
import pkg from "../../../../package.json";

/**
 * GET /debug/health
 *
 * Production smoke-check. Returns env-var presence and app version.
 * Never prints secret values.
 *
 * Access rules:
 *   - If DEBUG_TOKEN env var is set: require ?token=<DEBUG_TOKEN> (all envs)
 *   - Otherwise: allow only when NODE_ENV !== "production"
 *   - Unauthorized → 404 (not 401, to avoid leaking the route's existence)
 */
export async function GET(request: NextRequest) {
  const debugToken = process.env.DEBUG_TOKEN;
  const provided = request.nextUrl.searchParams.get("token");

  const allowed = debugToken
    ? provided === debugToken
    : process.env.NODE_ENV !== "production";

  if (!allowed) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    version: pkg.version,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  });
}
