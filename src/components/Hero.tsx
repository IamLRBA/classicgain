import { siteName } from "@/lib/config";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="hero-content">
        <p className="brand-hero">{siteName}</p>
        <h1 className="hero-title">
          Built for earners.
          <br />
          <span className="text-subtle">Engineered for scale.</span>
        </h1>
        <div className="divider-line" aria-hidden />
        <p className="hero-sub">
          A phone-first earning platform designed to help you chat, watch, and
          play, then cash out to mobile money with infrastructure built to grow
          without limits.
        </p>
        <MagneticButton>Get in Touch</MagneticButton>
      </div>
    </section>
  );
}
