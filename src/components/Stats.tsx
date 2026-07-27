const STATS = [
  { value: "UGX 2.4B+", label: "Total paid out" },
  { value: "50,000+", label: "Active earners" },
  { value: "4.9", label: "Member rating" },
  { value: "UGX 18,000", label: "Min. withdrawal" },
  { value: "24/7", label: "Live support" },
];

export function Stats() {
  return (
    <section className="section stats section-ink" aria-label="Platform stats">
      <div className="section-inner">
        <div className="section-intro section-intro--center">
          <p className="eyebrow">By the numbers</p>
          <h2 className="section-title">
            Proof in the <em>payouts</em>
          </h2>
          <p className="section-lead">
            Real activity across chats, clips, and cashouts. Built for phones,
            paid to mobile money.
          </p>
        </div>

        <ul className="stats-grid">
          {STATS.map((stat) => (
            <li key={stat.label} className="stat-item">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
