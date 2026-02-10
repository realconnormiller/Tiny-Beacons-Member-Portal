"use client";

import Button from "./Button";

interface ModalProps {
  title: string;
  body: React.ReactNode;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}

function BeaconIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="4" fill="white" fillOpacity="0.9" />
      <circle cx="10" cy="10" r="7" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export default function Modal({
  title,
  body,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-beacon" aria-hidden="true">
          <BeaconIcon />
        </div>
        <h3>{title}</h3>
        {typeof body === "string" ? <p>{body}</p> : body}
        <div className="button-row">
          <Button variant="primary" onClick={onPrimary}>
            {primaryLabel}
          </Button>
          <Button variant="link" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
