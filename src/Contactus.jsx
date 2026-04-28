import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVideo from "./assets/beerlines2.mp4";
import TermsAndConditions from "./TermsAndConditions";
gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────
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

const NAV_LINKS = [
  { label: "RX", sub: "Story & Experiences", href: "/" },
  { label: "About Us", sub: "Expressions", href: "/about-us" },
  { label: "Maxfuel", sub: "Sign Up", href: "/maxfuel" },
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Product Information",
  "Fleet & Commercial",
  "Distribution & Trade",
  "Media & Press",
  "Technical Support",
];

const OFFICES = [
  {
    city: "Johannesburg",
    country: "South Africa",
    address: "Mandela Square, 14 Sandton Drive, Sandton, 2196",
    phone: "+27 11 000 0000",
    email: "za@matrixpetroleum.com",
    tag: "Headquarters",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "3 Hardman Square, Manchester, United Kingdom, M3 3EB",
    phone: "+44 20 0000 0000",
    email: "uk@matrixpetroleum.com",
    tag: "EMEA Office",
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "DIFC Gate Village, Building 3, Level 4",
    phone: "+971 4 000 0000",
    email: "me@matrixpetroleum.com",
    tag: "Middle East",
  },
];

const FAQS = [
  {
    q: "How do I order MaxFuel RX for a commercial fleet?",
    a: "Commercial and fleet orders are handled by our dedicated trade team. Select 'Fleet & Commercial' from the enquiry type above and a specialist will contact you within one business day.",
  },
  {
    q: "Is MaxFuel RX compatible with all diesel engines?",
    a: "MaxFuel RX is engineered for broad compatibility across diesel applications — from passenger vehicles to heavy commercial equipment. Our technical team can advise on specific applications.",
  },
  {
    q: "Where can I find MaxFuel RX in my region?",
    a: "We operate across the UK, South Africa, and the Middle East, with distribution partners in over 18 countries. Use the contact form to enquire about availability in your area.",
  },
  {
    q: "Do you offer a media or press kit?",
    a: "Yes. Select 'Media & Press' from the enquiry type dropdown and our communications team will respond with press assets and product information within 48 hours.",
  },
];

