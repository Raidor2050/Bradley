"use client";

export default function MethodologySection() {
  return (
    <section id="methodology" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Research <span className="gold-text">Methodology</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            How ancestry is verified and confidence is calculated
          </p>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-sm font-medium text-pearl mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center text-xs font-mono">1</span>
              Evidence-Based Genealogy
            </h3>
            <p className="text-sm text-fog leading-relaxed mb-4">
              Every discovered person and relationship must have supporting evidence.
              No relationship is asserted without at least one source. Each relationship
              receives a confidence score based on the strength and number of supporting signals.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { level: "Verified", color: "emerald", desc: "Directly confirmed by reliable sources" },
                { level: "Supported", color: "blue", desc: "Multiple supporting sources agree" },
                { level: "Probable", color: "amber", desc: "Strong circumstantial evidence" },
                { level: "Possible", color: "orange", desc: "Some evidence, needs verification" },
                { level: "Unverified", color: "gray", desc: "Claimed but unconfirmed" },
                { level: "Conflicting", color: "red", desc: "Sources disagree" },
              ].map((item) => (
                <div key={item.level} className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className={`text-xs font-medium text-${item.color}-400 mb-1`}>{item.level}</div>
                  <div className="text-[10px] text-mist">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-sm font-medium text-pearl mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center text-xs font-mono">2</span>
              Confidence Scoring
            </h3>
            <p className="text-sm text-fog leading-relaxed mb-4">
              Confidence scores are calculated using a multi-signal weighted model.
              Each signal contributes independently to the final score.
            </p>
            <div className="space-y-3">
              {[
                { signal: "Name Similarity", weight: 35, desc: "Jaro-Winkler on normalized name fields" },
                { signal: "Father's Name", weight: 20, desc: "Patronymic chain verification" },
                { signal: "Location Match", weight: 15, desc: "Geographic consistency with historical aliases" },
                { signal: "Spouse Match", weight: 15, desc: "Cross-referencing spouse names across records" },
                { signal: "Date Compatibility", weight: 10, desc: "Plausible age ranges and generational spacing" },
                { signal: "Source Quality", weight: 5, desc: "Official records weighted higher than oral tradition" },
              ].map((item) => (
                <div key={item.signal} className="flex items-center gap-4">
                  <span className="text-xs text-mist w-32 shrink-0">{item.signal}</span>
                  <div className="flex-1 h-2 rounded-full bg-graphite overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                      style={{ width: `${item.weight}%` }}
                    />
                  </div>
                  <span className="text-xs text-mist font-mono w-8 text-right">{item.weight}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-sm font-medium text-pearl mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center text-xs font-mono">3</span>
              Data Source Classification
            </h3>
            <p className="text-sm text-fog leading-relaxed mb-4">
              All data is classified into four categories to maintain transparency about
              the origin and reliability of each piece of information.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { type: "User-Provided Data", color: "blue", desc: "Directly provided by the family. Starting point of the investigation." },
                { type: "Discovered Data", color: "purple", desc: "Found through research in public databases and archives." },
                { type: "Inferred Data", color: "amber", desc: "Deduced from patterns, demographics, and historical context." },
                { type: "Candidate Data", color: "orange", desc: "Potential matches requiring further verification." },
              ].map((item) => (
                <div key={item.type} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className={`text-xs font-medium text-${item.color}-400 mb-1`}>{item.type}</div>
                  <div className="text-xs text-fog">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-sm font-medium text-pearl mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center text-xs font-mono">4</span>
              Bengali Name Transliteration
            </h3>
            <p className="text-sm text-fog leading-relaxed">
              Bengali names have significant variation due to different transliteration systems
              (ISO 15919, ALA-LC, Hunterian, BGN/PCGN). The system normalizes all names using
              the Hunterian system (standard in Bangladesh) and handles common variants:
              Mukhuti / Mukhuty / Mukuti / মুখনুতি, and the related Mukherjee / Mukhopadhyay.
              Honorifics (Md, Mohammad, Sri, Bibi, Begum, Dr) are stripped before comparison.
              IMPORTANT: name similarity is treated only as a LEADS signal — matching on name
              alone is never sufficient to merge two people. Common Bengali surnames (Das,
              Mukherjee)demand extra scrutiny before any identity claim is made.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
