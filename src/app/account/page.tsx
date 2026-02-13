"use client";

import AppHeader from "@/components/AppHeader";

export default function AccountPage() {
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
          marginBottom: 16,
        }}
      >
        Account
      </h1>

      <div
        className="content-card"
        style={{
          margin: 0,
          padding: "36px 24px",
          textAlign: "center",
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
          Account features coming soon.
        </p>
      </div>
    </div>
  );
}
