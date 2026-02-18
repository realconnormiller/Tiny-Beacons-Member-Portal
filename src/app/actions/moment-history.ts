"use server";

import { createClient } from "@/lib/supabase/server";

export interface TodayHistory {
  watched_at: string | null;
  asked_at: string | null;
  prayed_at: string | null;
}

function todayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export async function getTodayHistory(): Promise<TodayHistory | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("moment_history")
    .select("watched_at, asked_at, prayed_at")
    .eq("user_id", user.id)
    .eq("moment_date", todayDate())
    .maybeSingle();

  return data ?? null;
}

async function upsertStep(
  column: "watched_at" | "asked_at" | "prayed_at"
): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("moment_history").upsert(
    {
      user_id: user.id,
      moment_date: todayDate(),
      [column]: new Date().toISOString(),
    },
    { onConflict: "user_id,moment_date", ignoreDuplicates: false }
  );
}

export async function recordWatched(): Promise<void> {
  await upsertStep("watched_at");
}

export async function recordAsked(): Promise<void> {
  await upsertStep("asked_at");
}

export async function recordPrayed(): Promise<void> {
  await upsertStep("prayed_at");
}
