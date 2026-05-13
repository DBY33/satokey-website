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

const RING = 2 * Math.PI * 44;

function HeartbeatStatus() {
  return (
    <div className="relative mx-auto flex h-[148px] w-[148px] shrink-0 items-center justify-center lg:mx-0">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id="hero-hb-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#bef264" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <motion.circle
          className="heartbeat-pulse"
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="url(#hero-hb-ring)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={RING}
          initial={{ strokeDashoffset: RING * 0.35 }}
          animate={{ strokeDashoffset: [RING * 0.32, RING * 0.28, RING * 0.32] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="relative text-center">
        <p className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.28em] text-[#22d3ee]/90">
          Status
        </p>
        <p className="font-mono-tech mt-1 text-lg font-bold tracking-tight text-white">Secure</p>
        <p className="font-mono-tech mt-1 text-[10px] text-white/45">Heartbeat · 6mo</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="vault"
      className="relative flex min-h-screen flex-col items-center justify-center scroll-mt-0 px-4 pt-28 pb-24 sm:px-6 sm:pt-32 sm:pb-28 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(34,211,238,0.08),transparent_58%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <motion.h1
            id="hero-heading"
            className="section-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            variants={item}
          >
            <span className="text-gradient-hero block">Your Crypto Legacy,</span>
            <span className="text-gradient-hero-accent mt-1 block sm:mt-2">Secured On-Chain.</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg mx-auto lg:mx-0"
            variants={item}
          >
            Your wealth is locked in a Smart Vault that only you control, with a built-in, on-chain will that executes
            automatically if you stop checking in.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-start lg:gap-10"
            variants={item}
          >
            <HeartbeatStatus />
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 lg:justify-start">
              {[
                { k: "On-chain", v: "Certainty" },
                { k: "0 gwei", v: "Heartbeat" },
                { k: "AA", v: "Smart Vault" },
              ].map(({ k, v }) => (
                <div key={k} className="text-left">
                  <p className="font-mono-tech text-xl font-semibold tracking-tight text-white sm:text-2xl">{k}</p>
                  <p className="mt-1 font-mono-tech text-[10px] font-medium uppercase tracking-[0.22em] text-[#22d3ee]/80">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

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

      <motion.a
        href="#how-it-works"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/40 transition-colors hover:text-[#22d3ee]/90"
        aria-label="Scroll to how it works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.28em]">Scroll</span>
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
