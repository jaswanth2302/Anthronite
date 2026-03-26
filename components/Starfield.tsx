"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { starfieldVariants } from "./PageOrchestrator";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  phaseOffset: number;
  twinkleDuration: number;
  layer: 'far' | 'near';
  parallaxSpeed: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      const starCount = 120;
      const stars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        const isFar = Math.random() > 0.4;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.5,
          baseOpacity: Math.random() * 0.55 + 0.3,
          phaseOffset: Math.random() * Math.PI * 2,
          twinkleDuration: Math.random() * 1400 + 1600,
          layer: isFar ? 'far' : 'near',
          parallaxSpeed: isFar ? 0.05 : 0.12,
        });
      }

      starsRef.current = stars;
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        const cycle = (time / star.twinkleDuration) * Math.PI * 2;
        const twinkle = Math.sin(cycle + star.phaseOffset);
        const opacity = star.baseOpacity + twinkle * 0.4;

        const verticalRange = canvas.height + 20;
        const layerParallax = (scrollYRef.current * star.parallaxSpeed) % verticalRange;
        const yPos = ((star.y - layerParallax + verticalRange) % verticalRange) - 10;

        if (yPos > -10 && yPos < canvas.height + 10) {
          const finalOpacity = Math.max(0, Math.min(1, opacity));
          
          // Subtle glow effect
          if (finalOpacity > 0.4) {
            ctx.beginPath();
            ctx.arc(star.x, yPos, star.radius * 2.5, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(
              star.x, yPos, 0,
              star.x, yPos, star.radius * 2.5
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.24})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
          }
          
          // Core star
          ctx.beginPath();
          ctx.arc(star.x, yPos, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    initStars();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll, { passive: true });

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none will-change-transform"
      style={{
        zIndex: -1,
        willChange: "transform, opacity",
        background: "#000000",
      }}
      initial="hidden"
      animate="show"
      variants={starfieldVariants}
    />
  );
}
