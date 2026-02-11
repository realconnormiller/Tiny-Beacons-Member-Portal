"use client";

import Image from "next/image";
import { useState } from "react";

type Position = "tl" | "tr" | "bl" | "br";

interface CharacterImageProps {
  src: string;
  alt?: string;
  position: Position;
  size?: number;
  opacity?: number;
}

const positionStyles: Record<Position, React.CSSProperties> = {
  tl: { top: -12, left: -10 },
  tr: { top: -12, right: -10 },
  bl: { bottom: -16, left: -8 },
  br: { bottom: -16, right: -8 },
};

export default function CharacterImage({
  src,
  alt = "",
  position,
  size = 120,
  opacity = 0.28,
}: CharacterImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
        width: size,
        height: size,
        borderRadius: "18px",
        ...positionStyles[position],
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity,
          filter: "saturate(0.8) brightness(1.05)",
        }}
        draggable={false}
        unoptimized
        onError={() => setFailed(true)}
      />
    </div>
  );
}
