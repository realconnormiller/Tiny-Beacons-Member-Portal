"use client";

import AppHeader from "@/components/AppHeader";

export default function FavoritesPage() {
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
        Saved Moments
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
        The ones you want to come back to.
      </p>

      <div
        className="content-card"
        style={{
          margin: 0,
          textAlign: "center",
          padding: "36px 24px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            fontStyle: "italic",
          }}
        >
          You haven&rsquo;t saved anything yet.
        </p>
      </div>
    </div>
  );
}
