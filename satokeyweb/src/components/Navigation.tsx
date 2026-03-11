import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Menu, X } from "lucide-react";
import { LogoIcon } from "./LogoIcon";

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
      className="fixed top-0 left-0 right-0 z-50 overflow-visible bg-glassy-dark-blue"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="overflow-visible">
        <nav
          className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 overflow-visible px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#"
            className="nav-logo-link flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
            onClick={closeMobileMenu}
          >
            <span className="nav-logo-slot shrink-0" style={{ lineHeight: 0 }}>
              <LogoIcon size={40} alt="Satokey" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Satokey</span>
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

        {/* Desktop CTA - scrolls to install section */}
        <div className="hidden md:block">
          <motion.a
            href="#install-the-app"
            onClick={(e) => {
              e.preventDefault();
              handleLaunchVault();
            }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0a0a0a] via-[#1e3a5f] to-[#e2e8f0] px-5 py-2.5 text-sm font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] shadow-[0_12px_35px_rgba(15,23,42,0.9)] outline-none ring-1 ring-white/20 transition-transform transition-shadow hover:ring-white/40 focus-visible:ring-2 focus-visible:ring-[#3b82f6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
            aria-label="Go to install the app"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            <KeyRound className="h-4 w-4 text-[#93c5fd]" aria-hidden />
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
      <div
        className="border-t border-white/[0.06]"
        style={{ marginTop: 8 }}
        aria-hidden
      />
      </div>

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
                className="mt-3 flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#0a0a0a] via-[#1e3a5f] to-[#e2e8f0] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,23,42,0.9)] ring-1 ring-white/20 hover:ring-white/40"
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                <KeyRound className="h-4 w-4 text-[#93c5fd]" aria-hidden />
                Launch Your Own Vault
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
