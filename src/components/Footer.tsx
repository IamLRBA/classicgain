import { siteName } from "@/lib/config";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-band">
        <div className="footer-band-inner">
          <h2>Ready to Go Further?</h2>
          <p className="footer-band-lead">
            Discover how {siteName} can elevate your earning with the platform,
            support, and scale you need.
          </p>
          <MagneticButton>Get in Touch</MagneticButton>
        </div>
      </div>

      <div className="footer-bar">
        <span>
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </span>
        <a className="footer-mail" href="mailto:info@classicgain.com">
          info@classicgain.com
        </a>
      </div>
    </footer>
  );
}
