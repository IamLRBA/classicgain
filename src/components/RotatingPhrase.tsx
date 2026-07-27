"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Watch Videos Online",
  "Listen to Songs",
  "Chat and Get Paid",
  "Play Trivia Games",
  "Complete Surveys",
  "Stream Short Clips",
];

export function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 280);
    }, 2800);

    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="rotating-phrase" aria-live="polite">
      <span className={`rotating-phrase-text ${visible ? "is-in" : "is-out"}`}>
        {PHRASES[index]}
      </span>
      <span className="rotating-phrase-caret" aria-hidden />
    </span>
  );
}
