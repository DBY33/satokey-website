import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { VaultVisual } from "./VaultVisual";

const container = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: i * 0.1,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section
      id="vault"
      className="relative flex min-h-screen flex-col items-center justify-center scroll-mt-0 px-4 pt-28 pb-24 sm:px-6 sm:pt-32 sm:pb-28 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <motion.div
          className="text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <motion.h1
            id="hero-heading"
            className="section-heading text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl lg:leading-[1.02]"
            variants={item}
          >
            <span className="block text-white">Your crypto legacy,</span>
            <span className="mt-1 block text-white/90">secured forever.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg mx-auto lg:mx-0"
            variants={item}
          >
            The fail-safe bridge between your digital assets and your loved
            ones. Automatic, sealed, and unstoppable.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/10 pt-10 lg:justify-start"
            variants={item}
          >
            {[
              { k: "Sealed", v: "Zero-knowledge" },
              { k: "Failsafe", v: "Controlled release" },
              { k: "Family", v: "Legacy contacts" },
            ].map(({ k, v }) => (
              <div key={k} className="text-left">
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{k}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">{v}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Vault visual */}
        <motion.div
          className="flex justify-center"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <VaultVisual />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#how-it-works"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/35 transition-colors hover:text-white/55"
        aria-label="Scroll to how it works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
