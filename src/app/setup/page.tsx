"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserState } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

type MomentValue = UserState["preferredMoment"];

const MOMENTS: { value: MomentValue; label: string }[] = [
  { value: "Bedtime", label: "Bedtime" },
  { value: "Morning", label: "Morning" },
  { value: "Car ride", label: "Car ride" },
  { value: "Dinner", label: "Dinner" },
  { value: "Weekend", label: "Weekend" },
];

export default function SetupPage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [remindersExpanded, setRemindersExpanded] = useState(false);

  function updateChildName(index: number, value: string) {
    const updated = [...user.children];
    updated[index] = { ...updated[index], name: value };
    setUser({ children: updated });
  }

  function updateChildAge(index: number, value: string) {
    const updated = [...user.children];
    updated[index] = {
      ...updated[index],
      ageGroup: value as "3-4" | "5-7" | "Other",
    };
    if (value !== "Other") {
      updated[index] = { ...updated[index], customAge: undefined };
    }
    setUser({ children: updated });
  }

  function updateChildCustomAge(index: number, value: string) {
    const updated = [...user.children];
    const num = parseInt(value, 10);
    updated[index] = {
      ...updated[index],
      customAge: isNaN(num) ? undefined : Math.min(18, Math.max(0, num)),
    };
    setUser({ children: updated });
  }

  function addChild() {
    setUser({ children: [...user.children, { ageGroup: "5-7" }] });
  }

  function removeChild(index: number) {
    if (user.children.length <= 1) return;
    const updated = user.children.filter((_, i) => i !== index);
    setUser({ children: updated });
  }

  return (
    <div className="page">
      <Logo />
      <h1>Tell us a little about your family</h1>
      <h2>You can change this anytime &mdash; or skip it completely.</h2>

      {/* Children */}
      <div className="section">
        {user.children.map((child, i) => (
          <div key={i} className="soft-container">
            <label>Child name (optional)</label>
            <input
              type="text"
              placeholder="Optional"
              value={child.name || ""}
              onChange={(e) => updateChildName(i, e.target.value)}
            />
            <label>Age range</label>
            <select
              value={child.ageGroup}
              onChange={(e) => updateChildAge(i, e.target.value)}
            >
              <option value="3-4">3-4</option>
              <option value="5-7">5-7</option>
              <option value="Other">Other</option>
            </select>
            {child.ageGroup === "Other" && (
              <>
                <label>Age (only if you want)</label>
                <input
                  type="number"
                  placeholder="e.g., 2, 8, 10"
                  min={0}
                  max={18}
                  value={child.customAge ?? ""}
                  onChange={(e) => updateChildCustomAge(i, e.target.value)}
                />
              </>
            )}
            {user.children.length > 1 && (
              <button
                onClick={() => removeChild(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-text-muted)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontFamily: "var(--sans)",
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addChild}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-primary)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 500,
            fontFamily: "var(--sans)",
            padding: "4px 0",
          }}
        >
          + Add another child
        </button>
        <p className="helper-text">Names are optional.</p>
      </div>

      {/* Preferred moment */}
      <div className="section">
        <div className="section-title">
          When does a calm moment usually happen for you?
        </div>
        <div className="radio-group">
          {MOMENTS.map((m) => (
            <button
              key={m.value}
              className={`radio-card${
                user.preferredMoment === m.value ? " selected" : ""
              }`}
              onClick={() => setUser({ preferredMoment: m.value })}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="helper-text">
          Bedtime is the easiest place to build a rhythm.
        </p>
      </div>

      {/* Reminders (collapsed by default) */}
      <div className="section">
        <div className="section-title">
          Would a gentle reminder be helpful?
        </div>
        {!remindersExpanded ? (
          <button
            className="collapsible-trigger"
            onClick={() => setRemindersExpanded(true)}
          >
            Set up reminders
          </button>
        ) : (
          <div className="soft-container">
            <div className="toggle-row">
              <span style={{ fontSize: "0.9rem" }}>Email reminders</span>
              <button
                className={`toggle ${
                  user.emailRemindersEnabled ? "on" : "off"
                }`}
                onClick={() =>
                  setUser({
                    emailRemindersEnabled: !user.emailRemindersEnabled,
                  })
                }
                aria-label="Toggle email reminders"
              />
            </div>
          </div>
        )}
      </div>

      <div className="button-row">
        <Button
          variant="primary"
          onClick={() => router.push("/start-here")}
        >
          Continue
        </Button>
        <Button variant="link" onClick={() => router.push("/start-here")}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
