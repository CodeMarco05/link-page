"use client";

import { useRef, useState, type CSSProperties } from "react";
import type { MonitorSnapshot } from "@/lib/monitor/store";
import type { MonitorStatus } from "@/lib/monitor/check";
import { Heartbeat } from "./Heartbeat";

const statusColors: Record<MonitorStatus, string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
};

const statusGlowColors: Record<MonitorStatus, string> = {
  up: "#10b981",
  degraded: "#f59e0b",
  down: "#ef4444",
};

const statusLabels: Record<MonitorStatus, string> = {
  up: "Up",
  degraded: "Degraded",
  down: "Down",
};

const OPEN_DELAY_MS = 500;
const CLOSE_DELAY_MS = 300;

export function StatusDot({ monitor }: { monitor: MonitorSnapshot }) {
  const { status, detail } = monitor.latest;
  const glowStyle = { "--glow-color": statusGlowColors[status] } as CSSProperties;

  const [showPopover, setShowPopover] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function handleMouseEnter() {
    clearTimeout(closeTimer.current);
    if (showPopover) {
      return;
    }
    openTimer.current = setTimeout(() => setShowPopover(true), OPEN_DELAY_MS);
  }

  function handleMouseLeave() {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setShowPopover(false), CLOSE_DELAY_MS);
  }

  return (
    <span
      className="relative inline-flex -m-2 items-center justify-center p-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`status-glow inline-block h-2.5 w-2.5 shrink-0 rounded-full ${statusColors[status]}`}
        style={glowStyle}
      />
      {showPopover && (
        <span
          role="tooltip"
          className="absolute bottom-full right-0 z-20 mb-2 flex w-max flex-col gap-2 whitespace-normal rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-xs text-[var(--foreground)] shadow-lg"
        >
          <Heartbeat history={monitor.history} />
          <span>
            <span className="block font-medium">
              {statusLabels[status]}{" "}
              <span className="font-normal text-[var(--muted-foreground)]">
                latest {monitor.history.length} [n={monitor.sampleCount}]
              </span>
            </span>
            {detail && <span className="block text-[var(--muted-foreground)]">{detail}</span>}
          </span>
        </span>
      )}
    </span>
  );
}
