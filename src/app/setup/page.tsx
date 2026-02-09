"use client";

import { useRouter } from "next/navigation";
import { useUser, Child } from "@/context/UserContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

const MOMENTS = ["Bedtime", "Morning", "Car ride", "Dinner", "Weekend"];
const FREQUENCIES = ["2x per week", "Weekly", "None"];

export default function SetupPage() {
  const router = useRouter();
  const { user, setUser } = useUser();

  function updateChild(index: number, field: keyof Child, value: string) {
    const updated = [...user.children];
    updated[index] = { ...updated[index], [field]: value };
    setUser({ children: updated });
  }

  function addChild() {
    setUser({ children: [...user.children, { name: "", ageGroup: "5–7" }] });
  }

  function removeChild(index: number) {
    if (user.children.length <= 1) return;
    const updated = user.children.filter((_, i) => i !== index);
    setUser({ children: updated });
  }

  return (
    <div className="page">
      <Logo />

      {/* SECTION A — Child Info */}
      <div className="section">
        <div className="section-title">Child Info (optional)</div>
        {user.children.map((child, i) => (
          <div key={i} className="card">
            <label>Child name</label>
            <input
              type="text"
              placeholder="Optional"
              value={child.name}
              onChange={(e) => updateChild(i, "name", e.target.value)}
            />
            <label>Child age</label>
            <select
              value={child.ageGroup}
              onChange={(e) => updateChild(i, "ageGroup", e.target.value)}
            >
              <option value="3–4">3–4</option>
              <option value="5–7">5–7</option>
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
            padding: "4px 0",
          }}
        >
          + Add another child
        </button>
        <p className="helper-text">Names are optional.</p>
      </div>

      {/* SECTION B — Preferred moment */}
      <div className="section">
        <div className="section-title">Preferred moment</div>
        <div className="radio-group">
          {MOMENTS.map((m) => (
            <button
              key={m}
              className={`radio-card${
                user.preferredMoment === m ? " selected" : ""
              }`}
              onClick={() => setUser({ preferredMoment: m })}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="helper-text">
          Bedtime is the easiest place to build a rhythm.
        </p>
      </div>

      {/* SECTION C — Reminders */}
      <div className="section">
        <div className="section-title">Reminders</div>
        <div className="toggle-row">
          <span style={{ fontSize: "0.9rem" }}>Email reminders</span>
          <button
            className={`toggle ${user.emailReminders ? "on" : "off"}`}
            onClick={() => setUser({ emailReminders: !user.emailReminders })}
            aria-label="Toggle email reminders"
          />
        </div>
        {user.emailReminders && (
          <div className="radio-group">
            {FREQUENCIES.map((f) => (
              <button
                key={f}
                className={`radio-card${
                  user.reminderFrequency === f ? " selected" : ""
                }`}
                onClick={() => setUser({ reminderFrequency: f })}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="button-row">
        <Button
          variant="primary"
          onClick={() => router.push("/start-here")}
        >
          Save &amp; continue
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push("/start-here")}
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
