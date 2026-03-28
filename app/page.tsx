"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HorizonLine from "@/components/HorizonLine";
import ScrollSection from "@/components/ScrollSection";
import StickyNarrativeSection from "@/components/StickyNarrativeSection";
import AntigravitySignatureSection from "@/components/AntigravitySignatureSection";
import SystemNodes from "@/components/SystemNodes";
import Starfield from "@/components/Starfield";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Starfield />
      <div className="noise-grain" />
      <Navigation />
      <SystemNodes />
      <main className="relative">
        <Hero />
        <HorizonLine />
        <ScrollSection />
        <StickyNarrativeSection />
        <AntigravitySignatureSection />
      </main>
    </>
  );
}
