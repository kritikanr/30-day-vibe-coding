"use client";

import { useState, useEffect, useRef } from "react";
import HeroCanvas from "./HeroCanvas";

interface HeroSectionProps {
  onOpenStudio?: () => void;
}

export default function HeroSection({ onOpenStudio }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Text smoothly fades and glides in during the final phase of the sequence (0.68 -> 0.92)
  const textProgress = Math.min(Math.max((scrollProgress - 0.68) / 0.24, 0), 1);
  const textOpacity = textProgress;
  const textTranslateY = (1 - textProgress) * 24;

  // Initial (Scroll to Explore) prompt fades out immediately on user scroll
  const scrollIndicatorOpacity = Math.max(1 - scrollProgress * 12, 0);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#050403]"
      id="hero-scroll-container"
    >
      {/* FULL-SCREEN STICKY VIEWPORT PINNED DURING 450VH SCROLL */}
      <section
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start pt-24 min-[420px]:pt-28 sm:justify-center sm:pt-0 px-6 sm:px-12 lg:px-20 select-none"
        id="hero-section"
      >
        {/* 1. CINEMATIC SCROLL-LINKED HTML5 CANVAS ANIMATION */}
        <HeroCanvas containerRef={containerRef} />

        {/* 2. SEAMLESS EDGE BLENDING & ATMOSPHERIC VIGNETTE */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-90"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 45%, rgba(5,4,3,0.45) 75%, #050403 100%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#050403]/60 via-transparent to-[#050403]/80" />

        {/* Subtle luxury warm amber atmospheric radiance on the left side */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[480px] bg-gradient-to-tr from-amber-600/10 via-purple-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        {/* Subtle contrast scrim for crystal-clear readability */}
        <div className="absolute inset-0 pointer-events-none z-[1] bg-black/20" />

        {/* 3. HERO CONTENT CLUSTER (LEFT-ALIGNED, NO OVERLAP ON ASTRONAUT) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
          <div
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl flex flex-col items-start text-left transition-all duration-300 ease-out will-change-transform"
            style={{
              opacity: textOpacity,
              transform: isClient
                ? `translate3d(${mousePos.x * -0.15}px, calc(${textTranslateY}px + ${mousePos.y * -0.15}px), 0)`
                : `translateY(${textTranslateY}px)`,
              pointerEvents: textOpacity > 0.3 ? "auto" : "none",
            }}
          >
            {/* Main Title: Left-aligned with balanced 2-line wrap */}
            <h1
              className="text-3xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-white leading-[1.12] mb-4 sm:mb-5 font-sans select-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]"
              id="hero-main-title"
            >
              There’s a world beyond legacy
            </h1>

            {/* Subheading: Left-aligned with comfortable line length */}
            <p
              className="max-w-md sm:max-w-lg text-xs min-[400px]:text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6 sm:mb-8 select-none drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
              id="hero-subheading"
            >
              Reimagine outdated systems, unlock new possibilities, and build for a future that doesn’t stand still.
            </p>

            {/* Action Button: Frosted Glass Capsule left-aligned */}
            <button
              onClick={onOpenStudio}
              className="group flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white/95 hover:text-white font-medium text-xs sm:text-sm tracking-wide cursor-pointer bg-white/[0.08] hover:bg-white/[0.14] active:bg-white/[0.18] backdrop-blur-xl border border-white/20 hover:border-white/35 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.12)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40"
              id="hero-action-btn"
            >
              <span>Explore what’s possible</span>
              <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </button>
          </div>
        </div>

        {/* 4. SUBTLE INITIAL SCROLL CUE (FADES OUT AS USER SCROLLS) */}
        <div
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-300 select-none text-center"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-xs sm:text-sm text-white/50 tracking-wider font-sans">
            (Scroll to Explore)
          </span>
        </div>
      </section>
    </div>
  );
}
