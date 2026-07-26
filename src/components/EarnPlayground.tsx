"use client";

import { CircleHelp, MessageCircle, Music2, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "./MagneticButton";

const ACTIONS = [
  {
    id: "chat",
    label: "Send a chat",
    earn: 2.4,
    verb: "chatted",
    Icon: MessageCircle,
  },
  {
    id: "watch",
    label: "Watch a clip",
    earn: 1.8,
    verb: "watched",
    Icon: Play,
  },
  {
    id: "trivia",
    label: "Answer trivia",
    earn: 3.1,
    verb: "answered",
    Icon: CircleHelp,
  },
  {
    id: "stream",
    label: "Stream a track",
    earn: 2.0,
    verb: "streamed",
    Icon: Music2,
  },
] as const;

/**
 * Mini creative playground: tap actions to mint earnings.
 * Purely for entertainment on the landing page — CTAs still exit to one URL.
 */
export function EarnPlayground() {
  const [balance, setBalance] = useState(0);
  const [burst, setBurst] = useState<number | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [pulse, setPulse] = useState(false);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (burst === null) return;
    const t = window.setTimeout(() => setBurst(null), 600);
    return () => window.clearTimeout(t);
  }, [burst]);

  function mint(action: (typeof ACTIONS)[number]) {
    setBalance((b) => Math.round((b + action.earn) * 10) / 10);
    setBurst(action.earn);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 280);
    setLog((prev) =>
      [`You ${action.verb} · +$${action.earn.toFixed(1)}`, ...prev].slice(0, 4),
    );
  }

  return (
    <section className="section playground" id="try">
      <div className="section-inner">
        <p className="eyebrow">Try it</p>
        <h2 className="section-title">
          Tap. Earn. <em>Smile.</em>
        </h2>
        <p className="section-lead">
          A tiny demo of the loop — press an action, watch your balance grow, then
          jump in for real.
        </p>

        <div className="playground-board">
          <div className={`balance-orb ${pulse ? "is-pulse" : ""}`}>
            <span className="balance-label">Demo balance</span>
            <span ref={displayRef} className="balance-value">
              ${balance.toFixed(1)}
            </span>
            {burst !== null && (
              <span className="balance-burst" key={burst + balance}>
                +${burst.toFixed(1)}
              </span>
            )}
          </div>

          <div className="action-rail" role="group" aria-label="Demo earning actions">
            {ACTIONS.map((action) => {
              const Icon = action.Icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  className="action-chip"
                  onClick={() => mint(action)}
                >
                  <span className="action-chip-top">
                    <Icon className="ui-icon" aria-hidden strokeWidth={1.75} />
                    <span>{action.label}</span>
                  </span>
                  <span className="action-earn">+${action.earn.toFixed(1)}</span>
                </button>
              );
            })}
          </div>

          <ul className="earn-log" aria-live="polite">
            {log.length === 0 ? (
              <li className="earn-log-empty">Your first tap appears here.</li>
            ) : (
              log.map((line, i) => <li key={`${line}-${i}`}>{line}</li>)
            )}
          </ul>

          <div className="playground-cta">
            <MagneticButton>Start earning for real</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
