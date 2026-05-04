import { useEffect, useRef } from "react";

const COLUMNS = 36;
const KEYS_PER_COLUMN = 28;
const FALL_SPEED = 0.6;
const CYAN = "rgba(34, 211, 238, 0.55)";
const PURPLE = "rgba(139, 92, 246, 0.45)";

interface Key {
  x: number;
  y: number;
  column: number;
  speed: number;
  color: string;
  size: number;
}

export function FallingKeysBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let keys: Key[] = [];
    let animationId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (keys.length === 0) {
        const colWidth = w / COLUMNS;
        const spacing = (h + 100) / KEYS_PER_COLUMN;
        for (let c = 0; c < COLUMNS; c++) {
          for (let i = 0; i < KEYS_PER_COLUMN; i++) {
            keys.push({
              x: c * colWidth + colWidth * 0.5,
              y: -50 + i * spacing * 0.7 + (c % 2) * spacing * 0.15,
              column: c,
              speed: FALL_SPEED + (c % 5) * 0.1,
              color: c % 4 < 2 ? CYAN : PURPLE,
              size: 3.5 + (i % 3) * 0.8,
            });
          }
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const drawKey = (k: Key) => {
      const s = k.size;
      const headR = s * 1.8;
      const stemW = s * 0.7;
      const stemH = s * 5;
      const bitH = s * 1.5;

      ctx.save();

      ctx.shadowColor = "rgba(16, 185, 129, 0.95)";
      ctx.shadowBlur = 22;

      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.beginPath();
      ctx.arc(k.x, k.y - stemH * 0.5 - headR * 0.5, headR * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.fillStyle = k.color;

      ctx.beginPath();
      ctx.arc(k.x, k.y - stemH - headR * 0.2, headR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillRect(k.x - stemW / 2, k.y - stemH - headR * 0.2, stemW, stemH);
      ctx.strokeRect(k.x - stemW / 2, k.y - stemH - headR * 0.2, stemW, stemH);

      ctx.beginPath();
      ctx.moveTo(k.x - stemW / 2, k.y - bitH * 0.5);
      ctx.lineTo(k.x - stemW / 2, k.y + bitH);
      ctx.lineTo(k.x - stemW / 4, k.y + bitH * 0.5);
      ctx.lineTo(k.x - stemW / 4, k.y - bitH * 0.5);
      ctx.lineTo(k.x + stemW / 4, k.y - bitH * 0.5);
      ctx.lineTo(k.x + stemW / 4, k.y + bitH * 0.5);
      ctx.lineTo(k.x + stemW / 2, k.y + bitH);
      ctx.lineTo(k.x + stemW / 2, k.y - bitH * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const loop = () => {
      const w = parseInt(canvas.style.width || "1", 10);
      const h = parseInt(canvas.style.height || "1", 10);
      const colWidth = w / COLUMNS;
      const wrap = h + 80;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      keys.forEach((k) => {
        k.y += k.speed;
        if (k.y > h + 20) k.y -= wrap;
        k.x = k.column * colWidth + colWidth * 0.5;

        const fade = k.y > h - 60 ? (h - k.y) / 60 : 1;
        if (fade > 0) {
          ctx.globalAlpha = fade;
          drawKey(k);
          ctx.globalAlpha = 1;
        }
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 w-full h-full"
      style={{ display: "block" }}
      aria-hidden
    />
  );
}
