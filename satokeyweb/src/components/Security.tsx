import { motion } from "framer-motion";
import { ShieldCheck, EyeOff, KeyRound, Bell } from "lucide-react";

const POINTS = [
  {
    icon: ShieldCheck,
    label: "Sealed vault",
    title: "We hold the sealed vault, not the keys",
    description:
      "Satokey stores your encrypted data but cannot open it. The cryptographic keys stay with you and your legacy contact.",
  },
  {
    icon: EyeOff,
    label: "Zero visibility",
    title: "We never see your passkeys",
    description:
      "Our systems are designed so that your passkeys are never visible in plaintext to Satokey staff or infrastructure.",
  },
  {
    icon: KeyRound,
    label: "Controlled release",
    title: "Access only after the failsafe",
    description:
      "Your designated contact only receives access after missed check‑ins and a defined failsafe period—never before.",
  },
  {
    icon: Bell,
    label: "Transparent alerts",
    title: "You’re notified every step of the way",
    description:
      "Email, push, and SMS alerts keep you informed about check‑ins, upcoming failsafe dates, and when your vault is handed over.",
  },
] as const;

export function Security() {
  return (
    <section
      id="security"
      className="scroll-mt-20 border-t border-white/[0.08] bg-tech-section px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="security-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        {/* Left: big, realistic‑feeling shield logo */}
        <motion.div
          className="relative mx-auto flex max-w-sm flex-1 items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          aria-hidden
        >
          {/* Glow background */}
          <div className="absolute inset-0 -z-10 blur-3xl">
            <div className="absolute inset-10 rounded-[32px] bg-gradient-to-br from-[#22d3ee]/35 via-[#6366f1]/25 to-[#0f172a] opacity-70" />
          </div>

          {/* Shield card that feels like a real app badge */}
          <div className="relative rounded-3xl border border-white/[0.08] bg-black/40 px-10 py-10 shadow-[0_25px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl">
            <div className="mx-auto flex h-28 w-24 items-center justify-center rounded-3xl bg-gradient-to-b from-[#1e293b] to-[#020617] shadow-[0_20px_50px_rgba(15,23,42,1)]">
              <div className="relative h-20 w-16 rounded-2xl bg-gradient-to-b from-[#22d3ee] via-[#6366f1] to-[#0ea5e9]">
                <div className="absolute inset-[3px] rounded-2xl bg-black" />
                <ShieldCheck className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-[#38bdf8]" />
                <div className="absolute inset-x-2 bottom-3 h-1.5 rounded-full bg-gradient-to-r from-[#22d3ee]/70 to-[#0ea5e9]/50 blur-sm" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                SECURITY MODEL
              </p>
              <p className="mt-2 text-sm text-white/70">
                Zero‑knowledge storage. Strong encryption. Controlled, auditable release.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: clearer, calmer bullet points */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <h2
            id="security-heading"
            className="section-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Security you can explain to your family
          </h2>
          <p className="section-subtitle mt-4 max-w-xl">
            Built for the highest‑stakes assets. Clear enough that you can describe it in a single conversation.
          </p>

          <div className="mt-10 space-y-6">
            {POINTS.map(({ icon: Icon, label, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5"
              >
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-[#22d3ee]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    {label}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-white sm:text-[0.98rem]">
                    {title}
                  </h3>
                  <p className="card-body mt-1.5 text-xs sm:text-[0.9rem]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
