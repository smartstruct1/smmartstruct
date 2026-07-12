import { useState, useEffect, useRef, useCallback } from "react";
import logo from "./assets/smartstruct-logo.png";
import foundationImg from "./assets/hero-1.png";
import wastewaterHero from "./assets/septic-tank.png";
import wastewaterTanks from "./assets/septic-tanks.png";
import wastewaterAeration from "./assets/sewage-system.png";
import waterSupplyHero from "./assets/industry-1.png";
import waterSupplyPump from "./assets/industry-2.png";
import roadsHero from "./assets/road.jpg";
import roadsConstruction from "./assets/project3.jpg";
import wastewaterAerial from "./assets/waste-water1500.png";
import wastewaterConstruction from "./assets/project6.png";
import waterTower from "./assets/hero-5.png";
import waterTowerRural from "./assets/project7.jpg";
import webdev from "./assets/webdev.avif";
import HERO_IMAGE from "./assets/hero-3.png";
import pmoLifecycle from "./assets/pmo-lifecycle.png";
import missionVisionValues from "./assets/mission-vision-values.png";
import projectWorkflow from "./assets/project-workflow.png";
import blueprintLineart from "./assets/blueprint-lineart.png";
import buildingFacade from "./assets/building-facade.png";
import floorplanBlueprint from "./assets/floorplan-blueprint.png";
import wireframeHouse from "./assets/wireframe-house.png";
import bimModel from "./assets/bim-model.png";
import heroDarkTexture from "./assets/dark-texture.png";
import houseCutaway from "./assets/house-cutaway.png";
import {
  Building2,
  Waves,
  Droplet,
  Route,
  Code2,
  ArrowDown,
  X,
  Menu as MenuIcon,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";

// ─── Content: real services pulled from smartstruct.co.za ─────────────────
const CATEGORIES = [
  {
    key: "engineering",
    label: "Engineering",
    tagline: "The physical framework people move through and live inside.",
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    tagline: "The hidden networks that keep water moving and sites running.",
  },
  {
    key: "technology",
    label: "Technology",
    tagline: "The digital systems that keep a business online.",
  },
];

const SERVICES = [
  {
    code: "SS-01",
    category: 0,
    name: "Building Structural Design",
    icon: Building2,
    image: foundationImg,
    images: [buildingFacade, floorplanBlueprint, wireframeHouse],
    blurb:
      "Professional structural engineering for residential, commercial and industrial buildings.",
    description:
      "We take a building from concept sketch to a fully engineered structure, balancing load, material and cost so the design is buildable on day one. Every scheme is checked against local building codes before it reaches a contractor, and we stay involved through construction to resolve site queries as they come up.",
    bullets: [
      "Reinforced Concrete Design",
      "Steel and Timber Structures",
      "Structural Analysis and Modelling",
      "Foundations and Stability Design",
      "Compliance with Building Regulations",
      "Structural Drawings and Detailing",
      "Site Inspections During Construction",
      "Structural Assessments of Existing Buildings",
    ],
  },
  {
    code: "SS-02",
    category: 0,
    name: "Roads Design",
    icon: Route,
    image: roadsHero,
    images: [roadsConstruction],
    blurb:
      "Roads and transportation infrastructure design focused on safety, durability and compliance.",
    description:
      "From a single access road to a subdivision's full internal network, we design roads that hold up under real traffic loads and local weather. Geometry, pavement structure and drainage are worked out together, so the road performs for its full design life rather than needing early rework.",
    bullets: [
      "Geometric Road Design",
      "Pavement Design and Analysis",
      "Stormwater and Drainage Design",
      "Traffic Accommodation Layouts",
      "Compliance with Road Authority Standards",
      "Earthworks and Cut/Fill Optimisation",
      "Intersection and Junction Design",
      "Construction Supervision and Quality Control",
    ],
  },
  {
    code: "SS-03",
    category: 1,
    name: "Wastewater Treatment Facilities Design",
    icon: Waves,
    image: wastewaterHero,
    images: [
      wastewaterTanks,
      wastewaterAeration,
      wastewaterAerial,
      wastewaterConstruction,
    ],
    blurb:
      "Planning, design and optimisation of wastewater treatment facilities.",
    description:
      "We size and lay out treatment works that match the flows and effluent standards a site actually needs, whether that's a package plant for a housing development or a full municipal upgrade. Process selection is grounded in hydraulic modelling, so mechanical, civil and structural elements are designed to work together from the outset.",
    bullets: [
      "Feasibility Studies and Concept Design",
      "Process Design and Selection",
      "Hydraulic Modelling and Calculations",
      "Civil, Structural and Mechanical Layouts",
      "Compliance with Regulatory Standards",
      "Package Plant and Package WWTP Design",
      "Sludge Handling and Treatment",
      "Operations and Maintenance Support",
    ],
  },
  {
    code: "SS-04",
    category: 1,
    name: "Water Supply Infrastructure",
    icon: Droplet,
    image: waterTower,
    images: [waterSupplyHero, waterSupplyPump, waterTowerRural],
    blurb:
      "Sustainable, reliable water supply infrastructure for residential, commercial and public developments.",
    description:
      "We plan supply systems around real demand, not rules of thumb, so pipelines, pump stations and storage are sized correctly the first time. The result is a network that delivers reliable pressure and volume to every connection while staying within budget to build and operate.",
    bullets: [
      "Water Demand Analysis",
      "Pipeline and Pump Station Design",
      "Reservoir and Storage Design",
      "Hydraulic Modelling",
      "Compliance with National Standards",
      "Bulk Water Supply Planning",
      "Water Reticulation Network Design",
      "Borehole and Groundwater Scheme Design",
    ],
  },
  {
    code: "SS-05",
    category: 2,
    name: "IT Services (Web & Domains)",
    icon: Code2,
    image: webdev,
    images: [webdev],
    blurb:
      "Reliable, affordable IT services supporting businesses and professionals online.",
    description:
      "Beyond engineering, we help clients get and stay online: a fast, mobile-friendly website, a domain and inbox set up correctly, and hosting that doesn't fall over when it matters. We keep things running after launch too, so a site stays secure and up to date without becoming a recurring headache.",
    bullets: [
      "Website Design and Development",
      "Domain Registration and Management",
      "Web Hosting Solutions",
      "Email Setup and Configuration",
      "Ongoing Website Maintenance",
      "SEO and Performance Optimisation",
      "SSL Security and Backups",
      "IT Support and Troubleshooting",
    ],
  },
];

const HERO_BG = heroDarkTexture;
const HERO_SLIDES = [
  {
    graphic: bimModel,
    eyebrow: "SmartStruct — Consulting Engineers",
    title: "Bringing Your Ideas To Reality",
    subtitle: "Engineering  /  Infrastructure  /  Technology",
    copy: "Pioneering structural, water and infrastructure engineering that's built to perform on site, not just on paper.",
  },
  {
    graphic: houseCutaway,
    eyebrow: "Engineering",
    title: "Structures Engineered To Last",
    subtitle: "Building Structural Design  /  Roads Design",
    copy: "Every wall, roof and foundation is modelled and detailed layer by layer, so what's built matches exactly what was designed.",
  },
  {
    graphic: bimModel,
    eyebrow: "Infrastructure",
    title: "Built From The Model Up",
    subtitle: "BIM-Led Design  /  Full Coordination",
    copy: "Structural, civil and services all live in one coordinated model, so clashes get caught on screen, long before they cost time on site.",
  },
];

// ─── Extra content for the expanded page sections ──────────────────────────
const PROCESS_STEPS = [
  {
    title: "Consult",
    desc: "We start by understanding the site, the budget and what success looks like for the client before any design work begins.",
  },
  {
    title: "Design",
    desc: "Concepts are modelled, analysed and refined until the engineering is sound and the cost is predictable.",
  },
  {
    title: "Approve",
    desc: "Drawings and calculations are packaged for regulatory sign-off, with SmartStruct handling submissions and queries.",
  },
  {
    title: "Build",
    desc: "We stay involved through construction, inspecting work on site and resolving issues before they become delays.",
  },
];

// One image per process step (used on the small in-card scrim) and one
// wide atmospheric shot behind the whole section — the RRMC
// "section-bg-wrapper" pattern: a single full-bleed photograph pinned
// behind the section with a dark scrim, content sitting on top of it.
const PROCESS_IMAGES = [
  waterSupplyPump,
  wastewaterAeration,
  wastewaterConstruction,
  roadsConstruction,
];
const PROCESS_BG = wastewaterAerial;

// Five-stage project delivery lifecycle (mirrors the PMO diagram artwork) —
// shown as its own section further down the page, distinct from the four
// high-level "how we work" steps above.
const LIFECYCLE_STAGES = [
  {
    title: "Scope Definition",
    desc: "We agree what's being built, for whom, and to what standard before a single drawing is started.",
  },
  {
    title: "Project Planning",
    desc: "Programme, budget and resourcing are locked down so the project has a realistic path to delivery.",
  },
  {
    title: "Site Construction Management",
    desc: "Engineers are on site through the build, checking work against the drawings as it happens.",
  },
  {
    title: "Project Control",
    desc: "Cost, quality and schedule are tracked continuously, so issues surface early enough to fix cheaply.",
  },
  {
    title: "Project Closure",
    desc: "As-built drawings, sign-off documentation and handover are wrapped up so nothing trails on after completion.",
  },
];

const MISSION_VISION_VALUES = [
  {
    title: "Mission",
    desc: "To deliver engineering that is technically sound, honestly costed and built to perform long after handover.",
  },
  {
    title: "Vision",
    desc: "To be the multidisciplinary practice clients call first — for structures, infrastructure and the systems that run them.",
  },
  {
    title: "Values",
    desc: "Rigour, straight communication and accountability, from the first sketch to the final site inspection.",
  },
];

const STATS = [
  { num: "5", label: "Core Disciplines" },
  { num: "10+", label: "Years Combined Experience" },
  { num: "100%", label: "Locally Compliant Designs" },
  { num: "24/7", label: "Client Support" },
];

const VALUES = [
  {
    title: "Technical Rigour",
    desc: "Every design is backed by proper analysis and modelling, not shortcuts — so it performs long after handover.",
  },
  {
    title: "Straight Answers",
    desc: "We tell clients what something will cost and how long it will take before they commit, not after.",
  },
  {
    title: "One Team, Many Disciplines",
    desc: "Structural, civil, water and IT specialists work from the same table, so nothing falls through the cracks between trades.",
  },
  {
    title: "On-Site, Not Just On Paper",
    desc: "We inspect our own designs during construction, so drawings hold up against what's actually being built.",
  },
];

const NAV_LINKS = [
  {
    label: "Home",
    href: "#top",
    sub: "Start here",
    preview: HERO_IMAGE,
  },
  {
    label: "Services",
    href: "#services",
    sub: "Five disciplines, one team",
    preview: foundationImg,
  },
  {
    label: "About",
    href: "#about",
    sub: "Why SmartStruct",
    preview: waterTower,
  },
  {
    label: "Contact",
    href: "#contact",
    sub: "Start a project",
    preview: webdev,
  },
];

const CATEGORY_VIDEO = ["", "", ""];

const COLORS = {
  ink: "#0b0f14",
  inkElevated: "#121922",
  inkLine: "rgba(244,121,30,0.16)",
  paper: "#f7f6f3",
  paperLine: "rgba(28,35,44,0.1)",
  graphite: "#1c232c",
  muted: "#5c6975",
  cyan: "#F4791E",
  cyanDim: "#c85e12",
  amber: "#18773e",
  white: "#ffffff",
};
const FONTS = {
  display: `"Gill Sans", "Gill Sans MT", "Jost", "Century Gothic", "Segoe UI", sans-serif`,
  body: `"Gill Sans", "Gill Sans MT", "Jost", "Segoe UI", Calibri, sans-serif`,
  mono: `"IBM Plex Mono", "SFMono-Regular", Menlo, monospace`,
};
const easeSmooth = "cubic-bezier(0.45, 0.02, 0.09, 0.98)";
const shadow = "0 0 5.2px 0 rgb(0 0 0/8%), 0 8px 24px 0 rgb(0 0 0/18%)";
// Height of the reveal footer — shared between the fixed footer and the
// content wrapper's bottom margin so the footer surfaces as you hit the end.
const FOOTER_HEIGHT = "clamp(24rem, 42vw, 28rem)";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body, html { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }

  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-0.3rem); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(2rem); } to { opacity: 1; transform: translateY(0); } }
  @keyframes tickerSwap {
    0% { opacity: 0; transform: translateY(0.35rem); }
    12% { opacity: 1; transform: translateY(0); }
    88% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-0.35rem); }
  }
  @keyframes gridDrift {
    from { background-position: 0 0, 0 0; }
    to   { background-position: 64px 64px, 64px 64px; }
  }
  @keyframes heroFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-16px) scale(1.01); }
  }
  @keyframes heroGlowPulse {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 0.9; }
  }

 .ss-blueprint-bg {
  background-color: ${COLORS.ink};
}
.ss-cookie-fab {
  position: fixed; bottom: 1.25rem; left: 1.25rem; z-index: 9500;
  display: flex; align-items: center; justify-content: center;
  width: 4.25rem; height: 4.25rem; border-radius: 50%;
  background: ${COLORS.ink};
  border: none;
  box-shadow: ${shadow};
  color: ${COLORS.cyan};
  cursor: pointer;
  transition: transform 0.25s ${easeSmooth}, box-shadow 0.25s ease;
}
.ss-cookie-fab:hover {
  transform: scale(1.08) rotate(8deg);
  box-shadow: 0 0 0 3px ${COLORS.amber}, ${shadow};
}
.ss-cookie-overlay {
  position: fixed; inset: 0; z-index: 9600;
  background: rgba(11,15,20,0.7); backdrop-filter: blur(3px);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem; animation: fadeIn 0.25s ease both;
}
.ss-cookie-modal {
  width: min(30rem, 100%); max-height: 85vh; overflow-y: auto;
  background: ${COLORS.paper}; border-radius: 4px;
  padding: 2rem; animation: slideUp 0.3s ${easeSmooth} both;
}
.ss-cookie-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.9rem 0; border-bottom: 1px solid ${COLORS.paperLine};
  font-family: ${FONTS.body};
}
.ss-cookie-row:last-child { border-bottom: none; }
.ss-cookie-switch {
  position: relative; width: 2.6rem; height: 1.5rem; border-radius: 1rem;
  border: none; cursor: pointer; transition: background 0.2s ease; flex-shrink: 0;
}
  
