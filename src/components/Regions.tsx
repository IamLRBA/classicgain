import { CtaLink } from "./CtaLink";

const REGIONS = [
  { name: "Uganda", code: "ug" },
  { name: "Kenya", code: "ke" },
  { name: "Tanzania", code: "tz" },
  { name: "Nigeria", code: "ng" },
  { name: "Ghana", code: "gh" },
  { name: "Zambia", code: "zm" },
  { name: "South Africa", code: "za" },
  { name: "Rwanda", code: "rw" },
  { name: "USA", code: "us" },
  { name: "Canada", code: "ca" },
  { name: "UAE", code: "ae" },
  { name: "India", code: "in" },
];

export function Regions() {
  return (
    <section className="section regions section-ink" id="countries">
      <div className="section-inner">
        <div className="section-intro section-intro--center">
          <p className="eyebrow">Coverage</p>
          <h2 className="section-title">
            Built for phones <em>everywhere</em>
          </h2>
          <p className="section-lead">
            East Africa to North America. Same product, local mobile money where
            it matters.
          </p>
        </div>

        <div className="region-track">
          <ul className="region-marquee" aria-label="Supported countries">
            {[...REGIONS, ...REGIONS].map((region, i) => (
              <li key={`${region.code}-${i}`}>
                <CtaLink className="region-flag-link" ariaLabel={region.name}>
                  <img
                    className="region-flag"
                    src={`/images/flags/${region.code}.svg`}
                    alt={region.name}
                    width={48}
                    height={36}
                  />
                  <span className="region-flag-name">{region.name}</span>
                </CtaLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
