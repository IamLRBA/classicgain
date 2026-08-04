"use client";

import { useEffect, useState } from "react";
import { siteName } from "@/lib/config";
import { CtaLink } from "./CtaLink";
import { MagneticButton } from "./MagneticButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <CtaLink className="brand-mark" ariaLabel={`${siteName} home`}>
          <span className="brand-mark-text">{siteName}</span>
        </CtaLink>
        <nav className="site-nav" aria-label="Primary">
          <CtaLink>Recognition</CtaLink>
          <CtaLink>Platforms</CtaLink>
          <CtaLink>Why {siteName}</CtaLink>
          <CtaLink>Contact</CtaLink>
        </nav>
        <MagneticButton className="header-cta">Get in Touch</MagneticButton>
      </div>
    </header>
  );
}
