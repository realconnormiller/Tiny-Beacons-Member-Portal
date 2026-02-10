"use client";

export default function VideoPlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(135deg, var(--color-warm) 0%, var(--color-warm-deep) 50%, var(--color-peach-soft) 100%)",
        borderRadius: "var(--radius)",
        aspectRatio: "16/9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "4px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.5)",
      }}
    >
      {/* Soft sky accent in corner */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(126, 188, 212, 0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Warm glow bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-16px",
          left: "-16px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(240, 168, 110, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(30, 26, 23, 0.08)",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "9px solid transparent",
            borderBottom: "9px solid transparent",
            borderLeft: "15px solid var(--color-primary)",
            marginLeft: "3px",
          }}
        />
      </div>
    </div>
  );
}
