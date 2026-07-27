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

type Phase = "typing" | "holding" | "deleting";

export function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(PHRASES[0]);
      return;
    }

    const full = PHRASES[index];
    let timer = 0;

    if (phase === "typing") {
      if (text.length < full.length) {
        timer = window.setTimeout(() => {
          setText(full.slice(0, text.length + 1));
        }, 55);
      } else {
        timer = window.setTimeout(() => setPhase("holding"), 1600);
      }
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("deleting"), 40);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = window.setTimeout(() => {
          setText(text.slice(0, -1));
        }, 32);
      } else {
        setIndex((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }
    }

    return () => window.clearTimeout(timer);
  }, [index, phase, text]);

  return (
    <span className="rotating-phrase" aria-live="polite">
      <span className="rotating-phrase-text">{text}</span>
      <span className="rotating-phrase-caret" aria-hidden />
    </span>
  );
}
