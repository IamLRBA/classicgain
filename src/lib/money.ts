/**
 * Format amounts in Ugandan shillings for display.
 */
export function formatUgx(amount: number): string {
  return `UGX ${Math.round(amount).toLocaleString("en-UG")}`;
}
