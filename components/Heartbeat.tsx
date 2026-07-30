"use client";

import { useState, type CSSProperties } from "react";
import type { MonitorSample } from "@/lib/monitor/store";

const statusColors: Record<MonitorSample["status"], string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
};

const statusGlowColors: Record<MonitorSample["status"], string> = {
  up: "#10b981",
  degraded: "#f59e0b",
  down: "#ef4444",
};

const statusLabels: Record<MonitorSample["status"], string> = {
  up: "Up",
  degraded: "Degraded",
  down: "Down",
};

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function HeartbeatBar({ sample, isLatest }: { sample: MonitorSample; isLatest: boolean }) {
  const [hovered, setHovered] = useState(false);
  const glowStyle = isLatest
    ? ({ "--glow-color": statusGlowColors[sample.status] } as CSSProperties)
    : undefined;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-sm ${statusColors[sample.status]} ${isLatest ? "heartbeat-glow" : ""}`}
        style={glowStyle}
      />
      {hovered && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 w-max max-w-[14rem] -translate-x-1/2 whitespace-normal rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-xs text-[var(--foreground)] shadow-lg"
        >
          <span className="block font-medium">
            {statusLabels[sample.status]} &middot; {sample.latencyMs}ms
          </span>
          <span className="block text-[var(--muted-foreground)]">{timeFormatter.format(sample.checkedAt)}</span>
          {sample.detail && <span className="block text-[var(--muted-foreground)]">{sample.detail}</span>}
        </span>
      )}
    </span>
  );
}

export function Heartbeat({ history }: { history: MonitorSample[] }) {
  if (history.length === 0) {
    return null;
  }

  const newestFirst = [...history].reverse();

  return (
    <span className="flex w-40 flex-wrap gap-1">
      {newestFirst.map((sample, index) => (
        <HeartbeatBar key={sample.checkedAt} sample={sample} isLatest={index === 0} />
      ))}
    </span>
  );
}
