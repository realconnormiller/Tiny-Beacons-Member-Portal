export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import MomentClient from "./MomentClient";

export default async function Page() {
  const supabase = createClient();

  // Resolve the currently active moment so MomentClient can record
  // completion against the correct moment_id in moment_history.
  const { data: moment } = await supabase
    .from("moments")
    .select("id")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <Suspense fallback={null}>
      <MomentClient momentId={moment?.id ?? null} />
    </Suspense>
  );
}
