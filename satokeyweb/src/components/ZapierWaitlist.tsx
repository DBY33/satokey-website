import { motion } from "framer-motion";

const ZAPIER_WAITLIST_URL = "https://cmoraevcb0008yyrwfxe6yv6p.zapier.app";

export function ZapierWaitlist() {
  return (
    <section
      id="waitlist"
      className="scroll-mt-20 border-t border-white/[0.08] bg-tech-section px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="waitlist-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-neutral-950 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.05), transparent 55%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
              <h2
                id="waitlist-heading"
                className="section-heading text-3xl font-bold tracking-tighter text-white sm:text-4xl"
              >
                Join the waitlist
              </h2>
              <p className="mt-4 text-white/55">
                App is coming soon. Join now and protect your digital legacy today. Be notified when we launch.
              </p>
            </motion.div>

            <div className="mx-auto mt-8 flex justify-center">
              <a
                href={ZAPIER_WAITLIST_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_-18px_rgba(255,255,255,0.25)] transition-[transform,filter,box-shadow] hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto"
              >
                Open waitlist form
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