.ss-cookie-switch::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 1.15rem; height: 1.15rem; border-radius: 50%; background: #fff;
  transition: transform 0.2s ease;
}
.ss-cookie-switch.on::after { transform: translateX(1.1rem); }
  .ss-corner { position: absolute; width: 1.1rem; height: 1.1rem; pointer-events: none; }
  .ss-corner::before, .ss-corner::after { content: ''; position: absolute; background: ${COLORS.cyan}; }
  .ss-corner::before { width: 100%; height: 1.5px; top: 0; left: 0; }
  .ss-corner::after  { width: 1.5px; height: 100%; top: 0; left: 0; }
  .ss-corner.tl { top: 0.75rem; left: 0.75rem; }
  .ss-corner.tr { top: 0.75rem; right: 0.75rem; transform: scaleX(-1); }
  .ss-corner.bl { bottom: 0.75rem; left: 0.75rem; transform: scaleY(-1); }
  .ss-corner.br { bottom: 0.75rem; right: 0.75rem; transform: scale(-1,-1); }

  .ss-scroll-hint { animation: bounce 2s infinite; }
  .ss-ticker-line { animation: tickerSwap 2.6s ease forwards; }

  .ss-btn {
    display: inline-flex; align-items: center; gap: 0.5rem; justify-content: center;
    height: 2.375rem; padding: 0 1.5rem;
    font-family: ${FONTS.mono}; font-size: 0.6875rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; border-radius: 2px; border: 1px solid transparent;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
    white-space: nowrap;
  }
  .ss-btn-solid { color: ${COLORS.ink}; background: ${COLORS.cyan}; }
  .ss-btn-solid:hover { background: ${COLORS.white}; }
  .ss-btn-ghost { color: green; background: transparent; border-color: ${COLORS.cyan}; }
  .ss-btn-ghost:hover { border-color: ${COLORS.cyan}; color: ${COLORS.cyan}; }
  .ss-btn-dark { color: ${COLORS.white}; background: ${COLORS.graphite}; }
  .ss-btn-dark:hover { background: #2a333e; }
  .ss-btn:active { transform: scale(0.97); }

  .ss-tag {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: ${FONTS.mono}; font-size: 0.625rem; letter-spacing: 0.08em;
    text-transform: uppercase; color: ${COLORS.cyan};
  }
  .ss-tag::before { content: ''; width: 0.4rem; height: 0.4rem; background: ${COLORS.amber}; border-radius: 50%; flex-shrink: 0; }

  .ss-nav-link { transition: opacity 0.15s ${easeSmooth}; text-decoration: none; }
  .ss-nav-link:hover { opacity: 0.55; }

  /* ── Minimal top bar (Rolls-Royce style) ── */
  .ss-topbar-strip {
    position: fixed; top: 0; left: 0; right: 0; height: 7rem; z-index: 10001;
    background: linear-gradient(180deg, rgba(11,15,20,0.5) 0%, rgba(11,15,20,0) 100%);
    pointer-events: none;
  }
  .ss-menu-trigger {
    pointer-events: auto; display: flex; align-items: center; gap: 0.7rem;
    background: none; border: none; cursor: pointer; padding: 0.35rem 0.25rem;
  }
  .ss-menu-trigger-label {
    font-family: ${FONTS.mono}; font-size: 0.625rem; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase; color: #fff;
  }
  .ss-menu-trigger-icon {
    display: flex; align-items: center; justify-content: center;
    width: 2.375rem; height: 2.375rem; border-radius: 50%;
    background: rgba(11,15,20,0.5); backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.28);
    transition: border-color 0.25s ease, transform 0.3s ${easeSmooth};
  }
  .ss-menu-trigger:hover .ss-menu-trigger-icon { border-color: ${COLORS.cyan}; }

  /* ── Full-screen expanding mega-menu (Rolls-Royce style) ── */
  .ss-megamenu {
    position: fixed; inset: 0; z-index: 10002;
    background: ${COLORS.ink};
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity 0.5s ${easeSmooth}, visibility 0.5s ${easeSmooth};
    overflow-y: auto;
  }
  .ss-megamenu.is-open { opacity: 1; visibility: visible; pointer-events: auto; }
  .ss-megamenu-grid {
    max-width: 78rem; margin: 0 auto; min-height: 100vh; width: 100%;
    display: grid; grid-template-columns: 1.05fr 1fr; align-items: center;
    padding: 8.5rem 2rem 4rem; gap: 3rem; box-sizing: border-box;
  }
  @media (max-width: 900px) {
    .ss-megamenu-grid { grid-template-columns: 1fr; padding: 7.5rem 1.5rem 3.5rem; align-items: flex-start; }
    .ss-megamenu-preview { display: none; }
  }
  .ss-megamenu-links {
    display: flex; flex-direction: column; opacity: 0; transform: translateY(1rem);
    transition: opacity 0.5s 0.1s ${easeSmooth}, transform 0.5s 0.1s ${easeSmooth};
  }
  .ss-megamenu.is-open .ss-megamenu-links { opacity: 1; transform: translateY(0); }
  .ss-megamenu-item {
    display: block; text-decoration: none; border: none; background: none;
    text-align: left; cursor: pointer; padding: 0.85rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.08); width: 100%;
  }
  .ss-megamenu-item:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
  .ss-megamenu-item-title {
    font-family: ${FONTS.display}; font-weight: 600;
    font-size: clamp(1.75rem, 4vw, 2.85rem); text-transform: uppercase;
    color: rgba(255,255,255,0.4); line-height: 1.05; display: inline-block;
    transition: color 0.3s ease, transform 0.3s ${easeSmooth};
  }
  .ss-megamenu-item.is-active .ss-megamenu-item-title,
  .ss-megamenu-item:hover .ss-megamenu-item-title {
    color: #fff; transform: translateX(0.5rem);
  }
  .ss-megamenu-item-sub {
    display: block; font-family: ${FONTS.mono}; font-size: 0.6875rem;
    letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.3);
    margin-top: 0.35rem; transition: color 0.3s ease;
  }
  .ss-megamenu-item.is-active .ss-megamenu-item-sub,
  .ss-megamenu-item:hover .ss-megamenu-item-sub { color: ${COLORS.cyan}; }

  .ss-megamenu-disciplines { margin-top: 2.25rem; display: flex; flex-direction: column; gap: 0.35rem; }
  .ss-megamenu-disc-label {
    font-family: ${FONTS.mono}; font-size: 0.625rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.32); margin: 0 0 0.6rem;
  }
  .ss-megamenu-disc-item {
    font-family: ${FONTS.body}; font-size: 0.9375rem; text-align: left;
    color: rgba(255,255,255,0.6); background: none; border: none; cursor: pointer;
    padding: 0.35rem 0; transition: color 0.25s ease;
  }
  .ss-megamenu-disc-item:hover, .ss-megamenu-disc-item.is-active { color: ${COLORS.cyan}; }

  .ss-megamenu-preview {
    position: relative; border-radius: 2px; overflow: hidden; height: 26rem;
    background: ${COLORS.inkElevated}; opacity: 0;
    transition: opacity 0.5s 0.15s ${easeSmooth};
  }
  .ss-megamenu.is-open .ss-megamenu-preview { opacity: 1; }
  .ss-megamenu-preview img {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
    opacity: 0; transform: scale(1.04); transition: opacity 0.6s ease, transform 6s ease;
  }
  .ss-megamenu-preview img.is-active { opacity: 1; transform: scale(1); }
  .ss-megamenu-preview-scrim {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(180deg, rgba(11,15,20,0) 45%, rgba(11,15,20,0.9) 100%);
  }
  .ss-megamenu-preview-caption {
    position: absolute; left: 1.5rem; right: 1.5rem; bottom: 1.5rem; z-index: 2;
    font-family: ${FONTS.mono}; font-size: 0.6875rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(255,255,255,0.85);
  }

  .ss-pill-nav { opacity: 0; visibility: hidden; transition: opacity 0.4s ease; }
  .ss-pill-nav.is-visible { opacity: 1; visibility: visible; }
  .ss-pill-bar {
    position: absolute; top: 0.2rem; left: 0.2rem;
    height: calc(100% - 0.4rem); background: ${COLORS.cyan};
    border-radius: 1px; z-index: 0; will-change: transform, width;
    transition: transform 0.33s cubic-bezier(0.65,0,0.35,1), width 0.33s cubic-bezier(0.65,0,0.35,1);
  }
  .ss-pill-item {
    position: relative; z-index: 1; flex-shrink: 0; padding: 0.72rem 1.1rem;
    font-family: ${FONTS.mono}; font-size: 0.625rem; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    background: none; border: none; cursor: pointer;
    transition: color 0.33s ease; white-space: nowrap;
  }

  .ss-slider { display: flex; overflow: scroll hidden; -ms-overflow-style: none; scrollbar-width: none; user-select: none; }
  .ss-slider::-webkit-scrollbar { display: none; }
  .ss-slider.is-dragging { cursor: grabbing; }

  .ss-card { flex-shrink: 0; width: calc(100vw - 3rem); cursor: pointer; }
  @media (min-width: 768px) { .ss-card { width: 21rem; } }
  .ss-card-inner { transition: transform 0.3s ${easeSmooth}, border-color 0.3s ease; }
  .ss-card:hover .ss-card-inner { transform: translateY(-4px); border-color: ${COLORS.cyan} !important; }
  .ss-card:hover .ss-card-arrow { transform: translate(2px,-2px); }
  .ss-card-arrow { transition: transform 0.25s ${easeSmooth}; }
