"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onOpenStudio?: () => void;
}

export default function Navbar({ onOpenStudio }: NavbarProps) {
  const [activeTab, setActiveTab] = useState("Ai Intelligence");

  const navLinks = [
    { name: "What we do", href: "#what-we-do" },
    { name: "Ai Intelligence", href: "#ai-intelligence" },
    { name: "Tools", href: "#tools" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full pt-6 sm:pt-7 pb-4 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Name on Left: AXIOM */}
        <Link
          href="/"
          className="text-white/95 hover:text-white transition-opacity font-sans text-sm sm:text-lg font-medium tracking-tight shrink-0"
          id="nav-brand"
        >
          AXIOM
        </Link>

        {/* Center Floating Capsule Pill Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 px-5 py-2 rounded-full glass-pill-nav"
          id="center-nav-capsule"
          aria-label="Main Navigation"
        >
          {navLinks.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name);
                  onOpenStudio?.();
                }}
                className={`px-4 py-1 text-sm font-normal rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-white bg-white/[0.14]"
                    : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Login & Get started pill button */}
        <div className="flex items-center gap-3 sm:gap-7 shrink-0">
          <button
            onClick={onOpenStudio}
            className="hidden sm:inline-block text-sm font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
            id="nav-login"
          >
            Login
          </button>

          <button
            onClick={onOpenStudio}
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-normal text-white rounded-full glass-pill cursor-pointer hover:bg-white/[0.14]"
            id="nav-get-started"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}
