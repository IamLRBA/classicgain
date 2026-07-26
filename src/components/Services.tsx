import { MagneticButton } from "./MagneticButton";

const SERVICES = [
  {
    title: "Chat & get paid",
    copy: "Message people who want company. No camera required — just conversation.",
    meta: "Up to $20 / hr",
  },
  {
    title: "Watch short clips",
    copy: "Short videos. Short sessions. Earnings stack while you stay active.",
    meta: "Per video",
  },
  {
    title: "Answer trivia",
    copy: "Quick challenges that reward focus. Perfect between chats.",
    meta: "Daily boosts",
  },
  {
    title: "Stream music",
    copy: "Keep tracks spinning for creators and collect micropayouts as you go.",
    meta: "Live streams",
  },
];

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-inner">
        <p className="eyebrow">What you do</p>
        <div className="services-head">
          <h2 className="section-title">
            Four ways to earn <em>from one phone</em>
          </h2>
          <MagneticButton variant="ghost">Open account</MagneticButton>
        </div>

        <ol className="service-list">
          {SERVICES.map((item, i) => (
            <li key={item.title} className="service-row">
              <span className="service-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="service-body">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <span className="service-meta">{item.meta}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
