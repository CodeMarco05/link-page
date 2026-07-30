"use client";

import type { MonitorSnapshot } from "@/lib/monitor/store";
import { glowStyle, statusColors, statusLabels } from "@/lib/monitor/status-display";
import { useHoverIntent } from "@/lib/use-hover-intent";
import { tooltipSurface } from "@/lib/styles/tooltip";
import { Heartbeat } from "./Heartbeat";

const OPEN_DELAY_MS = 500;
const CLOSE_DELAY_MS = 300;

export function StatusDot({ monitor }: { monitor: MonitorSnapshot }) {
  const { status, detail } = monitor.latest;

  const { isOpen, hoverProps } = useHoverIntent({
    openDelayMs: OPEN_DELAY_MS,
    closeDelayMs: CLOSE_DELAY_MS,
  });

  return (
    <span className="relative inline-flex -m-2 items-center justify-center p-2" {...hoverProps}>
      <span
        className={`status-glow inline-block h-2.5 w-2.5 shrink-0 rounded-full ${statusColors[status]}`}
        style={glowStyle(status)}
      />
      {isOpen && (
        <span
          role="tooltip"
          className={`${tooltipSurface} bottom-full right-0 z-20 mb-2 flex w-max flex-col gap-2 px-2.5 py-2`}
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
