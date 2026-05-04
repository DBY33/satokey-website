import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";

const VAULT_OPEN_DELAY_MS = 400;

function useVaultOpenSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const duration = 1.25;

    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.55, now + 0.03);
    masterGain.gain.linearRampToValueAtTime(0.48, now + 0.18);
    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.55);
    masterGain.gain.exponentialRampToValueAtTime(0.018, now + duration);

    /* 0) Mechanism — double click like bolts retracting in sequence */
    const clickBufSize = Math.floor(ctx.sampleRate * 0.012);
    const clickBuf = ctx.createBuffer(1, clickBufSize, ctx.sampleRate);
    const clickCh = clickBuf.getChannelData(0);
    for (let i = 0; i < clickBufSize; i++) {
      clickCh[i] = (Math.random() * 2 - 1) * (1 - i / clickBufSize);
    }
    const makeClick = (t: number, gainVal: number) => {
      const src = ctx.createBufferSource();
      src.buffer = clickBuf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 300 + t * 80;
      bp.Q.value = 0.55;
      const g = ctx.createGain();
      g.gain.setValueAtTime(gainVal, now + t);
      g.gain.exponentialRampToValueAtTime(0.001, now + t + 0.012);
      src.connect(bp);
      bp.connect(g);
      g.connect(masterGain);
      src.start(now + t);
    };
    makeClick(0, 0.38);
    makeClick(0.038, 0.26);

    /* 1) Lock release — starts just after first click, heavy thud */
    const lockStart = now + 0.018;
    const lockGain = ctx.createGain();
    lockGain.connect(masterGain);
    lockGain.gain.setValueAtTime(0, lockStart);
    lockGain.gain.linearRampToValueAtTime(1, lockStart + 0.006);
    lockGain.gain.exponentialRampToValueAtTime(0.015, lockStart + 0.09);
    const lockOsc = ctx.createOscillator();
    lockOsc.type = "sine";
    lockOsc.frequency.setValueAtTime(52, lockStart);
    lockOsc.frequency.exponentialRampToValueAtTime(26, lockStart + 0.06);
    lockOsc.connect(lockGain);
    lockOsc.start(lockStart);
    lockOsc.stop(lockStart + 0.09);
    const lockOsc2 = ctx.createOscillator();
    lockOsc2.type = "triangle";
    lockOsc2.frequency.setValueAtTime(104, lockStart);
    lockOsc2.frequency.exponentialRampToValueAtTime(52, lockStart + 0.045);
    const lockGain2 = ctx.createGain();
    lockGain2.gain.setValueAtTime(0.3, lockStart);
    lockGain2.gain.exponentialRampToValueAtTime(0.001, lockStart + 0.05);
    lockGain2.connect(masterGain);
    lockOsc2.connect(lockGain2);
    lockOsc2.start(lockStart);
    lockOsc2.stop(lockStart + 0.05);

    /* 1b) Door motion — single cohesive metal door movement (scrape + resonance) */
    const doorStart = now + 0.07;

    // 1b-1) Metallic scrape/creak: filtered noise with moving resonance
    const scrapeDur = 0.78;
    const scrapeBufSize = Math.max(1, Math.floor(ctx.sampleRate * scrapeDur));
    const scrapeBuf = ctx.createBuffer(1, scrapeBufSize, ctx.sampleRate);
    const scrapeCh = scrapeBuf.getChannelData(0);
    for (let i = 0; i < scrapeBufSize; i++) {
      const t = i / ctx.sampleRate;
      const attack = 1 - Math.exp(-t / 0.045);
      const decay = Math.exp(-t / 0.6);
      const env = attack * decay;
      const n = (Math.random() * 2 - 1) * 0.9 + (Math.random() * 2 - 1) * 0.25;
      scrapeCh[i] = n * env;
    }
    const scrapeSrc = ctx.createBufferSource();
    scrapeSrc.buffer = scrapeBuf;

    const scrapeBP = ctx.createBiquadFilter();
    scrapeBP.type = "bandpass";
    scrapeBP.frequency.setValueAtTime(850, doorStart);
    scrapeBP.frequency.linearRampToValueAtTime(1900, doorStart + scrapeDur * 0.55);
    scrapeBP.frequency.linearRampToValueAtTime(1200, doorStart + scrapeDur);
    scrapeBP.Q.setValueAtTime(2.2, doorStart);
    scrapeBP.Q.linearRampToValueAtTime(9.0, doorStart + scrapeDur);

    const scrapeHP = ctx.createBiquadFilter();
    scrapeHP.type = "highpass";
    scrapeHP.frequency.setValueAtTime(420, doorStart);
    scrapeHP.Q.setValueAtTime(0.75, doorStart);

    const scrapeGain = ctx.createGain();
    scrapeGain.connect(masterGain);
    scrapeGain.gain.setValueAtTime(0, doorStart);
    scrapeGain.gain.linearRampToValueAtTime(0.18, doorStart + 0.09);
    scrapeGain.gain.linearRampToValueAtTime(0.12, doorStart + 0.32);
    scrapeGain.gain.exponentialRampToValueAtTime(0.001, doorStart + scrapeDur);

    // Resonant tail: short delay feedback to mimic metal cavity/comb resonance.
    const scrapeDelay = ctx.createDelay(0.2);
    scrapeDelay.delayTime.setValueAtTime(0.032, doorStart);
    const scrapeFb = ctx.createGain();
    scrapeFb.gain.setValueAtTime(0.18, doorStart);
    scrapeFb.gain.exponentialRampToValueAtTime(0.001, doorStart + scrapeDur);
    scrapeDelay.connect(scrapeFb);
    scrapeFb.connect(scrapeDelay);

    scrapeSrc.connect(scrapeBP);
    scrapeBP.connect(scrapeHP);
    scrapeHP.connect(scrapeGain);
    scrapeHP.connect(scrapeDelay);
    scrapeDelay.connect(scrapeGain);
    scrapeSrc.start(doorStart);

    /* 2) Door rumble — massive weight, slow pitch drift + detuned layer for thickness */
    const rumbleGain1 = ctx.createGain();
    rumbleGain1.connect(masterGain);
    rumbleGain1.gain.setValueAtTime(0, now + 0.04);
    rumbleGain1.gain.linearRampToValueAtTime(0.82, now + 0.14);
    rumbleGain1.gain.linearRampToValueAtTime(0.72, now + 0.55);
    rumbleGain1.gain.exponentialRampToValueAtTime(0.022, now + duration);
    const rumble = ctx.createOscillator();
    rumble.type = "sine";
    rumble.frequency.setValueAtTime(26, now + 0.04);
    rumble.frequency.linearRampToValueAtTime(22, now + 0.45);
    rumble.frequency.linearRampToValueAtTime(18, now + duration);
    rumble.connect(rumbleGain1);
    rumble.start(now + 0.04);
    rumble.stop(now + duration);
    const rumbleDetune = ctx.createOscillator();
    rumbleDetune.type = "sine";
    rumbleDetune.frequency.setValueAtTime(24.5, now + 0.05);
    rumbleDetune.frequency.linearRampToValueAtTime(20, now + duration);
    const rumbleDetuneGain = ctx.createGain();
    rumbleDetuneGain.gain.setValueAtTime(0, now + 0.05);
    rumbleDetuneGain.gain.linearRampToValueAtTime(0.4, now + 0.15);
    rumbleDetuneGain.gain.exponentialRampToValueAtTime(0.015, now + duration);
    rumbleDetune.connect(rumbleDetuneGain);
    rumbleDetuneGain.connect(masterGain);
    rumbleDetune.start(now + 0.05);
    rumbleDetune.stop(now + duration);

    const rumbleGain = ctx.createGain();
    rumbleGain.connect(masterGain);
    rumbleGain.gain.setValueAtTime(0, now);
    rumbleGain.gain.linearRampToValueAtTime(0.6, now + 0.1);
    rumbleGain.gain.linearRampToValueAtTime(0.55, now + 0.5);
    rumbleGain.gain.exponentialRampToValueAtTime(0.025, now + duration);
    const rumble2 = ctx.createOscillator();
    rumble2.type = "triangle";
    rumble2.frequency.setValueAtTime(38, now + 0.05);
    rumble2.frequency.linearRampToValueAtTime(32, now + duration);
    rumble2.connect(rumbleGain);
    rumble2.start(now + 0.05);
    rumble2.stop(now + duration);

    /* 3) Mechanical roll — rails/rollers, gain wobble for varying friction */
    const bufferSize = Math.floor(ctx.sampleRate * (duration + 0.2));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const env = Math.exp(-t / 0.48) * (1 - Math.exp(-t / 0.055));
      data[i] = (Math.random() * 2 - 1) * env * 0.88;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 240;
    noiseFilter.Q.value = 0.3;
    const noiseGain = ctx.createGain();
    const curveLen = 32;
    const wobbleCurve = new Float32Array(curveLen);
    for (let i = 0; i < curveLen; i++) {
      const x = i / (curveLen - 1);
      const base = 0.15 * (1 - x * 0.6) * (1 - Math.pow(x, 1.5));
      wobbleCurve[i] = base * (0.92 + 0.16 * Math.sin(i * 1.7) * Math.cos(i * 0.5));
    }
    noiseGain.gain.setValueCurveAtTime(wobbleCurve, now, duration);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now);

    /* 3b) Metallic body — two bandpass layers for richer "metal" */
    const metalBufferSize = Math.floor(ctx.sampleRate * duration);
    const metalBuffer = ctx.createBuffer(1, metalBufferSize, ctx.sampleRate);
    const metalData = metalBuffer.getChannelData(0);
    for (let i = 0; i < metalBufferSize; i++) {
      const t = i / ctx.sampleRate;
      const env = Math.exp(-t / 0.38) * (1 - Math.exp(-t / 0.09));
      metalData[i] = (Math.random() * 2 - 1) * env * 0.65;
    }
    const metalSource = ctx.createBufferSource();
    metalSource.buffer = metalBuffer;
    const metalFilter = ctx.createBiquadFilter();
    metalFilter.type = "bandpass";
    metalFilter.frequency.value = 195;
    metalFilter.Q.value = 0.5;
    const metalGain = ctx.createGain();
    metalGain.gain.setValueAtTime(0, now);
    metalGain.gain.linearRampToValueAtTime(0.1, now + 0.08);
    metalGain.gain.linearRampToValueAtTime(0.065, now + 0.42);
    metalGain.gain.exponentialRampToValueAtTime(0.007, now + duration);
    metalSource.connect(metalFilter);
    metalFilter.connect(metalGain);
    metalGain.connect(masterGain);
    metalSource.start(now);
    const metalSource2 = ctx.createBufferSource();
    metalSource2.buffer = metalBuffer;
    const metalFilter2 = ctx.createBiquadFilter();
    metalFilter2.type = "bandpass";
    metalFilter2.frequency.value = 340;
    metalFilter2.Q.value = 0.35;
    const metalGain2 = ctx.createGain();
    metalGain2.gain.setValueAtTime(0, now);
    metalGain2.gain.linearRampToValueAtTime(0.045, now + 0.1);
    metalGain2.gain.exponentialRampToValueAtTime(0.004, now + duration);
    metalSource2.connect(metalFilter2);
    metalFilter2.connect(metalGain2);
    metalGain2.connect(masterGain);
    metalSource2.start(now);

    /* 4) Final settle — door stops: main thud, small follow-up, then metal clank */
    const settleAt = now + duration - 0.14;
    const settleGain = ctx.createGain();
    settleGain.connect(masterGain);
    settleGain.gain.setValueAtTime(0.88, settleAt);
    settleGain.gain.exponentialRampToValueAtTime(0.025, settleAt + 0.1);
    const settleOsc = ctx.createOscillator();
    settleOsc.type = "sine";
    settleOsc.frequency.setValueAtTime(40, settleAt);
    settleOsc.frequency.exponentialRampToValueAtTime(22, settleAt + 0.07);
    settleOsc.connect(settleGain);
    settleOsc.start(settleAt);
    settleOsc.stop(settleAt + 0.1);
    const settle2At = settleAt + 0.035;
    const settle2Gain = ctx.createGain();
    settle2Gain.connect(masterGain);
    settle2Gain.gain.setValueAtTime(0.35, settle2At);
    settle2Gain.gain.exponentialRampToValueAtTime(0.008, settle2At + 0.08);
    const settle2Osc = ctx.createOscillator();
    settle2Osc.type = "sine";
    settle2Osc.frequency.setValueAtTime(28, settle2At);
    settle2Osc.frequency.exponentialRampToValueAtTime(18, settle2At + 0.06);
    settle2Osc.connect(settle2Gain);
    settle2Osc.start(settle2At);
    settle2Osc.stop(settle2At + 0.08);
    const settleClickSize = Math.floor(ctx.sampleRate * 0.02);
    const settleClickBuf = ctx.createBuffer(1, settleClickSize, ctx.sampleRate);
    const settleClickData = settleClickBuf.getChannelData(0);
    for (let i = 0; i < settleClickSize; i++) {
      settleClickData[i] = (Math.random() * 2 - 1) * (1 - i / settleClickSize);
    }
    const settleClick = ctx.createBufferSource();
    settleClick.buffer = settleClickBuf;
    const settleClickFilter = ctx.createBiquadFilter();
    settleClickFilter.type = "bandpass";
    settleClickFilter.frequency.value = 220;
    settleClickFilter.Q.value = 0.5;
    const settleClickGain = ctx.createGain();
    settleClickGain.gain.setValueAtTime(0.3, settleAt + 0.008);
    settleClickGain.gain.exponentialRampToValueAtTime(0.001, settleAt + 0.028);
    settleClick.connect(settleClickFilter);
    settleClickFilter.connect(settleClickGain);
    settleClickGain.connect(masterGain);
    settleClick.start(settleAt);
  }, []);

  const schedulePlay = useCallback(() => {
    timeoutRef.current = setTimeout(play, VAULT_OPEN_DELAY_MS);
  }, [play]);

  const cancelSchedule = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { schedulePlay, cancelSchedule };
}

