"use client";

import dynamic from "next/dynamic";

const RemotionPlayer = dynamic(
  () => import("@/components/motion/RemotionPlayer"),
  { ssr: false }
);

export default function CinematicSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Journey <span className="gold-text">Through Time</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Watch the ancestral line unfold through cinematic motion
          </p>
        </div>

        <div className="glass-panel overflow-hidden">
          <RemotionPlayer />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-mist">
            Remotion-powered cinematic visualization · Generated from research data
          </p>
        </div>
      </div>
    </section>
  );
}
