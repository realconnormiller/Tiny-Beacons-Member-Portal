"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

function LanternIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v2M8 13v2M3.5 5.5a4.5 4.5 0 019 0c0 2.5-2 4-2 6H5.5c0-2-2-3.5-2-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 11.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export default function RootPage() {
  const router = useRouter();
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <div className="page" style={{ padding: 0 }}>
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      {/* ── Full-bleed poster hero ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "92vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "linear-gradient(180deg, var(--color-bg) 0%, var(--color-warm) 40%, var(--color-warm-deep) 100%)",
        }}
      >
        {/* Family poster image — anchored to bottom */}
        <Image
          src="/characters/family-hero.png"
          alt="Tiny Beacons family"
          fill
          priority
          unoptimized
          draggable={false}
          style={{
            objectFit: "contain",
            objectPosition: "bottom center",
            pointerEvents: "none",
          }}
        />

        {/* Warm glow overlay behind text */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 28%, rgba(253,246,239,0.92) 0%, rgba(253,246,239,0.6) 40%, transparent 72%)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Edge vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(250,248,245,0.45) 100%)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Hero content — upper portion */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "var(--max-width)",
            padding: "48px 24px 0",
            width: "100%",
          }}
        >
          <Logo />

          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
              lineHeight: 1.25,
              color: "var(--color-text)",
              fontWeight: 600,
              marginTop: 16,
              marginBottom: 12,
              letterSpacing: "-0.01em",
            }}
          >
            A gentle place for faith at home.
          </h1>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              fontWeight: 400,
              lineHeight: 1.55,
              color: "var(--color-text-muted)",
              maxWidth: 360,
              marginBottom: 28,
            }}
          >
            Simple nightly moments to help your family slow down, breathe, and
            grow in faith &mdash; together.
          </h2>

          <div className="button-row" style={{ marginBottom: 0 }}>
            <Button variant="primary" onClick={() => router.push("/moment")}>
              Start Tonight&rsquo;s Tiny Moment &rarr;
            </Button>
            <Button
              variant="link"
              onClick={() => {
                /* placeholder for real auth */
              }}
            >
              Already a member? Log in
            </Button>
          </div>
        </div>
      </div>

      {/* ── Below the fold ── */}
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "32px 20px 40px",
        }}
      >
        <div className="content-card" style={{ marginTop: 0 }}>
          <h3>
            <span className="section-icon"><LanternIcon /></span>
            A moment when you&rsquo;re ready
          </h3>
          <p style={{ marginBottom: "12px" }}>
            This space holds gentle stories, simple prompts, and quiet prayer
            cards &mdash; always here, never rushed.
          </p>
          <p className="helper-text" style={{ marginTop: "0" }}>
            Nothing expires. Nothing stacks up.
          </p>
          <div style={{ marginTop: "20px" }}>
            <Button variant="secondary" onClick={() => router.push("/moment")}>
              See how this works
            </Button>
          </div>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button variant="secondary" onClick={() => router.push("/pricing")}>
            Become a member
          </Button>
        </div>

        <p className="footer-note">
          There&rsquo;s nothing to catch up on. Start whenever you&rsquo;re
          ready.
        </p>
      </div>

      {showPaywall && (
        <Modal
          title="This space is for Tiny Beacons families."
          body="This part of Tiny Beacons is reserved for members &mdash; parents who want a calm, trusted place to return to when sharing faith at home feels hard."
          primaryLabel="Become a member"
          secondaryLabel="Go back"
          onPrimary={() => router.push("/pricing")}
          onSecondary={() => setShowPaywall(false)}
        />
      )}
    </div>
  );
}
