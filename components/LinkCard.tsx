import Image from "next/image";
import type { LinkItem, CardStyleName, LinkTarget } from "@/lib/config/schema";
import { getCardStyle } from "@/lib/styles/card-styles";
import type { MonitorSnapshot } from "@/lib/monitor/store";
import { resolveIconUrl } from "@/lib/icon";
import { StatusDot } from "./StatusDot";

export function LinkCard({
  item,
  style,
  linkTarget,
  monitor,
}: {
  item: LinkItem;
  style: CardStyleName;
  linkTarget: LinkTarget;
  monitor?: MonitorSnapshot;
}) {
  const classes = getCardStyle(style);
  const opensInNewTab = linkTarget === "new-tab";

  return (
    <a
      href={item.url}
      target={opensInNewTab ? "_blank" : undefined}
      rel={opensInNewTab ? "noopener noreferrer" : undefined}
      className={`flex items-center gap-3 p-4 ${classes.card}`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden ${classes.icon}`}>
        <Image src={resolveIconUrl(item)} alt="" width={24} height={24} unoptimized />
      </span>
      <span className={`truncate text-[var(--foreground)] ${classes.name}`}>{item.name}</span>
      {monitor && (
        <span className="ml-auto flex items-center gap-1.5">
          <span className="font-mono text-xs tabular-nums text-[var(--muted-foreground)]">
            {monitor.uptimePercent.toFixed(1)}% [{monitor.latest.latencyMs}ms]
          </span>
          <StatusDot monitor={monitor} />
        </span>
      )}
    </a>
  );
}
