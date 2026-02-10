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
    fontFamily: "var(--sans)",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    transition: "transform 0.12s ease, box-shadow 0.2s ease, opacity 0.2s",
    WebkitTapHighlightColor: "transparent",
  };

  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          padding: "15px 34px",
          borderRadius: "40px",
          background:
            "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
          color: "#ffffff",
          boxShadow:
            "0 3px 10px rgba(61, 107, 82, 0.22), 0 1px 3px rgba(61, 107, 82, 0.14)",
          letterSpacing: "0.01em",
        }
      : variant === "link"
        ? {
            ...base,
            padding: "8px 0",
            minHeight: "44px",
            borderRadius: "0",
            background: "transparent",
            color: "var(--color-text-muted)",
            fontWeight: 400,
            fontSize: "0.88rem",
            display: "inline-flex",
            alignItems: "center",
          }
        : {
            ...base,
            padding: "13px 26px",
            borderRadius: "40px",
            background: "var(--color-surface)",
            color: "var(--color-text-muted)",
            border: "1.5px solid var(--color-border)",
            boxShadow:
              "0 1px 4px rgba(30, 26, 23, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          };

  function pressIn(el: HTMLButtonElement) {
    if (variant !== "link") {
      el.style.transform = "scale(0.97)";
      if (variant === "primary") {
        el.style.boxShadow =
          "0 1px 4px rgba(61, 107, 82, 0.18), 0 0 0 rgba(61, 107, 82, 0)";
      }
    }
  }
  function pressOut(el: HTMLButtonElement) {
    el.style.transform = "scale(1)";
    if (variant === "primary") {
      el.style.boxShadow =
        "0 3px 10px rgba(61, 107, 82, 0.22), 0 1px 3px rgba(61, 107, 82, 0.14)";
    }
  }

  return (
    <button
      style={styles}
      onClick={onClick}
      onMouseDown={(e) => pressIn(e.currentTarget)}
      onMouseUp={(e) => pressOut(e.currentTarget)}
      onMouseLeave={(e) => pressOut(e.currentTarget)}
      onTouchStart={(e) => pressIn(e.currentTarget)}
      onTouchEnd={(e) => pressOut(e.currentTarget)}
      onTouchCancel={(e) => pressOut(e.currentTarget)}
    >
      {children}
    </button>
  );
}
