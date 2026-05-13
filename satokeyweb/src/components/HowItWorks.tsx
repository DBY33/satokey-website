import { motion } from "framer-motion";
import { Vault, HeartPulse, Clock, KeyRound, ShieldCheck, Shield } from "lucide-react";

const STEPS = [
  {
    icon: Vault,
    title: "The Vault",
    description:
      "You create an on-chain Smart Vault secured by Satokey hardware. Your rules and beneficiaries live in the contract—only you can change them while you’re active.",
  },
  {
    icon: HeartPulse,
    title: "The Heartbeat",
    description:
      "Every six months you check in with a simple Satokey tap. It’s zero gas for you—Satokey’s paymaster covers the fees so staying current stays effortless.",
  },
  {
    icon: Clock,
    title: "Automated Legacy",
    description:
      "If you go inactive past six months, a 30-day on-chain countdown begins for your Legacy Contact to claim. You can veto at any time with your hardware and reset the clock.",
  },
] as const;

function SmartVaultLockVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_40px_120px_-60px_rgba(34,211,238,0.35)] backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 15%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(ellipse 70% 55% at 80% 75%, rgba(99,102,241,0.12), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <KeyRound className="h-5 w-5 text-[#22d3ee]" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Smart Vault</p>
              <p className="text-sm font-semibold text-white/90">On-chain • AA</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Live
          </span>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Vault intent */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3"
              animate={{ x: [0, 26, 26, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.65, 1] }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22d3ee]/10 ring-1 ring-[#22d3ee]/20">
                <Vault className="h-5 w-5 text-[#22d3ee]" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white/90">Vault rules</p>
                <p className="text-xs text-white/55">Signed • enforced on-chain</p>
              </div>

              <motion.div
                className="pointer-events-none absolute -right-7 top-1/2 h-[2px] w-10 -translate-y-1/2 bg-gradient-to-r from-[#22d3ee]/0 via-[#22d3ee]/60 to-[#22d3ee]/0"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
            </motion.div>
          </motion.div>

          {/* Lock core */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="relative grid h-24 w-24 place-items-center rounded-3xl border border-white/10 bg-[#020617]/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
              animate={{ boxShadow: ["inset 0 0 0 1px rgba(255,255,255,0.05)", "inset 0 0 0 1px rgba(34,211,238,0.18)"] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <Shield className="h-10 w-10 text-white/85" aria-hidden />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, rgba(34,211,238,0.14), transparent 60%)",
                }}
                animate={{ opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
            </motion.div>
          </div>

          {/* Legacy path */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <ShieldCheck className="h-5 w-5 text-white/85" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white/90">Legacy path</p>
                <p className="text-xs text-white/55">Countdown • claim window</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-white/60">
          Smart Vault logic runs on-chain: your heartbeat proves you’re here; inactivity triggers the inheritance flow your contract already defines—no guessing games, just verifiable rules.
        </p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-white/[0.08] bg-tech-section px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <h2
            id="how-it-works-heading"
            className="section-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            How it works
          </h2>
          <p className="section-subtitle mx-auto mt-4 max-w-xl">
            Three steps: on-chain Smart Vault, gasless heartbeat, then automated legacy your beneficiaries can rely on—with your veto always one tap away.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:mt-18 lg:grid-cols-[1fr_440px] lg:items-start lg:gap-12">
          {/* Steps (modern vertical cards) */}
          <motion.ol
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
            }}
          >
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <motion.li
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-colors hover:bg-white/[0.04]"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#22d3ee]/10 text-[#22d3ee] ring-1 ring-[#22d3ee]/25">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Step {i + 1}</span>
                      <h3 className="card-title text-base sm:text-[1.05rem]">{title}</h3>
                    </div>
                    <p className="card-body mt-2 text-sm leading-relaxed sm:text-[0.9375rem]">{description}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Visual */}
          <motion.div
            className="lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <SmartVaultLockVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