.ss-media-box {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 2px;
  background: ${COLORS.inkElevated};
}
.ss-media-box img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
  .ss-hide-mobile { display: block; }
  .ss-hide-desktop { display: none; }
  @media (max-width: 767px) {
    .ss-hide-mobile { display: none !important; }
    .ss-hide-desktop { display: block !important; }
  }


  .ss-hero-full {
    position: relative;
    height: 100vh;
    min-height: 38rem;
    overflow: hidden;
    background: ${COLORS.ink} no-repeat center / cover;
  }
  .ss-hero-scrim {
    position: absolute; inset: 0; z-index: 2;
    background:
      linear-gradient(100deg, rgba(11,15,20,0.94) 0%, rgba(11,15,20,0.82) 42%, rgba(11,15,20,0.5) 75%, rgba(11,15,20,0.72) 100%),
      linear-gradient(0deg, rgba(11,15,20,0.9) 0%, rgba(11,15,20,0.1) 30%, rgba(11,15,20,0.1) 70%, rgba(11,15,20,0.9) 100%);
  }
  .ss-hero-grid-overlay {
    position: absolute; inset: 0; z-index: 3; pointer-events: none; opacity: 0.16;
    background-image:
      linear-gradient(${COLORS.cyan} 1px, transparent 1px),
      linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px);
    background-size: 56px 56px, 56px 56px;
    animation: gridDrift 50s linear infinite;
    -webkit-mask-image: radial-gradient(ellipse at 20% 50%, #000 0%, transparent 70%);
    mask-image: radial-gradient(ellipse at 20% 50%, #000 0%, transparent 70%);
  }
  .ss-hero-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    z-index: 0;
    transition: opacity 1.4s ${easeSmooth};
  }
  .ss-hero-slide.is-active { opacity: 1; z-index: 1; }
  .ss-hero-slide img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .ss-hero-content {
    position: absolute; inset: 0; z-index: 5;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 6.5rem 1.5rem 5rem;
  }
  .ss-hero-eyebrow {
    font-family: ${FONTS.mono}; font-size: 0.6875rem; letter-spacing: 0.22em;
    text-transform: uppercase; color: ${COLORS.cyan};
    display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .ss-hero-eyebrow::before, .ss-hero-eyebrow::after {
    content: ''; width: 1.5rem; height: 1px; background: ${COLORS.cyan}; opacity: 0.7;
  }
  .ss-hero-title {
    font-family: ${FONTS.display}; font-weight: 600;
    font-size: clamp(2.5rem, 7.5vw, 5.75rem); line-height: 1.02;
    letter-spacing: 0.01em; text-transform: uppercase; color: #011601;
    margin: 1.25rem auto 0; max-width: 22ch;
  }
  .ss-hero-subtitle {
    font-family: ${FONTS.mono}; font-size: 0.75rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgb(3, 37, 9);
    margin: 1.5rem 0 0;
  }
  .ss-hero-cta-row {
    margin-top: 2.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
  }
  .ss-hero-dots {
    display: flex; gap: 0.6rem; align-items: center;
  }
  .ss-hero-dot {
    width: 0.4rem; height: 0.4rem; border-radius: 50%; border: none; padding: 0;
    background: rgba(255,255,255,0.35); cursor: pointer;
    transition: background 0.25s ease, transform 0.25s ease;
  }
  .ss-hero-dot.is-active { background: ${COLORS.cyan}; transform: scale(1.6); }
.ss-hero-wordmark {
    position: absolute; top: 8%; left: 0; right: 0; z-index: 1;
    display: flex; justify-content: center; overflow: hidden; pointer-events: none;
  }
  .ss-hero-wordmark-text {
    font-family: ${FONTS.display}; font-weight: 700; text-transform: uppercase;
    font-size: clamp(3rem, 11vw, 9.5rem); line-height: 1; letter-spacing: 0.02em;
    color: rgba(255, 105, 35, 0.1); white-space: nowrap;
  }

  /* ── Split hero layout: glowing copy on the left, floating cutout render on the right ── */
  .ss-hero-split {
    position: absolute; inset: 0; z-index: 5;
    display: grid; grid-template-columns: 1.15fr 1fr; align-items: center;
    gap: 2.5rem; max-width: 84rem; margin: 0 auto;
    padding: 7.5rem 3rem 8rem;
  }
  .ss-hero-copy-v2 {
    text-align: left; animation: slideUp 0.7s ${easeSmooth} both;
  }
  .ss-hero-accent-line {
    display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;
  }
  .ss-hero-accent-line span:first-child {
    width: 2.5rem; height: 2px; background: ${COLORS.cyan};
    box-shadow: 0 0 8px ${COLORS.cyan};
  }
  .ss-hero-title-pop {
    font-family: ${FONTS.display}; font-weight: 700;
    font-size: clamp(2.75rem, 6.4vw, 5.5rem); line-height: 0.98;
    letter-spacing: -0.01em; text-transform: uppercase; color: #fff;
    margin: 0 0 1.1rem; max-width: 15ch;
    text-shadow:
      0 0 18px rgba(244,121,30,0.5),
      0 0 46px rgba(244,121,30,0.28),
      0 6px 26px rgba(0,0,0,0.55);
  }
  .ss-hero-subtitle-v2 {
    font-family: ${FONTS.mono}; font-size: 0.75rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: ${COLORS.cyan}; margin: 0 0 1.25rem;
  }
  .ss-hero-copy-sub-v2 {
    font-family: ${FONTS.body}; font-size: 0.9375rem; line-height: 1.7;
    color: rgba(255,255,255,0.68); max-width: 40ch; margin: 0 0 2.25rem;
  }

  .ss-hero-graphic-wrap {
    position: relative; height: 28rem; display: flex; align-items: center; justify-content: center;
  }
  .ss-hero-graphic-wrap::before {
    content: ''; position: absolute; inset: -12%; z-index: 0;
    background: radial-gradient(circle, rgba(244,121,30,0.32) 0%, rgba(244,121,30,0) 68%);
    filter: blur(6px);
    animation: heroGlowPulse 5s ease-in-out infinite;
  }
  .ss-hero-graphic {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;
    opacity: 0; transform: scale(0.94); z-index: 1;
    transition: opacity 1s ${easeSmooth}, transform 1.2s ${easeSmooth};
    filter: drop-shadow(0 24px 40px rgba(0,0,0,0.55)) drop-shadow(0 0 26px rgba(244,121,30,0.25));
  }
  .ss-hero-graphic.is-active {
    opacity: 1; transform: scale(1);
    animation: heroFloat 7s ease-in-out infinite;
  }
  .ss-hero-graphic-wrap .ss-corner::before,
  .ss-hero-graphic-wrap .ss-corner::after { background: ${COLORS.cyan}; }

  .ss-hero-bottom-row {
    position: absolute; left: 0; right: 0; bottom: 2.5rem; z-index: 6;
    display: flex; align-items: center; justify-content: center;
    gap: 1.5rem; padding: 0 2.5rem;
  }
  .ss-hero-copy { max-width: 34rem; text-align: left; }
  .ss-hero-copy-heading {
    font-family: ${FONTS.display}; font-weight: 600;
    font-size: clamp(1.85rem, 4.2vw, 3rem); line-height: 1.08;
    text-transform: uppercase; color: #ac5605; margin: 0.75rem 0 1rem;
  }
  .ss-hero-copy-sub {
    font-family: ${FONTS.body}; font-size: 0.9375rem; line-height: 1.65;
    color: rgb(15, 39, 1); max-width: 42ch; margin: 0 0 1.75rem;
  }

  .ss-hero-right-col { display: flex; flex-direction: column; align-items: flex-end; gap: 1rem; }
  .ss-hero-nav-arrows { display: flex; gap: 0.6rem; }
  .ss-hero-arrow-btn {
    width: 2.75rem; height: 2.75rem; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.28);
    color: #fff; cursor: pointer; backdrop-filter: blur(6px);
    transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  }
  .ss-hero-arrow-btn:hover { background: rgba(244,121,30,0.18); border-color: ${COLORS.cyan}; transform: scale(1.06); }

  .ss-hero-thumbs { display: flex; gap: 0.75rem; }
  .ss-hero-thumb {
    width: 6rem; height: 4.25rem; border-radius: 4px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.18); cursor: pointer; padding: 0.4rem;
    background: rgba(255,255,255,0.05); backdrop-filter: blur(4px);
    opacity: 0.55; transition: opacity 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  }
  .ss-hero-thumb img { width: 100%; height: 100%; object-fit: contain; display: block; }
  .ss-hero-thumb.is-active { opacity: 1; border-color: ${COLORS.cyan}; transform: translateY(-4px); }

  @media (max-width: 900px) {
    .ss-hero-split { grid-template-columns: 1fr; padding: 8.5rem 1.5rem 11rem; text-align: center; }
    .ss-hero-copy-v2 { text-align: center; }
    .ss-hero-accent-line { justify-content: center; }
    .ss-hero-title-pop, .ss-hero-copy-sub-v2 { max-width: 28ch; margin-left: auto; margin-right: auto; }
    .ss-hero-graphic-wrap { height: 15rem; margin-top: 1.5rem; }
  }
  @media (max-width: 640px) {
    .ss-hero-bottom-row { flex-direction: column; gap: 1rem; bottom: 1.5rem; }
    .ss-hero-thumbs { display: none; }
  }
  /* overlay pages */
  .ss-overlay { position: fixed; inset: 0; z-index: 9000; overflow-y: auto; overflow-x: hidden; background: ${COLORS.ink}; animation: fadeIn 0.4s ${easeSmooth} both; }
  .ss-overlay-hero { position: relative; width: 100%; height: 68vh; min-height: 26rem; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
  .ss-overlay-hero video, .ss-overlay-hero .ss-fallback { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; z-index: 0; }
  .ss-overlay-hero-scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(11,15,20,0.2) 0%, rgba(11,15,20,0.65) 60%, rgba(11,15,20,0.96) 100%); }
  .ss-overlay-hero-content { position: relative; z-index: 2; padding: 0 1.5rem 3.5rem; max-width: 62rem; margin: 0 auto; width: 100%; animation: slideUp 0.6s 0.1s ${easeSmooth} both; }
  .ss-overlay-body { position: relative; z-index: 2; background: ${COLORS.paper}; animation: fadeIn 0.5s 0.2s ${easeSmooth} both; }
  .ss-overlay-close {
    position: fixed; top: 1rem; right: 1.25rem; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    width: 2.5rem; height: 2.5rem; background: rgba(11,15,20,0.55);
    backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.25); border-radius: 50%;
    cursor: pointer; color: #fff; transition: transform 0.2s ease, background 0.2s ease;
  }
  .ss-overlay-close:hover { transform: scale(1.08); background: rgba(11,15,20,0.85); }

  .ss-section { padding: 4.5rem 1.5rem; border-bottom: 1px solid ${COLORS.paperLine}; }
  .ss-section:last-child { border-bottom: none; }
  .ss-section-inner { max-width: 54rem; margin: 0 auto; }
  .ss-eyebrow { font-family: ${FONTS.mono}; font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; color: ${COLORS.cyanDim}; margin-bottom: 0.75rem; }
  .ss-heading { font-family: ${FONTS.display}; font-weight: 700; font-size: clamp(1.75rem, 4vw, 3rem); line-height: 1.02; text-transform: uppercase; color: ${COLORS.graphite}; margin: 0 0 1.25rem; }
  .ss-body { font-family: ${FONTS.body}; font-size: 0.9375rem; line-height: 1.7; color: #444; max-width: 62ch; }
  .ss-dark-section { background: ${COLORS.amber}; color: #fff; }
  .ss-dark-section .ss-heading { color: #fff; }
  .ss-dark-section .ss-body { color: rgba(255,255,255,0.72); }

  .ss-bullet-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 0.9rem; margin-top: 2rem; }
  .ss-bullet {
    display: flex; align-items: flex-start; gap: 0.75rem;
    font-family: ${FONTS.body}; font-size: 0.8125rem; line-height: 1.5;
    padding: 0.9rem 1rem; border: 1px solid rgba(28,35,44,0.12); border-radius: 2px;
  }
  .ss-dark-section .ss-bullet { border-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.85); }
  .ss-bullet-code { font-family: ${FONTS.mono}; font-size: 0.625rem; color: ${COLORS.ink}; flex-shrink: 0; padding-top: 0.1rem; }
  .ss-dark-section .ss-bullet-code { color: ${COLORS.ink}; }

  /* gallery of extra reference images shown per service inside a category page */
  .ss-gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: 0.75rem; margin-top: 1.75rem; }
  .ss-gallery-item { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: 2px; background: ${COLORS.inkElevated}; }
  .ss-gallery-item img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ${easeSmooth}; }
  .ss-gallery-item:hover img { transform: scale(1.05); }

  /* process / about / stats sections */
  .ss-process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1.25rem; margin-top: 3rem; }
  .ss-process-step { position: relative; padding: 0 1.5rem 2rem; text-align: center; }
  .ss-process-num {
    font-family: ${FONTS.display}; font-weight: 700; font-size: 2.5rem;
    color: ${COLORS.cyanDim}; line-height: 1; margin: 0 auto 1rem; opacity: 0.85;
  }
  .ss-process-title {
    font-family: ${FONTS.display}; font-weight: 600; font-size: 1.125rem;
    text-transform: uppercase; letter-spacing: 0.01em; margin: 0 0 0.6rem;
  }
  .ss-process-desc { font-family: ${FONTS.body}; font-size: 0.8125rem; line-height: 1.6; color: rgba(255,255,255,0.65); margin: 0; }

  /* Lifecycle section (five-stage PMO diagram + text) */
  .ss-lifecycle-wrap {
    display: grid; grid-template-columns: minmax(16rem, 26rem) 1fr; gap: 3.5rem;
    align-items: center; max-width: 68rem; margin: 3rem auto 0; text-align: left;
  }
  @media (max-width: 800px) { .ss-lifecycle-wrap { grid-template-columns: 1fr; } }
  .ss-lifecycle-img { width: 100%; height: auto; display: block; }
  .ss-lifecycle-list { display: flex; flex-direction: column; gap: 1.25rem; }
  .ss-lifecycle-item { display: flex; gap: 1rem; align-items: flex-start; }
  .ss-lifecycle-num {
    font-family: ${FONTS.display}; font-weight: 700; font-size: 1rem;
    color: ${COLORS.graphite}; border: 1px solid ${COLORS.paperLine}; border-radius: 50%;
    width: 2.1rem; height: 2.1rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  }
  .ss-lifecycle-item-title { font-family: ${FONTS.display}; font-weight: 600; font-size: 1rem; text-transform: uppercase; margin: 0 0 0.3rem; color: ${COLORS.graphite}; }
  .ss-lifecycle-item-desc { font-family: ${FONTS.body}; font-size: 0.8125rem; line-height: 1.6; color: ${COLORS.muted}; margin: 0; }

  /* Mission / Vision / Values */
  .ss-mvv-wrap {
    display: grid; grid-template-columns: 1fr minmax(14rem, 22rem); gap: 3rem;
    align-items: center; max-width: 68rem; margin: 3.5rem auto 0; text-align: left;
  }
  @media (max-width: 800px) { .ss-mvv-wrap { grid-template-columns: 1fr; } }
  .ss-mvv-img { width: 100%; height: auto; display: block; }
  .ss-mvv-list { display: flex; flex-direction: column; gap: 1.5rem; }
  .ss-mvv-title { font-family: ${FONTS.display}; font-weight: 700; font-size: 1.125rem; text-transform: uppercase; color: ${COLORS.cyanDim}; margin: 0 0 0.4rem; }
  .ss-mvv-desc { font-family: ${FONTS.body}; font-size: 0.875rem; line-height: 1.65; color: ${COLORS.muted}; margin: 0; }

  /* ── Full-bleed section background (Rolls-Royce "section-bg-wrapper" style) ──
     A single photograph pinned behind the whole section with a dark scrim;
     content sits above it in its own stacking context. Set the image via
     the --bg-img custom property on the element. */
  .ss-section-bg-wrapper { position: relative; isolation: isolate; overflow: hidden; }
  .ss-section-bg-wrapper::before {
    content: ''; position: absolute; inset: 0; z-index: -2;
    background-image: var(--bg-img); background-size: cover; background-position: center;
    transform: scale(1.02);
  }
  .ss-section-bg-wrapper::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background:
      linear-gradient(180deg, rgba(11,15,20,0.88) 0%, rgba(11,15,20,0.94) 45%, rgba(11,15,20,0.98) 100%);
  }

  /* Process cards rendered as glass panels on top of the section background,
     each carrying its own small photo strip + scrim (RRMC card treatment). */
  .ss-process-step--image {
    padding: 0; border-radius: 2px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(2px);
    display: flex; flex-direction: column;
    transition: border-color 0.3s ease, transform 0.3s ${easeSmooth};
  }
  .ss-process-step--image:hover { border-color: ${COLORS.cyan}; transform: translateY(-3px); }
  .ss-process-step--image .ss-process-step-media {
    position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden;
  }
  .ss-process-step--image .ss-process-step-media img {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .ss-process-step--image .ss-process-step-media::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(11,15,20,0) 55%, rgba(11,15,20,0.85) 100%);
  }
  .ss-process-step--image .ss-process-num {
    position: absolute; top: 0.9rem; left: 0.9rem; z-index: 2; margin: 0;
    font-size: 1.5rem; color: #fff; opacity: 1;
    -webkit-text-stroke: 1px ${COLORS.cyan};
  }
  .ss-process-step--image .ss-process-step-body { padding: 1.5rem; text-align: left; }
  .ss-process-step--image .ss-process-title { margin-bottom: 0.5rem; }

  .ss-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: 2rem; margin-top: 3rem; text-align: center; }
  .ss-stat-num { font-family: ${FONTS.display}; font-weight: 700; font-size: clamp(2rem, 4vw, 3rem); color: ${COLORS.cyan}; line-height: 1; }
  .ss-stat-label { font-family: ${FONTS.mono}; font-size: 0.6875rem; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-top: 0.6rem; }

  .ss-value-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 1.5rem; margin-top: 2.5rem; }
  .ss-value-card { border: 1px solid ${COLORS.paperLine}; border-radius: 2px; padding: 1.75rem; }
  .ss-value-title { font-family: ${FONTS.display}; font-weight: 600; font-size: 1.0625rem; text-transform: uppercase; color: ${COLORS.graphite}; margin: 0.9rem 0 0.5rem; }
  .ss-value-desc { font-family: ${FONTS.body}; font-size: 0.8125rem; line-height: 1.6; color: ${COLORS.muted}; margin: 0; }
