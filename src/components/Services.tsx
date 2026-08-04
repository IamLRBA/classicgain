import {
  CircleHelp,
  MessageCircle,
  Music2,
  Play,
  type LucideIcon,
} from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const SERVICES: {
  title: string;
  copy: string;
  meta: string;
  cta?: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Chat & get paid",
    copy: "Message people who want company. No camera required, just conversation.",
    meta: "Up to UGX 50,000/hr",
    cta: "Register to Chat",
    Icon: MessageCircle,
  },
  {
    title: "Watch short clips",
    copy: "Short videos. Short sessions. Earnings stack while you stay active.",
    meta: "Up to UGX 12,000/day",
    cta: "Sign Up to Watch",
    Icon: Play,
  },
  {
    title: "Answer trivia",
    copy: "Quick challenges that reward focus. Perfect between chats.",
    meta: "Win up to UGX 100,000",
    Icon: CircleHelp,
  },
  {
    title: "Stream music",
    copy: "Keep tracks spinning for creators and collect micropayouts as you go.",
    meta: "Up to UGX 8,000/day",
    Icon: Music2,
  },
];

export function Services() {
  return (
    <section className="section services" id="platforms">
      <div className="section-inner">
        <div className="section-intro">
          <p className="eyebrow">Our Platforms</p>
          <div className="services-head">
            <h2 className="section-title">
              Comprehensive solutions for <em>modern earners</em>
            </h2>
            <MagneticButton variant="ghost">Get in Touch</MagneticButton>
          </div>
        </div>

        <ol className="service-list">
          {SERVICES.map((item) => {
            const Icon = item.Icon;
            return (
              <li key={item.title} className="service-row">
                <span className="service-index" aria-hidden>
                  <Icon className="ui-icon" strokeWidth={1.75} />
                </span>
                <div className="service-body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <div className="service-aside">
                  <span className="service-meta">{item.meta}</span>
                  {item.cta ? (
                    <MagneticButton variant="nav" className="service-cta">
                      {item.cta}
                    </MagneticButton>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
