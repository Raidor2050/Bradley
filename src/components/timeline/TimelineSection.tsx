"use client";

import { useRef, useState } from "react";
import { timelineEvents, historicalEras, people } from "@/lib/data/genealogy";

export default function TimelineSection() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sortedEvents = [...timelineEvents].sort((a, b) => a.year - b.year);

  return (
    <section id="timeline" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Historical <span className="gold-text">Timeline</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Journey through 230+ years of Barisal, Shillong and family history
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xs text-mist uppercase tracking-[0.15em] mb-4 font-mono text-center">
            Historical Eras
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {historicalEras.map((era) => (
              <div
                key={era.id}
                className="px-4 py-2 rounded-lg border border-gold-700/20 bg-gold-500/5"
              >
                <div className="text-xs text-gold-400 font-medium">{era.name}</div>
                <div className="text-[10px] text-mist font-mono">
                  {era.startYear} – {era.endYear}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/40 via-gold-500/20 to-gold-500/5" />

          <div className="space-y-8">
            {sortedEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activeEvent === event.id;
              const isPerson = event.type === "person";
              const isHistorical = event.type === "historical";
              const isBirth = isPerson && event.title.toLowerCase().includes("birth");
              const person = event.personIds?.[0]
                ? people.find((p) => p.id === event.personIds![0])
                : null;

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  } flex-row`}
                >
                  <div className="hidden sm:block sm:w-1/2" />

                  <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`timeline-node ${isBirth ? "animate-pulse-gold" : ""}`}
                      style={{
                        width: isBirth ? 16 : 10,
                        height: isBirth ? 16 : 10,
                        background: isBirth
                          ? "#d4940a"
                          : isPerson
                          ? "#c9a227"
                          : isHistorical
                          ? "#996600"
                          : "#666666",
                        boxShadow: isBirth
                          ? "0 0 12px rgba(212,148,10,0.6)"
                          : "none",
                      }}
                    />
                  </div>

                  <div className="ml-16 sm:ml-0 sm:w-1/2">
                    <button
                      onClick={() => setActiveEvent(isActive ? null : event.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "glass-panel-strong gold-glow"
                          : isBirth
                          ? "glass-panel border-gold-500/30 hover:border-gold-400/50"
                          : "glass-panel-subtle hover:border-gold-600/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-mono ${isBirth ? "text-gold-300 font-bold" : "text-gold-400"}`}>
                          {event.year} {event.endYear ? `– ${event.endYear}` : ""}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                            isBirth
                              ? "bg-gold-500/25 text-gold-300 border border-gold-500/40"
                              : isPerson
                              ? "bg-gold-500/15 text-gold-400 border border-gold-500/25"
                              : isHistorical
                              ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                              : "bg-purple-500/15 text-purple-400 border border-purple-500/25"
                          }`}
                        >
                          {isBirth ? "born" : event.type}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        {person?.imageUrl && (
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gold-500/30">
                            <img
                              src={person.imageUrl}
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium mb-1 ${isBirth ? "text-gold-200" : "text-pearl"}`}>
                            {event.title}
                          </h4>
                          <p className="text-xs text-fog leading-relaxed">
                            {event.description}
                          </p>
                          {event.confidence !== undefined && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="h-1 rounded-full bg-graphite overflow-hidden w-20">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                                  style={{ width: `${event.confidence * 100}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-mono text-mist">
                                {Math.round(event.confidence * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative flex justify-center mt-12">
            <div className="absolute left-8 sm:left-1/2 -translate-x-1/2">
              <div className="w-4 h-4 rounded-full bg-gold-700/40 border-2 border-gold-600/30" />
            </div>
            <div className="ml-16 sm:ml-0 sm:w-1/2 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-gold-700/30 bg-gold-500/5">
                <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-xs text-gold-400 font-mono">
                  RESEARCH FRONTIER — GREAT-GRANDPARENTS UNVERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
