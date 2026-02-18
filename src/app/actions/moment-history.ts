"use server";

import { createClient } from "@/lib/supabase/server";

export interface MomentHistory {
  watched_at: string | null;
  asked_at: string | null;
  prayed_at: string | null;
}

export async function getHistoryForMoment(
  momentId: string
): Promise<MomentHistory | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("moment_history")
    .select("watched_at, asked_at, prayed_at")
    .eq("user_id", user.id)
    .eq("moment_id", momentId)
    .maybeSingle();

  return data ?? null;
}

async function upsertStep(
  momentId: string,
  column: "watched_at" | "asked_at" | "prayed_at"
): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const now = new Date().toISOString();
  const { error } = await supabase.from("moment_history").upsert(
    {
      user_id: user.id,
      moment_id: momentId,
      updated_at: now,
      [column]: now,
    },
    { onConflict: "user_id,moment_id", ignoreDuplicates: false }
  );

  if (error) {
    console.error("moment_history write failed", error);
  }
}

export async function recordWatched(momentId: string): Promise<void> {
  await upsertStep(momentId, "watched_at");
}

export async function recordAsked(momentId: string): Promise<void> {
  await upsertStep(momentId, "asked_at");
}

export async function recordPrayed(momentId: string): Promise<void> {
  await upsertStep(momentId, "prayed_at");
}