// ─── Global Styles ─────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
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
    --page-margin: 1.5rem;
    --z-nav: 6;
    --z-footer: 3;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body, html { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }

  @keyframes successPop {
    0%   { opacity: 0; transform: scale(0.85) translateY(0.5rem); }
    60%  { transform: scale(1.03) translateY(0); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  .am-btn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 2.125rem; padding: 0.75rem 2rem 0.69rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.065rem;
    cursor: pointer; border: none; border-radius: 0.1875rem;
    transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
  }
  .am-btn-dark  { color: #fff; background: #000; }
  .am-btn-dark:hover  { background: rgba(0,0,0,0.65); }
  .am-btn-dark:active { transform: scale(0.97); }
  .am-btn-green { color: #204338 !important; background: #c6fd3a; }
  .am-btn-green:hover  { background: #97cb11; }
  .am-btn-green:active { transform: scale(0.97); }

  .am-tag-green {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.38rem 1rem 0.31rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0313rem;
    border-radius: 0.1875rem;
    color: var(--color-f1-lime-green); border: 1px solid var(--color-f1-lime-green);
  }

  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }

  .am-input, .am-select, .am-textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(32,67,56,0.25);
    border-radius: 0;
    padding: 0.75rem 0;
    font-family: var(--font-agrandir);
    font-size: 0.625rem;
    font-weight: 400;
    letter-spacing: 0.04rem;
    text-transform: uppercase;
    color: #000;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.25s ease;
    resize: none;
  }
  .am-input::placeholder, .am-textarea::placeholder { color: rgba(32,67,56,0.4); }
  .am-input:focus, .am-select:focus, .am-textarea:focus { border-bottom-color: #97cb11; }
  .am-select { cursor: pointer; color: rgba(32,67,56,0.4); }
  .am-select.has-value { color: #000; }
  .am-select option { text-transform: uppercase; }

  .reveal-up {
    opacity: 0;
    transform: translateY(2.5rem);
    will-change: opacity, transform;
  }

  .office-card {
    border-top: 1px solid rgba(255,255,255,0.1);
    transition: border-top-color 0.3s ease;
  }
  .office-card:hover { border-top-color: var(--color-f1-lime-green); }

  .faq-item {
    border-bottom: 1px solid rgba(32,67,56,0.15);
    transition: border-bottom-color 0.3s ease;
  }
  .faq-item:hover { border-bottom-color: var(--color-f1-lime-green-darker); }
  .faq-toggle {
    background: none; border: none; cursor: pointer;
    width: 100%; text-align: left; padding: 1.75rem 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .faq-icon {
    width: 1.25rem; height: 1.25rem; flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid rgba(32,67,56,0.3);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.25s ease, border-color 0.25s ease, transform 0.3s ease;
  }
  .faq-item.open .faq-icon {
    background: var(--color-f1-lime-green-darker);
    border-color: var(--color-f1-lime-green-darker);
    transform: rotate(45deg);
  }
  .faq-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s cubic-bezier(0.45,0.02,0.09,0.98);
  }
 .faq-item.open .faq-body { max-height: 20rem; }

  .success-msg { animation: successPop 0.5s ease forwards; }

  /* ── FOOTER ── */
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
  .gy-footer-nav { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }
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
  .gy-footer-right { display: flex; flex-direction: column; gap: 40px; padding-top: 8px; }
  .gy-footer-section-label {
    font-family: var(--font-agrandir);
    font-size: 10px; letter-spacing: .28em; text-transform: uppercase;
    color: rgba(255,255,255,.45); margin-bottom: 14px;
  }
  .gy-footer-social { display: flex; flex-wrap: wrap; gap: 8px 32px; list-style: none; padding: 0; margin: 0; }
  .gy-footer-social a {
    font-family: var(--font-agrandir); font-size: 11px; letter-spacing: .22em;
    text-transform: uppercase; color: var(--color-white); text-decoration: none;
    transition: opacity .2s; min-height: 44px; display: flex; align-items: center;
  }
  .gy-footer-social a:hover { opacity: .6; }
  .gy-footer-contact { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
  .gy-footer-contact a {
    font-family: var(--font-agrandir); font-size: 11px; letter-spacing: .22em;
    text-transform: uppercase; color: var(--color-white); text-decoration: none;
    transition: opacity .2s; min-height: 44px; display: flex; align-items: center;
  }
  .gy-footer-contact a:hover { opacity: .6; }
  .gy-footer-legal { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
  .gy-footer-tagline {
    font-family: var(--font-agrandir); font-size: 10px; letter-spacing: .22em;
    text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 4px;
  }
  .gy-footer-disclaimer {
    font-family: var(--font-agrandir); font-size: 11px; line-height: 1.75;
    color: rgba(255,255,255,.28); letter-spacing: .02em;
  }
  .gy-footer-drinkaware {
    font-family: var(--font-agrandir); font-size: 11px;
    color: rgba(255,255,255,.35); letter-spacing: .04em; margin-top: 4px;
  }
  .gy-footer-drinkaware strong { font-weight: 400; font-family: var(--font-flare); }

@media (max-width: 768px) {
  .gy-footer-inner { grid-template-columns: 1fr; gap: 40px; }
  .gy-footer { padding: 60px 6vw 40px; }
  .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
  .offices-grid { grid-template-columns: 1fr !important; }
  .form-name-row { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
  .form-email-row { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
  .form-inner { padding: 2rem 1.25rem !important; }
  .contact-section { padding: 6rem 1.5rem !important; }
  .contact-sidebar-value { font-size: 1rem !important; }
  .contact-sidebar-label { font-size: 0.75rem !important; }
  .offices-section { padding: 6rem 1.5rem !important; }
  .faq-section { padding: 6rem 1.5rem !important; }
  .cta-section { padding: 8rem 1.5rem !important; }
  .office-card-inner {
    border-left: none !important;
    padding-left: 0 !important;
    border-top: 1px solid rgba(255,255,255,0.08) !important;
    padding-top: 2.5rem !important;
  }
}
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
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

const IconPlus = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M5 1v8M1 5h8"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#97cb11" strokeWidth="1.5" />
    <path
      d="M8 14l4 4 8-8"
      stroke="#97cb11"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ContactUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    enquiryType: "",
    message: "",
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal-up");
    const triggers = [];
    els.forEach((el) => {
      const t = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () =>
          gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
        once: true,
      });
      triggers.push(t);
    });

    gsap.fromTo(
      ".hero-text-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.3,
      },
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "enquiryType" && e.target.tagName === "SELECT") {
      e.target.classList.toggle("has-value", !!value);
    }
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

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
        {/* ── NAV ── */}
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

        {/* ── NAV OVERLAY ── */}
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

        {/* ── HERO — bottom-anchored like About Us ── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "100vh",
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
              zIndex: 1,
            }}
          >
            <source src={HeroVideo} type="video/mp4" />
          </video>

          {/* dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.42)",
              zIndex: 2,
            }}
          />

          {/* bottom-anchored text block — matches About Us hero */}
          <div
            style={{
              position: "relative",
              zIndex: 3,
             padding: "clamp(6rem, 25vh, 20rem) 6vw 8vh",
            }}
          >
            <p
              className="hero-text-item"
              style={{
                opacity: 0,
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
              className="hero-text-item"
              style={{
                opacity: 0,
                fontFamily: FONTS.flare,
                fontSize: "clamp(40px, 8vw, 120px)",
                fontWeight: 400,
                letterSpacing: ".02em",
                color: COLORS.white,
                lineHeight: 0.95,
                textTransform: "uppercase",
                margin: "0 0 32px",
              }}
            >
              Get in
              <br />
              <span style={{ color: COLORS.f1LimeGreen }}>Touch</span>
            </h1>
            <p
              className="hero-text-item"
              style={{
                opacity: 0,
                fontFamily: FONTS.caslon,
                fontSize: "clamp(12px, 1.2vw, 16px)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "520px",
                margin: "0 0 40px",
                letterSpacing: ".02em",
              }}
            >
              Whether you're a fleet operator, distributor, or simply curious —
              we're here to help.
            </p>
            <button
              className="hero-text-item am-btn-green"
              onClick={() => (window.location.href = "/contact-us")}
              style={{
                opacity: 0,
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
              Become a Distributor
            </button>
          </div>
        </section>

        {/* ── CONTACT FORM + SIDEBAR ── */}
    <section className="contact-section" style={{ padding: "clamp(4rem,10vw,10rem) clamp(1.5rem,8vw,8vw)" }}>
          <div
            className="contact-grid reveal-up"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "6rem",
              alignItems: "start",
            }}
          >
            {/* Sidebar */}
            <div>
              <p
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.065rem",
                  color: COLORS.f1LimeGreenDark,
                  marginBottom: "0.75rem",
                }}
              >
                Direct Contact
              </p>
              <h2
                style={{
                  fontFamily: FONTS.flare,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 400,
                  lineHeight: "105%",
                  color: COLORS.f1GreenDark,
                  textTransform: "uppercase",
                  letterSpacing: "-0.04rem",
                  margin: "0 0 3rem",
                }}
              >
                We respond within one business day
              </h2>

              {[
                {
                  label: "Global Enquiries",
                  value: "hello@matrixpetroleum.com",
                },
                {
                  label: "Trade & Distribution",
                  value: "trade@matrixpetroleum.com",
                },
                { label: "Press & Media", value: "press@matrixpetroleum.com" },
                { label: "Head Office (ZA)", value: "+27 11 000 0000" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: `1px solid rgba(32,67,56,0.12)`,
                    padding: "1.25rem 0",
                  }}
                >
                  <div
                  className="contact-sidebar-label"
                    style={{
                      fontFamily: FONTS.agrandir,
                      fontSize: "1.1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.055rem",
                      color: "rgba(32,67,56,0.45)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                  className="contact-sidebar-value"
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "1.5rem",
                      color: COLORS.f1GreenDark,
                      textTransform: "uppercase",
                      letterSpacing: "0.02rem",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "3rem" }}>
                <div
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.055rem",
                    color: "rgba(32,67,56,0.45)",
                    marginBottom: "1rem",
                  }}
                >
                  Follow Us
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {["LinkedIn", "Instagram", "X"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      style={{
                        fontFamily: FONTS.agrandir,
                        fontSize: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05rem",
                        color: COLORS.f1GreenDark,
                        textDecoration: "none",
                        borderBottom: `1px solid rgba(32,67,56,0.3)`,
                        paddingBottom: "0.1rem",
                        transition: "border-color 0.2s ease, color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.f1LimeGreenDark;
                        e.currentTarget.style.borderColor =
                          COLORS.f1LimeGreenDark;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = COLORS.f1GreenDark;
                        e.currentTarget.style.borderColor =
                          "rgba(32,67,56,0.3)";
                      }}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
          <div
  className="form-inner"
  style={{
    background: COLORS.grey100,
    padding: "3.5rem",
    borderRadius: "0.1875rem",
    position: "relative",
    minHeight: "26rem",
  }}
>
              {!submitted ? (
                <>
                  <p
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      color: COLORS.f1GreenDark,
                      lineHeight: "140%",
                      marginBottom: "3rem",
                    }}
                  >
                    Send an Enquiry
                  </p>

                  <div
  className="form-name-row"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    marginBottom: "2.5rem",
  }}
>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: FONTS.agrandir,
                          fontSize: "1.1rem",
                          letterSpacing: "0.065rem",
                          textTransform: "uppercase",
                          color: "rgba(32,67,56,0.5)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        First Name *
                      </label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Alister"
                        className="am-input"
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: FONTS.agrandir,
                          fontSize: "1.1rem",
                          letterSpacing: "0.065rem",
                          textTransform: "uppercase",
                          color: "rgba(32,67,56,0.5)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Osei"
                        className="am-input"
                      />
                    </div>
                  </div>

                  <div
  className="form-email-row"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    marginBottom: "2.5rem",
  }}
> <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: FONTS.agrandir,
                          fontSize: "1.1rem",
                          letterSpacing: "0.065rem",
                          textTransform: "uppercase",
                          color: "rgba(32,67,56,0.5)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="am-input"
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: FONTS.agrandir,
                          fontSize: "1.1rem",
                          letterSpacing: "0.065rem",
                          textTransform: "uppercase",
                          color: "rgba(32,67,56,0.5)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Company
                      </label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Matrix Petroleum"
                        className="am-input"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "2.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: FONTS.agrandir,
                        fontSize: "1.1rem",
                        letterSpacing: "0.065rem",
                        textTransform: "uppercase",
                        color: "rgba(32,67,56,0.5)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Enquiry Type
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="enquiryType"
                        value={form.enquiryType}
                        onChange={handleChange}
                        className={`am-select${form.enquiryType ? " has-value" : ""}`}
                      >
                        <option value="">Select a category</option>
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke={COLORS.f1GreenDark}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "3rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: FONTS.agrandir,
                        fontSize: "1.1rem",
                        letterSpacing: "0.065rem",
                        textTransform: "uppercase",
                        color: "rgba(32,67,56,0.5)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="am-textarea"
                      style={{ display: "block" }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                    }}
                  >
                    <button
                      onClick={handleSubmit}
                      disabled={sending}
                      style={{
                        background: COLORS.f1LimeGreen,
                        color: COLORS.f1GreenDark,
                        border: "none",
                        padding: "13px 36px",
                        fontFamily: FONTS.agrandir,
                        fontSize: "10px",
                        letterSpacing: ".22em",
                        textTransform: "uppercase",
                        cursor: sending ? "wait" : "pointer",
                        opacity: sending ? 0.7 : 1,
                        minWidth: "9rem",
                        borderRadius: "2px",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!sending)
                          e.currentTarget.style.background =
                            COLORS.f1LimeGreenDark;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = COLORS.f1LimeGreen;
                      }}
                    >
                      {sending ? "Sending…" : "Send Message"}
                    </button>
                    <p
                      style={{
                        fontFamily: FONTS.agrandir,
                        fontSize: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.04rem",
                        color: "rgba(32,67,56,0.4)",
                        margin: 0,
                      }}
                    >
                      * Required fields
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className="success-msg"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    minHeight: "22rem",
                    gap: "1.5rem",
                  }}
                >
                  <IconCheck />
                  <div>
                    <h3
                      style={{
                        fontFamily: FONTS.flare,
                        fontSize: "1.25rem",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        color: COLORS.f1GreenDark,
                        letterSpacing: "-0.02rem",
                        lineHeight: "120%",
                        margin: "0 0 0.75rem",
                      }}
                    >
                      Message Received
                    </h3>
                    <p
                      style={{
                        fontFamily: FONTS.agrandir,
                        fontSize: "0.625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.04rem",
                        color: "rgba(32,67,56,0.55)",
                        lineHeight: "170%",
                        margin: 0,
                      }}
                    >
                      Thank you, {form.firstName}. A member of our team
                      <br />
                      will be in touch within one business day.
                    </p>
                  </div>
                  <button
                    style={{
                      background: "#000",
                      color: "#fff",
                      border: "none",
                      padding: "10px 28px",
                      fontFamily: FONTS.agrandir,
                      fontSize: "10px",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderRadius: "2px",
                      marginTop: "1rem",
                    }}
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        company: "",
                        enquiryType: "",
                        message: "",
                      });
                    }}
                  >
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── OFFICES ── */}
       <section
  className="offices-section"
  style={{ background: COLORS.f1GreenDark, padding: "10rem 8vw" }}
