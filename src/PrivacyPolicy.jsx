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

// ─── Cookie categories for the interactive banner ─────────────────────────────
const COOKIE_CATEGORIES = [
  {
    id: "essential",
    label: "Essential",
    description: "Required for the website to function. Cannot be disabled.",
    locked: true,
    examples: ["Session authentication", "Security tokens", "Load balancing"],
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Help us understand how visitors interact with our website so we can improve the experience.",
    locked: false,
    examples: ["Page view counts", "Traffic sources", "User journey mapping"],
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Used to deliver relevant advertising and track campaign effectiveness across platforms.",
    locked: false,
    examples: ["Ad targeting", "Conversion tracking", "Retargeting pixels"],
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Remember your settings and personalisation choices across visits.",
    locked: false,
    examples: ["Language preference", "Region selection", "Display settings"],
  },
];

// ─── Privacy Sections ─────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "overview",
    number: "01",
    title: "Overview", content: [ "Matrix Petroleum Ltd  is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and share your information when you visit our website, purchase our products, or otherwise interact with us.",
      "This policy applies to all personal data processed by Matrix Petroleum Ltd, registered in England and Wales (Company Number 11462010), whose registered office is at 3 Hardman Square, Manchester M3 3EB.",
      "We are the data controller for personal data collected through our website and commercial activities. We process your data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
    ],
  },
  {
    id: "data-collected",
    number: "02",
    title: "Data We Collect", content: [ "We collect personal data that you provide directly to us — for example when you submit an enquiry through our contact form, place an order, register for a trade account, or subscribe to product updates. This may include your name, email address, telephone number, company name, job title, and delivery address.",
      "We also collect data automatically when you visit our website, including your IP address, browser type and version, operating system, referring URLs, pages visited, time spent on pages, and other diagnostic data. This is collected via cookies and similar technologies.",
      "Where you apply for a trade or commercial account, we may request additional business information including VAT registration numbers, company registration details, and trade references. This information is used solely for credit assessment and account management purposes.",
      "We do not knowingly collect personal data from individuals under the age of 18. If you believe a minor has provided us with personal data, please contact us immediately so we can remove it.",
    ],
  },
  {
    id: "how-we-use",
    number: "03",
    title: "How We Use Your Data", content: [ "We use the personal data we collect to process and fulfil your orders, manage your account, respond to enquiries, and provide after-sales support. This processing is necessary for the performance of a contract with you.",
      "With your consent, we may send you product updates, industry news, and promotional communications about MaxFuel RX and related Matrix Petroleum products. You may withdraw this consent at any time by clicking 'unsubscribe' in any email or contacting us directly.",
      "We use automatically collected data to analyse website performance, identify technical issues, understand how users navigate our site, and improve our digital experience. This processing is based on our legitimate interest in maintaining and improving our online presence.",
      "We may also use your data to comply with legal obligations, prevent fraud, and protect the rights and safety of Matrix Petroleum, our customers, and third parties.",
    ],
  },
  {
    id: "legal-basis",
    number: "04",
    title: "Legal Basis for Processing",
    content: [
      "We rely on the following legal bases to process your personal data under UK GDPR: (a) Contract — where processing is necessary to fulfil an order or manage your account; (b) Consent — where you have given explicit consent, such as for marketing communications; (c) Legitimate Interests — where we have a legitimate business interest that does not override your rights, such as website analytics and fraud prevention; and (d) Legal Obligation — where we are required to process data to comply with applicable law.",
      "Where we rely on legitimate interests as our legal basis, we conduct a balancing test to ensure our interests do not override your fundamental rights and freedoms. You have the right to object to this processing at any time.",
    ],
  },
  {
    id: "sharing",
    number: "05",
    title: "Data Sharing", content: [ "We do not sell, rent, or trade your personal data to third parties for their own marketing purposes. We may share your data with carefully selected service providers who assist us in operating our business — for example, payment processors, logistics partners, email service providers, and website analytics platforms.",
      "All third-party processors are bound by data processing agreements and are permitted to use your data only for the specific purposes we instruct. We select processors who provide sufficient guarantees of technical and organisational security measures.",
      "We may disclose your data to regulatory authorities, law enforcement bodies, or courts where required by law, or where necessary to protect our legal rights, prevent fraud, or ensure the safety of individuals.",
      "In the event of a business acquisition, merger, or restructuring, your personal data may be transferred to the relevant successor entity, subject to the same privacy protections described in this policy.",
    ],
  },
  {
    id: "retention",
    number: "06",
    title: "Data Retention", content: [ "We retain your personal data only for as long as is necessary to fulfil the purposes for which it was collected, or as required by law. The specific retention period depends on the nature of the data and the purpose for which it is processed.",
      "Order and transaction records are retained for seven years to comply with HMRC financial record-keeping requirements. Contact enquiry data is retained for up to two years from the date of last contact. Marketing consent records are retained until consent is withdrawn plus one year thereafter.",
      "Automatically collected website data is typically retained in anonymised or aggregated form for up to 26 months. At the end of each retention period, data is securely deleted or anonymised.",
    ],
  },
  {
    id: "your-rights",
    number: "07",
    title: "Your Rights", content: [ "Under UK GDPR, you have the following rights in relation to your personal data: the right to access a copy of the data we hold about you; the right to rectification of inaccurate or incomplete data; the right to erasure ('right to be forgotten') in certain circumstances; the right to restriction of processing in certain circumstances; the right to data portability; and the right to object to processing based on legitimate interests or for direct marketing.",
      "To exercise any of these rights, please contact our Data Protection Officer at privacy@matrixpetroleum.com. We will respond to all verified requests within 30 days. In complex cases, this period may be extended by a further two months, in which case we will notify you.",
      "You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk if you believe we have not handled your data lawfully. We would, however, appreciate the opportunity to address your concerns directly before you approach the ICO.",
    ],
  },
  {
    id: "security",
    number: "08",
    title: "Data Security", content: [ "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, accidental loss, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, access controls and authentication requirements, regular security assessments, and staff training on data protection obligations.",
      "Where we engage third-party processors, we ensure they implement equivalent security standards. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
      "In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the ICO within 72 hours of becoming aware of the breach and, where required, will inform affected individuals without undue delay.",
    ],
  },
  {
    id: "cookies",
    number: "09",
    title: "Cookies & Tracking", content: [ "Our website uses cookies — small text files stored on your device — to distinguish you from other users, remember your preferences, and analyse how our site is used. Some cookies are essential for the website to function; others are optional and require your consent.",
      "We use first-party cookies set by Matrix Petroleum directly, and third-party cookies set by trusted analytics and advertising partners. Third-party cookies are subject to the privacy policies of those respective organisations.",
      "You can manage your cookie preferences at any time using our Cookie Preference Centre below, or by adjusting your browser settings. Please note that disabling certain cookies may affect the functionality of our website.",
      "We also use similar tracking technologies such as web beacons and pixel tags in our marketing emails to understand engagement rates and improve our communications.",
    ],
  },
  {
    id: "international",
    number: "10",
    title: "International Transfers", content: [ "Some of our third-party service providers are based outside the United Kingdom. Where we transfer personal data internationally, we ensure appropriate safeguards are in place in accordance with UK GDPR requirements — for example, through the use of International Data Transfer Agreements (IDTAs) or equivalent transfer mechanisms.",
      "We maintain a register of all international data transfers and the safeguards applied to each. You may request details of these safeguards by contacting our Data Protection Officer.",
    ],
  },
  {
    id: "changes",
    number: "11",
    title: "Policy Changes", content: [ "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the 'Last Updated' date at the top of this page and, where appropriate, notify you by email.",
      "We encourage you to review this policy periodically. Your continued use of our website or products following any changes constitutes your acceptance of the updated policy.",
      "For any questions about this Privacy Policy or our data practices, please contact: Matrix Petroleum Ltd, Data Protection Officer, 3 Hardman Square, Manchester M3 3EB, or email privacy@matrixpetroleum.com.",
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

  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }

  .reveal-up {
    opacity: 0;
    transform: translateY(2.5rem);
    will-change: opacity, transform;
  }

  /* ── Sidebar ── */
  .tc-sidebar-link {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.85rem 0; border-bottom: 1px solid rgba(32,67,56,0.1);
    text-decoration: none; cursor: pointer;
    transition: padding-left 0.25s var(--easing-smooth);
  }
  .tc-sidebar-link:hover { padding-left: 0.5rem; }
  .tc-sidebar-link:hover .tc-sidebar-num { color: var(--color-f1-lime-green-darker); }
  .tc-sidebar-link:hover .tc-sidebar-label { color: var(--color-f1-green-dark); }
  .tc-sidebar-link.active .tc-sidebar-num { color: var(--color-f1-lime-green-darker); }
  .tc-sidebar-link.active .tc-sidebar-label { color: var(--color-f1-green-dark); }
  .tc-sidebar-link.active { padding-left: 0.5rem; }

  /* ── Sections ── */
  .tc-section { padding: 5rem 0; border-top: 1px solid rgba(32,67,56,0.12); scroll-margin-top: 2rem; }
  .tc-section:first-of-type { border-top: none; padding-top: 0; }
  .tc-para {
    font-family: var(--font-agrandir); font-size: clamp(12px,1.1vw,14px);
    line-height: 1.85; color: var(--color-grey-600); letter-spacing: 0.02em; margin-bottom: 1.5rem;
  }
  .tc-para:last-child { margin-bottom: 0; }

  /* ── Cookie toggle ── */
  .cookie-card {
    border: 1px solid rgba(32,67,56,0.12);
    border-radius: 3px;
    padding: 1.75rem 2rem;
    margin-bottom: 1rem;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .cookie-card:hover { border-color: rgba(32,67,56,0.28); }
  .cookie-card.enabled { border-color: rgba(151,203,17,0.4); background: rgba(151,203,17,0.03); }

  .cookie-toggle {
    position: relative; width: 42px; height: 24px; flex-shrink: 0;
    background: rgba(32,67,56,0.15); border-radius: 12px;
    cursor: pointer; border: none; transition: background 0.3s ease;
  }
  .cookie-toggle.on { background: var(--color-f1-lime-green-darker); }
  .cookie-toggle.locked { background: rgba(32,67,56,0.08); cursor: not-allowed; }
  .cookie-toggle::after {
    content: '';
    position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px; border-radius: 50%;
    background: white;
    transition: transform 0.3s var(--easing-snappy);
    box-shadow: 0 1px 4px rgba(0,0,0,0.18);
  }
  .cookie-toggle.on::after { transform: translateX(18px); }
  .cookie-toggle.locked::after { background: rgba(32,67,56,0.3); }

  .cookie-example-pill {
    display: inline-block;
    padding: 0.25rem 0.65rem;
    background: rgba(32,67,56,0.06);
    border-radius: 2px;
    font-family: var(--font-agrandir);
    font-size: 9px; text-transform: uppercase; letter-spacing: .1em;
    color: rgba(32,67,56,0.5);
    margin: 0.2rem 0.2rem 0 0;
  }

  /* ── Footer ── */
  .gy-footer { width: 100vw; background: #0d1311; padding: 72px 8vw 48px; }
  .gy-footer-inner { width: 100%; display: grid; grid-template-columns: 2fr 3fr; gap: 80px; align-items: start; }
  .gy-footer-logo {
    font-family: var(--font-flare); font-size: clamp(28px,4vw,48px);
    font-weight: 400; letter-spacing: .03em; color: var(--color-f1-lime-green);
    margin-bottom: 48px; line-height: 1; text-transform: uppercase;
  }
  .gy-footer-logo::after { content: '.'; }
  .gy-footer-nav { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
  .gy-footer-nav li a {
    display: block; font-family: var(--font-flare); font-size: clamp(16px,2.8vw,38px);
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
    .cookie-grid { grid-template-columns: 1fr !important; }
  }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconHamburger = ({ open }) => (
  <svg width="30" height="14" viewBox="0 0 26 16" fill="none">
    {open ? (
      <>
        <line x1="1" y1="1" x2="25" y2="15" stroke="black" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="1" y1="15" x2="25" y2="1" stroke="black" strokeWidth="4.5" strokeLinecap="round" />
      </>
    ) : (
      <>
        <line x1="1" y1="2" x2="25" y2="2" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="12" x2="25" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  </svg>
);

// ─── Cookie Preference Centre ──────────────────────────────────────────────────
function CookiePreferenceCentre() {
  const [prefs, setPrefs] = useState({ essential: true, analytics: false, marketing: false, preferences: false });
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
    setSaved(false);
  };

  const acceptAll = () => {
    setPrefs({ essential: true, analytics: true, marketing: true, preferences: true });
    setSaved(false);
  };

  const save = () => { setSaved(true); };

  return (
    <div style={{ marginTop: "2.5rem" }}>
      {COOKIE_CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          className={`cookie-card${prefs[cat.id] ? " enabled" : ""}`}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                <span style={{
                  fontFamily: FONTS.flare, fontSize: "0.875rem",
                  textTransform: "uppercase", color: COLORS.f1GreenDark,
                  letterSpacing: "0.02em",
                }}>
                  {cat.label}
                </span>
                {cat.locked && (
                  <span style={{
                    fontFamily: FONTS.agrandir, fontSize: "8px",
                    textTransform: "uppercase", letterSpacing: ".14em",
                    color: COLORS.f1LimeGreenDark,
                    border: `1px solid ${COLORS.f1LimeGreenDark}`,
                    padding: "2px 6px", borderRadius: "2px",
                  }}>
                    Always On
                  </span>
                )}
              </div>
              <p style={{
                fontFamily: FONTS.agrandir, fontSize: "11px",
                color: "rgba(32,67,56,0.6)", lineHeight: 1.7,
                letterSpacing: ".02em", margin: "0 0 0.85rem",
              }}>
                {cat.description}
              </p>
              <div>
                {cat.examples.map((ex) => (
                  <span key={ex} className="cookie-example-pill">{ex}</span>
                ))}
              </div>
            </div>
            <button
              className={`cookie-toggle${cat.locked ? " locked on" : prefs[cat.id] ? " on" : ""}`}
              onClick={() => !cat.locked && toggle(cat.id)}
              aria-label={`Toggle ${cat.label} cookies`}
              aria-pressed={prefs[cat.id]}
            />
          </div>
        </div>
      ))}

      {/* Actions */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={save}
          style={{
            background: COLORS.f1LimeGreen, color: COLORS.f1GreenDark,
            border: "none", padding: "13px 32px",
            fontFamily: FONTS.agrandir, fontSize: "10px",
            letterSpacing: ".22em", textTransform: "uppercase",
            cursor: "pointer", borderRadius: "2px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.f1LimeGreenDark; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.f1LimeGreen; }}
        >
          Save Preferences
        </button>
        <button
          onClick={acceptAll}
          style={{
            background: "transparent", color: COLORS.f1GreenDark,
            border: `1px solid rgba(32,67,56,0.25)`, padding: "13px 32px",
            fontFamily: FONTS.agrandir, fontSize: "10px",
            letterSpacing: ".22em", textTransform: "uppercase",
            cursor: "pointer", borderRadius: "2px",
            transition: "border-color 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.grey100; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          Accept All
        </button>
        {saved && (
          <span style={{
            fontFamily: FONTS.agrandir, fontSize: "9px",
            textTransform: "uppercase", letterSpacing: ".18em",
            color: COLORS.f1LimeGreenDark,
          }}>
            ✓ Preferences saved
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    gsap.fromTo(
      ".hero-text-item",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal-up");
    const triggers = [];
    els.forEach((el) => {
      const t = ScrollTrigger.create({
        trigger: el, start: "top 88%",
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
        once: true,
      });
      triggers.push(t);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
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

      <div style={{
        fontFamily: FONTS.caslon, background: COLORS.white, color: COLORS.black,
        overflowX: "hidden", WebkitFontSmoothing: "antialiased",
      }}>

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", top: "0.75rem", left: 0, right: 0,
          zIndex: 10003, display: "flex", justifyContent: "center", pointerEvents: "none",
        }}>
          <div style={{
            width: "4.25rem", height: "1.5442rem",
            borderRadius: "0.1875rem", boxShadow: f1Shadow, pointerEvents: "auto",
          }}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%", height: "100%", background: COLORS.white,
                border: "none", borderRadius: "0.1875rem", cursor: "pointer",
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
        <div style={{
          position: "fixed", inset: 0, zIndex: 1002, padding: "0.5rem",
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
          transition: `visibility 0s ${menuOpen ? "0s" : "0.35s"}`,
        }}>
          <div onClick={() => setMenuOpen(false)} style={{
            position: "absolute", inset: 0, background: COLORS.black,
            opacity: menuOpen ? 0.35 : 0, transition: `opacity 0.35s ${easeSmooth}`,
          }} />
          <div style={{
            position: "relative", display: "flex", flexDirection: "column", gap: "4rem",
            margin: "0 auto", width: "100%", maxWidth: "23.5rem",
            padding: "8.25rem 1.5rem 7.75rem", overflowY: "auto",
            background: COLORS.white, borderRadius: "0.1875rem",
            transform: menuOpen ? "translateY(0)" : "translateY(-1rem)",
            opacity: menuOpen ? 1 : 0,
            transition: `transform 0.35s ${easeSnappy}, opacity 0.3s ${easeSmooth}`,
          }}>
            {NAV_LINKS.map((link, i) => (
              <div key={i} style={{ display: "grid", placeItems: "center", width: "100%", maxWidth: "25ch", margin: "0 auto" }}>
                <a href={link.href} className="am-nav-item-link"
                  style={{ display: "flex", flexDirection: "column", gap: "0.2rem", textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span style={{
                    fontFamily: FONTS.flare, fontSize: "0.875rem", fontWeight: 400,
                    lineHeight: "140%", color: COLORS.black, textAlign: "center", textTransform: "uppercase",
                  }}>{link.label}</span>
                  <span style={{
                    fontFamily: FONTS.agrandir, fontSize: "0.625rem", fontWeight: 400,
                    lineHeight: "100%", color: COLORS.navSubtitle, textAlign: "center",
                    textTransform: "uppercase", letterSpacing: "0.0312rem",
                  }}>{link.sub}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── HERO ── */}
        <section style={{
          position: "relative", minHeight: "60vh",
          background: `linear-gradient(to bottom, ${COLORS.introBgTop}, ${COLORS.introBg})`,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 8vw 7vh", overflow: "hidden",
        }}>
         

          {/* Decorative watermark */}
          <div style={{
            position: "absolute", right: "4vw", bottom: "2vh",
            fontFamily: FONTS.flare,
            fontSize: "clamp(7rem, 18vw, 20rem)",
            fontWeight: 400, color: "rgba(198,253,58,0.04)",
            textTransform: "uppercase", letterSpacing: "-0.05em",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>
            Privacy
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p className="hero-text-item" style={{
              opacity: 0, fontFamily: FONTS.agrandir, fontSize: "11px",
              letterSpacing: ".28em", textTransform: "uppercase",
              color: COLORS.f1LimeGreenDark, margin: "0 0 16px",
            }}>
              Matrix Petroleum — Legal
            </p>
            <h1 className="hero-text-item" style={{
              opacity: 0, fontFamily: FONTS.flare,
              fontSize: "clamp(40px, 8vw, 110px)",
              fontWeight: 400, letterSpacing: ".01em",
              color: COLORS.white, lineHeight: 0.95,
              textTransform: "uppercase", margin: "0 0 28px",
            }}>
              Privacy &<br />
              <span style={{ color: COLORS.f1LimeGreen }}>Cookies</span>
            </h1>

            {/* Meta row */}
            <div className="hero-text-item" style={{ opacity: 0, display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {[
                { label: "Effective Date", value: "1 January 2025" },
                { label: "Version", value: "3.0" },
                { label: "Jurisdiction", value: "England & Wales" },
                { label: "DPA Registration", value: "ZA123456" },
              ].map((meta, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: FONTS.agrandir, fontSize: "9px",
                    textTransform: "uppercase", letterSpacing: ".22em",
                    color: "rgba(255,255,255,0.35)", marginBottom: "4px",
                  }}>{meta.label}</div>
                  <div style={{
                    fontFamily: FONTS.flare, fontSize: "13px",
                    textTransform: "uppercase", color: COLORS.white, letterSpacing: ".04em",
                  }}>{meta.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRO BAND ── */}
        <section style={{
          background: COLORS.grey100, padding: "4rem 8vw",
          borderBottom: `1px solid rgba(32,67,56,0.1)`,
        }}>
          <div style={{ maxWidth: "60rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "clamp(12px, 1.1vw, 14px)",
              lineHeight: 1.85, color: COLORS.f1GreenDark, letterSpacing: "0.02em", margin: 0,
            }}>
              Your privacy matters to us. This policy explains exactly what data we collect, why we collect it, and how you can control it. For questions or to exercise your data rights, contact our Data Protection Officer at{" "}
              <span style={{ color: COLORS.f1LimeGreenDark, borderBottom: `1px solid ${COLORS.f1LimeGreenDark}` }}>
                privacy@matrixpetroleum.com
              </span>.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section style={{ padding: "6rem 8vw 10rem" }}>
          <div className="tc-layout" style={{
            display: "grid", gridTemplateColumns: "240px 1fr", gap: "6rem", alignItems: "start",
          }}>

            {/* ── STICKY SIDEBAR ── */}
            <aside className="tc-sidebar" style={{ position: "sticky", top: "4rem", alignSelf: "start" }}>
              <p style={{
                fontFamily: FONTS.agrandir, fontSize: "9px",
                textTransform: "uppercase", letterSpacing: ".22em",
                color: "rgba(32,67,56,0.4)", marginBottom: "1.5rem",
              }}>
                Contents
              </p>
              {SECTIONS.map((s) => (
                <div
                  key={s.id}
                  className={`tc-sidebar-link${activeSection === s.id ? " active" : ""}`}
                  onClick={() => scrollToSection(s.id)}
                >
                  <span className="tc-sidebar-num" style={{
                    fontFamily: FONTS.flare, fontSize: "10px",
                    color: activeSection === s.id ? COLORS.f1LimeGreenDark : "rgba(32,67,56,0.3)",
                    textTransform: "uppercase", letterSpacing: ".06em",
                    flexShrink: 0, transition: "color 0.2s ease", minWidth: "1.8rem",
                  }}>{s.number}</span>
                  <span className="tc-sidebar-label" style={{
                    fontFamily: FONTS.agrandir, fontSize: "10px",
                    textTransform: "uppercase", letterSpacing: ".1em",
                    color: activeSection === s.id ? COLORS.f1GreenDark : "rgba(32,67,56,0.45)",
                    lineHeight: 1.3, transition: "color 0.2s ease",
                  }}>{s.title}</span>
                </div>
              ))}

              <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: `1px solid rgba(32,67,56,0.1)` }}>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "9px",
                  textTransform: "uppercase", letterSpacing: ".18em",
                  color: "rgba(32,67,56,0.35)", lineHeight: 1.6,
                }}>
                  Last Updated<br />
                  <span style={{ color: COLORS.f1GreenDark }}>1 January 2025</span>
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
                  <div style={{
                    fontFamily: FONTS.flare, fontSize: "0.625rem",
                    color: COLORS.f1LimeGreenDark, textTransform: "uppercase",
                    letterSpacing: "0.1em", marginBottom: "1rem",
                  }}>{section.number}</div>
                  <h2 style={{
                    fontFamily: FONTS.flare, fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 400, textTransform: "uppercase", color: COLORS.f1GreenDark,
                    letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 2.5rem",
                  }}>{section.title}</h2>

                  {section.content.map((para, j) => (
                    <p key={j} className="tc-para">{para}</p>
                  ))}

                  {/* Cookie Preference Centre inlined in section 09 */}
                  {section.id === "cookies" && <CookiePreferenceCentre />}
                </div>
              ))}

              {/* ── Data Rights Quick Reference ── */}
              <div className="reveal-up" style={{ marginTop: "5rem" }}>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "9px",
                  textTransform: "uppercase", letterSpacing: ".22em",
                  color: COLORS.f1LimeGreenDark, marginBottom: "1.5rem",
                }}>
                  Your Rights at a Glance
                </div>
                <div className="cookie-grid" style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
                  background: "rgba(32,67,56,0.1)", borderRadius: "3px", overflow: "hidden",
                }}>
                  {[
                    { right: "Access", desc: "Request a copy of your data" },
                    { right: "Rectify", desc: "Correct inaccurate data" },
                    { right: "Erase", desc: "Request deletion of your data" },
                    { right: "Restrict", desc: "Limit how we use your data" },
                    { right: "Portability", desc: "Receive your data in a usable format" },
                    { right: "Object", desc: "Object to certain types of processing" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: "1.75rem", background: COLORS.white,
                    }}>
                      <div style={{
                        fontFamily: FONTS.flare, fontSize: "0.875rem",
                        textTransform: "uppercase", color: COLORS.f1GreenDark,
                        letterSpacing: "0.02em", marginBottom: "0.5rem",
                      }}>{item.right}</div>
                      <div style={{
                        fontFamily: FONTS.agrandir, fontSize: "10px",
                        color: "rgba(32,67,56,0.5)", lineHeight: 1.6, letterSpacing: ".02em",
                      }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <p style={{
                  fontFamily: FONTS.agrandir, fontSize: "10px",
                  color: "rgba(32,67,56,0.45)", letterSpacing: ".02em",
                  lineHeight: 1.7, marginTop: "1rem",
                }}>
                  To exercise any of these rights, email{" "}
                  <span style={{ color: COLORS.f1LimeGreenDark }}>privacy@matrixpetroleum.com</span>.
                  We will respond within 30 days.
                </p>
              </div>

              {/* ── Acceptance block ── */}
              <div style={{
                marginTop: "4rem", padding: "3rem",
                background: COLORS.f1GreenDark, borderRadius: "0.1875rem",
              }}>
                <p style={{
                  fontFamily: FONTS.agrandir, fontSize: "9px",
                  textTransform: "uppercase", letterSpacing: ".22em",
                  color: COLORS.f1LimeGreenDark, marginBottom: "1rem",
                }}>
                  Questions about your data?
                </p>
                <p style={{
                  fontFamily: FONTS.flare, fontSize: "clamp(14px, 1.5vw, 20px)",
                  textTransform: "uppercase", color: COLORS.white,
                  lineHeight: 1.3, letterSpacing: "-.01em", margin: "0 0 2rem",
                }}>
                  Our Data Protection Officer is here to help with any privacy concerns.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="/contact-us" style={{
                    background: COLORS.f1LimeGreen, color: COLORS.f1GreenDark,
                    border: "none", padding: "13px 32px",
                    fontFamily: FONTS.agrandir, fontSize: "10px",
                    letterSpacing: ".22em", textTransform: "uppercase",
                    cursor: "pointer", borderRadius: "2px", textDecoration: "none",
                    display: "inline-block", transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.f1LimeGreenDark; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.f1LimeGreen; }}
                  >
                    Contact DPO
                  </a>
                  <a href="/terms-and-conditions" style={{
                    background: "transparent", color: COLORS.white,
                    border: "1px solid rgba(255,255,255,0.25)",
                    padding: "13px 32px", fontFamily: FONTS.agrandir, fontSize: "10px",
                    letterSpacing: ".22em", textTransform: "uppercase",
                    cursor: "pointer", borderRadius: "2px", textDecoration: "none",
                    display: "inline-block", transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    View Terms & Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DISCLAIMER ── */}
        <div style={{ padding: "2rem 1.5rem", textAlign: "center", background: COLORS.grey100 }}>
          <p style={{
            fontFamily: FONTS.agrandir, fontSize: "0.625rem",
            lineHeight: "140%", letterSpacing: "0.065rem",
            textTransform: "uppercase", color: COLORS.grey600, opacity: 0.8, margin: 0,
          }}>
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
                    <li key={s}><a href="#">{s}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="gy-footer-section-label">Contact Us</p>
                <ul className="gy-footer-contact">
                  <li><a href="/contact-us">General Enquiries</a></li>
                </ul>
              </div>
              <div className="gy-footer-legal">
                <p className="gy-footer-tagline">Skilfully Engineered. Use Responsibly.</p>
                <p className="gy-footer-disclaimer">
                  2025 Matrix Petroleum Ltd. Registered in England. Registered Number 11462010<br />
                  Registered Office: 3 Hardman Square, Manchester M3 3EB<br />
                  This content is intended only for people who are of legal purchase age in their country. Do not forward to minors.
                </p>
                <p className="gy-footer-drinkaware"><strong>matrixpetroleum</strong>.com</p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}