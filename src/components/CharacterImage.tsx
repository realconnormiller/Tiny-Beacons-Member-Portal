import Image from "next/image";

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
  size = 110,
  opacity = 0.18,
}: CharacterImageProps) {
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
          filter: "saturate(0.7) brightness(1.08)",
        }}
        draggable={false}
        unoptimized
      />
    </div>
  );
}
