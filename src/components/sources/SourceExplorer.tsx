"use client";

import { useState } from "react";
import { sources } from "@/lib/data/genealogy";
import { getSourceTypeLabel } from "@/lib/utils";

const sourceTypes = [
  "all",
  "genealogy-database",
  "archival",
  "census",
  "book",
  "website",
  "academic",
  "land-record",
  "family-record",
  "oral",
  "cemetery",
];

export default function SourceExplorer() {
  const [filter, setFilter] = useState("all");

  const filteredSources =
    filter === "all"
      ? sources
      : sources.filter((s) => s.type === filter);

  return (
    <section id="sources" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Source <span className="gold-text">Explorer</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            {sources.length} sources analyzed across genealogy databases, archives,
            and historical records
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filter === type
                  ? "bg-gold-500/15 text-gold-400 border border-gold-500/30"
                  : "bg-white/[0.03] text-mist border border-white/[0.06] hover:text-pearl hover:border-white/[0.12]"
              }`}
            >
              {type === "all" ? "All Sources" : getSourceTypeLabel(type)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <div key={source.id} className="glass-panel-subtle p-5 hover:border-gold-600/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 font-mono uppercase">
                  {source.type.replace("-", " ")}
                </span>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      source.confidenceContribution >= 0.8
                        ? "bg-emerald-400"
                        : source.confidenceContribution >= 0.6
                        ? "bg-amber-400"
                        : "bg-orange-400"
                    }`}
                  />
                  <span className="text-[10px] text-mist font-mono">
                    {Math.round(source.confidenceContribution * 100)}%
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-medium text-pearl mb-2 group-hover:text-gold-300 transition-colors">
                {source.name}
              </h4>
              <p className="text-xs text-fog leading-relaxed mb-3 line-clamp-3">
                {source.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-mist">
                  {source.publisher || source.archive || "—"}
                </span>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-gold-500 hover:text-gold-400 transition-colors font-mono"
                  >
                    VIEW SOURCE →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-panel p-6">
          <h3 className="text-sm font-medium text-pearl mb-4">Source Coverage by Generation</h3>
          <div className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((gen) => {
              const sourcesForGen = gen <= 1 ? 2 : gen <= 3 ? 3 : 5;
              const maxSources = 5;
              return (
                <div key={gen} className="flex items-center gap-4">
                  <span className="text-xs text-mist font-mono w-20">
                    Gen {gen}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-graphite overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
                      style={{ width: `${(sourcesForGen / maxSources) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-mist font-mono w-8 text-right">
                    {sourcesForGen}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
