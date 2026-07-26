import { CtaLink } from "./CtaLink";

const REGIONS = [
  "Uganda",
  "Kenya",
  "Tanzania",
  "Nigeria",
  "Ghana",
  "Zambia",
  "South Africa",
  "Rwanda",
  "USA",
  "Canada",
  "UAE",
  "India",
];

export function Regions() {
  return (
    <section className="section regions">
      <div className="section-inner">
        <p className="eyebrow">Coverage</p>
        <h2 className="section-title">
          Built for phones <em>everywhere</em>
        </h2>
        <p className="section-lead">
          East Africa to North America — same product, local mobile money where
          it matters.
        </p>

        <ul className="region-marquee" aria-label="Supported countries">
          {[...REGIONS, ...REGIONS].map((name, i) => (
            <li key={`${name}-${i}`}>
              <CtaLink>{name}</CtaLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
