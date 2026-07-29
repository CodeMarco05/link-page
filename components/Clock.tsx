"use client";

import { useEffect, useState } from "react";

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
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) {
    return <div className="h-[3.25rem]" />;
  }

  return (
    <div className="flex flex-col items-end gap-0.5 text-right">
      <span className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-[var(--foreground)]">
        {timeFormatter.format(now)}
      </span>
      <span className="text-sm text-[var(--muted-foreground)]">{dateFormatter.format(now)}</span>
    </div>
  );
}
