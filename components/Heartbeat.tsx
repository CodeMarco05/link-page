"use client";

import { useState } from "react";
import type { MonitorSample } from "@/lib/monitor/store";
import { glowStyle, statusColors, statusLabels, timeFormatter } from "@/lib/monitor/status-display";
import { tooltipSurface } from "@/lib/styles/tooltip";

function HeartbeatBar({ sample, isLatest }: { sample: MonitorSample; isLatest: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-sm ${statusColors[sample.status]} ${isLatest ? "heartbeat-glow" : ""}`}
        style={isLatest ? glowStyle(sample.status) : undefined}
      />
      {hovered && (
        <span
          role="tooltip"
          className={`${tooltipSurface} pointer-events-none bottom-full left-1/2 z-30 mb-1.5 w-max max-w-[14rem] -translate-x-1/2 px-2 py-1.5`}
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
        <HeartbeatBar
          key={`${sample.checkedAt}-${index}`}
          sample={sample}
          isLatest={index === 0}
        />
      ))}
    </span>
  );
}
