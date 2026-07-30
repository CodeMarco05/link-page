import type { CSSProperties } from "react";
import type { MonitorStatus } from "./check";

export const statusColors: Record<MonitorStatus, string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
};

export const statusGlowColors: Record<MonitorStatus, string> = {
  up: "#10b981",
  degraded: "#f59e0b",
  down: "#ef4444",
};

export const statusLabels: Record<MonitorStatus, string> = {
  up: "Up",
  degraded: "Degraded",
  down: "Down",
};

/** Feeds the --glow-color custom property used by the glow keyframes in globals.css. */
export function glowStyle(status: MonitorStatus): CSSProperties {
  return { "--glow-color": statusGlowColors[status] } as CSSProperties;
}

export const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
