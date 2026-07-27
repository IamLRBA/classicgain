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
  hue: number;
};

/**
 * Interactive full-bleed scene: soft orbs and sparks drift and
 * gather toward the cursor. The visual engine of the hero.
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

    const hueTeal = readCssHue("--hue-teal", hues.teal);
    const hueTerracotta = readCssHue("--hue-terracotta", hues.terracotta);

    function makeParticle(x: number, y: number): Particle {
      const roll = Math.random();
      const kind: Particle["kind"] =
        roll < 0.45 ? "orb" : roll < 0.75 ? "ring" : "spark";
      const useTerracotta = Math.random() > 0.62;
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
        hue: useTerracotta ? hueTerracotta : hueTeal,
      };
    }

    function drawOrb(p: Particle) {
      ctx!.save();
      const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, `oklch(86% 0.1 ${p.hue} / 0.55)`);
      g.addColorStop(1, `oklch(78% 0.08 ${p.hue} / 0)`);
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
      ctx!.strokeStyle = `oklch(62% 0.1 ${p.hue} / 0.35)`;
      ctx!.lineWidth = 1.25;
      ctx!.beginPath();
      ctx!.ellipse(0, 0, p.r, p.r * 0.62, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();
    }

    function drawSpark(p: Particle) {
      ctx!.save();
      ctx!.fillStyle = `oklch(78% 0.14 ${p.hue} / ${0.35 + p.life * 0.4})`;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      const wash = ctx!.createLinearGradient(0, 0, w, h);
      wash.addColorStop(0, `oklch(96% 0.03 ${hueTeal} / 0.55)`);
      wash.addColorStop(0.5, `oklch(97% 0.04 ${hueTerracotta} / 0.35)`);
      wash.addColorStop(1, `oklch(94% 0.04 ${hueTeal} / 0.5)`);
      ctx!.fillStyle = wash;
      ctx!.fillRect(0, 0, w, h);

      ctx!.strokeStyle = `oklch(40% 0.03 ${hueTeal} / 0.06)`;
      ctx!.lineWidth = 1;
      const gap = 48;
      for (let x = 0; x < w; x += gap) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }
      for (let y = 0; y < h; y += gap) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }

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
