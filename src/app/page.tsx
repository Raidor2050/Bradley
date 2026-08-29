"use client";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import ResearchStats from "@/components/hero/ResearchStats";
import AncestralDepthViz from "@/components/hero/AncestralDepthViz";
import FamilyGraph from "@/components/graph/FamilyGraph";
import TimelineSection from "@/components/timeline/TimelineSection";
import SourceExplorer from "@/components/sources/SourceExplorer";
import FrontierSection from "@/components/frontier/FrontierSection";
import MethodologySection from "@/components/frontier/MethodologySection";
import CinematicSection from "@/components/motion/CinematicSection";
import Carousel3D from "@/components/carousel/Carousel3D";
import GeographicMap from "@/components/map/GeographicMap";
import ParticleBackground from "@/components/motion/ParticleBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-abyss">
      <ParticleBackground />
      <Navigation />

      <main>
        <HeroSection />
        <div className="neon-line max-w-4xl mx-auto" />
        <ResearchStats />
        <div className="neon-line max-w-4xl mx-auto" />
        <AncestralDepthViz />
        <div className="neon-line max-w-4xl mx-auto" />
        <GeographicMap />
        <div className="neon-line max-w-4xl mx-auto" />
        <FamilyGraph />
        <div className="neon-line max-w-4xl mx-auto" />
        <CinematicSection />
        <div className="neon-line max-w-4xl mx-auto" />
        <Carousel3D />
        <div className="neon-line max-w-4xl mx-auto" />
        <TimelineSection />
        <div className="neon-line max-w-4xl mx-auto" />
        <SourceExplorer />
        <div className="neon-line max-w-4xl mx-auto" />
        <FrontierSection />
        <div className="neon-line max-w-4xl mx-auto" />
        <MethodologySection />
      </main>

      <Footer />
    </div>
  );
}
