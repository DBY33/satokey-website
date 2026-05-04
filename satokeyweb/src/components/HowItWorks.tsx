import { motion } from "framer-motion";
import { Vault, HeartPulse, BellRing, ShieldCheck, KeyRound, Shield } from "lucide-react";

const STEPS = [
  {
    icon: Vault,
    title: "Store your passkeys",
    description:
      "Add your crypto passkeys and instructions to your Satokey vault. We hold the sealed box, not the keys.",
  },
  {
    icon: Vault,
    title: "Set priorities and percentages",
    description:
      "If you have multiple legacy contacts, you can allocate a percentage to each—so your wallet’s legacy is distributed exactly how you decide.",
  },
  {
    icon: HeartPulse,
    title: "Monthly heartbeat",
    description:
      "Once a month we check in with you. A quick tap or click keeps everything as‑is and reassures your legacy contact.",
  },
  {
    icon: BellRing,
    title: "If something feels wrong",
    description:
      "If you miss several check‑ins in a row, our system starts the failsafe process and prepares your legacy handover.",
  },
  {
    icon: ShieldCheck,
    title: "Legacy is released",
    description:
      "After the failsafe period, your designated contact receives what they need—securely and automatically.",
  },
] as const;

function PasskeyLockVisual() {
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Passkey vault</p>
              <p className="text-sm font-semibold text-white/90">Locked & sealed</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Secure
          </span>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Passkey */}
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
                <KeyRound className="h-5 w-5 text-[#22d3ee]" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white/90">Passkey</p>
                <p className="text-xs text-white/55">Encrypted • sealed</p>
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

          {/* Sealed state */}
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
                <p className="text-sm font-semibold text-white/90">Stored</p>
                <p className="text-xs text-white/55">Access controlled</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-white/60">
          Your passkeys are encrypted and sealed away. Satokey can store the vault, but cannot open it.
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
            A clear, predictable flow from you today to the people who matter most, when it really counts.
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
            <PasskeyLockVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
