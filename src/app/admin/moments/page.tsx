import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "../_lib/guard";

interface Props {
  searchParams: { error?: string };
}

export default async function AdminMomentsPage({ searchParams }: Props) {
  const supabase = createClient();
  await requireAdmin(supabase);

  const { data: moments, error } = await supabase
    .from("moments")
    .select("id, slug, title, status, published_at")
    .order("created_at", { ascending: false });

  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const currentStatus = formData.get("status") as string;

    // Verify the caller is an authenticated admin using the cookie-based client.
    const client = createClient();
    const user = await requireAdmin(client);
    console.log("[togglePublish] user.id:", user.id, "| admin check: passed");

    const newStatus = currentStatus === "published" ? "draft" : "published";
    const publishedAt = newStatus === "published" ? new Date().toISOString() : null;

    // Use the service-role client for the write so RLS is not a factor.
    const { error: updateError } = await adminClient
      .from("moments")
      .update({ status: newStatus, published_at: publishedAt })
      .eq("id", id);

    if (updateError) {
      console.error(
        "[togglePublish] update failed:",
        updateError.message,
        "| user.id:",
        user.id
      );
      redirect("/admin/moments?error=1");
    }

    revalidatePath("/admin/moments");
    redirect("/admin/moments");
  }

  return (
    <div className="page">
      <h1>Moments</h1>
      <p>
        <Link href="/admin/moments/new">+ New Moment</Link>
      </p>
      {(error || searchParams.error) && (
        <p style={{ color: "#b94a48" }}>
          {searchParams.error
            ? "Update failed. Check server logs."
            : "Error loading moments."}
        </p>
      )}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Published At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(moments ?? []).map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.slug}</td>
              <td>{m.status}</td>
              <td>
                {m.published_at
                  ? new Date(m.published_at).toLocaleDateString()
                  : "—"}
              </td>
              <td>
                <Link href={`/admin/moments/${m.id}`}>Edit</Link>
                {" | "}
                <form action={togglePublish} style={{ display: "inline" }}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="status" value={m.status} />
                  <button type="submit">
                    {m.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
