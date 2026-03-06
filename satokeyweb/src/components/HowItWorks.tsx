import { motion } from "framer-motion";
import { Vault, HeartPulse, BellRing, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: Vault,
    title: "Store your passkeys",
    description:
      "Add your crypto passkeys to your secure vault. We hold the box but cannot open it. Only your legacy contact can access the contents once the automated email is sent.",
  },
  {
    icon: HeartPulse,
    title: "Monthly heartbeat",
    description:
      "Check in once a month. A simple confirmation keeps your vault active and tells us you're okay. Peace of mind for you and your family.",
  },
  {
    icon: BellRing,
    title: "Reminders & alerts",
    description:
      "We'll remind you by email, push, or SMS. If you miss three check-ins in a row, we'll securely release your legacy instructions.",
  },
  {
    icon: ShieldCheck,
    title: "Legacy delivered",
    description:
      "Your designated contact receives access only after the failsafe period. Your digital legacy reaches the right people, automatically.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-white/[0.06] bg-glassy-dark-blue px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            id="how-it-works-heading"
            className="section-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            How it works
          </h2>
          <p className="section-subtitle mx-auto mt-4 max-w-xl">
            A simple, automatic bridge between your digital assets and the people
            who matter most.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <motion.article
              key={title}
              className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 transition-colors hover:border-white/[0.1] hover:bg-white/[0.05]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
            >
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#22d3ee]/15 bg-[#22d3ee]/5 text-[#22d3ee]"
                aria-hidden
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                Step {i + 1}
              </span>
              <h3 className="card-title mt-2">{title}</h3>
              <p className="card-body mt-3">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
