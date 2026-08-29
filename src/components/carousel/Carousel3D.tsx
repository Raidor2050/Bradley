"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { people } from "@/lib/data/genealogy";

const allPeople = [...people].sort((a, b) => {
  const aYear = a.birthYear || 1900;
  const bYear = b.birthYear || 1900;
  return aYear - bYear;
});

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = allPeople.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (selectedId) return;
    const interval = setInterval(goNext, isMobile ? 5000 : 4000);
    return () => clearInterval(interval);
  }, [goNext, selectedId, isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 50;
    if (touchDeltaX.current > threshold) {
      goPrev();
    } else if (touchDeltaX.current < -threshold) {
      goNext();
    }
    touchDeltaX.current = 0;
  };

  const selectedPerson = selectedId
    ? allPeople.find((p) => p.id === selectedId)
    : null;

  const maxVisible = isMobile ? 3 : 5;
  const cardWidth = isMobile ? 180 : 240;
  const cardSpacing = isMobile ? 70 : 120;
  const cardHeight = isMobile ? 320 : 420;
  const perspective = isMobile ? 800 : 1200;

  return (
    <section id="carousel" className="py-12 sm:py-20 relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          selectedId ? "backdrop-blur-xl bg-black/60" : ""
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-4xl text-pearl mb-3">
            The <span className="gold-text">Mukhuti Lineage</span>
          </h2>
          <p className="text-xs sm:text-sm text-mist max-w-xl mx-auto">
            {allPeople.length} people from family knowledge and research. {isMobile ? "Swipe" : "Click"} any card to explore their story and evidence level.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative flex items-center justify-center"
          style={{
            height: cardHeight,
            perspective: `${perspective}px`,
            touchAction: "pan-y",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {allPeople.map((person, i) => {
            const offset = (i - activeIndex + total) % total;
            const half = Math.floor(total / 2);
            let normalizedOffset = offset > half ? offset - total : offset;

            const absOff = Math.abs(normalizedOffset);
            if (absOff > maxVisible) return null;

            const rotateY = normalizedOffset * (isMobile ? 20 : 28);
            const translateZ = -absOff * (isMobile ? 50 : 80);
            const translateX = normalizedOffset * (isMobile ? 65 : cardSpacing);
            const scale = absOff === 0 ? 1 : absOff === 1 ? 0.88 : 0.75;
            const opacity = absOff === 0 ? 1 : absOff <= 1 ? 0.7 : absOff <= 2 ? 0.4 : 0.15;
            const zIndex = 20 - absOff;

            const isActive = absOff === 0;
            const isSelected = selectedId === person.id;

            const evidenceColor =
              person.evidenceLevel === "verified"
                ? "from-emerald-500 to-emerald-600"
                : person.evidenceLevel === "supported"
                ? "from-blue-500 to-blue-600"
                : person.evidenceLevel === "probable"
                ? "from-purple-500 to-purple-600"
                : "from-orange-500 to-orange-600";

            return (
              <div
                key={person.id}
                className="absolute cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                  willChange: "transform, opacity",
                }}
                onClick={() => {
                  if (isActive) {
                    setSelectedId(isSelected ? null : person.id);
                  } else {
                    setActiveIndex(i);
                  }
                }}
              >
                <div
                  className={`rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    isSelected
                      ? "border-gold-400 shadow-2xl shadow-gold-500/30"
                      : isActive
                      ? "border-gold-500/40 shadow-lg shadow-gold-500/15"
                      : "border-white/10"
                  }`}
                  style={{
                    width: cardWidth,
                    background:
                      "linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)",
                  }}
                >
                  {person.imageUrl ? (
                    <div className="relative overflow-hidden" style={{ height: isMobile ? 120 : 200 }}>
                      <img
                        src={person.imageUrl}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        style={{
                          filter: isActive
                            ? "brightness(1.05) contrast(1.05)"
                            : "brightness(0.8) contrast(0.9)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full bg-gradient-to-r ${evidenceColor} text-white font-mono uppercase`}
                        >
                          {person.evidenceLevel}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative flex items-center justify-center bg-gradient-to-br from-charcoal to-graphite"
                      style={{ height: isMobile ? 120 : 200 }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center font-mono font-bold border-2"
                        style={{
                          width: isMobile ? 48 : 80,
                          height: isMobile ? 48 : 80,
                          fontSize: isMobile ? 14 : 24,
                          borderColor:
                            person.generation === 0
                              ? "#d4940a"
                              : person.generation > 0
                              ? "#996600"
                              : "#4a90d9",
                          color:
                            person.generation === 0
                              ? "#d4940a"
                              : person.generation > 0
                              ? "#c9a227"
                              : "#4a90d9",
                          background:
                            person.generation === 0
                              ? "rgba(212,148,10,0.1)"
                              : person.generation > 0
                              ? "rgba(153,102,0,0.1)"
                              : "rgba(74,144,217,0.1)",
                        }}
                      >
                        {person.generation === 0
                          ? "YOU"
                          : person.generation > 0
                          ? `G${person.generation}`
                          : `D${Math.abs(person.generation)}`}
                      </div>
                    </div>
                  )}

                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      {person.birthYear && (
                        <span className="text-[10px] sm:text-[11px] font-mono text-gold-400">
                          b. ~{person.birthYear}
                        </span>
                      )}
                      {person.deathYear && (
                        <span className="text-[10px] sm:text-[11px] font-mono text-mist">
                          d. {person.deathYear}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-sm font-medium text-pearl leading-tight mb-1 sm:mb-1.5 line-clamp-2">
                      {person.name}
                    </h3>

                    {person.occupation && (
                      <p className="text-[10px] sm:text-[11px] text-gold-400/80 mb-1.5 sm:mb-2 line-clamp-1">
                        {person.occupation}
                      </p>
                    )}

                    {!isMobile && person.location && (
                      <p className="text-[10px] text-mist line-clamp-1">
                        {person.location}
                      </p>
                    )}

                    {isActive && !isMobile && (
                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1 flex-1 rounded-full bg-graphite overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                              style={{ width: `${person.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-mist">
                            {Math.round(person.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isMobile ? (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={goPrev}
              className="w-9 h-9 rounded-full border border-gold-700/30 bg-charcoal/80 flex items-center justify-center text-gold-400 active:bg-gold-500/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs font-mono text-mist min-w-[50px] text-center">
              {activeIndex + 1} / {total}
            </span>
            <button
              onClick={goNext}
              className="w-9 h-9 rounded-full border border-gold-700/30 bg-charcoal/80 flex items-center justify-center text-gold-400 active:bg-gold-500/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-gold-700/30 bg-charcoal/80 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-1">
              {allPeople.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-gold-400 w-5"
                      : "bg-white/15 hover:bg-white/30 w-1.5"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-gold-700/30 bg-charcoal/80 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {selectedPerson && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 cursor-pointer"
            onClick={() => setSelectedId(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <div
              className="relative z-10 w-full sm:max-w-lg glass-panel-strong sm:rounded-2xl rounded-t-2xl p-5 sm:p-6 animate-fade-in-up cursor-default max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                {selectedPerson.imageUrl ? (
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border-2 border-gold-500/30">
                    <img
                      src={selectedPerson.imageUrl}
                      alt={selectedPerson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold-700/40 to-gold-800/40 flex items-center justify-center border border-gold-700/30">
                    <span className="text-lg sm:text-xl font-mono font-bold text-gold-400">
                      {selectedPerson.generation === 0
                        ? "YOU"
                        : selectedPerson.generation > 0
                        ? `G${selectedPerson.generation}`
                        : `D${Math.abs(selectedPerson.generation)}`}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full border font-mono uppercase ${
                        selectedPerson.generation < 0
                          ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                          : "bg-gold-500/15 text-gold-400 border-gold-500/25"
                      }`}
                    >
                      {selectedPerson.generation < 0
                        ? "DISCOVERED"
                        : selectedPerson.generation === 0
                        ? "SUBJECT"
                        : `GEN ${selectedPerson.generation}`}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full border font-mono uppercase ${
                        selectedPerson.evidenceLevel === "verified"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                          : selectedPerson.evidenceLevel === "supported"
                          ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                          : "bg-purple-500/15 text-purple-400 border-purple-500/25"
                      }`}
                    >
                      {selectedPerson.evidenceLevel}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-2xl text-pearl">
                    {selectedPerson.name}
                  </h3>
                  {selectedPerson.nameBengali && (
                    <p className="text-xs sm:text-sm text-mist">{selectedPerson.nameBengali}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-mist hover:text-pearl transition-colors p-2 -mt-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                {selectedPerson.birthYear && (
                  <div className="text-center p-2 sm:p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[9px] sm:text-[10px] text-mist mb-0.5 sm:mb-1">Born</div>
                    <div className="text-xs sm:text-sm text-pearl font-medium">~{selectedPerson.birthYear}</div>
                  </div>
                )}
                {selectedPerson.deathYear && (
                  <div className="text-center p-2 sm:p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[9px] sm:text-[10px] text-mist mb-0.5 sm:mb-1">Died</div>
                    <div className="text-xs sm:text-sm text-pearl font-medium">{selectedPerson.deathYear}</div>
                  </div>
                )}
                {selectedPerson.occupation && (
                  <div className="text-center p-2 sm:p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[9px] sm:text-[10px] text-mist mb-0.5 sm:mb-1">Role</div>
                    <div className="text-xs sm:text-sm text-pearl font-medium">{selectedPerson.occupation}</div>
                  </div>
                )}
                {selectedPerson.location && (
                  <div className="text-center p-2 sm:p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[9px] sm:text-[10px] text-mist mb-0.5 sm:mb-1">Location</div>
                    <div className="text-xs sm:text-sm text-pearl font-medium">{selectedPerson.location}</div>
                  </div>
                )}
                <div className="text-center p-2 sm:p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[9px] sm:text-[10px] text-mist mb-0.5 sm:mb-1">Confidence</div>
                  <div className="text-xs sm:text-sm text-emerald-400 font-medium font-mono">
                    {Math.round(selectedPerson.confidence * 100)}%
                  </div>
                </div>
              </div>

              {selectedPerson.notes && (
                <div className="p-3 sm:p-4 rounded-lg bg-gold-500/5 border border-gold-700/20">
                  <div className="text-[9px] sm:text-[10px] text-gold-400 uppercase tracking-wider mb-1.5 sm:mb-2 font-mono">
                    Research Notes
                  </div>
                  <p className="text-xs sm:text-sm text-fog leading-relaxed">
                    {selectedPerson.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
