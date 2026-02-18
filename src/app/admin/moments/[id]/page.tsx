import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "../../_lib/guard";

interface Props {
  params: { id: string };
}

export default async function EditMomentPage({ params }: Props) {
  const supabase = createClient();
  await requireAdmin(supabase);

  const { data: moment, error } = await supabase
    .from("moments")
    .select("id, slug, title, description, status, published_at, video_path")
    .eq("id", params.id)
    .single();

  if (error || !moment) notFound();

  const momentId = params.id;
  const momentSlug = moment.slug;

  async function uploadVideo(formData: FormData) {
    "use server";
    const client = createClient();
    await requireAdmin(client);

    const file = formData.get("video") as File | null;
    if (!file || file.size === 0) redirect(`/admin/moments/${momentId}`);

    const buffer = Buffer.from(await file.arrayBuffer());
    const storagePath = `${momentSlug}.mp4`;

    const { error: uploadError } = await adminClient.storage
      .from("moments")
      .upload(storagePath, buffer, { upsert: true, contentType: "video/mp4" });

    if (uploadError) {
      console.error("[uploadVideo] upload failed:", uploadError.message);
      redirect(`/admin/moments/${momentId}?error=upload`);
    }

    const { error: updateError } = await adminClient
      .from("moments")
      .update({ video_path: storagePath })
      .eq("id", momentId);

    if (updateError) {
      console.error("[uploadVideo] video_path update failed:", updateError.message);
      redirect(`/admin/moments/${momentId}?error=upload`);
    }

    revalidatePath(`/admin/moments/${momentId}`);
    revalidatePath("/admin/moments");
    redirect(`/admin/moments/${momentId}`);
  }

  async function updateMoment(formData: FormData) {
    "use server";
    const client = createClient();
    const user = await requireAdmin(client);
    console.log("[updateMoment] user.id:", user.id, "| admin check: passed");

    const slug = (formData.get("slug") as string).trim();
    const title = (formData.get("title") as string).trim();
    const description =
      (formData.get("description") as string | null)?.trim() || null;
    const status = formData.get("status") as string;
    const publishedAt = (formData.get("published_at") as string).trim() || null;
    const videoPath = (formData.get("video_path") as string).trim() || null;

    const { error: updateError } = await client
      .from("moments")
      .update({
        slug,
        title,
        description,
        status,
        published_at: publishedAt,
        video_path: videoPath,
      })
      .eq("id", momentId);

    if (updateError) {
      console.error(
        "[updateMoment] update failed:",
        updateError.message,
        "| user.id:",
        user.id,
        "| admin check had passed"
      );
      return;
    }

    revalidatePath("/admin/moments");
    redirect("/admin/moments");
  }

  return (
    <div className="page">
      <h1>Edit Moment</h1>
      <form
        action={updateMoment}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}
      >
        <label>
          Slug
          <input
            name="slug"
            defaultValue={moment.slug}
            required
            style={{ display: "block", width: "100%" }}
          />
        </label>
        <label>
          Title
          <input
            name="title"
            defaultValue={moment.title}
            required
            style={{ display: "block", width: "100%" }}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            rows={4}
            defaultValue={moment.description ?? ""}
            style={{ display: "block", width: "100%" }}
          />
        </label>
        <label>
          Status
          <select
            name="status"
            defaultValue={moment.status}
            style={{ display: "block", width: "100%" }}
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>
        <label>
          Published At (ISO datetime)
          <input
            name="published_at"
            defaultValue={moment.published_at ?? ""}
            style={{ display: "block", width: "100%" }}
          />
        </label>
        <label>
          Video Path
          <input
            name="video_path"
            defaultValue={moment.video_path ?? ""}
            style={{ display: "block", width: "100%" }}
          />
        </label>
        <button type="submit">Save</button>
      </form>

      <hr style={{ margin: "32px 0" }} />

      <h2>Upload Video (MP4)</h2>
      <p style={{ marginBottom: 8 }}>
        Current video path:{" "}
        {moment.video_path ? (
          <code>{moment.video_path}</code>
        ) : (
          <em>none</em>
        )}
        {moment.video_path && (
          <>
            {" — "}
            <a href={`/moment/${moment.slug}`} target="_blank" rel="noreferrer">
              View moment
            </a>
          </>
        )}
      </p>
      <form action={uploadVideo} encType="multipart/form-data">
        <input type="file" name="video" accept="video/mp4" required />
        <button type="submit" style={{ marginLeft: 8 }}>Upload</button>
      </form>
    </div>
  );
}
