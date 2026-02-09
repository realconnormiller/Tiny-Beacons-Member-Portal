"use client";

import Button from "./Button";

interface ModalProps {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
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
        <h3>{title}</h3>
        <p>{body}</p>
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
