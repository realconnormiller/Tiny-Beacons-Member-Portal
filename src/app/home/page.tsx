"use client";

import Logo from "@/components/Logo";

export default function HomePage() {
  return (
    <div className="page">
      <Logo />
      <h1>Welcome back. Keep it simple.</h1>

      <div className="tile-grid" style={{ marginTop: "32px" }}>
        <div className="tile">This Month&rsquo;s Story</div>
        <div className="tile">This Week&rsquo;s Tiny Prompt</div>
        <div className="tile">Printables</div>
      </div>

      <p className="footer-note">
        No catching up required. Jump in anytime.
      </p>
    </div>
  );
}
