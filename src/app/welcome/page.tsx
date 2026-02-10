"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import CharacterImage from "@/components/CharacterImage";

export default function WelcomePage() {
  const router = useRouter();
  const { setUser } = useUser();

  function handleStart() {
    setUser({ isLoggedIn: true });
    router.push("/setup");
  }

  return (
    <div className="page">
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      <Logo />

      <div className="hero" style={{ position: "relative" }}>
        <CharacterImage src="/characters/connor.png" position="br" size={130} opacity={0.12} />
        <h1>Welcome to Tiny Beacons. You&rsquo;re in the right place.</h1>
        <h2>
          Most parents want to lead spiritually at home &mdash; we&rsquo;ll
          keep this simple.
        </h2>
      </div>

      <div className="button-row">
        <Button variant="primary" onClick={handleStart}>
          Let&rsquo;s start gently
        </Button>
        <Button variant="link" onClick={() => router.push("/home")}>
          I&rsquo;ll come back later
        </Button>
      </div>
    </div>
  );
}
