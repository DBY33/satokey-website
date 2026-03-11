import { motion } from "framer-motion";
import { LogoIcon } from "./LogoIcon";

const APP_STORE_URL = "https://apps.apple.com/app/satokey/id0000000000";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.satokey.app";

export function AppDownload() {
  return (
    <section
      id="install-the-app"
      className="scroll-mt-20 border-t border-white/[0.08] bg-black px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="install-the-app-heading"
    >
      <div className="relative mx-auto max-w-4xl rounded-2xl border border-white/[0.1] bg-black px-8 py-20 sm:px-14 sm:py-24">
        {/* Blur orbs clipped to rounded card */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
          <div
            className="absolute -top-24 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-[#22d3ee]/[0.04] blur-[100px]"
            aria-hidden
          />
          <div
            className="absolute -bottom-12 right-0 h-24 w-48 rounded-full bg-[#10b981]/[0.03] blur-[80px]"
            aria-hidden
          />
        </div>

        <div className="relative flex flex-col items-center text-center">
          <motion.h2
            id="install-the-app-heading"
            className="section-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            Install the app
          </motion.h2>
          <motion.p
            className="mt-4 max-w-md text-white/70"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Satokey is available on iOS and Android. Your vault, always with
            you.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col items-center gap-5 pb-6 sm:flex-row sm:justify-center sm:gap-6 sm:pb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
          >
            {/* S logo only – extra padding so bottom isn't clipped by card's rounded corners */}
            <motion.div
              className="flex min-h-0 flex-shrink-0 overflow-visible pb-4"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <LogoIcon size={180} />
            </motion.div>

            {/* Store badges - App Store (cyan) and Play Store (green) icons */}
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
              <motion.a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-xl border border-white/20 bg-black/40 px-6 py-3 transition-colors duration-200 hover:border-[#22d3ee]/60 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/50 focus:ring-offset-2 focus:ring-offset-[#020617]"
                aria-label="Download Satokey on the App Store"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Apple logo - official white on dark (App Store badge style) */}
                <svg
                  className="h-8 w-8 shrink-0"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  aria-hidden
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[10px] leading-tight text-white/90">
                    Download on the
                  </span>
                  <span className="block text-lg font-semibold text-white">
                    App Store
                  </span>
                </div>
              </motion.a>
              <motion.a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-xl border border-white/20 bg-black/40 px-6 py-3 transition-colors duration-200 hover:border-[#22d3ee]/60 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/50 focus:ring-offset-2 focus:ring-offset-[#020617]"
                aria-label="Get Satokey on Google Play"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Google Play icon - custom color swap: green→blue, yellow→green, red→yellow, blue→red */}
                <svg
                  className="h-8 w-8 shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path fill="#6BA8F0" d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" />
                  <path fill="#EA4335" d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" />
                  <path fill="#FBBC04" d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12c0 .5-.22.9-.53 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.29 1.32Z" />
                  <path fill="#00C853" d="M6.05 2.66L16.81 8.88 14.54 11.15 6.05 2.66Z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[10px] leading-tight text-white/90">
                    Get it on
                  </span>
                  <span className="block text-lg font-semibold text-white">
                    Google Play
                  </span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          <p className="mt-8 text-sm text-white/50">
            Coming soon. Join the waitlist to be notified when Satokey launches.
          </p>
        </div>
      </div>
    </section>
  );
}
