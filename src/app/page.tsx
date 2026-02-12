"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function RootPage() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "90vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#F5EFE6",
      }}
    >
      {/* Hero text content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 480,
          width: "100%",
          padding: "60px 24px 32px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            lineHeight: 1.25,
            color: "var(--color-text)",
            fontWeight: 600,
            marginBottom: 14,
            letterSpacing: "-0.01em",
          }}
        >
          A gentle place for faith at home.
        </h1>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(0.95rem, 2.5vw, 1.12rem)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "var(--color-text-muted)",
            maxWidth: 360,
            marginBottom: 30,
          }}
        >
          Simple nightly moments to help your family slow down, breathe, and
          grow in faith &mdash; together.
        </p>

        <Button onClick={() => router.push("/moment")}>
          Start Tonight&rsquo;s Tiny Moment &rarr;
        </Button>

        <button
          onClick={() => {
            /* placeholder for real auth */
          }}
          style={{
            marginTop: 14,
            background: "none",
            border: "none",
            fontFamily: "var(--sans)",
            fontSize: "0.88rem",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            padding: "8px 0",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          Already a member? Log in
        </button>
      </div>

      {/* Family poster image — anchored to bottom center */}
      <div
        style={{
          position: "relative",
          width: "100%",
          flex: 1,
          minHeight: 280,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Image
          src="/characters/family-hero.png"
          alt="Tiny Beacons family"
          width={700}
          height={700}
          priority
          unoptimized
          draggable={false}
          style={{
            width: "clamp(320px, 70vw, 700px)",
            height: "auto",
            display: "block",
            pointerEvents: "none",
            objectFit: "contain",
            objectPosition: "bottom center",
          }}
        />
      </div>
    </div>
  );
}
