import { useState, useEffect } from "react";

const LOGO_ICON_SRC = "/logo-icon.png";

/** Pixels with R,G,B all below this become transparent (0–255) */
const BLACK_THRESHOLD = 45;

function makeBlackTransparent(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = imageUrl;
  });
}

interface LogoIconProps {
  /** Height in pixels; width follows logo aspect ratio so nothing is clipped. */
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * S + key logo (purple/blue gradient). Black background is made transparent.
 */
export function LogoIcon({ size = 32, className = "", alt = "Satokey" }: LogoIconProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    makeBlackTransparent(LOGO_ICON_SRC)
      .then((dataUrl) => {
        if (!cancelled) setProcessedSrc(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return null;

  /* Fixed box: image fits entirely inside with object-fit contain so nothing is ever clipped */
  const boxHeight = size + 8;
  const boxWidth = Math.round(size * 1.1);

  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: boxWidth,
        height: boxHeight,
        overflow: "visible",
      }}
      aria-hidden
    >
      <img
        src={processedSrc ?? LOGO_ICON_SRC}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </span>
  );
}
