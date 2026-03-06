import { lazy, Suspense } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import "./App.css";

const HowItWorks = lazy(() => import("./components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const Security = lazy(() => import("./components/Security").then((m) => ({ default: m.Security })));
const Pricing = lazy(() => import("./components/Pricing").then((m) => ({ default: m.Pricing })));
const AppDownload = lazy(() => import("./components/AppDownload").then((m) => ({ default: m.AppDownload })));

function SectionFallback() {
  return (
    <section className="flex min-h-[40vh] items-center justify-center border-t border-white/[0.06]">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#22d3ee]/20 border-t-[#22d3ee]" aria-hidden />
    </section>
  );
}

function App() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-[#22d3ee] px-4 py-2 text-sm font-semibold text-[#020617] shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#020617]"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Security />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AppDownload />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
