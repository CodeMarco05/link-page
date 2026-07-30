import type { CSSProperties } from "react";
import type { Group, CardStyleName, LinkTarget } from "@/lib/config/schema";
import type { MonitorSnapshot } from "@/lib/monitor/store";
import { LinkCard } from "./LinkCard";
import { CollapsibleGroup } from "./CollapsibleGroup";

export function GroupSection({
  group,
  style,
  columns,
  linkTarget,
  monitorSnapshots,
}: {
  group: Group;
  style: CardStyleName;
  columns: number;
  linkTarget: LinkTarget;
  monitorSnapshots: Map<string, MonitorSnapshot>;
}) {
  const gridStyle = { "--columns": columns } as CSSProperties;

  return (
    <CollapsibleGroup name={group.name}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(var(--columns),minmax(0,1fr))]" style={gridStyle}>
        {group.items.map((item) => (
          <LinkCard
            key={item.name}
            item={item}
            style={style}
            linkTarget={linkTarget}
            monitor={monitorSnapshots.get(item.url)}
          />
        ))}
      </div>
    </CollapsibleGroup>
  );
}
