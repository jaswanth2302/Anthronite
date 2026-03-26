"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface MegaMenuLink {
  name: string;
  href: string;
}

interface MegaMenuProps {
  isOpen: boolean;
  title: string;
  links: MegaMenuLink[];
}

export default function MegaMenu({ isOpen, title, links }: MegaMenuProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute left-0 right-0 top-full mt-0 will-change-transform border-t border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            backdropFilter: "blur(25px) saturate(150%)",
            WebkitBackdropFilter: "blur(25px) saturate(150%)",
            backgroundColor: "rgba(10, 10, 10, 0.7)",
          }}
        >
          <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left Side - Hook Text */}
              <div className="max-w-[250px]">
                <p className="font-google-sans font-medium text-white leading-[1.1]" style={{ fontSize: "28px" }}>
                  {title}
                </p>
              </div>

              {/* Right Side - Links */}
              <div className="flex flex-col space-y-3">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-2 transition-colors duration-200 will-change-transform"
                    style={{
                      color: hoveredLink === link.name ? "#FFFFFF" : "rgba(192, 192, 192, 0.8)",
                    }}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="font-google-sans font-normal" style={{ fontSize: "18px" }}>{link.name}</span>
                    <motion.div
                      animate={{
                        x: hoveredLink === link.name ? 4 : 0,
                        opacity: hoveredLink === link.name ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <ChevronRight size={16} strokeWidth={2} />
                    </motion.div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
