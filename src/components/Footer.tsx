import { siteName } from "@/lib/config";
import { CtaLink } from "./CtaLink";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-band">
        <p className="eyebrow">Contact</p>
        <h2>Ready to go further?</h2>
        <p className="footer-band-lead">
          Discover how {siteName} can elevate your earning with the platform,
          support, and scale you need.
        </p>
        <MagneticButton>Get in Touch</MagneticButton>
      </div>

      <div className="footer-bar">
        <CtaLink className="brand-mark">
          <span className="brand-mark-text">{siteName}</span>
        </CtaLink>
        <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        <nav aria-label="Footer">
          <CtaLink>Privacy</CtaLink>
          <CtaLink>Terms</CtaLink>
          <CtaLink>Support</CtaLink>
        </nav>
      </div>
    </footer>
  );
}
