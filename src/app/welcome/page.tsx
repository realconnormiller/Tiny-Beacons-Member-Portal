"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="page">
      <Logo />
      <h1>Welcome to Tiny Beacons. You&rsquo;re in the right place.</h1>
      <h2>
        Most parents want to lead spiritually at home &mdash; we&rsquo;ll keep
        this simple.
      </h2>

      <ol className="checklist">
        <li>Tell us your child&rsquo;s age</li>
        <li>Pick your moment (bedtime, morning, car ride)</li>
        <li>Do your first Tiny Moment tonight</li>
      </ol>

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/setup")}>
          Let&rsquo;s set this up
        </Button>
        <Button variant="secondary" onClick={() => router.push("/start-here")}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
