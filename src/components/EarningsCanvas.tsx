"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: "coin" | "bubble" | "spark";
  rot: number;
  spin: number;
  life: number;
  hue: number;
  label?: string;
};

const BUBBLE_LABELS = ["hey", "$5", "online", "earned!", "tap", "hi"];

/**
 * Interactive full-bleed scene: coins orbit the cursor,
 * chat bubbles drift, sparks trail — the visual engine of the hero.
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

    function makeParticle(x: number, y: number): Particle {
      const roll = Math.random();
      const kind: Particle["kind"] =
        roll < 0.55 ? "coin" : roll < 0.85 ? "bubble" : "spark";
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.15,
        r: kind === "bubble" ? 18 + Math.random() * 22 : 6 + Math.random() * 10,
        kind,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.04,
        life: 1,
        hue: kind === "coin" ? 75 + Math.random() * 30 : 195 + Math.random() * 40,
        label:
          kind === "bubble"
            ? BUBBLE_LABELS[Math.floor(Math.random() * BUBBLE_LABELS.length)]
            : undefined,
      };
    }

    function drawCoin(p: Particle) {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      const g = ctx!.createRadialGradient(0, 0, 0, 0, 0, p.r);
      g.addColorStop(0, `oklch(88% 0.18 ${p.hue})`);
      g.addColorStop(1, `oklch(68% 0.16 ${p.hue})`);
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.ellipse(0, 0, p.r, p.r * 0.72, 0, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.strokeStyle = `oklch(55% 0.12 ${p.hue})`;
      ctx!.lineWidth = 1.2;
      ctx!.stroke();
      ctx!.fillStyle = `oklch(40% 0.08 ${p.hue})`;
      ctx!.font = `600 ${Math.max(8, p.r * 0.9)}px system-ui`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText("$", 0, 0.5);
      ctx!.restore();
    }

    function drawBubble(p: Particle) {
      ctx!.save();
      ctx!.globalAlpha = 0.88;
      ctx!.fillStyle = "oklch(98% 0.02 200 / 0.85)";
      ctx!.strokeStyle = "oklch(55% 0.08 200 / 0.35)";
      ctx!.lineWidth = 1;
      const bw = p.r * 2.2;
      const bh = p.r * 1.15;
      roundRect(ctx!, p.x - bw / 2, p.y - bh / 2, bw, bh, 14);
      ctx!.fill();
      ctx!.stroke();
      ctx!.fillStyle = "oklch(28% 0.04 230)";
      ctx!.font = `500 ${Math.max(10, p.r * 0.55)}px system-ui`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(p.label ?? "hi", p.x, p.y);
      ctx!.restore();
    }

    function drawSpark(p: Particle) {
      ctx!.save();
      ctx!.fillStyle = `oklch(78% 0.2 ${p.hue} / ${0.4 + p.life * 0.4})`;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      // soft atmospheric wash
      const wash = ctx!.createLinearGradient(0, 0, w, h);
      wash.addColorStop(0, "oklch(96% 0.03 195 / 0.55)");
      wash.addColorStop(0.5, "oklch(97% 0.04 95 / 0.35)");
      wash.addColorStop(1, "oklch(94% 0.05 150 / 0.5)");
      ctx!.fillStyle = wash;
      ctx!.fillRect(0, 0, w, h);

      // faint grid for "organized ledger" feel
      ctx!.strokeStyle = "oklch(40% 0.03 220 / 0.06)";
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

        if (p.kind === "coin") drawCoin(p);
        else if (p.kind === "bubble") drawBubble(p);
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
        p.kind = i % 2 === 0 ? "coin" : "spark";
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

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
