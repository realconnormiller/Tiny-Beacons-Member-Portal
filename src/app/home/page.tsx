"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
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

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2h5l1 1 1-1h5v11H9l-1 1-1-1H2V2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 3v11" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const emotions = Object.keys(EMOTION_VERSES);
  const activeVerse = selectedEmotion ? EMOTION_VERSES[selectedEmotion] : null;

  return (
    <div className="page" data-scene="afternoon">
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      <Logo />

      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.5rem",
          lineHeight: 1.3,
          color: "var(--color-text)",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        {user.isLoggedIn ? "Welcome back." : "Your family\u2019s quiet place."}
      </h1>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: "0.95rem",
          color: "var(--color-text-muted)",
          textAlign: "center",
          marginBottom: 28,
          maxWidth: 320,
        }}
      >
        Keep it simple. Start when you&rsquo;re ready.
      </p>

      {/* Hero card — Tonight's Tiny Moment */}
      <div
        className="warm-card has-sticker"
        style={{
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          padding: "28px 24px 24px",
        }}
      >
        {/* Subtle family image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -8,
            right: -8,
            width: 140,
            height: 140,
            opacity: 0.12,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <Image
            src="/characters/family-hero.png"
            alt=""
            width={280}
            height={280}
            unoptimized
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
        </div>

        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1.15rem",
            color: "var(--color-text)",
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          Tonight&rsquo;s Tiny Moment
        </h3>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "0.92rem",
            color: "var(--color-text-muted)",
            marginBottom: 20,
          }}
        >
          A story, a question, and a prayer. Five minutes is plenty.
        </p>
        <Button variant="primary" onClick={() => router.push("/moment")}>
          Start tonight&rsquo;s moment &rarr;
        </Button>
      </div>

      {/* Prayer Cards section */}
      <div className="content-card" style={{ marginTop: 20 }}>
        <h3>
          <span className="section-icon"><HeartIcon /></span>
          Prayer Cards
        </h3>
        <p>
          Short prayers and scriptures for moments when words feel hard.
        </p>
      </div>

      {/* Emotion → Verse widget — dogs peek from behind */}
      <div style={{ position: "relative", isolation: "isolate", overflow: "visible" }}>
        <CharacterImage
          src="/characters/copper.png"
          anchor="bl"
          size={260}
          offsetX={-90}
          offsetY={20}
          opacity={0.6}
          objectPosition="left bottom"
        />
        <CharacterImage
          src="/characters/zero.png"
          anchor="br"
          size={260}
          offsetX={90}
          offsetY={20}
          opacity={0.6}
          objectPosition="right bottom"
        />

        <div className="emotion-widget" style={{ position: "relative", zIndex: 10 }}>
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
      </div>

      {/* Secondary links — text-only, visually quiet */}
      <div className="secondary-links">
        <button className="secondary-link">
          <span className="section-icon"><BookIcon /></span>
          Explore the library
        </button>
        <button className="secondary-link">Printables</button>
        <button className="secondary-link">Settings</button>
      </div>

      <p className="footer-note">No catching up required.</p>
    </div>
  );
}
