"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import CharacterImage from "@/components/CharacterImage";

export default function DonePage() {
  const router = useRouter();

  return (
    <div className="page gold-glow" data-scene="sunrise">
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      <Logo />

      <div className="hero has-sticker" style={{ position: "relative" }}>
        <CharacterImage src="/characters/grace.png" anchor="br" size={160} opacity={0.32} offsetX={16} offsetY={20} objectPosition="center bottom" />
        <div className="watermark watermark--heart" aria-hidden="true" style={{ top: 10, left: 14 }} />
        <h1>You&rsquo;re a Tiny Beacons family.</h1>
        <h2>You don&rsquo;t need perfection. You need a rhythm.</h2>
      </div>

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/home")}>
          Go home
        </Button>
        <Button variant="link" onClick={() => router.push("/setup")}>
          Adjust preferences
        </Button>
      </div>
    </div>
  );
}
