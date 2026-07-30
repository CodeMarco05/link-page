"use client";

import { intervalSubscribe, useClientValue } from "@/lib/use-client-value";

// Seconds, not a Date: the snapshot must be a stable primitive between ticks or
// useSyncExternalStore re-renders in a loop.
function currentSecond(): number {
  return Math.floor(Date.now() / 1000);
}

const subscribeToSeconds = intervalSubscribe(1000);

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function Clock() {
  // null on the server and during hydration, so no mismatched time is rendered.
  const second = useClientValue(currentSecond, null, subscribeToSeconds);

  if (second === null) {
    return <div className="h-[3.25rem]" />;
  }

  const now = new Date(second * 1000);

  return (
    <div className="flex flex-col items-end gap-0.5 text-right">
      <span className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-[var(--foreground)]">
        {timeFormatter.format(now)}
      </span>
      <span className="text-sm text-[var(--muted-foreground)]">{dateFormatter.format(now)}</span>
    </div>
  );
}
