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
    setUser({ onboardingComplete: true });
    setShowModal(true);
  }

  return (
    <div className="page">
      <Logo />
      <h1>Your first Tiny Moment starts right here.</h1>
      <h2>Watch the story. Ask one question. Done.</h2>

      {/* CARD 1 — Watch */}
      <div className="card">
        <h3>1) Watch tonight&rsquo;s story</h3>
        <VideoPlaceholder />
        <p style={{ marginTop: "8px" }}>Short. Calm. Kid-friendly.</p>
      </div>

      {/* CARD 2 — Ask */}
      <div className="card">
        <h3>2) Ask one question</h3>
        <p
          style={{
            fontStyle: "italic",
            color: "var(--color-text)",
            fontSize: "1rem",
            marginBottom: "16px",
          }}
        >
          &ldquo;Where did you see something good today?&rdquo;
        </p>
        <Button variant="primary" onClick={handleComplete}>
          Mark question asked
        </Button>
      </div>

      {/* CARD 3 — Download */}
      <div className="card">
        <h3>3) Grab the one-page guide (optional)</h3>
        <Button variant="secondary" onClick={handleComplete}>
          Download guide
        </Button>
      </div>

      {showModal && (
        <Modal
          title="That counts. Seriously."
          body="You just created a faith moment at home. That's the whole point."
          primaryLabel="Finish setup"
          secondaryLabel="Go to my home page"
          onPrimary={() => router.push("/done")}
          onSecondary={() => router.push("/home")}
        />
      )}
    </div>
  );
}
