"use client";

import { useState, useEffect } from "react";
import { useAncestryStore } from "@/stores/useAncestryStore";

const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "graph", label: "Family Graph", href: "#graph" },
  { id: "timeline", label: "Timeline", href: "#timeline" },
  { id: "sources", label: "Sources", href: "#sources" },
  { id: "frontier", label: "Frontier", href: "#frontier" },
  { id: "methodology", label: "Methodology", href: "#methodology" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeSection, setActiveSection } = useAncestryStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string, id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-gold-700/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => handleClick("#home", "home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center font-display text-black font-bold text-lg group-hover:shadow-lg group-hover:shadow-gold-500/20 transition-shadow">
            BM
          </div>
          <div className="hidden sm:block">
            <div className="font-accent text-gold-400 text-sm tracking-[0.2em]">
              BRADLEY MUKHUTI
            </div>
            <div className="text-[10px] text-mist tracking-[0.15em] uppercase">
              Deep Ancestry
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.href, link.id)}
              className={`px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-lg ${
                activeSection === link.id
                  ? "text-gold-400 bg-gold-500/10"
                  : "text-mist hover:text-gold-300 hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-700/30 bg-gold-500/5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-mist font-mono">RESEARCH ACTIVE</span>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-mist hover:text-gold-400 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gold-700/20 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.href, link.id)}
              className={`block w-full text-left px-4 py-3 text-sm tracking-wide transition-all rounded-lg ${
                activeSection === link.id
                  ? "text-gold-400 bg-gold-500/10"
                  : "text-mist hover:text-gold-300"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