>
          <div className="reveal-up" style={{ marginBottom: "5rem" }}>
            <p
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.065rem",
                color: COLORS.f1LimeGreenDark,
                marginBottom: "0.75rem",
              }}
            >
              Where to Find Us
            </p>
            <h2
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                lineHeight: "100%",
                color: COLORS.white,
                textTransform: "uppercase",
                letterSpacing: "-0.04rem",
                margin: 0,
              }}
            >
              Our Offices
            </h2>
          </div>

          <div
            className="offices-grid reveal-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
            }}
          >
            {OFFICES.map((office, i) => (
  <div
    key={i}
    className={`office-card${i > 0 ? " office-card-inner" : ""}`}
    style={{
                  padding: "2.5rem 2.5rem 2.5rem 0",
                  borderLeft:
                    i > 0 ? `1px solid rgba(255,255,255,0.08)` : "none",
                  paddingLeft: i > 0 ? "2.5rem" : 0,
                }}
              >
                <span
                  className="am-tag-green"
                  style={{ marginBottom: "1.5rem", display: "inline-flex" }}
                >
                  {office.tag}
                </span>
                <div
                  style={{
                    fontFamily: FONTS.flare,
                    fontSize: "1.25rem",
                    color: COLORS.white,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02rem",
                    lineHeight: "120%",
                    marginBottom: "0.25rem",
                  }}
                >
                  {office.city}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "1.0rem",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.045rem",
                    marginBottom: "2rem",
                  }}
                >
                  {office.country}
                </div>
                {[office.address, office.phone, office.email].map((line, j) => (
                  <div
                    key={j}
                    style={{
                      fontFamily: FONTS.agrandir,
                      fontSize: "0.8rem",
                      color:
                        j === 0
                          ? "rgba(255,255,255,0.55)"
                          : COLORS.f1LimeGreenDark,
                      textTransform: "uppercase",
                      letterSpacing: "0.04rem",
                      lineHeight: "160%",
                      marginBottom: j === 0 ? "1rem" : "0.35rem",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section" style={{ padding: "clamp(4rem,10vw,10rem) clamp(1.5rem,8vw,8vw)" }}>
          <div className="reveal-up" style={{ marginBottom: "5rem" }}>
            <p
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.065rem",
                color: COLORS.f1LimeGreenDark,
                marginBottom: "0.75rem",
              }}
            >
              Common Questions
            </p>
            <h2
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                lineHeight: "100%",
                color: COLORS.f1GreenDark,
                textTransform: "uppercase",
                letterSpacing: "-0.04rem",
                margin: 0,
              }}
            >
              FAQ
            </h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: "48rem" }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="faq-toggle"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: COLORS.f1GreenDark,
                      textTransform: "uppercase",
                      letterSpacing: "0.01rem",
                      lineHeight: "140%",
                      textAlign: "left",
                      paddingRight: "2rem",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span className="faq-icon">
                    <IconPlus />
                  </span>
                </button>
                <div className="faq-body">
                  <p
                    style={{
                      fontFamily: FONTS.agrandir,
                      fontSize: "0.625rem",
                      color: COLORS.grey600,
                      lineHeight: "175%",
                      letterSpacing: "0.02rem",
                      margin: "0 0 1.75rem",
                      paddingRight: "3rem",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA — matches About Us CTA banner ── */}
       <section
  className="cta-section"
  style={{
    position: "relative",
    background: `linear-gradient(to bottom, ${COLORS.introBgTop}, ${COLORS.introBg})`,
    padding: "clamp(5rem,12vw,12rem) clamp(1.5rem,8vw,8vw)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <div
            className="reveal-up"
            style={{ position: "relative", zIndex: 1 }}
          >
            <h2
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 400,
                lineHeight: "90%",
                color: COLORS.white,
                textTransform: "uppercase",
                letterSpacing: "-0.1rem",
                margin: "0 0 1.5rem",
              }}
            >
              Still have
              <br />
              <span style={{ color: COLORS.f1LimeGreen }}>Questions?</span>
            </h2>
            <p
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.05rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "40ch",
                margin: "0 auto 2.5rem",
                lineHeight: "170%",
              }}
            >
              Our technical and commercial teams are available to discuss your
              specific requirements — no matter the scale.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "13px 36px",
                  fontFamily: FONTS.agrandir,
                  fontSize: "10px",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: "2px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Discover MaxFuel RX
              </button>
              <button
                style={{
                  background: COLORS.f1LimeGreen,
                  color: COLORS.f1GreenDark,
                  border: "none",
                  padding: "13px 36px",
                  fontFamily: FONTS.agrandir,
                  fontSize: "10px",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: "2px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.f1LimeGreenDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.f1LimeGreen;
                }}
                onClick={() =>
                  window.scrollTo({
                    top: document.querySelector("section:nth-of-type(2)")
                      .offsetTop,
                    behavior: "smooth",
                  })
                }
              >
                Back to Form
              </button>
            </div>
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
              margin: 0,
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
