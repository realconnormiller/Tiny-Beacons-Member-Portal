"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import Image from "next/image";

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6.5 5l4 3-4 3V5z" fill="currentColor" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 3h12v8H6l-3 2v-2H2V3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function StartHerePage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [showModal, setShowModal] = useState(false);

  function handleComplete() {
    setUser({ onboardingCompleted: true });
    setShowModal(true);
  }

  return (
    <div className="page" data-scene="twilight">
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      <Logo />
      <h1>Your first Tiny Moment starts right here.</h1>
      <h2>Watch a story. Ask one question. That&rsquo;s enough.</h2>

      {/* Watch — family peeks from sides of the card via peek windows */}
      <div style={{ position: "relative", isolation: "isolate", overflow: "visible" }}>

        {/* WATCH — LEFT PEEK WINDOW (parents) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -10,
            top: 62,
            width: 210,
            height: 220,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/characters/connor.png"
              alt=""
              width={420}
              height={420}
              unoptimized
              draggable={false}
              style={{
                position: "absolute",
                left: -290,
                top: -90,
                opacity: 0.62,
                filter: "saturate(1.02) contrast(1.05) drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
              }}
            />
            <Image
              src="/characters/grace.png"
              alt=""
              width={400}
              height={400}
              unoptimized
              draggable={false}
              style={{
                position: "absolute",
                left: -255,
                top: 30,
                opacity: 0.62,
                filter: "saturate(1.02) contrast(1.05) drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
              }}
            />
          </div>
        </div>

        {/* WATCH — RIGHT PEEK WINDOW (kids) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -10,
            top: 62,
            width: 210,
            height: 220,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/characters/brodie.png"
              alt=""
              width={400}
              height={400}
              unoptimized
              draggable={false}
              style={{
                position: "absolute",
                right: -290,
                top: -90,
                opacity: 0.62,
                filter: "saturate(1.02) contrast(1.05) drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
              }}
            />
            <Image
              src="/characters/luca.png"
              alt=""
              width={380}
              height={380}
              unoptimized
              draggable={false}
              style={{
                position: "absolute",
                right: -255,
                top: 30,
                opacity: 0.62,
                filter: "saturate(1.02) contrast(1.05) drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
              }}
            />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          <div className="story-panel">
            <h3>
              <span className="section-icon"><PlayIcon /></span>
              Watch the story together
            </h3>
            <VideoPlaceholder />
            <p style={{ marginTop: "12px" }}>Short. Calm. Kid-friendly.</p>
            <div style={{ marginTop: "16px" }}>
              <Button variant="secondary" onClick={handleComplete}>
                We watched this
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ask — dogs peek from sides of the card via peek windows */}
      <div style={{ position: "relative", isolation: "isolate", overflow: "visible" }}>

        {/* ASK — LEFT PEEK WINDOW (copper) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -10,
            top: 46,
            width: 200,
            height: 200,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/characters/copper.png"
              alt=""
              width={360}
              height={360}
              unoptimized
              draggable={false}
              style={{
                position: "absolute",
                left: -250,
                top: -70,
                opacity: 0.62,
                filter: "saturate(1.02) contrast(1.05) drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
              }}
            />
          </div>
        </div>

        {/* ASK — RIGHT PEEK WINDOW (zero) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -10,
            top: 46,
            width: 200,
            height: 200,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/characters/zero.png"
              alt=""
              width={360}
              height={360}
              unoptimized
              draggable={false}
              style={{
                position: "absolute",
                right: -250,
                top: -70,
                opacity: 0.62,
                filter: "saturate(1.02) contrast(1.05) drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
              }}
            />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          <div className="story-panel">
            <div className="watermark watermark--leaf" aria-hidden="true" style={{ top: 8, right: 10 }} />
            <h3>
              <span className="section-icon"><ChatIcon /></span>
              Ask one question
            </h3>
            <p
              style={{
                fontStyle: "italic",
                color: "var(--color-text)",
                fontSize: "1rem",
                marginBottom: "16px",
                fontFamily: "var(--serif)",
              }}
            >
              &ldquo;Where did you see something good today?&rdquo;
            </p>
            <Button variant="secondary" onClick={handleComplete}>
              We asked this
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          title="That counts. Seriously."
          body={
            <>
              <p>You showed up for your child.{"\n"}That&rsquo;s the whole point.</p>
              <p>You showed up. That matters.</p>
            </>
          }
          primaryLabel="Go home"
          secondaryLabel="Finish setup"
          onPrimary={() => router.push("/home")}
          onSecondary={() => router.push("/done")}
        />
      )}
    </div>
  );
}
