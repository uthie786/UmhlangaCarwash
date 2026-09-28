"use client";

/**
 * Umhlanga Car Wash & Valet — single-page landing component
 * Drop into: app/page.tsx  (or import from app/page.tsx)
 * Deps:      npm i framer-motion lucide-react
 */

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Droplets,
  Sparkles,
  Armchair,
  KeyRound,
  MapPin,
  Clock,
  Phone,
  Check,
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
  Car,
  Truck,
  ChevronsLeftRight,
} from "lucide-react";

// Fonts load from Google Fonts via the <style> tag in the page root,
// so this works in any React environment (no next/font needed).
const display = { className: "font-display" };
const body = { className: "font-body" };
const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
.font-display { font-family: 'Barlow Condensed', 'Arial Narrow', system-ui, sans-serif; }
.font-body { font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif; }
/* Floating WhatsApp button: round icon on phones, roomy pill from 640px up */
.wa-fab { right: 20px; bottom: calc(20px + env(safe-area-inset-bottom, 0px)); width: 60px; height: 60px; padding: 0; gap: 0;
  background-color: #25D366; box-shadow: 0 8px 24px rgba(0,0,0,0.45), 0 0 24px -4px rgba(37,211,102,0.7); }
.wa-fab-pulse { background-color: rgba(37,211,102,0.35); }
.wa-fab-icon { width: 30px; height: 30px; }
.wa-fab-label { display: none; }
@media (min-width: 640px) {
  .wa-fab { width: auto; height: 60px; padding: 0 28px 0 22px; gap: 12px; font-size: 16px; letter-spacing: 0.01em; }
  .wa-fab-icon { width: 26px; height: 26px; }
  .wa-fab-label { display: inline; white-space: nowrap; }
}
/* Plain-CSS fallbacks for Tailwind arbitrary values, so the page also renders
   in environments without the Tailwind JIT (e.g. the Claude preview). */
.aspect-\\[16\\/10\\]{aspect-ratio:16 / 10}
.aspect-\\[4\\/3\\]{aspect-ratio:4 / 3}
.backdrop-blur-\\[2px\\]{backdrop-filter:blur(2px)}
.bg-\\[\\#09090B\\]{background-color:#09090B}
.bg-\\[\\#09090B\\]\\/75{background-color:rgba(9,9,11,0.75)}
.bg-\\[\\#121214\\]{background-color:#121214}
.bg-\\[\\#25D366\\]{background-color:#25D366}
.bg-\\[\\#25D366\\]\\/40{background-color:rgba(37,211,102,0.4)}
.bg-\\[\\#a8a29e\\]\\/25{background-color:rgba(168,162,158,0.25)}
.bg-\\[linear-gradient\\(160deg\\,\\#8b4b47_0\\%\\,\\#6b3a37_50\\%\\,\\#4a2c2a_100\\%\\)\\]{background-image:linear-gradient(160deg,#8b4b47 0%,#6b3a37 50%,#4a2c2a 100%)}
.bg-\\[radial-gradient\\(120\\%_80\\%_at_30\\%_20\\%\\,\\#f87171_0\\%\\,\\#DC2626_35\\%\\,\\#7f1d1d_75\\%\\,\\#450a0a_100\\%\\)\\]{background-image:radial-gradient(120% 80% at 30% 20%,#f87171 0%,#DC2626 35%,#7f1d1d 75%,#450a0a 100%)}
.bg-\\[radial-gradient\\(60\\%_80\\%_at_50\\%_100\\%\\,rgba\\(220\\,38\\,38\\,0\\.35\\)\\,transparent\\)\\]{background-image:radial-gradient(60% 80% at 50% 100%,rgba(220,38,38,0.35),transparent)}
.bg-\\[radial-gradient\\(closest-side\\,rgba\\(220\\,38\\,38\\,0\\.18\\)\\,transparent\\)\\]{background-image:radial-gradient(closest-side,rgba(220,38,38,0.18),transparent)}
.bg-\\[radial-gradient\\(closest-side\\,rgba\\(220\\,38\\,38\\,0\\.28\\)\\,transparent\\)\\]{background-image:radial-gradient(closest-side,rgba(220,38,38,0.28),transparent)}
.bg-white\\/\\[0\\.03\\]{background-color:rgba(255,255,255,0.03)}
.blur-\\[1px\\]{filter:blur(1px)}
.drop-shadow-\\[0_0_12px_rgba\\(220\\,38\\,38\\,0\\.9\\)\\]{filter:drop-shadow(0 0 12px rgba(220,38,38,0.9))}
.drop-shadow-\\[0_20px_30px_rgba\\(0\\,0\\,0\\,0\\.6\\)\\]{filter:drop-shadow(0 20px 30px rgba(0,0,0,0.6))}
.focus-visible\\:ring-offset-\\[\\#09090B\\]:focus-visible{--tw-ring-offset-color:#09090B}
.h-\\[140\\%\\]{height:140%}
.h-\\[2px\\]{height:2px}
.h-\\[40rem\\]{height:40rem}
.hover\\:bg-white\\/\\[0\\.05\\]:hover{background-color:rgba(255,255,255,0.05)}
.hover\\:shadow-\\[0_0_36px_0_rgba\\(220\\,38\\,38\\,0\\.9\\)\\]:hover{box-shadow:0 0 36px 0 rgba(220,38,38,0.9)}
.hover\\:shadow-\\[0_0_40px_-12px_rgba\\(220\\,38\\,38\\,0\\.6\\)\\]:hover{box-shadow:0 0 40px -12px rgba(220,38,38,0.6)}
.hover\\:shadow-\\[0_0_40px_-16px_rgba\\(255\\,255\\,255\\,0\\.5\\)\\]:hover{box-shadow:0 0 40px -16px rgba(255,255,255,0.5)}
.invert-\\[0\\.9\\]{filter:grayscale(1) invert(0.9) hue-rotate(180deg) contrast(0.9)}
.leading-\\[0\\.92\\]{line-height:0.92}
.max-w-\\[10rem\\]{max-width:10rem}
.min-h-\\[360px\\]{min-height:360px}
.min-h-\\[52px\\]{min-height:52px}
.min-h-\\[56px\\]{min-height:56px}
.opacity-\\[0\\.12\\]{opacity:0.12}
.shadow-\\[0_0_0_4px_rgba\\(220\\,38\\,38\\,0\\.25\\)\\,0_0_60px_-10px_rgba\\(220\\,38\\,38\\,0\\.8\\)\\]{box-shadow:0 0 0 4px rgba(220,38,38,0.25),0 0 60px -10px rgba(220,38,38,0.8)}
.shadow-\\[0_0_0_4px_rgba\\(220\\,38\\,38\\,0\\.35\\)\\,0_10px_30px_rgba\\(0\\,0\\,0\\,0\\.5\\)\\]{box-shadow:0 0 0 4px rgba(220,38,38,0.35),0 10px 30px rgba(0,0,0,0.5)}
.shadow-\\[0_0_12px_3px_rgba\\(220\\,38\\,38\\,0\\.9\\)\\,0_0_40px_8px_rgba\\(220\\,38\\,38\\,0\\.5\\)\\]{box-shadow:0 0 12px 3px rgba(220,38,38,0.9),0 0 40px 8px rgba(220,38,38,0.5)}
.shadow-\\[0_0_14px_2px_rgba\\(255\\,255\\,255\\,0\\.7\\)\\]{box-shadow:0 0 14px 2px rgba(255,255,255,0.7)}
.shadow-\\[0_0_18px_-4px_rgba\\(52\\,211\\,153\\,0\\.6\\)\\]{box-shadow:0 0 18px -4px rgba(52,211,153,0.6)}
.shadow-\\[0_0_20px_rgba\\(220\\,38\\,38\\,0\\.6\\)\\]{box-shadow:0 0 20px rgba(220,38,38,0.6)}
.shadow-\\[0_0_20px_rgba\\(220\\,38\\,38\\,0\\.7\\)\\]{box-shadow:0 0 20px rgba(220,38,38,0.7)}
.shadow-\\[0_0_24px_-2px_rgba\\(220\\,38\\,38\\,0\\.8\\)\\]{box-shadow:0 0 24px -2px rgba(220,38,38,0.8)}
.shadow-\\[0_0_24px_rgba\\(220\\,38\\,38\\,0\\.8\\)\\]{box-shadow:0 0 24px rgba(220,38,38,0.8)}
.shadow-\\[0_0_30px_-4px_rgba\\(220\\,38\\,38\\,0\\.8\\)\\]{box-shadow:0 0 30px -4px rgba(220,38,38,0.8)}
.shadow-\\[0_0_40px_-4px_rgba\\(220\\,38\\,38\\,0\\.9\\)\\]{box-shadow:0 0 40px -4px rgba(220,38,38,0.9)}
.shadow-\\[0_0_60px_-20px_rgba\\(220\\,38\\,38\\,0\\.7\\)\\]{box-shadow:0 0 60px -20px rgba(220,38,38,0.7)}
.shadow-\\[0_0_60px_-24px_rgba\\(220\\,38\\,38\\,0\\.8\\)\\]{box-shadow:0 0 60px -24px rgba(220,38,38,0.8)}
.shadow-\\[1px_2px_2px_rgba\\(0\\,0\\,0\\,0\\.35\\)\\]{box-shadow:1px 2px 2px rgba(0,0,0,0.35)}
.shadow-\\[inset_0_0_20px_rgba\\(220\\,38\\,38\\,0\\.25\\)\\]{box-shadow:inset 0 0 20px rgba(220,38,38,0.25)}
.text-\\[11px\\]{font-size:11px}
.top-\\[18\\%\\]{top:18%}
.w-\\[140\\%\\]{width:140%}
.w-\\[150\\%\\]{width:150%}
.w-\\[40rem\\]{width:40rem}
.w-\\[50rem\\]{width:50rem}
.w-\\[60rem\\]{width:60rem}
@media (min-width:640px){.sm\\:aspect-\\[16\\/9\\]{aspect-ratio:16 / 9}}
@media (min-width:1024px){.lg\\:grid-cols-\\[0\\.8fr_1\\.2fr\\]{grid-template-columns:minmax(0,0.8fr) minmax(0,1.2fr)}}
@media (min-width:1024px){.lg\\:grid-cols-\\[1\\.4fr_1fr\\]{grid-template-columns:minmax(0,1.4fr) minmax(0,1fr)}}
@media (min-width:1024px){.lg\\:grid-cols-\\[1fr_1\\.1fr\\]{grid-template-columns:minmax(0,1fr) minmax(0,1.1fr)}}
@media (min-width:1024px){.lg\\:grid-cols-\\[1fr_1\\.3fr\\]{grid-template-columns:minmax(0,1fr) minmax(0,1.3fr)}}
`;

/* ---------------------------------- DATA ---------------------------------- */

const WA_NUMBER = "27824167891";
const WA_DEFAULT =
  "https://wa.me/27824167891?text=Hi%20Umhlanga%20Car%20Wash,%20I'd%20like%20to%20book%20a%20wash";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const OPEN_HOUR = 7.5; // 07:30
const CLOSE_HOUR = 17.5; // 17:30

type Tier = {
  id: string;
  name: string;
  price: number;
  plus?: boolean;
  duration: string;
  blurb: string;
  features: string[];
  tags: string[];
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "express",
    name: "Express Wash & Dry",
    price: 120,
    duration: "20 min",
    blurb: "A fast, spot-free exterior clean for the daily drive.",
    features: ["Snow foam pre-soak", "High-pressure rinse", "De-ionized final rinse", "Microfiber hand dry", "Tyre shine"],
    tags: ["Spot-free", "Quick turnaround"],
  },
  {
    id: "executive",
    name: "Executive Wash & Interior Vacuum",
    price: 250,
    duration: "45 min",
    blurb: "Everything in Express, plus a full cabin refresh.",
    features: [
      "Everything in Express",
      "Full interior vacuum",
      "Dashboard & console wipe-down",
      "Interior & exterior glass",
      "Door jambs & sills",
      "Air freshener",
    ],
    tags: ["Inside & out", "Best value"],
    popular: true,
  },
  {
    id: "ceramic",
    name: "Full Valet & Ceramic Gloss Polish",
    price: 850,
    plus: true,
    duration: "3–4 hrs",
    blurb: "Showroom finish with a ceramic layer that keeps beading for months.",
    features: [
      "Everything in Executive",
      "Clay bar decontamination",
      "Machine gloss polish",
      "Ceramic sealant coat",
      "Leather clean & condition",
      "Engine bay dress",
    ],
    tags: ["Ceramic protection", "Leather care"],
  },
];

const SIZES = [
  { id: "hatch", label: "Hatch / Sedan", factor: 1, icon: Car },
  { id: "suv", label: "SUV / Bakkie", factor: 1.2, icon: Truck },
  { id: "large", label: "7-Seater / Van", factor: 1.4, icon: Truck },
];

const ADDONS = [
  { id: "pickup", label: "Drop-off & pick-up", price: 100 },
  { id: "headlight", label: "Headlight restoration", price: 180 },
  { id: "rims", label: "Deep rim & caliper clean", price: 90 },
  { id: "pet", label: "Pet hair removal", price: 120 },
];

const FEATURES = [
  {
    icon: Droplets,
    title: "De-ionized water wash",
    text: "Our final rinse is filtered of minerals, so water evaporates without leaving spots or streaks. No chamois drag across your paint.",
    stat: "0 ppm",
    statLabel: "dissolved solids on the final rinse",
  },
  {
    icon: Sparkles,
    title: "Snow foam, then microfiber",
    text: "A thick foam lifts grit off the panels before anything touches them. Then two-bucket hand washing with fresh microfiber per car.",
    stat: "2-bucket",
    statLabel: "method on every vehicle",
  },
  {
    icon: Armchair,
    title: "Executive interior & leather care",
    text: "pH-neutral cleaners for leather, steam for fabric, and detail brushes for the vents and seams that a vacuum can't reach.",
    stat: "pH 7",
    statLabel: "leather-safe cleaners",
  },
  {
    icon: KeyRound,
    title: "Drop-off & pick-up",
    text: "Working in Umhlanga Ridge or Gateway? Leave us the keys. We collect, wash and return your car before your last meeting ends.",
    stat: "5 km",
    statLabel: "collection radius",
  },
];

/* --------------------------------- HELPERS -------------------------------- */

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

function useShopStatus() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const check = () => {
      // Always evaluate in South African time, whatever the visitor's timezone.
      const sa = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));
      const h = sa.getHours() + sa.getMinutes() / 60;
      const day = sa.getDay(); // 0 = Sunday
      const close = day === 0 ? 13 : CLOSE_HOUR;
      setOpen(h >= OPEN_HOUR && h < close);
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return open;
}

/* ------------------------------- SUB-VIEWS -------------------------------- */

function StatusBadge() {
  const open = useShopStatus();
  return (
    <div
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${
        open
          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_18px_-4px_rgba(52,211,153,0.6)]"
          : "border-zinc-600 bg-zinc-800/60 text-zinc-300"
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2.5 w-2.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-400" : "bg-zinc-500"}`} />
      </span>
      <span>{open ? "Live Status: Open" : "Closed"}</span>
    </div>
  );
}

function SportsCar({ className = "" }: { className?: string }) {
  // Generic coupe silhouette drawn in SVG — swap for your own photo if preferred.
  return (
    <svg viewBox="0 0 800 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f4f5" />
          <stop offset="0.45" stopColor="#a1a1aa" />
          <stop offset="1" stopColor="#27272a" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f3f46" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
        <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="262" rx="360" ry="22" fill="url(#shadow)" />
      <path
        d="M60 220 C60 190 90 176 140 170 L250 160 C300 118 360 92 440 90 C520 88 580 110 640 150 L710 162 C745 168 760 188 758 214 L752 232 L60 234 Z"
        fill="url(#body)"
      />
      <path d="M270 158 C315 122 365 104 435 102 C500 101 550 118 596 152 Z" fill="url(#glass)" />
      <path d="M430 104 L440 156" stroke="#18181b" strokeWidth="6" />
      <path d="M90 196 L740 196" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M150 176 C300 160 520 158 700 172" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" fill="none" />
      <path d="M708 176 L752 186 L748 198 L714 194 Z" fill="#fca5a5" />
      <path d="M64 196 L96 192 L96 206 L66 208 Z" fill="#DC2626" />
      {[190, 610].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="228" r="44" fill="#09090b" />
          <circle cx={cx} cy="228" r="30" fill="#3f3f46" stroke="#a1a1aa" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map((a) => (
            <line
              key={a}
              x1={cx}
              y1="228"
              x2={cx + 26 * Math.cos((a * Math.PI) / 180)}
              y2={228 + 26 * Math.sin((a * Math.PI) / 180)}
              stroke="#d4d4d8"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
          <circle cx={cx} cy="228" r="7" fill="#DC2626" />
        </g>
      ))}
    </svg>
  );
}

function LaserScanStage() {
  const reduce = useReducedMotion();
  const DURATION = 3.6;
  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-3xl border border-red-500/30 bg-[#121214] shadow-[0_0_60px_-20px_rgba(220,38,38,0.7)]">
      {/* HUD grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-red-600/15 to-transparent" />

      {/* Car */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-6">
        <SportsCar className="w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Foam trail + laser line, sweeping top to bottom */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          initial={{ y: "-35%" }}
          animate={{ y: "100%" }}
          transition={{ duration: DURATION, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        >
          <div className="absolute inset-x-0 -top-28 h-28 bg-gradient-to-b from-transparent via-white/10 to-white/35 backdrop-blur-[2px]" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-red-500 shadow-[0_0_12px_3px_rgba(220,38,38,0.9),0_0_40px_8px_rgba(220,38,38,0.5)]" />
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-red-500/30 to-transparent" />
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute -top-2 h-2 w-2 rounded-full bg-white/70"
              style={{ left: `${6 + rand(i) * 88}%`, transform: `scale(${0.5 + rand(i + 20)})` }}
            />
          ))}
        </motion.div>
      )}

      {/* HUD corners and readout */}
      {["top-3 left-3 border-l-2 border-t-2", "top-3 right-3 border-r-2 border-t-2", "bottom-3 left-3 border-l-2 border-b-2", "bottom-3 right-3 border-r-2 border-b-2"].map(
        (c) => (
          <span key={c} className={`absolute h-6 w-6 border-red-500 ${c}`} />
        )
      )}
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-md bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-red-300 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        Foam pass in progress
      </div>
      <div className="absolute bottom-5 right-5 rounded-md bg-black/50 px-2.5 py-1 text-[11px] text-zinc-300 backdrop-blur">
        Ceramic layer: <span className="font-semibold text-white">bonding</span>
      </div>
    </div>
  );
}

function GlossSlider() {
  const [pos, setPos] = useState(50);
  const grime = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        x: rand(i) * 100,
        y: rand(i + 300) * 100,
        r: 2 + rand(i + 600) * 9,
        o: 0.15 + rand(i + 900) * 0.45,
      })),
    []
  );
  const beads = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        x: rand(i + 50) * 100,
        y: rand(i + 350) * 100,
        r: 3 + rand(i + 650) * 8,
      })),
    []
  );

  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-white/10 sm:aspect-[16/9]">
      {/* AFTER: glossy red paint with ceramic water beading */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_20%,#f87171_0%,#DC2626_35%,#7f1d1d_75%,#450a0a_100%)]">
        <div className="absolute -left-1/4 top-[18%] h-24 w-[150%] -rotate-6 bg-gradient-to-b from-white/0 via-white/40 to-white/0 blur-md" />
        {beads.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-white/90 via-red-200/30 to-red-900/40 shadow-[1px_2px_2px_rgba(0,0,0,0.35)]"
            style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.r * 2, height: b.r * 2 }}
          />
        ))}
        <span className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-900">After ceramic</span>
      </div>

      {/* BEFORE: dull, oxidised, dusty */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#8b4b47_0%,#6b3a37_50%,#4a2c2a_100%)] saturate-50" />
        <div className="absolute inset-0 bg-[#a8a29e]/25 mix-blend-overlay" />
        {grime.map((g, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-stone-700 blur-[1px]"
            style={{ left: `${g.x}%`, top: `${g.y}%`, width: g.r * 2, height: g.r, opacity: g.o }}
          />
        ))}
        <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-zinc-200">Before</span>
      </div>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow-[0_0_14px_2px_rgba(255,255,255,0.7)]" />
        <div className="absolute top-1/2 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-red-600 text-white shadow-[0_0_24px_rgba(220,38,38,0.8)]">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare paint before and after ceramic polish"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/* --------------------------------- PAGE ----------------------------------- */

export default function UmhlangaCarWashPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tierId, setTierId] = useState("executive");
  const [sizeId, setSizeId] = useState("hatch");
  const [addons, setAddons] = useState<string[]>([]);

  const tier = TIERS.find((t) => t.id === tierId)!;
  const size = SIZES.find((s) => s.id === sizeId)!;
  const addonTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total = Math.round((tier.price * size.factor) / 10) * 10 + addonTotal;

  const quoteMessage = `Hi Umhlanga Car Wash, I'd like to book the ${tier.name} for my ${size.label}${
    addons.length ? ` with ${ADDONS.filter((a) => addons.includes(a.id)).map((a) => a.label.toLowerCase()).join(", ")}` : ""
  }. Estimated R${total}${tier.plus ? "+" : ""}. When is your next open slot?`;

  const toggleAddon = (id: string) => setAddons((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#packages", label: "Packages" },
    { href: "#location", label: "Location" },
    { href: "#contact", label: "Contact" },
  ];

  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]";

  return (
    <div className={`${body.className} min-h-screen overflow-x-hidden bg-[#09090B] text-zinc-100 antialiased`}>
      <style>{FONT_CSS}</style>
      {/* ============================== NAV ============================== */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#09090B]/75 backdrop-blur-xl">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[40rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className={`flex items-center gap-2.5 rounded-lg ${focusRing}`}>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)]">
              {/* Lighthouse mark */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
                <path d="M10 5h4l1 15H9l1-15Zm-1 15h6v2H9v-2Zm1-18h4v2h-4V2Z" />
                <path d="M14.5 7 22 4v5l-7.5-1V7ZM9.5 7 2 4v5l7.5-1V7Z" opacity=".55" />
              </svg>
            </span>
            <span className={`${display.className} text-lg font-bold leading-none tracking-wide sm:text-xl`}>
              Umhlanga Car Wash <span className="text-red-500">&amp;</span> Valet
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={`rounded text-sm font-medium text-zinc-300 transition hover:text-white ${focusRing}`}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <StatusBadge />
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_-2px_rgba(220,38,38,0.8)] transition hover:bg-red-500 hover:shadow-[0_0_36px_0_rgba(220,38,38,0.9)] ${focusRing}`}
            >
              <MessageCircle className="h-4 w-4" />
              Book wash on WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <StatusBadge />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${focusRing}`}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5 md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-medium hover:bg-white/5">
                    {l.label}
                  </a>
                ))}
                <a
                  href={WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold shadow-[0_0_24px_-2px_rgba(220,38,38,0.8)]"
                >
                  <MessageCircle className="h-5 w-5" /> Book wash on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        {/* ============================== HERO ============================== */}
        <section className="relative isolate overflow-hidden">
          {/* Lighthouse beams */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(220,38,38,0.28),transparent)]" />
          <motion.div
            className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[140%] w-[140%] origin-top -translate-x-1/2"
            style={{ background: "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(255,255,255,0.06) 8deg, transparent 16deg, transparent 344deg, rgba(255,255,255,0.06) 352deg, transparent 360deg)" }}
            animate={{ rotate: [-12, 12, -12] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:pb-28 lg:pt-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <h1 className={`${display.className} text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl`}>
                Umhlanga’s premier precision wash &amp; detailing studio
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                Located in the heart of Umhlanga. High-pressure wash, foam baths, ceramic protection, and executive valets.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#packages"
                  className={`inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 font-bold text-zinc-950 transition hover:bg-zinc-200 ${focusRing}`}
                >
                  View packages
                </a>
                <a
                  href={waLink("Hi Umhlanga Car Wash, could I get a quick quote for my car?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-red-500/60 bg-red-600/10 px-7 font-bold text-white shadow-[inset_0_0_20px_rgba(220,38,38,0.25)] transition hover:bg-red-600 ${focusRing}`}
                >
                  <MessageCircle className="h-5 w-5" /> Instant WhatsApp quote
                </a>
              </div>

              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
                {[
                  ["From R120", "Express wash"],
                  ["20 min", "In and out"],
                  ["7 days", "Open weekly"],
                ].map(([v, k]) => (
                  <div key={k}>
                    <dt className="text-xs text-zinc-500">{k}</dt>
                    <dd className={`${display.className} mt-1 text-2xl font-bold`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <LaserScanStage />
            </motion.div>
          </div>
        </section>

        {/* ============================ SERVICES ============================ */}
        <section id="services" className="scroll-mt-20 border-t border-white/5 bg-[#121214] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className={`${display.className} text-4xl font-bold uppercase leading-none sm:text-5xl`}>How we keep your paint perfect</h2>
              <p className="mt-4 text-zinc-400">The methods detailers use on show cars, applied to every wash we do, including the R120 one.</p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-red-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-12px_rgba(220,38,38,0.6)] sm:p-8"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/0 blur-2xl transition duration-500 group-hover:bg-red-600/25" />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/40 bg-red-600/10 text-red-400">
                      <f.icon className="h-6 w-6" />
                    </span>
                    <div className="text-right">
                      <div className={`${display.className} text-2xl font-bold text-white`}>{f.stat}</div>
                      <div className="max-w-[10rem] text-xs text-zinc-500">{f.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="relative mt-6 text-xl font-bold">{f.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-zinc-400">{f.text}</p>
                </div>
              ))}
            </div>

            {/* Before/after gloss slider */}
            <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className={`${display.className} text-3xl font-bold uppercase leading-none sm:text-4xl`}>See what ceramic does</h3>
                <p className="mt-4 leading-relaxed text-zinc-400">
                  Drag the handle across the panel. Oxidised, dusty clear coat on the left. After clay bar, machine polish and our ceramic sealant on the right, where water beads and rolls off instead of sitting on the paint.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  {["Restores depth and gloss to faded paint", "Repels water, salt air and bird droppings", "Makes every wash after it faster"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <ShieldCheck className="h-5 w-5 flex-none text-red-500" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <GlossSlider />
            </div>
          </div>
        </section>

        {/* ============================ PACKAGES ============================ */}
        <section id="packages" className="relative scroll-mt-20 py-20 sm:py-28">
          <div className="pointer-events-none absolute left-1/2 top-40 h-96 w-[50rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(220,38,38,0.18),transparent)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className={`${display.className} text-4xl font-bold uppercase leading-none sm:text-5xl`}>Wash &amp; valet packages</h2>
              <p className="mt-4 text-zinc-400">Pick a package, tell us your vehicle size and add extras. Your price updates as you go and goes straight into your WhatsApp booking.</p>
            </div>

            {/* Tier cards */}
            <div className="mt-12 grid gap-5 lg:grid-cols-3" role="radiogroup" aria-label="Choose a package">
              {TIERS.map((t) => {
                const selected = t.id === tierId;
                return (
                  <button
                    key={t.id}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTierId(t.id)}
                    className={`relative flex flex-col rounded-3xl bg-white p-7 text-left text-zinc-900 transition duration-300 ${focusRing} ${
                      selected
                        ? "ring-2 ring-red-600 shadow-[0_0_0_4px_rgba(220,38,38,0.25),0_0_60px_-10px_rgba(220,38,38,0.8)] lg:-translate-y-2"
                        : "opacity-90 hover:opacity-100 hover:shadow-[0_0_40px_-16px_rgba(255,255,255,0.5)]"
                    } ${t.popular && !selected ? "ring-1 ring-red-600/60" : ""}`}
                  >
                    {t.popular && (
                      <span className="absolute -top-3.5 left-7 rounded-full bg-red-600 px-3.5 py-1 text-xs font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.7)]">
                        Most popular
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={`${display.className} text-2xl font-bold uppercase leading-tight`}>{t.name}</h3>
                      <span
                        className={`mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 ${
                          selected ? "border-red-600 bg-red-600 text-white" : "border-zinc-300"
                        }`}
                      >
                        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600">{t.blurb}</p>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className={`${display.className} text-5xl font-extrabold`}>
                        R{t.price}
                        {t.plus && "+"}
                      </span>
                      <span className="text-sm text-zinc-500">{t.duration}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-6 space-y-2.5 border-t border-zinc-200 pt-6 text-sm">
                      {t.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-red-600" strokeWidth={3} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            {/* Calculator */}
            <div className="mt-10 grid gap-6 rounded-3xl border border-red-500/30 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-8">
                <fieldset>
                  <legend className="text-sm font-semibold text-zinc-300">Vehicle size</legend>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {SIZES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSizeId(s.id)}
                        aria-pressed={sizeId === s.id}
                        className={`flex min-h-[52px] items-center gap-3 rounded-xl border px-4 text-sm font-semibold transition ${focusRing} ${
                          sizeId === s.id ? "border-red-500 bg-red-600/15 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"
                        }`}
                      >
                        <s.icon className="h-5 w-5" /> {s.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-semibold text-zinc-300">Extras</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {ADDONS.map((a) => {
                      const on = addons.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAddon(a.id)}
                          aria-pressed={on}
                          className={`flex min-h-[52px] items-center justify-between gap-3 rounded-xl border px-4 text-left text-sm transition ${focusRing} ${
                            on ? "border-red-500 bg-red-600/15 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border ${on ? "border-red-500 bg-red-600" : "border-zinc-600"}`}>
                              {on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                            </span>
                            {a.label}
                          </span>
                          <span className="font-semibold">+R{a.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-white p-6 text-zinc-900">
                <div>
                  <p className="text-sm text-zinc-500">Your estimate</p>
                  <p className="mt-1 font-semibold">{tier.name}</p>
                  <p className="text-sm text-zinc-500">
                    {size.label}
                    {addons.length > 0 && `, ${addons.length} extra${addons.length > 1 ? "s" : ""}`}
                  </p>
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={total}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`${display.className} mt-4 text-6xl font-extrabold text-red-600`}
                      aria-live="polite"
                    >
                      R{total}
                      {tier.plus && "+"}
                    </motion.p>
                  </AnimatePresence>
                  {tier.plus && <p className="mt-2 text-xs text-zinc-500">Final ceramic price confirmed after a quick paint inspection.</p>}
                </div>
                <a
                  href={waLink(quoteMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-red-600 font-bold text-white shadow-[0_0_30px_-4px_rgba(220,38,38,0.8)] transition hover:bg-red-500 ${focusRing}`}
                >
                  <MessageCircle className="h-5 w-5" /> Book this on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ LOCATION ============================ */}
        <section id="location" className="scroll-mt-20 border-t border-white/5 bg-[#121214] py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
            <div id="contact" className="scroll-mt-24">
              <h2 className={`${display.className} text-4xl font-bold uppercase leading-none sm:text-5xl`}>Find us in Umhlanga</h2>
              <p className="mt-4 text-zinc-400">Minutes from the lighthouse and the promenade. Park in a bay, grab a coffee nearby, and we’ll message you when it’s done.</p>

              <div className="mt-8 space-y-3">
                {[
                  { icon: MapPin, title: "Address", text: "Umhlanga Rocks, Durban, KwaZulu-Natal" },
                  { icon: Clock, title: "Hours", text: "Mon–Sat 07:30–17:30, Sun 07:30–13:00" },
                  { icon: Phone, title: "WhatsApp & calls", text: "+27 82 416 7891", href: "tel:+27824167891" },
                ].map((row) => (
                  <div key={row.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-red-600/15 text-red-400">
                      <row.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm text-zinc-500">{row.title}</p>
                      {row.href ? (
                        <a href={row.href} className={`rounded font-semibold hover:text-red-400 ${focusRing}`}>
                          {row.text}
                        </a>
                      ) : (
                        <p className="font-semibold">{row.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <StatusBadge />
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-red-500/30 shadow-[0_0_60px_-24px_rgba(220,38,38,0.8)]">
              <iframe
                title="Map showing Umhlanga Car Wash & Valet"
                src="https://www.google.com/maps?q=Umhlanga+Rocks,+Durban&z=15&output=embed"
                className="absolute inset-0 h-full w-full grayscale invert-[0.9] hue-rotate-180 contrast-[0.9]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <span className="absolute left-1/2 top-full h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-red-600/40" />
                <MapPin className="relative h-10 w-10 fill-red-600 text-white drop-shadow-[0_0_12px_rgba(220,38,38,0.9)]" />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Umhlanga+Car+Wash+Umhlanga+Rocks"
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute bottom-4 left-4 right-4 flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white font-bold text-zinc-900 shadow-lg sm:left-auto sm:px-6 ${focusRing}`}
              >
                <MapPin className="h-5 w-5 text-red-600" /> Get directions
              </a>
            </div>
          </div>
        </section>

        {/* ============================ FINAL CTA ============================ */}
        <section className="relative overflow-hidden py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(220,38,38,0.35),transparent)]" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className={`${display.className} text-4xl font-extrabold uppercase leading-none sm:text-6xl`}>Your car, spotless by lunch</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">Send us a WhatsApp with your car and preferred time. We reply within minutes during opening hours.</p>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-red-600 px-9 text-lg font-bold shadow-[0_0_40px_-4px_rgba(220,38,38,0.9)] transition hover:bg-red-500 ${focusRing}`}
            >
              <MessageCircle className="h-5 w-5" /> Book wash on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 pb-28 text-center text-sm text-zinc-500 sm:pb-8">
        © {new Date().getFullYear()} Umhlanga Car Wash &amp; Valet. Umhlanga Rocks, KwaZulu-Natal.
      </footer>

      {/* ======================== FLOATING WHATSAPP ======================== */}
      <motion.a
        href={WA_DEFAULT}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a wash on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`wa-fab fixed z-50 flex items-center justify-center rounded-full text-white ${focusRing}`}
              >
        <span className="wa-fab-pulse pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full" />
        <svg viewBox="0 0 24 24" className="wa-fab-icon flex-none fill-white" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.64l6.03-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.36 0-3.03-1.18-5.88-3.33-8.03" />
        </svg>
        <span className="wa-fab-label font-bold">Book now</span>
      </motion.a>
    </div>
  );
}
