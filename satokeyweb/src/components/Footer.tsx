export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 border-t border-white/[0.08] bg-glassy-dark-blue px-4 py-8 sm:px-6 lg:px-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-white/50">
          © {year} Satokey. All rights reserved.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <li>
              <a
                href="#"
                className="text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:text-white/70"
              >
                Back to top
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:text-white/70"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:text-white/70"
              >
                Terms
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
