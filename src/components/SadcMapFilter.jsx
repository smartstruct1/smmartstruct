import { useState } from "react";
import {
  COUNTRIES_BASE,
  COUNTRY_PATHS,
  MAP_W,
  MAP_H,
  INSET_ISLANDS,
} from "./sadcCountryData";
import "./SadcMapFilter.css";

const PADDING = 40;
const VIEWBOX = `${-PADDING} ${-PADDING} ${MAP_W + PADDING * 2} ${MAP_H + PADDING * 2}`;

// Countries too small on the map to carry an inline label legibly.
// Their names still surface via hover tooltip and the side list.
const NO_INLINE_LABEL = new Set(["LSO", "SWZ", "COM"]);

// SmartStruct's head office. Adjust if this changes.
const HQ_ID = "ZWE";

const DISCIPLINES = ["Engineering", "Infrastructure", "Technology"];

/**
 * SadcMapFilter — "Regional Reach"
 *
 * A static, no-backend map of the SADC region for SmartStruct's site.
 * Clicking a country doesn't filter any data (there's no per-country
 * project database) — it just surfaces a "start a project here" prompt
 * that scrolls to the contact section. Fully self-contained: no router,
 * no Firebase, no external data required.
 *
 * @param {(countryId: string) => void} [onSelectCountry] - called when a
 *   country's CTA is clicked. Defaults to smooth-scrolling to #contact.
 */
export default function SadcMapFilter({ onSelectCountry }) {
  const [active, setActive] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const activeCountry = COUNTRIES_BASE.find((c) => c.id === active);

  function toggle(id) {
    setActive((prev) => (prev === id ? null : id));
  }

  function handleStartProject() {
    if (!activeCountry) return;
    if (onSelectCountry) {
      onSelectCountry(activeCountry.id);
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleMouseMove(e, country) {
    if (!country) return;
    const rect = e.currentTarget
      .closest("svg")
      .parentElement.getBoundingClientRect();
    setTooltip({
      country,
      x: e.clientX - rect.left + 14,
      y: e.clientY - rect.top - 12,
    });
  }

  const sortedForList = [...COUNTRIES_BASE].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <section className="sadc-section">
      <div className="sadc-inner">
        {/* Header */}
        <div className="sadc-header">
          <div>
            <p className="sadc-eyebrow">Regional reach</p>
            <h2 className="sadc-title">Engineering Across the SADC Region</h2>
            <p className="sadc-sub">
              Headquartered in Harare, delivering structural, infrastructure and
              technology projects across Southern Africa.
            </p>
          </div>
          {active && (
            <button className="sadc-clear" onClick={() => setActive(null)}>
              Clear selection ✕
            </button>
          )}
        </div>

        <div className="sadc-layout">
          {/* ── MAP ── */}
          <div className="sadc-map-wrap">
            <svg
              viewBox={VIEWBOX}
              className="sadc-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Object.entries(COUNTRY_PATHS).map(([id, d]) => {
                const country = COUNTRIES_BASE.find((c) => c.id === id);
                const isActive = active === id;
                const isHQ = id === HQ_ID;
                return (
                  <g key={id}>
                    <path
                      d={d}
                      fillRule="evenodd"
                      className={`sadc-path ${isActive ? "sadc-path--active" : "sadc-path--idle"} ${isHQ ? "sadc-path--hq" : ""}`}
                      onClick={() => toggle(id)}
                      onMouseMove={(e) => handleMouseMove(e, country)}
                      onMouseLeave={() => setTooltip(null)}
                    />
                    {!NO_INLINE_LABEL.has(id) && (
                      <text
                        x={country.cx}
                        y={country.cy}
                        className={`sadc-label ${isActive ? "sadc-label--active" : ""}`}
                      >
                        {country.name}
                      </text>
                    )}
                    {isHQ && (
                      <g className="sadc-hq-marker">
                        <circle cx={country.cx} cy={country.cy + 16} r="3.5" />
                        <text x={country.cx} y={country.cy + 30}>
                          HQ
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {tooltip && (
              <div
                className="sadc-tooltip"
                style={{ left: tooltip.x, top: tooltip.y }}
              >
                <div className="sadc-tt-name">
                  {tooltip.country.name}
                  {tooltip.country.id === HQ_ID && (
                    <span className="sadc-tt-hq">Head office</span>
                  )}
                </div>
                <div className="sadc-tt-disciplines">
                  {DISCIPLINES.join(" · ")}
                </div>
              </div>
            )}
          </div>

          {/* ── SIDE PANEL ── */}
          <div className="sadc-panel">
            <p className="sadc-panel-head">All countries</p>
            <div className="sadc-chip-list">
              {sortedForList.map((c) => (
                <button
                  key={c.id}
                  className={`sadc-chip ${active === c.id ? "sadc-chip--active" : ""}`}
                  onClick={() => toggle(c.id)}
                >
                  <span className="sadc-chip-name">{c.name}</span>
                  {c.id === HQ_ID && <span className="sadc-chip-hq">HQ</span>}
                </button>
              ))}
            </div>

            {/* Indian Ocean island states — shown as small stamp cards */}
            <p className="sadc-panel-head sadc-panel-head--isles">
              Indian Ocean isles
            </p>
            <div className="sadc-isles-row">
              {Object.entries(INSET_ISLANDS).map(([id, isle]) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    className={`sadc-isle-card ${isActive ? "sadc-isle-card--active" : ""}`}
                    onClick={() => toggle(id)}
                  >
                    <svg
                      viewBox={`-4 -4 ${isle.w + 8} ${isle.h + 8}`}
                      className="sadc-isle-svg"
                    >
                      <path d={isle.d} fillRule="evenodd" />
                    </svg>
                    <span className="sadc-isle-name">{isle.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── SELECTION BAR ── */}
        {activeCountry && (
          <div className="sadc-results">
            <div>
              <p className="sadc-results-label">Selected</p>
              <p className="sadc-results-count">
                <strong>{activeCountry.name}</strong>
                {activeCountry.id === HQ_ID && (
                  <span className="sadc-results-hq">Head office</span>
                )}
                <span className="sadc-results-disciplines">
                  {" "}
                  · {DISCIPLINES.join(" · ")}
                </span>
              </p>
            </div>
            <button className="sadc-browse-btn" onClick={handleStartProject}>
              Start a project in {activeCountry.name} →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
