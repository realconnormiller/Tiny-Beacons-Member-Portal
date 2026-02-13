"use client";

import AppHeader from "@/components/AppHeader";

const CARDS = [
  { title: "Need a steady word", desc: "Verses for hard moments." },
  { title: "Prayer Cards", desc: "Short prayers when words feel hard." },
  { title: "Worksheets", desc: "Printable guides for your family." },
  { title: "Phone Wallpapers", desc: "Gentle reminders for your screen." },
];

export default function ResourcesPage() {
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
        Resources
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
        Tools for when you need a little help.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        {CARDS.map((c) => (
          <div key={c.title} className="content-card" style={{ margin: 0 }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", marginBottom: 4 }}>
              {c.title}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
