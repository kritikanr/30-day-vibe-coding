"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StudioModal from "./components/StudioModal";

export default function Home() {
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col overflow-x-clip selection:bg-purple-600 selection:text-white">
      {/* Top Floating Glass Navigation */}
      <Navbar onOpenStudio={() => setIsStudioOpen(true)} />

      {/* Main Recreated Hero Section on Pure Black */}
      <HeroSection onOpenStudio={() => setIsStudioOpen(true)} />

      {/* Interactive AI Image Generation Studio Modal */}
      <StudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />
    </main>
  );
}
