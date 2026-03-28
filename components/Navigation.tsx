"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useScroll } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { navVariants } from "./PageOrchestrator";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const yPosition = useSpring(0, springConfig);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
          yPosition.set(-100);
        } else {
          setIsVisible(true);
          yPosition.set(0);
        }
      } else {
        setIsVisible(true);
        yPosition.set(0);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [yPosition]);

  const megaMenuContent = {
    About: {
      title: "Discover who we are and what drives us forward",
      links: [
        { name: "Our Story", href: "#story" },
        { name: "Team", href: "#team" },
        { name: "Careers", href: "#careers" },
        { name: "Partners", href: "#partners" },
      ],
    },
    Intelligence: {
      title: "Explore our research and engineering capabilities",
      links: [
        { name: "Research Lab", href: "#research" },
        { name: "AI Systems", href: "#ai" },
        { name: "Publications", href: "#publications" },
      ],
    },
    Resources: {
      title: "Everything you need to stay up-to-date and get help",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "Changelog", href: "#changelog" },
        { name: "Support", href: "#support" },
        { name: "Releases", href: "#releases" },
      ],
    },
  };

  const handleMenuEnter = (menuName: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMegaMenu(menuName);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 100);
  };

  const handleMegaMenuEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  };

  const handleMegaMenuLeave = () => {
    setActiveMegaMenu(null);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 will-change-transform"
      style={{
        y: yPosition,
      }}
      initial="hidden"
      animate="show"
      variants={navVariants}
    >
      <nav
        className="relative w-full px-6 md:px-12 lg:px-16 py-3 border-b border-white/10"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Mobile - Hamburger Icon */}
          <button
            className="md:hidden ml-auto text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop - Nav Links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* About with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('About')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className="font-google-sans text-white/50 text-[0.9rem] sm:text-[1.05rem] leading-relaxed will-change-transform transition-colors duration-300 flex items-center gap-1"
                style={{
                  color: activeMegaMenu === 'About' ? "#FFFFFF" : undefined,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                onMouseLeave={(e) => activeMegaMenu !== 'About' && (e.currentTarget.style.color = "")}
              >
                About
                <motion.div
                  animate={{ rotate: activeMegaMenu === 'About' ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <ChevronDown size={8} strokeWidth={2.5} />
                </motion.div>
              </button>
            </div>
            
            <a
              href="#blogs"
              className="font-google-sans text-white/50 text-[0.9rem] sm:text-[1.05rem] leading-relaxed will-change-transform transition-colors duration-300"
              onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
              onMouseLeave={(e) => e.currentTarget.style.color = ""}
            >
              Blogs
            </a>
            
            {/* Intelligence with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('Intelligence')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className="font-google-sans text-white/50 text-[0.9rem] sm:text-[1.05rem] leading-relaxed will-change-transform transition-colors duration-300 flex items-center gap-1"
                style={{
                  color: activeMegaMenu === 'Intelligence' ? "#FFFFFF" : undefined,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                onMouseLeave={(e) => activeMegaMenu !== 'Intelligence' && (e.currentTarget.style.color = "")}
              >
                Intelligence
                <motion.div
                  animate={{ rotate: activeMegaMenu === 'Intelligence' ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <ChevronDown size={8} strokeWidth={2.5} />
                </motion.div>
              </button>
            </div>
            
            {/* Resources with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('Resources')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className="font-google-sans text-white/50 text-[0.9rem] sm:text-[1.05rem] leading-relaxed will-change-transform transition-colors duration-300 flex items-center gap-1"
                style={{
                  color: activeMegaMenu === 'Resources' ? "#FFFFFF" : undefined,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                onMouseLeave={(e) => activeMegaMenu !== 'Resources' && (e.currentTarget.style.color = "")}
              >
                Resources
                <motion.div
                  animate={{ rotate: activeMegaMenu === 'Resources' ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <ChevronDown size={8} strokeWidth={2.5} />
                </motion.div>
              </button>
            </div>
            
            <a
              href="#contact"
              className="font-google-sans text-white/50 text-[0.9rem] sm:text-[1.05rem] leading-relaxed will-change-transform transition-colors duration-300"
              onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
              onMouseLeave={(e) => e.currentTarget.style.color = ""}
            >
              Contact
            </a>
          </div>

          {/* Mobile - Centered Logo */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2">
            <Image
              src="/anthronite logo no bg.png"
              alt="Anthronite Logo"
              width={90}
              height={32}
              className="object-contain h-auto will-change-transform"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Desktop - Right Logo */}
          <div className="hidden md:flex items-center">
            <Image
              src="/anthronite logo no bg.png"
              alt="Anthronite Logo"
              width={110}
              height={38}
              className="object-contain w-22 md:w-26 lg:w-28 h-auto will-change-transform"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </nav>
      
      {/* Desktop Mega Menus */}
      <div
        className="hidden md:block"
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMegaMenuLeave}
      >
        {activeMegaMenu && megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent] && (
          <MegaMenu
            isOpen={true}
            title={megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent].title}
            links={megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent].links}
          />
        )}
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        megaMenuContent={megaMenuContent}
      />
    </motion.header>
  );
}
