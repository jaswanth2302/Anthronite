"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function HorizonLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Line width: starts at 0, expands to 80%, then shrinks back
  const width = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.6, 0.9, 1],
    [0, 5, 80, 80, 5, 0]
  );

  // Line opacity: fades in, holds, fades out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [0, 1, 1, 1, 0]
  );

  // Subtle glow intensity
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, 0.7, 1, 0.7, 0]
  );

  // Width as a CSS percentage string
  const widthPercent = useMotionTemplate`${width}%`;

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center pointer-events-none"
      style={{ height: "40vh" }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: widthPercent,
          opacity,
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute h-[1px] w-full"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
            height: "60px",
            filter: "blur(16px)",
          }}
        />
        {/* Core line */}
        <div
          className="w-full"
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 15%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 85%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
