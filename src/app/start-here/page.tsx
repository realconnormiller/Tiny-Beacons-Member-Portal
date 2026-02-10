"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import VideoPlaceholder from "@/components/VideoPlaceholder";

export default function StartHerePage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [showModal, setShowModal] = useState(false);

  function handleComplete() {
    setUser({ onboardingCompleted: true });
    setShowModal(true);
  }

  return (
    <div className="page">
      <Logo />
      <h1>Your first Tiny Moment starts right here.</h1>
      <h2>Watch a story. Ask one question. That&rsquo;s enough.</h2>

      {/* Watch */}
      <div className="content-card">
        <h3>Watch the story together</h3>
        <VideoPlaceholder />
        <p style={{ marginTop: "12px" }}>Short. Calm. Kid-friendly.</p>
        <div style={{ marginTop: "16px" }}>
          <Button variant="secondary" onClick={handleComplete}>
            We watched this
          </Button>
        </div>
      </div>

      {/* Ask */}
      <div className="content-card">
        <h3>Ask one question</h3>
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
