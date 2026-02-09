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

      <div className="primary-card" style={{ marginTop: "32px" }}>
        <h3>Today&rsquo;s Tiny Moment</h3>
        <Button variant="primary" onClick={() => router.push("/start-here")}>
          Start here
        </Button>
        <p>Five minutes is plenty.</p>
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
