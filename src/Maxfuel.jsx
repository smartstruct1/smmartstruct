import { useState, useEffect, useRef, useCallback } from "react";
import heroVideo from "./assets/dc-hero.mp4";
import { Link } from "react-router-dom";
import heroVideo1 from "./assets/globe.mp4";
import bottleImage from "./assets/pump.png";
import sparkImage from "./assets/spark.png";
import splashImage from "./assets/splash.png";
import engineImage from "./assets/engine.png";
import mapDefault from "./assets/c95-map-bg-default-v2.jpg";
import mapDefaultPng from "./assets/c95-map-bg-default-v2.png";
import mapNature from "./assets/c95-map-bg-nature-no-clouds-v2.jpeg";
import FlareFont from "./assets/fonts/02a1216b6c704030-s.p.woff";
import AgrandirFont from "./assets/fonts/161374021bd9bd1d-s.p.woff";
import CaslonFont from "./assets/fonts/2be595c6b136c288-s.p.woff";
import Fontflare from "./assets/fonts/5f17bc9335138f9d-s.p.woff2";
import AgrandFont from "./assets/fonts/991e0bc14bbf4d90-s.p.woff2";
import CasloFont from "./assets/fonts/9ee57a5762846d75-s.p.woff2";
import FlaresFont from "./assets/fonts/a81f89e159e0486f-s.p.woff";
import AgrandirsFont from "./assets/fonts/abff1420e55a5ceb-s.p.woff2";
import cloudsImg1 from "./assets/clouds.webp";
import cloudsImg2 from "./assets/clouds.webp";
import TermsAndConditions from "./TermsAndConditions";
const easeSnappy = "cubic-bezier(0.87, 0, 0.13, 1)";
const easeSmooth = "cubic-bezier(0.45, 0.02, 0.09, 0.98)";
const f1Shadow = "0 0 5.2px 0 rgb(0 0 0/8%), 0 3.335px 3.335px 0 rgb(0 0 0/7%)";

const FONTS = {
  flare: '"ASTON_MARTIN_FLARE", Arial, Helvetica, sans-serif',
  agrandir: '"AGRANDIR", "Helvetica Neue", Arial, sans-serif',
  caslon: '"CASLON_DORIC", Arial, Helvetica, sans-serif',
};

const COLORS = {
  white: "#fff",
  black: "#000",
  f1GreenDark: "#204338",
  f1LimeGreen: "#c6fd3a",
  f1LimeGreenDark: "#97cb11",
  navSubtitle: "#95cf02",
  introBg: "#0c1311",
  introBgTop: "#22473c",
};

const NAV_LINKS = [
  { label: "RX", sub: "Distribution Networks", href: "/" },

  { label: "About Us", sub: "Expressions", href: "/about-us" },
  { label: "Contact Us", sub: "Sign Up", href: "/contact-us" },
];

// ── DISTRIBUTION MAP PANELS ──────────────────────────────────────────────────
const DISTRIBUTION_PANELS = [
  {
    id: "place",
    label: "Place",
    mapBg: mapDefault,
    stats: [
      { value: "54", unit: "", label: "Countries Across Africa" },
      { value: "1.4", unit: "BN", label: "People Reached By Our Network" },
      { value: "6", unit: "HRS", label: "Flight Time From 40% Of The World" },
    ],
    body: "Matrix Petroleum's primary distribution hub is strategically located in Sub-Saharan Africa, placing MaxFuel RX at the crossroads of the continent's fastest-growing industrial and transport corridors. Our infrastructure ensures rapid, reliable delivery to both urban centres and remote operations.",
    pins: [
      { label: "Johannesburg Hub", style: { left: "46%", top: "90%" } },
      { label: "Nairobi Gateway", style: { left: "39%", top: "74%" } },
      { label: "Lagos Terminal", style: { left: "34%", top: "52%" } },
    ],
  },
  {
    id: "regions",
    label: "Regions",
    mapBg: mapDefaultPng,
    stats: [
      { value: "5", unit: "", label: "Active Distribution Regions" },
      { value: "120+", unit: "", label: "Authorised Resellers" },
      { value: "95", unit: "%", label: "On-Time Delivery Rate" },
    ],
    body: "Our five regional distribution networks span North, West, East, Central and Southern Africa. Each region operates with dedicated logistics partners, localised inventory and a regional manager — ensuring MaxFuel RX reaches every market with precision and without compromise.",
    pins: [
      { label: "North Africa", style: { left: "35%", top: "20%" } },
      { label: "West Africa", style: { left: "30%", top: "42%" } },
      { label: "East Africa", style: { left: "52%", top: "46%" } },
      {
        label: "Central Africa",
        style: { left: "40%", top: "52%" },
        hasCircle: true,
      },
      { label: "Southern Africa", style: { left: "45%", top: "82%" } },
    ],
  },
  {
    id: "global",
    label: "A Global Opportunity",
    mapBg: mapNature,
    stats: [
      { value: "3", unit: "", label: "Global Export Markets Active" },
      { value: "58", unit: "", label: "Countries In Target Pipeline" },
      { value: "26,500", unit: "KM²", label: "Operational Footprint" },
    ],
    quote: {
      text: "The global demand for clean, efficient fuel solutions has never been greater. MaxFuel RX is not just a product — it is the foundation of a distribution network built for the next century of African and global industrial growth.",
      author: "Malvin Chiwanga",
      role: "CEO, Matrix Petroleum Ltd",
    },
    pins: [
      {
        label: "North Africa",
        style: { left: "35%", top: "20%" },
        hasCircle: true,
      },
      { label: "East Africa", style: { left: "52%", top: "46%" } },
      {
        label: "Central Africa",
        style: { left: "40%", top: "52%" },
        hasCircle: true,
      },
      {
        label: "Southern Africa",
        style: { left: "44%", top: "70%" },
        hasCircle: true,
      },
    ],
  },
];

