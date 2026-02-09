"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="page">
      <Logo />
      <h1>Welcome to Tiny Beacons. You&rsquo;re right where you belong.</h1>
      <h2>
        Most parents want to lead spiritually at home.
        <br />
        You don&rsquo;t need a plan &mdash; just a moment. We&rsquo;ll keep
        this gentle.
      </h2>

      <ul className="checklist">
        <li>Learn about your child (only if you want)</li>
        <li>Choose a moment that already fits your day</li>
        <li>Share one small faith moment tonight</li>
      </ul>

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/setup")}>
          Let&rsquo;s begin
        </Button>
        <Button variant="link" onClick={() => router.push("/start-here")}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
