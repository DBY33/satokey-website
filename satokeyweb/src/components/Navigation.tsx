import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "Install the app", href: "#install-the-app" },
] as const;

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleLaunchVault = useCallback(() => {
    closeMobileMenu();
    document.getElementById("install-the-app")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [closeMobileMenu]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-glassy-dark-blue backdrop-blur-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-semibold text-white transition-opacity hover:opacity-90"
          onClick={closeMobileMenu}
        >
          <span className="tracking-tight font-semibold">Satokey</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium tracking-wide text-white/75 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA - scrolls to pricing */}
        <div className="hidden md:block">
          <motion.a
            href="#install-the-app"
            onClick={(e) => {
              e.preventDefault();
              handleLaunchVault();
            }}
            className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:border-[#22d3ee]/25 hover:bg-white/[0.08] focus:ring-2 focus:ring-[#22d3ee]/40 focus:ring-offset-2 focus:ring-offset-[#020617]"
            aria-label="Go to install the app"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <KeyRound className="h-4 w-4 text-[#22d3ee]" aria-hidden />
            Launch Your Own Vault
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/5 bg-glassy-dark-blue backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  {label}
                </a>
              ))}
              <motion.a
                href="#install-the-app"
                onClick={(e) => {
                  e.preventDefault();
                  handleLaunchVault();
                }}
                className="mt-2 flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-[#22d3ee]/25 hover:bg-white/[0.08]"
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <KeyRound className="h-4 w-4 text-[#22d3ee]" aria-hidden />
                Launch Your Own Vault
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
