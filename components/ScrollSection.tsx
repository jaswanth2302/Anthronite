"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import TextType from "./TextType";

export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showSubLineOne, setShowSubLineOne] = useState(false);
  const [showSubLineTwo, setShowSubLineTwo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heavySpringConfig = { stiffness: 80, damping: 25, mass: 1.5 };
  const mouseX = useSpring(0, heavySpringConfig);
  const mouseY = useSpring(0, heavySpringConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [80, 0, 0, -80]);
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.18, 0.85, 1], [0, 1, 1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.08 && !showContent) setShowContent(true);
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)',
            zIndex: 0,
          }}
        />
        <motion.div
          className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="relative flex flex-col items-start justify-center px-4 md:px-8 lg:px-12 order-1 h-1/2 md:h-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-geist tracking-tighter text-chrome-gradient leading-[1.1] whitespace-nowrap">
              {showContent && (
                <TextType
                  as="span"
                  text="Intelligence,"
                  typingSpeed={30}
                  pauseDuration={1000}
                  deletingSpeed={30}
                  loop={false}
                  startOnVisible
                  cursorClassName="text-white"
                  onSentenceComplete={() => setShowSecondLine(true)}
                />
              )}
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-geist tracking-tighter text-chrome-gradient leading-[1.1] whitespace-nowrap">
              {showSecondLine && (
                <TextType
                  as="span"
                  text="Shipped."
                  typingSpeed={30}
                  pauseDuration={1000}
                  deletingSpeed={30}
                  loop={false}
                  startOnVisible
                  cursorClassName="text-white"
                  onSentenceComplete={() => setShowSubLineOne(true)}
                />
              )}
            </h2>

            <div className="mt-8 max-w-[480px] font-google-sans text-white/50 text-[1.25rem] leading-relaxed">
              <p>
                {showSubLineOne && (
                  <TextType
                    as="span"
                    text="Delivering systems engineered for extreme reliability"
                    typingSpeed={10}
                    pauseDuration={1000}
                    deletingSpeed={30}
                    loop={false}
                    startOnVisible
                    showCursor={false}
                    onSentenceComplete={() => setShowSubLineTwo(true)}
                  />
                )}
              </p>
              <p>
                {showSubLineTwo && (
                  <TextType
                    as="span"
                    text="Transitioning high-end research into sovereign infrastructure."
                    typingSpeed={10}
                    pauseDuration={1000}
                    deletingSpeed={30}
                    loop={false}
                    startOnVisible
                    showCursor={false}
                  />
                )}
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-2 h-1/2 md:h-full">
            {isMobile ? (
              <motion.div
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                style={{ opacity: imageOpacity }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/falling man.png"
                  alt="The Falling Man"
                  width={500}
                  height={700}
                  className="object-contain max-w-[80%] max-h-[80%] image-glow will-change-transform"
                />
              </motion.div>
            ) : (
              <motion.div
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                style={{
                  opacity: imageOpacity,
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src="/falling man.png"
                  alt="The Falling Man"
                  width={500}
                  height={700}
                  className="object-contain max-w-[80%] max-h-[80%] image-glow will-change-transform"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
