"use client";

import { hues, readCssHue } from "@/lib/colors";
import { useEffect, useRef, type ReactNode } from "react";

type InteractiveGridProps = {
  className?: string;
  /** dark = strokes on light paper; light = soft strokes on ink green */
  tone?: "dark" | "light";
  /** Closest ancestor selector used for pointer tracking (lets grids under content react). */
  trackRoot?: string;
};

/**
 * Shared responsive grid (same cell size / stroke behavior as the hero).
 * Transparent canvas; parent supplies background and fade masks.
 */
export function InteractiveGrid({
  className,
  tone = "dark",
  trackRoot,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layoutRoot = canvas.parentElement ?? canvas;
    const pointerRoot =
      (trackRoot ? canvas.closest(trackRoot) : null) ?? canvas;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: 0, y: 0, active: false };
    const hueInk = readCssHue("--hue-teal", hues.teal);
    const stroke =
      tone === "light"
        ? (a: number) => `oklch(86% 0.025 ${hueInk} / ${a})`
        : (a: number) => `oklch(28% 0.05 ${hueInk} / ${a})`;
    const baseAlpha = tone === "light" ? 0.045 : 0.028;
    const maxAlpha = tone === "light" ? 0.42 : 0.55;
    /** Stay under typical browser canvas limits (~16k–32k). */
    const MAX_BACKING = 8192;

    function resize() {
      const rect = layoutRoot.getBoundingClientRect();
      const nextW = Math.max(1, Math.floor(rect.width));
      const nextH = Math.max(1, Math.floor(rect.height));
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);

      if (nextW === w && nextH === h && nextDpr === dpr) return;

      w = nextW;
      h = nextH;
      dpr = nextDpr;

      const bw = Math.min(Math.floor(w * dpr), MAX_BACKING);
      const bh = Math.min(Math.floor(h * dpr), MAX_BACKING);
      if (canvas!.width !== bw) canvas!.width = bw;
      if (canvas!.height !== bh) canvas!.height = bh;
      ctx!.setTransform(bw / w, 0, 0, bh / h, 0, 0);
    }

    function gridAlphaAt(px: number, py: number) {
      if (!pointer.active && reduced) return baseAlpha;

      const span = Math.max(Math.min(w, h), Math.max(w * 0.45, 480));

      let boost = 0;
      if (pointer.active) {
        const dist = Math.hypot(px - pointer.x, py - pointer.y);
        const radius = span * 0.55;
        boost = Math.max(0, 1 - dist / radius);
        boost = boost * boost;
      }

      const wellA = Math.hypot(px - w * 0.22, py - h * 0.28);
      const wellB = Math.hypot(px - w * 0.78, py - h * 0.62);
      const staticBoost =
        Math.max(0, 1 - wellA / (span * 0.55)) * 0.22 +
        Math.max(0, 1 - wellB / (span * 0.5)) * 0.16;

      return Math.min(maxAlpha, baseAlpha + boost * 0.42 + staticBoost * 0.12);
    }

    function drawGrid() {
      const gap = 48;
      const shiftY = -gap * 2;

      ctx!.save();
      ctx!.translate(0, shiftY);

      for (let x = 0; x < w; x += gap) {
        for (let y = 0; y < h + gap * 2; y += gap) {
          const screenY = y + shiftY;
          const a1 = gridAlphaAt(x, screenY + gap / 2);
          const a2 = gridAlphaAt(x + gap / 2, screenY);

          ctx!.strokeStyle = stroke(a1);
          ctx!.lineWidth = 1 + a1 * 1.6;
          ctx!.beginPath();
          ctx!.moveTo(x, y);
          ctx!.lineTo(x, y + gap);
          ctx!.stroke();

          ctx!.strokeStyle = stroke(a2);
          ctx!.lineWidth = 1 + a2 * 1.6;
          ctx!.beginPath();
          ctx!.moveTo(x, y);
          ctx!.lineTo(x + gap, y);
          ctx!.stroke();
        }
      }

      ctx!.restore();
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      drawGrid();
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      if (reduced) frame();
    }

    function onLeave() {
      pointer.active = false;
      if (reduced) frame();
    }

    function onResize() {
      resize();
      frame();
    }

    const ro = new ResizeObserver(onResize);
    // Observe the layout parent only — observing the canvas while setting
    // width/height attributes can feedback until the max canvas size.
    ro.observe(layoutRoot);

    resize();
    frame();

    window.addEventListener("resize", onResize);
    pointerRoot.addEventListener("pointermove", onPointer);
    pointerRoot.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      pointerRoot.removeEventListener("pointermove", onPointer);
      pointerRoot.removeEventListener("pointerleave", onLeave);
    };
  }, [tone, trackRoot]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

/** Continuous ink wrapper for Coverage + FAQ (no grid of its own). */
export function InkGridShell({ children }: { children: ReactNode }) {
  return <div className="ink-grid-shell section-ink">{children}</div>;
}

/**
 * Light grid only in the space between Coverage and FAQ.
 * Zero layout height so section spacing stays unchanged.
 */
export function InkGridMid() {
  return (
    <div className="ink-grid-mid" aria-hidden>
      <InteractiveGrid
        className="ink-grid-mid-canvas"
        tone="light"
        trackRoot=".ink-grid-shell"
      />
    </div>
  );
}
