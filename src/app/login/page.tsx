"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) return;

    setLoading(true);
    const supabase = createClient();

    const next = searchParams.get("next") ?? "/hub";
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="page" data-scene="sunrise">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80dvh",
          textAlign: "center",
        }}
      >
        <Logo />

        {sent ? (
          <>
            <h1
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.4rem",
                color: "var(--color-text)",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Check your email.
            </h1>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.92rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: 300,
              }}
            >
              We sent a magic link to <strong>{email}</strong>. Tap the link to
              sign in &mdash; no password needed.
            </p>
          </>
        ) : (
          <>
            <h1
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.4rem",
                color: "var(--color-text)",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Sign in
            </h1>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.92rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: 300,
                marginBottom: 28,
              }}
            >
              Enter your email and we&rsquo;ll send a magic link.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                maxWidth: 320,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "16px",
                  fontFamily: "var(--sans)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                }}
              />

              {error && (
                <p
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "0.84rem",
                    color: "#b94a48",
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </p>
              )}

              <Button variant="primary">
                {loading ? "Sending\u2026" : "Send magic link"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
