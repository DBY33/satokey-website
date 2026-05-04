import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en.json";

type CountryCode = (typeof getCountries extends () => infer R ? (R extends readonly (infer T)[] ? T : never) : never) & string;

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<CountryCode>("GB");
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
  const [smsConsent, setSmsConsent] = useState(false);
  const [state] = useState<"idle" | "success">(() => {
    try {
      return new URLSearchParams(window.location.search).get("waitlist") === "success" ? "success" : "idle";
    } catch {
      return "idle";
    }
  });
  const [companyWebsite, setCompanyWebsite] = useState("");

  const countries = useMemo(() => {
    const labels = enLabels as Record<string, string>;
    return [...getCountries()].sort((a, b) => {
      const la = labels[a] ?? a;
      const lb = labels[b] ?? b;
      return la.localeCompare(lb, "en", { sensitivity: "base" });
    });
  }, []);

  const phoneIsValid = useMemo(() => (phoneValue ? isValidPhoneNumber(phoneValue) : false), [phoneValue]);
  const emailIsValid = useMemo(() => email.trim().length > 3 && email.includes("@"), [email]);
  const canSubmit = emailIsValid && phoneIsValid && smsConsent;
  const disabledReason = useMemo(() => {
    if (!emailIsValid) return "Enter a valid email address.";
    if (!phoneIsValid) return "Enter a valid phone number.";
    if (!smsConsent) return "Please tick the SMS consent box to continue.";
    return null;
  }, [emailIsValid, phoneIsValid, smsConsent, state]);

  return (
    <section
      id="waitlist"
      className="scroll-mt-20 border-t border-white/[0.12] bg-tech-section px-4 py-28 sm:px-6 sm:py-32 lg:px-8"
      aria-labelledby="waitlist-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-[#22d3ee]/25 bg-black px-6 py-14 shadow-[0_0_0_1px_rgba(34,211,238,0.14),0_30px_90px_-35px_rgba(34,211,238,0.35)] sm:px-12 sm:py-16">
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
              App is coming soon.
            </h2>
            <p className="mt-4 text-white/70">
              Join now and protect your digital legacy today. Be notified when we launch.
            </p>
          </motion.div>

          <form
            className="mx-auto mt-12 grid max-w-xl gap-4 sm:grid-cols-2"
            name="satokey-waitlist"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="companyWebsite"
            action="/waitlist-success.html"
          >
            <input type="hidden" name="form-name" value="satokey-waitlist" />
            <input type="hidden" name="phoneCountry" value={country} />
            <input type="hidden" name="source" value="satokeyweb" />
            <label className="hidden">
              Don’t fill this out:
              <input
                name="companyWebsite"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-white/80">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-white/15 bg-[#020617] px-4 py-3.5 text-white placeholder:text-white/35 outline-none focus:border-[#22d3ee]/70 focus:ring-2 focus:ring-[#22d3ee]/25"
                placeholder="you@gmail.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-white/80">Phone (No.)</span>
              <div className="mt-2 grid grid-cols-[1fr_1.5fr] gap-3">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as CountryCode)}
                  className="w-full rounded-xl border border-white/15 bg-[#020617] px-3 py-3.5 text-sm text-white/90 outline-none focus:border-[#22d3ee]/70 focus:ring-2 focus:ring-[#22d3ee]/25"
                  aria-label="Country"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {(enLabels as Record<string, string>)[c] ?? c} (+{getCountryCallingCode(c)})
                    </option>
                  ))}
                </select>

                <PhoneInput
                  country={country}
                  value={phoneValue}
                  onChange={setPhoneValue}
                  international
                  withCountryCallingCode
                  required
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-xl border border-white/15 bg-[#020617] px-4 py-3.5 text-white placeholder:text-white/35 outline-none focus:border-[#22d3ee]/70 focus:ring-2 focus:ring-[#22d3ee]/25"
                  placeholder={`+${getCountryCallingCode(country)}…`}
                />
              </div>
              {!phoneIsValid && phoneValue && (
                <p className="mt-2 text-xs text-white/50">Please enter a valid number for the selected country.</p>
              )}
            </label>

            <div className="sm:col-span-2 mt-2">
              <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#22d3ee]"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  name="smsConsent"
                  required
                />
                <span className="text-sm text-white/75">
                  I agree to receive SMS updates about Satokey’s launch. Msg & data rates may apply. Reply STOP to unsubscribe.
                </span>
              </label>
              <p className="mt-3 text-xs text-white/45">
                By joining, you agree to receive launch emails. Unsubscribe anytime.
              </p>
            </div>

            <div className="sm:col-span-2 mt-2 flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#22d3ee] to-[#60a5fa] px-8 py-4 text-base font-semibold text-[#020617] shadow-[0_16px_40px_-18px_rgba(34,211,238,0.7),0_0_0_1px_rgba(34,211,238,0.25)] transition-[transform,filter,box-shadow,opacity] hover:scale-[1.01] hover:brightness-110 hover:shadow-[0_18px_50px_-18px_rgba(34,211,238,0.95),0_0_0_1px_rgba(34,211,238,0.35)] active:scale-[0.99] active:brightness-125 active:shadow-[0_20px_60px_-18px_rgba(34,211,238,1),0_0_0_1px_rgba(34,211,238,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:brightness-100 disabled:active:scale-100 disabled:active:brightness-100"
              >
                Join the waitlist
              </button>

              {!canSubmit && disabledReason && (
                <p className="text-sm text-white/55">{disabledReason}</p>
              )}

              {state === "success" && (
                <p className="text-sm text-emerald-300/90">You’re on the list. We’ll notify you when we launch.</p>
              )}
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}

