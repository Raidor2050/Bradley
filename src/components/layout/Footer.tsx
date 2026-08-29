"use client";

export default function Footer() {
  return (
    <footer className="py-16 relative border-t border-gold-700/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center font-display text-black font-bold text-lg">
                BM
              </div>
              <div>
                <div className="font-accent text-gold-400 text-sm tracking-[0.2em]">
                  BRADLEY MUKHUTI
                </div>
                <div className="text-[10px] text-mist tracking-[0.15em] uppercase">
                  Deep Ancestry
                </div>
              </div>
            </div>
            <p className="text-xs text-fog leading-relaxed">
              A deep ancestry investigation into the Mukhuti family of Barisal,
              Bangladesh — combining family knowledge, Bengali Brahmin surname
              history, and honest evidence scoring. Tracing how far back the
              lineage can be verified.
            </p>
          </div>

          <div>
            <h4 className="text-xs text-mist uppercase tracking-[0.15em] mb-4 font-mono">
              Research Sources
            </h4>
            <ul className="space-y-2">
              {[
                "Forebears (surname distribution)",
                "Wikipedia — Mukhopadhyay history",
                "Banglapedia — Barisal/Shillong",
                "Bangladesh Civil Registration",
                "FamilySearch.org",
                "Ancestry.com",
                "Internet Archive — district gazetteers",
                "FIBIS / BACSA cemetery records",
              ].map((source) => (
                <li key={source} className="text-xs text-fog">
                  {source}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-mist uppercase tracking-[0.15em] mb-4 font-mono">
              Methodology
            </h4>
            <ul className="space-y-2">
              {[
                "Evidence-based genealogy",
                "Honest confidence scoring",
                "Family/verified/inferred separation",
                "Strict fact/inference discipline",
                "Source provenance tracking",
                "Entity resolution (no name-only merges)",
                "Patronymic chain verification",
              ].map((item) => (
                <li key={item} className="text-xs text-fog">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="neon-line mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-mist">
            © 2026 Bradley Mukhuti Ancestry Research. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-mist font-mono">
              BUILT WITH NEXT.JS + REACT FLOW + REMOTION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
