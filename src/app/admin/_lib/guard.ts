import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Accept a pre-created client so callers (including server actions) always use
// a single client instance — avoiding stale-token issues from token refresh
// happening on one client while a second client reads the old cookies.
type SupabaseClient = ReturnType<typeof createClient>;

export async function requireAdmin(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  if (!profile?.is_admin) notFound();

  return user;
}
