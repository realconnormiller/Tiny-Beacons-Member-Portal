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
      <h1>Your first Tiny Moment starts here.</h1>
      <h2>Watch a short story. Ask one simple question. That&rsquo;s it.</h2>

      {/* CARD 1 — Watch */}
      <div className="card">
        <h3>Watch tonight&rsquo;s story</h3>
        <VideoPlaceholder />
        <p style={{ marginTop: "10px" }}>Short. Calm. Made for little hearts.</p>
      </div>

      {/* CARD 2 — Ask */}
      <div className="card">
        <h3>Ask one question</h3>
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
          We asked this
        </Button>
        <p className="helper-text" style={{ marginTop: "10px" }}>
          Any answer is perfect.
        </p>
      </div>

      {/* CARD 3 — Optional */}
      <div className="card">
        <h3>If you&rsquo;d like a little help</h3>
        <Button variant="secondary" onClick={handleComplete}>
          Download the one-page guide
        </Button>
        <p className="helper-text" style={{ marginTop: "10px" }}>
          Totally optional.
        </p>
      </div>

      {showModal && (
        <Modal
          title="That counts. Truly."
          body={"You just created a faith moment in your home.\nThat's the whole heart of Tiny Beacons."}
          primaryLabel="That's enough for today"
          secondaryLabel="Go to home"
          onPrimary={() => router.push("/done")}
          onSecondary={() => router.push("/home")}
        />
      )}
    </div>
  );
}
