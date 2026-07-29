import type { CSSProperties } from "react";
import type { MonitorStatus } from "@/lib/monitor/check";

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

export function StatusDot({ status, detail }: { status: MonitorStatus; detail?: string }) {
  const glowStyle = { "--glow-color": statusGlowColors[status] } as CSSProperties;

  const dot = (
    <span
      className={`status-glow inline-block h-2.5 w-2.5 shrink-0 rounded-full ${statusColors[status]}`}
      style={glowStyle}
    />
  );

  if (status === "up" || !detail) {
    return dot;
  }

  return (
    <span className="group/status relative inline-flex">
      {dot}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full right-0 z-10 mb-2 w-max max-w-[16rem] whitespace-normal rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--foreground)] opacity-0 shadow-lg transition-opacity duration-100 group-hover/status:opacity-100"
      >
        <span className="block font-medium">{statusLabels[status]}</span>
        <span className="block text-[var(--muted-foreground)]">{detail}</span>
      </span>
    </span>
  );
}
