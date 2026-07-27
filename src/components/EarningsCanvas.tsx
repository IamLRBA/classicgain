"use client";

import { hues, readCssHue } from "@/lib/colors";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: "orb" | "ring" | "spark";
  rot: number;
  spin: number;
  life: number;
  /** Greyscale lightness for the particle fill/stroke */
  tone: number;
};

/**
 * Interactive full-bleed scene: grey orbs on a white field,
 * with a dark-green grid that deepens near the cursor.
 */
export function EarningsCanvas() {
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
    const particles: Particle[] = [];
    const hueInk = readCssHue("--hue-teal", hues.teal);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles.length = 0;
      const count = reduced ? 18 : Math.min(48, Math.floor((w * h) / 18000));
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle(Math.random() * w, Math.random() * h));
      }
    }

    function makeParticle(x: number, y: number): Particle {
      const roll = Math.random();
      const kind: Particle["kind"] =
        roll < 0.45 ? "orb" : roll < 0.75 ? "ring" : "spark";
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.15,
        r: kind === "ring" ? 10 + Math.random() * 16 : 4 + Math.random() * 10,
        kind,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.03,
        life: 1,
        tone: 62 + Math.random() * 22,
      };
    }

    function drawOrb(p: Particle) {
      ctx!.save();
      const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, `oklch(${p.tone}% 0.004 250 / 0.45)`);
      g.addColorStop(1, `oklch(${p.tone - 8}% 0.004 250 / 0)`);
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function drawRing(p: Particle) {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      ctx!.strokeStyle = `oklch(${p.tone - 12}% 0.006 250 / 0.4)`;
      ctx!.lineWidth = 1.25;
      ctx!.beginPath();
      ctx!.ellipse(0, 0, p.r, p.r * 0.62, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();
    }

    function drawSpark(p: Particle) {
      ctx!.save();
      ctx!.fillStyle = `oklch(${p.tone}% 0.005 250 / ${0.3 + p.life * 0.35})`;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function gridAlphaAt(px: number, py: number) {
      const base = 0.028;
      if (!pointer.active && reduced) return base;

      let boost = 0;
      if (pointer.active) {
        const dist = Math.hypot(px - pointer.x, py - pointer.y);
        const radius = Math.min(w, h) * 0.42;
        boost = Math.max(0, 1 - dist / radius);
        boost = boost * boost;
      }

      // Soft static wells so the grid is not uniform weight
      const wellA = Math.hypot(px - w * 0.22, py - h * 0.28);
      const wellB = Math.hypot(px - w * 0.78, py - h * 0.62);
      const staticBoost =
        Math.max(0, 1 - wellA / (Math.min(w, h) * 0.55)) * 0.22 +
        Math.max(0, 1 - wellB / (Math.min(w, h) * 0.5)) * 0.16;

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

      // Clean white field behind the grid
      ctx!.fillStyle = "#ffffff";
      ctx!.fillRect(0, 0, w, h);

      drawGrid();

      for (const p of particles) {
        if (!reduced && pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = Math.min(120 / dist, 0.35);
          p.vx += (dx / dist) * pull * 0.08;
          p.vy += (dy / dist) * pull * 0.08;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.spin;

        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;

        if (p.kind === "orb") drawOrb(p);
        else if (p.kind === "ring") drawRing(p);
        else drawSpark(p);
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }

    function onLeave() {
      pointer.active = false;
    }

    function onClick(e: PointerEvent) {
      if (reduced) return;
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 8; i++) {
        const p = makeParticle(x, y);
        p.vx = (Math.random() - 0.5) * 4;
        p.vy = (Math.random() - 0.5) * 4;
        p.kind = i % 2 === 0 ? "orb" : "spark";
        particles.push(p);
        if (particles.length > 80) particles.shift();
      }
    }

    function onResize() {
      resize();
      seed();
      if (reduced) frame();
    }

    resize();
    seed();
    frame();

    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-crosshair"
      aria-hidden
    />
  );
}
