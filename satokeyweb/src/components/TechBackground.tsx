/**
 * High-trust cyberpunk depth: obsidian base, corner glows, faint blockchain grid.
 */
export function TechBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]" aria-hidden>
      <div className="absolute inset-0 cyber-bg-grid opacity-[0.65]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 0% -10%, rgba(168,85,247,0.22), transparent 52%), radial-gradient(ellipse 80% 60% at 100% 110%, rgba(14,165,233,0.2), transparent 50%)",
        }}
      />
    </div>
  );
}
