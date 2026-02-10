"use client";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "28px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #f5c9a0, #e07a42, #c4622e)",
          boxShadow:
            "0 0 20px rgba(224, 122, 66, 0.35), 0 0 6px rgba(224, 122, 66, 0.18)",
        }}
      />
      <span
        style={{
          fontFamily: '"Georgia", serif',
          fontWeight: 400,
          fontSize: "1.1rem",
          color: "var(--color-text)",
          letterSpacing: "-0.01em",
        }}
      >
        Tiny Beacons
      </span>
    </div>
  );
}
