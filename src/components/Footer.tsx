import { siteName } from "@/lib/config";
import { CtaLink } from "./CtaLink";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-band">
        <h2>
          Your phone. <em>Your office.</em>
        </h2>
        <MagneticButton>Create free account</MagneticButton>
      </div>
      <div className="footer-bar">
        <CtaLink className="brand-mark">
          <span className="brand-dot" aria-hidden />
          {siteName}
        </CtaLink>
        <p>© {new Date().getFullYear()} {siteName}. All links go to signup.</p>
        <nav aria-label="Footer">
          <CtaLink>Privacy</CtaLink>
          <CtaLink>Terms</CtaLink>
          <CtaLink>Support</CtaLink>
        </nav>
      </div>
    </footer>
  );
}
