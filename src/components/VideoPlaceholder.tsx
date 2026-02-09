"use client";

export default function VideoPlaceholder() {
  return (
    <div
      style={{
        background: "#e8e4df",
        borderRadius: "var(--radius)",
        aspectRatio: "16/9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-muted)",
        fontSize: "0.85rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "4px" }}>&#9654;</div>
        Video placeholder
      </div>
    </div>
  );
}
