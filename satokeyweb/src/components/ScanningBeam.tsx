import { useEffect, useState } from "react";

export function ScanningBeam() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
      style={{
        background: `linear-gradient(
          to bottom,
          transparent 0%,
          transparent ${Math.max(0, scrollProgress * 100 - 2)}%,
          rgba(34, 211, 238, 0.02) ${scrollProgress * 100}%,
          rgba(34, 211, 238, 0.06) ${scrollProgress * 100 + 0.3}%,
          transparent ${Math.min(100, scrollProgress * 100 + 3)}%,
          transparent 100%
        )`,
      }}
    >
      <div
        className="absolute left-0 right-0 h-px transition-[top] duration-75 ease-out"
        style={{
          top: `${scrollProgress * 100}%`,
          boxShadow:
            "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)",
          background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
        }}
      />
    </div>
  );
}
