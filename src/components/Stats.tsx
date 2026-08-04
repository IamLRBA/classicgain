const STATS = [
  { value: "50K+", label: "Active earners", detail: "Across chats, clips, and tasks" },
  { value: "120+", label: "Countries", detail: "Same product, local payouts" },
  { value: "UGX 2.4B+", label: "Paid out", detail: "Withdrawals to mobile money" },
  { value: "4.9", label: "Member rating", detail: "From everyday earners" },
];

export function Stats() {
  return (
    <section className="section stats section-ink" id="stats" aria-label="Recognition">
      <div className="section-inner">
        <div className="section-intro section-intro--center">
          <p className="eyebrow">Recognition</p>
          <h2 className="section-title">Proof in the numbers</h2>
          <p className="section-lead">
            Built for phones, paid to mobile money. Activity that scales with
            how active you stay.
          </p>
        </div>

        <ul className="stats-grid">
          {STATS.map((stat) => (
            <li key={stat.label} className="stat-item">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-detail">{stat.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
