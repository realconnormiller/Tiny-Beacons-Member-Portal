"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import CharacterImage from "@/components/CharacterImage";

const momentTitle = "Tonight\u2019s Tiny Moment";
const storyTitle = "A Tiny Moment";
const questionText = "What was one good thing from today?";
const prayerText =
  "God, thank You for being close to us. Help our home feel calm and safe. Amen.";

const whisperNudges = [
  "\u201CThat\u2019s a thoughtful answer.\u201D",
  "\u201CWhat makes you think that?\u201D",
  "\u201CHave you ever felt something like that?\u201D",
];

export default function MomentPage() {
  const router = useRouter();
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isFading, setIsFading] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    function onChange(e: MediaQueryListEvent) {
      setReduceMotion(e.matches);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function goTo(nextStep: 0 | 1 | 2 | 3 | 4) {
    if (nextStep !== 2) setShowWhisper(false);
    if (reduceMotion) {
      setStep(nextStep);
      return;
    }
    setIsFading(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsFading(false);
    }, 250);
  }

  const panelStyle: React.CSSProperties = {
    transition: reduceMotion ? "none" : "opacity 250ms ease",
    opacity: isFading ? 0 : 1,
  };

  return (
    <div className="page" data-scene="twilight">
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "48px 20px 40px",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={panelStyle}>
          {step === 0 && <StepArrival goTo={goTo} />}
          {step === 1 && <StepWatch goTo={goTo} />}
          {step === 2 && (
            <StepAsk
              goTo={goTo}
              showWhisper={showWhisper}
              setShowWhisper={setShowWhisper}
            />
          )}
          {step === 3 && <StepPray goTo={goTo} />}
          {step === 4 && <StepComplete router={router} />}
        </div>

        {/* Decorative characters on arrival + complete steps */}
        {(step === 0 || step === 4) && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 24,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.18,
            }}
          >
            <CharacterImage
              src="/characters/connor.png"
              anchor="bl"
              size={90}
              opacity={1}
              offsetX={0}
              offsetY={0}
            />
            <CharacterImage
              src="/characters/grace.png"
              anchor="bl"
              size={90}
              opacity={1}
              offsetX={0}
              offsetY={0}
            />
            <CharacterImage
              src="/characters/brodie.png"
              anchor="bl"
              size={80}
              opacity={1}
              offsetX={0}
              offsetY={0}
            />
            <CharacterImage
              src="/characters/luca.png"
              anchor="bl"
              size={80}
              opacity={1}
              offsetX={0}
              offsetY={0}
            />
            <CharacterImage
              src="/characters/copper.png"
              anchor="bl"
              size={70}
              opacity={1}
              offsetX={0}
              offsetY={0}
            />
            <CharacterImage
              src="/characters/zero.png"
              anchor="bl"
              size={70}
              opacity={1}
              offsetX={0}
              offsetY={0}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step components                                                    */
/* ------------------------------------------------------------------ */

function StepArrival({ goTo }: { goTo: (s: 0 | 1 | 2 | 3 | 4) => void }) {
  return (
    <>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: "0.82rem",
          color: "var(--color-text-muted)",
          letterSpacing: "0.04em",
          textTransform: "uppercase" as const,
          marginBottom: 8,
        }}
      >
        {momentTitle}
      </p>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.15rem",
          color: "var(--color-text-muted)",
          fontWeight: 400,
          marginBottom: 28,
        }}
      >
        {storyTitle}
      </h2>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.75rem",
          color: "var(--color-text)",
          fontWeight: 600,
          lineHeight: 1.3,
          marginBottom: 12,
        }}
      >
        Take a breath.
      </h1>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.05rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.5,
          marginBottom: 36,
          maxWidth: 320,
        }}
      >
        You don&rsquo;t have to carry today in here.
      </p>
      <Button onClick={() => goTo(1)}>We&rsquo;re ready &rarr;</Button>
    </>
  );
}

