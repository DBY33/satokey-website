import { motion } from "framer-motion";
import { Check, Download } from "lucide-react";

const STANDARD_FEATURES = [
  "Secure vault for your passkeys and recovery phrases",
  "One designated legacy contact",
  "We hold the box but cannot open it—only your legacy contact can",
  "Access is released only when the automated email is sent to your contact",
  "Monthly heartbeat check-ins",
  "Multi-channel reminders (push, email, SMS)",
  "Automatic release after missed check-ins",
];

const PRO_FEATURES = [
  "Everything in Standard, plus:",
  "Unlimited legacy contacts",
  "Multiple crypto accounts and wallets",
  "Separate instructions per asset or account",
  "Dedicated vault per beneficiary if you choose",
  "Priority support",
  "Ideal for diverse portfolios and family distribution",
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-white/[0.06] bg-glassy-dark-blue px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="pricing-heading"
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
            id="pricing-heading"
            className="section-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Pricing
          </h2>
          <p className="section-subtitle mx-auto mt-4 max-w-2xl">
            Simple, transparent pricing. Choose the plan that fits how you manage your crypto legacy—one contact or many.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Standard — $9.99/month */}
          <motion.article
            className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 transition-colors hover:border-white/[0.1] hover:bg-white/[0.05]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.06, ease: "easeOut" }}
          >
            <div
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-[#22d3ee]/20 bg-white/[0.03] text-[#22d3ee]"
              aria-hidden
            >
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden>
                <rect x="6" y="10" width="20" height="14" rx="2" />
                <path d="M10 10V8a6 6 0 0112 0v2" />
                <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#22d3ee]">
              Standard
            </span>
            <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">$9.99</p>
            <p className="mt-1 text-sm text-white/65">per month</p>
            <p className="card-body mt-4 font-semibold">
              Perfect for securing one set of assets with a single trusted contact. We hold your sealed data and physically cannot open it—only your legacy contact can, once the automated email is sent.
            </p>
            <ul className="mt-6 space-y-3">
              {STANDARD_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 card-body font-semibold"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#22d3ee]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          {/* Pro — $15.99/month */}
          <motion.article
            className="group relative flex flex-col rounded-2xl border border-[#8b5cf6]/20 bg-white/[0.03] p-8 transition-colors hover:border-[#8b5cf6]/30 hover:bg-white/[0.05]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          >
            <span className="absolute right-6 top-6 rounded-full bg-[#8b5cf6]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#8b5cf6]">
              Best value
            </span>
            <div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-[#8b5cf6]/20 bg-white/[0.03] text-[#8b5cf6]"
              aria-hidden
            >
              <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10" aria-hidden>
                {/* Outer frame */}
                <rect x="2" y="4" width="36" height="32" rx="3" strokeWidth="1.4" opacity="0.5" />
                {/* Vault door */}
                <circle cx="20" cy="20" r="12" strokeWidth="1.8" />
                <circle cx="20" cy="20" r="13.2" strokeWidth="0.9" opacity="0.4" />
                {/* Bolt bar */}
                <rect x="5" y="18.2" width="30" height="3.6" rx="1.8" strokeWidth="1.2" />
                {/* Locking wheel outer */}
                <circle cx="20" cy="20" r="6" strokeWidth="1.4" />
                {/* Spokes (8 like hero vault) */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                  const a = (i / 8) * 2 * Math.PI - Math.PI / 2;
                  const r = 4.2;
                  const rInner = 1.4;
                  return (
                    <line key={i} x1={20 + rInner * Math.cos(a)} y1={20 + rInner * Math.sin(a)} x2={20 + r * Math.cos(a)} y2={20 + r * Math.sin(a)} strokeWidth="1.2" />
                  );
                })}
                {/* Center hub */}
                <circle cx="20" cy="20" r="1.8" fill="currentColor" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#8b5cf6]">
              Pro
            </span>
            <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">$15.99</p>
            <p className="mt-1 text-sm text-white/65">per month</p>
            <p className="card-body mt-4 font-semibold">
              For multiple beneficiaries and crypto accounts. Add unlimited legacy contacts and assign different assets or instructions to each.
            </p>
            <ul className="mt-6 space-y-3">
              {PRO_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 card-body font-semibold"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8b5cf6]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>

        <motion.div
          className="mt-16 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <p className="mx-auto max-w-xl text-sm text-white/60 sm:text-base">
            Install the app today and lock in your plan. No payment required upfront—billing starts only when you activate your vault.
          </p>
          <motion.a
            href="#install-the-app"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("install-the-app")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white outline-none transition-colors hover:border-[#22d3ee]/25 hover:bg-white/[0.08] focus:ring-2 focus:ring-[#22d3ee]/40 focus:ring-offset-2 focus:ring-offset-[#020617]"
            aria-label="Go to install the app"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Download className="h-4 w-4 text-[#22d3ee]" aria-hidden />
            Install the app
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
