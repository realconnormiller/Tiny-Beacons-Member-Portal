"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import CharacterImage from "@/components/CharacterImage";

const EMOTION_VERSES: Record<string, { verse: string; reference: string }> = {
  Anxious: {
    verse: "\u201CCast all your anxiety on him because he cares for you.\u201D",
    reference: "1 Peter 5:7",
  },
  Tired: {
    verse: "\u201CCome to me, all you who are weary and burdened, and I will give you rest.\u201D",
    reference: "Matthew 11:28",
  },
  Grateful: {
    verse: "\u201CGive thanks to the Lord, for he is good; his love endures forever.\u201D",
    reference: "Psalm 107:1",
  },
  Lonely: {
    verse: "\u201CThe Lord himself goes before you and will be with you; he will never leave you.\u201D",
    reference: "Deuteronomy 31:8",
  },
  Overwhelmed: {
    verse: "\u201CBe still, and know that I am God.\u201D",
    reference: "Psalm 46:10",
  },
  Hopeful: {
    verse: "\u201CFor I know the plans I have for you,\u201D declares the Lord, \u201Cplans to prosper you and not to harm you, plans to give you hope and a future.\u201D",
    reference: "Jeremiah 29:11",
  },
};

/* Small inline SVG icons (decorative only, non-interactive) */
function LanternIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v2M8 13v2M3.5 5.5a4.5 4.5 0 019 0c0 2.5-2 4-2 6H5.5c0-2-2-3.5-2-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 11.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 14s-5.5-3.5-5.5-7A3 3 0 018 4.5 3 3 0 0113.5 7C13.5 10.5 8 14 8 14z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1l2 4.5 5 .5-3.5 3.5 1 5L8 12l-4.5 2.5 1-5L1 6l5-.5L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PublicHome() {
  const router = useRouter();
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <div className="page">
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      <Logo />

      <div className="hero">
        <h1>A gentle place for faith at home.</h1>
        <h2>
          Tiny Beacons helps parents create small, meaningful moments of faith
          with their kids &mdash; without pressure, perfection, or keeping up.
        </h2>
      </div>

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/pricing")}>
          Become a member
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

      <div className="content-card" style={{ marginTop: "36px" }}>
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
          <Button variant="secondary" onClick={() => setShowPaywall(true)}>
            See how this works
          </Button>
        </div>
      </div>

      <p className="footer-note">
        There&rsquo;s nothing to catch up on. Start whenever you&rsquo;re
        ready.
      </p>

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

function MemberHome() {
  const router = useRouter();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const emotions = Object.keys(EMOTION_VERSES);
  const activeVerse = selectedEmotion
    ? EMOTION_VERSES[selectedEmotion]
    : null;

  return (
    <div className="page">
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      <Logo />
      <h1>Welcome back. Keep it simple.</h1>

      {/* Primary card — Anchor story */}
      <div className="warm-card" style={{ marginTop: "24px" }}>
        <h3>A moment when you&rsquo;re ready</h3>
        <div className="card-subtitle">The Good Shepherd</div>
        <Button variant="primary" onClick={() => router.push("/start-here")}>
          Start here
        </Button>
        <p>Five minutes is plenty.</p>
      </div>

      {/* Companion card — quiet secondary */}
      <div className="quiet-card">
        <h4>Another moment waiting for you</h4>
        <p>A Bedtime Blessing &mdash; a gentle companion piece.</p>
      </div>

      {/* Prayer Cards section */}
      <div className="content-card">
        <h3>
          <span className="section-icon"><HeartIcon /></span>
          Prayer Cards
        </h3>
        <p>
          Short prayers and scriptures for moments when words feel hard.
        </p>
      </div>

      {/* Emotion → Verse widget */}
      <div className="emotion-widget" style={{ position: "relative" }}>
        <CharacterImage src="/characters/copper.png" anchor="br" size={110} opacity={0.25} />
        <h4>
          <span className="section-icon"><StarIcon /></span>
          Need a steady word?
        </h4>
        <div className="emotion-subtext">
          Pick what you&rsquo;re feeling. We&rsquo;ll keep it simple.
        </div>
        <div className="emotion-pills">
          {emotions.map((e) => (
            <button
              key={e}
              className={`emotion-pill${selectedEmotion === e ? " selected" : ""}`}
              onClick={() =>
                setSelectedEmotion(selectedEmotion === e ? null : e)
              }
            >
              {e}
            </button>
          ))}
        </div>
        {activeVerse && (
          <div>
            <div className="verse-display">{activeVerse.verse}</div>
            <div className="verse-reference">{activeVerse.reference}</div>
          </div>
        )}
      </div>

      {/* Secondary links — text-only, visually quiet */}
      <div className="secondary-links">
        <button className="secondary-link">Printables</button>
        <button className="secondary-link">Past moments</button>
        <button className="secondary-link">Settings</button>
      </div>

      <p className="footer-note">No catching up required.</p>
    </div>
  );
}

export default function HomePage() {
  const { user } = useUser();

  if (user.isLoggedIn) {
    return <MemberHome />;
  }

  return <PublicHome />;
}
