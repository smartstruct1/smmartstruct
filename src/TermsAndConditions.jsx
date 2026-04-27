import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  { label: "RX", sub: "Story & Experiences", href: "/maxfuelrx" },
  { label: "About Us", sub: "Our Story", href: "/about-us" },
  { label: "Maxfuel", sub: "Sign Up", href: "/maxfuel" },
  { label: "Contact", sub: "Get in Touch", href: "/contact-us" },
];

// ─── Terms Content ────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    content: [
      'These Terms and Conditions govern your use of the Matrix Petroleum website and your purchase or use of MaxFuel RX and any other products or services offered by Matrix Petroleum Ltd ("Matrix Petroleum," "we," "our," or "us").',
      "By accessing our website, placing an order, or using any of our products, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety. If you do not agree, you must discontinue use of our website and products immediately.",
      "Matrix Petroleum Ltd is registered in England and Wales. Registered Number 11462010. Registered Office: 3 Hardman Square, Manchester M3 3EB.",
    ],
  },
  {
    id: "products",
    number: "02",
    title: "Products & Use",
    content: [
      "MaxFuel RX is a diesel fuel additive engineered for use in compression-ignition (diesel) engines and fuel systems. It is intended for use by competent individuals or organisations familiar with diesel fuel handling and engine maintenance.",
      "Matrix Petroleum makes no warranty, express or implied, as to the fitness of MaxFuel RX for any specific application beyond those described in the accompanying product documentation. You are solely responsible for determining whether MaxFuel RX is appropriate for your intended use.",
      "Our products are not intended for use in petrol (gasoline) engines, domestic heating systems, or any application not expressly supported by the product technical data sheet. Misuse may result in damage to equipment and will void any applicable warranties.",
      "MaxFuel RX must be handled, stored, and disposed of in accordance with all applicable local, national, and international regulations governing hazardous substances and petroleum products.",
    ],
  },
  {
    id: "orders",
    number: "03",
    title: "Orders & Payment",
    content: [
      "All orders placed through our website or via our trade sales team are subject to acceptance by Matrix Petroleum. We reserve the right to refuse or cancel any order at our sole discretion, including in cases of suspected fraud, pricing errors, or stock unavailability.",
      "Prices displayed on our website are exclusive of applicable taxes and delivery charges unless otherwise stated. All prices are subject to change without notice prior to the confirmation of your order.",
      "Payment is required in full at the time of ordering for retail purchases. Trade and commercial accounts may be subject to separate payment terms as agreed in writing with our trade team.",
      "We accept major credit and debit cards, and bank transfer for qualifying commercial orders. All transactions are processed via secure, PCI-compliant payment infrastructure. Matrix Petroleum does not store card details.",
    ],
  },
  {
    id: "delivery",
    number: "04",
    title: "Delivery & Risk",
    content: [
      "Delivery timescales provided at the point of order are estimates only. Matrix Petroleum shall not be liable for delays caused by circumstances beyond our reasonable control, including but not limited to carrier delays, customs clearance, industrial action, or force majeure events.",
      "Risk in the products passes to you upon delivery to the address specified in your order. Title to the products remains with Matrix Petroleum until payment is received in full.",
      "It is your responsibility to inspect all deliveries upon receipt and to notify us in writing of any damage, shortage, or discrepancy within 48 hours of delivery. Claims received outside this window may not be accepted.",
    ],
  },
  {
    id: "returns",
    number: "05",
    title: "Returns & Refunds",
    content: [
      "Retail customers may return unused, unopened products within 14 days of receipt for a full refund, excluding delivery charges. Products that have been opened, used, or damaged after delivery are not eligible for return under this policy.",
      "To initiate a return, you must contact our customer service team at hello@matrixpetroleum.com and obtain a returns authorisation number before sending any product back to us. We do not accept unauthorised returns.",
      "Commercial and fleet orders are subject to separate returns terms as outlined in the applicable trade agreement. Bulk quantities and custom formulations are generally non-returnable unless defective.",
      "Refunds will be processed within 10 business days of our receipt and inspection of the returned product, using the original payment method where possible.",
    ],
  },
  {
    id: "ip",
    number: "06",
    title: "Intellectual Property",
    content: [
      "All content on this website — including but not limited to text, imagery, video, formulations, chemical compositions, trademarks, trade names, logos, and product names — is the exclusive intellectual property of Matrix Petroleum Ltd or its licensors.",
      "The MaxFuel RX formulation, its constituent components, and the 6-pronged fuel optimisation methodology are protected by applicable intellectual property rights. You may not reverse-engineer, replicate, or commercially exploit any aspect of our formulation without prior written consent.",
      "You may not reproduce, distribute, or commercially exploit any content from this website without our express written permission. Personal, non-commercial use for reference purposes is permitted provided all proprietary notices are retained.",
    ],
  },
  {
    id: "liability",
    number: "07",
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, Matrix Petroleum shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or website, including but not limited to loss of profits, loss of data, or damage to equipment.",
      "Our total aggregate liability to you in connection with any claim arising under or in connection with these Terms shall not exceed the total amount paid by you for the relevant product(s) in the six months preceding the claim.",
      "Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other matter which cannot be excluded or limited by law.",
    ],
  },
  {
    id: "privacy",
    number: "08",
    title: "Privacy & Data",
    content: [
      "Your use of this website and our products is also governed by our Privacy Policy and Cookie Policy, each of which is incorporated into these Terms by reference. We encourage you to review these documents carefully.",
      "We process personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. By using our website or purchasing our products, you consent to such processing as described in our Privacy Policy.",
      "We will never sell your personal data to third parties. We may share data with trusted service providers who assist us in operating our business, subject to appropriate data processing agreements.",
    ],
  },
  {
    id: "governing",
    number: "09",
    title: "Governing Law",
    content: [
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
      "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.",
      "Matrix Petroleum reserves the right to amend these Terms at any time. Changes will be published on this page with an updated effective date. Your continued use of our website or products following any such changes constitutes your acceptance of the revised Terms.",
    ],
  },
  {
    id: "contact",
    number: "10",
    title: "Contact & Complaints",
    content: [
      "If you have any questions regarding these Terms and Conditions, or wish to raise a formal complaint, please contact us in writing at: legal@matrixpetroleum.com or by post to Matrix Petroleum Ltd, 3 Hardman Square, Manchester M3 3EB.",
      "We aim to acknowledge all written complaints within 2 business days and to provide a substantive response within 14 business days. We are committed to resolving disputes fairly and promptly.",
    ],
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
  }
  *, *::before, *::after { box-sizing: border-box; }
  body, html { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(2rem); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }

  .reveal-up {
    opacity: 0;
    transform: translateY(2.5rem);
    will-change: opacity, transform;
  }

  /* Sidebar nav */
  .tc-sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 0;
    border-bottom: 1px solid rgba(32,67,56,0.1);
    text-decoration: none;
    cursor: pointer;
    transition: padding-left 0.25s var(--easing-smooth);
  }
  .tc-sidebar-link:hover {
    padding-left: 0.5rem;
  }
  .tc-sidebar-link:hover .tc-sidebar-num {
    color: var(--color-f1-lime-green-darker);
  }
  .tc-sidebar-link:hover .tc-sidebar-label {
    color: var(--color-f1-green-dark);
  }
  .tc-sidebar-link.active .tc-sidebar-num {
    color: var(--color-f1-lime-green-darker);
  }
  .tc-sidebar-link.active .tc-sidebar-label {
    color: var(--color-f1-green-dark);
    font-weight: 500;
  }
  .tc-sidebar-link.active {
    padding-left: 0.5rem;
  }

  /* Section */
  .tc-section {
    padding: 5rem 0;
    border-top: 1px solid rgba(32,67,56,0.12);
    scroll-margin-top: 2rem;
  }
  .tc-section:first-of-type { border-top: none; padding-top: 0; }

  .tc-section-number {
    font-family: var(--font-flare);
    font-size: 0.625rem;
    color: var(--color-f1-lime-green-darker);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }
  .tc-section-title {
    font-family: var(--font-flare);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 400;
    text-transform: uppercase;
    color: var(--color-f1-green-dark);
    letter-spacing: -0.03em;
    line-height: 1;
    margin: 0 0 2.5rem;
  }
  .tc-para {
    font-family: var(--font-agrandir);
    font-size: clamp(12px, 1.1vw, 14px);
    line-height: 1.85;
    color: var(--color-grey-600);
    letter-spacing: 0.02em;
    margin-bottom: 1.5rem;
  }
  .tc-para:last-child { margin-bottom: 0; }

  /* ── FOOTER ── */
  .gy-footer { width: 100vw; background: #0d1311; padding: 72px 8vw 48px; }
  .gy-footer-inner { width: 100%; display: grid; grid-template-columns: 2fr 3fr; gap: 80px; align-items: start; }
  .gy-footer-logo {
    font-family: var(--font-flare); font-size: clamp(28px, 4vw, 48px);
    font-weight: 400; letter-spacing: .03em; color: var(--color-f1-lime-green);
    margin-bottom: 48px; line-height: 1; text-transform: uppercase;
  }
  .gy-footer-logo::after { content: '.'; }
  .gy-footer-nav { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
  .gy-footer-nav li a {
    display: block; font-family: var(--font-flare); font-size: clamp(16px, 2.8vw, 38px);
    font-weight: 400; text-transform: uppercase; color: var(--color-white);
    text-decoration: none; line-height: 1.25; padding: 4px 0; transition: opacity .2s;
  }
  .gy-footer-nav li a:hover { opacity: .6; }
  .gy-footer-right { display: flex; flex-direction: column; gap: 40px; padding-top: 8px; }
  .gy-footer-section-label {
    font-family: var(--font-agrandir); font-size: 10px; letter-spacing: .28em;
    text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 14px;
  }
  .gy-footer-social { display: flex; flex-wrap: wrap; gap: 8px 32px; list-style: none; padding: 0; margin: 0; }
  .gy-footer-social a {
    font-family: var(--font-agrandir); font-size: 11px; letter-spacing: .22em;
    text-transform: uppercase; color: var(--color-white); text-decoration: none;
    transition: opacity .2s; min-height: 44px; display: flex; align-items: center;
  }
  .gy-footer-social a:hover { opacity: .6; }
  .gy-footer-contact { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
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
    .tc-layout { grid-template-columns: 1fr !important; }
    .tc-sidebar { display: none !important; }
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

// ─── Main Component ────────────────────────────────────────────────────────────
export default function TermsAndConditions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const sectionRefs = useRef({});

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Hero animation on mount
  useEffect(() => {
    gsap.fromTo(
      ".hero-text-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  // Scroll-triggered reveals
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
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Active sidebar tracking via IntersectionObserver
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
                display: "flex",
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

        {/* ── HERO — dark, bottom-anchored ── */}
        <section
          style={{
            position: "relative",
            minHeight: "60vh",
            background: `linear-gradient(to bottom, ${COLORS.introBgTop}, ${COLORS.introBg})`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 8vw 7vh",
            overflow: "hidden",
          }}
        >
         

          {/* Decorative large text in background */}
          <div
            style={{
              position: "absolute",
              right: "5vw",
              bottom: "4vh",
              fontFamily: FONTS.flare,
              fontSize: "clamp(8rem, 20vw, 22rem)",
              fontWeight: 400,
              color: "rgba(198,253,58,0.04)",
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            T&C
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
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
              Matrix Petroleum — Legal
            </p>
            <h1
              className="hero-text-item"
              style={{
                opacity: 0,
                fontFamily: FONTS.flare,
                fontSize: "clamp(40px, 8vw, 110px)",
                fontWeight: 400,
                letterSpacing: ".01em",
                color: COLORS.white,
                lineHeight: 0.95,
                textTransform: "uppercase",
                margin: "0 0 28px",
              }}
            >
              Terms &<br />
              <span style={{ color: COLORS.f1LimeGreen }}>Conditions</span>
            </h1>

            {/* Meta row */}
            <div
              className="hero-text-item"
              style={{
                opacity: 0,
                display: "flex",
                gap: "3rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Effective Date", value: "1 January 2025" },
                { label: "Version", value: "2.1" },
                { label: "Jurisdiction", value: "England & Wales" },
              ].map((meta, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: FONTS.agrandir,
                      fontSize: "9px",
                      textTransform: "uppercase",
                      letterSpacing: ".22em",
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: "4px",
                    }}
                  >
                    {meta.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "13px",
                      textTransform: "uppercase",
                      color: COLORS.white,
                      letterSpacing: ".04em",
                    }}
                  >
                    {meta.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRO BAND ── */}
        <section
          style={{
            background: COLORS.grey100,
            padding: "4rem 8vw",
            borderBottom: `1px solid rgba(32,67,56,0.1)`,
          }}
        >
          <div style={{ maxWidth: "60rem" }}>
            <p
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "clamp(12px, 1.1vw, 14px)",
                lineHeight: 1.85,
                color: COLORS.f1GreenDark,
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              Please read these Terms and Conditions carefully before using the
              Matrix Petroleum website or purchasing MaxFuel RX products. By
              continuing to use our services you agree to be bound by these
              terms. If you have any questions, contact our legal team at{" "}
              <span
                style={{
                  color: COLORS.f1LimeGreenDark,
                  borderBottom: `1px solid ${COLORS.f1LimeGreenDark}`,
                }}
              >
                legal@matrixpetroleum.com
              </span>
              .
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT: Sidebar + Sections ── */}
        <section style={{ padding: "6rem 8vw 10rem" }}>
          <div
            className="tc-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: "6rem",
              alignItems: "start",
            }}
          >
            {/* ── STICKY SIDEBAR ── */}
            <aside
              className="tc-sidebar"
              style={{
                position: "sticky",
                top: "4rem",
                alignSelf: "start",
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: ".22em",
                  color: "rgba(32,67,56,0.4)",
                  marginBottom: "1.5rem",
                }}
              >
                Contents
              </p>
              {SECTIONS.map((s) => (
                <div
                  key={s.id}
                  className={`tc-sidebar-link${activeSection === s.id ? " active" : ""}`}
                  onClick={() => scrollToSection(s.id)}
                >
                  <span
                    className="tc-sidebar-num"
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "10px",
                      color:
                        activeSection === s.id
                          ? COLORS.f1LimeGreenDark
                          : "rgba(32,67,56,0.3)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      flexShrink: 0,
                      transition: "color 0.2s ease",
                      minWidth: "1.8rem",
                    }}
                  >
                    {s.number}
                  </span>
                  <span
                    className="tc-sidebar-label"
                    style={{
                      fontFamily: FONTS.agrandir,
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      color:
                        activeSection === s.id
                          ? COLORS.f1GreenDark
                          : "rgba(32,67,56,0.45)",
                      lineHeight: 1.3,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {s.title}
                  </span>
                </div>
              ))}

              {/* Last updated note */}
              <div
                style={{
                  marginTop: "2.5rem",
                  paddingTop: "2rem",
                  borderTop: `1px solid rgba(32,67,56,0.1)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: ".18em",
                    color: "rgba(32,67,56,0.35)",
                    lineHeight: 1.6,
                  }}
                >
                  Last Updated
                  <br />
                  <span style={{ color: COLORS.f1GreenDark }}>
                    1 January 2025
                  </span>
                </div>
              </div>
            </aside>

            {/* ── SECTIONS ── */}
            <div>
              {SECTIONS.map((section, i) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="tc-section reveal-up"
                  style={{ paddingTop: i === 0 ? 0 : "5rem" }}
                >
                  <div className="tc-section-number">{section.number}</div>
                  <h2 className="tc-section-title">{section.title}</h2>
                  {section.content.map((para, j) => (
                    <p key={j} className="tc-para">
                      {para}
                    </p>
                  ))}
                </div>
              ))}

              {/* ── Acceptance block ── */}
              <div
                style={{
                  marginTop: "5rem",
                  padding: "3rem",
                  background: COLORS.f1GreenDark,
                  borderRadius: "0.1875rem",
                }}
              >
                <p
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: ".22em",
                    color: COLORS.f1LimeGreenDark,
                    marginBottom: "1rem",
                  }}
                >
                  Your Acceptance
                </p>
                <p
                  style={{
                    fontFamily: FONTS.flare,
                    fontSize: "clamp(14px, 1.5vw, 20px)",
                    textTransform: "uppercase",
                    color: COLORS.white,
                    lineHeight: 1.3,
                    letterSpacing: "-.01em",
                    margin: "0 0 2rem",
                  }}
                >
                  By using our website or products, you confirm that you have
                  read, understood, and agree to these Terms and Conditions.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a
                    href="/contact-us"
                    style={{
                      background: COLORS.f1LimeGreen,
                      color: COLORS.f1GreenDark,
                      border: "none",
                      padding: "13px 32px",
                      fontFamily: FONTS.agrandir,
                      fontSize: "10px",
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderRadius: "2px",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = COLORS.f1LimeGreenDark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = COLORS.f1LimeGreen;
                    }}
                  >
                    Contact Legal Team
                  </a>
                  <a
                    href="/"
                    style={{
                      background: "transparent",
                      color: COLORS.white,
                      border: "1px solid rgba(255,255,255,0.25)",
                      padding: "13px 32px",
                      fontFamily: FONTS.agrandir,
                      fontSize: "10px",
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderRadius: "2px",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Return Home
                  </a>
                </div>
              </div>
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
                    <a href="/contact-us">General Enquiries</a>
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
