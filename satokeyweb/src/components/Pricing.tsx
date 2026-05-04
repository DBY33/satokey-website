import { motion } from "framer-motion";
import { Check, Download, Lock, Sparkles, Crown } from "lucide-react";
import { ScrambleButton } from "./ScrambleButton";

const APP_STORE_URL = "https://apps.apple.com/app/satokey/id0000000000";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.satokey.app";

type Accent = "black" | "navy" | "white";

const ACCENT_STYLES: Record<
  Accent,
  {
    card: string;
    aura: string;
    topLine: string;
    badge: string;
    iconWrap: string;
    label: string;
    appStoreBtn: string;
    check: string;
  }
> = {
  black: {
    card: "border border-white/10 bg-gradient-to-b from-[#020617] via-[#01030f] to-black shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_64px_-22px_rgba(0,0,0,0.8)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_86px_-26px_rgba(0,0,0,0.85)]",
    aura: "bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent_62%)]",
    topLine: "bg-gradient-to-r from-transparent via-white/20 to-transparent",
    badge: "border border-white/25 bg-white/[0.08] text-white/90 shadow-[0_0_28px_rgba(255,255,255,0.18)]",
    iconWrap: "bg-white/5 text-white/85 ring-1 ring-white/10",
    label: "text-white/70",
    appStoreBtn:
      "bg-gradient-to-r from-[#111827] to-[#0b1220] shadow-[0_18px_44px_-24px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.10)] text-white",
    check: "text-white/55",
  },
  navy: {
    card: "border border-[#1e3a5f]/55 bg-gradient-to-b from-[#06101d] via-[#020617] to-black shadow-[0_0_0_1px_rgba(30,58,95,0.18),0_30px_78px_-24px_rgba(0,0,0,0.82)] hover:shadow-[0_0_0_1px_rgba(30,58,95,0.26),0_34px_92px_-28px_rgba(0,0,0,0.86),0_0_72px_-20px_rgba(30,58,95,0.35)]",
    aura: "bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(30,58,95,0.3),transparent_62%)]",
    topLine: "bg-gradient-to-r from-transparent via-[#22d3ee]/25 to-transparent",
    badge: "border border-white/25 bg-white/[0.08] text-white/90 shadow-[0_0_28px_rgba(255,255,255,0.18)]",
    iconWrap: "bg-[#1e3a5f]/35 text-[#93c5fd] ring-1 ring-[#60a5fa]/25",
    label: "text-[#93c5fd]",
    appStoreBtn:
      "bg-gradient-to-r from-[#1e3a5f] to-[#0f172a] shadow-[0_18px_44px_-24px_rgba(30,58,95,0.7),0_0_0_1px_rgba(96,165,250,0.22)] text-white",
    check: "text-[#60a5fa]",
  },
  white: {
    card: "border border-white/25 bg-gradient-to-b from-[#0b1220] via-[#020617] to-black shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_30px_84px_-26px_rgba(0,0,0,0.84)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_36px_98px_-30px_rgba(0,0,0,0.88),0_0_76px_-18px_rgba(255,255,255,0.18)]",
    aura: "bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.14),transparent_62%)]",
    topLine: "bg-gradient-to-r from-transparent via-white/45 to-transparent",
    badge: "border border-white/25 bg-white/[0.08] text-white/90 shadow-[0_0_28px_rgba(255,255,255,0.18)]",
    iconWrap: "bg-white/10 text-white/90 ring-1 ring-white/20",
    label: "text-white/85",
    appStoreBtn:
      "bg-gradient-to-r from-white to-[#e5e7eb] shadow-[0_20px_46px_-24px_rgba(255,255,255,0.25),0_0_0_1px_rgba(255,255,255,0.18)] text-[#020617]",
    check: "text-white/75",
  },
};

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

const ENTERPRISE_FEATURES = [
  "Everything in Pro, plus:",
  "Unlimited beneficiaries with advanced access rules",
  "Team / family admin access (multi‑device oversight)",
  "Custom heartbeat cadence + multiple escalation paths",
  "Advanced audit trail and activity timeline",
  "Concierge onboarding and priority support",
  "Best for high‑net‑worth families and complex estates",
];

