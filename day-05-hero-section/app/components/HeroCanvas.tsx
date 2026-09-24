"use client";

import { useEffect, useRef, useCallback } from "react";

interface HeroCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const TOTAL_FRAMES = 260;

function getFrameSrc(index: number): string {
  const pad = String(index).padStart(3, "0");
  return `frames/ezgif-frame-${pad}.jpg`;
}

export default function HeroCanvas({ containerRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES + 1).fill(false));

  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const renderedFrameRef = useRef<number>(-1);
  const isReducedMotionRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Draw an image onto the canvas using cover aspect ratio
  const drawImageCover = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;

    let drawW: number;
    let drawH: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      offsetX = 0;
      offsetY = (canvasH - drawH) / 2;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      offsetX = (canvasW - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Find the exact frame or the closest loaded frame to avoid any black frame or flicker
  const drawFrame = useCallback(
    (targetIndex: number) => {
      const clamped = Math.min(Math.max(Math.round(targetIndex), 1), TOTAL_FRAMES);

      // Check if exact frame is loaded
      if (loadedRef.current[clamped] && imagesRef.current[clamped]) {
        drawImageCover(imagesRef.current[clamped]!);
        renderedFrameRef.current = clamped;
        return;
      }

      // Fallback: search nearest loaded frame
      let bestFrame = -1;
      let minDiff = Infinity;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (loadedRef.current[i] && imagesRef.current[i]) {
          const diff = Math.abs(i - clamped);
          if (diff < minDiff) {
            minDiff = diff;
            bestFrame = i;
          }
        }
      }

      if (bestFrame !== -1 && imagesRef.current[bestFrame]) {
        drawImageCover(imagesRef.current[bestFrame]!);
        renderedFrameRef.current = bestFrame;
      }
    },
    [drawImageCover]
  );

  // Resize canvas to window dimensions with Retina / DPR support
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.floor(window.innerWidth * dpr);
    const targetH = Math.floor(window.innerHeight * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      if (renderedFrameRef.current > 0) {
        drawFrame(renderedFrameRef.current);
      }
    }
  }, [drawFrame]);

  // Recalculate target frame from scroll progress
  const updateScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;

    if (scrollableDistance <= 0) {
      targetFrameRef.current = 1;
      return;
    }

    // Progress goes from 0.0 at top of hero to 1.0 at bottom of hero
    const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
    targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
  }, [containerRef]);

  // Main setup: preloading, event listeners, persistent animation loop
  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Initial resize & scroll
    resizeCanvas();
    updateScroll();

    // 1. High-priority load of Frame 1
    const frame1 = new Image();
    frame1.src = getFrameSrc(1);
    frame1.onload = () => {
      imagesRef.current[1] = frame1;
      loadedRef.current[1] = true;
      drawFrame(1);
    };

    // 2. Progressive preloading of remaining frames (staggered chunks to keep network/main thread smooth)
    let isCancelled = false;

    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[idx]) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = getFrameSrc(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[idx] = img;
            loadedRef.current[idx] = true;
            if (Math.round(currentFrameRef.current) === idx) {
              drawFrame(idx);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    // Preload strategy:
    // First, immediately load frames 2..30 (the initial scroll zone) and keyframes (every 5th frame)
    // Then load the rest progressively
    const preloadAllFrames = async () => {
      // Chunk 1: Near frames (2..30)
      const nearFrames = Array.from({ length: 29 }, (_, i) => i + 2);
      for (let i = 0; i < nearFrames.length; i += 6) {
        if (isCancelled) return;
        await Promise.all(nearFrames.slice(i, i + 6).map(loadSingleFrame));
      }

      // Chunk 2: Keyframe milestones across the whole sequence (every 5th frame)
      const keyframes: number[] = [];
      for (let i = 35; i <= TOTAL_FRAMES; i += 5) {
        keyframes.push(i);
      }
      for (let i = 0; i < keyframes.length; i += 6) {
        if (isCancelled) return;
        await Promise.all(keyframes.slice(i, i + 6).map(loadSingleFrame));
      }

      // Chunk 3: Fill in all remaining in-between frames
      const remaining: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!loadedRef.current[i]) remaining.push(i);
      }
      for (let i = 0; i < remaining.length; i += 10) {
        if (isCancelled) return;
        await Promise.all(remaining.slice(i, i + 10).map(loadSingleFrame));
      }
    };

    preloadAllFrames();

    // 3. Persistent Animation Loop with smooth lerp
    const animLoop = () => {
      if (isReducedMotionRef.current) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        const diff = targetFrameRef.current - currentFrameRef.current;
        // Apple-style buttery easing
        currentFrameRef.current += diff * 0.088;
        if (Math.abs(diff) < 0.005) {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      const targetInt = Math.round(currentFrameRef.current);
      if (targetInt !== renderedFrameRef.current) {
        drawFrame(targetInt);
      }

      animFrameIdRef.current = requestAnimationFrame(animLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(animLoop);

    // 4. Scroll and Resize Event Listeners
    const handleScroll = () => {
      updateScroll();
    };

    const handleResize = () => {
      resizeCanvas();
      updateScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      isCancelled = true;
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame, resizeCanvas, updateScroll]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
