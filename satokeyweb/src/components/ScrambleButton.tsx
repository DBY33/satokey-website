import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

function scramble(str: string, progress: number): string {
  return str
    .split("")
    .map((char) => {
      if (char === " ") return char;
      if (Math.random() < progress) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

interface ScrambleButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  as?: "a" | "button";
  className?: string;
  icon?: React.ReactNode;
  scrambleOnHover?: boolean;
}

export function ScrambleButton({
  children,
  as: Component = "a",
  className = "",
  icon,
  scrambleOnHover = true,
  ...props
}: ScrambleButtonProps) {
  const [displayText, setDisplayText] = useState(children);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback(() => {
    const elapsed = (performance.now() - startTimeRef.current) / 180;
    const progress = Math.min(elapsed, 1);

    if (progress < 1) {
      setDisplayText(scramble(children, progress));
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayText(children);
    }
  }, [children]);

  const handleMouseEnter = useCallback(() => {
    if (!scrambleOnHover) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = performance.now();
    setDisplayText(scramble(children, 0));
    rafRef.current = requestAnimationFrame(animate);
  }, [animate, children, scrambleOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setDisplayText(children);
  }, [children]);

  const Base = Component === "a" ? motion.a : motion.button;

  return (
    <Base
      {...(props as Record<string, unknown>)}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {icon}
      <span aria-hidden style={{ fontVariantNumeric: "tabular-nums" }}>
        {displayText}
      </span>
      <span className="sr-only">{children}</span>
    </Base>
  );
}