// ── DISTRIBUTION CHANNELS ────────────────────────────────────────────────────
const CHANNELS = [
  {
    key: "direct",
    title: "Direct Supply",
    desc: "Matrix Petroleum supplies MaxFuel RX directly to large-scale industrial operations, mining houses, fleet operators and power generation facilities. Direct accounts receive priority fulfilment, dedicated account management and custom dosing programmes.",
  },
  {
    key: "reseller",
    title: "Authorised Resellers",
    desc: "Our authorised reseller network spans over 120 partners across Africa. Resellers undergo rigorous product training, are equipped with dosing technology and carry full Matrix Petroleum certification — ensuring product integrity at every point of sale.",
  },
  {
    key: "bulk",
    title: "Bulk & Depot Distribution",
    desc: "Strategic bulk depots positioned along key transport corridors allow for rapid regional fulfilment. Depot stock is monitored in real time, with automated reorder systems ensuring zero stockout risk for high-volume customers.",
  },
  {
    key: "oem",
    title: "OEM & Fleet Partnerships",
    desc: "MaxFuel RX is integrated into the maintenance programmes of select OEM partners and national fleet operators. These partnerships embed our product at the point of fuel consumption, delivering measurable performance data back to operators.",
  },
];

// ── PARTNER TIERS ────────────────────────────────────────────────────────────
const PARTNER_TIERS = [
  {
    tier: "Platinum",
    volume: "500,000 L+",
    benefits:
      "Dedicated account manager, custom dosing programme, priority logistics, co-branded marketing support, quarterly performance reporting.",
  },
  {
    tier: "Gold",
    volume: "100,000 – 499,999 L",
    benefits:
      "Regional account manager, standard dosing programme, preferred logistics rates, partner portal access, bi-annual reporting.",
  },
  {
    tier: "Silver",
    volume: "20,000 – 99,999 L",
    benefits:
      "Shared account management, product training, partner portal access, annual performance review.",
  },
  {
    tier: "Authorised",
    volume: "Under 20,000 L",
    benefits:
      "Online ordering, product certification, marketing materials, Matrix Petroleum authorised reseller status.",
  },
];

const IconHamburger = ({ open }) =>
  open ? (
    <svg width="30" height="14" viewBox="0 0 26 16" fill="none">
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
    </svg>
  ) : (
    <svg width="30" height="14" viewBox="0 0 26 16" fill="none">
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
    </svg>
  );

function SimpleNav({ menuOpen, setMenuOpen }) {
  return (
    <>
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
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
    </>
  );
}

