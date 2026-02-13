"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/moment", label: "Tonight\u2019s Tiny Moment" },
  { href: "/hub", label: "Member Hub" },
  { href: "/resources", label: "Resources" },
  { href: "/library", label: "Library" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
  { href: "/account", label: "Account" },
  { href: "/pricing", label: "Pricing" },
];

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    function onChange(e: MediaQueryListEvent) {
      setReduceMotion(e.matches);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /* Close on ESC */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* Close on click outside */
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open, close]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/hub");
    }
  }

  const transition = reduceMotion ? "none" : "transform 220ms ease, opacity 220ms ease";

  return (
    <>
      <header
        style={{
          position: "relative",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "12px 4px 0",
        }}
      >
        {/* Back */}
        <button
          onClick={handleBack}
          style={{
            background: "none",
            border: "none",
            fontFamily: "var(--sans)",
            fontSize: "0.84rem",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: "var(--radius-sm)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          &larr; Back
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.35rem",
            lineHeight: 1,
            color: "var(--color-text-muted)",
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: "var(--radius-sm)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          &#9776;
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            background: "rgba(26,22,20,0.25)",
            transition: reduceMotion ? "none" : "opacity 180ms ease",
          }}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          width: 260,
          maxWidth: "80vw",
          background: "var(--color-surface)",
          boxShadow: open ? "-4px 0 24px rgba(30,26,23,0.10)" : "none",
          transform: open ? "translateX(0)" : "translateX(100%)",
          opacity: open ? 1 : 0,
          transition,
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close menu"
          style={{
            alignSelf: "flex-end",
            background: "none",
            border: "none",
            fontSize: "1.3rem",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            padding: "4px 8px",
            marginBottom: 16,
            WebkitTapHighlightColor: "transparent",
          }}
        >
          &times;
        </button>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <button
                key={href}
                onClick={() => {
                  close();
                  router.push(href);
                }}
                style={{
                  background: active ? "var(--color-warm)" : "transparent",
                  border: "none",
                  fontFamily: "var(--sans)",
                  fontSize: "0.92rem",
                  fontWeight: active ? 500 : 400,
                  color: active ? "var(--color-text)" : "var(--color-text-muted)",
                  textAlign: "left",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
