// ─── MaxfuelRX.jsx  — Modified with scrollable overlay pages per timeline tab ──
// Drop-in replacement for your existing MaxfuelRX component.
// All imports remain identical to your original; only the overlay system has changed.

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Maxfuel from "./Maxfuel";
import AboutUs from "./Aboutus";
import TermsAndConditions from './TermsAndConditions';
import ContactUs from "./Contactus";
import HeroVideo from "./assets/innovation.mp4";
import HeroVideo1 from "./assets/beerlines2.mp4";
import HeroVideo2 from "./assets/new-engine.mp4";
import HeroVideo3 from "./assets/green-fuel.mp4";
import Video1 from "./assets/climat-4.mp4";
import Video2 from "./assets/climat-5.mp4";
import Video3 from "./assets/climat-6.mp4";
import Team from "./assets/the~team.mp4";
import Droplets from "./assets/droplets.mp4";
import Droplets2 from "./assets/droplets2.mp4";
import Droplets3 from "./assets/droplets1.mp4";
import Theteam from "./assets/the~team.mp4";
import Cheetah from "./assets/cheetah0.jpg";
import D3 from "./assets/D3.jpg";
import sparkImage from "./assets/spark.png";
import theme5 from "./assets/Theme5.jpg";
import FlareFont from "./assets/fonts/02a1216b6c704030-s.p.woff";
import AgrandirFont from "./assets/fonts/161374021bd9bd1d-s.p.woff";
import CaslonFont from "./assets/fonts/2be595c6b136c288-s.p.woff";
import Fontflare from "./assets/fonts/5f17bc9335138f9d-s.p.woff2";
import AgrandFont from "./assets/fonts/991e0bc14bbf4d90-s.p.woff2";
import CasloFont from "./assets/fonts/9ee57a5762846d75-s.p.woff2";
import FlaresFont from "./assets/fonts/a81f89e159e0486f-s.p.woff";
import AgrandirsFont from "./assets/fonts/abff1420e55a5ceb-s.p.woff2";

const TIMELINE_TABS = ["Past", "Present", "Future"];
const NEWSLETTER_BENEFITS = [
  "NEUTRALIZING ACIDS",
  "DECREASING DIESEL BUG GROWTH",
  "LUBRICATING ENGINE COMPONENTS",
  "INCREASING FUEL COMBUSTIBILITY",
];
const CARDS = [
  {
    label: "Past",
    title: "Actively Cleaning the Combustion Process",
    img: null,
  },
  { label: "Present", title: "Increasing Fuel Combustibility", img: null },
  {
    label: "Future",
    title: "Passively Cleaning Exhaust-Related Components",
    img: null,
  },
];
const EVENTS = [
  {
    title: "Neutralizing Acids",
    sub: "MaxFuel RX neutralises harmful acids, protecting engines and extending machinery life.",
    href: "#silverstone",
  },
  {
    title: "Decreasing Diesel Bug Growth",
    sub: "MaxFuel RX prevents diesel bug growth, keeping engines clean, efficient, and lower in emissions.",
    href: "#miami",
  },
  {
    title: "Lubricating Engine Components",
    sub: "MaxFuel RX enhances engine lubrication, reducing wear, maintenance needs, and extending equipment lifespan.",
    href: "#shanghai",
  },
];
const NAV_LINKS = [
  { label: "Distribution", sub: "Story & Experiences", href: "/maxfuel" },
  { label: "About Us", sub: "Expressions", href: "/about-us" },
  { label: "Contact Us", sub: "Sign Up", href: "/contact-us" },
];
const COLORS = {
  black: "#000",
  white: "#fff",
  grey100: "#f7f5f1",
  grey600: "#383838",
  f1GreenDark: "#204338",
  f1LimeGreen: "#c6fd3a",
  f1LimeGreenDark: "#97cb11",
  introBg: "#0c1311",
  introBgTop: "#22473c",
  navSubtitle: "#95cf02",
};
const FONTS = {
  flare: `"ASTON_MARTIN_FLARE", Arial, Helvetica, sans-serif`,
  agrandir: `"AGRANDIR", "Helvetica Neue", Arial, sans-serif`,
  caslon: `"CASLON_DORIC", Arial, Helvetica, sans-serif`,
};
const easeSnappy = "cubic-bezier(0.87, 0, 0.13, 1)";
const easeSmooth = "cubic-bezier(0.45, 0.02, 0.09, 0.98)";
const f1Shadow = "0 0 5.2px 0 rgb(0 0 0/8%), 0 3.335px 3.335px 0 rgb(0 0 0/7%)";

