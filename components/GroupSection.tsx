import type { CSSProperties } from "react";
import type { Group, CardStyleName, LinkTarget } from "@/lib/config/schema";
import type { MonitorResult } from "@/lib/monitor/check";
import { LinkCard } from "./LinkCard";

export function GroupSection({
  group,
  style,
  columns,
  linkTarget,
  monitorResults,
}: {
  group: Group;
  style: CardStyleName;
  columns: number;
  linkTarget: LinkTarget;
  monitorResults: Map<string, MonitorResult>;
}) {
  const gridStyle = { "--columns": columns } as CSSProperties;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
        {group.name}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(var(--columns),minmax(0,1fr))]" style={gridStyle}>
        {group.items.map((item) => (
          <LinkCard
            key={item.name}
            item={item}
            style={style}
            linkTarget={linkTarget}
            monitor={monitorResults.get(item.url)}
          />
        ))}
      </div>
    </section>
  );
}
