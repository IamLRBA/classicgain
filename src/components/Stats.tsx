const STATS = [
  {
    value: "50K+",
    label: "Active Earners",
    detail: "Across chats, clips, and tasks",
  },
  {
    value: "120+",
    label: "Countries Reached",
    detail: "Same product, local payouts",
  },
  {
    value: "UGX 2.4B+",
    label: "Paid Out",
    detail: "Withdrawals to mobile money",
  },
];

export function Stats() {
  return (
    <section className="section stats" id="stats" aria-label="Recognition">
      <div className="section-inner stats-inner">
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
