"use client";

import { useState } from "react";
import Image from "next/image";

interface StudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudioModal({ isOpen, onClose }: StudioModalProps) {
  const [prompt, setPrompt] = useState(
    "Futuristic obsidian monolith hovering over bioluminescent purple cosmic ocean, 8k cinematic ray tracing"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(100);
  const [selectedImage, setSelectedImage] = useState("/sample-cosmic.jpg");
  const [activeModel, setActiveModel] = useState("DreamFrame v4.2 Turbo");

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(15);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setProgress(100);
            setSelectedImage(
              selectedImage === "/sample-cosmic.jpg"
                ? "/sample-cyber.jpg"
                : "/sample-cosmic.jpg"
            );
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl glass-card rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/60 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-purple-500 animate-pulse" />
            <div>
              <h3 className="font-semibold text-lg text-white">
                DREAMFRAME Studio
              </h3>
              <p className="text-xs text-purple-300/70">
                Ultra-fast neural diffusion engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-200/80 uppercase tracking-wider mb-2">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full rounded-2xl bg-black/50 border border-white/10 p-3.5 text-sm text-white focus:outline-none focus:border-purple-400/60 focus:ring-1 focus:ring-purple-400/50 resize-none"
                placeholder="Describe your imagination in detail..."
              />
            </div>

            {/* Model & Style pills */}
            <div className="flex flex-wrap gap-2">
              {["DreamFrame v4.2 Turbo", "Cinematic Photoreal", "Cyberpunk Violet"].map(
                (model) => (
                  <button
                    key={model}
                    onClick={() => setActiveModel(model)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeModel === model
                        ? "bg-purple-600/30 text-purple-200 border border-purple-400/40"
                        : "glass-pill text-white/60 hover:text-white"
                    }`}
                  >
                    {model}
                  </button>
                )
              )}
            </div>

            {/* Prompt presets */}
            <div>
              <span className="text-[11px] text-white/40 block mb-1.5 uppercase tracking-wider">
                Preset Prompts
              </span>
              <div className="flex flex-col gap-1.5">
                {[
                  "Futuristic obsidian monolith hovering over purple cosmic ocean",
                  "High-fashion ethereal android with glass skin & neon rim light",
                  "Bioluminescent cyber garden at midnight with violet flora",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setPrompt(preset)}
                    className="text-left text-xs text-white/70 hover:text-white truncate p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    ✦ {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate CTA Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-cta w-full py-3 rounded-2xl text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Rendering Neural Latents ({progress}%)...</span>
                </>
              ) : (
                <>
                  <span>Synthesize Image</span>
                  <span>✦</span>
                </>
              )}
            </button>
          </div>

          {/* Canvas Preview Column */}
          <div className="md:col-span-6 flex flex-col items-center justify-center bg-black/40 rounded-2xl border border-white/10 p-3 min-h-[300px] relative overflow-hidden">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImage}
                alt="Generated AI artwork"
                fill
                className={`object-cover transition-all duration-500 ${
                  isGenerating ? "blur-md scale-95 opacity-60" : "blur-0 scale-100 opacity-100"
                }`}
              />

              {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-center">
                  <div className="w-full max-w-[200px] bg-white/10 rounded-full h-1.5 overflow-hidden mb-3">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-purple-500 h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/80 font-mono tracking-wider">
                    Denoising Step {Math.round((progress / 100) * 30)}/30
                  </span>
                </div>
              )}

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] text-white/80">
                <span>Model: {activeModel}</span>
                <span className="text-amber-400 font-mono">8K UHD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
