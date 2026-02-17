import { createClient } from "./server";

export interface Moment {
  id: string;
  title: string;
  story_title: string;
  question: string;
  prayer: string;
  published_at: string | null;
}

/**
 * Fetch the currently active moment (the one being rotated to).
 * Falls back to the most recently published moment if no active rotation exists.
 * Returns null if no moments exist in the database yet.
 */
export async function getActiveMoment(): Promise<Moment | null> {
  const supabase = createClient();

  // Try to get the active rotation first
  const { data: rotation } = await supabase
    .from("moment_rotations")
    .select("moment_id")
    .eq("is_active", true)
    .single();

  if (rotation?.moment_id) {
    const { data: moment } = await supabase
      .from("moments")
      .select("id, title, story_title, question, prayer, published_at")
      .eq("id", rotation.moment_id)
      .single();

    if (moment) return moment as Moment;
  }

  // Fallback: most recently published moment
  const { data: fallback } = await supabase
    .from("moments")
    .select("id, title, story_title, question, prayer, published_at")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  return (fallback as Moment) ?? null;
}
