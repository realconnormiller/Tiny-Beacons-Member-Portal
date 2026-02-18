import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "../../_lib/guard";

export default async function NewMomentPage() {
  const supabase = createClient();
  await requireAdmin(supabase);

  async function createMoment(formData: FormData) {
    "use server";
    const slug = (formData.get("slug") as string).trim();
    const title = (formData.get("title") as string).trim();
    const description =
      (formData.get("description") as string | null)?.trim() || null;

    if (!slug || !title) return;

    const client = createClient();
    const user = await requireAdmin(client);
    console.log("[createMoment] user.id:", user.id, "| admin check: passed");

    const { error: insertError } = await client
      .from("moments")
      .insert({ slug, title, description, status: "draft" });

    if (insertError) {
      console.error(
        "[createMoment] insert failed:",
        insertError.message,
        "| user.id:",
        user.id
      );
      return;
    }

    redirect("/admin/moments");
  }

  return (
    <div className="page">
      <h1>New Moment</h1>
      <form
        action={createMoment}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}
      >
        <label>
          Slug (required)
          <input name="slug" required style={{ display: "block", width: "100%" }} />
        </label>
        <label>
          Title (required)
          <input name="title" required style={{ display: "block", width: "100%" }} />
        </label>
        <label>
          Description
          <textarea name="description" rows={4} style={{ display: "block", width: "100%" }} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
