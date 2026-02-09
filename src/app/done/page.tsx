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
      <h2>You don&rsquo;t need perfection. You need a rhythm.</h2>

      <ul className="bullet-list">
        <li>New story every month</li>
        <li>Simple prompts during the month</li>
        <li>Printables when you want screen-free time</li>
      </ul>

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/home")}>
          Go to Member Home
        </Button>
        <Button variant="secondary" onClick={() => router.push("/setup")}>
          Set reminder preferences
        </Button>
      </div>
    </div>
  );
}
