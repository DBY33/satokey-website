import { motion } from "framer-motion";
import { ShieldCheck, EyeOff, KeyRound, Bell } from "lucide-react";

const POINTS = [
  {
    icon: ShieldCheck,
    label: "Smart Vault",
    title: "On-chain certainty, not custodial guesswork",
    description:
      "Your Smart Vault uses account abstraction: rules, beneficiaries, and release conditions live on-chain—verifiable by anyone. No passkey-splitting story and no brute-force theater.",
  },
  {
    icon: EyeOff,
    label: "You stay in control",
    title: "Only your hardware can veto or change the plan",
    description:
      "While you’re active, policy updates and vetoes require your Satokey device. We don’t replace your keys or move assets you didn’t explicitly authorize.",
  },
  {
    icon: KeyRound,
    label: "Decentralized inheritance",
    title: "Legacy follows contract logic, not a manual inbox",
    description:
      "After inactivity and the on-chain countdown, your Legacy Contact’s claim path is enforced by the Smart Vault—transparent, auditable, and decentralized.",
  },
  {
    icon: Bell,
    label: "Transparent alerts",
    title: "You’re notified every step of the way",
    description:
      "Push, email, and SMS keep you ahead of heartbeat due dates, countdown windows, and claim milestones—so there are no surprises for you or your family.",
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
        <motion.div
          className="relative mx-auto flex max-w-sm flex-1 items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          aria-hidden
        >
          <div className="absolute inset-0 -z-10 blur-3xl">
            <div className="absolute inset-10 rounded-[32px] bg-gradient-to-br from-[#22d3ee]/30 via-[#a855f7]/22 to-[#050505] opacity-80" />
          </div>

          <div className="cyber-glass-strong relative rounded-3xl px-10 py-10">
            <div className="mx-auto flex h-28 w-24 items-center justify-center rounded-3xl bg-gradient-to-b from-[#1e293b] to-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <div className="relative h-20 w-16 rounded-2xl bg-gradient-to-b from-[#22d3ee] via-[#a855f7] to-[#0ea5e9]">
                <div className="absolute inset-[3px] rounded-2xl bg-[#050505]" />
                <ShieldCheck className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-[#22d3ee]" />
                <div className="absolute inset-x-2 bottom-3 h-1.5 rounded-full bg-gradient-to-r from-[#22d3ee]/70 to-[#bef264]/40 blur-sm" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-mono-tech text-xs font-semibold uppercase tracking-[0.22em] text-[#22d3ee]/80">
                Smart Vault model
              </p>
              <p className="mt-2 text-sm text-white/65">
                Account abstraction. Auditable rules. Decentralized inheritance you can explain in one conversation.
              </p>
            </div>
          </div>
        </motion.div>

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
            Built for the highest-stakes assets—clear enough to describe once, strong enough to trust with generational wealth.
          </p>

          <div className="mt-10 space-y-6">
            {POINTS.map(({ icon: Icon, label, title, description }) => (
              <div key={title} className="cyber-glass flex gap-4 rounded-2xl p-4 sm:p-5 transition-transform duration-300 hover:-translate-y-0.5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#22d3ee]/10 text-[#22d3ee] ring-1 ring-[#22d3ee]/25">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </div>
                <div>
                  <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    {label}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-white sm:text-[0.98rem]">{title}</h3>
                  <p className="card-body mt-1.5 text-xs sm:text-[0.9rem]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
