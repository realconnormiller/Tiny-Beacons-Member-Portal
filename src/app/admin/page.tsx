import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "./_lib/guard";

export default async function AdminPage() {
  const supabase = createClient();
  await requireAdmin(supabase);

  return (
    <div className="page">
      <h1>Admin</h1>
      <ul>
        <li>
          <Link href="/admin/moments">Moments</Link>
        </li>
      </ul>
    </div>
  );
}
