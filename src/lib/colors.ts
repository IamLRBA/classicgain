/**
 * JS mirror of src/styles/colors.css brand hues.
 * Keep in sync with --hue-terracotta and --hue-teal.
 */
export const hues = {
  terracotta: 42,
  teal: 195,
} as const;

export function readCssHue(
  name: "--hue-terracotta" | "--hue-teal",
  fallback: number,
): number {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}
