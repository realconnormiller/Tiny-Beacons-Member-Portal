"use client";

import AppHeader from "@/components/AppHeader";

export default function AboutPage() {
  return (
    <div className="page" data-scene="sunrise">
      <AppHeader />

      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.5rem",
          color: "var(--color-text)",
          fontWeight: 600,
          textAlign: "center",
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        Built by a family.
      </h1>

      <div
        className="content-card"
        style={{
          margin: 0,
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.6,
            maxWidth: 340,
            margin: "0 auto",
          }}
        >
          Tiny Beacons was created by parents who wanted something gentle,
          consistent, and faith-filled at home.
        </p>
      </div>
    </div>
  );
}
