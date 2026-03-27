"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";
import { sculptureVariants } from "./PageOrchestrator";
import TextType from "./TextType";
import useOrientation from "@/hooks/useOrientation";

function HeroText({ parallaxStyle }: { parallaxStyle: { x: MotionValue<number>; y: MotionValue<number> } }) {
  const [showTagline, setShowTagline] = useState(false);

  return (
    <div className="flex flex-col items-start">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-google-sans text-chrome-gradient whitespace-nowrap leading-[1.1] mb-2"
        style={{
          letterSpacing: "-0.05em",
          x: parallaxStyle.x,
          y: parallaxStyle.y,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ type: "spring", damping: 30, delay: 0.2 }}
      >
        <TextType
          as="span"
          text="Anthronite."
          typingSpeed={90}
          pauseDuration={1200}
          deletingSpeed={35}
          loop={false}
          startOnVisible
          cursorClassName="text-white"
          onSentenceComplete={() => setShowTagline(true)}
        />
      </motion.h1>

      <p
        className="font-geist font-light text-[#EDEDED] uppercase tracking-[0.2em]"
        style={{
          fontSize: "1.1rem",
        }}
      >
        {showTagline && (
          <TextType
            as="span"
            text="Architecting the Inevitable"
            typingSpeed={45}
            pauseDuration={1200}
            deletingSpeed={25}
            loop={false}
            startOnVisible
            cursorClassName="text-[#EDEDED]"
            hideCursorWhileTyping
          />
        )}
      </p>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { gamma, beta } = useOrientation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  const orientationX = useSpring(0, { stiffness: 120, damping: 20, mass: 0.4 });
  const orientationY = useSpring(0, { stiffness: 120, damping: 20, mass: 0.4 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const combinedSculptureX = useTransform([mouseX, orientationX], ([mouseOffset, orientationOffset]: number[]) => mouseOffset * 20 + orientationOffset);
  const combinedSculptureY = useTransform([mouseY, orientationY], ([mouseOffset, orientationOffset]: number[]) => mouseOffset * 20 + orientationOffset);

  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const yPosition = useTransform(scrollYProgress, [0, 0.75, 1], [0, 0, -150]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const maxOffset = 15;
    const nextX = Math.max(-maxOffset, Math.min(maxOffset, gamma / 3));
    const nextY = Math.max(-maxOffset, Math.min(maxOffset, -beta / 3));
    orientationX.set(nextX);
    orientationY.set(nextY);
  }, [beta, gamma, orientationX, orientationY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !stickyRef.current) return;

    const rect = stickyRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={containerRef} className="relative w-full" style={{ height: '200dvh' }}>
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100dvh' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)',
            zIndex: 0,
          }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col md:grid md:grid-cols-2 gap-0"
          style={{ opacity, y: yPosition }}
        >
        <div className="relative flex items-center justify-center md:order-1 h-full md:h-full">
          {isMobile ? (
            <motion.div
              className="relative w-full h-full flex items-center justify-center will-change-transform"
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8 } }}
              viewport={{ amount: 0.2, once: false }}
              variants={sculptureVariants}
              style={{ x: orientationX, y: orientationY }}
            >
              <Image
                src="/women.png"
                alt="The Architect"
                width={1200}
                height={1400}
                className="object-contain max-w-[98%] max-h-[98%] w-auto h-auto image-glow will-change-transform"
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              className="relative w-full h-full flex items-center justify-center will-change-transform"
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8 } }}
              viewport={{ amount: 0.2, once: false }}
              variants={sculptureVariants}
              style={{
                rotateX,
                rotateY,
                x: combinedSculptureX,
                y: combinedSculptureY,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src="/women.png"
                alt="The Architect"
                width={1200}
                height={1400}
                className="object-contain max-w-[98%] max-h-[98%] w-auto h-auto image-glow will-change-transform"
                priority
              />
            </motion.div>
          )}
        </div>

        <div className="absolute md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto flex flex-col items-start justify-end md:justify-center px-8 pb-12 md:px-8 lg:px-12 md:order-2 h-auto md:h-full z-10">
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:hidden"
            style={{ zIndex: -1 }}
          />
          <HeroText parallaxStyle={{ x: orientationX, y: orientationY }} />
        </div>
        </motion.div>
      </div>
    </section>
  );
}
