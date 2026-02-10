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
      <h2>
        Watch a short story with your child. Ask one simple question.
        That&rsquo;s it.
      </h2>

      {/* Watch */}
      <div className="invitation-card">
        <h3>Watch the story together</h3>
        <VideoPlaceholder />
        <p style={{ marginTop: "12px" }}>
          Short. Calm. Made for little hearts.
        </p>
      </div>

      {/* Ask */}
      <div className="invitation-card">
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
        <Button variant="primary" onClick={handleComplete}>
          We tried this
        </Button>
        <p className="helper-text" style={{ marginTop: "12px" }}>
          Any answer is perfect. Even silence counts.
        </p>
      </div>

      {/* Optional help */}
      <div className="invitation-card">
        <h3>If you&rsquo;d like a little help</h3>
        <p style={{ marginBottom: "14px" }}>
          A one-page guide with a few conversation starters &mdash; nothing
          more.
        </p>
        <Button variant="secondary" onClick={handleComplete}>
          Download the guide
        </Button>
        <p className="helper-text" style={{ marginTop: "12px" }}>
          Totally optional.
        </p>
      </div>

      {showModal && (
        <Modal
          title="That counts. Truly."
          body={
            "You just created a faith moment in your home.\nThat\u2019s the whole heart of Tiny Beacons."
          }
          primaryLabel="That\u2019s enough for today"
          secondaryLabel="Go to home"
          onPrimary={() => router.push("/done")}
          onSecondary={() => router.push("/home")}
        />
      )}
    </div>
  );
}
