import Image from "next/image";
import type { LinkItem, CardStyleName, LinkTarget } from "@/lib/config/schema";
import { getCardStyle } from "@/lib/styles/card-styles";
import type { MonitorResult } from "@/lib/monitor/check";
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
  monitor?: MonitorResult;
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
        <Image src={item.icon} alt="" width={24} height={24} unoptimized />
      </span>
      <span className={`truncate text-[var(--foreground)] ${classes.name}`}>{item.name}</span>
      {monitor && (
        <span className="ml-auto">
          <StatusDot status={monitor.status} detail={monitor.detail} />
        </span>
      )}
    </a>
  );
}