const CYAN = "rgba(34, 211, 238, 0.88)";
const CYAN_GLOW = "rgba(34, 211, 238, 0.45)";
const DARK_BLUE_GLOW = "rgba(30, 58, 138, 0.55)";
/* Steel metallic palette - cooler, higher contrast */
const STEEL_HI = "rgba(255, 255, 255, 0.5)";
const STEEL = "rgba(185, 198, 212, 0.22)";
const STEEL_MID = "rgba(100, 118, 140, 0.35)";
const STEEL_DARK = "rgba(45, 55, 72, 0.7)";
const STEEL_SHADOW = "rgba(15, 23, 42, 0.85)";
const RIVET_HI = "rgba(255, 255, 255, 0.6)";
const RIVET = "rgba(203, 213, 225, 0.5)";
const RIVET_SHADOW = "rgba(30, 41, 59, 0.9)";
/* Bolt head - outer bevel and dome */
const BOLT_RIM = "rgba(160, 174, 192, 0.5)";
const BOLT_RIM_SHADOW = "rgba(25, 35, 50, 0.8)";

export function VaultVisual() {
  const { schedulePlay, cancelSchedule } = useVaultOpenSound();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) schedulePlay();
    else cancelSchedule();
  }, [isOpen, schedulePlay, cancelSchedule]);

  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "touch") setIsOpen(true);
  }, []);
  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "touch") setIsOpen(false);
  }, []);
  const handleTap = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle halo behind vault - lights up when vault is open */}
      <motion.div
        className="absolute -inset-4 rounded-2xl blur-[80px]"
        style={{ backgroundColor: "rgba(30, 58, 138, 0.08)" }}
        animate={{
          backgroundColor: isOpen ? "rgba(30, 58, 138, 0.35)" : "rgba(30, 58, 138, 0.08)",
        }}
        transition={{ duration: 0.4 }}
        aria-hidden
      />

      <motion.div
        className="group relative h-44 w-[11rem] md:h-52 md:w-[13rem] cursor-pointer touch-manipulation"
        style={{ perspective: 600, transformStyle: "preserve-3d" }}
        animate={isOpen ? "hover" : "rest"}
        initial="rest"
        variants={{ rest: {}, hover: {} }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleTap}
      >
        {/* Outer frame - thick steel plate */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(152deg, ${STEEL_HI} 0%, ${STEEL} 12%, ${STEEL_MID} 35%, ${STEEL_DARK} 60%, ${STEEL_SHADOW} 100%)`,
            boxShadow: `
              inset 3px 3px 6px rgba(255,255,255,0.2),
              inset -3px -3px 12px rgba(0,0,0,0.7),
              inset 0 8px 24px rgba(0,0,0,0.5),
              0 0 0 1px rgba(255,255,255,0.25),
              0 0 0 2px rgba(34, 211, 238, 0.1),
              0 0 40px -10px ${CYAN_GLOW}
            `,
          }}
          variants={{
            hover: {
              boxShadow: `
                inset 3px 3px 6px rgba(255,255,255,0.22),
                inset -3px -3px 12px rgba(0,0,0,0.65),
                inset 0 8px 24px rgba(0,0,0,0.45),
                0 0 0 1px rgba(255,255,255,0.3),
                0 0 0 2px rgba(30, 58, 138, 0.5),
                0 0 50px -8px ${DARK_BLUE_GLOW},
                0 0 80px -10px ${DARK_BLUE_GLOW}
              `,
              transition: { duration: 0.3 },
            },
          }}
        />

        {/* Left hinge plates - steel */}
        <div
          className="absolute left-0 top-[22%] h-8 w-2 rounded-r-md md:top-[24%] md:h-10 md:w-2.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${STEEL_MID} 15%, ${STEEL_DARK} 50%, ${STEEL_SHADOW} 100%)`,
            boxShadow: "inset 2px 0 0 rgba(255,255,255,0.3), 2px 0 4px rgba(0,0,0,0.5)",
          }}
          aria-hidden
        />
        <div
          className="absolute left-0 top-[62%] h-8 w-2 rounded-r-md md:top-[64%] md:h-10 md:w-2.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${STEEL_MID} 15%, ${STEEL_DARK} 50%, ${STEEL_SHADOW} 100%)`,
            boxShadow: "inset 2px 0 0 rgba(255,255,255,0.3), 2px 0 4px rgba(0,0,0,0.5)",
          }}
          aria-hidden
        />

        {/* Right handle bar - steel cylinder, twists on hover (unlock) */}
        <motion.div
          className="absolute right-1 top-1/2 h-12 w-1.5 -translate-y-1/2 rounded-l md:right-1.5 md:h-14 md:w-2"
          style={{
            background: `linear-gradient(90deg, ${STEEL_SHADOW} 0%, ${STEEL_DARK} 20%, ${STEEL} 48%, ${STEEL_HI} 52%, ${STEEL} 100%)`,
            boxShadow: "inset -2px 0 2px rgba(255,255,255,0.25), inset 2px 0 4px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)",
            transformOrigin: "left center",
          }}
          variants={{
            rest: { rotate: 0, transition: { duration: 0.35, ease: "easeOut" } },
            hover: {
              rotate: -14,
              boxShadow: `inset -1px 0 1px rgba(255,255,255,0.25), inset 1px 0 2px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.25), 0 0 14px -2px ${CYAN_GLOW}`,
              transition: { duration: 0.28, ease: "easeOut" },
            },
          }}
          aria-hidden
        />

        {/* Interior - visible only when door opens (hover or tap) */}
        <div
          className="absolute left-1/2 top-1/2 z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full transition-opacity duration-300 md:h-32 md:w-32"
          style={{
            opacity: isOpen ? 1 : 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)",
            boxShadow: "inset 0 2px 20px rgba(0,0,0,0.6)",
          }}
          aria-hidden
        >
          <div className="absolute inset-1 flex flex-col rounded-full md:inset-1.5">
            <span className="mb-0.5 flex items-center justify-center gap-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#22d3ee]/95 md:text-[9px]">
              <span aria-hidden>₿</span> BTC/USD
            </span>
            <svg
              viewBox="0 0 100 52"
              className="h-full w-full flex-1 min-h-0"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* Grid lines */}
              <line x1="0" y1="13" x2="100" y2="13" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              <line x1="0" y1="26" x2="100" y2="26" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              <line x1="0" y1="39" x2="100" y2="39" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              {/* Price line - volatile uptrend */}
              <path
                d="M0,42 Q8,38 16,35 T32,28 T48,22 T56,26 T64,18 T80,12 T100,8"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />
              <path
                d="M0,42 Q8,38 16,35 T32,28 T48,22 T56,26 T64,18 T80,12 T100,8 L100,52 L0,52 Z"
                fill="url(#vault-chart-gradient)"
                stroke="none"
                opacity="0.25"
              />
              <defs>
                <linearGradient id="vault-chart-gradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Central circular door - steel disc, opens on hover (hinge on left) */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-32 md:w-32"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 32% 28%, ${STEEL_HI} 0%, ${STEEL} 18%, ${STEEL_MID} 42%, ${STEEL_DARK} 70%, ${STEEL_SHADOW} 100%)`,
            boxShadow: `
              inset 4px 4px 10px rgba(255,255,255,0.18),
              inset -5px -5px 20px rgba(0,0,0,0.7),
              inset 0 10px 32px rgba(0,0,0,0.5),
              0 0 0 1px rgba(255,255,255,0.3),
              0 0 0 2px rgba(34, 211, 238, 0.08),
              0 0 30px -10px ${CYAN_GLOW}
            `,
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
          }}
          variants={{
            rest: {
              rotateY: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            },
            hover: {
              rotateY: -78,
              boxShadow: `
                inset 4px 4px 10px rgba(255,255,255,0.2),
                inset -5px -5px 20px rgba(0,0,0,0.65),
                inset 0 10px 32px rgba(0,0,0,0.45),
                0 0 0 1px rgba(255,255,255,0.35),
                0 0 0 2px rgba(34, 211, 238, 0.2),
                0 0 38px -8px ${CYAN_GLOW}
              `,
              transition: { duration: 0.45, delay: 0.4, ease: "easeOut" },
            },
          }}
        >
          {/* Specular sweep + brushed metal texture for extra realism */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 22%, transparent 45%, rgba(0,0,0,0.08) 70%, transparent 100%), repeating-linear-gradient(20deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)",
              mixBlendMode: "overlay",
              opacity: 0.85,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[8%] rounded-full"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 0 22px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.35)",
              opacity: 0.95,
            }}
            aria-hidden
          />
          {/* Horizontal bolt - steel bar, rotates with wheel (unlock) */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-1 w-full -translate-x-1/2 -translate-y-1/2 md:h-1.5"
            style={{
              background: `linear-gradient(180deg, ${STEEL} 0%, ${STEEL_MID} 25%, ${STEEL_SHADOW} 50%, ${STEEL_MID} 75%, ${STEEL} 100%)`,
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.4), 0 0 10px -2px rgba(34, 211, 238, 0.3)",
              transformOrigin: "center center",
            }}
            variants={{
              rest: { rotate: 0, transition: { duration: 0.35, ease: "easeOut" } },
              hover: { rotate: 90, transition: { duration: 0.35, ease: "easeOut" } },
            }}
            aria-hidden
          />

          {/* Central locking wheel - recessed steel dial, twists on hover (unlock) */}
          <motion.div
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              width: "52%",
              height: "52%",
              background: `radial-gradient(circle at 38% 38%, ${STEEL_HI} 0%, ${STEEL} 18%, ${STEEL_MID} 40%, ${STEEL_DARK} 68%, ${STEEL_SHADOW} 100%)`,
              boxShadow: `
                inset 3px 3px 8px rgba(255,255,255,0.15),
                inset -4px -4px 14px rgba(0,0,0,0.7),
                inset 0 6px 20px rgba(0,0,0,0.5),
                0 0 0 1px rgba(34, 211, 238, 0.3),
                0 0 24px -6px ${CYAN_GLOW}
              `,
              transformOrigin: "center center",
            }}
            variants={{
              rest: { rotate: 0, transition: { duration: 0.35, ease: "easeOut" } },
              hover: {
                rotate: 90,
                boxShadow: `
                  inset 3px 3px 8px rgba(255,255,255,0.18),
                  inset -4px -4px 14px rgba(0,0,0,0.65),
                  inset 0 6px 20px rgba(0,0,0,0.45),
                  0 0 0 1px rgba(34, 211, 238, 0.42),
                  0 0 30px -6px ${CYAN_GLOW}
                `,
                scale: 1.03,
                transition: { duration: 0.35, ease: "easeOut" },
              },
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full"
              aria-hidden
            >
              {/* 8 spokes */}
              {Array.from({ length: 8 }, (_, i) => {
                const a = (i / 8) * 2 * Math.PI - Math.PI / 2;
                const r = 42;
                const x1 = 50 + 8 * Math.cos(a);
                const y1 = 50 + 8 * Math.sin(a);
                const x2 = 50 + r * Math.cos(a);
                const y2 = 50 + r * Math.sin(a);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={CYAN}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* Center hub - steel */}
              <circle cx="50" cy="50" r="10" fill={STEEL_SHADOW} stroke={CYAN} strokeWidth="1.5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Bolts on frame - textured dome heads with beveled rim */}
        {[
          [12, 18], [12, 50], [12, 82],
          [88, 22], [88, 50], [88, 78],
          [50, 8], [50, 92],
        ].map(([x, y], i) => (
          <div
            key={i}
            className="absolute flex h-2.5 w-2.5 items-center justify-center rounded-full md:h-3 md:w-3"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          >
            {/* Outer beveled ring - bolt head edge */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(145deg, ${BOLT_RIM} 0%, ${STEEL_DARK} 50%, ${BOLT_RIM_SHADOW} 100%)`,
                boxShadow: `
                  inset 1px 1px 2px rgba(255,255,255,0.35),
                  inset -1px -1px 2px rgba(0,0,0,0.5),
                  0 1px 3px rgba(0,0,0,0.6)
                `,
              }}
            />
            {/* Inner domed center - raised cap */}
            <div
              className="rounded-full"
              style={{
                width: "62%",
                height: "62%",
                background: `radial-gradient(circle at 28% 28%, ${RIVET_HI} 0%, ${RIVET} 35%, ${STEEL_MID} 65%, ${RIVET_SHADOW} 100%)`,
                boxShadow: `
                  inset 1px 1px 2px rgba(255,255,255,0.6),
                  inset -1px -1px 2px rgba(0,0,0,0.45),
                  0 0 0 1px rgba(0,0,0,0.2)
                `,
              }}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
