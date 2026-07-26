import { MousePointer2 } from "lucide-react";
import { siteName } from "@/lib/config";
import { EarningsCanvas } from "./EarningsCanvas";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section className="hero">
      <EarningsCanvas />
      <div className="hero-veil" aria-hidden />
      <div className="hero-content">
        <p className="brand-hero">{siteName}</p>
        <h1>Make your phone pay you back.</h1>
        <p className="hero-sub">
          Chat, watch, and play — then cash out to mobile money. Simple loop.
          Real payouts.
        </p>
        <div className="hero-actions">
          <MagneticButton>Tap to start</MagneticButton>
          <MagneticButton variant="ghost">See how it works</MagneticButton>
        </div>
        <p className="hero-hint">
          <MousePointer2 className="ui-icon" aria-hidden strokeWidth={1.75} />
          Move or click the scene — the lights follow you.
        </p>
      </div>
    </section>
  );
}
