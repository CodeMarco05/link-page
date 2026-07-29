import type { DashboardConfig } from "@/lib/config/schema";
import { checkItemStatus, type MonitorResult } from "./check";

export async function collectMonitorResults(
  config: DashboardConfig,
): Promise<Map<string, MonitorResult>> {
  const monitoredItems = config.groups
    .flatMap((group) => group.items)
    .filter((item) => item.type === "page-monitored");

  const results = await Promise.all(
    monitoredItems.map(async (item) => [item.url, await checkItemStatus(item)] as const),
  );

  return new Map(results);
}
