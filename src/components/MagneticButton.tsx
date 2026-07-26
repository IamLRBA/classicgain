"use client";

import { useRef } from "react";
import { CtaLink } from "./CtaLink";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
};

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  const base =
    variant === "primary"
      ? "btn-primary"
      : "btn-ghost";

  return (
    <span
      ref={ref}
      className="inline-block will-change-transform transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <CtaLink className={`${base} ${className}`}>{children}</CtaLink>
    </span>
  );
}
