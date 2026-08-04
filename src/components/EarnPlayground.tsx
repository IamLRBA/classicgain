"use client";

import { formatUgx } from "@/lib/money";
import {
  Clapperboard,
  CircleHelp,
  Dices,
  Gamepad2,
  ListChecks,
  MessageCircle,
  Music2,
  Play,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "./MagneticButton";

const ACTIONS = [
  {
    id: "chat",
    label: "Chat with someone",
    earn: 8500,
    verb: "chatted",
    Icon: MessageCircle,
  },
  {
    id: "tiktok",
    label: "Watch TikTok clips",
    earn: 3200,
    verb: "watched clips",
    Icon: Play,
  },
  {
    id: "movie",
    label: "Watch a movie",
    earn: 15000,
    verb: "watched a movie",
    Icon: Clapperboard,
  },
  {
    id: "stream",
    label: "Listen to music",
    earn: 2500,
    verb: "streamed music",
    Icon: Music2,
  },
  {
    id: "survey",
    label: "Complete a survey",
    earn: 18000,
    verb: "finished a survey",
    Icon: ListChecks,
  },
  {
    id: "trivia",
    label: "Play trivia",
    earn: 12000,
    verb: "won trivia",
    Icon: CircleHelp,
  },
  {
    id: "spin",
    label: "Spin and win",
    earn: 20000,
    verb: "spun the wheel",
    Icon: Dices,
  },
  {
    id: "games",
    label: "Play a game",
    earn: 5000,
    verb: "played a game",
    Icon: Gamepad2,
  },
  {
    id: "refer",
    label: "Refer a friend",
    earn: 10000,
    verb: "referred a friend",
    Icon: Users,
  },
] as const;

/**
 * Mini creative playground: tap actions to mint earnings.
 * Purely for entertainment on the landing page. CTAs still exit to one URL.
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
    setBalance((b) => b + action.earn);
    setBurst(action.earn);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 280);
    setLog((prev) =>
      [`You ${action.verb} · +${formatUgx(action.earn)}`, ...prev].slice(0, 5),
    );
  }

  return (
    <section className="section playground" id="try">
      <div className="section-inner">
        <div className="section-intro section-intro--center">
          <p className="eyebrow">Try it</p>
          <h2 className="section-title">
            Tap. Earn. <em>Smile.</em>
          </h2>
          <p className="section-lead">
            Nine ways to demo the loop. Press an action, watch your UGX balance
            grow, then jump in for real.
          </p>
        </div>

        <div className="playground-board">
          <div className={`balance-orb ${pulse ? "is-pulse" : ""}`}>
            <span className="balance-label">Demo balance</span>
            <span ref={displayRef} className="balance-value">
              {formatUgx(balance)}
            </span>
            {burst !== null && (
              <span className="balance-burst" key={burst + balance}>
                +{formatUgx(burst)}
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
                  <span className="action-earn">+{formatUgx(action.earn)}</span>
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
