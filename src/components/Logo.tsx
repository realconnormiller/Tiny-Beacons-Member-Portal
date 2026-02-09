"use client";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "36px",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, #e6a96f, #d4915a)",
          boxShadow: "0 0 12px rgba(230, 169, 111, 0.25)",
        }}
      />
      <span
        style={{
          fontFamily: '"Georgia", serif',
          fontWeight: 400,
          fontSize: "1.05rem",
          color: "var(--color-text)",
          letterSpacing: "-0.01em",
        }}
      >
        Tiny Beacons
      </span>
    </div>
  );
}
