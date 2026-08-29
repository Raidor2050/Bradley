"use client";

import { useState } from "react";
import { mapLocations, people } from "@/lib/data/genealogy";
import { MapLocation } from "@/lib/types";

const BOUNDS = {
  latMin: 12,
  latMax: 32,
  lngMin: 78,
  lngMax: 96,
};

function toXY(loc: MapLocation) {
  const x = ((loc.lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100;
  const y = ((BOUNDS.latMax - loc.lat) / (BOUNDS.latMax - BOUNDS.latMin)) * 100;
  return { x, y };
}

const typeColor: Record<string, string> = {
  "ancestral-village": "#d4940a",
  residence: "#c9a227",
  migration: "#4a90d9",
  historical: "#888888",
};

const typeLabel: Record<string, string> = {
  "ancestral-village": "Ancestral Village",
  residence: "Residence",
  migration: "Migration",
  historical: "Historical Region",
};

export default function GeographicMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeLoc = active ? mapLocations.find((l) => l.id === active) : null;

  return (
    <section id="map" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Geographic <span className="gold-text">Trail</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            The places that anchor the Mukhuti, Das and Mukherjee heritage —
            from Barisal to Shillong to undivided Bengal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-4 sm:p-6">
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] rounded-lg overflow-hidden bg-[radial-gradient(ellipse_at_center,#0b1420_0%,#05070c_70%)] border border-gold-700/10">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <g fill="none" stroke="rgba(212,148,10,0.06)" strokeWidth="0.15">
                  <rect x="12" y="8" width="20" height="30" />
                  <path d="M32 12 L58 10 L76 28 L62 44 L40 46 L22 38 Z" />
                  <rect x="58" y="8" width="16" height="24" />
                </g>
              </svg>

              {mapLocations.map((loc) => {
                const { x, y } = toXY(loc);
                const isActive = active === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActive(isActive ? null : loc.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span
                      className="block rounded-full border-2 transition-all duration-300"
                      style={{
                        width: isActive ? 20 : 14,
                        height: isActive ? 20 : 14,
                        background: `${typeColor[loc.type]}22`,
                        borderColor: typeColor[loc.type],
                        boxShadow: isActive
                          ? `0 0 20px ${typeColor[loc.type]}66`
                          : "none",
                      }}
                    />
                    <span
                      className="absolute top-1/2 right-full mr-2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        display: "none",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel-strong p-6 flex flex-col">
            <h3 className="text-sm font-medium text-pearl mb-4">
              {activeLoc ? activeLoc.name : "Select a location"}
            </h3>

            {activeLoc ? (
              <>
                <span
                  className="inline-flex self-start text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase mb-3"
                  style={{
                    color: typeColor[activeLoc.type],
                    borderColor: `${typeColor[activeLoc.type]}44`,
                    background: `${typeColor[activeLoc.type]}11`,
                  }}
                >
                  {typeLabel[activeLoc.type] || activeLoc.type}
                </span>
                {activeLoc.historicalName && (
                  <p className="text-xs text-mist mb-2">{activeLoc.historicalName}</p>
                )}
                {activeLoc.period && (
                  <p className="text-xs text-gold-400 font-mono mb-3">{activeLoc.period}</p>
                )}
                {activeLoc.notes && (
                  <p className="text-sm text-fog leading-relaxed mb-4">{activeLoc.notes}</p>
                )}
                <div className="mt-auto">
                  <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                    People Linked
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLoc.personIds.map((pid) => {
                      const person = people.find((p) => p.id === pid);
                      if (!person) return null;
                      return (
                        <span
                          key={pid}
                          className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] text-mist"
                        >
                          {person.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-fog">
                Tap a marker on the map to see the locality, its period, and the
                people connected to it. Anchors include Barisal Sadar&apos;s localities
                (Notun Para, Bogura Road, Bangla Bazar, Kazipara), Shillong, and
                the historical regions of undivided Bengal and Calcutta.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
