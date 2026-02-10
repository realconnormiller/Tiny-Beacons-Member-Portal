"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="page">
      <Logo />
      <h1>Welcome back. You&rsquo;re doing a good job.</h1>

      {/* Anchor story — the main monthly story */}
      <div className="anchor-card" style={{ marginTop: "36px" }}>
        <h3>A moment when you&rsquo;re ready</h3>
        <div className="anchor-story-name">The Good Shepherd</div>
        <Button variant="primary" onClick={() => router.push("/start-here")}>
          Start here
        </Button>
        <p>Five minutes is plenty.</p>
      </div>

      {/* Companion story — quieter, secondary */}
      <div className="companion-card">
        <h4>Something shorter</h4>
        <div className="companion-story-name">A Bedtime Blessing</div>
        <p>A gentle companion piece. No video &mdash; just words.</p>
      </div>

      <div className="secondary-links">
        <button className="secondary-link">Printables</button>
        <button className="secondary-link">Past stories</button>
        <button className="secondary-link">Settings</button>
      </div>

      <p className="footer-note">
        There&rsquo;s nothing to catch up on. Jump in whenever you&rsquo;re
        ready.
      </p>
    </div>
  );
}
