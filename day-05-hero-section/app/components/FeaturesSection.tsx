"use client";

import Image from "next/image";

interface FeaturesSectionProps {
  onOpenStudio?: () => void;
}

export default function FeaturesSection({ onOpenStudio }: FeaturesSectionProps) {
  const features = [
    {
      badge: "0.8s INFERENCE",
      title: "Real-Time Diffusion Latents",
      description:
        "Generate 4K imagery instantaneously with optimized tensor quantization and sub-second neural compilation.",
      icon: "⚡",
    },
    {
      badge: "NEURAL LIGHTING",
      title: "Cinematic Volumetric Control",
      description:
        "Direct light rays, rim lighting, atmospheric mist, and ray-traced ambient occlusion with natural language prompts.",
      icon: "✦",
    },
    {
      badge: "CREATIVE SUITE",
      title: "Infinite Style Adapters",
      description:
        "Switch seamlessly between dark sci-fi, surreal concept art, editorial fashion photography, and obsidian architecture.",
      icon: "◈",
    },
  ];

  return (
    <section className="relative z-20 py-24 bg-gradient-to-b from-[#030108] via-[#070212] to-[#030108] text-white px-6 sm:px-8 border-t border-purple-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="ai-intelligence">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-4">
            <span>Next-Gen Intelligence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered for pure creative flow
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            From raw thought to museum-grade visual fidelity, explore the toolset powering the next era of digital synthesis.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20" id="tools">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 hover:border-purple-400/40 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition-colors" />
              <div className="w-12 h-12 rounded-2xl glass-pill flex items-center justify-center text-xl text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold block mb-2">
                {item.badge}
              </span>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Showcase Gallery Teaser */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden" id="showcase">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col items-start gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Live Studio Showcase
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Breathtaking clarity. Zero compromises.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-2">
                Experience ultra-deep dynamic range and photorealistic textures. DREAMFRAME models analyze over 12 billion latent dimensions to ensure every grain and sparkle rings true.
              </p>
              <button
                onClick={onOpenStudio}
                className="btn-cta px-6 py-3 rounded-full text-white text-sm font-medium flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Studio</span>
                <span>→</span>
              </button>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                <Image
                  src="/sample-cyber.jpg"
                  alt="Cyberpunk AI Portrait"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 text-[11px] text-white/90 font-medium">
                  Model: Cyber-V2
                </span>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group mt-6">
                <Image
                  src="/sample-cosmic.jpg"
                  alt="Futuristic Monolith"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 text-[11px] text-white/90 font-medium">
                  Model: Cosmic-4K
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4" id="what-we-do">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="font-semibold text-white/80">DREAMFRAME</span>
            <span>— Next-Generation AI Image Synthesis</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero-section" className="hover:text-white transition-colors">
              Back to top ↑
            </a>
            <span>© 2026 DREAMFRAME Inc. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
