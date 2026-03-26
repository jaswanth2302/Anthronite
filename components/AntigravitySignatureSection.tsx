"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function AntigravitySignatureSection() {
  const [isLocationHovered, setIsLocationHovered] = useState(false);

  return (
    <section className="relative z-20 h-screen w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <motion.h2
          className="relative text-center font-google-sans text-[22vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400"
          style={{
            fontFamily: "var(--font-google-sans), sans-serif",
            willChange: "transform, opacity",
          }}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ amount: 0.55, once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.9 }}
        >
          Anthronite
        </motion.h2>
      </div>

      <div className="absolute bottom-10 z-20 w-full px-6 md:px-12">
        <div className="flex items-center justify-between gap-4 text-[10px] tracking-[0.16em] text-white/75">
          <div className="flex items-center gap-2 font-google-sans uppercase">
            <span className="inline-block h-[7px] w-[7px] rounded-sm bg-gradient-to-b from-white to-neutral-400" />
            <span>ANTHRONITE SYSTEMS</span>
          </div>

          <div className="hidden font-google-sans text-white/40 md:block">
            Privacy Policy | Terms &amp; Conditions
          </div>

          <div
            className="flex items-center gap-2 font-google-sans uppercase"
            onMouseEnter={() => setIsLocationHovered(true)}
            onMouseLeave={() => setIsLocationHovered(false)}
          >
            <span className="relative inline-flex h-3 w-3 items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-full border border-white/45"
                animate={
                  isLocationHovered
                    ? { scale: [1, 1.9, 1], opacity: [0.45, 0, 0.45] }
                    : { scale: 1, opacity: 0 }
                }
                transition={{
                  duration: 1.15,
                  repeat: isLocationHovered ? Infinity : 0,
                  ease: "easeOut",
                }}
              />
              <MapPin className="h-3 w-3 text-white/85" strokeWidth={2.2} />
            </span>
            <span>Chennai / Global</span>
          </div>
        </div>
      </div>
    </section>
  );
}