function StepWatch({ goTo }: { goTo: (s: 0 | 1 | 2 | 3 | 4) => void }) {
  return (
    <>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.15rem",
          color: "var(--color-text-muted)",
          fontWeight: 400,
          marginBottom: 20,
        }}
      >
        {storyTitle}
      </h2>
      <div style={{ width: "100%", marginBottom: 20 }}>
        <VideoPlaceholder />
      </div>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.5,
          marginBottom: 28,
        }}
      >
        You&rsquo;re doing something that matters.
      </p>
      <Button onClick={() => goTo(2)}>Ask together &rarr;</Button>
    </>
  );
}

function StepAsk({
  goTo,
  showWhisper,
  setShowWhisper,
}: {
  goTo: (s: 0 | 1 | 2 | 3 | 4) => void;
  showWhisper: boolean;
  setShowWhisper: (v: boolean) => void;
}) {
  return (
    <>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.15rem",
          color: "var(--color-text-muted)",
          fontWeight: 400,
          marginBottom: 20,
        }}
      >
        Ask one gentle question
      </h2>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.4rem",
          color: "var(--color-text)",
          fontWeight: 500,
          lineHeight: 1.4,
          marginBottom: 16,
          fontStyle: "italic",
          maxWidth: 340,
        }}
      >
        &ldquo;{questionText}&rdquo;
      </p>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: "0.88rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.5,
          marginBottom: 16,
          maxWidth: 320,
        }}
      >
        Let them answer in their own way. There&rsquo;s no right way.
      </p>

      <button
        onClick={() => setShowWhisper(!showWhisper)}
        style={{
          background: "none",
          border: "none",
          padding: "4px 0",
          fontFamily: "var(--sans)",
          fontSize: "0.84rem",
          color: "var(--color-primary)",
          cursor: "pointer",
          marginBottom: showWhisper ? 12 : 24,
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {showWhisper ? "Hide nudges" : "Need a gentle nudge?"}
      </button>

      {showWhisper && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {whisperNudges.map((nudge) => (
            <li
              key={nudge}
              style={{
                fontFamily: "var(--serif)",
                fontSize: "0.95rem",
                color: "var(--color-text-muted)",
                fontStyle: "italic",
              }}
            >
              {nudge}
            </li>
          ))}
        </ul>
      )}

      <Button onClick={() => goTo(3)}>We asked &rarr;</Button>
    </>
  );
}

function StepPray({ goTo }: { goTo: (s: 0 | 1 | 2 | 3 | 4) => void }) {
  return (
    <>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.15rem",
          color: "var(--color-text-muted)",
          fontWeight: 400,
          marginBottom: 20,
        }}
      >
        Pray together
      </h2>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.15rem",
          color: "var(--color-text)",
          lineHeight: 1.6,
          marginBottom: 20,
          maxWidth: 340,
          fontStyle: "italic",
        }}
      >
        {prayerText}
      </p>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: "0.88rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.5,
          marginBottom: 32,
          maxWidth: 320,
        }}
      >
        You can say this exactly as written. Or let them try in their own words.
      </p>
      <Button onClick={() => goTo(4)}>That&rsquo;s enough &rarr;</Button>
    </>
  );
}

function StepComplete({
  router,
}: {
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.75rem",
          color: "var(--color-text)",
          fontWeight: 600,
          lineHeight: 1.3,
          marginBottom: 24,
        }}
      >
        That counts.
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 36,
          maxWidth: 300,
        }}
      >
        {[
          "You made space.",
          "You slowed down.",
          "You showed up.",
          "That\u2019s more than enough.",
        ].map((line) => (
          <p
            key={line}
            style={{
              fontFamily: "var(--serif)",
              fontSize: "1.05rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
            }}
          >
            {line}
          </p>
        ))}
      </div>
      <Button onClick={() => router.push("/home")}>Go home</Button>
    </>
  );
}