/* Trust / accreditation strip */
  .ss-trust-strip {
    display: flex; align-items: center; justify-content: center;
    gap: 3rem; flex-wrap: wrap; margin-top: 3rem;
    padding-top: 2.5rem; border-top: 1px solid ${COLORS.paperLine};
  }
  .ss-trust-item {
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
    font-family: ${FONTS.mono}; font-size: 0.6875rem; letter-spacing: 0.06em;
    text-transform: uppercase; color: ${COLORS.muted}; text-align: center;
  }
  .ss-trust-item strong {
    font-family: ${FONTS.display}; font-size: 0.9375rem; text-transform: none;
    letter-spacing: 0; color: ${COLORS.graphite};
  }

  /* Contact details section */
  .ss-contact-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 2rem; margin-top: 3rem; text-align: left;
  }
  .ss-contact-card {
    padding: 1.75rem; border: 1px solid rgba(255,255,255,0.14); border-radius: 2px;
  }
  .ss-contact-label {
    font-family: ${FONTS.mono}; font-size: 0.625rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${COLORS.cyan}; margin: 0 0 0.6rem;
  }
  .ss-contact-value {
    font-family: ${FONTS.body}; font-size: 0.9375rem; line-height: 1.6;
    color: #fff; margin: 0;
  }
  .ss-contact-value a { color: #fff; text-decoration: none; }
  .ss-contact-value a:hover { color: ${COLORS.cyan}; }
  /* Section headings centred sitewide */
  .ss-section-head { text-align: center; margin-left: auto; margin-right: auto; }
  .ss-section-head .ss-eyebrow { justify-content: center; }
  .ss-section-head h2, .ss-section-head h3 { margin-left: auto; margin-right: auto; }

  /* ── Reveal footer (minimal "Carbon" style) ──
     The page wrapper carries a bottom margin equal to the footer height;
     the footer itself is fixed beneath it and surfaces as the page scrolls
     past the end of the content. */
  .ss-page-wrap { position: relative; z-index: 1; }
  .ss-reveal-footer {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    height: ${FOOTER_HEIGHT};
    z-index: 0;
    background: ${COLORS.paper};
    color: ${COLORS.graphite};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top: 1px solid ${COLORS.paperLine};
  }
  .ss-cf-inner {
    width: 100%;
    max-width: 68rem;
    margin: 0 auto;
    padding: 3rem 2rem 2.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }

  /* brand row: hairline — wordmark — hairline */
  .ss-cf-brand-row {
    display: flex; align-items: center; gap: 1.75rem;
    width: 100%; max-width: 40rem;
  }
  .ss-cf-brand-line { flex: 1 1 auto; height: 1px; background: ${COLORS.paperLine}; }
  .ss-cf-brand { text-align: center; flex-shrink: 0; }
  .ss-cf-wordmark {
    font-family: ${FONTS.display}; font-weight: 700;
    font-size: clamp(1.125rem, 2.2vw, 1.375rem);
    letter-spacing: 0.36em; text-transform: uppercase;
    color: ${COLORS.graphite}; margin: 0; padding-right: 0.36em;
  }
  .ss-cf-tagline {
    font-family: ${FONTS.mono}; font-size: 0.625rem; letter-spacing: 0.24em;
    text-transform: uppercase; color: ${COLORS.muted}; margin: 0.4rem 0 0;
  }

  /* three-column row: links | social + newsletter | links */
  .ss-cf-row {
    width: 100%; display: flex; align-items: flex-start; justify-content: space-between;
    gap: 2.5rem; flex-wrap: wrap;
  }
  .ss-cf-col {
    display: flex; flex-direction: column; gap: 0.55rem;
    flex: 1 1 10rem; min-width: 9rem;
  }
  .ss-cf-col.left { align-items: flex-start; text-align: left; }
  .ss-cf-col.right { align-items: flex-end; text-align: right; }
  .ss-cf-col a, .ss-cf-col button {
    font-family: ${FONTS.mono}; font-size: 0.6875rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${COLORS.muted};
    text-decoration: none; background: none; border: none; cursor: pointer; padding: 0;
    transition: color 0.2s ease;
  }
  .ss-cf-col a:hover, .ss-cf-col button:hover { color: ${COLORS.cyanDim}; }

  .ss-cf-center {
    flex: 1 1 16rem; display: flex; flex-direction: column; align-items: center; gap: 1.25rem;
  }
  .ss-cf-social { display: flex; align-items: center; gap: 1.5rem; }
  .ss-cf-social a {
    display: flex; color: ${COLORS.graphite}; transition: color 0.2s ease, transform 0.2s ease;
  }
  .ss-cf-social a:hover { color: ${COLORS.cyanDim}; transform: translateY(-1px); }
  .ss-cf-divider { width: 1px; height: 1.5rem; background: ${COLORS.paperLine}; }
  .ss-cf-newsletter-label {
    font-family: ${FONTS.mono}; font-weight: 500; font-size: 0.6875rem;
    letter-spacing: 0.22em; text-transform: uppercase; color: ${COLORS.graphite}; margin: 0;
  }
  .ss-cf-subscribe {
    display: flex; align-items: stretch; width: 100%; max-width: 22rem;
    border: 1px solid ${COLORS.graphite};
  }
  .ss-cf-subscribe input {
    flex: 1; min-width: 0; border: none; background: none; outline: none;
    padding: 0.7rem 0.9rem; font-family: ${FONTS.mono}; font-size: 0.6875rem;
    letter-spacing: 0.08em; text-transform: uppercase; color: ${COLORS.graphite};
  }
  .ss-cf-subscribe input::placeholder { color: ${COLORS.muted}; }
  .ss-cf-subscribe button {
    flex-shrink: 0; border: none; border-left: 1px solid ${COLORS.graphite};
    background: none; cursor: pointer; padding: 0.7rem 1.1rem;
    font-family: ${FONTS.mono}; font-size: 0.6875rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; color: ${COLORS.graphite};
    transition: background 0.2s ease, color 0.2s ease;
  }
  .ss-cf-subscribe button:hover { background: ${COLORS.graphite}; color: #fff; }

  .ss-cf-legal {
    font-family: ${FONTS.mono}; font-size: 0.625rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${COLORS.muted};
  }

  @media (max-width: 720px) {
    .ss-cf-row { justify-content: center; text-align: center; }
    .ss-cf-col, .ss-cf-col.left, .ss-cf-col.right { align-items: center; text-align: center; }
    .ss-cf-center { order: -1; }
  }
`;

const HamburgerIcon = ({ open }) => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
    {open ? (
      <>
        <line
          x1="1"
          y1="1"
          x2="17"
          y2="13"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="13"
          x2="17"
          y2="1"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <line
          x1="1"
          y1="1"
          x2="17"
          y2="1"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="7"
          x2="17"
          y2="7"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="13"
          x2="17"
          y2="13"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);
const RuinsIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* tower body */}
    <path
      d="M9 21 L9.9 4.6 C10 3 14 3 14.1 4.6 L15 21 Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    {/* coursed stone lines across the tower */}
    <path d="M9.25 17.5 L14.75 17.5" stroke={color} strokeWidth="1" />
    <path d="M9.45 14 L14.55 14" stroke={color} strokeWidth="1" />
    <path d="M9.65 10.5 L14.35 10.5" stroke={color} strokeWidth="1" />
    <path d="M9.8 7.3 L14.2 7.3" stroke={color} strokeWidth="1" />
    {/* base wall */}
    <path
      d="M4 21 L20 21"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M5.5 21 L5.5 18.4 L18.5 18.4 L18.5 21"
      stroke={color}
      strokeWidth="1.2"
    />
  </svg>
);
const FacebookIcon = ({
  size = 17,
  strokeWidth = 1.6,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.2l.8-4H14V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = ({
  size = 17,
  strokeWidth = 1.6,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({
  size = 17,
  strokeWidth = 1.6,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
// ─── Drag-scroll hook ───────────────────────────────────────────────────────
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
      const walk = (x - drag.current.startX) * 1.4;
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

// ─── Category overlay (full-screen page per tab) ───────────────────────────
function CategoryOverlay({ categoryIndex, onClose }) {
  const category = CATEGORIES[categoryIndex];
  const services = SERVICES.filter((s) => s.category === categoryIndex);
  const videoSrc = CATEGORY_VIDEO[categoryIndex];
  const imageSrc = category && category.image;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="ss-overlay">
      <button className="ss-overlay-close" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>

      <div className="ss-overlay-hero">
        {videoSrc ? (
          <video autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={category.label + " image"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className="ss-fallback ss-blueprint-bg" />
        )}
        <div className="ss-overlay-hero-scrim" />
        <div className="ss-overlay-hero-content">
          <p className="ss-tag" style={{ marginBottom: "1rem" }}>
            Category {String(categoryIndex + 1).padStart(2, "0")} / 03
          </p>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 7vw, 5rem)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "#fff",
              margin: 0,
            }}
          >
            {category.label}
          </h1>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.75)",
              marginTop: "1rem",
              maxWidth: "38ch",
              lineHeight: 1.6,
            }}
          >
            {category.tagline}
          </p>
        </div>
      </div>

      <div className="ss-overlay-body">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const dark = i % 2 === 1;
          return (
            <div
              key={svc.code}
              className={`ss-section ${dark ? "ss-dark-section" : ""}`}
            >
              <div className="ss-section-inner">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "2px",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(28,35,44,0.15)"}`,
                      color: COLORS.cyanDim,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="ss-eyebrow" style={{ margin: 0 }}>
                    {svc.code}
                  </span>
                </div>
                <h2
                  className="ss-heading"
                  style={{ textAlign: "center", margin: "0 auto 1.25rem" }}
                >
                  {svc.name}
                </h2>
                <p className="ss-body" style={{ textAlign: "left", margin: 0 }}>
                  {svc.blurb}
                </p>
                {svc.description && (
                  <p
                    className="ss-body"
                    style={{ textAlign: "left", margin: "0.9rem 0 0" }}
                  >
                    {svc.description}
                  </p>
                )}
                <div className="ss-bullet-grid">
                  {svc.bullets.map((b, bi) => (
                    <div key={bi} className="ss-bullet">
                      <span className="ss-bullet-code">
                        {String(bi + 1).padStart(2, "0")}
                      </span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                {svc.images && svc.images.length > 0 && (
                  <div className="ss-gallery-grid">
                    {svc.images.map((img, gi) => (
                      <div key={gi} className="ss-gallery-item">
                        <img
                          src={img}
                          alt={`${svc.name} reference ${gi + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="ss-section" style={{ textAlign: "center" }}>
          <p className="ss-eyebrow" style={{ textAlign: "center" }}>
            SmartStruct
          </p>
          <h2 className="ss-heading" style={{ margin: "0.5rem 0 2rem" }}>
            Ready to Scope This In?
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              className="ss-btn ss-btn-solid"
              onClick={onClose}
            >
              Start a project <ArrowUpRight size={14} />
            </a>
            <button className="ss-btn ss-btn-dark" onClick={onClose}>
              Back to site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function SmartStructSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [overlayCategory, setOverlayCategory] = useState(null); // null | 0 | 1 | 2
  const [heroSlide, setHeroSlide] = useState(0);
  const [pillVisible, setPillVisible] = useState(false);

  const navPillRef = useRef(null);
  const navBarRef = useRef(null);
  const itemRefs = useRef([]);
  const sliderRef = useRef(null);
  const slider = useDragScroll(sliderRef);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ss-cookie-prefs");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          null;
        }
      }
    }

    return {
      necessary: true,
      analytics: true,
      marketing: false,
    };
  });

  const saveCookiePrefs = (prefs) => {
    setCookiePrefs(prefs);
    localStorage.setItem("ss-cookie-prefs", JSON.stringify(prefs));
    setCookieModalOpen(false);
  };
  useEffect(() => {
    document.body.style.overflow =
      overlayCategory !== null || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayCategory, menuOpen]);

  useEffect(() => {
    const id = setInterval(
      () => setHeroSlide((i) => (i + 1) % HERO_SLIDES.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setPillVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const positionBar = useCallback((index) => {
    const pill = navPillRef.current;
    const item = itemRefs.current[index];
    const bar = navBarRef.current;
    if (!pill || !item || !bar) return;
    const pillRect = pill.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    bar.style.transform = `translateX(${itemRect.left - pillRect.left}px)`;
    bar.style.width = `${itemRect.width}px`;
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => positionBar(activeTab));
    return () => cancelAnimationFrame(id);
  }, [activeTab, positionBar, pillVisible]);

  useEffect(() => {
    const onResize = () => positionBar(activeTab);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab, positionBar]);

  const openCategory = (index) => {
    setActiveTab(index);
    setOverlayCategory(index);
  };
  const closeOverlay = () => setOverlayCategory(null);
  const prevHeroSlide = () =>
    setHeroSlide((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextHeroSlide = () => setHeroSlide((i) => (i + 1) % HERO_SLIDES.length);
  const categoryPreview = (index) =>
    (SERVICES.find((s) => s.category === index) || {}).image;

  // Mega-menu preview: discipline hover takes priority, falls back to the hovered nav link.
  const [hoveredDiscipline, setHoveredDiscipline] = useState(null);
  const megaPreviewCaption =
    hoveredDiscipline !== null
      ? CATEGORIES[hoveredDiscipline].label
      : NAV_LINKS[hoveredNav]?.label;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      {overlayCategory !== null && (
        <CategoryOverlay
          categoryIndex={overlayCategory}
          onClose={closeOverlay}
        />
      )}

      <div
        id="top"
        className="ss-page-wrap"
        style={{
          fontFamily: FONTS.body,
          background: COLORS.paper,
          color: COLORS.graphite,
          overflowX: "hidden",
          maxWidth: "100vw",
          WebkitFontSmoothing: "antialiased",
          marginBottom: FOOTER_HEIGHT,
        }}
      >
        {/* ── NAV ── */}
        <div className="ss-topbar-strip" aria-hidden="true" />
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10003,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.1rem 1.5rem",
            pointerEvents: "none",
          }}
        >
          <a
            href="#top"
            className="ss-nav-link"
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              background: "#ffffff00",
              borderRadius: "6px",
              padding: "0.35rem 0.75rem",
            }}
          >
            <img
              src={logo}
              alt="SmartStruct"
              style={{ height: "6.75rem", display: "block" }}
            />
          </a>
          <button
            className="ss-menu-trigger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="ss-menu-trigger-label">
              {menuOpen ? "Close" : "Menu"}
            </span>
            <span className="ss-menu-trigger-icon">
              <HamburgerIcon open={menuOpen} />
            </span>
          </button>
        </nav>

        {/* ── Full-screen expanding mega-menu (Rolls-Royce style) ── */}
        <div
          className={`ss-megamenu ${menuOpen ? "is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!menuOpen}
        >
          <button
            className="ss-overlay-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>

          <div className="ss-megamenu-grid">
            <div className="ss-megamenu-links">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`ss-megamenu-item ${hoveredNav === i && hoveredDiscipline === null ? "is-active" : ""}`}
                  onMouseEnter={() => {
                    setHoveredNav(i);
                    setHoveredDiscipline(null);
                  }}
                  onFocus={() => {
                    setHoveredNav(i);
                    setHoveredDiscipline(null);
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="ss-megamenu-item-title">{link.label}</span>
                  <span className="ss-megamenu-item-sub">{link.sub}</span>
                </a>
              ))}

              <div className="ss-megamenu-disciplines">
                <p className="ss-megamenu-disc-label">Disciplines</p>
                {CATEGORIES.map((c, i) => (
                  <button
                    key={c.key}
                    className={`ss-megamenu-disc-item ${hoveredDiscipline === i ? "is-active" : ""}`}
                    onMouseEnter={() => setHoveredDiscipline(i)}
                    onFocus={() => setHoveredDiscipline(i)}
                    onClick={() => {
                      setMenuOpen(false);
                      openCategory(i);
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ss-megamenu-preview">
              {NAV_LINKS.map((link, i) => (
                <img
                  key={link.label}
                  src={link.preview}
                  alt={link.label}
                  className={
                    hoveredDiscipline === null && hoveredNav === i
                      ? "is-active"
                      : ""
                  }
                />
              ))}
              {CATEGORIES.map((c, i) => (
                <img
                  key={c.key}
                  src={categoryPreview(i)}
                  alt={c.label}
                  className={hoveredDiscipline === i ? "is-active" : ""}
                />
              ))}
              <div className="ss-megamenu-preview-scrim" />
              <p className="ss-megamenu-preview-caption">
                {megaPreviewCaption}
              </p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM PILL TAB NAV ── */}
        <div
          style={{
            position: "fixed",
            bottom: "1.25rem",
            left: 0,
            right: 0,
            zIndex: 8000,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            ref={navPillRef}
            className={`ss-pill-nav ${pillVisible ? "is-visible" : ""}`}
            style={{
              position: "relative",
              padding: "0.2rem",
              pointerEvents: "auto",
              background: "rgba(11,15,20,0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: "2px",
              boxShadow: shadow,
              border: `1px solid ${COLORS.inkLine}`,
            }}
          >
            <div ref={navBarRef} className="ss-pill-bar" />
            <div style={{ position: "relative", display: "flex" }}>
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.key}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="ss-pill-item"
                  onClick={() => openCategory(i)}
                  style={{
                    color:
                      activeTab === i ? COLORS.ink : "rgba(255,255,255,0.7)",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── HERO ── */}
        <section
          className="ss-hero-full"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        >
          <div className="ss-hero-scrim" />
         
          <div className="ss-hero-wordmark" aria-hidden="true">
            <span className="ss-hero-wordmark-text">SmartStruct</span>
          </div>

          <div className="ss-hero-split">
            <div className="ss-hero-copy-v2" key={heroSlide}>
              <div className="ss-hero-accent-line">
                <span />
                <p className="ss-hero-eyebrow" style={{ marginBottom: 0 }}>
                  {HERO_SLIDES[heroSlide].eyebrow}
                </p>
              </div>
              <h1 className="ss-hero-title-pop">
                {HERO_SLIDES[heroSlide].title}
              </h1>
              <p className="ss-hero-subtitle-v2">
                {HERO_SLIDES[heroSlide].subtitle}
              </p>
              <p className="ss-hero-copy-sub-v2">
                {HERO_SLIDES[heroSlide].copy}
              </p>
              <div
                className="ss-hero-cta-row"
                style={{ justifyContent: "flex-start", marginTop: 0 }}
              >
                <a href="#contact" className="ss-btn ss-btn-solid">
                  Let's talk <ArrowUpRight size={14} />
                </a>
                <a
                  href="#services"
                  className="ss-btn ss-btn-ghost"
                  style={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  View our work
                </a>
              </div>
            </div>

            <div className="ss-hero-graphic-wrap">
             
              {HERO_SLIDES.map((slide, i) => (
                <img
                  key={slide.title}
                  src={slide.graphic}
                  alt={slide.title}
                  className={`ss-hero-graphic ${i === heroSlide ? "is-active" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="ss-hero-bottom-row">
            <div className="ss-hero-dots">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.title}
                  className={`ss-hero-dot ${i === heroSlide ? "is-active" : ""}`}
                  onClick={() => setHeroSlide(i)}
                  aria-label={`Show ${slide.title}`}
                />
              ))}
            </div>

            <div className="ss-hero-thumbs">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.title}
                  className={`ss-hero-thumb ${i === heroSlide ? "is-active" : ""}`}
                  onClick={() => setHeroSlide(i)}
                  aria-label={`Show ${slide.title}`}
                >
                  <img src={slide.graphic} alt={slide.title} />
                </button>
              ))}
            </div>

            <div className="ss-hero-nav-arrows">
              <button
                className="ss-hero-arrow-btn"
                onClick={prevHeroSlide}
                aria-label="Previous slide"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                className="ss-hero-arrow-btn"
                onClick={nextHeroSlide}
                aria-label="Next slide"
              >
                <ArrowUpRight
                  size={16}
                  style={{ transform: "rotate(45deg)" }}
                />
              </button>
            </div>
          </div>

          <a
            href="#intro"
            className="ss-scroll-hint ss-hide-mobile"
            style={{
              position: "absolute",
              left: "50%",
              top: "1.5rem",
              transform: "translateX(-50%)",
              zIndex: 6,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.35rem",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: "0.5625rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Scroll
            </span>
            <ArrowDown size={16} />
          </a>
        </section>

        {/* ── INTRO STATEMENT ── */}
        <section
          id="intro"
          style={{
            position: "relative",
            padding: "6rem 1.5rem 10rem",
            textAlign: "center",
            backgroundImage: `url(${blueprintLineart})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        >
          <p className="ss-eyebrow" style={{ textAlign: "center" }}>
            What we do
          </p>
          <p
            style={{
              fontFamily: FONTS.display,
              fontWeight: 600,
              fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)",
              lineHeight: 1.25,
              color: COLORS.graphite,
              maxWidth: "26ch",
              margin: "0 auto",
              textTransform: "uppercase",
              padding: "3rem 1.5rem",
              textShadow:
                "0 1px 0 #fff, 0 0 12px rgba(247,246,243,0.9), 0 0 28px rgba(247,246,243,0.9)",
            }}
          >
            Five disciplines, one integrated engineering team — from the ground
            beneath a building to the network that keeps it online.
          </p>
        </section>

        {/* ── SERVICES SLIDER ── */}
        <section
          id="services"
          style={{
            position: "relative",
            marginTop: "-6rem",
            padding: "5rem 0 7rem",
            background: "#ffffff00",
            color: "#fff",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginBottom: "3rem",
              padding: "0 1.5rem",
              gap: "0.6rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: "1.5rem",
                textTransform: "uppercase",
                color: "#000000",
              }}
            >
              Our Services
            </span>
            <span
              className="ss-eyebrow"
              style={{ margin: 0, justifyContent: "center" }}
            >
              SS-01 → SS-05
            </span>
          </div>

          <div
            ref={sliderRef}
            className="ss-slider"
            style={{ padding: "0 1.5rem 1rem", gap: "1.25rem", cursor: "grab" }}
            onPointerDown={slider.onPointerDown}
            onPointerMove={slider.onPointerMove}
            onPointerUp={slider.onPointerUp}
            onPointerLeave={slider.onPointerLeave}
          >
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.code}
                  className="ss-card"
                  onClick={() => openCategory(svc.category)}
                >
                  <div
                    className="ss-card-inner"
                    style={{
                      position: "relative",
                      border: `1px solid ${COLORS.inkLine}`,
                      borderRadius: "2px",
                      display: "flex",
                      flexDirection: "column",
                      background: COLORS.inkElevated,
                      height: "23rem",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="ss-media-box"
                      style={{
                        aspectRatio: "16 / 9",
                        borderRadius: 0,
                        flexShrink: 0,
                      }}
                    >
                      {svc.image ? (
                        <img src={svc.image} alt={svc.name} />
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <Icon
                            size={32}
                            strokeWidth={1.4}
                            color={COLORS.cyanDim}
                          />
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                        minHeight: 0,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="ss-eyebrow" style={{ margin: 0 }}>
                            {svc.code}
                          </span>
                          <Icon
                            size={20}
                            strokeWidth={1.6}
                            color={COLORS.cyan}
                          />
                        </div>
                        <h3
                          style={{
                            fontFamily: FONTS.display,
                            fontWeight: 600,
                            fontSize: "1.375rem",
                            lineHeight: 1.15,
                            textTransform: "uppercase",
                            color: "#fff",
                            margin: "1.25rem 0 0.75rem",
                          }}
                        >
                          {svc.name}
                        </h3>
                        <p
                          style={{
                            fontFamily: FONTS.body,
                            fontSize: "0.8125rem",
                            lineHeight: 1.6,
                            color: "rgba(255,255,255,0.6)",
                            margin: 0,
                          }}
                        >
                          {svc.blurb}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontFamily: FONTS.mono,
                          fontSize: "0.6875rem",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: COLORS.cyan,
                          marginTop: "1rem",
                        }}
                      >
                        View details
                        <ArrowUpRight size={13} className="ss-card-arrow" />
                      </div>
                    </div>
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

        {/* ── CATEGORY STRIP ── */}
        <section style={{ padding: "6rem 1.5rem", background: COLORS.paper }}>
          <div
            style={{
              maxWidth: "72rem",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
              gap: "1.5rem",
            }}
          >
            {CATEGORIES.map((c, i) => {
              const count = SERVICES.filter((s) => s.category === i).length;
              return (
                <button
                  key={c.key}
                  onClick={() => openCategory(i)}
                  style={{
                    textAlign: "center",
                    background: "transparent",
                    border: `1px solid ${COLORS.paperLine}`,
                    borderRadius: "2px",
                    padding: "2rem",
                    cursor: "pointer",
                    transition: `border-color 0.25s ease`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = COLORS.cyanDim)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = COLORS.paperLine)
                  }
                >
                  <span
                    className="ss-eyebrow"
                    style={{ color: COLORS.cyanDim, justifyContent: "center" }}
                  >
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")} services
                  </span>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontWeight: 700,
                      fontSize: "1.75rem",
                      textTransform: "uppercase",
                      color: COLORS.graphite,
                      margin: "0.75rem 0 0.5rem",
                    }}
                  >
                    {c.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                      color: COLORS.muted,
                      margin: 0,
                    }}
                  >
                    {c.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section
          id="process"
          className="ss-dark-section ss-section-bg-wrapper"
          style={{ padding: "6rem 1.5rem", "--bg-img": `url(${PROCESS_BG})` }}
        >
          <div
            style={{ maxWidth: "72rem", margin: "0 auto", textAlign: "center" }}
          >
            <p className="ss-eyebrow" style={{ justifyContent: "center" }}>
              How we work
            </p>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                textTransform: "uppercase",
                color: "#fff",
                margin: "0 auto",
                maxWidth: "26ch",
              }}
            >
              From First Sketch To Final Sign-Off
            </h2>
            <p
              className="ss-body"
              style={{
                color: "rgba(255,255,255,0.65)",
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              A consistent process across every discipline, so clients always
              know what stage a project is at and what happens next.
            </p>

            <div className="ss-process-grid">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="ss-process-step ss-process-step--image"
                >
                  <div className="ss-process-step-media">
                    <img src={PROCESS_IMAGES[i]} alt={step.title} />
                    <div className="ss-process-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="ss-process-step-body">
                    <h3 className="ss-process-title">{step.title}</h3>
                    <p className="ss-process-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "3.5rem",
                paddingTop: "2.5rem",
                borderTop: `1px solid ${COLORS.inkLine}`,
                textAlign: "left",
              }}
            >
              <img
                src={projectWorkflow}
                alt="Client collaboration workflow"
                style={{
                  width: "11rem",
                  height: "auto",
                  flexShrink: 0,
                  filter: "brightness(0) invert(1)",
                  opacity: 0.85,
                }}
              />
              <p
                className="ss-body"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: "38ch",
                  margin: 0,
                }}
              >
                Behind every stage sits the same loop — planning, coordinating
                the team, tracking progress against schedule and refining the
                approach as the site throws up real conditions.
              </p>
            </div>

            <div
              className="ss-stat-grid"
              style={{
                borderTop: `1px solid ${COLORS.inkLine}`,
                paddingTop: "2.5rem",
                marginTop: "3.5rem",
              }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="ss-stat-num">{s.num}</div>
                  <div className="ss-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECT DELIVERY LIFECYCLE ── */}
        <section
          id="lifecycle"
          style={{ padding: "6rem 1.5rem", background: COLORS.paper }}
        >
          <div
            className="ss-section-head"
            style={{ maxWidth: "72rem", margin: "0 auto" }}
          >
            <p className="ss-eyebrow">Project management</p>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                textTransform: "uppercase",
                color: COLORS.graphite,
                margin: "0 auto",
                maxWidth: "30ch",
              }}
            >
              The Project Delivery Lifecycle
            </h2>
            <p
              className="ss-body"
              style={{
                color: COLORS.muted,
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Every project we take on runs through the same five-stage
              lifecycle, managed by SmartStruct from scope to closure.
            </p>

            <div className="ss-lifecycle-wrap">
              <img
                className="ss-lifecycle-img"
                src={pmoLifecycle}
                alt="SmartStruct project management office lifecycle: scope definition, project planning, site construction management, project control, project closure"
              />
              <div className="ss-lifecycle-list">
                {LIFECYCLE_STAGES.map((stage, i) => (
                  <div key={stage.title} className="ss-lifecycle-item">
                    <span className="ss-lifecycle-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="ss-lifecycle-item-title">{stage.title}</h3>
                      <p className="ss-lifecycle-item-desc">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY SMARTSTRUCT ── */}
        <section
          id="about"
          style={{ padding: "6rem 1.5rem", background: COLORS.paper }}
        >
          <div
            style={{ maxWidth: "72rem", margin: "0 auto", textAlign: "center" }}
          >
            <p className="ss-eyebrow" style={{ justifyContent: "center" }}>
              Why SmartStruct
            </p>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                textTransform: "uppercase",
                color: COLORS.graphite,
                margin: "0 auto",
                maxWidth: "26ch",
              }}
            >
              Engineering That Holds Up On Site, Not Just On Paper
            </h2>
            <p
              className="ss-body"
              style={{
                color: COLORS.muted,
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              We're a multidisciplinary consulting engineering practice —
              structural, civil, water and IT specialists working from one
              table, so a project's disciplines don't drift apart between
              handoffs.
            </p>

            <div className="ss-value-grid">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className="ss-value-card"
                  style={{ textAlign: "center" }}
                >
                  <span
                    className="ss-eyebrow"
                    style={{
                      margin: 0,
                      color: COLORS.cyanDim,
                      justifyContent: "center",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="ss-value-title">{v.title}</h3>
                  <p className="ss-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: `1px solid ${COLORS.paperLine}`,
                marginTop: "3.5rem",
                paddingTop: "0.5rem",
              }}
            >
              <p
                className="ss-eyebrow"
                style={{ justifyContent: "center", marginTop: "2.5rem" }}
              >
                Mission, Vision &amp; Values
              </p>
              <div className="ss-mvv-wrap">
                <div className="ss-mvv-list">
                  {MISSION_VISION_VALUES.map((m) => (
                    <div key={m.title}>
                      <h3 className="ss-mvv-title">{m.title}</h3>
                      <p className="ss-mvv-desc">{m.desc}</p>
                    </div>
                  ))}
                </div>
                <img
                  className="ss-mvv-img"
                  src={missionVisionValues}
                  alt="SmartStruct mission, vision and values diagram"
                />
              </div>
            </div>

            <div className="ss-trust-strip">
              <div className="ss-trust-item">
                <strong>ECSA Registered</strong>
                Professional Engineers
              </div>
              <div className="ss-trust-item">
                <strong>SANS Compliant</strong>
                All Designs
              </div>
              <div className="ss-trust-item">
                <strong>10+ Years</strong>
                Combined Experience
              </div>
              <div className="ss-trust-item">
                <strong>POPIA Compliant</strong>
                Data Handling
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT / CTA ── */}
        <section
          id="contact"
          className="ss-dark-section"
          style={{
            position: "relative",
            padding: "7rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p className="ss-eyebrow" style={{ textAlign: "center" }}>
            SmartStruct
          </p>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              textTransform: "uppercase",
              color: "#fff",
              margin: "0.5rem 0 1.25rem",
            }}
          >
            Have a Project in Mind?
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "40ch",
              margin: "0 auto 1rem",
              lineHeight: 1.7,
            }}
          >
            Tell us about the site, the structure, or the system you need
            designed — we'll come back with scope, timeline and next steps.
          </p>
          <a
            href="mailto:info@smartstruct.co.za"
            className="ss-btn ss-btn-solid"
          >
            info@smartstruct.co.za <ArrowUpRight size={14} />
          </a>

          <div
            className="ss-contact-grid"
            style={{ maxWidth: "60rem", margin: "3rem auto 0" }}
          >
            <div className="ss-contact-card">
              <p className="ss-contact-label">Phone</p>
              <p className="ss-contact-value">
                <a href="tel:+27735070260">+27 73 507 0260</a>
              </p>
            </div>
            <div className="ss-contact-card">
              <p className="ss-contact-label">Office</p>
              <p className="ss-contact-value">
                I Main Street
                <br />
                Harare, Zimbabwe
              </p>
            </div>
            <div className="ss-contact-card">
              <p className="ss-contact-label">Hours</p>
              <p className="ss-contact-value">
                Mon – Fri: 08:00 – 17:00
                <br />
                Sat – Sun: Closed
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="ss-reveal-footer">
        <div className="ss-cf-inner">
          <div className="ss-cf-brand-row">
            <div className="ss-cf-brand-line" />
            <div className="ss-cf-brand">
              <img
                src={logo}
                style={{ width: "180px", height: "auto" }}
                alt="SmartStruct Logo"
              />
            </div>
            <div className="ss-cf-brand-line" />
          </div>

          <div className="ss-cf-row">
            <div className="ss-cf-col left">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms &amp; Conditions</a>
              <a href="#about">About</a>
            </div>

            <div className="ss-cf-center">
              <div className="ss-cf-social">
                <a href="#" aria-label="LinkedIn">
                  <LinkedinIcon size={17} strokeWidth={1.6} />
                </a>
                <a href="#" aria-label="Facebook">
                  <FacebookIcon size={17} strokeWidth={1.6} />
                </a>
                <a href="#" aria-label="Instagram">
                  <InstagramIcon size={17} strokeWidth={1.6} />
                </a>
              </div>

              <div className="ss-cf-divider" />

              <p className="ss-cf-newsletter-label">Project Updates</p>

              <form
                className="ss-cf-subscribe"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.currentTarget.reset();
                }}
              >
                <input type="email" placeholder="name@email.com" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>

            <div className="ss-cf-col right">
              <a href="#contact">Get A Quote</a>
              <a href="#sitemap">Site Map</a>
              <button onClick={() => setCookieModalOpen(true)}>
                Cookie Preferences
              </button>
            </div>
          </div>

          <p className="ss-cf-legal">
            © 2026 SmartStruct — All Rights Reserved
          </p>
        </div>
      </footer>

      {/* ── COOKIE ── */}
      <button
        className="ss-cookie-fab"
        onClick={() => setCookieModalOpen(true)}
        aria-label="Cookie preferences"
        style={{ position: "fixed" }}
      >
        <RuinsIcon size={50} color={COLORS.cyan} />
      </button>

      {cookieModalOpen && (
        <div
          className="ss-cookie-overlay"
          onClick={() => setCookieModalOpen(false)}
        >
          <div className="ss-cookie-modal" onClick={(e) => e.stopPropagation()}>
            <p className="ss-eyebrow" style={{ textAlign: "left" }}>
              SmartStruct
            </p>
            <h2
              className="ss-heading"
              style={{ textAlign: "left", fontSize: "1.5rem" }}
            >
              Cookie Policy
            </h2>
            <p
              className="ss-body"
              style={{ textAlign: "left", fontSize: "0.8125rem" }}
            >
              We use cookies to run this site, understand how it's used, and
              improve it over time. You can accept all cookies or manage your
              preferences below. Necessary cookies can't be switched off as
              they're required for the site to function.
            </p>

            <div style={{ marginTop: "1rem" }}>
              <div className="ss-cookie-row">
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: COLORS.graphite,
                    }}
                  >
                    Necessary
                  </div>
                  <div style={{ fontSize: "0.75rem", color: COLORS.muted }}>
                    Required for core site functionality
                  </div>
                </div>
                <button
                  className="ss-cookie-switch on"
                  style={{
                    background: COLORS.cyanDim,
                    opacity: 0.6,
                    cursor: "not-allowed",
                  }}
                  disabled
                />
              </div>

              <div className="ss-cookie-row">
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: COLORS.graphite,
                    }}
                  >
                    Analytics
                  </div>
                  <div style={{ fontSize: "0.75rem", color: COLORS.muted }}>
                    Helps us understand how visitors use the site
                  </div>
                </div>
                <button
                  className={`ss-cookie-switch ${cookiePrefs.analytics ? "on" : ""}`}
                  style={{
                    background: cookiePrefs.analytics ? COLORS.cyanDim : "#ccc",
                  }}
                  onClick={() =>
                    setCookiePrefs((p) => ({ ...p, analytics: !p.analytics }))
                  }
                />
              </div>

              <div className="ss-cookie-row">
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: COLORS.graphite,
                    }}
                  >
                    Marketing
                  </div>
                  <div style={{ fontSize: "0.75rem", color: COLORS.muted }}>
                    Used to tailor content and offers to you
                  </div>
                </div>
                <button
                  className={`ss-cookie-switch ${cookiePrefs.marketing ? "on" : ""}`}
                  style={{
                    background: cookiePrefs.marketing ? COLORS.cyanDim : "#ccc",
                  }}
                  onClick={() =>
                    setCookiePrefs((p) => ({ ...p, marketing: !p.marketing }))
                  }
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "1.75rem",
                flexWrap: "wrap",
              }}
            >
              <button
                className="ss-btn ss-btn-solid"
                onClick={() =>
                  saveCookiePrefs({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                  })
                }
              >
                Accept All
              </button>
              <button
                className="ss-btn ss-btn-dark"
                onClick={() =>
                  saveCookiePrefs({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                  })
                }
              >
                Reject Non-Essential
              </button>
              <button
                className="ss-btn ss-btn-ghost"
                style={{
                  color: COLORS.graphite,
                  borderColor: COLORS.paperLine,
                }}
                onClick={() => saveCookiePrefs(cookiePrefs)}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
