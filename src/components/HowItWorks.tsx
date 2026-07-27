import { MagneticButton } from "./MagneticButton";

const STEPS = [
  {
    title: "Create your account",
    copy: "Username, phone, email, country — under a minute.",
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
    <section className="section how" id="how">
      <div className="section-inner">
        <div className="section-intro section-intro--center">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">
            Three steps. <em>Zero fluff.</em>
          </h2>
          <p className="section-lead">
            Organized from signup to payout so you always know what comes next.
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
          <MagneticButton>Register now</MagneticButton>
        </div>
      </div>
    </section>
  );
}
