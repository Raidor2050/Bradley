"use client";

import { useState, useEffect, useRef } from "react";
import { people } from "@/lib/data/genealogy";

export default function AncestralDepthViz() {
  const [revealedGen, setRevealedGen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating) {
          setIsAnimating(true);
            let gen = 0;
            const interval = setInterval(() => {
              gen++;
              setRevealedGen(gen);
              if (gen >= 8) {
                clearInterval(interval);
                setTimeout(() => {
                  setRevealedGen(9);
                }, 800);
              }
            }, 500);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isAnimating]);

  const generations = [
    { gen: 0, name: "Bradley Mukhuti", year: "Subject", era: "Digital Age", color: "from-gold-500 to-gold-400" },
    { gen: 1, name: "Bernard Bonoj Mukhuti", year: "Probable", era: "Modern Bangladesh", color: "from-gold-600 to-gold-500" },
    { gen: 2, name: "Nishi Kanta Mukhuti", year: "Family knowledge", era: "Undivided Bengal → Bangladesh", color: "from-gold-600 to-gold-500" },
    { gen: 2, name: "Neel · Laxmi · Nalini Kanta", year: "Inferred brothers", era: "Barisal Sadar", color: "from-gold-700 to-gold-600" },
    { gen: 99, name: "Great-Grandparents", year: "Unknown", era: "Unverified frontier", color: "from-gold-800 to-gold-700" },
    { gen: -5, name: "Surname Deep History — Mukherjee / Mukhuti Brahmin Lineage", year: "Village origin", era: "Mughal Bengal → present", color: "from-blue-700 to-blue-600" },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-700/30 bg-gold-500/5 mb-6">
            <span className="text-xs text-gold-400 tracking-[0.2em] uppercase font-mono">
              Ancestral Depth Visualization
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-pearl mb-4">
            How Far Back <span className="gold-text">Can We Go?</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Watch the family tree extend backward through time
          </p>
        </div>

        <div className="space-y-3">
          {generations.map((gen, i) => {
            const isVisible = i < revealedGen;
            const person = people.find((p) => p.generation === gen.gen);

            return (
              <div
                key={gen.gen}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`glass-panel-subtle p-5 flex items-center gap-6 ${
                    gen.gen === 0 ? "gold-glow border-gold-500/30" : ""
                  } ${gen.gen === 99 ? "border-dashed border-gold-700/30" : ""}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-mono font-bold bg-gradient-to-br ${gen.color} ${
                      gen.gen === 0 ? "text-black" : gen.gen === 99 ? "text-gold-300" : "text-black"
                    }`}
                  >
                    G{gen.gen}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-pearl">
                        {gen.name}
                      </span>
                      {person?.evidenceLevel && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-mono uppercase">
                          {person.evidenceLevel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-mist">
                      <span className="font-mono">{gen.year}</span>
                      <span>·</span>
                      <span>{gen.era}</span>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    {person?.confidence !== undefined && (
                      <div className="text-xs font-mono text-gold-400">
                        {Math.round(person.confidence * 100)}% confidence
                      </div>
                    )}
                    {gen.gen === 99 && (
                      <div className="text-xs font-mono text-orange-400 animate-pulse">
                        Research Active
                      </div>
                    )}
                  </div>
                </div>

                {i < generations.length - 1 && (
                  <div className="flex justify-center">
                    <div
                      className={`w-px h-4 transition-all duration-500 ${
                        isVisible ? "bg-gold-500/40" : "bg-transparent"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {revealedGen > 8 && (
          <div className="mt-12 text-center animate-fade-in-up">
            <div className="glass-panel p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-display text-gold-400">3</div>
                  <div className="text-xs text-mist mt-1">Known Generations</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-blue-400">250+</div>
                  <div className="text-xs text-mist mt-1">Years of Historical Context</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-gold-400">17</div>
                  <div className="text-xs text-mist mt-1">Sources Catalogued</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-purple-400">3</div>
                  <div className="text-xs text-mist mt-1">Branches Investigated</div>
                </div>
              </div>

              <div className="mt-8 neon-line" />

              <div className="mt-8">
                <p className="text-sm text-fog max-w-2xl mx-auto">
                  The investigation has traced a family-provided lineage of three generations
                  — Bradley Mukhuti, his probable father Bernard Bonoj Mukhuti, and his
                  grandfather Nishi Kanta Mukhuti of Barisal, alongside the inferred 'Kanta'
                  brothers. The surname itself is documented as an older village-derived form
                  of the Bengali Brahmin Mukherjee lineage. Great-grandparents and beyond sit
                  at the research frontier, unverified. The investigation remains active.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
