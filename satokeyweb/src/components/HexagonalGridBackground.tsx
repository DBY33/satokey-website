import { useMemo } from "react";

function Hexagon({ x, y, size, opacity, delay, layer, colorPhase, driftVariant, isWhite }: {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  layer: number;
  colorPhase: number;
  driftVariant: number;
  isWhite: boolean;
}) {
  const points = useMemo(() => {
    const r = size;
    return [0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`;
    }).join(" ");
  }, [x, y, size]);

  const duration = 8 + layer * 2;
  const colorDuration = 3.5 + (colorPhase % 4);
  const driftName = `hexDrift${driftVariant}`;
  const colorName = isWhite ? "hexColorWhite" : "hexColor";

  return (
    <polygon
      points={points}
      fill="none"
      stroke={isWhite ? "rgba(255, 255, 255, 0.55)" : "rgba(34, 211, 238, 0.6)"}
      strokeWidth={1.8}
      style={{
        opacity,
        animation: `${driftName} ${duration}s ease-in-out ${delay}s infinite, ${colorName} ${colorDuration}s ease-in-out ${colorPhase}s infinite`,
      }}
    />
  );
}

export function HexagonalGridBackground() {
  const layers = useMemo(() => {
    const result: Array<{ size: number; spacing: number; opacity: number; offsetY: number }> = [];
    for (let i = 0; i < 4; i++) {
      result.push({
        size: 14 + i * 4,
        spacing: 58 + i * 16,
        opacity: 0.7 - i * 0.08,
        offsetY: (i * 22) % 40,
      });
    }
    return result;
  }, []);

  const hexagons = useMemo(() => {
    const hexes: Array<{ x: number; y: number; size: number; opacity: number; delay: number; layer: number; colorPhase: number; driftVariant: number; isWhite: boolean }> = [];
    layers.forEach((layer, layerIdx) => {
      const { size, spacing, opacity, offsetY } = layer;
      const w = spacing * 1.732;
      const h = spacing * 2;
      for (let row = -1; row < 18; row++) {
        for (let col = -1; col < 28; col++) {
          const x = col * w + (row % 2 === 0 ? 0 : w / 2) + (layerIdx * 7) % 20;
          const y = row * (h * 0.75) + offsetY + (layerIdx * 11) % 15;
          const seed = row * 7 + col * 11 + layerIdx * 13;
          hexes.push({
            x,
            y,
            size,
            opacity,
            delay: (row * 0.12 + col * 0.08 + layerIdx * 1.2) % 5,
            layer: layerIdx,
            colorPhase: (row * 0.5 + col * 0.3 + layerIdx * 1.8) % 6,
            driftVariant: seed % 4,
            isWhite: seed % 5 === 0,
          });
        }
      }
    });
    return hexes;
  }, [layers]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        style={{
          transform: "scale(1.2)",
        }}
      >
        <defs>
          <linearGradient id="hex-grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(5, 10, 20, 0.3)" />
            <stop offset="100%" stopColor="rgba(5, 10, 20, 0.9)" />
          </linearGradient>
        </defs>
        <g>
          {hexagons.map((h, i) => (
            <Hexagon key={i} {...h} />
          ))}
        </g>
        <rect width="100%" height="100%" fill="url(#hex-grid-fade)" />
      </svg>
      <style>{`
        @keyframes hexDrift0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(24px, -18px) scale(1.02); }
          50% { transform: translate(-16px, 28px) scale(0.98); }
          75% { transform: translate(20px, 12px) scale(1.01); }
        }
        @keyframes hexDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-28px, 14px) scale(0.97); }
          50% { transform: translate(18px, -22px) scale(1.03); }
          75% { transform: translate(-12px, -8px) scale(0.99); }
        }
        @keyframes hexDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 20px) scale(1.015); }
          66% { transform: translate(-22px, -26px) scale(0.985); }
        }
        @keyframes hexDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-20px, -30px) scale(0.99); }
          66% { transform: translate(26px, 16px) scale(1.02); }
        }
        @keyframes hexColor {
          0%, 100% { stroke: rgba(34, 211, 238, 0.75); }
          50% { stroke: rgba(139, 92, 246, 0.75); }
        }
        @keyframes hexColorWhite {
          0%, 100% { stroke: rgba(255, 255, 255, 0.6); }
          50% { stroke: rgba(255, 255, 255, 0.35); }
        }
      `}</style>
    </div>
  );
}
