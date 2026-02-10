"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function DonePage() {
  const router = useRouter();

  return (
    <div className="page">
      <Logo />
      <h1>You&rsquo;re a Tiny Beacons family now.</h1>
      <h2>
        You don&rsquo;t need to do this perfectly.
        <br />
        You just need to show up sometimes &mdash; and you already did.
      </h2>

      <div className="belonging-section">
        <p>
          A couple of new stories arrive each month. They&rsquo;ll be here
          whenever you&rsquo;re ready &mdash; no rush, no schedule to keep.
        </p>
        <p>
          Gentle prompts come alongside each story. Use them if they help.
          Skip them if they don&rsquo;t. Either way is fine.
        </p>
        <p>
          There are also screen-free printables for quieter days at home.
          Everything is optional. Everything is enough.
        </p>
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
