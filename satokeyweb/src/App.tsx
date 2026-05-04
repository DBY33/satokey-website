import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { TechBackground } from "./components/TechBackground";
import { HowItWorks } from "./components/HowItWorks";
import { Security } from "./components/Security";
import { Pricing } from "./components/Pricing";
import { ZapierWaitlist } from "./components/ZapierWaitlist";
import { AppDownload } from "./components/AppDownload";
import "./App.css";

function App() {
  useEffect(() => {
    const scrollToHash = (hash: string, behavior: ScrollBehavior = "auto") => {
      if (!hash || !hash.startsWith("#")) return;
      const id = hash.slice(1);

      const tryScroll = (attempt: number) => {
        const el = document.getElementById(id);
        if (el) {
          // Avoid relying on scroll-margin behavior differences across browsers.
          const headerOffset = 88;
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: Math.max(0, top), behavior });
          return;
        }
        if (attempt >= 40) return;
        window.setTimeout(() => tryScroll(attempt + 1), 50);
      };

      tryScroll(0);
    };

    // Expose an explicit scroll hook for Android browsers where hash timing is unreliable.
    (window as unknown as { satokeyScrollToHash?: (hash: string) => void }).satokeyScrollToHash = (hash: string) => {
      scrollToHash(hash, "smooth");
    };

    // Handle initial deep-link and subsequent hash changes.
    scrollToHash(window.location.hash);
    const onHashChange = () => scrollToHash(window.location.hash, "smooth");

    const onNavigate = (evt: Event) => {
      const e = evt as CustomEvent<{ hash?: string }>;
      const hash = e.detail?.hash;
      if (hash) scrollToHash(hash, "smooth");
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("satokey:navigate", onNavigate as EventListener);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("satokey:navigate", onNavigate as EventListener);
      delete (window as unknown as { satokeyScrollToHash?: (hash: string) => void }).satokeyScrollToHash;
    };
  }, []);

  return (
    <>
      <TechBackground />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-[#22d3ee] px-4 py-2 text-sm font-semibold text-[#020617] shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#020617]"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1} className="relative z-10">
        <Hero />
        <HowItWorks />
        <Security />
        <Pricing />
        <ZapierWaitlist />
        <AppDownload />
      </main>
      <Footer />
    </>
  );
}

export default App;