function pushDataLayer(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// ─── Global styles ────────────────────────────────────────────────────────────
// (Keep your @font-face blocks at the top — they're omitted here for brevity
//  but must be present in your actual file.)
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  :root {
    --font-flare:        "ASTON_MARTIN_FLARE", Arial, Helvetica, sans-serif;
    --font-agrandir:     "AGRANDIR", "Helvetica Neue", Arial, sans-serif;
    --font-caslon-doric: "CASLON_DORIC", Arial, sans-serif;
    --color-black:            #000;
    --color-white:            #fff;
    --color-grey-100:         #f7f5f1;
    --color-grey-600:         #383838;
    --color-f1-green-dark:    #204338;
    --color-f1-lime-green:    #c6fd3a;
    --color-f1-lime-green-darker: #97cb11;
    --easing-snappy:   cubic-bezier(0.87, 0, 0.13, 1);
    --easing-smooth:   cubic-bezier(0.45, 0.02, 0.09, 0.98);
    --f1-shadow:       0 0 5.2px 0 rgb(0 0 0/8%), 0 3.335px 3.335px 0 rgb(0 0 0/7%);
    --border-radius-1x: 0.125rem;
    --border-radius-2x: 0.1875rem;
    --page-margin:      1.5rem;
    --nav-height:       4rem;
    --z-nav:            6;
    --z-timeline-nav:   5;
    --z-footer:         3;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body, html { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }
 
  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-0.35rem); }
  }
  @keyframes benefitSwap {
    0%   { opacity: 0; transform: translateY(0.4rem); }
    15%  { opacity: 1; transform: translateY(0); }
    85%  { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-0.4rem); }
  }
  @keyframes overlaySlideUp {
    from { opacity: 0; transform: translateY(3rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes overlayFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  .am-scroll-arrow { animation: bounce 2s infinite; transition: scale 0.2s ease; }
  .am-scroll-arrow:hover { scale: 1.2; animation-play-state: paused; }
  .am-benefit { animation: benefitSwap 2.2s ease forwards; }
 
  .am-btn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 2.125rem; padding: 0.75rem 2rem 0.69rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.065rem;
    cursor: pointer; border: none; border-radius: 0.1875rem;
    transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
  }
  .am-btn-dark  { color: #fff; background: #000; }
  .am-btn-dark:hover  { background: rgba(0,0,0,0.6); }
  .am-btn-dark:active { background: rgba(0,0,0,0.6); transform: scale(0.97); }
  .am-btn-light { color: #fff; background: rgba(255,255,255,0.2); }
  .am-btn-light:hover  { background: rgba(255,255,255,0.5); }
  .am-btn-light:active { background: rgba(255,255,255,0.5); transform: scale(0.97); }
 
  .am-tag {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.38rem 1rem 0.31rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0313rem;
    border-radius: 0.1875rem;
  }
  .am-tag-green { color: var(--color-f1-lime-green); border: 1px solid var(--color-f1-lime-green); }
  .am-tag-light { color: #fff; border: 1px solid #fff; }
 
  .am-footer-link { opacity: 1; transition: opacity 0.15s var(--easing-smooth); }
  .am-footer-link:hover { opacity: 0.6; }
  .am-card-link .am-card-subtitle,
  .am-card-link .am-card-title { transition: color 0.3s ease-in-out; }
  .am-card-link:hover .am-card-subtitle,
  .am-card-link:hover .am-card-title { color: var(--color-f1-lime-green-darker) !important; }
  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }
 
  .am-timeline-nav-pill { opacity: 0; visibility: hidden; }
  .am-timeline-item {
    font-family: var(--font-flare); font-size: 0.75rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0225rem;
  }
  .am-timeline-bar {
    position: absolute; top: 0.21rem; left: 0.21rem;
    width: 5rem; height: calc(100% - 0.42rem);
    background: var(--color-f1-green-dark);
    border-radius: var(--border-radius-1x);
    z-index: 0; pointer-events: none;
    will-change: transform, width;
  }
 
  .am-slider {
    display: flex; overflow: scroll hidden;
    -ms-overflow-style: none; scrollbar-width: none;
    user-select: none; max-width: 100vw;
  }
  .am-slider::-webkit-scrollbar { display: none; }
  .am-slider.is-dragging { cursor: grabbing; }
 
  #homepage-transition-asset {
    position: relative; overflow: hidden;
    width: 100%; height: calc(100vh - 5rem);
  }
  #homepage-transition-asset-mask {
    position: absolute; inset: 0;
    transform: scale(1.12); transform-origin: center center; will-change: transform;
  }
  #homepage-transition-asset-image-container {
    position: absolute; inset: 0;
    transform: scale(1.08); transform-origin: center center; will-change: transform;
  }
 
  @media only screen and (max-width: 767px) { .am-hide-mobile  { display: none !important; } }
  @media only screen and (min-width: 768px) { .am-hide-desktop { display: none !important; } }
  @media (max-width: 767px) {
    .hero-fit-text {
      white-space: normal !important; font-size: 14vw !important;
      text-align: center; line-height: 1 !important;
    }
  }
 
  .am-card-slide {
    flex-shrink: 0; width: calc(100vw - 3rem); cursor: pointer;
  }
  @media (min-width: 768px) { .am-card-slide { width: 27.5vw; } }
  .am-card-slider-track { gap: 1.5rem; }
  @media (min-width: 768px) { .am-card-slider-track { gap: 10.63vw; } }
 
  /* ── OVERLAY PAGE STYLES ── */
  .tab-overlay {
    position: fixed; inset: 0; z-index: 9000;
    overflow-y: auto; overflow-x: hidden;
    background: #000;
    animation: overlayFadeIn 0.45s var(--easing-smooth) both;
  }
  .tab-overlay-hero {
    position: relative; width: 100%; height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    overflow: hidden;
  }
  .tab-overlay-hero video {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; display: block; z-index: 0;
  }
  .tab-overlay-hero img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; display: block; z-index: 0;
  }
  .tab-overlay-hero-scrim {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0.15) 0%,
      rgba(12,19,17,0.55) 50%,
      rgba(12,19,17,0.92) 100%
    );
  }
  .tab-overlay-hero-content {
    position: relative; z-index: 2;
    padding: 0 1.5rem 4rem;
    animation: overlaySlideUp 0.7s 0.15s var(--easing-smooth) both;
  }
  .tab-overlay-body {
    position: relative; z-index: 2;
    background: #fff;
    animation: overlayFadeIn 0.5s 0.3s var(--easing-smooth) both;
  }
  .tab-overlay-close {
    position: fixed; top: 1rem; right: 1.25rem; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    width: 2.5rem; height: 2.5rem;
    background: rgba(255,255,255,0.95);
    border: none; border-radius: 50%;
    cursor: pointer; box-shadow: ${f1Shadow};
    transition: transform 0.2s ease, background 0.2s ease;
    font-size: 1.1rem; line-height: 1;
  }
  .tab-overlay-close:hover { transform: scale(1.1); background: #fff; }
 
  .scroll-hint {
    position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
    animation: bounce 2s infinite;
    color: var(--color-f1-lime-green);
    font-family: var(--font-agrandir);
    font-size: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase;
  }
 
  /* content sections inside overlays */
  .ol-section {
    padding: 5rem 1.5rem;
    border-bottom: 1px solid rgba(32,67,56,0.12);
  }
  .ol-section:last-child { border-bottom: none; }
  .ol-section-inner {
    max-width: 56rem;
    margin: 0 auto;
  }
  .ol-label {
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    letter-spacing: 0.0625rem; text-transform: uppercase;
    color: var(--color-f1-lime-green-darker); margin-bottom: 0.75rem;
    text-align: center;
  }
  .ol-heading {
    font-family: var(--font-flare); font-size: clamp(1.75rem, 4.5vw, 3.5rem);
    font-weight: 400; line-height: 1.05; text-transform: uppercase;
    color: var(--color-f1-green-dark); margin: 0 0 1.5rem;
    text-align: center;
  }
  .ol-body {
    font-family: var(--font-caslon-doric, var(--font-flare));
    font-size: 0.875rem; line-height: 1.7; color: #444;
    max-width: 60ch; margin-left: auto; margin-right: auto;
    text-align: center;
  }
  .ol-stat-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: 2rem; margin-top: 3rem;
    max-width: 56rem; margin-left: auto; margin-right: auto;
    text-align: center;
  }
  .ol-stat-number {
    font-family: var(--font-flare); font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--color-f1-lime-green-darker); line-height: 1;
    text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .ol-stat-label {
    font-family: var(--font-agrandir); font-size: 0.625rem; letter-spacing: 0.05rem;
    text-transform: uppercase; color: var(--color-f1-green-dark);
  }
  .ol-video-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1.5rem; margin-top: 2.5rem;
    max-width: 56rem; margin-left: auto; margin-right: auto;
  }
  .ol-video-cell {
    position: relative; aspect-ratio: 3/4; overflow: hidden;
    background: var(--color-f1-green-dark);
  }
  .ol-video-cell video {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .ol-video-cell-scrim {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(180deg, transparent 50%, rgba(12,19,17,0.85) 100%);
  }
  .ol-video-label {
    position: absolute; bottom: 1rem; left: 1rem; z-index: 2;
    font-family: var(--font-flare); font-size: 0.875rem; color: #fff;
    text-transform: uppercase;
  }
  .ol-dark-section {
    background: var(--color-f1-green-dark); color: #fff;
  }
  .ol-dark-section .ol-heading { color: var(--color-f1-lime-green); }
  .ol-dark-section .ol-body    { color: rgba(255,255,255,0.8); }
  .ol-dark-section .ol-stat-label { color: rgba(255,255,255,0.7); }
  .ol-pill-list {
    display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem;
    justify-content: center; max-width: 56rem; margin-left: auto; margin-right: auto;
  }
  .ol-pill {
    font-family: var(--font-agrandir); font-size: 0.625rem; letter-spacing: 0.05rem;
    text-transform: uppercase; padding: 0.5rem 1.25rem;
    border: 1px solid var(--color-f1-lime-green); color: var(--color-f1-lime-green);
    border-radius: 2rem;
  }
  .ol-timeline-row {
    display: flex; gap: 1.5rem; margin-top: 2rem;
    flex-direction: column;
    max-width: 56rem; margin-left: auto; margin-right: auto;
  }
  @media (min-width: 768px) { .ol-timeline-row { flex-direction: row; } }
  .ol-timeline-item {
    flex: 1; padding: 1.5rem;
    border: 1px solid rgba(32,67,56,0.15);
    border-radius: 0.1875rem;
    text-align: center;
  }
  .ol-timeline-year {
    font-family: var(--font-flare); font-size: 1.5rem; color: var(--color-f1-lime-green-darker);
    text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .ol-timeline-desc {
    font-family: var(--font-agrandir); font-size: 0.75rem; line-height: 1.6;
    color: #555;
  }
    /* ── FOOTER (ported from Maxfuel.jsx) ── */
.gy-footer {
  width: 100vw;
  background: #0d1311;
  padding: 72px 8vw 48px;
}
.gy-footer-inner {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 80px;
  align-items: start;
}
.gy-footer-logo {
  font-family: var(--font-flare);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 400;
  letter-spacing: .03em;
  color: var(--color-f1-lime-green);
  margin-bottom: 48px;
  line-height: 1;
  text-transform: uppercase;
}
.gy-footer-logo::after { content: '.'; }
.gy-footer-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.gy-footer-nav li a {
  display: block;
  font-family: var(--font-flare);
  font-size: clamp(16px, 2.8vw, 38px);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-white);
  text-decoration: none;
  line-height: 1.25;
  padding: 4px 0;
  transition: opacity .2s;
}
.gy-footer-nav li a:hover { opacity: .6; }
.gy-footer-right {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 8px;
}
.gy-footer-section-label {
  font-family: var(--font-agrandir);
  font-size: 10px;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: rgba(255,255,255,.45);
  margin-bottom: 14px;
}
.gy-footer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.gy-footer-social a {
  font-family: var(--font-agrandir);
  font-size: 11px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--color-white);
  text-decoration: none;
  transition: opacity .2s;
  min-height: 44px;
  display: flex;
  align-items: center;
}
.gy-footer-social a:hover { opacity: .6; }
.gy-footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gy-footer-contact a {
  font-family: var(--font-agrandir);
  font-size: 11px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--color-white);
  text-decoration: none;
  transition: opacity .2s;
  min-height: 44px;
  display: flex;
  align-items: center;
}
.gy-footer-contact a:hover { opacity: .6; }
.gy-footer-legal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}
.gy-footer-tagline {
  font-family: var(--font-agrandir);
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(255,255,255,.4);
  margin-bottom: 4px;
}
.gy-footer-disclaimer {
  font-family: var(--font-agrandir);
  font-size: 11px;
  line-height: 1.75;
  color: rgba(255,255,255,.28);
  letter-spacing: .02em;
}
.gy-footer-drinkaware {
  font-family: var(--font-agrandir);
  font-size: 11px;
  color: rgba(255,255,255,.35);
  letter-spacing: .04em;
  margin-top: 4px;
}
.gy-footer-drinkaware strong {
  font-weight: 400;
  font-family: var(--font-flare);
}
@media (max-width: 768px) {
  .gy-footer-inner { grid-template-columns: 1fr; gap: 40px; }
  .gy-footer { padding: 60px 6vw 40px; }
}
`;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconArrowDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ display: "block" }}
  >
    <path
      d="M8 2v12M2 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 1l12 12M13 1L1 13"
      stroke="#000"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IconHamburger = ({ open }) => (
  <svg width="30" height="14" viewBox="0 0 26 16" fill="none">
    {open ? (
      <>
        <line
          x1="1"
          y1="1"
          x2="25"
          y2="15"
          stroke="black"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="15"
          x2="25"
          y2="1"
          stroke="black"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <line
          x1="1"
          y1="2"
          x2="25"
          y2="2"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="12"
          x2="25"
          y2="12"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

function useFitText(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      if (window.innerWidth <= 767) return;
      el.style.fontSize = "100px";
      el.style.whiteSpace = "nowrap";
      const newSize = Math.floor(100 * (window.innerWidth / el.scrollWidth));
      el.style.fontSize = newSize + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [ref]);
}

function useDragScroll(ref) {
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const onPointerDown = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      drag.current = {
        active: true,
        startX: e.pageX - el.offsetLeft,
        scrollLeft: el.scrollLeft,
      };
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    },
    [ref],
  );
  const onPointerMove = useCallback(
    (e) => {
      if (!drag.current.active) return;
      const el = ref.current;
      if (!el) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - drag.current.startX) * 1.5;
      el.scrollLeft = drag.current.scrollLeft - walk;
    },
    [ref],
  );
  const onPointerUp = useCallback(
    (e) => {
      drag.current.active = false;
      const el = ref.current;
      if (!el) return;
      el.releasePointerCapture(e.pointerId);
      el.classList.remove("is-dragging");
    },
    [ref],
  );
  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave: onPointerUp,
  };
}

// ─── OVERLAY PAGES ────────────────────────────────────────────────────────────

function PastOverlay({ onClose }) {
  return (
    <div className="tab-overlay">
     
      {/* Hero — full-screen image */}
      <div className="tab-overlay-hero">
        <img src={Cheetah} alt="The Past" />
        <div className="tab-overlay-hero-scrim" />
        <div className="tab-overlay-hero-content">
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.f1LimeGreen,
              marginBottom: "0.75rem",
            }}
          >
           
          </p>
          <h1
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: COLORS.f1LimeGreen,
              margin: 0,
            }}
          >
          
          </h1>
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.7)",
              marginTop: "1rem",
              maxWidth: "40ch",
              lineHeight: 1.7,
            }}
          >
           
          </p>
        </div>
        <div className="scroll-hint">
          <IconArrowDown />
          <span>Scroll</span>
        </div>
      </div>

      {/* Body content */}
      <div className="tab-overlay-body">
        {/* About Us — Origin */}
        <div className="ol-section">
          <p className="ol-label">About Us</p>
          <h2 className="ol-heading">Our Origin Story</h2>
          <p className="ol-body">
            Matrix Petroleum was founded on the belief that the fuel industry
            had accepted mediocrity for too long. Diesel engines were corroding
            from the inside, diesel bug was silently degrading fuel quality, and
            inefficient combustion was wasting both resources and money. We set
            out to change that — permanently.
          </p>
          <p className="ol-body" style={{ marginTop: "1rem" }}>
            Our founding team of engineers and chemists identified six critical
            failure points in modern diesel fuel systems. Each one represented
            an opportunity — not just to fix the problem, but to engineer a
            solution so effective it would redefine the industry standard.
          </p>
        </div>

        {/* Stats */}
        <div className="ol-section ol-dark-section">
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            By the Numbers
          </p>
          <h2 className="ol-heading">The Problem We Inherited</h2>
          <div className="ol-stat-grid">
            {[
              {
                n: "£4.2B",
                l: "Lost annually to diesel contamination in the UK",
              },
              {
                n: "68%",
                l: "Of diesel engines show acid corrosion within 5 years",
              },
              {
                n: "23%",
                l: "Fuel efficiency lost to poor combustion chemistry",
              },
              {
                n: "1 in 3",
                l: "Diesel failures linked to microbiological growth",
              },
            ].map((s, i) => (
              <div key={i}>
                <div className="ol-stat-number">{s.n}</div>
                <div className="ol-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="ol-section">
          <p className="ol-label">Our Journey</p>
          <h2 className="ol-heading">Milestones That Shaped Us</h2>
          <div className="ol-timeline-row">
            {[
              {
                year: "2011",
                desc: "Matrix Petroleum founded in South Africa. First laboratory trials begin targeting diesel bio-contamination.",
              },
              {
                year: "2015",
                desc: "Breakthrough in acid-neutralising chemistry. Filed first patent for multi-action fuel additive technology.",
              },
              {
                year: "2018",
                desc: "MaxFuel RX formula version 1 enters field testing across commercial fleet operators in EMEA.",
              },
              {
                year: "2021",
                desc: "Expanded to offshore and marine sectors. Proven 31% reduction in injector wear across 200+ vessels.",
              },
            ].map((t, i) => (
              <div key={i} className="ol-timeline-item">
                <div className="ol-timeline-year">{t.year}</div>
                <div className="ol-timeline-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="ol-section ol-dark-section">
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            Our Mission
          </p>
          <h2 className="ol-heading">Why We Do This</h2>
          <p className="ol-body">
            We have always believed that every litre of diesel burned should do
            so cleanly, efficiently, and with minimum harm to the machinery it
            powers and the air we breathe. That conviction has guided every
            decision we've made since day one.
          </p>
          <div className="ol-pill-list">
            {[
              "Engine Longevity",
              "Clean Combustion",
              "Acid Neutralisation",
              "Bio-Protection",
              "Lubrication Science",
              "Emissions Reduction",
            ].map((p) => (
              <span key={p} className="ol-pill">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Footer bridge */}
        <div
          className="ol-section"
          style={{ textAlign: "center", padding: "4rem 1.5rem" }}
        >
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.f1LimeGreenDark,
            }}
          >
            Matrix Petroleum
          </p>
          <h2
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              color: COLORS.f1GreenDark,
              textTransform: "uppercase",
              margin: "0.5rem 0 2rem",
            }}
          >
            The Past Informs the Present
          </h2>
          <button className="am-btn am-btn-dark" onClick={onClose}>
            Return to Present
          </button>
        </div>
      </div>
    </div>
  );
}

function PresentOverlay({ onClose, Droplets2, HeroVideo }) {
  return (
    <div className="tab-overlay">
      

      {/* Hero — video */}
      <div className="tab-overlay-hero">
        <video autoPlay muted loop playsInline>
          <source src={HeroVideo} type="video/mp4" />
        </video>
        <div className="tab-overlay-hero-scrim" />
        <div className="tab-overlay-hero-content">
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.f1LimeGreen,
              marginBottom: "0.75rem",
            }}
          >
          
          </p>
          <h1
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: COLORS.f1LimeGreen,
              margin: 0,
            }}
          >
          
          </h1>
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.7)",
              marginTop: "1rem",
              maxWidth: "40ch",
              lineHeight: 1.7,
            }}
          >
            MaxFuel RX — the world's most advanced 6-pronged diesel fuel
            treatment. Available now. Working silently in engines across the
            globe.
          </p>
        </div>
        <div className="scroll-hint">
          <IconArrowDown />
          <span>Scroll</span>
        </div>
      </div>

      {/* Body */}
      <div className="tab-overlay-body">
        {/* What it does */}
        <div className="ol-section">
          <p className="ol-label">MaxFuel RX</p>
          <h2 className="ol-heading">Six Actions. One Formula.</h2>
          <p className="ol-body">
            MaxFuel RX is an elite, precision-engineered fuel treatment crafted
            to deeply cleanse and sustain your diesel engine's performance over
            the long haul. Its advanced formula goes beyond standard fuels,
            ensuring continuous protection that maximises efficiency and
            longevity.
          </p>
        </div>

        {/* 6 actions */}
        <div className="ol-section ol-dark-section">
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            The Six Pillars
          </p>
          <h2 className="ol-heading">What RX Does Right Now</h2>
          <div
            className="ol-stat-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
            }}
          >
            {[
              {
                n: "01",
                l: "Neutralising Acids",
                d: "Attacks and eliminates corrosive acids at the source.",
              },
              {
                n: "02",
                l: "Decreasing Diesel Bug Growth",
                d: "Prevents microbial proliferation that degrades fuel quality.",
              },
              {
                n: "03",
                l: "Lubricating Engine Components",
                d: "Enhances wear protection across injectors and pumps.",
              },
              {
                n: "04",
                l: "Increasing Combustibility",
                d: "Optimises fuel-air burn for maximum power output.",
              },
              {
                n: "05",
                l: "Cleaning Combustion Chamber",
                d: "Actively dissolves carbon deposits with every fill.",
              },
              {
                n: "06",
                l: "Cleaning Exhaust Components",
                d: "Passively restores exhaust system efficiency over time.",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  borderTop: `1px solid rgba(198,253,58,0.2)`,
                  paddingTop: "1rem",
                }}
              >
                <div className="ol-stat-number" style={{ fontSize: "1.5rem" }}>
                  {s.n}
                </div>
                <div
                  className="ol-stat-label"
                  style={{ color: COLORS.f1LimeGreen, marginBottom: "0.5rem" }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "0.6875rem",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div className="ol-section">
          <p className="ol-label">In Action</p>
          <h2 className="ol-heading">Seen At Work</h2>
          <div className="ol-video-grid">
            {[Video1, Video2, Video3].map((v, i) => (
              <div key={i} className="ol-video-cell">
                <video autoPlay muted loop playsInline>
                  <source src={v} type="video/mp4" />
                </video>
                <div className="ol-video-cell-scrim" />
                <div className="ol-video-label">
                  {["Combustion", "Protection", "Efficiency"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to use */}
        <div className="ol-section ol-dark-section">
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            Usage
          </p>
          <h2 className="ol-heading">One Simple Step</h2>
          <p className="ol-body">
            Add MaxFuel RX to your diesel tank at every fill-up. The formula is
            fully miscible with all grades of diesel fuel — no pre-mixing, no
            special equipment. Just pour, fill, and let the chemistry do the
            work.
          </p>
          <div className="ol-pill-list">
            {[
              "All Diesel Grades",
              "Marine & Offshore",
              "Commercial Fleets",
              "Generators",
              "Agricultural",
              "Mining Equipment",
            ].map((p) => (
              <span key={p} className="ol-pill">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div
          className="ol-section"
          style={{ textAlign: "center", padding: "4rem 1.5rem" }}
        >
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.f1LimeGreenDark,
            }}
          >
            Matrix Petroleum
          </p>
          <h2
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              color: COLORS.f1GreenDark,
              textTransform: "uppercase",
              margin: "0.5rem 0 2rem",
            }}
          >
            Ready to Transform Your Fleet?
          </h2>
          <button className="am-btn am-btn-dark" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function FutureOverlay({ onClose }) {
  return (
    <div className="tab-overlay" style={{ background: COLORS.introBg }}>
     

      {/* Hero — video */}
      <div className="tab-overlay-hero">
        <video autoPlay muted loop playsInline>
          <source src={HeroVideo1} type="video/mp4" />
        </video>
        <div className="tab-overlay-hero-scrim" />
        <div className="tab-overlay-hero-content">
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.f1LimeGreen,
              marginBottom: "0.75rem",
            }}
          >
          
          </p>
          <h1
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: COLORS.f1LimeGreen,
              margin: 0,
            }}
          >
           
          </h1>
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.7)",
              marginTop: "1rem",
              maxWidth: "40ch",
              lineHeight: 1.7,
            }}
          >
           
          </p>
        </div>
        <div className="scroll-hint">
          <IconArrowDown />
          <span>Scroll</span>
        </div>
      </div>

      {/* Body — dark-themed throughout */}
      <div className="tab-overlay-body" style={{ background: COLORS.introBg }}>
        {/* Vision */}
        <div
          className="ol-section ol-dark-section"
          style={{ background: COLORS.introBg }}
        >
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            Our Vision
          </p>
          <h2 className="ol-heading">A Cleaner Engine. A Cleaner Planet.</h2>
          <p className="ol-body">
            The future of energy is not binary. While the world transitions
            toward electrification, billions of diesel engines will continue
            operating for decades. Our mission is to make every one of those
            engines as clean, efficient, and long-lived as possible — reducing
            their footprint without replacing them.
          </p>
        </div>

        {/* Roadmap */}
        <div
          className="ol-section ol-dark-section"
          style={{ background: COLORS.introBg }}
        >
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            Roadmap
          </p>
          <h2 className="ol-heading">What's Coming</h2>
          <div className="ol-timeline-row">
            {[
              {
                year: "2025",
                desc: "RX Gen 2 launches — enhanced passive exhaust cleaning and 40% improvement in combustion efficiency.",
              },
              {
                year: "2026",
                desc: "Hydrogen-blend compatibility formula enters testing. MaxFuel RX becomes the first additive certified for H2-diesel blends.",
              },
              {
                year: "2027",
                desc: "Smart dosing technology — AI-calibrated additive release based on real-time fuel quality telemetry.",
              },
              {
                year: "2030",
                desc: "Carbon-neutral manufacturing facility opens in South Africa. Full lifecycle emissions offset achieved.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="ol-timeline-item"
                style={{ borderColor: "rgba(198,253,58,0.2)" }}
              >
                <div className="ol-timeline-year">{t.year}</div>
                <div
                  className="ol-timeline-desc"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats — future targets */}
        <div
          className="ol-section ol-dark-section"
          style={{ background: COLORS.introBg }}
        >
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            2030 Targets
          </p>
          <h2 className="ol-heading">The Numbers We're Chasing</h2>
          <div className="ol-stat-grid">
            {[
              {
                n: "50%",
                l: "Reduction in particulate emissions vs untreated diesel",
              },
              { n: "2M+", l: "Engines running MaxFuel RX globally" },
              { n: "Zero", l: "Carbon footprint in manufacturing by 2030" },
              { n: "Gen 5", l: "Formula iterations currently in development" },
            ].map((s, i) => (
              <div key={i}>
                <div className="ol-stat-number">{s.n}</div>
                <div className="ol-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video feature */}
        <div
          className="ol-section ol-dark-section"
          style={{ background: COLORS.introBg }}
        >
          <p className="ol-label" style={{ color: COLORS.f1LimeGreen }}>
            Innovation
          </p>
          <h2 className="ol-heading">New Engine. New Era.</h2>
          <p className="ol-body">
            Our R&D partnership with leading engine manufacturers is already
            producing results: a next-generation injector cleaning protocol that
            removes 30-year-old carbon deposits in a single tank. The future
            doesn't wait.
          </p>
          <div className="ol-video-grid" style={{ marginTop: "2rem" }}>
            <div className="ol-video-cell">
              <video autoPlay muted loop playsInline>
                <source src={HeroVideo2} type="video/mp4" />
              </video>
              <div className="ol-video-cell-scrim" />
              <div className="ol-video-label">Next-Gen Engine</div>
            </div>
            <div className="ol-video-cell">
              <video autoPlay muted loop playsInline>
                <source src={HeroVideo3} type="video/mp4" />
              </video>
              <div className="ol-video-cell-scrim" />
              <div className="ol-video-label">Green Fuel</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="ol-section ol-dark-section"
          style={{
            background: COLORS.introBg,
            textAlign: "center",
            padding: "5rem 1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.f1LimeGreenDark,
              marginBottom: "0.75rem",
            }}
          >
            Matrix Petroleum
          </p>
          <h2
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
              color: COLORS.f1LimeGreen,
              textTransform: "uppercase",
              margin: "0 0 1rem",
            }}
          >
            Join the Future
          </h2>
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "40ch",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Be among the first to access RX Gen 2 and our hydrogen-compatible
            formula when it launches. Sign up for the MaxFuel Collective.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="am-btn am-btn-light">Join the Collective</button>
            <button className="am-btn am-btn-dark" onClick={onClose}>
              Return to Present
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MaxfuelRX() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const [benefitIdx, setBenefitIdx] = useState(0);
  // NEW: which overlay page is showing (null | "past" | "present" | "future")
  const [overlayPage, setOverlayPage] = useState(null);

  const navPillRef = useRef(null);
  const navBarRef = useRef(null);
  const itemRefs = useRef([]);
  const posCache = useRef(new Map());
  const hoverTimer = useRef(null);
  const cycleTimer = useRef(null);
  const activeTabRef = useRef(activeTab);
  const heroLine1Ref = useRef(null);
  const heroLine2Ref = useRef(null);
  useFitText(heroLine1Ref);
  useFitText(heroLine2Ref);
  activeTabRef.current = activeTab;

  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);
  const slider1 = useDragScroll(slider1Ref);
  const slider2 = useDragScroll(slider2Ref);

  // Lock body scroll when an overlay is open
  useEffect(() => {
    // Overlay manages its own scroll, so we lock the background
    document.body.style.overflow = overlayPage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayPage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const overlay = params.get("overlay"); // "past" | "present" | "future"
  if (overlay === "past" || overlay === "present" || overlay === "future") {
    setOverlayPage(overlay);
  }
}, [location.search]);
  useEffect(() => {
    pushDataLayer({
      event: "siteDataLoaded",
      site: { brand: "Matrix Petroleum", country: "GB", region: "EMEA" },
      page: { type: "homepage", name: "Maxfuel RX × Matrix Petroleum" },
    });
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setBenefitIdx((i) => (i + 1) % NEWSLETTER_BENEFITS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  // ── Timeline pill bar logic (identical to original) ──
  const getBarPos = useCallback((index) => {
    if (posCache.current.has(index)) return posCache.current.get(index);
    const pill = navPillRef.current;
    const item = itemRefs.current[index];
    if (!pill || !item) return null;
    const pillRect = pill.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const pos = { x: itemRect.left - pillRect.left, width: itemRect.width };
    posCache.current.set(index, pos);
    return pos;
  }, []);

  const setActiveBar = useCallback(
    (index) => {
      const pos = getBarPos(index);
      if (!pos || !navBarRef.current) return;
      gsap.set(navBarRef.current, { x: pos.x, width: pos.width });
      itemRefs.current.forEach((el, i) => {
        if (el) el.dataset.active = i === index ? "true" : "false";
      });
    },
    [getBarPos],
  );

  const setHoverBar = useCallback(
    (index) => {
      const pos = getBarPos(index);
      if (!pos || !navBarRef.current) return;
      itemRefs.current.forEach((el, i) => {
        if (el) el.dataset.target = i === index ? "true" : "false";
      });
      gsap.to(navBarRef.current, {
        x: pos.x,
        width: pos.width,
        duration: 0.33,
        ease: "power2.inOut",
      });
    },
    [getBarPos],
  );

  const clearHoverBar = useCallback(() => {
    itemRefs.current.forEach((el) => {
      if (el) el.dataset.target = "false";
    });
    const pos = getBarPos(activeTabRef.current);
    if (!pos || !navBarRef.current) return;
    gsap.to(navBarRef.current, {
      x: pos.x,
      width: pos.width,
      duration: 0.33,
      ease: "power2.inOut",
    });
  }, [getBarPos]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setActiveBar(activeTab));
    return () => cancelAnimationFrame(id);
  }, [activeTab, setActiveBar]);

  useEffect(() => {
    const onResize = () => {
      posCache.current.clear();
      setActiveBar(activeTabRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setActiveBar]);

  useEffect(() => {
    let isFirst = true;
    const pill = navPillRef.current;
    const onScroll = () => {
      if (isFirst) {
        isFirst = false;
        gsap.to(pill, { autoAlpha: 1, duration: 0.7 });
      }
      if (pill) {
        pill.dataset.positionCenter =
          window.scrollY > window.innerHeight / 4 ? "false" : "true";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });
    tl.to("#homepage-transition-asset-mask", { scale: 1 }, "0").to(
      "#homepage-transition-asset-image-container",
      { scale: 1 },
      "<",
    );
    const st = ScrollTrigger.create({
      trigger: "#homepage-transition-asset",
      start: "top-=200 top",
      end: "bottom bottom",
      scrub: 0.2,
      animation: tl,
    });
    return () => {
      st.kill();
      tl.kill();
      if (cycleTimer.current) cycleTimer.current.kill();
    };
  }, []);

  useEffect(() => {
    const sections = [
      ["#section-past", 0],
      ["#homepage-transition-asset", 1],
      ["#section-future", 2],
    ];
    const triggers = sections.map(([sel, i]) =>
      ScrollTrigger.create({
        trigger: sel,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveTab(i),
        onEnterBack: () => setActiveTab(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const bgGradient = `linear-gradient(0deg, ${COLORS.introBg}, ${COLORS.introBgTop})`;

  // ── Tab click handler — opens the correct overlay ──
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (index === 0) setOverlayPage("past");
    else if (index === 1) setOverlayPage("present");
    else if (index === 2) setOverlayPage("future");
  };

  const closeOverlay = () => {
    setOverlayPage(null);
    setActiveTab(1); // snap pill back to Present
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      {/* ── OVERLAY PAGES (rendered on top of everything) ── */}
      {overlayPage === "past" && <PastOverlay onClose={closeOverlay} />}
      {overlayPage === "present" && (
        <PresentOverlay onClose={closeOverlay} HeroVideo={HeroVideo} />
      )}
      {overlayPage === "future" && <FutureOverlay onClose={closeOverlay} />}

      <div
        style={{
          fontFamily: FONTS.caslon,
          background: COLORS.white,
          color: COLORS.black,
          overflowX: "hidden",
          maxWidth: "100vw",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* ── HAMBURGER NAV ── */}
        <nav
          style={{
            position: "fixed",
            top: "0.75rem",
            left: 0,
            right: 0,
            zIndex: 10003,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "4.25rem",
              height: "1.5442rem",
              borderRadius: "0.1875rem",
              boxShadow: f1Shadow,
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                background: COLORS.white,
                border: "none",
                borderRadius: "0.1875rem",
                cursor: "pointer",
                transition: `scale 0.3s ${easeSmooth}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.scale = "1.05")}
              onMouseLeave={(e) => (e.currentTarget.style.scale = "1")}
            >
              <IconHamburger open={menuOpen} />
            </button>
          </div>
        </nav>

        {/* Overlay nav panel */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1002,
            padding: "0.5rem",
            pointerEvents: menuOpen ? "auto" : "none",
            visibility: menuOpen ? "visible" : "hidden",
            transition: `visibility 0s ${menuOpen ? "0s" : "0.35s"}`,
          }}
        >
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: COLORS.black,
              opacity: menuOpen ? 0.35 : 0,
              transition: `opacity 0.35s ${easeSmooth}`,
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "4rem",
              margin: "0 auto",
              width: "100%",
              maxWidth: "23.5rem",
              padding: "8.25rem 1.5rem 7.75rem",
              overflowY: "auto",
              background: COLORS.white,
              borderRadius: "0.1875rem",
              transform: menuOpen ? "translateY(0)" : "translateY(-1rem)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.35s ${easeSnappy}, opacity 0.3s ${easeSmooth}`,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "100%",
                  maxWidth: "25ch",
                  margin: "0 auto",
                }}
              >
                <a
                  href={link.href}
                  className="am-nav-item-link"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                    pushDataLayer({
                      event: "ctaClicks",
                      ga_event: {
                        category: "Internal CTA Clicks",
                        action: link.label,
                      },
                    });
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      lineHeight: "140%",
                      color: COLORS.black,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.agrandir,
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "100%",
                      color: COLORS.navSubtitle,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.0312rem",
                    }}
                  >
                    {link.sub}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIMELINE NAV PILL ── */}
        <div
          style={{
            position: "fixed",
            bottom: "1.25rem",
            left: 0,
            right: 0,
            zIndex: 10001,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            ref={navPillRef}
            className="am-timeline-nav-pill"
            data-position-center="true"
            style={{
              height: "2.3465rem",
              padding: "0.21rem",
              pointerEvents: "auto",
              background: "hsla(0, 0%, 100%, 0.95)",
              borderRadius: "var(--border-radius-1x)",
              boxShadow: f1Shadow,
              position: "relative",
            }}
          >
            <div ref={navBarRef} className="am-timeline-bar" />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              {TIMELINE_TABS.map((tab, i) => (
                <button
                  key={tab}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-active={activeTab === i}
                  className="am-timeline-item"
                  onClick={() => handleTabClick(i)} // ← CHANGED
                  onMouseEnter={() => {
                    if (hoverTimer.current) {
                      clearTimeout(hoverTimer.current);
                      hoverTimer.current = null;
                    }
                    if (i !== activeTab) setHoverBar(i);
                  }}
                  onMouseLeave={() => {
                    hoverTimer.current = setTimeout(() => clearHoverBar(), 50);
                  }}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: "5rem",
                    padding: "0.78rem 0 0.72rem",
                    fontFamily: FONTS.flare,
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    lineHeight: "100%",
                    color:
                      activeTab === i ? COLORS.f1LimeGreen : COLORS.f1GreenDark,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.0225rem",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    transition: "color 0.33s ease",
                    zIndex: 10002,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── HERO ── */}
        <section
          id="homepage-transition-asset"
          data-section="section-present"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            id="homepage-transition-asset-mask"
            style={{ background: bgGradient, position: "absolute", inset: 0 }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "calc(100vh - 5rem)",
                objectFit: "cover",
                display: "block",
              }}
            >
              <source src={HeroVideo} type="video/mp4" />
            </video>
            <div
              id="homepage-transition-asset-image-container"
              style={{ position: "absolute", inset: 0, overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "2rem 0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "2.5rem 1.5rem 4rem",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      lineHeight: 0.92,
                    }}
                  >
                    <div
                      ref={heroLine1Ref}
                      className="hero-fit-text"
                      style={{
                        fontFamily: FONTS.flare,
                        fontSize: "clamp(40px,8vw,120px)",
                        fontWeight: 600,
                        color: COLORS.f1LimeGreen,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Visionary Fuel
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      lineHeight: 0.92,
                    }}
                  >
                    <div
                      ref={heroLine2Ref}
                      className="hero-fit-text"
                      style={{
                
                        fontFamily: FONTS.flare,
                        fontSize: "clamp(40px,8vw,120px)",
                        fontWeight: 600,
                        color: COLORS.f1LimeGreen,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        width: "100%",
                        textAlign: "center",
                        animation: "slideUp 0.9s ease-out forwards",
                      }}
                    >
                      Timeless Tomorrow
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "0.09rem",
                  left: 0,
                  zIndex: 1,
                  display: "grid",
                  placeItems: "center",
                  width: "100%",
                }}
              >
                <button
                  className="am-scroll-arrow"
                  onClick={() =>
                    window.scrollBy({
                      top: window.innerHeight,
                      behavior: "smooth",
                    })
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2rem",
                    color: COLORS.f1LimeGreen,
                    width: "1rem",
                  }}
                  aria-label="Scroll down"
                >
                  <IconArrowDown />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOCK TEXT ── */}
        <section
          style={{
            padding: "0 var(--page-margin)",
            margin: "9rem 0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 400,
              lineHeight: "140%",
              color: COLORS.f1GreenDark,
              maxWidth: "22ch",
              margin: "0 auto",
            }}
          >
            MaxFuel RX's unique 6-pronged approach solves long-standing fuel
            industry problems — delivering results that are immediate and built
            to last.
          </p>
        </section>

        {/* ── CARD SLIDER ── */}
        <section
          id="section-past"
          style={{
            position: "relative",
            padding: "13rem 0",
            color: COLORS.white,
            background: COLORS.introBg,
            maxWidth: "100%",
            width: "100%",
            overflow: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "3.5rem",
              padding: "0 1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.flare,
                fontSize: "1.5rem",
                fontWeight: 400,
                lineHeight: "150%",
                color: COLORS.f1LimeGreenDark,
                textTransform: "uppercase",
                textAlign:"center"
              }}
            >
              CRITICAL ASPECTS OF FUEL OPTIMIZATION
            </span>
           
          </div>
          <div
            ref={slider1Ref}
            className="am-slider am-card-slider-track"
            style={{ padding: "0 1.5rem 4rem", cursor: "grab" }}
            onPointerDown={slider1.onPointerDown}
            onPointerMove={slider1.onPointerMove}
            onPointerUp={slider1.onPointerUp}
            onPointerLeave={slider1.onPointerLeave}
          >
            {CARDS.map((card, i) => {
              const videos = [Video1, Video2, Video3];
              return (
                <div
                  key={i}
                  className="am-card-link am-card-slide"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "272.61 / 444",
                      background: COLORS.f1GreenDark,
                      overflow: "hidden",
                    }}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        zIndex: 1,
                      }}
                    >
                      <source src={videos[i]} type="video/mp4" />
                    </video>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(180deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                        zIndex: 2,
                        opacity: 0.6,
                      }}
                    />
                  </div>
                  <div style={{ marginTop: "1.5rem" }}>
                    <span
                      className="am-card-subtitle"
                      style={{
                        display: "block",
                        fontFamily: FONTS.agrandir,
                        fontSize: "0.625rem",
                        fontWeight: 400,
                        lineHeight: "100%",
                        color: COLORS.white,
                        textTransform: "uppercase",
                        letterSpacing: "0.0312rem",
                      }}
                    >
                      {card.label}
                    </span>
                    <span
                      className="am-card-title"
                      style={{
                        display: "block",
                        marginTop: "0.25rem",
                        fontFamily: FONTS.flare,
                        fontSize: "1rem",
                        fontWeight: 400,
                        lineHeight: "150%",
                        textTransform: "uppercase",
                        color: COLORS.white,
                      }}
                    >
                      {card.title}
                    </span>
                  </div>
                </div>
              );
            })}
            <div
              style={{ flexShrink: 0, width: "1.5rem" }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ── RX SECTION ── */}
        <section style={{ position: "relative", margin: "13rem 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)",
              gap: "1.5rem",
              padding: "0 1.5rem",
              alignItems: "center",
              maxWidth: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "217 / 325",
                background: COLORS.f1GreenDark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  zIndex: 1001,
                }}
              >
                <source src={HeroVideo3} type="video/mp4" />
              </video>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: FONTS.agrandir,
                  fontSize: "1rem",
                  color: COLORS.f1LimeGreen,
                  textAlign: "center",
                  textTransform: "uppercase",
                  maxWidth: "10rem",
                  padding: "1rem",
                }}
              >
                Limited Edition
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "1.5rem",
                  zIndex: 3,
                }}
              >
                <button className="am-btn am-btn-light">Discover</button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "26rem",
                  aspectRatio: "217 / 325",
                  overflow: "hidden",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                >
                  <source src={Droplets2} type="video/mp4" />
                </video>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.0313rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Limited Edition
                </p>
                <p
                  style={{
                    fontFamily: FONTS.flare,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  RX
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <button className="am-btn am-btn-dark">Shop Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER TEASER ── */}
        <section
          style={{
            position: "relative",
            display: "grid",
            placeItems: "center",
            padding: "0 var(--page-margin)",
            margin: "13rem 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                paddingBottom: "1rem",
                fontFamily: FONTS.agrandir,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.0438rem",
                color: COLORS.f1GreenDark,
              }}
            >
              Matrix Petroleum
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: FONTS.flare,
                fontSize: "clamp(2.875rem, 6vw, 5rem)",
                fontWeight: 400,
                lineHeight: "90%",
                textTransform: "uppercase",
                letterSpacing: "clamp(-0.115rem, -0.5vw, -0.15rem)",
                color: COLORS.f1GreenDark,
              }}
            >
              Maxfuel RX
            </h2>
            <div
              style={{
                position: "relative",
                display: "grid",
                height: "2rem",
                marginTop: "1rem",
                overflow: "hidden",
              }}
            >
              <span
                key={benefitIdx}
                className="am-benefit"
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "0.875rem",
                  letterSpacing: "0.0438rem",
                  textTransform: "uppercase",
                  color: COLORS.f1LimeGreenDark,
                  textAlign: "center",
                  gridArea: "1/-1",
                }}
              >
                {NEWSLETTER_BENEFITS[benefitIdx]}
              </span>
            </div>
            <p
              style={{
                maxWidth: "45.0625rem",
                marginTop: "1.75rem",
                fontFamily: FONTS.flare,
                fontSize: "0.75rem",
                lineHeight: "145%",
                textAlign: "center",
                color: COLORS.f1GreenDark,
              }}
            >
              MaxFuel RX is an elite precision engineered fuel crafted to deeply
              cleanse and sustain your diesel engine's performance over the long
              haul.
            </p>
            <div style={{ margin: "2.02rem auto 0" }}>
              <button className="am-btn am-btn-dark">
                Join the Collective
              </button>
            </div>
          </div>
        </section>

        {/* ── FUTURE SECTION ── */}
        <section
          id="section-future"
          style={{
            position: "relative",
            display: "grid",
            width: "100%",
            height: "100vh",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            >
              <source src={HeroVideo1} type="video/mp4" />
            </video>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(32,67,56,0.3) 0%, rgba(12,19,17,0.7) 100%)",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 1.5rem 3rem",
              color: COLORS.white,
              width: "100%",
              height: "100%",
            }}
          >
            <h2
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                fontWeight: 400,
                lineHeight: "150%",
                textTransform: "uppercase",
                color: COLORS.white,
                maxWidth: "30ch",
                marginBottom: "1rem",
              }}
            >
              MAXFUEL RX unveiled in South Africa
            </h2>
            <p
              style={{
                fontFamily: FONTS.flare,
                fontSize: "0.75rem",
                lineHeight: "145%",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "40ch",
                marginBottom: "1.48rem",
              }}
            >
              Over time exhaust systems accumulate residue that reduces their
              effectiveness. MaxFuel RX passively cleans these components,
              ensuring peak efficiency.
            </p>
            <div>
              <button className="am-btn am-btn-light">Read More</button>
            </div>
          </div>
        </section>

        {/* ── EVENTS SLIDER ── */}
        <section
          style={{
            position: "relative",
            background: COLORS.introBg,
            padding: "13rem 0",
            color: COLORS.white,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "3.5rem",
              padding: "0 1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.flare,
                fontSize: "1.5rem",
                fontWeight: 400,
                lineHeight: "150%",
                color: COLORS.white,
                textTransform: "uppercase",
              }}
            >
              CRITICAL ASPECTS OF FUEL OPTIMIZATION
            </span>
            <button className="am-btn am-btn-light" style={{ flexShrink: 0 }}>
              View All Aspects
            </button>
          </div>
          <div
            ref={slider2Ref}
            className="am-slider am-card-slider-track"
            style={{ padding: "0 1.5rem 4rem", cursor: "grab" }}
            onPointerDown={slider2.onPointerDown}
            onPointerMove={slider2.onPointerMove}
            onPointerUp={slider2.onPointerUp}
            onPointerLeave={slider2.onPointerLeave}
          >
            {EVENTS.map((ev, i) => (
              <div
                key={i}
                className="am-card-link am-card-slide"
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "272.61 / 444",
                    background: COLORS.f1GreenDark,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      zIndex: 1001,
                    }}
                  >
                    <source src={Theteam} type="video/mp4" />
                  </video>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(180deg, ${COLORS.introBgTop} ${i * 20}%, ${COLORS.introBg})`,
                      zIndex: 2,
                    }}
                  />
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <span
                    className="am-card-subtitle"
                    style={{
                      display: "block",
                      fontFamily: FONTS.agrandir,
                      fontSize: "0.625rem",
                      color: COLORS.white,
                      textTransform: "uppercase",
                      letterSpacing: "0.0312rem",
                    }}
                  >
                    {ev.sub}
                  </span>
                  <span
                    className="am-card-title"
                    style={{
                      display: "block",
                      marginTop: "0.25rem",
                      fontFamily: FONTS.flare,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      color: COLORS.white,
                    }}
                  >
                    {ev.title}
                  </span>
                </div>
              </div>
            ))}
            <div
              style={{ flexShrink: 0, width: "1.5rem" }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ── DISCLAIMER ── */}
        <div
          style={{
            padding: "2rem 1.5rem",
            textAlign: "center",
            background: COLORS.grey100,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              lineHeight: "140%",
              letterSpacing: "0.065rem",
              textTransform: "uppercase",
              color: COLORS.grey600,
              opacity: 0.8,
            }}
          >
            Passively Cleaning Exhaust-Related Components
          </p>
        </div>

        {/* ── FOOTER ── */}
      <footer className="gy-footer">
  <div className="gy-footer-inner">
    <div className="gy-footer-left">
      <div className="gy-footer-logo">Matrix Petroleum</div>
      <ul className="gy-footer-nav">
  {[
    { label: "Home",                        to: "/" },
    { label: "Our Future",                  to: "/?overlay=future" },
    { label: "Our Story",                   to: "/about-us" },
    { label: "Terms and Conditions",        to: "/terms-and-conditions" },
    { label: "FAQs",                        to: "/faqs" },
    { label: "Website Terms and Conditions",to: "/terms-and-conditions" },
    { label: "Privacy Policy and Cookies",  to: "/privacy-policy" },
    { label: "Matrix Petroleum",            to: "/" },
  ].map((l) => (
    <li key={l.label}>
      <Link to={l.to}>{l.label}</Link>
    </li>
  ))}
</ul>
    </div>
    <div className="gy-footer-right">
      <div>
        <p className="gy-footer-section-label">Follow Us</p>
        <ul className="gy-footer-social">
          {["Facebook", "Instagram", "Twitter", "YouTube"].map((s) => (
            <li key={s}>
              <a href="#">{s}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="gy-footer-section-label">Contact Us</p>
        <ul className="gy-footer-contact">
          <li>
            <a href="#">General Enquiries</a>
          </li>
        </ul>
      </div>
      <div className="gy-footer-legal">
        <p className="gy-footer-tagline">
          Skilfully Engineered. Use Responsibly.
        </p>
        <p className="gy-footer-disclaimer">
          2025 Matrix Petroleum Ltd. Registered in England. Registered
          Number 11462010
          <br />
          Registered Office: 3 Hardman Square, Manchester M3 3EB
          <br />
          This content is intended only for people who are of legal
          purchase age in their country. Do not forward to minors.
        </p>
        <p className="gy-footer-drinkaware">
          <strong>matrixpetroleum</strong>.com
        </p>
      </div>
    </div>
  </div>
</footer>
      </div>
    </>
  );
}
