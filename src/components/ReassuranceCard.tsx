"use client";

interface ReassuranceCardProps {
  icon: string;
  text: string;
}

export default function ReassuranceCard({ icon, text }: ReassuranceCardProps) {
  return (
    <div className="reassurance-card">
      <div className="reassurance-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="reassurance-text">{text}</div>
    </div>
  );
}
