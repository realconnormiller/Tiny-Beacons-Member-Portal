"use client";

import AppHeader from "@/components/AppHeader";

const MOCK_MOMENTS = [
  { title: "The Good Shepherd", theme: "Care" },
  { title: "A Bedtime Blessing", theme: "Peace" },
  { title: "The Lost Coin", theme: "Worth" },
  { title: "Seeds and Soil", theme: "Growth" },
  { title: "Jonah and the Storm", theme: "Courage" },
  { title: "David\u2019s Song", theme: "Joy" },
];

export default function LibraryPage() {
  return (
    <div className="page" data-scene="afternoon">
      <AppHeader />

      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.5rem",
          color: "var(--color-text)",
          fontWeight: 600,
          textAlign: "center",
          marginTop: 8,
          marginBottom: 6,
        }}
      >
        Tiny Moment Library
      </h1>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: "0.95rem",
          color: "var(--color-text-muted)",
          textAlign: "center",
          marginBottom: 28,
          maxWidth: 300,
        }}
      >
        Replay a past moment anytime.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          width: "100%",
        }}
      >
        {MOCK_MOMENTS.map((m) => (
          <div
            key={m.title}
            className="content-card"
            style={{
              margin: 0,
              padding: "18px 16px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.72rem",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: 4,
              }}
            >
              {m.theme}
            </p>
            <h4
              style={{
                fontFamily: "var(--serif)",
                fontSize: "0.95rem",
                color: "var(--color-text)",
                fontWeight: 500,
              }}
            >
              {m.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}