// ── DISTRIBUTION MAP SECTION ─────────────────────────────────────────────────
function DistributionSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const panel = DISTRIBUTION_PANELS[activeIdx];

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* LAYER 0 — map backgrounds */}
      {DISTRIBUTION_PANELS.map((p, i) => (
        <img
          key={p.id}
          src={p.mapBg}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: activeIdx === i ? 1 : 0,
            transition: "opacity 0.9s ease",
            zIndex: 0,
          }}
        />
      ))}

      {/* LAYER 1 — sliding cloud images */}
      {[
        { src: cloudsImg1, duration: "32s", delay: "0s", opacity: 0.5 },
        { src: cloudsImg1, duration: "32s", delay: "-16s", opacity: 0.5 },
        { src: cloudsImg2, duration: "52s", delay: "-10s", opacity: 0.28 },
        { src: cloudsImg2, duration: "52s", delay: "-36s", opacity: 0.28 },
      ].map((c, i) => (
        <img
          key={i}
          src={c.src}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "200%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center left",
            zIndex: 1,
            opacity: c.opacity,
            mixBlendMode: "screen",
            animation: `distCloudDrift ${c.duration} linear infinite`,
            animationDelay: c.delay,
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
      ))}

      {/* LAYER 2 — pins */}
      {DISTRIBUTION_PANELS.map((p, i) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            opacity: activeIdx === i ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        >
          {p.pins.map((pin, j) => (
            <div
              key={j}
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transform: "translateY(-50%)",
                ...pin.style,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "1px",
                  background: "rgba(255,255,255,0.5)",
                  flexShrink: 0,
                }}
              />
              {pin.hasCircle && (
                <div
                  style={{
                    position: "absolute",
                    left: "calc(100% + 44px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "9px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                  textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                }}
              >
                {pin.label}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* LAYER 3 — UI overlay: no backgrounds, floats over map */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          padding: "44px 0 48px",
        }}
      >
        {/* Tab nav — horizontal scroll on mobile */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0",
            overflowX: "auto",
            padding: "0 clamp(20px,4vw,52px)",
            marginBottom: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {DISTRIBUTION_PANELS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              style={{
                background: "none",
                border: "none",
                borderBottom:
                  activeIdx === i
                    ? `2px solid ${COLORS.f1LimeGreen}`
                    : "2px solid transparent",
                padding: "12px 16px",
                cursor: "pointer",
                color:
                  activeIdx === i ? COLORS.white : "rgba(255,255,255,0.35)",
                fontFamily: FONTS.agrandir,
                fontSize: "clamp(10px,1vw,13px)",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                textAlign: "left",
                transition: "color .3s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Stats + body — bottom of section */}
        <div
          style={{
            marginTop: "auto",
            padding: "0 clamp(20px,6vw,52px) 0 clamp(20px,6vw,52px)",
            maxWidth: "480px",
            alignSelf: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              background: COLORS.f1LimeGreen,
              marginBottom: "20px",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px 20px",
              marginBottom: "20px",
            }}
          >
            {panel.stats.map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: FONTS.flare,
                    fontSize: "clamp(20px,2.4vw,38px)",
                    fontWeight: 400,
                    color: COLORS.f1LimeGreen,
                    lineHeight: 1,
                    letterSpacing: ".02em",
                  }}
                >
                  {s.value}
                  {s.unit && (
                    <span
                      style={{
                        fontSize: "clamp(10px,1vw,13px)",
                        marginLeft: "4px",
                      }}
                    >
                      {s.unit}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "9px",
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "5px",
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          {panel.quote ? (
            <>
              <p
                style={{
                  fontFamily: FONTS.caslon,
                  fontSize: "clamp(11px,0.95vw,13px)",
                  lineHeight: 1.8,
                  color: COLORS.white,
                  letterSpacing: ".02em",
                  margin: "0 0 14px",
                }}
              >
                {panel.quote.text}
              </p>
              <p
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: ".08em",
                  margin: "0 0 2px",
                }}
              >
                {panel.quote.author}
              </p>
              <p
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: ".08em",
                  margin: 0,
                }}
              >
                {panel.quote.role}
              </p>
            </>
          ) : (
            <p
              style={{
                fontFamily: FONTS.caslon,
                fontSize: "clamp(11px,0.95vw,13px)",
                lineHeight: 1.8,
                color: COLORS.white,
                letterSpacing: ".02em",
                margin: 0,
              }}
            >
              {panel.body}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes distCloudDrift {
          0%   { transform: translateX(0);    }
          100% { transform: translateX(50%);  }
        }
      `}</style>
    </section>
  );
}

// ── CHANNEL CARDS SECTION ────────────────────────────────────────────────────
function ChannelsSection({ visible }) {
  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: COLORS.introBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px 8vw",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.agrandir,
          fontSize: "11px",
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: COLORS.f1LimeGreenDark,
          marginBottom: "60px",
          display: "block",
        }}
      >
        Distribution Channels
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "0",
          border: `1px solid rgba(198,253,58,0.15)`,
        }}
      >
        {CHANNELS.map((ch, i) => (
          <div
            key={ch.key}
            className={`dist-channel-card gy-reveal${visible ? " in" : ""}`}
            style={{
              padding: "48px 40px",
              borderBottom: `1px solid rgba(198,253,58,0.12)`,
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "9px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: COLORS.f1LimeGreenDark,
                margin: "0 0 16px",
              }}
            >
              0{i + 1}
            </p>
            <h3
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(18px,2.2vw,32px)",
                fontWeight: 400,
                letterSpacing: ".04em",
                textTransform: "uppercase",
                color: COLORS.white,
                margin: "0 0 20px",
                lineHeight: 1.05,
              }}
            >
              {ch.title}
            </h3>
            <p
              style={{
                fontFamily: FONTS.caslon,
                fontSize: "clamp(11px,1vw,13px)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: ".02em",
                margin: 0,
              }}
            >
              {ch.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PARTNER TIERS SECTION ────────────────────────────────────────────────────
function PartnerTiersSection({ visible }) {
  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px 8vw",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.agrandir,
          fontSize: "11px",
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: COLORS.f1LimeGreenDark,
          marginBottom: "60px",
          display: "block",
        }}
      >
        Partner Tiers
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "0",
        }}
      >
        {PARTNER_TIERS.map((t, i) => (
          <div
            key={t.tier}
            className={`gy-reveal${visible ? " in" : ""}`}
            style={{
              padding: "44px 40px",
              borderTop: `1px solid rgba(255,255,255,0.08)`,
              borderBottom: `1px solid rgba(255,255,255,0.08)`,
              transitionDelay: `${i * 0.12}s`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.flare,
                  fontSize: "clamp(22px,2.8vw,42px)",
                  fontWeight: 400,
                  color: COLORS.f1LimeGreen,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                }}
              >
                {t.tier}
              </span>
              <span
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "10px",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {t.volume}
              </span>
            </div>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: `rgba(198,253,58,0.4)`,
                margin: "16px 0 20px",
              }}
            />
            <p
              style={{
                fontFamily: FONTS.caslon,
                fontSize: "clamp(11px,1vw,13px)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: ".02em",
                margin: 0,
              }}
            >
              {t.benefits}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: "0",
        }}
      />
    </section>
  );
}

// ── HOW IT WORKS SECTION ─────────────────────────────────────────────────────
function HowItWorksSection({ visible }) {
  const steps = [
    {
      num: "01",
      title: "Enquire",
      body: "Submit a distribution enquiry through our partner portal or contact your regional Matrix Petroleum representative. Initial qualification takes 48 hours.",
    },
    {
      num: "02",
      title: "Qualify",
      body: "Our team assesses your operational profile, volume requirements and geographic coverage. Qualified partners proceed to a product training programme.",
    },
    {
      num: "03",
      title: "Onboard",
      body: "Receive full product certification, dosing equipment, marketing materials and portal access. Your account is activated and your first order is placed.",
    },
    {
      num: "04",
      title: "Distribute",
      body: "Begin supplying MaxFuel RX to your customers with full Matrix Petroleum support — technical, logistical and commercial — behind you every step of the way.",
    },
  ];

  return (
    <section
      style={{
        width: "100vw",
        background: COLORS.introBg,
        padding: "100px 8vw",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.agrandir,
          fontSize: "11px",
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: COLORS.f1LimeGreenDark,
          marginBottom: "60px",
          display: "block",
        }}
      >
        Becoming A Distributor
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0",
          borderTop: `1px solid rgba(198,253,58,0.12)`,
        }}
      >
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={`gy-reveal gy-from-left${visible ? " in" : ""}`}
            style={{
              padding: "40px 32px",
              borderBottom: `1px solid rgba(198,253,58,0.12)`,
              transitionDelay: `${i * 0.12}s`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(36px,4vw,64px)",
                fontWeight: 400,
                color: `rgba(198,253,58,0.15)`,
                display: "block",
                lineHeight: 1,
                marginBottom: "20px",
                letterSpacing: ".02em",
              }}
            >
              {s.num}
            </span>
            <h3
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(16px,1.8vw,24px)",
                fontWeight: 400,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: COLORS.white,
                margin: "0 0 16px",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: FONTS.caslon,
                fontSize: "clamp(11px,0.95vw,13px)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: ".02em",
                margin: 0,
              }}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── STATS BANNER ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { value: "120+", label: "Authorised Resellers" },
    { value: "54", label: "Countries In Coverage" },
    { value: "95%", label: "On-Time Delivery" },
    { value: "6", label: "Distribution Depots" },
  ];

  return (
    <section
      style={{
        width: "100vw",
        background: COLORS.f1LimeGreen,
        padding: "0 8vw",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 0,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "36px 16px",
              borderRight: "1px solid rgba(0,0,0,0.12)",
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(28px,3.5vw,52px)",
                fontWeight: 400,
                color: COLORS.f1GreenDark,
                letterSpacing: ".02em",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "9px",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(32,67,56,0.7)",
                marginTop: "8px",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── IMAGE PANELS ─────────────────────────────────────────────────────────────
function ImagePanels() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        minHeight: "480px",
        background: "#070c1a",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0b1a10",
          position: "relative",
          overflow: "hidden",
          minHeight: "260px",
        }}
      >
        <img
          src={engineImage}
          alt="Engine"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.8,
          }}
        />
        <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "9px",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 4px",
            }}
          >
            Channel
          </p>
          <p
            style={{
              fontFamily: FONTS.flare,
              fontSize: "18px",
              color: COLORS.white,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: ".04em",
            }}
          >
            Direct Supply
          </p>
        </div>
      </div>
      <div
        style={{
          background: "#061209",
          position: "relative",
          overflow: "hidden",
          minHeight: "260px",
        }}
      >
        <img
          src={splashImage}
          alt="Fuel"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.8,
          }}
        />
        <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "9px",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 4px",
            }}
          >
            Channel
          </p>
          <p
            style={{
              fontFamily: FONTS.flare,
              fontSize: "18px",
              color: COLORS.white,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: ".04em",
            }}
          >
            Bulk Depot
          </p>
        </div>
      </div>
      <div
        style={{
          background: "#0d1e12",
          position: "relative",
          overflow: "hidden",
          minHeight: "260px",
        }}
      >
        <img
          src={sparkImage}
          alt="Technology"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.8,
          }}
        />
        <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "9px",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 4px",
            }}
          >
            Channel
          </p>
          <p
            style={{
              fontFamily: FONTS.flare,
              fontSize: "18px",
              color: COLORS.white,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: ".04em",
            }}
          >
            OEM Partners
          </p>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT CTA SECTION ──────────────────────────────────────────────────────
function ContactCTA({ onOpen }) {
  return (
    <section
      style={{
        width: "100vw",
        background: COLORS.introBg,
        padding: "clamp(60px,10vw,100px) clamp(20px,8vw,8vw)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.agrandir,
          fontSize: "11px",
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: COLORS.f1LimeGreenDark,
          marginBottom: "32px",
          display: "block",
        }}
      >
        Become A Partner
      </span>
      <h2
        style={{
          fontFamily: FONTS.flare,
          fontSize: "clamp(28px,5vw,80px)",
          fontWeight: 400,
          textTransform: "uppercase",
          color: COLORS.white,
          margin: "0 0 32px",
          lineHeight: 1.0,
          letterSpacing: ".02em",
          maxWidth: "800px",
        }}
      >
        Ready To Distribute MaxFuel RX In Your Region?
      </h2>
      <p
        style={{
          fontFamily: FONTS.caslon,
          fontSize: "clamp(12px,1.1vw,15px)",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: ".02em",
          maxWidth: "560px",
          margin: "0 0 48px",
        }}
      >
        Whether you are a logistics operator, fuel reseller, fleet manager or
        industrial supplier, we have a distribution tier designed for your
        operation. Register your interest and our regional team will contact you
        within 48 hours.
      </p>
      <button
        onClick={onOpen}
        style={{
          background: COLORS.f1LimeGreen,
          color: COLORS.f1GreenDark,
          border: "none",
          padding: "16px 44px",
          fontFamily: FONTS.agrandir,
          fontSize: "11px",
          letterSpacing: ".22em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#d8fe6a")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = COLORS.f1LimeGreen)
        }
      >
        Register As A Distributor
      </button>
    </section>
  );
}

// ── ENQUIRY FORM ─────────────────────────────────────────────────────────────
function EnquiryForm({ visible, onClose }) {
  const [fields, setFields] = useState({
    company: "",
    name: "",
    email: "",
    country: "",
    volume: "",
    tier: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isValidEmail = (e) =>
    /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
  const handleChange = (field, value) => {
    setFields((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: false }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const ne = {};
    if (!fields.company) ne.company = true;
    if (!fields.name) ne.name = true;
    if (!isValidEmail(fields.email)) ne.email = true;
    if (!fields.country) ne.country = true;
    if (!fields.agree) ne.agree = true;
    if (Object.keys(ne).length > 0) {
      setErrors(ne);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
    }, 500);
  };

  return (
    <div className={"gy-form-overlay" + (visible ? " show" : "")}>
      <div className={"gy-form-container" + (visible ? " open" : "")}>
        <button
          className="gy-form-close"
          onClick={handleClose}
          aria-label="Close"
        >
          X
        </button>
        {submitted ? (
          <div className="gy-form-thank-you">
            <div className="gy-form-ty-icon">RX</div>
            <h2>Enquiry Received</h2>
            <p>
              Our regional distribution team will be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <>
            <h2 className="gy-form-title">Distributor Enquiry</h2>
            <p className="gy-form-subtitle">
              MaxFuel RX — Distribution Partnership
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="gy-form-row">
                <div
                  className={"gy-form-field" + (errors.company ? " error" : "")}
                >
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={fields.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Your company"
                  />
                </div>
                <div
                  className={"gy-form-field" + (errors.name ? " error" : "")}
                >
                  <label>Contact Name</label>
                  <input
                    type="text"
                    value={fields.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Full name"
                  />
                </div>
              </div>
              <div className={"gy-form-field" + (errors.email ? " error" : "")}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={fields.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@company.com"
                />
              </div>
              <div
                className={"gy-form-field" + (errors.country ? " error" : "")}
              >
                <label>Country / Region</label>
                <select
                  value={fields.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                >
                  <option value="">Select region</option>
                  <option>South Africa</option>
                  <option>East Africa</option>
                  <option>West Africa</option>
                  <option>North Africa</option>
                  <option>Central Africa</option>
                  <option>United Kingdom</option>
                  <option>Middle East</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="gy-form-field">
                <label>Estimated Annual Volume (Litres)</label>
                <select
                  value={fields.volume}
                  onChange={(e) => handleChange("volume", e.target.value)}
                >
                  <option value="">Select volume</option>
                  <option>Under 20,000 L</option>
                  <option>20,000 – 99,999 L</option>
                  <option>100,000 – 499,999 L</option>
                  <option>500,000 L+</option>
                </select>
              </div>
              <div className="gy-form-checkboxes">
                <label
                  className={"gy-check-label" + (errors.agree ? " error" : "")}
                >
                  <input
                    type="checkbox"
                    checked={fields.agree}
                    onChange={(e) => handleChange("agree", e.target.checked)}
                  />
                  I agree to the <a href="#">Terms and Conditions</a> and
                  consent to Matrix Petroleum processing my enquiry.
                </label>
              </div>
              <button
                type="submit"
                className={
                  "gy-cta-btn gy-submit-btn" + (submitting ? " loading" : "")
                }
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function DistributionPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [channelsVisible, setChannelsVisible] = useState(false);
  const [tiersVisible, setTiersVisible] = useState(false);
  const [howVisible, setHowVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const channelsRef = useRef(null);
  const tiersRef = useRef(null);
  const howRef = useRef(null);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const makeIO = (setter, threshold = 0.15) =>
      new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setter(true);
        },
        { threshold },
      );
    const ioC = makeIO(setChannelsVisible);
    const ioT = makeIO(setTiersVisible);
    const ioH = makeIO(setHowVisible);
    if (channelsRef.current) ioC.observe(channelsRef.current);
    if (tiersRef.current) ioT.observe(tiersRef.current);
    if (howRef.current) ioH.observe(howRef.current);

    const onScroll = () =>
      setCtaVisible(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ioC.disconnect();
      ioT.disconnect();
      ioH.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @font-face { font-family: "ASTON_MARTIN_FLARE"; src: url(${Fontflare}) format('woff2'), url(${FlareFont}) format('woff'); font-weight: 400; font-style: normal; font-display: swap; }
        @font-face { font-family: "AGRANDIR"; src: url(${AgrandFont}) format('woff2'), url(${AgrandirFont}) format('woff'); font-weight: 400; font-style: normal; font-display: swap; }
        @font-face { font-family: "CASLON_DORIC"; src: url(${CasloFont}) format('woff2'), url(${CaslonFont}) format('woff'); font-weight: 400; font-style: normal; font-display: swap; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --font-flare: "ASTON_MARTIN_FLARE", Arial, Helvetica, sans-serif;
          --font-agrandir: "AGRANDIR", "Helvetica Neue", Arial, sans-serif;
          --font-caslon-doric: "CASLON_DORIC", Arial, sans-serif;
          --color-black: #000; --color-white: #fff;
          --color-f1-green-dark: #204338;
          --color-f1-lime-green: #c6fd3a;
          --color-f1-lime-green-darker: #97cb11;
          --easing-snappy: cubic-bezier(0.87, 0, 0.13, 1);
          --easing-smooth: cubic-bezier(0.45, 0.02, 0.09, 0.98);
          --navy: #0c1311; --navy-light: #12201c;
          --gold: #c6fd3a; --gold-pale: #d8fe6a;
          --white: #fff; --muted: rgba(255,255,255,0.45);
        }

        button:focus,
button:focus-visible {
  outline: none;
}
        .gy-root { background: var(--navy); color: var(--white); font-family: var(--font-agrandir); font-weight: 400; overflow-x: hidden; min-height: 100vh; }
        .gy-skip-link { position: absolute; top: -100px; left: 0; z-index: 9999; background: var(--gold); color: var(--navy); padding: 10px 20px; font-size: 12px; letter-spacing: .15em; text-transform: uppercase; text-decoration: none; font-family: var(--font-agrandir); transition: top .2s; }
        .gy-skip-link:focus { top: 0; }
        .visually-hidden { position: absolute !important; overflow: hidden; clip: rect(1px,1px,1px,1px); width: 1px; height: 1px; }
        .gy-reveal { opacity: 0; transition: opacity .7s ease, transform .7s var(--easing-smooth); }
        .gy-from-left { transform: translateX(-40px); }
        .gy-reveal.in { opacity: 1; transform: translate(0); }
        .gy-cta-btn { background: var(--gold); color: var(--color-f1-green-dark); border: none; padding: 14px 36px; font-family: var(--font-agrandir); font-size: 11px; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: background .2s; white-space: nowrap; min-height: 44px; }
        .gy-cta-btn:hover { background: var(--gold-pale); }
        .gy-hero { position: relative; width: 100vw; min-height: 100vh; overflow: hidden; background: #060e0a; display: flex; align-items: flex-end; justify-content: flex-start; }
        .gy-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; pointer-events: none; }
        .gy-hero-overlay { position: absolute; inset: 0; background: rgba(6,14,10,0.6); z-index: 1; pointer-events: none; }
        .gy-cta-banner { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: transparent; padding: 16px 24px; display: flex; justify-content: flex-end; align-items: center; gap: 16px; opacity: 0; transform: translateY(100%); transition: opacity .5s ease, transform .5s var(--easing-smooth); pointer-events: none; }
        .gy-cta-banner.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .gy-form-overlay { position: fixed; inset: 0; z-index: 300; pointer-events: none; }
        .gy-form-overlay.show { pointer-events: auto; }
        .gy-form-overlay::before { content: ''; position: absolute; inset: 0; background: rgba(5,15,10,.75); opacity: 0; transition: opacity .4s; pointer-events: none; }
        .gy-form-overlay.show::before { opacity: 1; }
        .gy-form-container { position: absolute; right: 0; top: 0; bottom: 0; width: min(520px,100vw); background: var(--navy-light); border-left: 1px solid rgba(198,253,58,.2); padding: 60px 48px; overflow-y: auto; -webkit-overflow-scrolling: touch; transform: translateX(100%); transition: transform .5s var(--easing-smooth); }
        .gy-form-container.open { transform: translateX(0); }
        .gy-form-close { position: absolute; top: 24px; right: 24px; background: transparent; border: 1px solid rgba(198,253,58,.3); color: var(--gold); width: 44px; height: 44px; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; font-family: var(--font-agrandir); }
        .gy-form-close:hover { background: rgba(198,253,58,.1); }
        .gy-form-title { font-family: var(--font-flare); font-size: 36px; font-weight: 400; margin-bottom: 8px; color: var(--white); }
        .gy-form-subtitle { font-family: var(--font-agrandir); font-size: 11px; letter-spacing: .2em; color: var(--color-f1-lime-green-darker); text-transform: uppercase; margin-bottom: 40px; }
        .gy-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .gy-form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .gy-form-field label { font-family: var(--font-agrandir); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--color-f1-lime-green-darker); }
        .gy-form-field input, .gy-form-field select { background: rgba(198,253,58,.05); border: 1px solid rgba(198,253,58,.2); color: var(--white); padding: 12px 14px; font-family: var(--font-agrandir); font-size: 16px; outline: none; transition: border-color .2s; -webkit-appearance: none; appearance: none; border-radius: 0; }
        .gy-form-field input:focus, .gy-form-field select:focus { border-color: var(--color-f1-lime-green); }
        .gy-form-field select option { background: var(--navy); color: var(--white); }
        .gy-form-field.error input, .gy-form-field.error select { border-color: #f66; }
        .gy-form-checkboxes { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
        .gy-check-label { display: flex; align-items: flex-start; gap: 12px; font-size: 12px; line-height: 1.6; color: rgba(255,255,255,.7); cursor: pointer; font-family: var(--font-agrandir); }
        .gy-check-label.error { color: #f88; }
        .gy-check-label input[type="checkbox"] { margin-top: 2px; accent-color: var(--color-f1-lime-green); flex-shrink: 0; width: 18px; height: 18px; }
        .gy-check-label a { color: var(--color-f1-lime-green-darker); }
        .gy-submit-btn { width: 100%; padding: 16px; font-size: 12px; letter-spacing: .2em; min-height: 48px; }
        .gy-submit-btn.loading { opacity: .6; cursor: not-allowed; }
        .gy-form-thank-you { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; gap: 24px; }
        .gy-form-ty-icon { font-family: var(--font-flare); font-size: 80px; color: var(--color-f1-lime-green); opacity: .6; }
        .gy-form-thank-you h2 { font-family: var(--font-flare); font-size: 36px; font-weight: 400; color: var(--white); }
        .gy-form-thank-you p { font-family: var(--font-agrandir); font-size: 14px; line-height: 1.8; color: var(--muted); max-width: 320px; }
        .gy-footer { width: 100vw; background: #0d1311; padding: 72px 8vw 48px; }
        .gy-footer-inner { width: 100%; display: grid; grid-template-columns: 2fr 3fr; gap: 80px; align-items: start; }
        .gy-footer-logo { font-family: var(--font-flare); font-size: clamp(28px,4vw,48px); font-weight: 400; letter-spacing: .03em; color: var(--color-f1-lime-green); margin-bottom: 48px; line-height: 1; text-transform: uppercase; }
        .gy-footer-logo::after { content: '.'; }
        .gy-footer-nav { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .gy-footer-nav li a { display: block; font-family: var(--font-flare); font-size: clamp(16px,2.8vw,38px); font-weight: 400; text-transform: uppercase; color: var(--white); text-decoration: none; line-height: 1.25; padding: 4px 0; transition: opacity .2s; }
        .gy-footer-nav li a:hover { opacity: .6; }
        .gy-footer-right { display: flex; flex-direction: column; gap: 40px; padding-top: 8px; }
        .gy-footer-section-label { font-family: var(--font-agrandir); font-size: 10px; letter-spacing: .28em; text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 14px; }
        .gy-footer-social { display: flex; flex-wrap: wrap; gap: 8px 32px; list-style: none; }
        .gy-footer-social a, .gy-footer-contact a { font-family: var(--font-agrandir); font-size: 11px; font-weight: 400; letter-spacing: .22em; text-transform: uppercase; color: var(--white); text-decoration: none; transition: opacity .2s; min-height: 44px; display: flex; align-items: center; }
        .gy-footer-social a:hover, .gy-footer-contact a:hover { opacity: .6; }
        .gy-footer-contact { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .gy-footer-legal { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
        .gy-footer-tagline { font-family: var(--font-agrandir); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 4px; }
        .gy-footer-disclaimer { font-family: var(--font-agrandir); font-size: 11px; line-height: 1.75; color: rgba(255,255,255,.28); letter-spacing: .02em; }
        .gy-footer-drinkaware { font-family: var(--font-agrandir); font-size: 11px; color: rgba(255,255,255,.35); letter-spacing: .04em; margin-top: 4px; }
        .gy-footer-drinkaware strong { font-weight: 400; font-family: var(--font-flare); }
        @media (max-width: 768px) {
          .gy-footer-inner { grid-template-columns: 1fr; gap: 40px; }
          .gy-footer { padding: 60px 6vw 40px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
          @media (max-width: 600px) {
  .gy-hero > div { padding: 0 6vw 10vh !important; }
}
          @media (max-width: 560px) {
  .gy-form-container {
    width: 100vw;
    padding: 60px 24px;
  }
  .gy-form-row {
    grid-template-columns: 1fr;
  }
}
      `}</style>

      <div className="gy-root">
        <a href="#dist-main" className="gy-skip-link visually-hidden">
          Skip to main content
        </a>

        <SimpleNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <EnquiryForm
          visible={formVisible}
          onClose={() => setFormVisible(false)}
        />

        {/* ── HERO ── */}
        <section className="gy-hero">
          <video
            ref={heroVideoRef}
            className="gy-hero-video"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="gy-hero-overlay" />
          <div
            style={{ position: "relative", zIndex: 2, padding: "0 8vw 8vh" }}
          >
            <p
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "11px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: COLORS.f1LimeGreenDark,
                margin: "0 0 16px",
              }}
            >
              Matrix Petroleum
            </p>
            <h1
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(40px,8vw,120px)",
                fontWeight: 400,
                letterSpacing: ".02em",
                color: COLORS.white,
                lineHeight: 0.95,
                textTransform: "uppercase",
                margin: "0 0 32px",
              }}
            >
              Distribution
              <br />
              <span style={{ color: COLORS.f1LimeGreen }}>Network</span>
            </h1>
            <p
              style={{
                fontFamily: FONTS.caslon,
                fontSize: "clamp(12px,1.2vw,16px)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "520px",
                margin: "0 0 40px",
                letterSpacing: ".02em",
              }}
            >
              A continent-wide infrastructure built to deliver MaxFuel RX to
              every industrial operation, fleet and facility that needs it —
              reliably, at scale, without compromise.
            </p>
            <button
              onClick={() => setFormVisible(true)}
              style={{
                background: COLORS.f1LimeGreen,
                color: COLORS.f1GreenDark,
                border: "none",
                padding: "16px 44px",
                fontFamily: FONTS.agrandir,
                fontSize: "11px",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Become A Distributor
            </button>
          </div>
        </section>

        <div id="dist-main" tabIndex={-1} />

        {/* ── DISTRIBUTION MAP ── */}
        <DistributionSection />

        {/* ── STATS BANNER ── */}
        <StatsBanner />

        {/* ── CHANNELS ── */}
        <div ref={channelsRef}>
          <ChannelsSection visible={channelsVisible} />
        </div>

        {/* ── IMAGE PANELS ── */}
        <ImagePanels />

        {/* ── HOW IT WORKS ── */}
        <div ref={howRef}>
          <HowItWorksSection visible={howVisible} />
        </div>

        {/* ── PARTNER TIERS ── */}
        <div ref={tiersRef}>
          <PartnerTiersSection visible={tiersVisible} />
        </div>

        {/* ── CONTACT CTA ── */}
        <ContactCTA onOpen={() => setFormVisible(true)} />

        {/* ── FIXED CTA ── */}
        <div className={"gy-cta-banner" + (ctaVisible ? " visible" : "")}>
          <button className="gy-cta-btn" onClick={() => setFormVisible(true)}>
            Register As Distributor
          </button>
        </div>

        {/* ── FOOTER ── */}
        <footer className="gy-footer">
          <div className="gy-footer-inner">
            <div>
              <div className="gy-footer-logo">Matrix Petroleum</div>
              <ul className="gy-footer-nav">
                {[
                  { label: "Home", to: "/" },
                  { label: "Our Future", to: "/?overlay=future" },
                  { label: "Our Story", to: "/about-us" },
                  {
                    label: "Terms and Conditions",
                    to: "/terms-and-conditions",
                  },
                  { label: "FAQs", to: "/faqs" },
                  {
                    label: "Website Terms and Conditions",
                    to: "/terms-and-conditions",
                  },
                  {
                    label: "Privacy Policy and Cookies",
                    to: "/privacy-policy",
                  },
                  { label: "Matrix Petroleum", to: "/" },
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
                  {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((s) => (
                    <li key={s}>
                      <a href="#">{s}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="gy-footer-section-label">
                  Distribution Enquiries
                </p>
                <ul className="gy-footer-contact">
                  <li>
                    <a href="#">distribution@matrixpetroleum.com</a>
                  </li>
                  <li>
                    <a href="#">Regional Partners</a>
                  </li>
                </ul>
              </div>
              <div className="gy-footer-legal">
                <p className="gy-footer-tagline">
                  Distributed With Precision. Delivered With Purpose.
                </p>
                <p className="gy-footer-disclaimer">
                  2025 Matrix Petroleum Ltd. Registered in England. Registered
                  Number 11462010
                  <br />
                  Registered Office: 3 Hardman Square, Manchester M3 3EB
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
