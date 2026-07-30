import { loadDashboardConfig } from "@/lib/config/load";
import type { LinkItem } from "@/lib/config/schema";
import { checkItemStatus } from "./check";
import { recordSample, pruneOrphanedUrls } from "./store";

const activeTimers = new Map<string, ReturnType<typeof setTimeout>>();
let pollerStarted = false;

async function runCheck(item: LinkItem, intervalSeconds: number): Promise<void> {
  try {
    const result = await checkItemStatus(item);
    recordSample(item.url, result);
  } catch {
    // checkItemStatus already handles its own errors; this guards the poll loop itself.
  }

  const timer = setTimeout(() => runCheck(item, intervalSeconds), intervalSeconds * 1000);
  activeTimers.set(item.url, timer);
}

async function reconcile(): Promise<void> {
  const config = await loadDashboardConfig();
  const monitoredItems = config.groups
    .flatMap((group) => group.items)
    .filter((item) => item.type === "page-monitored");

  const seenUrls = new Set<string>();

  for (const item of monitoredItems) {
    seenUrls.add(item.url);
    if (activeTimers.has(item.url)) {
      continue;
    }
    const intervalSeconds = item.checkIntervalSeconds ?? config.checkIntervalSeconds;
    void runCheck(item, intervalSeconds);
  }

  for (const url of activeTimers.keys()) {
    if (!seenUrls.has(url)) {
      clearTimeout(activeTimers.get(url));
      activeTimers.delete(url);
    }
  }

  pruneOrphanedUrls(seenUrls);
}

const RECONCILE_INTERVAL_MS = 15_000;

export function startMonitorPoller(): void {
  if (pollerStarted) {
    return;
  }
  pollerStarted = true;

  void reconcile();
  setInterval(() => void reconcile(), RECONCILE_INTERVAL_MS);
}
