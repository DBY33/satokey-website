import { motion } from "framer-motion";
import { Lock, EyeOff, Bell } from "lucide-react";

const SPECS = [
  {
    icon: Lock,
    label: "We hold the box",
    title: "We hold the box—we cannot open it",
    description:
      "We store your sealed data but do not have the ability to view or open it. Only your legacy contact can access the contents, and only once the automated email is sent to them after the failsafe period.",
  },
  {
    icon: EyeOff,
    label: "No access",
    title: "We never see your passkeys",
    description:
      "We don't have the keys to the box. We hold it for you; only your designated legacy contact can open it when the automated process triggers. You stay in control.",
  },
  {
    icon: Bell,
    label: "Alerts",
    title: "Multi-channel alerts",
    description:
      "Reminders via push, email, and SMS so you never miss a check-in. You choose how you want to stay in touch with your vault.",
  },
] as const;

export function Security() {
  return (
    <section
      id="security"
      className="scroll-mt-20 border-t border-white/[0.06] bg-glassy-dark-blue px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="security-heading"
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
            id="security-heading"
            className="section-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Security
          </h2>
          <p className="section-subtitle mx-auto mt-4 max-w-xl">
            Built for the highest stakes. Your legacy deserves nothing less.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-8 sm:grid-cols-3">
          {SPECS.map(({ icon: Icon, label, title, description }, i) => (
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
                {label}
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
