"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const base: React.CSSProperties = {
    padding: "12px 24px",
    borderRadius: "var(--radius)",
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    border: "none",
    transition: "background 0.15s",
  };

  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          background: "var(--color-primary)",
          color: "#ffffff",
        }
      : {
          ...base,
          background: "transparent",
          color: "var(--color-text-muted)",
          border: "1px solid var(--color-border)",
        };

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  );
}
