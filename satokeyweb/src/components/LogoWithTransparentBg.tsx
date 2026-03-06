import { useState, useEffect } from "react";

const LOGO_SRC = "/logo.png";

/** Threshold: pixels with R,G,B all below this become transparent (0–255) */
const BLACK_THRESHOLD = 45;

function makeBlackTransparent(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
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

interface LogoWithTransparentBgProps {
  className?: string;
  alt?: string;
  onError?: () => void;
}

export function LogoWithTransparentBg({
  className = "h-28 w-28 object-contain md:h-32 md:w-32",
  alt = "Satokey",
  onError,
}: LogoWithTransparentBgProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    makeBlackTransparent(LOGO_SRC)
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

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  if (failed) return null;

  return (
    <img
      src={processedSrc ?? LOGO_SRC}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
