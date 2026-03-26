"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface NodeData {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

function SystemNode({
  node,
  scrollYProgress,
}: {
  node: NodeData;
  scrollYProgress: MotionValue<number>;
}) {
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [node.y, node.y + 50]
  );

  return (
    <motion.div
      className="absolute rounded-full bg-gray-500 will-change-transform"
      style={{
        left: `${node.x}%`,
        width: `${node.size}px`,
        height: `${node.size}px`,
        y: yParallax,
        opacity: 0.3,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: node.delay,
        ease: "easeInOut",
      }}
    />
  );
}

export default function SystemNodes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const nodes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 200,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ perspective: "1000px" }}
    >
      {nodes.map((node) => (
        <SystemNode
          key={node.id}
          node={node}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
