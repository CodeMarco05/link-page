import type { LinkItem } from "@/lib/config/schema";

export type MonitorStatus = "up" | "degraded" | "down";

export type MonitorResult = {
  status: MonitorStatus;
  detail?: string;
  latencyMs: number;
};

const CHECK_TIMEOUT_MS = 5000;

export async function checkItemStatus(item: LinkItem): Promise<MonitorResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);
  const startedAt = performance.now();

  try {
    const response = await fetch(item.url, {
      method: "GET",
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });
    const latencyMs = Math.round(performance.now() - startedAt);

    if (!item.okStatus.includes(response.status)) {
      return {
        status: "degraded",
        detail: `Unexpected status: ${response.status} ${response.statusText}`.trim(),
        latencyMs,
      };
    }

    if (latencyMs > item.degradedLatencyMs) {
      return {
        status: "degraded",
        detail: `High latency: ${latencyMs}ms (threshold ${item.degradedLatencyMs}ms)`,
        latencyMs,
      };
    }

    return { status: "up", latencyMs };
  } catch (error) {
    const latencyMs = Math.round(performance.now() - startedAt);
    if (error instanceof Error && error.name === "AbortError") {
      return { status: "down", detail: `Timed out after ${CHECK_TIMEOUT_MS}ms`, latencyMs };
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return { status: "down", detail: message, latencyMs };
  } finally {
    clearTimeout(timeout);
  }
}
