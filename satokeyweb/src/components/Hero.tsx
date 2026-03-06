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
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#22d3ee]/[0.05] blur-[120px]" />
        <div className="absolute bottom-32 right-1/4 h-56 w-56 rounded-full bg-[#10b981]/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
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
            className="section-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
            variants={item}
          >
            Your Crypto Legacy,{" "}
            <span className="text-white">
              Secured Forever.
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl mx-auto lg:mx-0"
            variants={item}
          >
            The fail-safe bridge between your digital assets and your loved
            ones. Automatic, sealed, and unstoppable.
          </motion.p>
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
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/40 transition-colors hover:text-white/60"
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
