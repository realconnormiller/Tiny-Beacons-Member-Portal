"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import CharacterImage from "@/components/CharacterImage";

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

      {/* Watch — family peeks from behind the card */}
      <div style={{ position: "relative", isolation: "isolate", overflow: "visible" }}>
        <CharacterImage
          src="/characters/connor.png"
          anchor="bl"
          size={340}
          offsetX={-110}
          offsetY={40}
          opacity={0.55}
          objectPosition="left bottom"
        />
        <CharacterImage
          src="/characters/grace.png"
          anchor="bl"
          size={320}
          offsetX={-70}
          offsetY={85}
          opacity={0.55}
          objectPosition="left bottom"
        />
        <CharacterImage
          src="/characters/brodie.png"
          anchor="br"
          size={320}
          offsetX={110}
          offsetY={40}
          opacity={0.55}
          objectPosition="right bottom"
        />
        <CharacterImage
          src="/characters/luca.png"
          anchor="br"
          size={300}
          offsetX={70}
          offsetY={85}
          opacity={0.55}
          objectPosition="right bottom"
        />

        <div className="story-panel" style={{ position: "relative", zIndex: 10 }}>
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

      {/* Ask */}
      <div className="story-panel" style={{ position: "relative" }}>
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
