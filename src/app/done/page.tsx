"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function DonePage() {
  const router = useRouter();

  return (
    <div className="page">
      <div className="page-blob page-blob--top-right" />
      <div className="page-blob page-blob--bottom-left" />

      <Logo />

      <div className="hero">
        <h1>You&rsquo;re a Tiny Beacons family.</h1>
        <h2>You don&rsquo;t need perfection. You need a rhythm.</h2>
      </div>

      <div className="button-row">
        <Button variant="primary" onClick={() => router.push("/home")}>
          Go home
        </Button>
        <Button variant="link" onClick={() => router.push("/setup")}>
          Adjust preferences
        </Button>
      </div>
    </div>
  );
}
