"use client";

import { InteractiveGrid } from "./GridBand";

/**
 * Same dark-green responsive grid as the hero, scoped to the demo-balance stage.
 * Transparent field so the board paper shows through; fades out via CSS mask.
 */
export function PlaygroundGrid() {
  return <InteractiveGrid className="playground-grid" tone="light" />;
}
