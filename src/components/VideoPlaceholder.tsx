"use client";

export default function VideoPlaceholder() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, var(--color-warm) 0%, var(--color-warm-deep) 100%)",
        borderRadius: "var(--radius-sm)",
        aspectRatio: "16/9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "4px",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderLeft: "14px solid var(--color-primary)",
            marginLeft: "3px",
          }}
        />
      </div>
    </div>
  );
}
