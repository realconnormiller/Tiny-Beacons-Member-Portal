"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function DonePage() {
  const router = useRouter();

  return (
    <div className="page">
      <Logo />
      <h1>You&rsquo;re officially a Tiny Beacons family.</h1>
      <h2>
        You don&rsquo;t need to do this perfectly.
        <br />
        You just need to show up sometimes &mdash; and you already did.
      </h2>

      <div className="belonging-section">
        <p>One new story each month, whenever you&rsquo;re ready for it.</p>
        <p>Gentle prompts when you want them &mdash; never when you don&rsquo;t.</p>
        <p>Screen-free options for quieter days at home.</p>
      </div>

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/home")}>
          Go home
        </Button>
        <Button variant="link" onClick={() => router.push("/setup")}>
          Adjust reminders
        </Button>
      </div>
    </div>
  );
}
