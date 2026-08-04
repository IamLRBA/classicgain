"use client";

import { useEffect, useState } from "react";
import { siteName } from "@/lib/config";
import { CtaLink } from "./CtaLink";
import { MagneticButton } from "./MagneticButton";

const NAV = [
  { label: "Recognition", href: "#stats" },
  { label: "Platforms", href: "#platforms" },
  { label: `Why ${siteName}`, href: "#why" },
  { label: "Contact", href: "#contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <CtaLink className="brand-mark" ariaLabel={`${siteName} home`}>
          <span className="brand-mark-text">{siteName}</span>
        </CtaLink>

        <div className="site-nav" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-nav-link"
              onClick={(e) => onNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <MagneticButton variant="nav" className="header-cta">
          Get in Touch
        </MagneticButton>
      </div>
    </nav>
  );
}
