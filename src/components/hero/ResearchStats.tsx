"use client";

import { useRef, useEffect, useState } from "react";
import { researchStats } from "@/lib/data/genealogy";

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { label: "Known Generations", value: researchStats.knownGenerations, icon: "gen" },
  { label: "People Documented", value: researchStats.totalPeople, icon: "people" },
  { label: "Verified People", value: researchStats.verifiedPeople, icon: "verified" },
  { label: "Relationships Mapped", value: researchStats.totalRelationships, icon: "rel" },
  { label: "Sources Analyzed", value: researchStats.totalSources, icon: "source" },
  { label: "Locations Discovered", value: researchStats.locationsDiscovered, icon: "location" },
  { label: "Years of History", value: researchStats.historicalYearsCovered, suffix: "+", icon: "year" },
  { label: "Branches Investigated", value: researchStats.branchesInvestigated, icon: "branch" },
];

export default function ResearchStats() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Research <span className="gold-text">Statistics</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Live metrics from the ongoing deep ancestry investigation
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="metric-card text-center">
              <div className="font-display text-3xl sm:text-4xl font-semibold text-gold-400 mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-mist uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-panel p-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-fog">User-Provided Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-fog">Discovered Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-fog">Inferred Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-fog">Candidate Data</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-xs text-mist uppercase tracking-wider mb-2">Oldest Verified Ancestor</div>
            <div className="text-lg text-gold-400 font-medium">{researchStats.oldestVerifiedAncestor}</div>
          </div>
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-xs text-mist uppercase tracking-wider mb-2">Historical Reach</div>
            <div className="text-lg text-gold-400 font-medium">{researchStats.historicalYearsCovered}+ Years</div>
          </div>
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-xs text-mist uppercase tracking-wider mb-2">Research Frontier</div>
            <div className="text-lg text-orange-400 font-medium">{researchStats.branchesUnresolved} Unresolved Branch</div>
          </div>
        </div>
      </div>
    </section>
  );
}
