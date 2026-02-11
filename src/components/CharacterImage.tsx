"use client";

import Image from "next/image";
import { useState } from "react";

type Anchor = "br" | "tr" | "bl" | "tl";

interface CharacterImageProps {
  src: string;
  className?: string;
  size?: number;
  opacity?: number;
  anchor?: Anchor;
  offsetX?: number;
  offsetY?: number;
  objectPosition?: string;
}

const anchorStyles: Record<Anchor, React.CSSProperties> = {
  br: { right: 0, bottom: 0 },
  tr: { right: 0, top: 0 },
  bl: { left: 0, bottom: 0 },
  tl: { left: 0, top: 0 },
};

export default function CharacterImage({
  src,
  className,
  size = 180,
  opacity = 0.38,
  anchor = "br",
  offsetX = 0,
  offsetY = 0,
  objectPosition = "center",
}: CharacterImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) return null;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
        WebkitUserSelect: "none",
        width: size,
        height: size,
        opacity,
        filter:
          "saturate(1.02) contrast(1.05) drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        ...anchorStyles[anchor],
      }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition,
        }}
        draggable={false}
        unoptimized
        onError={() => setFailed(true)}
      />
    </div>
  );
}
