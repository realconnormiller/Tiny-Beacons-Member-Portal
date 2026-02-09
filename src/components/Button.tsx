"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    transition: "background 0.2s, opacity 0.2s",
  };

  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          padding: "14px 32px",
          borderRadius: "40px",
          background: "var(--color-primary)",
          color: "#ffffff",
        }
      : variant === "link"
        ? {
            ...base,
            padding: "0",
            borderRadius: "0",
            background: "transparent",
            color: "var(--color-text-muted)",
            fontWeight: 400,
          }
        : {
            ...base,
            padding: "12px 24px",
            borderRadius: "40px",
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
