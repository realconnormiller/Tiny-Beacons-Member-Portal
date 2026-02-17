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
  const drawerRef = useRef<HTMLDivElement>(null);

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

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/hub");
    }
  }

  return (
    <>
      <header className="app-header">
        {/* Back */}
        <button className="app-header-btn" onClick={handleBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        {/* Centered brand */}
        <div className="app-header-brand" aria-hidden="true">
          <div className="app-header-brand-dot" />
          <span className="app-header-brand-label">Tiny Beacons</span>
        </div>

        {/* Hamburger */}
        <button
          className="app-header-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="app-header-hamburger" aria-hidden="true">&#9776;</span>
        </button>
      </header>

      {/* Scrim overlay */}
      <div
        className={`drawer-scrim${open ? " open" : ""}`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`drawer-panel${open ? " open" : ""}`}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close menu"
          className="drawer-close-btn"
        >
          &times;
        </button>

        <nav className="drawer-nav">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <button
                key={href}
                className={`drawer-link${active ? " active" : ""}`}
                onClick={() => {
                  close();
                  router.push(href);
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
