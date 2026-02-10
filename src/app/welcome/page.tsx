"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import ReassuranceCard from "@/components/ReassuranceCard";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="page">
      <Logo />

      <div className="hero">
        <h1>Welcome to Tiny Beacons. You&rsquo;re right where you belong.</h1>
        <h2>
          Most parents want to lead spiritually at home.
          <br />
          You don&rsquo;t need a plan &mdash; just a moment.
          We&rsquo;ll keep this gentle.
        </h2>
      </div>

      <ReassuranceCard
        icon="\u2728"
        text="Learn about your family (only if you want)"
      />
      <ReassuranceCard
        icon="\uD83C\uDF19"
        text="Choose a moment that already fits your day"
      />
      <ReassuranceCard
        icon="\uD83D\uDC9B"
        text="Share one small faith moment together"
      />

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/setup")}>
          Let&rsquo;s begin
        </Button>
        <Button variant="link" onClick={() => router.push("/start-here")}>
          I&rsquo;ll come back later
        </Button>
      </div>
    </div>
  );
}
