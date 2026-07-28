"use client";

import { hues, readCssHue } from "@/lib/colors";
import { useEffect, useRef } from "react";

/**
 * Same dark-green responsive grid as the hero, scoped to the demo-balance stage.
 * Transparent field so the board paper shows through; fades out via CSS mask.
 */
export function PlaygroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: 0, y: 0, active: false };
    const hueInk = readCssHue("--hue-teal", hues.teal);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function gridAlphaAt(px: number, py: number) {
      const base = 0.028;
      if (!pointer.active && reduced) return base;

      // Use width (not the short stage height) so line weight matches the hero.
      const span = Math.max(w, 480);

      let boost = 0;
      if (pointer.active) {
        const dist = Math.hypot(px - pointer.x, py - pointer.y);
        const radius = span * 0.42;
        boost = Math.max(0, 1 - dist / radius);
        boost = boost * boost;
      }

      const wellA = Math.hypot(px - w * 0.22, py - h * 0.28);
      const wellB = Math.hypot(px - w * 0.78, py - h * 0.62);
      const staticBoost =
        Math.max(0, 1 - wellA / (span * 0.55)) * 0.22 +
        Math.max(0, 1 - wellB / (span * 0.5)) * 0.16;

      return Math.min(0.55, base + boost * 0.42 + staticBoost * 0.12);
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

          ctx!.strokeStyle = `oklch(28% 0.05 ${hueInk} / ${a1})`;
          ctx!.lineWidth = 1 + a1 * 1.6;
          ctx!.beginPath();
          ctx!.moveTo(x, y);
          ctx!.lineTo(x, y + gap);
          ctx!.stroke();

          ctx!.strokeStyle = `oklch(28% 0.05 ${hueInk} / ${a2})`;
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

    resize();
    frame();

    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="playground-grid"
      aria-hidden
    />
  );
}