const PLANS = [
  {
    id: "standard",
    label: "Standard",
    price: "$9.99",
    period: "per month",
    description:
      "Perfect for securing one set of assets with a single trusted contact. We hold your sealed data and physically cannot open it—only your legacy contact can, once the automated email is sent.",
    features: STANDARD_FEATURES,
    Icon: Lock,
    accent: "black",
    recommended: false,
  },
  {
    id: "pro",
    label: "Pro",
    price: "$15.99",
    period: "per month",
    description:
      "For multiple beneficiaries and crypto accounts. Add unlimited legacy contacts and assign different assets or instructions to each.",
    features: PRO_FEATURES,
    Icon: Sparkles,
    accent: "navy",
    recommended: false,
  },
  {
    id: "enterprise",
    label: "Enterprise",
    price: "$29.99",
    period: "per month",
    description:
      "For complex estates and high‑value portfolios. Advanced rules, audit trail, and concierge onboarding—built for families that need maximum control and clarity.",
    features: ENTERPRISE_FEATURES,
    Icon: Crown,
    accent: "white",
    recommended: true,
  },
] as const;

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-white/[0.08] bg-tech-section px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section aura + frame to make pricing feel premium */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(1100px,90vw)] -translate-x-1/2 -translate-y-24 rounded-[48px] blur-[90px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 20%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(ellipse 70% 55% at 70% 60%, rgba(99,102,241,0.14), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative rounded-[32px] border border-white/10 bg-black/40 px-5 py-14 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_40px_120px_-55px_rgba(34,211,238,0.35)] backdrop-blur-md sm:px-10 sm:py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <h2
            id="pricing-heading"
            className="section-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Pricing
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/65 sm:text-lg">
            Simple, transparent pricing. Choose the plan that fits how you manage your crypto legacy—one contact or many.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-3 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.08 },
            },
          }}
        >
          {PLANS.map(({ id, label, price, period, description, features, Icon, accent, recommended }) => {
            const styles = ACCENT_STYLES[accent as Accent];
            return (
            <motion.article
              key={id}
              className={`group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-transform duration-300 will-change-transform hover:-translate-y-1 sm:p-8 ${styles.card}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${styles.aura}`}
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-px ${styles.topLine}`}
                aria-hidden
              />
              {recommended && (
                <span
                  className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${styles.badge}`}
                >
                  Best value
                </span>
              )}

              <div className="relative flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.iconWrap}`}
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.label}`}
                  >
                    {label}
                  </span>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-3xl font-bold tracking-tight text-white sm:text-[2.25rem]">{price}</span>
                    <span className="text-sm text-white/50">{period}</span>
                  </div>
                </div>
              </div>

              <p className="relative card-body mt-5 text-sm leading-relaxed text-white/75 sm:text-[0.9375rem]">
                {description}
              </p>

              <div className="relative mt-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold tracking-wide transition-[transform,filter,box-shadow,opacity] hover:opacity-95 hover:brightness-110 active:scale-[0.99] ${styles.appStoreBtn}`}
                    aria-label={`Buy now on the App Store (${label})`}
                  >
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Buy now
                  </a>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition-[transform,filter,box-shadow,opacity] hover:border-white/25 hover:bg-white/[0.06] active:scale-[0.99]"
                    aria-label={`Buy now on Google Play (${label})`}
                  >
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                      <path fill="#6BA8F0" d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" />
                      <path fill="#EA4335" d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" />
                      <path fill="#FBBC04" d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12c0 .5-.22.9-.53 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.29 1.32Z" />
                      <path fill="#00C853" d="M6.05 2.66L16.81 8.88 14.54 11.15 6.05 2.66Z" />
                    </svg>
                    Buy now
                  </a>
                </div>
              </div>

              <ul
                className="relative mt-7 space-y-3 border-t border-white/10 pt-7"
              >
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/80 sm:text-[0.9375rem]">
                    <Check
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${styles.check}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
          })}
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center justify-center text-center sm:mt-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <p className="mx-auto max-w-xl text-sm text-white/55 sm:text-base">
            Install the app today and lock in your plan. No payment required upfront—billing starts only when you activate your vault.
          </p>
          <ScrambleButton
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#0f172a] px-5 py-2.5 text-sm font-medium tracking-wide text-white outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#22d3ee]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
            aria-label="Join the waitlist"
            scrambleOnHover={false}
            icon={<Download className="h-4 w-4 shrink-0 text-white/90" aria-hidden />}
          >
            Join the waitlist
          </ScrambleButton>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
