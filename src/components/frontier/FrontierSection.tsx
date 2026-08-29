"use client";

import { frontierCandidates, people } from "@/lib/data/genealogy";

export default function FrontierSection() {
  return (
    <section id="frontier" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Research <span className="gold-text">Frontier</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Branches where ancestry may still be discoverable — and claims that remain honestly unverified. Family knowledge is never promoted to verified lineage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {frontierCandidates.map((candidate) => {
            const person = people.find((p) => p.id === candidate.candidatePersonId);
            const target = people.find((p) => p.id === candidate.targetPersonId);
            const lowConfidence = candidate.confidence < 0.2;
            return (
              <div key={candidate.id} className="glass-panel p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${
                      lowConfidence ? "bg-red-400" : "bg-orange-400"
                    }`}
                  />
                  <h3 className="text-lg font-medium text-pearl">
                    {person?.name || "—"} · {candidate.relationship}
                    {target ? ` → ${target.name}` : ""}
                  </h3>
                </div>

                <div className="glass-panel-subtle p-4 mb-4">
                  <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                    Current Evidence
                  </div>
                  <ul className="space-y-1.5">
                    {candidate.evidence.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-fog">
                        <span className={lowConfidence ? "text-red-400 mt-1" : "text-emerald-400 mt-1"}>
                          {lowConfidence ? "!" : "\u2713"}
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-mist font-mono">Confidence</span>
                    <div className="h-1 flex-1 rounded-full bg-graphite overflow-hidden">
                      <div
                        className={`h-full rounded-full ${lowConfidence ? "bg-red-500" : "bg-orange-500"}`}
                        style={{ width: `${candidate.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gold-400">
                      {Math.round(candidate.confidence * 100)}%
                    </span>
                  </div>
                </div>

                <div className="glass-panel-subtle p-4">
                  <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                    What We Need
                  </div>
                  <ul className="space-y-1.5">
                    {candidate.sourcesNeeded.map((need, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-fog">
                        <span className="text-orange-400 mt-1">?</span>
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <h3 className="text-lg font-medium text-pearl">
                Mukhuti Surname — Research Findings
              </h3>
            </div>

            <div className="glass-panel-subtle p-4 mb-4">
              <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                Surname Distribution (verified)
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  Forebears: ~845 people named &quot;Mukhuti&quot; worldwide
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  ~92% concentrated in West Bengal; pockets in Jharkhand
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  Variants: &quot;Mukhuty&quot; (~231) and &quot;Mukuti&quot; (~588) also exist
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  Bengali Brahmin lineage — older village form of Mukherjee/Mukhopadhyay
                </li>
              </ul>
            </div>

            <div className="glass-panel-subtle p-4">
              <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                Honest Constraints
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-orange-400 mt-1">!</span>
                  No public record ties a specific Barisal estate (&apos;Jomidar Boro Bari&apos;) to a Mukhuti family
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-orange-400 mt-1">!</span>
                  Named relatives are private, family-known individuals — not in public genealogies
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-orange-400 mt-1">!</span>
                  The &apos;Dr Horen Mukherjee — Assam Governor&apos; claim is disproven (no Mookerjee ever governed Assam)
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-orange-400 mt-1">!</span>
                  No documented &apos;Wells Mission&apos; exists in Shillong; likely a misremembered local church compound
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8">
          <div className="text-xs text-mist uppercase tracking-wider mb-4 font-mono">
            Research Pipeline
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { step: "Seed Person", icon: "person", active: true },
              { step: "Name Variants", icon: "search", active: true },
              { step: "Search Sources", icon: "database", active: true },
              { step: "Candidate Records", icon: "file", active: true },
              { step: "Entity Resolution", icon: "check", active: true },
              { step: "OSINT Research", icon: "osint", active: true },
              { step: "Evidence Extraction", icon: "extract", active: true },
              { step: "Relationship Detection", icon: "link", active: false },
              { step: "Confidence Scoring", icon: "score", active: false },
              { step: "Expand Ancestors", icon: "expand", active: false },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center gap-2">
                <div
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                    item.active
                      ? "bg-gold-500/15 text-gold-400 border border-gold-500/25"
                      : "bg-white/[0.03] text-mist border border-white/[0.06]"
                  }`}
                >
                  {item.step}
                </div>
                {i < 9 && (
                  <span className="text-gold-700/40 text-xs">\u2192</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-2xl font-display text-gold-400 mb-1">3</div>
            <div className="text-xs text-mist">Known generations (family knowledge)</div>
          </div>
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-2xl font-display text-blue-400 mb-1">845</div>
            <div className="text-xs text-mist">People named Mukhuti worldwide (Forebears)</div>
          </div>
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-2xl font-display text-purple-400 mb-1">0</div>
            <div className="text-xs text-mist">Direct ancestors verified beyond family knowledge</div>
          </div>
        </div>
      </div>
    </section>
  );
}
