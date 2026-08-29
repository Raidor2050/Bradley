"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        size: Math.random() * 2 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 300;
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 148, 10, ${alpha})`;
        ctx.fill();

        if (p.size > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 148, 10, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="absolute inset-0 z-0 hero-gradient" />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-700/30 bg-gold-500/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-xs text-gold-400 tracking-[0.2em] uppercase font-mono">
              Deep Ancestry Investigation
            </span>
          </div>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-6">
          <span className="text-pearl">How Far Back</span>
          <br />
          <span className="text-pearl">Can We </span>
          <span className="gold-text font-medium">Trace</span>
          <span className="text-pearl">?</span>
        </h1>

        <p className="text-lg sm:text-xl text-fog max-w-3xl mx-auto mb-4 font-light leading-relaxed">
          Investigating the ancestry of{" "}
          <span className="text-gold-400 font-medium">Bradley Mukhuti</span>{" "}
          through family knowledge, Bengali history, and honest evidence scoring.
        </p>
        <p className="text-sm text-mist max-w-2xl mx-auto mb-12 font-light">
          Subject of the deep ancestry investigation · Mukhuti family of Barisal,
          Bangladesh · Surnames traced to the older forms of the Bengali Brahmin
          Mukherjee lineage
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() =>
              document
                .querySelector("#graph")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold rounded-xl hover:from-gold-500 hover:to-gold-400 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25 text-sm tracking-wide"
          >
            EXPLORE THE ANCESTRY
          </button>
          <button
            onClick={() =>
              document
                .querySelector("#methodology")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 border border-gold-700/40 text-gold-400 font-medium rounded-xl hover:bg-gold-500/10 hover:border-gold-600/60 transition-all duration-300 text-sm tracking-wide"
          >
            METHODOLOGY
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-6 sm:p-8">
            <div className="text-xs text-mist tracking-[0.15em] uppercase mb-6 font-mono">
              Ancestral Line
            </div>
            <div className="flex flex-col items-center gap-0">
              {[
                { name: "Bradley Mukhuti", gen: 0, year: "Subject", role: "Subject" },
                { name: "Bernard Bonoj Mukhuti", gen: 1, year: "Probable", role: "Father (family knowledge)" },
                { name: "Nishi Kanta Mukhuti", gen: 2, year: "Family", role: "Grandfather (family knowledge)" },
                { name: "Neel Kanta · Laxmi Kanta · Nalini Kanta", gen: 2, year: "Likely", role: "Grandfather's brothers (inferred)" },
                { name: "Great-Grandparents", gen: 3, year: "—", role: "Unverified frontier" },
              ].map((person, i) => (
                <div key={person.name} className="flex flex-col items-center">
                  <div
                    className={`flex items-center gap-4 px-6 py-3 rounded-xl transition-all duration-500 ${
                      person.gen === 0
                        ? "bg-gold-500/15 border border-gold-500/30 gold-glow"
                        : person.gen === 3
                        ? "bg-gold-500/5 border border-gold-700/20"
                        : "bg-white/[0.02] border border-white/[0.06]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        person.gen === 0
                          ? "bg-gold-500 text-black"
                          : person.gen === 3
                          ? "bg-gold-700/30 text-gold-400"
                          : "bg-charcoal text-mist"
                      }`}
                    >
                      G{person.gen}
                    </div>
                    <div className="text-left">
                      <div
                        className={`text-sm font-medium ${
                          person.gen === 0 ? "text-gold-300" : "text-pearl"
                        }`}
                      >
                        {person.name}
                      </div>
                      <div className="text-xs text-mist">
                        {person.role} · {person.year}
                      </div>
                    </div>
                  </div>
                  {i < 5 && (
                    <div className="w-px h-6 bg-gradient-to-b from-gold-500/40 to-gold-700/10" />
                  )}
                </div>
              ))}
              <div className="w-px h-8 bg-gradient-to-b from-gold-700/10 to-transparent" />
              <div className="px-6 py-2 rounded-lg border border-dashed border-gold-700/20 text-xs text-mist font-mono animate-pulse">
                DISCOVERY FRONTIER →
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-abyss to-transparent z-10" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-gold-500/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
