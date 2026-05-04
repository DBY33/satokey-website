/**
 * Full-viewport solid backdrop — plain dark blue (no patterns).
 */
export function TechBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-[#020617]"
      aria-hidden
    />
  );
}
