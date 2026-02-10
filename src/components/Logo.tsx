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
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #f5c9a0, #e6a96f, #d4915a)",
          boxShadow:
            "0 0 16px rgba(230, 169, 111, 0.30), 0 0 4px rgba(230, 169, 111, 0.15)",
        }}
      />
      <span
        style={{
          fontFamily: '"Georgia", serif',
          fontWeight: 400,
          fontSize: "1.08rem",
          color: "var(--color-text)",
          letterSpacing: "-0.01em",
        }}
      >
        Tiny Beacons
      </span>
    </div>
  );
}
