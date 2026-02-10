"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserState } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

type MomentValue = UserState["preferredMoment"];
type FrequencyValue = UserState["reminderFrequency"];

const MOMENTS: { value: MomentValue; label: string }[] = [
  { value: "Bedtime", label: "Bedtime (recommended)" },
  { value: "Morning", label: "Morning" },
  { value: "Car ride", label: "Car ride" },
  { value: "Dinner", label: "Dinner" },
  { value: "Weekend", label: "Weekend" },
];

const FREQUENCIES: { value: FrequencyValue; label: string }[] = [
  { value: "couple_per_week", label: "A couple times a week (recommended)" },
  { value: "weekly", label: "Once a week" },
  { value: "none", label: "No reminders" },
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
            <label>Child name (only if you want)</label>
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
        <p className="helper-text">Names are optional. This is just for you.</p>
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
          Bedtime is often the easiest place to start &mdash; but any moment
          works.
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
            {user.emailRemindersEnabled && (
              <div className="radio-group">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.value}
                    className={`radio-card${
                      user.reminderFrequency === f.value ? " selected" : ""
                    }`}
                    onClick={() => setUser({ reminderFrequency: f.value })}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
            <p className="helper-text">
              No pressure. Just a nudge if you want one.
            </p>
          </div>
        )}
      </div>

      <div className="button-row">
        <Button
          variant="primary"
          onClick={() => router.push("/start-here")}
        >
          That&rsquo;s enough &mdash; let&rsquo;s continue
        </Button>
        <Button variant="link" onClick={() => router.push("/start-here")}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
