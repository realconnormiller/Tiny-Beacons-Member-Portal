"use client";

export default function VideoPlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(135deg, var(--color-warm) 0%, var(--color-warm-deep) 50%, var(--color-peach-soft, #fef5eb) 100%)",
        borderRadius: "var(--radius)",
        aspectRatio: "16/9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "4px",
        overflow: "hidden",
      }}
    >
      {/* Soft sky accent in corner */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(198, 221, 232, 0.20) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
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
