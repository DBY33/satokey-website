import { motion } from "framer-motion";

const ZAPIER_WAITLIST_URL = "https://cmoraevcb0008yyrwfxe6yv6p.zapier.app";

export function ZapierWaitlist() {
  return (
    <section
      id="waitlist"
      className="scroll-mt-20 border-t border-white/[0.12] bg-tech-section px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="waitlist-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="cyber-glass-strong relative overflow-hidden rounded-2xl px-6 py-10 sm:px-12 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(ellipse 60% 55% at 15% 70%, rgba(34,211,238,0.12), transparent 55%), radial-gradient(ellipse 60% 55% at 85% 70%, rgba(99,102,241,0.12), transparent 55%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-cyan-400/10 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            aria-hidden
          />

          <div className="relative">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35 }}
            >
              <h2 id="waitlist-heading" className="section-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Join the waitlist
              </h2>
              <p className="mt-4 text-white/70">
                App is coming soon. Join now and protect your digital legacy today. Be notified when we launch.
              </p>
            </motion.div>

            <div className="mx-auto mt-8 max-w-3xl">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={ZAPIER_WAITLIST_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="neon-button inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold sm:w-auto"
                >
                  Open waitlist form
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

