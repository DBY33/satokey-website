import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Menu, X } from "lucide-react";
import { LogoIcon } from "./LogoIcon";
import { ScrambleButton } from "./ScrambleButton";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "Join the waitlist", href: "#waitlist" },
] as const;

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleNavLinkClick = useCallback(
    () =>
      () => {
        closeMobileMenu();
      },
    [closeMobileMenu]
  );

  const handleLaunchVault = useCallback(() => {
    closeMobileMenu();
    const href = "#waitlist";
    window.location.hash = href;
  }, [closeMobileMenu]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 overflow-visible border-b border-white/10 bg-glassy-dark-blue"
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
            <span className="nav-logo-slot satokey-logo-float shrink-0" style={{ lineHeight: 0 }}>
              <LogoIcon size={40} alt="Satokey" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Satokey</span>
          </a>

        <div className="flex items-center gap-3">
          {/* Desktop CTA (where it originally lived) */}
          <div className="hidden md:block">
            <ScrambleButton
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault();
                handleLaunchVault();
              }}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#0f172a] px-5 py-2.5 text-sm font-medium tracking-wide text-white outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#22d3ee]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
              aria-label="Join the waitlist"
              as="a"
              scrambleOnHover={false}
              icon={<KeyRound className="h-4 w-4 shrink-0 text-white/90" aria-hidden />}
            >
              Launch Your Own Vault
            </ScrambleButton>
          </div>

          {/* Dropdown menu button (all devices) */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium tracking-wide text-white/90 transition-colors hover:border-white/15 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/50"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
            <span>Menu</span>
          </button>
        </div>
      </nav>
      <div
        className="border-t border-white/[0.08]"
        style={{ marginTop: 8 }}
        aria-hidden
      />
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/5 bg-glassy-dark-blue backdrop-blur-lg"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 lg:px-8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white"
                  onClick={handleNavLinkClick()}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
