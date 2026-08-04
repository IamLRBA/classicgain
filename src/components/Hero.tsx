import { siteName } from "@/lib/config";
import { EarningsCanvas } from "./EarningsCanvas";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section className="hero">
      <EarningsCanvas />
      <div className="hero-veil" aria-hidden />
      <div className="hero-content">
        <p className="hero-badge">National earning platform</p>
        <h1 className="hero-title">
          Built for earners.
          <br />
          <span className="hero-title-accent">Engineered for scale.</span>
        </h1>
        <p className="hero-sub">
          {siteName} helps you chat, watch, and play on your phone, then cash
          out to mobile money. Infrastructure for everyday income.
        </p>
        <div className="hero-actions">
          <MagneticButton>Get in Touch</MagneticButton>
          <MagneticButton variant="ghost">See platforms</MagneticButton>
        </div>
      </div>
    </section>
  );
}
