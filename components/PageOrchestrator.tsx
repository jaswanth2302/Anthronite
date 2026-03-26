"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageOrchestratorProps {
  children: ReactNode;
}

const orchestrationVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const starfieldVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export const sculptureVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      delay: 0.2,
    },
  },
};

export const textVariants = {
  hidden: { opacity: 0, x: -50, y: 0 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      delay: 0.4,
    },
  },
};

export const navVariants = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      delay: 0.6,
    },
  },
};

export const sectionVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98,
    y: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
    },
  },
};

export default function PageOrchestrator({ children }: PageOrchestratorProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={orchestrationVariants}
    >
      {children}
    </motion.div>
  );
}
