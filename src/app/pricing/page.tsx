"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="page">
      <Logo />
      <h1>A calm space for your family.</h1>
      <h2>
        Membership gives you ongoing access to Tiny Beacons &mdash; a gentle
        place designed to support faith at home, whenever you need it.
      </h2>

      <div className="belonging-section">
        <p>Membership means this space is always here for your family.</p>
        <p>
          You&rsquo;ll find gentle stories to share, prayer cards to turn to
          when emotions run high, and simple prompts to help faith feel close
          &mdash; even on hard days.
        </p>
        <p>
          You&rsquo;re not paying for quantity. You&rsquo;re choosing a place
          you trust.
        </p>
      </div>

      <div className="pricing-card">
        <div className="price">$10 / month</div>
        <div className="price-note">Cancel anytime. No commitments.</div>
        <Button variant="primary" onClick={() => router.push("/welcome")}>
          Join Tiny Beacons
        </Button>
      </div>

      <p className="value-anchor">
        Many parents keep their membership not because they use it often
        &mdash; but because they&rsquo;re grateful it&rsquo;s there when they
        need it.
      </p>
    </div>
  );
}
