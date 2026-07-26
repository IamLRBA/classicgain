"use client";

import { siteName } from "@/lib/config";
import { CtaLink } from "./CtaLink";
import { MagneticButton } from "./MagneticButton";

export function Header() {
  return (
    <header className="site-header">
      <CtaLink className="brand-mark" ariaLabel={`${siteName} home`}>
        <span className="brand-dot" aria-hidden />
        {siteName}
      </CtaLink>
      <nav className="site-nav" aria-label="Primary">
        <CtaLink>Services</CtaLink>
        <CtaLink>How it works</CtaLink>
        <CtaLink>FAQ</CtaLink>
      </nav>
      <MagneticButton className="header-cta">Get started</MagneticButton>
    </header>
  );
}
