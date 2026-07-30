/**
 * Shared surface styling for the hover tooltips (status popover and heartbeat
 * bars). Positioning, padding and layout stay with each caller, since those
 * differ between the two.
 */
export const tooltipSurface =
  "absolute whitespace-normal rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--foreground)] shadow-lg";
