import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: { slug: string };
}

export default async function MomentPage({ params }: Props) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("moments")
    .select("id, slug, title, description, status, published_at, video_path")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    notFound();
  }

  let signedUrl: string | null = null;
  let videoError = false;

  if (data.video_path) {
    const { data: urlData, error: urlError } = await supabase.storage
      .from("moments")
      .createSignedUrl(data.video_path, 60 * 60);

    if (urlError || !urlData?.signedUrl) {
      videoError = true;
    } else {
      signedUrl = urlData.signedUrl;
    }
  }

  return (
    <div className="page">
      <h1>{data.title}</h1>
      {data.description && <p>{data.description}</p>}
      {signedUrl ? (
        <video controls playsInline preload="metadata" style={{ width: "100%", maxWidth: 720 }}>
          <source src={signedUrl} type="video/mp4" />
        </video>
      ) : videoError ? (
        <p>(Video unavailable)</p>
      ) : (
        <p>(No video uploaded yet)</p>
      )}
    </div>
  );
}
