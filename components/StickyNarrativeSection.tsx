"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function StickyNarrativeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 240, damping: 30, mass: 0.6 };

  const researchOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.24],
    [0, 1, 1, 0],
  );
  const researchScaleRaw = useTransform(scrollYProgress, [0, 0.08, 0.24], [0.9, 1, 1]);
  const researchScale = useSpring(researchScaleRaw, springConfig);

  const hardenedOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.33, 0.43, 0.49],
    [0, 1, 1, 0],
  );
  const hardenedScaleRaw = useTransform(
    scrollYProgress,
    [0.25, 0.33, 0.49],
    [0.9, 1, 1],
  );
  const hardenedScale = useSpring(hardenedScaleRaw, springConfig);

  const deployedOpacity = useTransform(
    scrollYProgress,
    [0.50, 0.58, 0.68, 0.73, 0.75],
    [0, 1, 1, 0, 0],
  );
  const deployedScaleRaw = useTransform(
    scrollYProgress,
    [0.50, 0.58, 0.68, 0.73, 0.75],
    [0.9, 1, 1, 20, 20],
  );
  const deployedScale = useSpring(deployedScaleRaw, {
    stiffness: 300,
    damping: 26,
    mass: 0.5,
  });

  const textureX = useMotionValue(0);
  const textureY = useMotionValue(0);
  const textureXSpring = useSpring(textureX, { stiffness: 180, damping: 24, mass: 0.45 });
  const textureYSpring = useSpring(textureY, { stiffness: 180, damping: 24, mass: 0.45 });

  const texturedBackgroundPosition = useMotionTemplate`
    center,
    calc(50% + ${textureXSpring}px) calc(50% + ${textureYSpring}px)
  `;

  const nextLayerOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 0.95, 0.95]);
  const nextLayerScaleRaw = useTransform(scrollYProgress, [0.65, 1], [0.985, 1]);
  const nextLayerScale = useSpring(nextLayerScaleRaw, { stiffness: 220, damping: 28, mass: 0.7 });
  const voidOpacityRaw = useTransform(scrollYProgress, [0, 0.63, 0.72, 1], [1, 1, 0.3, 0.2]);
  const voidOpacity = useSpring(voidOpacityRaw, { stiffness: 180, damping: 26, mass: 0.65 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (event.clientX / innerWidth - 0.5) * 6;
    const offsetY = (event.clientY / innerHeight - 0.5) * 6;
    textureX.set(offsetX);
    textureY.set(offsetY);
  };

  const handleMouseLeave = () => {
    textureX.set(0);
    textureY.set(0);
  };

  const monolithBaseClass =
    "absolute text-center font-google-sans text-[12vw] font-semibold leading-none tracking-tight text-transparent bg-clip-text";

  const monolithTextureStyle = {
    backgroundImage:
      "linear-gradient(to bottom, #FFFFFF 0%, #A1A1A1 100%), url('/purre icon.png')",
    backgroundSize: "100% 100%, 220px 220px",
    backgroundRepeat: "no-repeat, repeat",
    backgroundBlendMode: "normal, soft-light" as const,
    backgroundPosition: texturedBackgroundPosition,
    willChange: "transform, opacity",
    fontFamily: "var(--font-google-sans), sans-serif",
  };

  return (
    <section ref={containerRef} className="relative z-20 h-[400vh] w-full">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: voidOpacity }} />

        <motion.div
          className="absolute inset-0 z-[5] flex items-center justify-center"
          style={{ opacity: nextLayerOpacity, scale: nextLayerScale }}
        >
          <div className="max-w-4xl px-8 text-center">
            <p className="font-google-sans text-sm uppercase tracking-[0.4em] text-white/45">
              Research Lab
            </p>
            <p className="mt-4 font-google-sans text-3xl md:text-5xl font-medium leading-tight text-white/90">
              Field-ready intelligence systems,
              <br />
              structured for sovereign deployment.
            </p>
          </div>
        </motion.div>

        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <motion.h2
            className={monolithBaseClass}
            style={{
              opacity: researchOpacity,
              scale: researchScale,
              ...monolithTextureStyle,
            }}
          >
            Research.
          </motion.h2>

          <motion.h2
            className={monolithBaseClass}
            style={{
              opacity: hardenedOpacity,
              scale: hardenedScale,
              ...monolithTextureStyle,
            }}
          >
            Hardened.
          </motion.h2>

          <motion.h2
            className={monolithBaseClass}
            style={{
              opacity: deployedOpacity,
              scale: deployedScale,
              ...monolithTextureStyle,
            }}
          >
            Deployed.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
