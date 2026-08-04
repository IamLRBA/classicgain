import { siteName } from "@/lib/config";
import { InteractiveGrid } from "./GridBand";
import { MagneticButton } from "./MagneticButton";

const STEPS = [
  {
    title: "Create your account",
    copy: "Username, phone, email, country. Under a minute.",
  },
  {
    title: "Link & go live",
    copy: "Connect your number so payouts land where you already get money.",
  },
  {
    title: "Earn, then withdraw",
    copy: "Stay active on chats and tasks. Cash out to mobile money any day.",
  },
];

export function HowItWorks() {
  return (
    <section className="section how section-ink how-grid-shell" id="why">
      <div className="section-inner">
        <div className="section-intro section-intro--center">
          <p className="eyebrow">Why {siteName}</p>
          <h2 className="section-title">
            The earner-first <em>growth model</em>
          </h2>
          <p className="section-lead">
            Independent earners deserve clear infrastructure. Three steps from
            signup to payout so you always know what comes next.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((step, i) => (
            <article key={step.title} className="step">
              <span className="step-num" aria-hidden>
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>

        <div className="how-cta">
          <MagneticButton>Get in Touch</MagneticButton>
        </div>
      </div>

      <div className="how-grid-foot" aria-hidden>
        <InteractiveGrid
          className="how-grid-foot-canvas"
          tone="light"
          trackRoot=".how-grid-shell"
        />
      </div>
    </section>
  );
}
