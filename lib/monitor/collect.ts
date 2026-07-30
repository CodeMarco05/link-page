import type { DashboardConfig } from "@/lib/config/schema";
import { getAllSnapshots, type MonitorSnapshot } from "./store";

export function collectMonitorSnapshots(config: DashboardConfig): Map<string, MonitorSnapshot> {
  const monitoredUrls = new Set(
    config.groups
      .flatMap((group) => group.items)
      .filter((item) => item.type === "page-monitored")
      .map((item) => item.url),
  );

  const allSnapshots = getAllSnapshots();
  const snapshots = new Map<string, MonitorSnapshot>();
  for (const url of monitoredUrls) {
    const snapshot = allSnapshots.get(url);
    if (snapshot) {
      snapshots.set(url, snapshot);
    }
  }
  return snapshots;
}
