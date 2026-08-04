"use client";

import { CtaLink } from "./CtaLink";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "nav";
};

/**
 * Affinex Capital–style outline CTA (no magnetic / creative motion).
 * rounded-lg, uppercase tracking, border, hover:bg-accent.
 */
export function MagneticButton({
  children,
  className = "",
  variant = "primary",
}: MagneticButtonProps) {
  const base =
    variant === "nav"
      ? "btn-nav"
      : variant === "ghost"
        ? "btn-ghost"
        : "btn-primary";

  return <CtaLink className={`${base} ${className}`.trim()}>{children}</CtaLink>;
}
