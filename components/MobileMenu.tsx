"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  megaMenuContent: any;
}

export default function MobileMenu({ isOpen, onClose, megaMenuContent }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, mounted]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[110] will-change-transform"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              backdropFilter: "blur(25px) saturate(150%)",
              WebkitBackdropFilter: "blur(25px) saturate(150%)",
              backgroundColor: "rgba(10, 10, 10, 0.95)",
            }}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="font-google-sans font-medium text-white" style={{ fontSize: "18px" }}>
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 py-6">
                {Object.entries(megaMenuContent).map(([key, content]: [string, any]) => (
                  <div key={key} className="border-b border-white/5">
                    <button
                      onClick={() => toggleSection(key)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                      style={{
                        color: expandedSection === key ? "#FFFFFF" : "rgba(192, 192, 192, 0.8)",
                      }}
                    >
                      <span className="font-google-sans font-medium" style={{ fontSize: "16px" }}>
                        {key}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedSection === key ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedSection === key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 space-y-2">
                            {content.links.map((link: any) => (
                              <a
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-2 py-2 transition-colors"
                                style={{
                                  color: hoveredLink === link.name ? "#FFFFFF" : "rgba(192, 192, 192, 0.7)",
                                }}
                                onTouchStart={() => setHoveredLink(link.name)}
                                onTouchEnd={() => setHoveredLink(null)}
                              >
                                <span className="font-google-sans font-normal" style={{ fontSize: "14px" }}>
                                  {link.name}
                                </span>
                                <ChevronRight size={14} opacity={0.5} />
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <a
                  href="#blogs"
                  className="block px-6 py-4 border-b border-white/5 font-google-sans font-medium transition-colors"
                  style={{
                    fontSize: "16px",
                    color: "rgba(192, 192, 192, 0.8)",
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.color = "rgba(192, 192, 192, 0.8)";
                  }}
                >
                  Blogs
                </a>

                <a
                  href="#contact"
                  className="block px-6 py-4 border-b border-white/5 font-google-sans font-medium transition-colors"
                  style={{
                    fontSize: "16px",
                    color: "rgba(192, 192, 192, 0.8)",
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.color = "rgba(192, 192, 192, 0.8)";
                  }}
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
